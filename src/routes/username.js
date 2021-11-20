const express = require("express");
const helpers = require("../utils/helpers");
const User = require("../db/db").User;
const mongooseWrapper = require("../db/mongoose-wrapper");

const router = express.Router({
    mergeParams: true,
});

// user verification function 
async function verifyUser(req, res, next) {
    const username = req.params.username.split('-');
    const users = mongooseWrapper.multipleMongooseToObj(await User.find());
    const verifiedUser = helpers.userVerification(users, username[0], username[1])
    if (!verifiedUser) {
        res.redirect(`/error/${req.params.username}`);
    } else {
        next();
    }
}

// for loging purpose
router.use((req, res, next) => {
    console.log("=========================================== Request ============================================", req.method, 'for', req.params, 'at', req.path);
    next();
})

router.all('/', (req, res, next) => {
    console.log("================================== log user details request  ======================================", req.method, " for ", req.params.username);
    next();
})

router.get('/', verifyUser, async (req, res) => {
    const username = req.params.username.split('-');
    const user = mongooseWrapper.mongooseToObj(await User.findOne({ first_name: username[0], last_name: username[1] }));
    const { address } = user;
    res.render("user", { user: user, address });
});

// for error handling with express
router.use((error, req, res, next) => {
    console.error("=========================================== Error ============================================", JSON.stringify(error.stack));
    res.status(500).send('Error occured while performing the requested operation!');
});

router.put('/', (req, res) => {
    const username = req.params.username.split('-');
    User.findOneAndUpdate({ first_name: username[0], last_name: username[1] }, { address: req.body }, (err, user) => {
        console.log("==================================== updated user =======================================", JSON.stringify(user))
        res.end();
    });
});

router.delete('/', async (req, res) => {
    const username = req.params.username.split('-');
    User.deleteOne({ first_name: username[0], last_name: username[1] }, (err, user) => {
        if (user) {
            console.log("==================================== deleted user =======================================", JSON.stringify(user));
        }
        res.end();
    });
});

module.exports = router;
