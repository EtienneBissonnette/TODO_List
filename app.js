const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const workItems = [];


// Mongoose configuration for MongoDB connection
const uri = "mongodb+srv://Admin:adminpassword@cluster0.5hguabb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri);

const itemSchema = {
    name: String,
};

const Item = mongoose.model('Item', itemSchema);

//Setting up app
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("Public"))

app.listen(port, function () {
    console.log('listening on port' + port);
});

// GET /home

app.get('/', function (req, res) {

    const items = []
    Item.find({}, (e, items) => {
        res.render('list', {
            listTitle: "Today",
            listItems: items,
        });
    });
});

// GET /work

app.get('/work', function (req, res) {
    res.render('list', {
        listTitle: "Work Task",
        listItems: workItems,
    });
});

// GET /about

app.get('/about', function (req, res) {
    res.render('about');
});

app.post('/', function (req, res) {

    const item = req.body.newItem;
    const newItem = new Item({
            name: item
        });
    newItem.save();
    res.redirect('/');
});