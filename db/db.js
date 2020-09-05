const dbUri = 'mongodb://localhost:27017/test'

const mongoose = require("mongoose");
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "=============================== connection error:"));
db.once('open', (callback) => {
    console.log("============================ Successfully Connected to DB =======================================");
});

const userSchema = mongoose.Schema({
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
    }
});

exports.User = mongoose.model('User', userSchema);