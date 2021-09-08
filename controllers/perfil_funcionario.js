let urlGetDocuments = './mocks/funcionario.json';

let funcionario = {}
let documentos = []
let allDocs
let urlPaginaFuncionario = window.location.href
let idFuncionario
let idWorkerUverifyGb

let workersObject
let workerObject

let fotoGlobal = address + '/assets/img/semFoto.jpg'
let fotoWorker = address + '/assets/img/nophotop.jpg'
let fotoCarlos = address + '/assets/img/news/carlos.jpg'
let fotoJavier = address + '/assets/img/news/Javier.png'
let fotoCristian = address + '/assets/img/news/cristian.jpg'

var documentosTotais = 0
var documentosValidos = 0
var documentosEmAnalise = 0
var documentosInvalidos = 0
let personID
let workerId
let globalActivityItemAction
let globalAnalyzeObject

let activityItemNameList = [
    { id: '1', activityItemAction: 'Adjuntar pasaporte', activityItemCode: 'Pasaporte', tipoDocumento: 'Pasaporte' },
    { id: '2', activityItemAction: 'Adjuntar DNI', activityItemCode: 'DNI', tipoDocumento: 'Documento Nacional De Identidad' },
    { id: '3', activityItemAction: 'Adjuntar NIE', activityItemCode: 'NIE', tipoDocumento: 'NIE' }
];

let activityItemWorkerBR20WK00000180 = [
    { module: "Worker", objectRef: "BR20WK00000180", childObjectCode: "F-30" },
    { module: "Worker", objectRef: "BR20WK00000180", childObjectCode: "F-29" }
];

let workerDocs = [{
    name: '',
    lastName: '',
    date: '',
    status: '',
    tipoDocumento: '',
    numeroPasaporte: '',
    nif: '',
    nie: ''
}];

let activityItemSupplierListMexico = [
    { module: "SOW", objectRef: "STTS", childObjectCode: "INE" },
    { module: "SOW", objectRef: "STTS", childObjectCode: "Comprobante Fiscal Trabajador" }
];

let trabalhadoresFGObjMex = [
    { nome: 'Gerardo Cantu Munoz', rfc: 'CAMG910120HGTNXAB2', html: `<i class="fa fa-lg fa-check-circle" style=" color: green;"> </i>` },
]

let supplierFGObjMex = [
    { nome: 'Servicios Professionales de CDMX', rfc: 'SEPC850120AB1', html: `<i class="fa fa-lg fa-check-circle" style=" color: green;"> </i>` },
]

let IneObj = [
    { status: "Ok", field: "tipoDocumento", valueField: "Instituto Nacional Electoral", documentId: null, id: "6111defd795a17eddff13bac", created: "2021-09-08T02:05:49.6412979+00:00", modified: "2021-09-08T02:05:49.6412979+00:00" },
    { status: "Ok", field: "nombre", valueField: "CANTU MUÑOZ GERARDO", documentId: null, id: "6111defd795a17eddff13bad", created: "2021-09-08T02:05:49.7097638+00:00", modified: "2021-09-08T02:05:49.7097638+00:00" },
    { status: "Ok", field: "claveElector", valueField: "CNMZGR91012055H100", documentId: null, id: "6111defd795a17eddff13bae", created: "2021-09-08T02:05:49.7793685+00:00", modified: "2021-09-08T02:05:49.7793685+00:00" },
    { status: "Ok", field: "curp", valueField: "CAMG910120HGTNXAB2", documentId: null, id: "6111defd795a17eddff13baf", created: "2021-09-08T02:05:49.8612163+00:00", modified: "2021-09-08T02:05:49.8612163+00:00" },
    { status: "Ok", field: "emision", valueField: "2018", documentId: null, id: "6111defd795a17eddff13bb0", created: "2021-09-08T02:05:49.9275316+00:00", modified: "2021-09-08T02:05:49.9275316+00:00" },
    { status: "Ok", field: "vigencia", valueField: "2028", documentId: null, id: "6111defd795a17eddff13bb0", created: "2021-09-08T02:05:49.9275316+00:00", modified: "2021-09-08T02:05:49.9275316+00:00" },
    { status: "Ok", field: "fechaNacimiento", valueField: "20/01/1991", documentId: null, id: "6111defd795a17eddff13bb0", created: "2021-09-08T02:05:49.9275316+00:00", modified: "2021-09-08T02:05:49.9275316+00:00" }
]

var dataSync = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();

