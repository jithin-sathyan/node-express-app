module.exports = deleteUsers;

function deleteUsers(users, updatedUser, firstName, lastName) {
    const selectedUserIndex = users.findIndex((eachUser) =>
        eachUser.first_name === firstName.trim() && eachUser.last_name === lastName.trim());

    const clonnedUserList = users.splice(0);
    if (selectedUserIndex !== -1) {
        clonnedUserList.splice(selectedUserIndex, 1)
    }

    return clonnedUserList;
}