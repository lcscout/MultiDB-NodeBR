// npm i hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')

const app = new Hapi.Server({
    host: 'localhost',
    port: 5000
})

async function main() {
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection, HeroiSchema))
    app.route({
        path: '/herois',
        method: 'GET',
        handler: (request, head) => {
            return context.read()
        }
    })

    await app.start()
    console.log('Servidor rodando na porta:', app.info.port)
}
main()