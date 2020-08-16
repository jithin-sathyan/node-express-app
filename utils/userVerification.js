module.exports = userVerification;

function userVerification(users, firstName, lastName) {
    let selectedUserIndex = null;
    if (firstName && lastName) {
        selectedUserIndex = users.findIndex((eachUser) =>
            eachUser.first_name === firstName.trim() && eachUser.last_name === lastName.trim());
    } else {
        selectedUserIndex = -1;
    }
    if (selectedUserIndex && selectedUserIndex !== -1) {
        return true;
    }
    return false;
}