import React, { useEffect } from 'react';

function Logout() {

    useEffect(() => {
        fetch("http://localhost:3001/user/logout", {
            method: "POST",
            credentials: 'include',
        })
            .then(data => data.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        window.location.replace("http://localhost:3000/");
    }, []);

    return (
        <div>

        </div>
        );
}

export default Logout;