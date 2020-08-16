const express = require("express");
const app = express();
const viewEngines = require("consolidate");
const bodyParser = require('body-parser');

// utils function
const getUser = require("./utils/getUser");
const updateUsers = require("./utils/updateUsers");
const deleteUsers = require("./utils/deleteUsers");
const fetchUsersList = require("./utils/fetchUsersList");
const saveUsersList = require('./utils/saveUsersList');
const userVerification = require("./utils/userVerification");

let users = [];

// user verification function 
function verifyUser(req, res, next) {
    const username = req.params.username.split('-');
    const verifiedUser = userVerification(users, username[0], username[1])
    if (!verifiedUser) {
        res.redirect(`/error/${req.params.username}`);
    } else {
        next();
    }
}

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
    users = fetchUsersList();
    res.render("index", { users: users });
});

app.all('/:username', (req, res, next) => {
    console.log("================================== log user details request  ======================================", req.method, " for ", req.params.username);
    next();
})

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

app.get('/:username', verifyUser, (req, res) => {
    const username = req.params.username.split('-');
    const user = getUser(users, username[0], username[1]);
    const { address } = user;
    res.render("user", { user: user, address });
});

app.get('/error/:username', (req, res) => {
    res.status(404).send(`No user named ${req.params.username} found`);
});

app.get('/data/:username', (req, res) => {
    const username = req.params.username.split('-');
    const user = getUser(users, username[0], username[1]);
    res.json(user);
})

app.put('/:username', (req, res) => {
    const username = req.params.username.split('-');
    const user = getUser(users, username[0], username[1]);
    user.address = req.body;
    users = updateUsers(users, user, username[0], username[1]);
    saveUsersList(users);
    res.end()
});

app.delete('/:username', (req, res) => {
    const username = req.params.username.split('-');
    const user = getUser(users, username[0], username[1]);
    users = deleteUsers(users, user, username[0], username[1]);
    saveUsersList(users);
    res.end()
})

try {
    const server = app.listen(3000, () => {
        console.log(`node-express server running at http://localhost:${server.address().port}`);
    })
} catch (error) {
    console.log("==================== Server creation error ====================", JSON.stringify(error));
}