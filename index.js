const express = require("express");
const app = express();
const fs = require('fs');
const viewEngines = require("consolidate");

const users = [];
app.use("/profile-pics", express.static("images"))
app.engine("hbs", viewEngines.handlebars);
app.set('veiws', "./views");
app.set("view engine", "hbs");

try {
    fs.readFile("./userDetails.json", { encoding: 'utf8' }, (error, data) => {
        if (error) {
            throw error
        }
        JSON.parse(data).forEach((eachUserData) => {
            users.push({ ...eachUserData });
        })
    });
}
catch (error) {
    console.log("====================== Error while reading from user details file =========================", JSON.stringify(error))
}

app.get("/", (req, res) => {
    res.send("Welcome to node-express app!");
});

app.get("/basic-route", (req, res) => {
    res.send("Node server communicating from basic-route path");
});

app.get("/user-list", (req, res) => {
    res.render("index", { users: users });
});

app.get(/.*ea.*/, (req, res, next) => {
    console.log("================================== User containing ea sub string in name accessed the app ====================================");
    next();
});

app.get(/Gia.*/, (req, res, next) => {
    console.log("================================== User containing Gia sub string in name accessed the app ====================================");
    next();
})


app.get('/:username', (req, res) => {
    const username = req.params.username.split('-');
    res.render("user", { firstName: username[0], lastName: username[1] });
})

try {
    const server = app.listen(3000, () => {
        console.log(`node-express server running at http://localhost:${server.address().port}`);
    })
} catch (error) {
    console.log("==================== Server creation error ====================", JSON.stringify(error));
}