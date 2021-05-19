async function logout() {
        await fetch(`http://127.0.0.1:8080/user/logout`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(response => {
            console.log("sair")
            if (response.ok) {
                window.location.assign("./index.html")
                localStorage.removeItem('notiToken');
                sessionStorage.removeItem('user');
            }
        })
    }
