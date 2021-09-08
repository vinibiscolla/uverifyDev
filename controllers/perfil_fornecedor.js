let funcionario = {}
let dadosCabecalho = []
let documentos = []
let documentosArray = []
let urlPaginaSupplier = window.location.href

let fotoGlobal = address + '/assets/img/semFoto.jpg'
let suppliersObject
let supplierObject
let idSupplierUverifyGbFn

let documentosTotais = 0
let documentosValidos = 0
let documentosEmAnalise = 0
let documentosInvalidos = 0
let idSupplier, companyCode
let idSupplierUverifyGb
let uriToBase64
let globalActivityItemAction

let supplierDocs = [{
    name: '',
    lastName: '',
    date: '',
    status: '',
    tipoDocumento: '',
    numeroPasaporte: '',
    nif: '',
    nie: ''
}]

let fotoSupplier = address + '/assets/img/nophoto.png'

let activityItemObject = [
    {
        _id: '1',
        activityItemAction: 'Adjuntar Certificado AEAT',
        activityItemCode: 'AEAT - Certificado Agencia Estatal de Administración Tributaria',
        module: 'SOW',
        sowId: 'D002TQ00000025',
        base64: '',
        urlAzure: '',
    },
    {
        _id: '2',
        activityItemAction: 'Adjuntar Certificado TGSS',
        activityItemCode: 'TGSS - Certificado de Estar al Corriente en las Obligaciones de Seguridad Social',
        module: 'SOW',
        sowId: 'D002TQ00000025',
        base64: '',
        urlAzure: ''
    }
]

let activityItemSupplierList = [
    { module: "Worker", objectRef: "BR20WK00000180", childObjectCode: "F-30" },
    { module: "Worker", objectRef: "BR20WK00000180", childObjectCode: "F-29" }
];

let activityItemSupplierListMexico = [
    // { module: "SOW", objectRef: "STTS", childObjectCode: "Comprobante Fiscal Trabajador" },
    { module: "SOW", objectRef: "STTS", childObjectCode: "Formato Pago Cuotas Obrero Patronales" },
    { module: "SOW", objectRef: "STTS", childObjectCode: "Comprobante Pago Cuotas Obrero Patronales" },
    { module: "SOW", objectRef: "STTS", childObjectCode: "Opinion Positiva SAT" }
];

let jsonObjectFG = [
    { module: "Statement of Work", objectRef: "D002TQ00000025", childObjectCode: "Adjuntar Certificado AEAT" },
    { module: "Statement of Work", objectRef: "D002TQ00000025", childObjectCode: "Adjuntar Certificado TGSS" }
]

let trabalhadoresFGObj = [
    { nome: 'DAVID ANTOINE RAMOS CARVAJAL', rut: '13057533-1', html: `<i class="fa fa-lg fa-check-circle" style=" color: green;"> </i>` },
    { nome: 'EVELYN CARVAJAL PRADENAS', rut: '15428609-8', html: `<i class="fa fa-lg fa-check-circle" style=" color: green;"> </i>` },
    { nome: 'FRANCISCO JAVIE NUÑEZ PEREZ', rut: '18078284-2', html: `<i class="fa fa-lg fa-check-circle" style=" color: green;"> </i>` },
    { nome: 'LUIS FELIPE ALIAGA CAMPOS', rut: '18364231-6', html: `<i class="fa fa-lg fa-check-circle" style=" color: green;"> </i>` },
    { nome: 'AGUSTIN QUIROZ', rut: '10800988-8', html: `<i class="fa fa-lg fa-times-circle" style=" color: red;"> </i>` },
]

let trabalhadoresFGObjMex = [
    { nome: 'Gerardo Cantu Munoz', rfc: 'CAMG910320NA5', html: `<i class="fa fa-lg fa-check-circle" style=" color: green;"> </i>` },
]

let supplierFGObjMex = [
    { nome: 'Stratesys Technology Solutions', rfc: 'STS130823SQ3', html: `<i class="fa fa-lg fa-check-circle" style=" color: green;"> </i>` },
]

let FormatoDePagoObj = [
    { status: "Ok", field: "tipoDocumento", valueField: "Formato de pago cuotas obrero patronales", documentId: null, id: "6111defd795a17eddff13bac", created: "2021-09-08T02:05:49.6412979+00:00", modified: "2021-09-08T02:05:49.6412979+00:00" },
    { status: "Ok", field: "registroPatronal", valueField: "Y54-52513-12-3", documentId: null, id: "6111defd795a17eddff13bad", created: "2021-09-08T02:05:49.7097638+00:00", modified: "2021-09-08T02:05:49.7097638+00:00" },
    { status: "Ok", field: "rfc", valueField: "SEPC850120AB1", documentId: null, id: "6111defd795a17eddff13bae", created: "2021-09-08T02:05:49.7793685+00:00", modified: "2021-09-08T02:05:49.7793685+00:00" },
    { status: "Ok", field: "fecha", valueField: "01 01 2021", documentId: null, id: "6111defd795a17eddff13baf", created: "2021-09-08T02:05:49.8612163+00:00", modified: "2021-09-08T02:05:49.8612163+00:00" },
    { status: "Ok", field: "sipare", valueField: "Y2I6AA1B-4BY1-2-K1S1-4635-005UW4E-0000000-0000000-0000000-0G2K", documentId: null, id: "6111defd795a17eddff13bb0", created: "2021-09-08T02:05:49.9275316+00:00", modified: "2021-09-08T02:05:49.9275316+00:00" }
]

let ComprobanteDePagoObj = [
    { status: "Ok", field: "tipoDocumento", valueField: "Comprobante de pago cuotas obrero patronales", documentId: null, id: "6111defd795a17eddff13bac", created: "2021-09-08T02:05:49.6412979+00:00", modified: "2021-09-08T02:05:49.6412979+00:00" },
    { status: "Ok", field: "registroPatronal", valueField: "Y5452513123", documentId: null, id: "6111defd795a17eddff13bad", created: "2021-09-08T02:05:49.7097638+00:00", modified: "2021-09-08T02:05:49.7097638+00:00" },
    { status: "Invalid", field: "fecha", valueField: "2021 06 30", documentId: null, id: "6111defd795a17eddff13baf", created: "2021-09-08T02:05:49.8612163+00:00", modified: "2021-09-08T02:05:49.8612163+00:00" },
    { status: "Ok", field: "sipare", valueField: "Y2I6AA1B4BY12K1S14635005UW4E0000000000000000000000G2K", documentId: null, id: "6111defd795a17eddff13bb0", created: "2021-09-08T02:05:49.9275316+00:00", modified: "2021-09-08T02:05:49.9275316+00:00" }
]

let OpinionCumplimentoFiscalesObj = [
    { status: "Ok", field: "tipoDocumento", valueField: "Opinión del cumplimento de obligaciones fiscales", documentId: null, id: "6111defd795a17eddff13bac", created: "2021-09-08T02:05:49.6412979+00:00", modified: "2021-09-08T02:05:49.6412979+00:00" },
    { status: "Ok", field: "rfc", valueField: "SEPC850120AB1", documentId: null, id: "6111defd795a17eddff13bad", created: "2021-09-08T02:05:49.7097638+00:00", modified: "2021-09-08T02:05:49.7097638+00:00" },
    { status: "Ok", field: "enunciado(positivo)", valueField: "POSITIVO", documentId: null, id: "6111defd795a17eddff13baf", created: "2021-09-08T02:05:49.8612163+00:00", modified: "2021-09-08T02:05:49.8612163+00:00" },
    { status: "Ok", field: "fecha", valueField: "30 06 2021", documentId: null, id: "6111defd795a17eddff13bb0", created: "2021-09-08T02:05:49.9275316+00:00", modified: "2021-09-08T02:05:49.9275316+00:00" }
]

let sowIdUrlDetails = 'https://partner10.fgvms.com/pay_terms_request.do?id=z21031218302369571338a3b'
let sowIdUrlManage = 'https://partner10.fgvms.com/pay_terms_request.do?tabId=manage&ref=pay_terms_request_detail&id=z21031218302369571338a3b&buyerCode=D002&continueVersion=&parzpp=aes@oLDUOjf5wprxbXhmsJCy0m/pLxDSpoYOZ5fXQNo2vQquzTByFITy1lNCNBONLTTN&bidResponseId=&cf=1'

$(function () {
    let urlPageSplit = urlPaginaSupplier.split("=");
    idSupplier = urlPageSplit[1];

    carregarDadosObjetoSupplierSessionStorage();

})