$(function () {

    $.uploadPreview({
        input_field: "#image-upload", // Default: .image-upload
        preview_box: "#image-preview", // Default: .image-preview
        label_field: "#image-label", // Default: .image-label
        label_default: "Choose File", // Default: Choose File
        label_selected: "Change File", // Default: Change File
        no_label: false, // Default: false
        success_callback: null // Default: null
    });

    $('#dataSync').text(dataSync)

    var urlPageSplit = urlPaginaFuncionario.split("=");
    idFuncionario = urlPageSplit[1];

    setTimeout(() => {
        carregarDadosObjetoFuncionarioSessionStorage();

    }, 1000);


})

function carregarDocumentosFuncionariosById() {

    urlGetAllUserDocuments += idFuncionario.toString()  //url do azure henrique

    var req = $.getJSON(urlGetAllUserDocuments, function (data) { });

    req.done(function (data) {
        documentos = data
        allDocs = data.documentos
        populaDocumentos(documentos, allDocs);

    }).fail(function (failRes) {
        console.log(failRes);
    });

}

function carregarDadosObjetoFuncionarioSessionStorage() {

    workersObject = JSON.parse(sessionStorage.getItem('workersObject'))

    workerObject = workersObject.filter((workersObject => {
        return workersObject.workerID == idFuncionario
    }))

    if (idFuncionario.includes('WK') == true) {
        urlWorker = urlWorkerManage + workerObject[0].workerUpload + '&cf=1'
    } else if (idFuncionario.includes('PW') == true) {
        urlWorker = urlProfileWorker + workerObject[0].workerUpload + '&cf=1'
    }


    let name = workerObject[0].name
    workerDocs[0].name = name
    workerId = workerObject[0].workerID
    let lastName = workerObject[0].lastName
    workerDocs[0].lastName = lastName

    idWorkerUverifyGb = workerObject[0].id
    let jobSeekerId = workerObject[0].jobSeekerId
    let status = workerObject[0].status
    let workerEmail = workerObject[0].workerEmail
    let jobPostingTitle = workerObject[0].jobPostingTitle
    let workOrderID = workerObject[0].workOrderID
    let workOrderRevisionOwner = workerObject[0].workOrderRevisionOwner
    let vendorNumber = workerObject[0].vendorNumber
    let vendorName = workerObject[0].vendorName
    let costCenterName = workerObject[0].costCenterName
    let costCenterCode = workerObject[0].costCenterCode
    let startDate = workerObject[0].startDate
    let currency = workerObject[0].currency
    let siteCode = workerObject[0].siteCode
    let siteName = workerObject[0].siteName
    let supervisorFirstName = workerObject[0].supervisorFirstName
    let supervisorLastName = workerObject[0].supervisorLastName
    let workerPhoneNumber = workerObject[0].workerPhoneNumber
    let siteId = workerObject[0].siteId
    let sowWorkerRoleCode = workerObject[0].sowWorkerRoleCode
    let poNumber = workerObject[0].poNumber
    let workerStartDate = workerObject[0].workerStartDate
    let workOrderEndDate = workerObject[0].workerEndDate
    let workerEndDate = workerObject[0].workerEndDate
    let actualEndDate = workerObject[0].actualEndDate
    let workerUpload = workerObject[0].workerUpload
    // Custom Fields
    let workerNIF = workerObject[0].customFields[2].value
    workerDocs[0].nif = workerNIF
    let workerNIE = workerObject[0].customFields[3].value
    workerDocs[0].nie = workerNIE
    let pasaporte = workerObject[0].customFields[4].value
    workerDocs[0].numeroPasaporte = pasaporte
    let date = new Date()
    let dateConverted = new Date(date).toLocaleDateString()
    workerDocs[0].date = dateConverted;

    $('#headWorkerNif').val(workerNIF)
    $('#headWorkerNie').val(workerNIE)
    $('#headWorkerPassaport').val(pasaporte)

    if (workerId == 'B1BWK00000304') {
        $('#imgLinkUsuario').attr('src', poNumber);
        $('#aLinkImgUsuario').attr('href', poNumber);
    } else {
        $('#imgLinkUsuario').attr('src', fotoWorker);
        $('#aLinkImgUsuario').attr('href', fotoWorker);
    }


    $('#headWorkerName').text(name + ' ' + lastName)
    $('#headWorkerName').attr('href', urlWorker)

    $('#headWorkerID').text(workerId)
    $('#headWorkerID').attr('href', urlWorker)

    $('#headWorkerEmail').text(workerEmail)
    $('#headWorkerPhone').text(workerPhoneNumber)

    var badgeStatus
    if (status = 'Active') {
        badgeStatus = `<span class="badge badge-success"> <span data-i18n="perfil-fornecedor-status-ativa"> </span> <i class="fa fa-check"></i></span>`
    } else {
        badgeStatus = `<span class="badge badge-danger"> <span data-i18n="perfil-fornecedor-status-inativa"> </span> <i class="fa fa-times"></i></span>`
    }
    $('#headWorkerStatus').html(badgeStatus)

    $('#headWorkerVendor').text(vendorName + ' ' + vendorNumber)
    $('#headWorkerCostCenterName').text(costCenterName)
    $('#headWorkerCostCenterCode').text(costCenterCode)
    $('#headWorkerStartDate').text(startDate)
    $('#headWorkerEndDate').text(workerEndDate)
    $('#headWorkerCurrency').text(currency)
    $('#headWorkerSiteName').text(siteName)
    $('#headWorkerSiteCode').text(siteCode)
    $('#headWorkerSupervisorName').text(supervisorFirstName + ' ' + supervisorLastName)

    carregaActivityItems(workerId, idWorkerUverifyGb)
}

