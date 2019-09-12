const mongoose = require('mongoose')

mongoose.connect('mongodb://user:senhauser@localhost:27017/herois', {useNewUrlParser: true}, function(error) {
    if(!error) return ;
    console.log('Falha na conexão', error)
})

const connection = mongoose.connection
connection.once('open', ()=> console.log('database rodando!'))
setTimeout(()=>{
    const state = connection.readyState
    console.log('state', state)
}, 1000)

/*
    0: Disconectado
    1: Conectado
    2: Conectando
    3: Disconectando
*/

const heroisSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = mongoose.model('herois', heroisSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('result cadastrar', resultCadastrar)
}
main()