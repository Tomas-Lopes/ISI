function getPedidos() {

    //formNovoProjeto.addEventListener('submit', (event) => {
        //document.getElementById("register").disabled = true;
        //event.preventDefault();

        //localizacao com api
        var idInput = document.getElementById("idPedido").value;
        var clienteInput = document.getElementById("clientePedido").value;
        var localizacaoInput = document.getElementById("localizacaoPedido").value;
        var tipoInput = document.getSelection("tipoPedido").value;
        var descricaoInput = document.getElementById("descricaoPedido").value;
        var orcamentoInput = document.getElementById("orcamentoPedido").value;
        var dataInput = doucment.getElementById("dataPedido").value;

        let data = {
           id: idInput,
           cliente: clienteInput,
           localizacao: localizacaoInput,
           tipo: tipoInput,
           descricao: descricaoInput,
           orcamento: orcamentoInput, 
           data: dataInput,
           estado: estadoInput
        }

    fetch('https://environ-back.herokuapp.com/event/all', {
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
        
    }).then(async result => {
        var go = await result.json()
        return go;
    }).then(async response => {
        var array = []
        response.forEach(element => {
            var obj = [];

            //Visiveis ao Utilizador
            //Visiveis ao Utilizador

            //id pedido
            if (!element.name || element.name === '') {
                obj.push('null')
            } else {
                obj.push(element.name)
            }
            //nome cliente
            if (!element.properties[1].value || element.properties[1].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[1].value)
            }
            //localizacao
            if (!element.properties[8].value || element.properties[8].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[8].value)
            }
            //tipo pedido
            if (!element.properties[5].value || element.properties[5].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[5].value.replace("&#x2F;", "/"))
            }
            //descricao
            if (!element.properties[6].value || element.properties[6].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[6].value.replace("&#x2F;", "/"))
            }
            //orcamento
            if (!element.properties[10].value || element.properties[10].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[10].value)
            }
            //data
            if (!element.properties[0].value || element.properties[0].value === '') {
                obj.push('null')
            } else {
                obj.push(capitalize(element.properties[0].value))
            }
            //estado
            if (!element.properties[0].value || element.properties[0].value === '') {
                obj.push('null')
            } else {
                obj.push(capitalize(element.properties[0].value))
            }

        });
        console.log(array);
        var table = $('#tabelaPedidos').DataTable({
            data: array,
            language: {
                paginate: {
                    previous: "<i class='fas fa-angle-left'>",
                    next: "<i class='fas fa-angle-right'>"
                }
            },
            columnDefs: [{
                targets: -1,
                data: null,
                //defaultContent: '<button id="infoEvent" type="button" class="btn btn-vimeo btn-icon-only rounded-circle"><span class="btn-inner--icon"><i class="fas fa-info"></i></span>    <button id="modalQRCode" type="button" class="btn btn-pinterest btn-icon-only rounded-circle"><span class="btn-inner--icon"><i class="fas fa-qrcode"></i></span>'
            }, ]
        });
        $('#tabelaPedidos tbody').on('click', 'button', function () {
            var action = this.id;
            if (action == 'infoEvent') {
                $('#modal-notification').modal('show');
                var data = table.row($(this).parents('tr')).data();
                initMapEvent(parseFloat(data[7].replace(",", ".")), parseFloat(data[8].replace(",", ".")))
                document.getElementById("modalEventName").value = data[0];
                document.getElementById("modalEventMunicipio").value = data[2];
                document.getElementById("modalEventLatitude").value = parseFloat(data[7].replace(",", "."));
                document.getElementById("modalEventLongitude").value = parseFloat(data[8].replace(",", "."));
                document.getElementById("modalEventRua").value = data[10];
                document.getElementById("modalEventInicio").value = data[3].replace("&#x2F;", "/");
                document.getElementById("modalEventFim").value = data[4].replace("&#x2F;", "/");
                document.getElementById("modalEventNumero").value = data[13];
                document.getElementById("modalEventTipo").value = capitalize(data[11]);
                document.getElementById("modalEventResumo").value = capitalize(data[12]);
                document.getElementById("modalEventID").value = data[9];
                document.getElementById("modalDuration").value = data[5];
            }
        });
    })
}