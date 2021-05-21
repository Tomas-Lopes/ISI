async function logout() {
        await fetch(`http://127.0.0.1:8080/user/logout`, {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            console.log(response.user.id)
            if (response.ok) {
                window.location.assign("./index.html")
                localStorage.removeItem("id", response.user.id);
                //sessionStorage.removeItem('user');
            }
        })
    }
