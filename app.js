const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
var items = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, function () {
    console.log('listening on port' + port);
});

app.get('/', function (req, res) {
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    var today = new Date();
    res.render('list', {
        currentDay: today.toLocaleDateString("en-US",options),
        listItems: items,
    });
});

app.post('/', function (req, res) {
    item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})