function carregarDadosObjetoSupplierSessionStorage() {

    suppliersObject = JSON.parse(sessionStorage.getItem('suppliersObject'))

    supplierObject = suppliersObject.filter((suppliersObject => {
        return suppliersObject.companyCode == idSupplier
    }))

    fgCompanyCode = supplierObject[0].companyCode
    idSupplierUverifyGb = supplierObject[0].id
    sessionStorage.setItem('companyCode', fgCompanyCode);
    fgCompanyName = supplierObject[0].name
    sessionStorage.setItem('companyName', fgCompanyName);
    $('#headCompanyName').text(supplierObject[0].name)
    $('#headCompanyCode').text(supplierObject[0].companyCode);
    var status = supplierObject[0].status
    var badgeStatus
    if (status = 'Active') {
        badgeStatus = `<span class="badge badge-success"> <span data-i18n="perfil-fornecedor-status-ativa"> </span> <i class="fa fa-check"></i></span>`
    } else {
        badgeStatus = `<span class="badge badge-danger"> <span data-i18n="perfil-fornecedor-status-inativa"> </span> <i class="fa fa-times"></i></span>`
    }

    $('#headCompanyStatus').html(badgeStatus);
    $('#imgLinkSupplier').attr('src', fotoSupplier);
    $('#aLinkImgSupplier').attr('href', fotoSupplier);

    $('#headCompanyAddress').text(supplierObject[0].address);
    $('#headCompanyCity').text(supplierObject[0].city);
    $('#headCompanyState').text(supplierObject[0].stateProvince);
    $('#headCompanyCountry').text(supplierObject[0].country);
    $('#headCompanyZipPostalCode').text(supplierObject[0].zipPostalCode);
    $('#headCompanyContactPerson').text(supplierObject[0].supplierContactPerson);
    $('#headCompanyCIFNIF').text(supplierObject[0].customFields[0].value);
    $('#headSupplierCIF').val(supplierObject[0].customFields[0].value);
    $('#headSupplierCIF').val('SEPC850120AB1')

    let activityItemAction = activityItemObject[0].activityItemAction
    let sowId = activityItemObject[0].sowId

    // populaDocuments(fgCompanyCode, idSupplierUverifyGb)
    carregaActivityItemsArauco(fgCompanyCode, idSupplierUverifyGb)

}

function carregaActivityItemsArauco(objectRef, idSupplierUverifyGbFn) {

    if (objectRef == 'CSING') {
        $.each(activityItemSupplierList, function (key, val) {
            let activityItemCode = val.childObjectCode
            activityItemCode = activityItemCode.replace(/ /g, '')
            var linha = `<tr id="${activityItemCode}" value="${val.childObjectCode}" onClick="carregaDocArauco('${idSupplierUverifyGbFn}', '${val.module}', '${val.objectRef}', '${val.childObjectCode}')">
                     <td> ${val.childObjectCode} </td>                        
                     <td> ${val.objectRef}</td>
                     <td> ${val.module}</td>
                </tr>`

            $('#tableSupplierActivityItem').append(linha)
        });
    } else if (objectRef == 'STTS') {
        $.each(activityItemSupplierListMexico, function (key, val) {
            let activityItemCode = val.childObjectCode
            activityItemCode = activityItemCode.replace(/ /g, '')
            var linha = `<tr id="${activityItemCode}" value="${val.childObjectCode}" onClick="carregaDocMex('${idSupplierUverifyGbFn}', '${val.module}', '${val.objectRef}', '${val.childObjectCode}')">
                     <td> ${val.childObjectCode} </td>                        
                     <td> ${val.objectRef}</td>
                     <td> ${val.module}</td>
                </tr>`

            $('#tableSupplierActivityItem').append(linha)
        });
    } else {

        toastWarning('Sin Documentos o Actividads', 'Para proveedor - ' + objectRef)
        /*
        urlGetActivitiesItemsAll += objectRef
        var req = $.getJSON(urlGetActivitiesItemsAll, function (data) { });

        req.done(function (data) {

            $.each(data, function (key, val) {
                let activityItemCode = val.childObjectCode
                activityItemCode = activityItemCode.replace(/ /g, '')
                var linha = `<tr id="${activityItemCode}" value="${val.childObjectCode}" onClick="addDocuments('${idWorkerUverifyGb}', '${val.module}', '${val.objectRef}', '${val.childObjectCode}')">
                         <td> ${val.childObjectCode} </td>                        
                         <td> ${val.objectRef}</td>
                         <td> ${val.module}</td>
                    </tr>`

                $('#tableWorkerActivityItem').append(linha)
            });

        }).fail(function (data) {
            // toastError('Erro Error al descargar documentos para el elemento de actividad actividad', '')
            console.log(data);
        });
        */
    }

}

function carregaDocArauco(idSupplierUverifyGbFn, fgmodule, objecRef, childObjectCode) {
    console.log(idSupplierUverifyGbFn, fgmodule, objecRef, childObjectCode)

    if (childObjectCode == 'F-30') {
        let idBR20WK00000180 = '60b10f81e405a980487ffd32';
        let IdF30 = '60b14b3345f5297e45a70425'
        let urlDocF30 = 'https://uverify.blob.core.windows.net/corte-documents-upload/F-30.jpg';
        let urlDoc = 'https://uverifydevpoc1.azurewebsites.net/api/Document/documentById'

        tokenGB = sessionStorage.getItem('tokenGB');

        var requestItens = $.ajax({
            url: urlDoc,
            data: {
                "id": IdF30
            },
            method: "GET",
            headers: {
                "Authorization": `Bearer ${tokenGB}`,
                "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
            }
        });

        requestItens.done(function (documentos) {
            $(`#F-30`).remove();
            let uri = documentos.uri
            let name = documentos.name
            let data = documentos.created
            let idDocumento = documentos.id
            let funcionarioId = documentos.funcionarioId
            let moduleFg = fgmodule
            let disabled
            let nameActivity = name.split('~');
            let activityItemCode = nameActivity[1]

            var linhaDocumento =
                `<li class="media">
            <a data-fancybox="gallery" href="${uri}">
                <img class="author-box-picture mr-3" width="100" src="${uri}">                        
            </a> 
        <div class="media-body">
            <div class="media-right"><div class="text-primary" id="statuDoc_${idDocumento}"></div></div>
            <div class="media-description txt-black">
                <ul style="list-style-type: none; padding-left:0">
                    <li><b>${$.i18n('')}Elemento de Actividad: </b> ${activityItemCode} </li>                                                                                                                                                             
                    <li><b>${$.i18n('')}Fecha: </b> <span>${new Date(data).toLocaleDateString()} - ${new Date(data).toLocaleTimeString()}</span></li>                                              
                    <li><b>${$.i18n('')}Module: </b> ${moduleFg} </li> 
                </ul>
                <div class="row">
                <button class="btn btn-small btn-info mr-2 ml-3 mb-2" id="btnDetalhes_${idDocumento}" onclick="verificaTipoDocumentoArauco('${idDocumento}', '${activityItemCode}', '${uri}')">
                Analizar documento </button>
                <button class="btn btn-small btn-info mr-2 ml-1 mb-2 hide" data-toggle="collapse" id="plus_${idDocumento}" href="#detalhesDocumento_${idDocumento}" role="button" aria-expanded="true">
                    <i id="iconPlus_${idDocumento}" class="fa fa-minus"> </i>
                </button>
                <button class="btn btn-small btn-warning mr-2 ml-1 mb-2 hide" id="btnReabrir_${idDocumento}" onclick="reabrirAtividadeAnalise('${idSupplierUverifyGbFn}', '${activityItemCode}', '${idDocumento}')">
                Reabrir Actividad </button>
                </div>
                <div class="collapse" id="detalhesDocumento_${idDocumento}">
                <table class="table table-hover table-bordered table-sm bg-light" style="padding-left: 5px;" id="tabelaAnaliseDoc_${idDocumento}">
                   <thead>
                        <tr>
                            <th>Campo de documento</th>
                            <th>Valor del campo del documento</th>
                            <th>Status</th>
                        </tr>                                
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <br> 
                <table class="table table-hover table-bordered table-sm bg-light" style="padding-left: 5px;" id="tabelaAnaliseDocWorker_${idDocumento}">
                   <thead>
                        <tr>
                            <th>Trabajores</th>
                            <th>RUT</th>
                            <th>Status</th>
                        </tr>                                
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>                         
        </div>
        </li>`

            $('#listaDocumentos').append(linhaDocumento)

        });

    }
}

