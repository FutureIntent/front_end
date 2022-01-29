
function UserCheck(loginState) {
    if (!loginState) {

        fetch("http://localhost:3001/user/logout", {
            method: "POST",
            credentials: 'include',
        })
            .then(data => data.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        window.location.replace("http://localhost:3000/login");
    }
}

export default UserCheck;