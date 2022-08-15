const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
let items = [];
let workItems = [];

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
    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    let today = new Date();
    res.render('list', {
        listTitle: today.toLocaleDateString("en-US", options),
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
    console.log(req.body)

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
        console.log(req.body)
    }
})