function carregaActivityItems(objectRef, idWorkerUverifyGb) {

    if (objectRef == 'BR20WK00000180') {
        $.each(activityItemWorkerBR20WK00000180, function (key, val) {
            let activityItemCode = val.childObjectCode
            activityItemCode = activityItemCode.replace(/ /g, '')
            var linha = `<tr id="${activityItemCode}" value="${val.childObjectCode}" onClick="carregaDocArauco('${idWorkerUverifyGb}', '${val.module}', '${val.objectRef}', '${val.childObjectCode}')">
                     <td> ${val.childObjectCode} </td>                        
                     <td> ${val.objectRef}</td>
                     <td> ${val.module}</td>
                </tr>`

            $('#tableWorkerActivityItem').append(linha)
        });
    } else if (objectRef == 'B1BWK00000304') {

        $.each(activityItemSupplierListMexico, function (key, val) {
            let activityItemCode = val.childObjectCode
            activityItemCode = activityItemCode.replace(/ /g, '')
            var linha = `<tr id="${activityItemCode}" value="${val.childObjectCode}" onClick="carregaDocMex('${idWorkerUverifyGb}', '${val.module}', '${val.objectRef}', '${val.childObjectCode}')">
                     <td> ${val.childObjectCode} </td>                        
                     <td> ${val.objectRef}</td>
                     <td> ${val.module}</td>
                </tr>`

            $('#tableWorkerActivityItem').append(linha)
        });

    } else {

        urlGetActivitiesItemsAll += objectRef

        tokenGB = sessionStorage.getItem('tokenGB');

        var req = {
            url: urlGetActivitiesItemsAll,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${tokenGB}`,
                "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
            }
        };

        // var req = $.getJSON(urlGetActivitiesItemsAll, function (data) { });

        $.ajax(req).done(function (data) {

            $.each(JSON.parse(data), function (key, val) {
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

    }

}

function carregaDocMex(idWorkerUverifyGb, fgmodule, objecRef, childObjectCode) {
    console.log(idWorkerUverifyGb, fgmodule, objecRef, childObjectCode)

    let tpDocumento = childObjectCode.replace(/ /g, "");
    let idDoc

    switch (tpDocumento) {
        case 'ComprobanteFiscalTrabajador':
            idDoc = '60c8c23f5a662e92c33fee94'
            break;
        case 'INE':
            idDoc = '61119ba4674be596ded838fa'
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

        if (idDoc == '60c8c23f5a662e92c33fee94') {
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
                <button class="btn btn-small btn-warning mr-2 ml-1 mb-2 hide" id="btnReabrir_${idDocumento}" onclick="reabrirAtividadeAnalise('${idWorkerUverifyGb}', '${activityItemCode}', '${idDocumento}')">
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
                            <th>RFC</th>
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
        } else {
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
                <button class="btn btn-small btn-warning mr-2 ml-1 mb-2 hide" id="btnReabrir_${idDocumento}" onclick="reabrirAtividadeAnalise('${idWorkerUverifyGb}', '${activityItemCode}', '${idDocumento}')">
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
        }
    });
}


function carregaDocArauco(idWorkerUverify, fgmodule, objecRef, childObjectCode) {
    console.log(idWorkerUverify, fgmodule, objecRef, childObjectCode)

    if (childObjectCode == 'F-30') {
        let idBR20WK00000180 = '60b10f81e405a980487ffd32';
        let IdF30 = '60b14b3345f5297e45a70425'
        let urlDocF30 = 'https://uverify.blob.core.windows.net/corte-documents-upload/F-30.jpg';
        let urlDoc = 'https://uverifydevpoc1.azurewebsites.net/api/Document/documentById'

        var requestItens = $.ajax({
            url: urlDoc,
            data: {
                "id": IdF30
            },
            method: "GET"
        });

        requestItens.done(function (documentos) {

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
                <button class="btn btn-small btn-warning mr-2 ml-1 mb-2 hide" id="btnReabrir_${idDocumento}" onclick="reabrirAtividadeAnalise('${idFuncionario}', '${activityItemCode}', '${idDocumento}')">
                Reabrir Actividad </button>
                </div>
                <div class="collapse" id="detalhesDocumento_${idDocumento}">
                <table class="table table-hover table-bordered table-sm bg-light" style="padding-left: 5px;" id="tabelaAnaliseDoc_${idDocumento}">
                   <thead>
                        <tr>
                            <th>Campo de documento</th>
                            <th>Valor del campo del documento</th>
                            <th>Datos del trabajador en Fieldglass</th>
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

function addDocuments(idWorkerUverify, fgmodule, objecRef, childObjectCode) {
    let activityItemCode = childObjectCode.replace(/ /g, '')

    tokenGB = sessionStorage.getItem('tokenGB');

    var requestItens = $.ajax({
        url: urlGetDocumentDownloadGetWorker,
        data: {
            "id": idWorkerUverify,
            "module": fgmodule,
            "objectRef": objecRef,
            "childObjectCode": childObjectCode
        },
        method: "GET",
        headers: {
            "Authorization": `Bearer ${tokenGB}`,
            "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
        }
    });

    requestItens.done(function (data) {
        let actItem = data.name.split('~');
        let url = data.uri.split('.');

        if (url[5] == '' || url[5] == 'txt') {
            let title = `Documento: ${actItem[1]}`
            let text = `No adjunto en SAP Fieldglass`
            swal(title, text, 'error')
        } else {
            $(`#${activityItemCode}`).remove();
            populaDocumentos(data, fgmodule);
        }
    }).fail(function (data) {
        toastError('Error al descargar documentos para el elemento de actividad', '')
        console.log(data);
    });
}

