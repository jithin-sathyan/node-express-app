// file system module
const fs = require('fs');

// fetch complete user list
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

// check user exists from user verification
function userVerification(users, firstName, lastName) {
    let selectedUserIndex = null;
    if (firstName && lastName) {
        selectedUserIndex = users.findIndex((eachUser) =>
            firstName.trim().toLowerCase() === eachUser.first_name.toLowerCase() && lastName.trim().toLowerCase() === eachUser.last_name.toLowerCase());
    } else {
        selectedUserIndex = -1;
    }
    if (selectedUserIndex !== null && selectedUserIndex !== -1) {
        return true;
    }
    return false;
}

// get details of a single user
function getUser(users, firstName, lastName) {
    const user = users.filter((eachUser) =>
        firstName.trim().toLowerCase() === eachUser.first_name.toLowerCase() && lastName.trim().toLowerCase() === eachUser.last_name.toLowerCase());
    return { ...user[0] };
}

// update user list completely
function updateUsers(users, updatedUser, firstName, lastName) {
    const selectedUserIndex = users.findIndex((eachUser) =>
        firstName.trim().toLowerCase() === eachUser.first_name.toLowerCase() && lastName.trim().toLowerCase() === eachUser.last_name.toLowerCase());

    const clonnedUserList = users.slice(0);
    if (selectedUserIndex !== -1) {
        clonnedUserList[selectedUserIndex] = updatedUser
    }

    return clonnedUserList;
}


// save updated user details into the JSON file
function saveUsersList(usersList) {
    try {
        fs.writeFileSync("./data/userDetails.json", JSON.stringify(usersList, null, 2));
        console.log("========================== Completed File Updation for User Details Updation ==========================================")
            ;
    }
    catch (error) {
        console.log("====================== Error while saving user details to file =========================", JSON.stringify(error))
    }
}

function deleteUsers(users, updatedUser, firstName, lastName) {
    const selectedUserIndex = users.findIndex((eachUser) =>
        firstName.trim().toLowerCase() === eachUser.first_name.toLowerCase() && lastName.trim().toLowerCase() === eachUser.last_name.toLowerCase());

    const clonnedUserList = users.splice(0);
    if (selectedUserIndex !== -1) {
        clonnedUserList.splice(selectedUserIndex, 1)
    }

    return clonnedUserList;
}


exports.fetchUsersList = fetchUsersList;
exports.saveUsersList = saveUsersList;
exports.getUser = getUser;
exports.deleteUsers = deleteUsers;
exports.updateUsers = updateUsers;
exports.userVerification = userVerification;