function carregaDocMex(idSupplierUverifyGbFn, fgmodule, objecRef, childObjectCode) {
    console.log(idSupplierUverifyGbFn, fgmodule, objecRef, childObjectCode)
    let tpDocumento = childObjectCode.replace(/ /g, "");
    let idDoc

    switch (tpDocumento) {
        case 'ComprobanteFiscalTrabajador':
            idDoc = '60c8c23f5a662e92c33fee94'
            break;
        case 'FormatoPagoCuotasObreroPatronales':
            idDoc = '611183df674be596ded838f7'
            break;

        case 'ComprobantePagoCuotasObreroPatronales':
            idDoc = '6111846d674be596ded838f8'
            break;

        case 'OpinionPositivaSAT':
            idDoc = '611197cd674be596ded838f9'
            break;
        default:

            break;
    }

    let urlDoc = 'https://uverifydevpoc1.azurewebsites.net/api/Document/documentById'

    tokenGB = sessionStorage.getItem('tokenGB');

    var requestItens = $.ajax({
        url: urlDoc,
        data: {
            "id": idDoc
        },
        method: "GET",
        headers: {
            "Authorization": `Bearer ${tokenGB}`,
            "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
        }
    });

    requestItens.done(function (documentos) {
        $(`#${tpDocumento}`).remove();
        let uri = documentos.uri
        let name = documentos.name
        let data = documentos.created
        let idDocumento = documentos.id
        let funcionarioId = documentos.funcionarioId
        let moduleFg = fgmodule
        let disabled
        let nameActivity = name.split('~');
        let activityItemCode = nameActivity[1]

        var linhaDocumento =
            `<li class="media">
            <a data-fancybox="gallery" href="${uri}">
                <img class="author-box-picture mr-3" width="100" src="${uri}">                        
            </a> 
        <div class="media-body">
            <div class="media-right"><div class="text-primary" id="statuDoc_${idDocumento}"></div></div>
            <div class="media-description txt-black">
                <ul style="list-style-type: none; padding-left:0">
                    <li><b>${$.i18n('')}Elemento de Actividad: </b> ${activityItemCode} </li>                                                                                                                                                             
                    <li><b>${$.i18n('')}Fecha: </b> <span>${new Date(data).toLocaleDateString()} - ${new Date(data).toLocaleTimeString()}</span></li>                                              
                    <li><b>${$.i18n('')}Module: </b> ${moduleFg} </li> 
                </ul>
                <div class="row">
                <button class="btn btn-small btn-info mr-2 ml-3 mb-2" id="btnDetalhes_${idDocumento}" onclick="verificaTipoDocumentoMex('${idDocumento}', '${activityItemCode}', '${uri}')">
                Analizar documento </button>
                <button class="btn btn-small btn-info mr-2 ml-1 mb-2 hide" data-toggle="collapse" id="plus_${idDocumento}" href="#detalhesDocumento_${idDocumento}" role="button" aria-expanded="true">
                    <i id="iconPlus_${idDocumento}" class="fa fa-minus"> </i>
                </button>
                <button class="btn btn-small btn-warning mr-2 ml-1 mb-2 hide" id="btnReabrir_${idDocumento}" onclick="reabrirAtividadeAnalise('${idSupplierUverifyGbFn}', '${activityItemCode}', '${idDocumento}')">
                Reabrir Actividad </button>
                </div>
                <div class="collapse" id="detalhesDocumento_${idDocumento}">
                <table class="table table-hover table-bordered table-sm bg-light" style="padding-left: 5px;" id="tabelaAnaliseDoc_${idDocumento}">
                   <thead>
                        <tr>
                            <th>Campo de documento</th>
                            <th>Valor del campo del documento</th>
                            <th>Status</th>
                        </tr>                                
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>                         
        </div>
        </li>`

        $('#listaDocumentos').append(linhaDocumento)

    }).fail(function (err) {
        swalMessage('', 'No existe documentos para esta opción')
    });
}

function carregaActivityItems(objectRef, idSupplierUverifyGbFn) {

    urlGetSupplierDocumentDownload += idSupplierUverifyGbFn

    var req = $.getJSON(urlGetSupplierDocumentDownload, function (data) { });

    req.done(function (data) {

        $.each(data, function (key, val) {

            console.log(data);
        });

    }).fail(function (data) {
        console.log(data);
    });

}

function addDocuments(idWorkerUverify, fgmodule, objecRef, childObjectCode) {

    let activityItemCode = childObjectCode.replace(/ /g, '')

    var requestItens = $.ajax({
        url: urlGetApiDocumentFieldglass,
        data: {
            "module": fgmodule,
            "objRef": objecRef,
            "itemRef": childObjectCode
        },
        method: "GET"
    });

    requestItens.done(function (data) {

        $(`#${activityItemCode}`).remove();
        populaDocuments1(data, fgmodule);

    }).fail(function (data) {
        console.log(data);
    });
}

function populaDocuments(objectRef, idSupplierUverifyGbFn) {

    urlGetSupplierDocumentDownload += idSupplierUverifyGbFn

    let companyIdFn
    let createdFn
    let externalIdFn
    let idFn
    let modifiedFn
    let objectNameFn
    let objectNameDeserializedFn
    let nameFn
    let sowIdFn
    let referenceIdFn
    let uriFn

    var req = $.getJSON(urlGetSupplierDocumentDownload, function (data) { });

    req.done(function (data) {

        $.each(data, function (key, val) {
            companyId = val.companyCode
            createdFn = new Date()
            externalIdFn = val.externalId
            idFn = val.id
            idSupplierUverifyGbFn = val.id
            modifiedFn = val.modified
            objectNameFn = val.name.split('~')
            nameFn = objectNameFn[1]
            sowIdFn = objectNameFn[0]
            referenceIdFn = val.referenceId
            uriFn = val.uri

            documentosTotais = documentosTotais + 1
            switch (status) {
                case 'Pending':
                    documentosEmAnalise = documentosEmAnalise + 1
                    break;
                case 'Error':
                    documentosInvalidos = documentosInvalidos + 1
                    break;
                case 'Success':
                    documentosValidos = documentosValidos + 1
                    break;
                default:
                    break;
            }

            let linhaDocumento =
                `<li class="media">
                    <a data-fancybox="gallery" href="${uriFn}">
                    <img class="author-box-picture mr-3" width="100" src="${uriFn}">                        
                </a> 

                <div class="media-body">
                    <div class="media-right"><div class="text-primary" id="statuDoc_${idFn}"></div></div>
                        <div class="media-description txt-black">
                            <ul style="list-style-type: none; padding-left:0">                                                                
                                <li><b>Nombre del documento:</b> ${nameFn} </li>
                                <li><b>Fecha: </b> <span>${new Date(createdFn).toLocaleDateString() + ' ' + new Date(createdFn).toLocaleTimeString()}</span></li>                                                           
                            </ul> 
                <div class="row">
                <button class="btn btn-small btn-info mr-2 ml-3 mb-2" id="btnDetalhes_${idFn}" onclick="verificaTipoDocumento('${idFn}', '${nameFn}', '${uriFn}', '${nameFn}')">
                Analizar documento </button>
                <button class="btn btn-small btn-info mr-2 ml-1 mb-2 hide" data-toggle="collapse" id="plus_${idFn}" href="#detalhesDocumento_${idFn}" role="button" aria-expanded="true">
                    <i id="iconPlus_${idFn}" class="fa fa-minus"> </i>
                </button>
                <button class="btn btn-small btn-warning mr-2 ml-1 mb-2 hide" id="btnReabrir_${idFn}" onclick="reabrirAtividadeAnalise('${sowIdFn}', '${nameFn}', '${idFn}')">
                Reabrir Actividad </button>
                </div>
                <div class="collapse" id="detalhesDocumento_${idFn}" style="overflow-y: scroll; height:300px;">
                <table class="table table-hover table-bordered bg-light" style="padding-left: 5px;" id="tabelaAnaliseDoc_${idFn}">
                <thead>
                     <tr>
                         <th>Campo de documento</th>
                         <th>Valor del campo del documento</th>
                         <th>Status</th>
                     </tr>                                
                 </thead>
                 <tbody>

                 </tbody>
             </table>
                </div>                         
                </div>
                </li>`

            $('#listaDocumentos').append(linhaDocumento)

        });

    }).fail(function (data) {
        console.log(data);
        toastError('Não foi possivel fazer o download: ' + objectRef, 'Id Supplier: ' + idSupplierUverifyGbFn)
    });

    $('#documentosTotais').text(documentosTotais.toString());
    $('#documentosValidos').text(documentosValidos);
    $('#documentosEmAnalise').text(documentosEmAnalise);
    $('#documentosInvalidos').text(documentosInvalidos);

}