function populaDocumentos(documentos, fgmodule) {
    // console.log(documentos);

    let uri = documentos.uri
    let name = documentos.name
    let data = documentos.created
    let idDocumento = documentos.id
    let funcionarioId = documentos.funcionarioId
    let moduleFg = fgmodule
    let disabled
    let tipo = documentos.tipo
    let nameActivity = name.split('~');
    let activityItemCode = nameActivity[1]

    documentosTotais = documentosTotais + 1

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
                <button class="btn btn-small btn-info mr-2 ml-3 mb-2" id="btnDetalhes_${idDocumento}" onclick="verificaTipoDocumento('${idDocumento}', '${activityItemCode}', '${uri}', '${name}', '${tipo}')">
                Analizar documento </button>
                <button class="btn btn-small btn-info mr-2 ml-1 mb-2 hide" data-toggle="collapse" id="plus_${idDocumento}" href="#detalhesDocumento_${idDocumento}" role="button" aria-expanded="true">
                    <i id="iconPlus_${idDocumento}" class="fa fa-minus"> </i>
                </button>
                <button class="btn btn-small btn-warning mr-2 ml-1 mb-2 hide" id="btnReabrir_${idDocumento}" onclick="reabrirAtividadeAnalise('${idFuncionario}', '${activityItemCode}', '${idDocumento}')">
                Reabrir Actividad </button>
                </div>
                <div class="collapse" id="detalhesDocumento_${idDocumento}">
                <table class="table table-hover table-bordered table-sm bg-light" style="padding-left: 5px;" id="tabelaAnaliseDoc_${idDocumento}">
                   <thead>
                        <tr>
                            <th>Campo de documento</th>
                            <th>Valor del campo del documento</th>
                            <th>Datos del trabajador en Fieldglass</th>
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

    $('#documentosTotais').text(documentosTotais.toString());
    $('#documentosValidos').text(documentosValidos);
    $('#documentosEmAnalise').text(documentosEmAnalise);
    $('#documentosInvalidos').text(documentosInvalidos);

}

function verificaTipoDocumentoArauco(idDocumento, tipoDocumento, urlReq) {

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

            if (!resultado) {
                toastError('El documento NO es un: ', tipoDocumento)
                toastInfo('Reapertura del elementos de actividad ', `${tipoDocumento} en SAP Fieldglass`)
                let status = `<span class="badge badge-danger"> Tipo de documento no válido <span> <i class="fa fa-times"> </i> </span> </span>`
                $(`#statuDoc_${idDocumento}`).html(status);
                $(`#btnDetalhes_${idDocumento}`).hide();
                let activityItem = activityItemNameList.filter(f => f.activityItemCode.toLowerCase() == tipoDocumento)
                sendEmailWorkerInvalido(workerId, tipoDocumento, urlReq)
                reopenActivityInvalid(workerId, activityItem, idDocumento)

            } else {
                toastSuccess('El documento es un: ', tipoDocumento)
                analiseDocumento(idDocumento, tipoDocumento, idWorkerUverifyGb, urlReq);
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
        case 'INE':
            tipoDocumento = 'instituto'
            tipoDocumentoApi = 'INE'
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
                toastError('El documento NO es un: ', tipoDocumento)
                toastInfo('Reapertura del elementos de actividad ', `${tipoDocumento} en SAP Fieldglass`)
                let status = `<span class="badge badge-danger"> Tipo de documento no válido <span> <i class="fa fa-times"> </i> </span> </span>`
                $(`#statuDoc_${idDocumento}`).html(status);
                $(`#btnDetalhes_${idDocumento}`).hide();
                // let activityItem = activityItemNameList.filter(f => f.activityItemCode.toLowerCase() == tipoDocumentoArauco.toLowerCase())
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
                analiseDocumentoMex(idDocumento, tipoDocumentoApi, idWorkerUverifyGb, urlReq);
            }
            // console.log(resultado);
        });

}

