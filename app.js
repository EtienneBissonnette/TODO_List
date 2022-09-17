const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
const port = process.env.PORT;


// Mongoose configuration for MongoDB connection
const uri = process.env.uri
mongoose.connect(uri);

const itemSchema = {
    name: String,
};

const Item = mongoose.model('Item', itemSchema);

const listSchema = {
    name: String,
    items: [itemSchema]
}

const CustomList = mongoose.model('customList', listSchema);

//Setting up app
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("Public"))

app.listen(port, function () {
    console.log('listening on port ' + port);
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

// GET any custom list

app.get("/:listName", (req, res) => {

    const newListName = req.params.listName;

    CustomList.findOne({
        name: newListName
    }, (e, list) => {
        if (!e) {
            if (!list) {
                const newList = new CustomList({
                    name: newListName,
                    items: []
                })
                newList.save();
                res.render('list', {
                    listItems: newList.items,
                    listTitle: newList.name,
                })
            } else {
                res.render('list', {
                    listItems: list.items,
                    listTitle: list.name
                })
            }
        }
    })
})



// GET /about

app.get('/about', function (req, res) {
    res.render('about');
});

//POST /home

app.post('/', function (req, res) {

    const listTitle = req.body.listTitle;
    const item = req.body.newItem;
    const newItem = new Item({
        name: item
    });

    if (listTitle == "Today") {
        newItem.save();
        res.redirect('/');
    } else {
        CustomList.findOne({
            name: listTitle
        }, (e, list) => {
            list.items.push(newItem);
            list.save();
            res.redirect("/" + listTitle);
        })
    }
});

//POST /delete

app.post('/delete', function (req, res) {

    const deletedItemID = req.body.checkbox;
    const listTitle = req.body.listTitle;
    console.log(listTitle)

    if (listTitle == "Today") {
        Item.findByIdAndDelete(deletedItemID, e => {
            if (e) {
                console.log(e);
            } else {
                console.log("Deleted item")
            }
        })
        res.redirect('/');
    } else {
        CustomList.findOneAndUpdate({name: listTitle},{$pull: {items: {_id: deletedItemID}}}, (e, list) => {
            if (!e){
                res.redirect('/' + listTitle);
            }
        });
    }


})