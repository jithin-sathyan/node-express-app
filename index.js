const express = require("express");
const fs = require("fs");
const JSONStream = require("JSONStream");
const app = express();
const viewEngines = require("consolidate");
const bodyParser = require('body-parser');

// import routes
const username = require("./routes/username");

// utils function
const helpers = require("./utils/helpers");

let users = [];

// handle static file and requests
app.use("/profile-pics", express.static("images"));
app.use(bodyParser.urlencoded({ extended: true }));

// handle view and view engines for templating
app.engine("hbs", viewEngines.handlebars);
app.set('veiws', "./views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.send("Welcome to node-express app!");
});

app.get("/basic-route", (req, res) => {
    res.send("Node server communicating from basic-route path");
});

app.get("/user-list", (req, res) => {
    users = helpers.fetchUsersList();
    res.render("index", { users: users });
});

app.get(/.*ea.*/, (req, res, next) => {
    console.log("================================== User containing ea sub string in name accessed the app ====================================");
    next();
});

app.get(/Gia.*/, (req, res, next) => {
    console.log("================================== User containing Gia sub string in name accessed the app ====================================");
    next();
});

app.get('*.json', (req, res) => {
    res.download("./data/userDetails.json", 'complete-user-details.json');
})

app.use("/:username", username);

app.get('/error/:username', (req, res) => {
    res.status(404).send(`No user named ${req.params.username} found`);
});

app.get('/users/all', (req, res) => {
    const userReadableStream = fs.createReadStream("./data/userDetails.json");
    userReadableStream.pipe(res);
});

app.get('/users/by/:gender', (req, res) => {
    const genderFilter = req.params.gender;
    const userReadableStream = fs.createReadStream("./data/userDetails.json");
    userReadableStream.pipe(JSONStream.parse('*', (userData) => {
        if (userData.gender === genderFilter) {
            return `${userData.first_name} ${userData.last_name}`;
        }
    })).pipe(JSONStream.stringify('[\n  ', ',\n  ', '\n]\n')).pipe(res);
});

app.get('/data/:username', (req, res) => {
    const username = req.params.username.split('-');
    const user = helpers.getUser(users, username[0], username[1]);
    res.json(user);
});

try {
    const server = app.listen(3000, () => {
        console.log(`node-express server running at http://localhost:${server.address().port}`);
    })
} catch (error) {
    console.log("==================== Server creation error ====================", JSON.stringify(error));
}