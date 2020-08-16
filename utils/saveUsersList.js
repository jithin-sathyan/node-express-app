module.exports = saveUsersList;

// file system module
const fs = require('fs');

function saveUsersList(usersList) {
    try {
        fs.writeFileSync("./data/userDetails.json", JSON.stringify(usersList, null, 2));
        console.log("========================== Completed File Updation for User Details Updation ==========================================")
;    }
    catch (error) {
        console.log("====================== Error while saving user details to file =========================", JSON.stringify(error))
    }
}