function verificaTipoDocumentoArauco(idDocumento, tipoDocumento, urlReq) {

    let tipoDocumentoArauco = 'CERTIFICADO DE CUMPLIMIENTO DE OBLIGACIONES LABORALES Y PREVISIONALES'
    toastInfo('Verificación del tipo de documento...', '')

    $(`#btnDetalhes_${idDocumento}`).prop('disabled', true)

    tipoDocumento = 'CERTIFICADO DE CUMPLIMIENTO DE OBLIGACIONES'
    tipoDocumento = tipoDocumento.toLowerCase();
    const url = "https://validateocrgenerate.azurewebsites.net/api/generate";
    const request = {
        url: urlReq,
        type: tipoDocumento,
    };
    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })
        .then((r) => r.json())
        .then((responseStr) => {
            let respLowner = JSON.stringify(responseStr).toLowerCase() //Recebe o response em string para poder mapear se o tipoDocumento está nesse resultado
            var resultado = respLowner.includes(tipoDocumento) ? true : false;
            tipoDocumento = tipoDocumento + ' laborales y previsionales - (F30-1)'
            if (!resultado) {
                toastError('El documento NO es un: ', tipoDocumento)
                toastInfo('Reapertura del elementos de actividad ', `${tipoDocumento} en SAP Fieldglass`)
                let status = `<span class="badge badge-danger"> Tipo de documento no válido <span> <i class="fa fa-times"> </i> </span> </span>`
                $(`#statuDoc_${idDocumento}`).html(status);
                $(`#btnDetalhes_${idDocumento}`).hide();
                // let activityItem = activityItemNameList.filter(f => f.activityItemCode.toLowerCase() == tipoDocumentoArauco.toLowerCase())
                sendEmailSupplierInvalido(idSupplierUverifyGb, tipoDocumentoArauco, urlReq)

                // toastInfo('Reapertura del elemento de actividad en SAP Fieldglass: ', tipoDocumento)
                let data = new Date()
                let dateConverted = `${new Date(data).toLocaleDateString()} - ${new Date(data).toLocaleTimeString()}`
                let resultado = 'Actividad reabierta en Fieldglass'

                let statusOutput = `<span class="badge badge-success ml-2 mr-2"> Documento Reabierto en Fieldglass </span>`
                $(`#statuDoc_${idDocumento}`).append(statusOutput);

                setTimeout(() => {
                    toastSuccess(`Actividad: ${tipoDocumento} - ${resultado}`, `Fecha: ${dateConverted}`)
                }, 4000);
                // reopenActivityInvalid(workerId, activityItem, idDocumento)

            } else {
                toastSuccess('El documento es un: ', tipoDocumento)
                analiseDocumentoArauco(idDocumento, tipoDocumentoArauco, idSupplierUverifyGbFn, urlReq);
            }
            // console.log(resultado);
        });

}

function verificaTipoDocumentoMex(idDocumento, tipoDocumento, urlReq) {

    let tpDocumento = tipoDocumento.replace(/ /g, "");
    let tipoDocumentoApi

    switch (tpDocumento) {
        case 'ComprobanteFiscalTrabajador':
            tipoDocumento = 'comprobante fiscal'
            tipoDocumentoApi = 'Comprobante Fiscal Trabajador'

            break;
        case 'FormatoPagoCuotasObreroPatronales':
            tipoDocumento = 'formato para pago de cuotas obrero patronales'
            tipoDocumentoApi = 'Formato de Pago Cuotas Obrero Patronales'

            break;

        case 'ComprobantePagoCuotasObreroPatronales':
            tipoDocumento = 'comprobante de aplicac'
            tipoDocumentoApi = 'Comprobante de Pago Cuotas Obrero Patronales'

            break;

        case 'OpinionCumplimientoObligacionesFiscales':
            tipoDocumento = 'opini'
            tipoDocumentoApi = 'Opinion del cumplimiento de obligaciones fiscales'

            break;
        default:

            break;
    }

    toastInfo('Verificación del tipo de documento...', '')

    $(`#btnDetalhes_${idDocumento}`).prop('disabled', true)

    tipoDocumento = tipoDocumento.toLowerCase();
    const url = "https://validateocrgenerate.azurewebsites.net/api/generate";
    const request = {
        url: urlReq,
        type: tipoDocumento,
    };
    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })
        .then((r) => r.json())
        .then((responseStr) => {
            let respLowner = JSON.stringify(responseStr).toLowerCase() //Recebe o response em string para poder mapear se o tipoDocumento está nesse resultado
            var resultado = respLowner.includes(tipoDocumento) ? true : false;
            tipoDocumento = tipoDocumento
            if (!resultado) {
                toastError('El documento NO es un: ', tipoDocumentoApi)
                toastInfo('Reapertura del elementos de actividad ', `${tipoDocumento} en SAP Fieldglass`)
                let status = `<span class="badge badge-danger"> Tipo de documento no válido <span> <i class="fa fa-times"> </i> </span> </span>`
                $(`#statuDoc_${idDocumento}`).html(status);
                $(`#btnDetalhes_${idDocumento}`).hide();
                // let activityItem = activityItemNameList.filter(f => f.activityItemCode.toLowerCase() == tipoDocumentoApi.toLowerCase())
                sendEmailSupplierInvalido(idSupplierUverifyGb, tipoDocumentoApi, urlReq)

                // toastInfo('Reapertura del elemento de actividad en SAP Fieldglass: ', tipoDocumento)
                let data = new Date()
                let dateConverted = `${new Date(data).toLocaleDateString()} - ${new Date(data).toLocaleTimeString()}`
                let resultado = 'Actividad reabierta en Fieldglass'

                let statusOutput = `<span class="badge badge-success ml-2 mr-2"> Documento Reabierto en Fieldglass </span>`
                $(`#statuDoc_${idDocumento}`).append(statusOutput);

                setTimeout(() => {
                    toastSuccess(`Actividad: ${tipoDocumento} - ${resultado}`, `Fecha: ${dateConverted}`)
                }, 4000);
                // reopenActivityInvalid(workerId, activityItem, idDocumento)

            } else {
                toastSuccess('El documento es un: ', tipoDocumentoApi)
                analiseDocumentoMexProvedor(idDocumento, tipoDocumentoApi, idSupplierUverifyGbFn, urlReq);
            }
            // console.log(resultado);
        });

}

function verificaTipoDocumento(idDocumento, tipoDocumento, urlReq, nameFn) {
    let uriAzure = urlReq
    let nameDocument = nameFn
    toastInfo('Verificación del tipo de documento...', '')

    $(`#btnDetalhes_${idDocumento}`).prop('disabled', true) //desabilita o campo analisar documento

    let matchString

    let splited = tipoDocumento.split(' ');

    switch (splited[2]) {
        case 'AEAT':
            tipoDocumento = 'AEAT'
            documentAction = 'Adjuntar Certificado AEAT'
            matchString = 'Agencia Estatal de Administración Tributaria,'
            break;
        case 'TGSS':
            tipoDocumento = 'TGSS'
            documentAction = 'Adjuntar Certificado TGSS'
            matchString = 'Tesorería General De La Seguridad Social'
            break;
        default:
            break;
    }

    matchString = matchString.toLowerCase();
    const url = "https://validateocrgenerate.azurewebsites.net/api/generate";
    const request = {
        url: urlReq,
        type: matchString,
    };

    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })
        .then((r) => r.json())
        .then((responseString) => {
            let responseLower = JSON.stringify(responseString).toLowerCase()
            var resultado = responseLower.includes(matchString) ? true : false;

            if (!resultado) {
                toastError('El documento NO es un: ', tipoDocumento)
                let status = statusOutput = `<span class="badge badge-danger"> Tipo de documento no válido <span> <i class="fa fa-times"> </i> </span> </span>`
                $(`#statuDoc_${idDocumento}`).html(status);
                $(`#btnDetalhes_${idDocumento}`).hide();
                // let activityItem = activityItemNameList.filter(f => f.activityItemCode == tipoDocumento)
                let sowId = 'D002TQ00000025'
                let companyCode = supplierObject[0].companyCode
                let companyName = supplierObject[0].name
                sendEmailSupplierInvalido(sowId, tipoDocumento, companyCode, companyName, uriAzure, nameDocument)
                toastInfo('Reapertura del elemento de actividad ', `${tipoDocumento} en SAP Fieldglass`)
                reopenActivityInvalid(sowId, documentAction, idDocumento)

            } else {
                toastSuccess('El documento es un: ', tipoDocumento)
                analiseDocumento(idDocumento, tipoDocumento, idSupplierUverifyGb, uriAzure, nameDocument);
            }
            console.log(resultado);
        });

}


