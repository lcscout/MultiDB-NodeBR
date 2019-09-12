// npm i hapi
// npm i vision inert hapi-swagger
// npm i hapi-auth-jwt2
// npm i bcrypt
// npm i dotenv

const { config } = require('dotenv')
const { join } = require('path')
const { ok } = require('assert')

const env = process.env.NODE_ENV || "dev"
ok(env === "prod" || env === "dev", "a env é inválida, ou dev ou prod")
const configPath = join(__dirname, './../config', `.env.${env}`)
config({
    path: configPath
})

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')

const Mongodb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')

const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')
const UtilRoute = require('./routes/utilRoutes')

const Postgres = require('./db/strategies/postgres/postgres')
const UsuarioSchema = require('./db/strategies/postgres/schema/usuarioSchema')

const Pack = require('./../package')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')
const HapiJwt = require('hapi-auth-jwt2')

const JWT_SECRET = process.env.JWT_KEY

const app = new Hapi.Server({
    port: process.env.PORT || 5000
})

function mapRoutes(instance, methods) {
    return methods.map(methods => instance[methods]())
}

async function main() {
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection, HeroiSchema))

    const connectionPostgres = await Postgres.connect()
    const userModel = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
    const contextPostgres = new Context(new Postgres(connectionPostgres, userModel))

    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBR',
            version: Pack.version
        }
    }
    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // },
        validate: async (dado, request) => {
            const result = await contextPostgres.read({
                username: dado.username.toLowerCase(),
                id: dado.id
            })
            if(!result) {
                return {
                    isValid: false
                }
            }
            // verifica no banco se usuario continua ativo
            // verifica  ''   ''   ''    ''     ''   pagando

            return {
                isValid: true // caso nao valido false
            }
        }
    })
    app.auth.default('jwt')

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods()),
        ...mapRoutes(new UtilRoute(), UtilRoute.methods())
    ])

    await app.start()
    console.log('Servidor rodando na porta:', app.info.port)

    return app
}
module.exports = main()