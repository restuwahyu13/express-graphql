require('dotenv').config();
const express = require('express');
const http = require('http');
const graphqlHttp = require('express-graphql');
const app = express();
const Connection = require('./config/Connection');
const Schema = require('./graphql/schema');
const Resolvers = require('./graphql/resolvers');

//init connection
Connection.MongooseConnect();

//load function with middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//graphql route
app.use('/graphql', graphqlHttp({

    schema: Schema,
    rootValue: Resolvers,
    graphiql: true,
    customFormatErrorFn: error => ({

        message: error.message,
        locations: error.locations,
        path: error.path,
    }),
}));

//listening port 
http.createServer(app).listen(process.env.PORT, () => console.log('Server Is Running'));