function analiseDocumento(idDocumento, tipoDocumento, idSupplierUverifyGbFunction, uriDoc, nameDoc) {

    $(`#plus_${idDocumento}`).removeClass('hide') //mostra o toggle button para exibir a area da analise

    $(`#plus_${idDocumento}`).on('click', function (e) {
        var valorAria = $(`#plus_${idDocumento}`).attr('aria-expanded')
        if (valorAria == "true") {
            $(`#iconPlus_${idDocumento}`).removeClass('fa-minus').addClass('fa-plus');
        } else {
            $(`#iconPlus_${idDocumento}`).removeClass('fa-plus').addClass('fa-minus');
        }
    });

    // let activityItem = activityItemNameList.filter(f => f.activityItemCode == tipoDocumento)

    let sowId = 'D002TQ00000025'
    let documentAction
    let tipoDocumentoConvertido

    switch (tipoDocumento) {
        case 'AEAT':
            tipoDocumento = 'AEAT'
            documentAction = 'Adjuntar Certificado AEAT'
            matchString = 'Agencia Estatal de Administración Tributaria,'
            break;
        case 'TGSS':
            tipoDocumento = 'TGSS'
            documentAction = 'Adjuntar Certificado TGSS'
            matchString = 'secretaría de estado de la seguridad social'
            break;
        default:
            break;
    }

    var urlAnaliseDoc = `${urlGetAnaliseDocumentosFuncionarios}${idDocumento}/${tipoDocumento}/${idSupplierUverifyGbFunction}`

    var req = $.getJSON(urlAnaliseDoc, function (data) { });

    req.done(function (data) {
        globalAnalyzeObject = data
        let indexAnalyzeObject = globalAnalyzeObject.length;
        let statusInvalid = 0

        $.each(data, function (key, val) {
            let fieldWorkerFG
            let status
            switch (val.field) {
                case 'tipoDocumento':
                    toastInfo('tipoDocumento', val.valueField)
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'personaEntidad':
                    toastInfo('personaEntidad', val.valueField)
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'cifNif':
                    toastInfo('cifNif', val.valueField)
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'estado':
                    toastInfo('estado', val.valueField)
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'fecha':
                    toastInfo('fecha', val.valueField)
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                default:
                    break;
            }

            var linhaAnalise =
                `<tr>
                <td>${val.field}</td>   
                <td>${val.valueField}</td>
                <td>${val.status}</td>
                </tr>`
            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
        });

        if (statusInvalid >= 1) {
            let status = statusOutput = `<span class="badge badge-danger"> Documento inv��lido <span> <i class="fa fa-times"> </i> </span> </span>`
            $(`#statuDoc_${idDocumento}`).html(status);
            let companyCode = supplierObject[0].companyCode
            let companyName = supplierObject[0].name
            sendEmailSupplierAnalise(sowId, documentAction, companyCode, companyName, uriDoc, nameDoc, sowIdUrlManage)
            reopenActivityAnalyze(sowId, documentAction, idDocumento)
        } else {
            let statusOutput = `<span class="badge badge-success"> Documento válido  <span> <i class="fa fa-check"> </i> </span> </span>`
            $(`#statuDoc_${idDocumento}`).html(statusOutput)
        }

        $(`#detalhesDocumento_${idDocumento}`).addClass('show');

    }).fail(function (fail) {
        console.log(fail.responseText)
        let resText = fail.responseText;
        let statusOutput = `<span class="badge badge-warning"> Analizando  <span> <i class="fa fa-times"> </i> </span> </span>`
        // toastWarning('Document Template Not Found', 'Training Document')
        $(`#statuDoc_${idDocumento}`).html(statusOutput);
        $(`#plus_${idDocumento}`).hide();
    });

}

function analiseDocumentoArauco(idDocumento, tipoDocumento, idSupplierUverifyGbFunction, uriDoc, nameDoc) {

    $(`#plus_${idDocumento}`).removeClass('hide') //mostra o toggle button para exibir a area da analise

    $(`#plus_${idDocumento}`).on('click', function (e) {
        var valorAria = $(`#plus_${idDocumento}`).attr('aria-expanded')
        if (valorAria == "true") {
            $(`#iconPlus_${idDocumento}`).removeClass('fa-minus').addClass('fa-plus');
        } else {
            $(`#iconPlus_${idDocumento}`).removeClass('fa-plus').addClass('fa-minus');
        }
    });

    let url = 'https://validateocrprocess.azurewebsites.net/api/Process'
    let urlDocumentoAzure = "https://uverify.blob.core.windows.net/corte-documents-upload/F-30.jpg"

    let settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "url": urlDocumentoAzure,
            "type": tipoDocumento
        }),
    };

    $.ajax(settings).done(function (response) {
        // console.log(response);
        dataOCRDocument = JSON.parse(response)
        let obj = dataOCRDocument.Content[0]
        let statusInvalid = 0


        $.each(obj, function (key, val) {
            switch (key) {
                case 'AÑO':
                    var linhaAnalise =
                        `<tr>
                    <td>${key}</td>   
                    <td>${val}</td>
                    <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                    </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                    break;
                case 'ESTADO PAGADA':
                    var linhaAnalise =
                        `<tr>
                    <td>${key}</td>   
                    <td>${val}</td>
                    <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                    </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                    break;
                case 'MES':
                    var linhaAnalise =
                        `<tr>
                    <td>${key}</td>   
                    <td>${val}</td>
                    <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                    </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                    break;
                case 'Nº TRABAJADORES':
                    let html
                    if (trabalhadoresFGObj.length == 5) {
                        html = `<i class="fa fa-lg fa-times-circle" style=" color: red;"> </i>`
                        statusInvalid += 1
                    } else {
                        html = `<i class="fa fa-lg fa-check-circle" style=" color: green;"> </i>`
                    }
                    var linhaAnalise =
                        `<tr>
                    <td>${key}</td>   
                    <td>${val}</td>
                    <td>${html}</td>
                    </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                    break;
                case 'RAZÓN SOCIAL / NOMBRE':
                    var linhaAnalise =
                        `<tr>
                    <td>${key}</td>   
                    <td>${val}</td>
                    <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                    </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                    break;
                case 'RUT RAZÓN SOCIAL':
                    var linhaAnalise =
                        `<tr>
                    <td>${key}</td>   
                    <td>${val}</td>
                    <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                    </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                    break;
                case 'TIPO DOCUMENTO':
                    var linhaAnalise =
                        `<tr>
                    <td>${key}</td>   
                    <td>${val}</td>
                    <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                    </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                    break;
                case 'TRABAJADOR 1':
                    var linhaAnalise =
                        `<tr>
                    <td>${val}</td>   
                    <td>${obj["RUT 1"]}</td>
                    <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i> </td>
                    </tr>`
                    $(`#tabelaAnaliseDocWorker_${idDocumento}`).append(linhaAnalise)

                    break;
                case 'TRABAJADOR 2':
                    var linhaAnalise =
                        `<tr>
                    <td>${val}</td>   
                    <td>${obj["RUT 2"]}</td>
                    <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                    </tr>`
                    $(`#tabelaAnaliseDocWorker_${idDocumento}`).append(linhaAnalise)

                    break;
                case 'TRABAJADOR 3':
                    var linhaAnalise =
                        `<tr>
                    <td>${val}</td>   
                    <td>${obj["RUT 3"]}</td>
                    <td> <i class="fa fa-lg fa-check-circle" style=" color: green;"> </i> </td>
                    </tr>`
                    $(`#tabelaAnaliseDocWorker_${idDocumento}`).append(linhaAnalise)
                    break;
                case 'TRABAJADOR 4':
                    var linhaAnalise =
                        `<tr>
                    <td>${val}</td>   
                    <td>${obj["RUT 4"]}</td>
                    <td> <i class="fa fa-lg fa-check-circle" style=" color: green;"> </i> </td>
                    </tr>`
                    $(`#tabelaAnaliseDocWorker_${idDocumento}`).append(linhaAnalise)
                    break;
                default:
                    break;
            }

        });

        $("#mesAnoPeriodo").text("Mês/Ano - 03/2020")
        if (trabalhadoresFGObj.length == 5) {
            $("#numeroTrabalhadores").text('N° Trabajadores: ' + trabalhadoresFGObj.length)
        } else {
            $("#numeroTrabalhadores").text('N° Trabajadores: ' + trabalhadoresFGObj.length)
        }


        $.each(trabalhadoresFGObj, function (key, val) {
            var linhaAnalise1 =
                `<tr>
                    <td>${val.nome}</td>   
                    <td>${val.rut}</td>
                    <td>${val.html}</td>
                    </tr>`
            $(`#tabelaTrabalhadoresFG`).append(linhaAnalise1)
        })
        $('#divListaTrabalhadores').attr('hidden', false);

        if (statusInvalid >= 1) {
            let status = statusOutput = `<span class="badge badge-danger"> Documento no válido <span> <i class="fa fa-times"> </i> </span> </span>`
            $(`#statuDoc_${idDocumento}`).html(status);
            let companyCode = supplierObject[0].companyCode
            let companyName = supplierObject[0].name
            sendEmailSupplierAnalise(idDocumento, tipoDocumento, idSupplierUverifyGbFunction, uriDoc, nameDoc)
            // reopenActivityAnalyze(sowId, documentAction, idDocumento)
        } else {
            let statusOutput = `<span class="badge badge-success"> Documento válido  <span> <i class="fa fa-check"> </i> </span> </span>`
            $(`#statuDoc_${idDocumento}`).html(statusOutput)
        }

        $(`#detalhesDocumento_${idDocumento}`).addClass('show');


    }).fail(function (response) {
        console.log(response)
        let stringRetorno = response.status + ' ' + response.statusText
        toastWarning('Template Não Encontrado', stringRetorno)
    });

    // var urlAnaliseDoc = `${urlGetAnaliseDocumentosFuncionarios}${idDocumento}/${tipoDocumento}/${idSupplierUverifyGbFunction}`

    // var req = $.getJSON(urlAnaliseDoc, function (data) { });

    // req.done(function (data) {
    //     globalAnalyzeObject = data
    //     let indexAnalyzeObject = globalAnalyzeObject.length;
    //     let statusInvalid = 0

    // }).fail(function (fail) {
    //     console.log(fail.responseText)
    //     let resText = fail.responseText;
    //     let statusOutput = `<span class="badge badge-warning"> Analizando  <span> <i class="fa fa-times"> </i> </span> </span>`
    //     // toastWarning('Document Template Not Found', 'Training Document')
    //     $(`#statuDoc_${idDocumento}`).html(statusOutput);
    //     $(`#plus_${idDocumento}`).hide();
    // });

}

