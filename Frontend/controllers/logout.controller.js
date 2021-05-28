async function logout() {
        await fetch(`http://127.0.0.1:8080/user/logout`, {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
           
            if (response.ok) {
                localStorage.removeItem("id");
                window.location.assign("./index.html")
                
            }
        })
    }
