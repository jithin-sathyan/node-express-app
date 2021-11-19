const dbUri = 'mongodb://mongoadmin:passkeyforadmin@localhost:8989'

const mongoose = require("mongoose");
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "user-accounts" });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "=============================== connection error:"));
db.once('open', (callback) => {
    console.log("============================ Successfully Connected to DB =======================================");
});

const userSchema = new mongoose.Schema({
    "id": Number,
    "first_name": String,
    "last_name": String,
    "email": String,
    "gender": String,
    "ip_address": String,
    "address": {
        "house": String,
        "city": String,
        "state": String,
        "zip": String
    }
}, {
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
    collection: 'user'
});

exports.User = mongoose.model('user', userSchema);