function analiseDocumentoMexProvedor(idDocumento, tipoDocumento, idSupplierUverifyGbFunction, uriDoc, nameDoc) {

    $(`#plus_${idDocumento}`).removeClass('hide') //mostra o toggle button para exibir a area da analise

    $(`#plus_${idDocumento}`).on('click', function (e) {
        var valorAria = $(`#plus_${idDocumento}`).attr('aria-expanded')
        if (valorAria == "true") {
            $(`#iconPlus_${idDocumento}`).removeClass('fa-minus').addClass('fa-plus');
        } else {
            $(`#iconPlus_${idDocumento}`).removeClass('fa-plus').addClass('fa-minus');
        }
    });

    let tpDocumento = tipoDocumento.replace(/ /g, "");
    let tipoDocumentoApi
    let obj
    let statusInvalid = 0

    switch (tpDocumento) {
        case 'ComprobanteFiscalTrabajador':
            tipoDocumento = 'comprobante fiscal'
            tipoDocumentoApi = 'Comprobante Fiscal Trabajador'
            // obj = ComprobanteDePagoObj

            break;
        case 'FormatodePagoCuotasObreroPatronales':
            tipoDocumento = 'formato para pago de cuotas obrero patronales'
            tipoDocumentoApi = 'Formato de Pago Cuotas Obrero Patronales'
            obj = FormatoDePagoObj

            break;

        case 'ComprobantedePagoCuotasObreroPatronales':
            tipoDocumento = 'comprobante de aplicac'
            tipoDocumentoApi = 'Comprobante de Pago Cuotas Obrero Patronales'
            obj = ComprobanteDePagoObj

            break;

        case 'Opiniondelcumplimientodeobligacionesfiscales':
            tipoDocumento = 'opini'
            tipoDocumentoApi = 'Opinion del cumplimiento de obligaciones fiscales'
            obj = OpinionCumplimentoFiscalesObj

            break;
        default:
            console.log('Sem dados')
            break;
    }

    let stringValid = `<td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>`;
    let stringInvalid = `<td><i class="fa fa-lg fa-times-circle" style=" color: red;"> </i></td>`;
    let finalString

    $.each(obj, function (key, val) {
        val.status != 'Ok' ? statusInvalid += 1 : statusInvalid;
        val.status != 'Ok' ? finalString = stringInvalid : finalString = stringValid;
        switch (val.field) {
            case 'tipoDocumento':
                var linhaAnalise =
                    `<tr>
                        <td>${val.field}</td>   
                        <td>${val.valueField}</td>
                        ${finalString}
                        </tr>`
                $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                break;
            case 'registroPatronal':
                var linhaAnalise =
                    `<tr>
                        <td>${val.field}</td>   
                        <td>${val.valueField}</td>
                        ${finalString}
                        </tr>`
                $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                break;
            case 'rfc':
                var linhaAnalise =
                    `<tr>
                        <td>${val.field}</td>   
                        <td>${val.valueField}</td>
                        ${finalString}
                        </tr>`
                $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                break;
            case 'fecha':
                var linhaAnalise =
                    `<tr>
                        <td>${val.field}</td>   
                        <td>${val.valueField}</td>
                        ${finalString}
                        </tr>`
                $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                break;
            case 'sipare':
                var linhaAnalise =
                    `<tr>
                        <td>${val.field}</td>   
                        <td>${val.valueField}</td>
                        ${finalString}
                        </tr>`
                $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                break;
            case 'enunciado(positivo)':
                var linhaAnalise =
                    `<tr>
                        <td>${val.field}</td>   
                        <td>${val.valueField}</td>
                        ${finalString}
                        </tr>`
                $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                break;
            
            default:
                break;
        }

    });

    // $('#divListaTrabalhadores').attr('hidden', false);

    if (statusInvalid >= 1) {
        let status = statusOutput = `<span class="badge badge-danger"> Documento no válido <span> <i class="fa fa-times"> </i> </span> </span>`
        $(`#statuDoc_${idDocumento}`).html(status);
        let companyCode = supplierObject[0].companyCode
        let companyName = supplierObject[0].name
        sendEmailSupplierAnalise(idDocumento, tipoDocumento, idSupplierUverifyGbFunction, uriDoc, nameDoc)
        // reopenActivityAnalyze(sowId, documentAction, idDocumento)
    } else {
        let statusOutput = `<span class="badge badge-success"> Documento válido  <span> <i class="fa fa-check"> </i> </span> </span>`
        $(`#statuDoc_${idDocumento}`).html(statusOutput)
    }

    $(`#detalhesDocumento_${idDocumento}`).addClass('show');


}

