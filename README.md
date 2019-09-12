## MultiDB project
This project uses both *MongoDB* and *PostgreSQL* as database. The architecture is based on the strategy design pattern with *Mocha.js* as test environment tool and *Istanbul* for code coverage, *Hapi.js* as structure and to handle with HTTP protocols, and *Json Web Token* with *Bcrypt* for users validation. This project was made for the **NodeBR** course of *Node.js*.

### Run locally
To run locally you'll have to start containers in *Docker*, to do it you can type in the following commands: 
```sh 
docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=senhauser -e POSTGRES_DB=heroes -p 5432:5432 -d postgres
docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin -d mongo:4
docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient
docker exec -it mongodb mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'user', pwd: 'senhauser', roles: [{role: 'readWrite', db: 'herois'}]})"
```

With the containers up you can ``npm install`` to install all dependencies, and ``npm t`` to initalize everything, run the tests and start the server. You can also call ``npm run test:prod`` to test the production environment instead of the development one.
