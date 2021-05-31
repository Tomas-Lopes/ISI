const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
    mode: 'cors',
    method: 'POST',
    headers: myHeaders,
    credentials: 'include'
};
//Fetch da pagina camara.html
inserirDadosProjetos();

async function inserirDadosProjetos() {

    try {
        let conteudo = "";
        const response = await fetch(`http://127.0.0.1:8080/user/pedidosCamara`, requestOptions);
        const pedidos = await response.json();
        console.log(pedidos);
        const url = new URL(pedidos[0].properties[6].value);

        for (const pedido of pedidos) {
            console.log(pedido);
            console.log(pedido.properties[6].value)
            automatic_url_conversion = true
            conteudo += "<td> " + pedido.name + "</td>";
            conteudo += "<td> " + pedido.properties[3].value + "</td>";
            conteudo += "<td> " + pedido.properties[1].value + "</td>";
            conteudo += "<td> " + pedido.summary + "</td>";
            conteudo += "<td> " + pedido.price + "</td>";
            conteudo += "<td> " + getDate(pedido.properties[2].value) + "</td>";
            conteudo += '<td>' + '<a href="' + pedido.properties[5].value + '">Ver Documento </a>' + "</td>";
            conteudo += '<td> <button onclick="aprovarPedido()"  type="button" id=' + pedido.properties[6].value + '  style=" padding: 15px; border-radius: 50%;margin-left: 07px;" class="btn" ><i class="fas fa-check"></i></button>' + ' <button onclick="rejeitarPedido()"  type="button" id=' + pedido.properties[6].value + '  style=" padding: 15px; border-radius: 50%;margin-left: 07px;" class="btn" ><i class="fas fa-times"></i></button>' + "</td></tr>";
            
        }

        document.getElementById("bodyCamara").innerHTML = conteudo;

    } catch (error) {
        console.log("Erro:" + error);
    }
}


function getDate(date) {
    var FormattedDate = new Date(date);
    var d = FormattedDate.getDate();
    var mo = FormattedDate.getMonth()
    var a = FormattedDate.getFullYear();
    d = checkTime(d);
    mo = checkTime(mo + 1);
    return d + "-" + mo + "-" + a;
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}


//fetch aprovar pedido
function aprovarPedido() {
    aprovarPedidoSF();
    aprovarPedidoHB();
    deleteRow();
}

function deleteRow() {
    var i =  HTMLTableRowElement.rowIndex;
    document.getElementById("myTable").remove();
  }

function aprovarPedidoSF() {

    //var estadoInput = document.getElementById("registerLastname").value;
    const btn = document.getElementsByClassName("btn");
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", () => {
            let id = btn[i].getAttribute("id")
            console.log(id);
        })
    }

    let data = {
        //corrigir
        dealid: btn,
        state: "aceite"
    }
    
    fetch(`http://localhost:8080/user/alterarEstSF`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        // mode: 'cors',
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();

    }).then(result => {
        console.log(result);
        
    })
    
}

function rejeitarPedido() {
    rejeitarPedidoSF();
    rejeitarPedidoHB();
}

//fetch rejeitar pedido
function rejeitarPedidoSF() {
    const btn = document.getElementsByClassName("btn");
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", () => {
            let id = btn[i].getAttribute("id")
            console.log(id);
        })
    }

    let data = {
        //corrigir
        dealid: btn,
        state: "Rejeitado"
    }

    fetch(`http://localhost:8080/user/alterarEstSF`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        // mode: 'cors',
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();

    }).then(result => {
        console.log(result);
        if (result) {
            Swal.fire({
                title: 'Rejeitado com sucesso!',
                type: 'success',
                showCancelButton: false,
                showConfirmButton: false,
                showLoaderOnConfirm: false,
                timer: 2000
            }).then(result => {
                window.location.replace('/Frontend/camara.html')
            })
        } else {
            throw new Error(
                "Ocorreu um erro! Tente novamente. Obrigado!"
            );
        }
    })
}

function aprovarPedidoHB() {

    //var estadoInput = document.getElementById("registerLastname").value;
    const btn = document.getElementsByClassName("btn");
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", () => {
            let id = btn[i].getAttribute("id")
            console.log(id);
        })
    }

    let data = {
        //corrigir
        dealid: btn,
        state: "aceite"
    }
    
    fetch(`http://localhost:8080/user/alterarEstHubspot`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        // mode: 'cors',
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();

    }).then(result => {
        console.log(result);
        if (result) {
            Swal.fire({
                title: 'Aprovado com sucesso!',
                type: 'success',
                showCancelButton: false,
                showConfirmButton: false,
                showLoaderOnConfirm: false,
                timer: 2000
            }).then(result => {
                window.location.replace('/Frontend/camara.html')
            })
        } else {
            throw new Error(
                "Ocorreu um erro! Tente novamente. Obrigado!"
            );
        }
    })
    
}

function rejeitarPedidoHB() {
    const btn = document.getElementsByClassName("btn");
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", () => {
            let id = btn[i].getAttribute("id")
            console.log(id);
        })
    }

    let data = {
        //corrigir
        dealid: btn,
        state: "Rejeitado"
    }

    fetch(`http://localhost:8080/user/alterarEstHubspot`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        // mode: 'cors',
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();

    }).then(result => {
        console.log(result);
  
    })
}


/*
id="approved"
id="rejected"
id="dealsCamara"
*/