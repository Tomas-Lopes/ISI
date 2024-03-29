//window.onload = function () {
//console.log("ola nuno");
//const formAssociar = document.getElementById("formAssociar");

/*formAssociar.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById("associar").disabled = true;
*/
let _pedidos = null;
async function associar() {
    var pedidoInput = document.getElementById("pedido").value;
    var arquitetoInput = document.getElementById("arquiteto").value;

    console.log(pedidoInput + arquitetoInput)

    let data = {
        dealId: pedidoInput,
        arq_id: arquitetoInput,
    }
    //console.log("entrei")
    fetch(
        `http://127.0.0.1:8080/user/associarArq`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'PUT',
            //credentials: 'include',
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(result => {
            console.log(result);
            if (result.message == "Architect associated with success") {
                Swal.fire({
                    title: 'Arquiteto associado com sucesso!',
                    type: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showLoaderOnConfirm: false,
                    timer: 2000
                }).then(result => {
                    window.location.replace('./associar.html')
                })
            } else {
                if (result.error == "Este arquiteto não pode ser associado. Por favor, tente novamente!") {
                    throw new Error(result.error);
                } else {
                    throw new Error(
                        "Este arquiteto não pode ser associado. Por favor, tente novamente!"
                    )
                }
            }
        }).catch(error => {
            //document.getElementById("associar").disabled = false;
            //console.log(error)
            if (error.message == 'Este pedido e arquiteto não existem. Por favor, tente novamente!') {
                Swal.fire({
                    html: '<strong><h3>Este pedido e arquiteto não existem. Por favor, tente novamente!</h3></strong>',
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: 'error',
                    timer: 2000
                })
            } else {
                alert(error.message /*
                        html: '<strong><h3>Ocorreu um erro! Tente mais tarde. Obrigado!</h3></strong>',
                        showCancelButton: false,
                        showConfirmButton: false,
                        type: 'error',
                        timer: 2000
                        */
                )
            }
        });
}


//Fetch da página arquiteto.html
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
//Fetch requestOptions
const requestOptions = {
    mode: 'cors',
    method: 'GET',
    headers: myHeaders,
    credentials: 'include'
};

pedidosArquiteto();

async function pedidosArquiteto() {

    try {
        let conteudo = "";
        const response = await fetch(`http://127.0.0.1:8080/user/projetosArquiteto`, requestOptions);
        const pedidos = await response.json();

        
        _pedidos = pedidos;
        console.log(pedidos);
        pedidos.forEach((pedido, index) => {
            conteudo += "<tr><td> " + pedido.Dealname__c + "</td>";
            conteudo += "<td> " + pedido.Name + "</td>";
            conteudo += "<td> " + pedido.Localizacao__c + "</td>";
            conteudo += "<td> " + pedido.TipoProjeto__c + "</td>";
            conteudo += "<td> " + pedido.Description__c + "</td>";
            conteudo += "<td> " + pedido.Amount__c + "</td>";
            conteudo += "<td> " + getDate(pedido.Closedate__c) + "</td>";
            conteudo += "<td> " + pedido.Dealstage__c + "</td>";
            conteudo += '<td> <button onclick="openModal(' + index + ')" data-backdrop="false" type="button" id="modal"  style=" padding: 15px; border-radius: 50%;margin-left: 07px;" class="btn" ><i class="fas fa-info-circle"></i></button>' + "</td></tr>";
        
        
            require([
                "esri/config",
                "esri/Map",
                "esri/views/MapView",

                "esri/widgets/BasemapToggle",
                "esri/widgets/BasemapGallery",

                "esri/Graphic",
                "esri/layers/GraphicsLayer"

            ], function (esriConfig, Map, MapView, BasemapToggle, BasemapGallery, Graphic, GraphicsLayer) {
                console.log("teste")
                esriConfig.apiKey = "AAPK4794dac93f2f4bfb9d5c5bc14c437164XR9J186t8cbfv7LaCox9yDhOY2MhlkPIatcbgP88-kkUORDpAZr1jen-wKBkGAhN";

                const map = new Map({
                    basemap: "arcgis-topographic" //Basemap layer service
                });

                const view = new MapView({
                    map: map,
                    center: [-8.293912, 41.450346], //Longitude, latitude
                    zoom: 11,
                    container: "viewDiv"
                });

                const basemapToggle = new BasemapToggle({
                    view: view,
                    nextBasemap: "arcgis-imagery"
                });

                view.ui.add(basemapToggle, "bottom-right");

                const basemapGallery = new BasemapGallery({
                    view: view,
                    source: {
                        query: {
                            title: '"World Basemaps for Developers" AND owner:esri'
                        }
                    }
                });

                const graphicsLayer = new GraphicsLayer();
                map.add(graphicsLayer);

                const simpleMarkerSymbol = {
                    type: "simple-marker",
                    color: [226, 119, 40],  // Orange
                    outline: {
                        color: [255, 255, 255], // White
                        width: 1
                    }
                };

                const point = {
                    type: "point",
                    longitude: pedido.Longitude__c,
                    latitude: pedido.Latitude__c
                };
                //ponto azurem
                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol
                });
                graphicsLayer.add(pointGraphic);
            })
        
        
    });

        document.getElementById("bodyArquiteto").innerHTML = conteudo;


    } catch (error) {
        console.log("Erro:" + error);
    }

}

function openModal(index) {
    $("#myModal").modal('show');
    $("#Dealname__c").val(_pedidos[index].Dealname__c);
    $("#Localizacao__c").val(_pedidos[index].Localizacao__c);
    $("#TipoProjeto__c").val(_pedidos[index].TipoProjeto__c);
    $("#Description__c").val(_pedidos[index].Description__c);
    $("#Closedate__c").val(_pedidos[index].Closedate__c);
    $('.modal-backdrop').remove();
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

