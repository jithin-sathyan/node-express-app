module.exports = updateUsers;

function updateUsers(users, updatedUser, firstName, lastName) {
    const selectedUserIndex = users.findIndex((eachUser) =>
        eachUser.first_name === firstName.trim() && eachUser.last_name === lastName.trim());

    const clonnedUserList = users.slice(0);
    if (selectedUserIndex !== -1) {
        clonnedUserList[selectedUserIndex] = updatedUser
    }

    return clonnedUserList;
}