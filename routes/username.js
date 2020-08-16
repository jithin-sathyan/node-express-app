const express = require("express");
const helpers = require("../utils/helpers");

const router = express.Router({
    mergeParams: true,
});

// user verification function 
function verifyUser(req, res, next) {
    const username = req.params.username.split('-');
    const users = helpers.fetchUsersList();
    const verifiedUser = helpers.userVerification(users, username[0], username[1])
    if (!verifiedUser) {
        res.redirect(`/error/${req.params.username}`);
    } else {
        next();
    }
}

router.all('/', (req, res, next) => {
    console.log("================================== log user details request  ======================================", req.method, " for ", req.params.username);
    next();
})

router.get('/', verifyUser, (req, res) => {
    const username = req.params.username.split('-');
    const users = helpers.fetchUsersList();
    const user = helpers.getUser(users, username[0], username[1]);
    const { address } = user;
    res.render("user", { user: user, address });
});


router.put('/', (req, res) => {
    const username = req.params.username.split('-');
    let users = helpers.fetchUsersList();
    const user = helpers.getUser(users, username[0], username[1]);
    user.address = req.body;
    users = helpers.updateUsers(users, user, username[0], username[1]);
    helpers.saveUsersList(users);
    res.end()
});

router.delete('/', (req, res) => {
    const username = req.params.username.split('-');
    let users = helpers.fetchUsersList();
    const user = helpers.getUser(users, username[0], username[1]);
    users = helpers.deleteUsers(users, user, username[0], username[1]);
    helpers.saveUsersList(users);
    res.end()
});

module.exports = router;