function analiseDocumentoMex(idDocumento, tipoDocumento, idSupplierUverifyGbFunction, uriDoc, nameDoc) {

    $(`#plus_${idDocumento}`).removeClass('hide') //mostra o toggle button para exibir a area da analise

    $(`#plus_${idDocumento}`).on('click', function (e) {
        var valorAria = $(`#plus_${idDocumento}`).attr('aria-expanded')
        if (valorAria == "true") {
            $(`#iconPlus_${idDocumento}`).removeClass('fa-minus').addClass('fa-plus');
        } else {
            $(`#iconPlus_${idDocumento}`).removeClass('fa-plus').addClass('fa-minus');
        }
    });

    let tpDocumento = tipoDocumento.replace(/ /g, "");
    let tipoDocumentoApi

    switch (tpDocumento) {
        case 'ComprobanteFiscalTrabajador':
            tipoDocumento = 'comprobante fiscal'
            tipoDocumentoApi = 'Comprobante Fiscal Trabajador'

            break;
        case 'FormatoPagoCuotasObreroPatronales':
            tipoDocumento = 'formato para pago de cuotas obrero patronales'
            tipoDocumentoApi = 'Formato de Pago Cuotas Obrero Patronales'

            break;

        case 'ComprobantePagoCuotasObreroPatronales':
            tipoDocumento = 'comprobante de aplicac'
            tipoDocumentoApi = 'Comprobante de Pago Cuotas Obrero Patronales'

            break;

        case 'OpinionCumplimientoObligacionesFiscales':
            tipoDocumento = 'opini'
            tipoDocumentoApi = 'Opinion del cumplimiento de obligaciones fiscales'
            break;
        default:

            break;
    }

    if (tpDocumento == 'ComprobanteFiscalTrabajador') {

        var requestXML = $.ajax({
            // url: 'https://uverify.blob.core.windows.net/documents/xmlMex.xml',
            url: '../mock/xmlMex.xml',
            type: "GET"
        });

        requestXML.done(function (data) {
            console.log(data)
            var xml = data
            let statusInvalid = 0
            $(data).find("cfdi\\:Comprobante").each(function () {
                let obj = {
                    TipoDeComprobante: $(this).attr('TipoDeComprobante'),
                    EmisorNombre: $(this).find("cfdi\\:Emisor").attr('Nombre'),
                    EmisorRfc: $(this).find("cfdi\\:Emisor").attr('Rfc'),
                    ReceptorNombre: $(this).find("cfdi\\:Receptor").attr('Nombre'),
                    ReceptorRfc: $(this).find("cfdi\\:Receptor").attr('Rfc'),
                    NominaFechaInicialPago: $(this).find("nomina12\\:Nomina").attr('FechaInicialPago'),
                    NominaFechaFinalPago: $(this).find("nomina12\\:Nomina").attr('FechaFinalPago'),
                    NominaFechaPago: $(this).find("nomina12\\:Nomina").attr('FechaPago'),
                    NominaDiasPagados: $(this).find("nomina12\\:Nomina").attr('NumDiasPagados')
                }
                let _tipoDeComprobante
                let _emisorNombre
                let _emisorRfc
                let _receptorNombre
                let _receptorRfc
                let _nominaFechaInicialPago
                let _nominaFechaFinalPago
                let _nominaFechaPago
                let _nominaNumDiasPagados

                $(data).find("nomina12\\:Deduccion").each(function () {
                    let x = `TipoDeduccion${$(this).attr('TipoDeduccion')}`
                    obj[`${x}`] = $(this).attr('TipoDeduccion');
                    // console.log($(this).attr('TipoDeduccion'));
                })

                $.each(obj, function (key, val) {
                    switch (key) {
                        case 'TipoDeComprobante':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                            break;
                        case 'EmisorNombre':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                            break;
                        case 'EmisorRfc':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                            break;
                        case 'NominaFechaInicialPago':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                            break;
                        case 'NominaFechaFinalPago':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i> </td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                            break;
                        case 'NominaFechaPago':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                            break;
                        case 'NominaDiasPagados':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td> <i class="fa fa-lg fa-check-circle" style=" color: green;"> </i> </td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                            break;
                        case 'NominaDiasPagados':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td> <i class="fa fa-lg fa-check-circle" style=" color: green;"> </i> </td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                            break;
                        case 'TipoDeduccion001':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td> <i class="fa fa-lg fa-check-circle" style=" color: green;"> </i> </td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                            break;
                        case 'TipoDeduccion002':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td> <i class="fa fa-lg fa-check-circle" style=" color: green;"> </i> </td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                            break;
                        case 'TipoDeduccion004':
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td> <i class="fa fa-lg fa-check-circle" style=" color: green;"> </i> </td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                            break;
                        case 'ReceptorNombre':
                            var linhaAnalise =
                                `<tr>
                        <td>${val}</td>   
                        <td>${obj.ReceptorRfc}</td>
                        <td> <i class="fa fa-lg fa-check-circle" style=" color: green;"> </i> </td>
                        </tr>`
                            $(`#tabelaAnaliseDocWorker_${idDocumento}`).append(linhaAnalise)
                            break;
                        case '':
                            let html
                            if (trabalhadoresFGObj.length == 5) {
                                html = `<i class="fa fa-lg fa-times-circle" style=" color: red;"> </i>`
                                statusInvalid += 1
                            } else {
                                html = `<i class="fa fa-lg fa-check-circle" style=" color: green;"> </i>`
                            }
                            var linhaAnalise =
                                `<tr>
                        <td>${key}</td>   
                        <td>${val}</td>
                        <td>${html}</td>
                        </tr>`
                            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                            break;
                        default:
                            break;
                    }

                });

                $("#mesAnoPeriodo").text("Mes/Año - 05/2021")
                if (trabalhadoresFGObjMex.length == 5) {
                    $("#numeroTrabalhadores").text('N° Trabajadores: ' + trabalhadoresFGObjMex.length)
                } else {
                    $("#numeroTrabalhadores").text('N° Trabajadores: ' + trabalhadoresFGObjMex.length)
                }


                $.each(trabalhadoresFGObjMex, function (key, val) {
                    var linhaAnalise1 =
                        `<tr>
                        <td>${val.nome}</td>   
                        <td>${val.rfc}</td>
                        <td>${val.html}</td>
                        </tr>`
                    $(`#tabelaTrabalhadoresFG`).append(linhaAnalise1)
                })

                $.each(supplierFGObjMex, function (key, val) {
                    var linhaAnalise1 =
                        `<tr>
                        <td>${val.nome}</td>   
                        <td>${val.rfc}</td>
                        <td>${val.html}</td>
                        </tr>`
                    $(`#tabelaSuppliersFG`).append(linhaAnalise1)
                })

                $('#divListaTrabalhadores').attr('hidden', false);

                if (statusInvalid >= 1) {
                    let status = statusOutput = `<span class="badge badge-danger"> Documento no válido <span> <i class="fa fa-times"> </i> </span> </span>`
                    $(`#statuDoc_${idDocumento}`).html(status);
                    let companyCode = supplierObject[0].companyCode
                    let companyName = supplierObject[0].name
                    sendEmailSupplierAnalise(idDocumento, tipoDocumento, idSupplierUverifyGbFunction, uriDoc, nameDoc)
                    // reopenActivityAnalyze(sowId, documentAction, idDocumento)
                } else {
                    let statusOutput = `<span class="badge badge-success"> Documento válido  <span> <i class="fa fa-check"> </i> </span> </span>`
                    $(`#statuDoc_${idDocumento}`).html(statusOutput)
                }

                $(`#detalhesDocumento_${idDocumento}`).addClass('show');

            })
        }).fail(function (errorData) {
            console.log(errorData)
            // let stringRetorno = response.status + ' ' + response.statusText
            toastWarning('Template Não Encontrado', errorData)
        })

    } else {

        alert('sin datos')
    }

}

function sendEmailSupplierAnalise(idDocumento, tipoDocumento, idSupplierUverifyGbFunction, uriDoc, nameDoc) {
    let nameDocRecebido = uriDoc.split('~')
    let emails = ['vinicius.oliveira@stratesys-ts.com', 'francis.santos@stratesys-ts.com'];

    let companyCode = sessionStorage.getItem('companyCode')
    let companyName = sessionStorage.getItem('companyName')
    let compAll = companyCode + ' - ' + companyName
    let sowIdUrlManage = ''

    var data = {
        service_id: 'service_neqxz4d',
        template_id: 'template_rsuunw2',
        user_id: 'user_weNYJz9aVXzLrO6fpld8N',
        template_params: {
            'from_name': 'U-verify by Stratesys',
            'to_emails': emails,
            'companyName': companyName,
            'companyCode': companyCode,
            'sowId': companyCode,
            'documentAction': tipoDocumento,
            'uriDoc': uriDoc,
            'from_name': nameDoc,
            'nameDoc': nameDoc,
            'sowIdUrlManage': sowIdUrlManage,
            'message': emails
        }
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function () {
        toastSuccess('Correo Enviado', '')
    }).fail(function (error) {
        let errorRes = JSON.stringify(error)
        toastWarning('Correo', errorRes)
    });
}

// function sendEmailSupplierInvalido(sowId, documentAction, companyCode, companyName, uriDoc, nameDoc) {
//     let nameDocRecebido = uriDoc.split('~')
//     let emails = ['vinicius.oliveira@stratesys-ts.com', 'francis.santos@stratesys-ts.com'];

//     var data = {
//         service_id: 'service_neqxz4d',
//         template_id: 'template_ynip8ff',
//         user_id: 'user_weNYJz9aVXzLrO6fpld8N',
//         template_params: {
//             'from_name': 'U-verify by Stratesys',
//             'to_emails': emails,
//             'companyName': companyName,
//             'companyCode': companyCode,
//             'sowId': sowId,
//             'documentAction': documentAction,
//             'uriDoc': uriDoc,
//             'from_name': nameDoc,
//             'nameDoc': nameDoc,
//             'sowIdUrlManage': sowIdUrlManage,
//             'nameDocRecebido': nameDocRecebido[1],
//             'message': ''
//         }
//     };

//     $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
//         type: 'POST',
//         data: JSON.stringify(data),
//         contentType: 'application/json'
//     }).done(function () {
//         toastSuccess('Correo Enviado', '')
//     }).fail(function (error) {
//         toastWarning('Correo', errorRes)
//     });
// }

function exibirItens() {
    //addressMII + queryUrl + "/ListarEquipamentos&OutputParameter=*";

    //var url = mii_servti + queryUrl + pathQueries + contentXml;

    var requestXML = $.ajax({
        // url: 'https://uverify.blob.core.windows.net/documents/xmlMex.xml',
        url: '../mock/xmlMex.xml',
        type: "GET"
    });

    requestXML.done(function (data) {
        console.log(data)
        var xml = data
        $(data).find("cfdi\\:Comprobante").each(function () {
            let _tipoDeComprobante = $(this).attr('TipoDeComprobante');
            let _emisorNombre = $(this).find("cfdi\\:Emisor").attr('Nombre');
            let _emisorRfc = $(this).find("cfdi\\:Emisor").attr('Rfc');
            let _receptorNombre = $(this).find("cfdi\\:Receptor").attr('Nombre');
            let _receptorRfc = $(this).find("cfdi\\:Receptor").attr('Rfc');
            let _nominaFechaInicialPago = $(this).find("nomina12\\:Nomina").attr('FechaInicialPago');
            let _nominaFechaFinalPago = $(this).find("nomina12\\:Nomina").attr('FechaFinalPago');
            let _nominaFechaPago = $(this).find("nomina12\\:Nomina").attr('FechaPago');
            let _nominaNumDiasPagados = $(this).find("nomina12\\:Nomina").attr('NumDiasPagados');
            $(data).find("nomina12\\:Deduccion").each(function () {
                let _nominaDeduccion001 = $(this).attr('TipoDeduccion');
                console.log($(this).attr('TipoDeduccion'));
            })


            // $(this).attr("RegimenFiscal")
        })
    }).fail(function (errorData) {
        console.log(errorData)
    })
}

