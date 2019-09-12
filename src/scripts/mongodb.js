docker ps

docker exec -it (id do mongodb) ->

docker exec -it fe644f69814b mongo -u user -p senhauser --authenticationDatabase herois

show dbs
use herois
show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.fing().pretty()

for(let i=0; i<= 100000; i++) {
    db.herois.insert({
        nome: 'Clone-${i}',
        poder: 'Velocidade',
        dataNascimento: '1999-01-01'
    })
}

db.herois.count()
db.herois.findOne()

db.herois.find().limit(100).sort({nome: -1})
db.herois.find({}, {poder: 1, _id: 0})

// create
db.herois.insert()
// read
db.herois.find()
// update
db.herois.update({_id: ObjectId("")}, {$set: {nome: 'Muda nome'}}, )
ou find + save
// delete
db.herois.remove({})
db.herois.remove({query: ''})