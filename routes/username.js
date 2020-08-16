const express = require("express");
const helpers = require("../utils/helpers");

const router = express.Router({
    mergeParams: true,
});

const users = helpers.fetchUsersList();

// user verification function 
function verifyUser(req, res, next) {
    const username = req.params.username.split('-');
    const verifiedUser = helpers.userVerification(users, username[0], username[1])
    console.log("======================= user verification =======================", verifiedUser);
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
    const user = helpers.getUser(users, username[0], username[1]);
    const { address } = user;
    res.render("user", { user: user, address });
});


router.put('/', (req, res) => {
    const username = req.params.username.split('-');
    const user = helpers.getUser(users, username[0], username[1]);
    user.address = req.body;
    users = helpers.updateUsers(users, user, username[0], username[1]);
    helpers.saveUsersList(users);
    res.end()
});

router.delete('/', (req, res) => {
    const username = req.params.username.split('-');
    const user = helpers.getUser(users, username[0], username[1]);
    users = helpers.deleteUsers(users, user, username[0], username[1]);
    helpers.saveUsersList(users);
    res.end()
});

module.exports = router;