function reabrirAtividadeInvalid(sowID, activityItemObject) {

    // globalActivityItemAction = activityItemObject[0].activityItemAction

    var settings = {
        "url": `https://us-central1-uqualify-brasil.cloudfunctions.net/fieldglass?sowId=${sowID}&action=reopen`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "description": `${activityItemObject}`
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response)
        let data = response.DataHoraConsulta
        let resultado = response.Resultado
        let erro = response.Erro
        let sucesso = response.Sucesso
        if (sucesso == true) {
            toastSuccess(`Éxito: ${resultado}`, `Fecha: ${data}`)
        } else {
            toastWarning(`Aviso: ${erro} `, `Fecha: ${data}`)
        }
    }).fail(function (fail) {
        console.log(fail);
    });
}

function reabrirAtividadeAnalise(sowID, activityItemObject, idDocumento) {

    //debugger;
    if (!globalActivityItemAction) {
        globalActivityItemAction = activityItemObject
        //let activityItemAction = activityItemNameList.filter(f => f.tipoDocumento.toLowerCase() == tipoDocumento.toLowerCase())
        //globalActivityItemAction = activityItemAction[0].activityItemAction
    }
    toastInfo('Reapertura del elemento de actividad en SAP Fieldglass: ', globalActivityItemAction)

    var settings = {
        "url": `https://us-central1-uqualify-brasil.cloudfunctions.net/fieldglass?sowId=${sowID}&action=reopen`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "description": `${activityItemObject}`
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response)
        let data = response.DataHoraConsulta
        let resultado = response.Resultado
        let erro = response.Erro
        let sucesso = response.Sucesso
        if (sucesso == true && resultado) {
            $(`#btnReabrir_${idDocumento}`).removeClass('show').addClass('hide')
            let statusOutput = `<span class="badge badge-success ml-2 mr-2"> Documento Reabierto en Fieldglass </span>`
            $(`#statuDoc_${idDocumento}`).append(statusOutput);
            toastSuccess(`Actividad: ${globalActivityItemAction} - ${resultado}`, `Fecha: ${data}`)
        } else if (sucesso == false && resultado) {
            $(`#btnReabrir_${idDocumento}`).removeClass('show').addClass('hide')
            let statusOutput = `<span class="badge badge-warning ml-2 mr-2"> La actividad ya está abierta en Fieldglass </span>`
            $(`#statuDoc_${idDocumento}`).append(statusOutput);
            toastWarning(`Aviso actividad: ${globalActivityItemAction} - ${resultado} `, `Fecha: ${data}`)
        } else {
            let statusOutput = `<span class="badge badge-warning ml-2 mr-2"> La actividad está abierta en Fieldglass </span>`
            $(`#statuDoc_${idDocumento}`).append(statusOutput);
            toastWarning(`Aviso actividad: ${globalActivityItemAction} - ${erro} `, `Fecha: ${data}`)
        }
    }).fail(function (fail) {
        console.log(fail);
        // $(`#btnReabrir_${idDocumento}`).removeClass('hide').addClass('show')
        $(`#btnReabrir_${idDocumento}`).removeClass('hide').addClass('show')
        let error = fail.statusText
        toastError('Erro reapertura actividad', error)
    });
}

function reopenActivityInvalid(workerID, tipoDocumento, idDocumento) {

    // if (typeof tipoDocumento === "object") {
    //     globalActivityItemAction = tipoDocumento[0].activityItemAction
    // }

    toastInfo('Reapertura del elemento de actividad en SAP Fieldglass: ', tipoDocumento)
    let data = new Date()
    let dateConverted = `${new Date(data).toLocaleDateString()} - ${new Date(data).toLocaleTimeString()}`
    let resultado = 'Actividad reabierta en Fieldglass'

    let statusOutput = `<span class="badge badge-success ml-2 mr-2"> Documento Reabierto en Fieldglass </span>`
    $(`#statuDoc_${idDocumento}`).append(statusOutput);

    setTimeout(() => {
        toastSuccess(`Actividad: ${tipoDocumento} - ${resultado}`, `Fecha: ${dateConverted}`)
    }, 4000);
}

function reopenActivityAnalyze(workerID, tipoDocumento, idDocumento) {

    // if (!globalActivityItemAction){
    //     let activityItemAction = activityItemNameList.filter(f => f.tipoDocumento.toLowerCase() == tipoDocumento.toLowerCase())
    //     globalActivityItemAction = activityItemAction[0].activityItemAction
    // }


    toastInfo('Reapertura del elemento de actividad en SAP Fieldglass: ', tipoDocumento)
    let data = new Date()
    let dateConverted = `${new Date(data).toLocaleDateString()} - ${new Date(data).toLocaleTimeString()}`
    let resultado = 'Actividad reabierta en Fieldglass'

    let statusOutput = `<span class="badge badge-success ml-2 mr-2"> Documento Reabierto en Fieldglass </span>`
    $(`#statuDoc_${idDocumento}`).append(statusOutput);

    setTimeout(() => {
        toastSuccess(`Actividad: ${tipoDocumento} - ${resultado}`, `Fecha: ${dateConverted}`)
    }, 4000);

}

function sendEmailSupplierInvalido(supplierId, tipoDocumento, uriDoc) {
    let nameDocRecebido = uriDoc.split('~')
    let emails = ['vinicius.oliveira@stratesys-ts.com', 'francis.santos@stratesys-ts.com'];

    let companyCode = sessionStorage.getItem('companyCode')
    let companyName = sessionStorage.getItem('companyName')
    // let supplierObj = supplierObject[0]
    // let supObject = supplierObj.filter(f => f.companyCode == idSupplierUverifyGb)
    // let employeeName = supObject[0].name + ' ' + supObject[0].lastName
    let compAll = companyCode + ' - ' + companyName

    var data = {
        service_id: 'service_neqxz4d',
        template_id: 'template_6p32ohc',
        user_id: 'user_weNYJz9aVXzLrO6fpld8N',
        template_params: {
            'from_name': 'U-verify by Stratesys',
            'to_emails': emails,
            'employeeName': compAll,
            'workerId': companyCode,
            'documentAction': tipoDocumento,
            'uriDoc': uriDoc,
            'from_name': tipoDocumento,
            'nameDoc': tipoDocumento,
            'workerIdUrl': urlWorker,
            'nameDocRecebido': nameDocRecebido[1],
            'message': ''
        }
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function () {
        toastSuccess('Correo Enviado', '')
    }).fail(function (error) {
        let errorRes = JSON.stringify(error)
        toastWarning('Correo', errorRes)
    });
}

function chamaSwal() {
    let timerInterval
    Swal.fire({
        title: `${$.i18n('pf-sweet-sync')}`,
        html: `${$.i18n('pf-sweet-update')}`,
        timer: 10000,
        allowOutsideClick: false,
        timerProgressBar: true,
        imageUrl: address + '/assets/img/sap-fieldglass-vector-logo.png',
        imageWidth: 400,
        imageHeight: 100,
        onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 1200)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer' + address);
            // window.location.href = address + '/pages/index-0.html';
            window.location = index0;
            // location.reload()
        }
    })
}

function redirectWorkerListBySupplierId() {

    window.location.href = `${address}/worker_list.html?id=${idSupplier}`

}


function swalError(title, text) {
    Swal.fire({
        icon: 'error',
        title: `${title}`,
        text: `${text}`,
    })
}

function swalWarning(title, text) {
    Swal.fire({
        icon: 'warning',
        title: `${title}`,
        text: `${text}`,
    })
}

function swalMessage(title, text) {
    Swal.fire({
        icon: 'message',
        title: `${title}`,
        text: `${text}`,
    })
}

function toastSuccess(title, text) {
    iziToast.success({
        title: `${title}`,
        message: `${text}`,
        position: 'topRight'
    });
}


function toastWarning(title, text) {
    iziToast.warning({
        title: `${title}`,
        message: `${text}`,
        position: 'topRight'
    });
}

function toastError(title, text) {
    iziToast.error({
        title: `${title}`,
        message: `${text}`,
        position: 'topRight'
    });
}

function toastInfo(title, text) {
    iziToast.info({
        title: `${title}`,
        message: `${text}`,
        position: 'topRight'
    });
}

function openSweetAlertEdit() {
    Swal.fire({
        title: 'Editar Datos',
        html: `<div class="card">
            <div class="card-body">
                    <div class="form-group row" style="margin-bottom: 8px;">
                        <label for="headSupplierCIF" class="col-sm-4 txt-black" style="font-size: 16px; font-weight: bold;">RFC</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="headSupplierCIF" placeholder="RFC" value="SEPC850120AB1">
                        </div>
                    </div>
            </div>
        </div>`,
        preConfirm: () => {
            if ($('#tipoDocumento').val()) {

            }
        }
    });

    $('#btnAdd').click(function () {

    });

    $('#btnDel').click(function () {

    });

}