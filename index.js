const express = require("express");
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

app.get('/data/:username', (req, res) => {
    const username = req.params.username.split('-');
    const user = helpers.getUser(users, username[0], username[1]);
    res.json(user);
})

try {
    const server = app.listen(3000, () => {
        console.log(`node-express server running at http://localhost:${server.address().port}`);
    })
} catch (error) {
    console.log("==================== Server creation error ====================", JSON.stringify(error));
}