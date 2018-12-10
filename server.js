const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const MongoClient = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectID;
const app = express();
const port = process.env.PORT || 3000;


const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb+srv://admin:2tG6Y39pG8YtW2n@cluster0-nnyrj.mongodb.net/test?retryWrites=true", {useNewUrlParser: true});

let dbClient;
let userCollection;
let chatCollection;

app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function (err, req, res, next) {
    console.error(err.stack);
    next();
});
app.use(bodyParser.urlencoded({extended: true}));


mongoClient.connect(function (err, client) {
    if (err) return console.log(err);
    dbClient = client;
    userCollection = client.db("chatDb").collection("users");
    chatCollection = client.db("chatDb").collection("chats");
    app.listen(port, function () {
        console.log(`Server is running on ${port}`);
    });
});

app.get("/api/users/:email/:password", function (req, res) {
    const email = req.params.email;
    const password = req.params.password;
    userCollection.findOne({email: email, password: password}, function (err, user) {
        if (err) return console.log(err);
        res.send(user);
    });
    console.log("here");
});


app.post("/api/users", jsonParser, function (req, res) {
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