function verificaTipoDocumento(idDocumento, tipoDocumento, urlReq, name, tipo) {

    toastInfo('Verificación del tipo de documento...', '')

    $(`#btnDetalhes_${idDocumento}`).prop('disabled', true)

    tipoDocumento
    let tpDoc = tipoDocumento.toLowerCase();
    const url = "https://validateocrgenerate.azurewebsites.net/api/generate";
    const request = {
        url: urlReq,
        type: tpDoc,
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
            var resultado = respLowner.includes(tpDoc) ? true : false;

            if (!resultado) {
                toastError('El documento NO es un: ', tipoDocumento)
                toastInfo('Reapertura del elementos de actividad ', `${tipoDocumento} en SAP Fieldglass`)
                let status = statusOutput = `<span class="badge badge-danger"> Tipo de documento no válido <span> <i class="fa fa-times"> </i> </span> </span>`
                $(`#statuDoc_${idDocumento}`).html(status);
                $(`#btnDetalhes_${idDocumento}`).hide();
                let activityItem = activityItemNameList.filter(f => f.activityItemCode.toLowerCase() == tipoDocumento)
                sendEmailWorkerInvalido(workerId, tipoDocumento, urlReq)
                reopenActivityInvalid(workerId, activityItem, idDocumento)

            } else {
                toastSuccess('El documento es un: ', tipoDocumento)
                analiseDocumento(idDocumento, tipoDocumento, idWorkerUverifyGb, urlReq, name);
            }
            // console.log(resultado);
        });

}

