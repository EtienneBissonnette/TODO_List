const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
const port = 3000;
const items = [];
const workItems = [];


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

    res.render('list', {
        listTitle: date.getDate(),
        listItems: items,
    });
});

// GET /work

app.get('/work', function (req, res) {
    res.render('list', {
        listTitle: "Work Task",
        listItems: workItems,
    });
});

// GET /work

app.get('/about', function (req, res) {
    res.render('about')
});

app.post('/', function (req, res) {

    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
        console.log(req.body)
    }
})


