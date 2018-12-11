const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = express.json();

const MongoClient = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectID;
const port = process.env.PORT || 3000;

const mongoClient = new MongoClient("mongodb+srv://admin:2tG6Y39pG8YtW2n@cluster0-nnyrj.mongodb.net/test?retryWrites=true", {useNewUrlParser: true});

let dbClient;
let userCollection;
let chatCollection;

app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (err, req, res, next) {
    console.error(err.stack);
});
app.use(cors({
    'Access-Control-Allow-Origin': '*',
}));

mongoClient.connect(function (err, client) {
    if (err) return console.log(err);
    dbClient = client;
    app.locals.userCollection = client.db("chatDb").collection("users");
    userCollection = client.db("chatDb").collection("users");
    chatCollection = client.db("chatDb").collection("chats");
    app.listen(port, function () {
        console.log('Example app listening on port ' + port);
    });
});

app.get('/api/users/:email/:password', function (req, res, next) {
    const email = req.params.email;
    const password = req.params.password;
    req.app.locals.userCollection.findOne({email: email, password: password}, function (err, user) {
        if (!err) {
            console.log(user);
            // res.json(user);
            res.json({msg: 'This is CORS-enabled for all origins!'});
        } else {
            console.log(err);
        }
    });
});

app.post('/api/users', jsonParser, function (req, res) {
    console.log(req.body);
    if (!req.body) return res.sendStatus(400);

    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const user = {email: userEmail, password: userPassword, chats: [], route: false};

    userCollection.insertOne(user, function (err, result) {
        if (err) return console.log(err);
        res.send(user);
    });
});

app.get('/', function (req, res, next) {
    console.log("yes");
    res.send({msg: 'This is CORS-enabled for all origins!'});
});