function analiseDocumento(idDocumento, tipoDocumento, idWorkerUverifyGb, urlReq, name) {

    $(`#plus_${idDocumento}`).removeClass('hide') //mostra o toggle button para exibir a area da analise

    $(`#plus_${idDocumento}`).on('click', function (e) {
        var valorAria = $(`#plus_${idDocumento}`).attr('aria-expanded')
        if (valorAria == "true") {
            $(`#iconPlus_${idDocumento}`).removeClass('fa-minus').addClass('fa-plus');
        } else {
            $(`#iconPlus_${idDocumento}`).removeClass('fa-plus').addClass('fa-minus');
        }
    });

    let activityItem = activityItemNameList.filter(f => f.activityItemCode == tipoDocumento)

    switch (tipoDocumento) {
        case 'dni':
        case 'DNI':
            tipoDocumento = 'Documento Nacional De Identidad'
            break;
        case 'nie':
            tipoDocumento = 'NIE'
        case 'Pasaporte':
            tipoDocumento = 'pasaporte'
        default:
            break;
    }

    var urlAnaliseDoc = `${urlGetAnaliseDocumentosFuncionarios}${idDocumento}/${tipoDocumento}/${idWorkerUverifyGb}`
    var newUrl = 'https://uverifydevpoc1.azurewebsites.net/api/Analyze/document'
    tokenGB = sessionStorage.getItem('tokenGB');

    let obj_data = {
        CompanyId: null,
        Name: name,
        Uri: urlReq,
        Tipo: tipoDocumento,
        ReferenceId: idWorkerUverifyGb,
    }

    console.log(obj_data);

    var settingsAjax = {
        url: newUrl,
        method: "POST",
        headers: {
            "Authorization": `Bearer ${tokenGB}`,
            "Content-Type": "application/json",
            "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
        },
        data: JSON.stringify(obj_data)
    };

    // var req = $.getJSON(urlAnaliseDoc, function (data) { });

    $.ajax(settingsAjax).done(function (data) {
        // req.done(function (data) {
        globalAnalyzeObject = data
        let indexAnalyzeObject = globalAnalyzeObject.length;
        let statusInvalid = 0
        $.each(data, function (key, val) {
            let fieldWorkerFG
            let status
            workerDocs[0].tipoDocumento = tipoDocumento
            switch (val.field) {
                case 'apellidos':
                    toastInfo('apellidos', val.valueField)
                    fieldWorkerFG = workerDocs[0].lastName
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'nombre':
                    toastInfo('nombre', val.valueField)
                    fieldWorkerFG = workerDocs[0].name
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'fechaDeCaducidad':
                    toastInfo('fechaDeCaducidad', val.valueField)
                    fieldWorkerFG = workerDocs[0].date
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'validez':
                    toastInfo('validez', val.valueField)
                    fieldWorkerFG = workerDocs[0].date
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'numeroPasaporte':
                    toastInfo('numeroPasaporte', val.valueField)
                    fieldWorkerFG = workerDocs[0].numeroPasaporte
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'nie':
                    toastInfo('nie', val.valueField)
                    fieldWorkerFG = workerDocs[0].nie
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'nif':
                    toastInfo('nif', val.valueField)
                    fieldWorkerFG = workerDocs[0].nif
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                case 'tipoDocumento':
                    toastInfo('tipoDocumento', val.valueField)
                    fieldWorkerFG = workerDocs[0].tipoDocumento
                    val.status == 'Invalid' ? statusInvalid += 1 : statusInvalid;
                    break;
                default:
                    break;
            }
            let statusApi
            val.status == 'Invalid' ? statusApi = 'Inválido' : statusApi = 'OK'
            var linhaAnalise =
                `<tr>
                <td>${val.field}</td>   
                <td>${val.valueField}</td>
                <td>${fieldWorkerFG}</td>
                <td>${statusApi}</td>
                </tr>`
            $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
        });

        if (statusInvalid >= 1) {
            let status = statusOutput = `<span class="badge badge-danger"> Documento inválido en UV <span> <i class="fa fa-times"> </i> </span> </span>`
            $(`#statuDoc_${idDocumento}`).html(status);
            sendEmailWorkerAnalise(workerId, tipoDocumento, urlReq)
            reopenActivityAnalyze(workerId, tipoDocumento, idDocumento)
        } else {
            let statusOutput = `<span class="badge badge-success"> Documento válido  <span> <i class="fa fa-check"> </i> </span> </span>`
            $(`#statuDoc_${idDocumento}`).html(statusOutput)
        }

        $(`#detalhesDocumento_${idDocumento}`).addClass('show');

    }).fail(function (fail) {
        console.log(fail.responseText)
        let resText = fail.responseText;
        let statusOutput = `<span class="badge badge-warning"> Analizando  <span> <i class="fa fa-times"> </i> </span> </span>`
        toastInfo('El documento está siendo analizado por u-verify', '')
        $(`#statuDoc_${idDocumento}`).html(statusOutput);
        $(`#plus_${idDocumento}`).hide();
    });
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
        case 'INE':
            tipoDocumento = ''
            tipoDocumentoApi = 'INE'
            obj = IneObj

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
                obj.EmisorNombre = 'SERVICIOS PROFESIONALES DE CDMX'
                obj.EmisorRfc = 'SEPC850120AB1'
                obj.NominaFechaInicialPago = '2021-07-15'
                obj.NominaFechaFinalPago = '2021-07-28'
                obj.NominaFechaPago = '2021-07-28'
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

                $("#mesAnoPeriodo").text("Mes/Año - 07/2021")
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

        let stringValid = `<td><i class="fa fa-lg fa-check-circle" style=" color: green;"> </i></td>`;
        let stringInvalid = `<td><i class="fa fa-lg fa-times-circle" style=" color: red;"> </i></td>`;
        let finalString
        let statusInvalid = 0

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
                case 'nombre':
                    var linhaAnalise =
                        `<tr>
                            <td>${val.field}</td>   
                            <td>${val.valueField}</td>
                            ${finalString}
                            </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                    break;
                case 'claveElector':
                    var linhaAnalise =
                        `<tr>
                            <td>${val.field}</td>   
                            <td>${val.valueField}</td>
                            ${finalString}
                            </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                    break;
                case 'curp':
                    var linhaAnalise =
                        `<tr>
                            <td>${val.field}</td>   
                            <td>${val.valueField}</td>
                            ${finalString}
                            </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                    break;
                case 'emision':
                    var linhaAnalise =
                        `<tr>
                            <td>${val.field}</td>   
                            <td>${val.valueField}</td>
                            ${finalString}
                            </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)

                    break;
                case 'vigencia':
                    var linhaAnalise =
                        `<tr>
                            <td>${val.field}</td>   
                            <td>${val.valueField}</td>
                            ${finalString}
                            </tr>`
                    $(`#tabelaAnaliseDoc_${idDocumento}`).append(linhaAnalise)
                    
                    break;

                case 'fechaNacimiento':
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

}

