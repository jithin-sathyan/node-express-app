module.exports = getUser;

function getUser(users, firstName, lastName) {
    const user = users.filter((eachUser) =>
        eachUser.first_name === firstName.trim() && eachUser.last_name === lastName.trim());
    return { ...user[0] };
}