module.exports = fetchUsersList;

// file system module
const fs = require('fs');

function fetchUsersList() {
    const users = [];
    try {
        fs.readFile("./data/userDetails.json", { encoding: 'utf8' }, (error, data) => {
            if (error) {
                throw error
            }
            JSON.parse(data).forEach((eachUserData) => {
                users.push({ ...eachUserData, address: { ...eachUserData.address } });
            })
        });
    }
    catch (error) {
        console.log("====================== Error while reading from user details file =========================", JSON.stringify(error))
        return [];
    }
    return users;
}