function sendEmailWorkerAnalise(workerId, tipoDocumento, uriDoc) {
    toastInfo('Enviando Correo Electrónico', '')
    let emails = ['vinicius.oliveira@stratesys-ts.com', 'francis.santos@stratesys-ts.com'];

    let employeeObject = workerObject.filter(f => f.workerID == workerId)
    let employeeName = employeeObject[0].name + ' ' + employeeObject[0].lastName

    var data = {
        service_id: 'service_neqxz4d',
        template_id: 'template_d6f5e9b',
        user_id: 'user_weNYJz9aVXzLrO6fpld8N',
        template_params: {
            'from_name': 'U-verify by Stratesys',
            'to_emails': emails,
            'employeeName': employeeName,
            'workerId': workerId,
            'documentAction': tipoDocumento,
            'uriDoc': uriDoc,
            'from_name': tipoDocumento,
            'nameDoc': tipoDocumento,
            'workerIdUrl': urlWorker,
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

function sendEmailWorkerInvalido(workerId, tipoDocumento, uriDoc) {
    let nameDocRecebido = uriDoc.split('~')
    let emails = ['vinicius.oliveira@stratesys-ts.com', 'francis.santos@stratesys-ts.com'];

    let employeeObject = workerObject.filter(f => f.workerID == workerId)
    let employeeName = employeeObject[0].name + ' ' + employeeObject[0].lastName

    var data = {
        service_id: 'service_neqxz4d',
        template_id: 'template_6p32ohc',
        user_id: 'user_weNYJz9aVXzLrO6fpld8N',
        template_params: {
            'from_name': 'U-verify by Stratesys',
            'to_emails': emails,
            'employeeName': employeeName,
            'workerId': workerId,
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

function reabrirAtividadeInvalid(workerID, tipoDocumento, idDocumento) {

    if (typeof tipoDocumento === "object") {
        globalActivityItemAction = tipoDocumento[0].activityItemAction
    }

    var settings = {
        "url": `https://us-central1-uqualify-brasil.cloudfunctions.net/fieldglass?workerId=${workerID}&action=reopen`,
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "timeout": 0,
        "data": {
            "description": globalActivityItemAction
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
            $(`#btnReabrir_${idDocumento}`).removeClass('hide').addClass('show')
            let statusOutput = `<span class="badge badge-warning ml-2 mr-2"> La actividad ya está abierta en Fieldglass </span>`
            $(`#statuDoc_${idDocumento}`).append(statusOutput);
            toastWarning(`Aviso actividad: ${globalActivityItemAction} - ${resultado} `, `Fecha: ${data}`)
        } else {
            $(`#btnReabrir_${idDocumento}`).removeClass('hide').addClass('show')
            // let statusOutput = `<span class="badge badge-warning ml-2 mr-2"> La actividad está abierta en Fieldglass </span>`                    
            // $(`#statuDoc_${idDocumento}`).append(statusOutput);               
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

function reabrirAtividadeAnalise(workerID, tipoDocumento, idDocumento) {
    let description
    if (!globalActivityItemAction) {
        let activityItemAction = activityItemNameList.filter(f => f.tipoDocumento.toLowerCase() == tipoDocumento.toLowerCase())
        globalActivityItemAction = activityItemAction[0].activityItemAction
    }
    toastInfo('Reapertura del elemento de actividad en SAP Fieldglass: ', globalActivityItemAction)
    description = globalActivityItemAction.replace(/ /g, "%20");
    var settings = {
        "url": `https://us-central1-uqualify-brasil.cloudfunctions.net/fieldglass?workerId=${workerID}&action=reopen`,
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "dataSrc": "",
        "timeout": 0,
        "data": {
            "description": globalActivityItemAction
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
            $(`#btnReabrir_${idDocumento}`).removeClass('hide').addClass('show')
            let statusOutput = `<span class="badge badge-warning ml-2 mr-2"> La actividad ya está abierta en Fieldglass </span>`
            $(`#statuDoc_${idDocumento}`).append(statusOutput);
            toastWarning(`Aviso actividad: ${globalActivityItemAction} - ${resultado} `, `Fecha: ${data}`)
        } else {
            $(`#btnReabrir_${idDocumento}`).removeClass('hide').addClass('show')
            // let statusOutput = `<span class="badge badge-warning ml-2 mr-2"> La actividad está abierta en Fieldglass </span>`                    
            // $(`#statuDoc_${idDocumento}`).append(statusOutput);               
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

    if (typeof tipoDocumento === "object") {
        globalActivityItemAction = tipoDocumento[0].activityItemAction
    }

    toastInfo('Reapertura del elemento de actividad en SAP Fieldglass: ', globalActivityItemAction)
    let data = new Date()
    let dateConverted = `${new Date(data).toLocaleDateString()} - ${new Date(data).toLocaleTimeString()}`
    let resultado = 'Actividad reabierta en Fieldglass'

    let statusOutput = `<span class="badge badge-success ml-2 mr-2"> Documento Reabierto en Fieldglass </span>`
    $(`#statuDoc_${idDocumento}`).append(statusOutput);

    setTimeout(() => {
        toastSuccess(`Actividad: ${globalActivityItemAction} - ${resultado}`, `Fecha: ${dateConverted}`)
    }, 4000);
}

function reopenActivityAnalyze(workerID, tipoDocumento, idDocumento) {

    if (!globalActivityItemAction) {
        let activityItemAction = activityItemNameList.filter(f => f.tipoDocumento.toLowerCase() == tipoDocumento.toLowerCase())
        globalActivityItemAction = activityItemAction[0].activityItemAction
    }

    toastInfo('Reapertura del elemento de actividad en SAP Fieldglass: ', globalActivityItemAction)
    let data = new Date()
    let dateConverted = `${new Date(data).toLocaleDateString()} - ${new Date(data).toLocaleTimeString()}`
    let resultado = 'Actividad reabierta en Fieldglass'

    let statusOutput = `<span class="badge badge-success ml-2 mr-2"> Documento Reabierto en Fieldglass </span>`
    $(`#statuDoc_${idDocumento}`).append(statusOutput);

    setTimeout(() => {
        toastSuccess(`Actividad: ${globalActivityItemAction} - ${resultado}`, `Fecha: ${dateConverted}`)
    }, 4000);
}

function openSweetAlertEdit() {
    Swal.fire({
        title: 'Editar Datos',
        html: `<div class="card">
            <div class="card-body">
                    <div class="form-group row" style="margin-bottom: 8px;">
                        <label for="headWorkerNif" class="col-sm-4 txt-black" style="font-size: 16px; font-weight: bold;">RFC</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="headWorkerNif" placeholder="RFC" value="CAMG910120AB2">
                        </div>
                    </div>
                    <div class="form-group row" style="margin-bottom: 8px;">
                        <label for="headWorkerNie" class="col-sm-4 txt-black" style="font-size: 16px; font-weight: bold;">CURP</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="headWorkerNie" placeholder="CURP" value="CAMG910120HGTNXAB2">
                        </div>
                    </div>
                    <div class="form-group row" style="margin-bottom: 8px;">
                        <label for="headWorkerPassaport" class="col-sm-4 txt-black" style="font-size: 16px; font-weight: bold;">NSS</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="headWorkerPassaport" placeholder="NSS" value="02177611234">
                        </div>
                    </div>
                    <div class="form-group row" style="margin-bottom: 8px;">
                        <label for="headWorkerPassaport" class="col-sm-4 txt-black" style="font-size: 16px; font-weight: bold;">INE</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="headWorkerPassaport" placeholder="INE" value="CNMZGR91012055H100">
                        </div>
                    </div>
            </div>
        </div>`,
        preConfirm: () => {
            $("#tableWorkerActivityItem > tbody").empty();
            if ($('#tipoDocumento').val()) {


            }
        }
    });

    $('#btnAdd').click(function () {

    });

    $('#btnDel').click(function () {

    });

}

function swal(title, text, type) {
    Swal.fire({
        icon: `${type}`,
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

$('#analise_form').on('submit', function (e) { //use on if jQuery 1.7+
    e.preventDefault(); //prevent form from submitting
    var data = $("#analise_form :input").serializeArray();
    console.log(data);
    swalFakeEnviandoDocs(data[0].value)

});

function encodeImgtoBase64(element) {

    var img = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        $("#fancyBox").attr("href", reader.result);
        imgBase64Global = reader.result
        $("#displayImg").attr("src", reader.result);
        $("#btnSubmit").prop("disabled", false)
    }
    reader.readAsDataURL(img);
}

function swalFakeEnviandoDocs(nomeDocumento) {
    Swal.fire({
        title: 'Cargar Documento',
        html: nomeDocumento,
        timer: 3000,
        allowOutsideClick: false,
        timerProgressBar: true,
        imageUrl: address + '/assets/img/file-alt.png',
        imageWidth: 400,
        imageHeight: 100,
        onOpen: () => {
            Swal.showLoading()

        }
    }).then((result) => {
        $("#dplActivityItems option:selected").remove();
        $("#fancyBox").attr("href", '');
        $("#displayImg").attr("src", '');
        $("#image-preview").removeAttr("style")
        $("#btnSubmit").prop("disabled", true)
        // location.reload();
    })
}