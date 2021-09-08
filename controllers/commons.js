let address = location.protocol + `//` + location.host;
let login = address + '/login.html';
let enJSON = address + '/assets/plugins/jquery.i18n/languages/en.json'
let esJSON = address + '/assets/plugins/jquery.i18n/languages/es.json'
let ptbrJSON = address + '/assets/plugins/jquery.i18n/languages/ptbr.json'

let apiEndpoint = 'https://uverifydevpoc1.azurewebsites.net/'
let urlGetCompanyAll = apiEndpoint + 'api/Company?take=1000'
let urlGetEmployeesAll = apiEndpoint + 'api/Employee?take=1000'
let urlGetActivitiesItemsAll = apiEndpoint + 'api/FieldGlass/download/list?objectRef='
let urlGetDocumentDownloadGetWorker = apiEndpoint + 'api/Document/download/doc/worker?'
let urlGetApiDocumentFieldglass = apiEndpoint + 'api/FieldGlass/download'
let urlGetAnaliseDocumentosFuncionarios = apiEndpoint + 'api/Analyze/'
let urlGetSupplierDocumentDownload = apiEndpoint + 'api/Company/supplier/download/'
let urlAuth = apiEndpoint + ''
let urlFinalAuth = 'https://uverifydevpoc1.azurewebsites.net/api/Account/login?email=vini@gmail.com&password=Pa$$w0rd'

// let urlGetAllSuppliersDocuments = apisEndpoint + '/documentos/listar/'
// let urlGetSupplierDocumentDetail = apisEndpoint + '/documento/analisar/'
// let urlGetAllUserDocuments = apiEndpointUverify + '/documentos/listar/'
// let urlGetDocumentDetail = apisEndpoint + '/documento/analisar/'
// let urlGetFuncionarios = apiEndpointUverify + '/funcionario/listar'
// let urlGetDocumentosAnaliseFuncionarios = apiEndpointUverify + '/documento/analisar/'
let typeOfWorker
let urlIdWorker = 'https://partner10.fgvms.com/.do?id='
let urlWorker = 'https://partner10.fgvms.com/worker.do?id='
let urlWorkerManage = 'https://partner10.fgvms.com/worker.do?tabId=manage&ref=worker_manage&id='
let urlProfileWorker = 'https://partner10.fgvms.com/profile_worker.do?tabId=manage&ref=profile_worker_manage&id='
let urlPersonId = 'https://partner10.fgvms.com/profile_worker.do?id=z2008101635383853099423b&cf=1'
//https://partner10.fgvms.com/profile_worker.do?id=z20100815552892042895a3b
let urlIdSupplier = 'https://partner10.fgvms.com/worker.do?id=XXX&from=dash'
let user, senha, logged
let fgCompanyCode, fgCompanyName, fgWorkerId
let tokenGB = ''

let language

paceOptions = {
    // Disable the 'elements' source
    elements: false,

    // Only show the progress on regular and ajax-y page navigation,
    // not every request
    restartOnRequestAfter: false
}

$.i18n().load({
    'ptbr': ptbrJSON,
    'en': enJSON,
    'es': esJSON,
    'mx': esJSON
}).done(function () {
    // console.log('carregou');
    language = sessionStorage.getItem('language');
    $.i18n().locale = language;
    $('html').i18n();
    // carregarFornecedores()
})

$(function () {
    $('#containerMenu').css('margin-left', '0px');
    pegaToken()

    verificaLogin()

    if (user == 'admin') {
        menuAdmin()
    } else {
        menuUser()
    }

})

function pegaToken() {
    $.get(urlFinalAuth, function (data) {
        tokenGB = data;
        sessionStorage.setItem('tokenGB', data);
        tokenGB = sessionStorage.getItem('tokenGB');
    })
}

function verificaLogin() {

    user = sessionStorage.getItem('userName');
    senha = sessionStorage.getItem('password');
    logged = sessionStorage.getItem('logged');
    $('.d-sm-none').text(sessionStorage.getItem('userName'));

    switch (user) {
        case 'uverify':
            if (user != 'uverify') {
                sessionStorage.setItem('userName', '');
                sessionStorage.setItem('password', '');
                sessionStorage.setItem('logged', false)

                window.location = login
            }
            break;
        case 'admin':
            if (user != 'admin') {
                sessionStorage.setItem('userName', '');
                sessionStorage.setItem('password', '');
                sessionStorage.setItem('logged', false)

                window.location = login
            }
            break;
        default:
            window.location = login
            break;
    }

}

function menuUser() {
    $('#menuMain').append(`
        <li class="menu-header text-bold-black">Menu</li>
        <li><a class="nav-link text-bold-black" href="./supplier_list.html"><i class="fas fa-user-tie fa-2x"></i> <span data-i18n="menu-suppliers">Listar Fornecedores</span></a></li>
        <li><a class="nav-link text-bold-black" href="./worker_list.html"><i class="fas fa-users-cog fa-2x"></i> <span data-i18n="menu-workers">Listar Funcionarios</span></a></li>        
        <li><a class="nav-link text-bold-black" href="./document_list.html"><i class="fas fa-file-alt fa-2x"></i> <span >Documentos Log</span></a></li>        
    `)
}

function menuAdmin() {
    $('#containerMenu').html(`
    <ul class="navbar-nav">
    <li class="nav-item"><a href="./index.html" class="nav-link"><i class="fas fa-home" style="color: #0a6ed1; font-size: 18px;"></i> <span style="color: #0a6ed1;font-size: 16px;"> Home </span></a></li>
    <li class="nav-item"><a href="./supplier_list.html" class="nav-link"><i class="fas fa-user-tie" style="color: #0a6ed1; font-size: 18px;"></i> <span style="color: #0a6ed1;font-size: 16px;"> Suppliers </span></a></li>
    <li class="nav-item"><a href="./worker_list.html" class="nav-link"><i class="fas fa-users-cog" style="color: #0a6ed1; font-size: 18px;"></i> <span style="color: #0a6ed1;font-size: 16px;"> Workers </span></a></li>    
    <li class="nav-item dropdown">
      <a href="#" data-toggle="dropdown" class="nav-link has-dropdown" aria-expanded="true"><i class="far fa-clone" style="color: #0a6ed1;font-size: 18px;"></i><span style="color: #0a6ed1; font-size: 16px;">Admin Pages</span></a>
      <ul class="dropdown-menu" style="display: none;">
        <li class="nav-item"><a href="./document_list.html" class="nav-link"><i class="fas fa-file-alt" style="color: #0a6ed1; font-size: 16px;"></i> <span style="color: #0a6ed1; font-size: 14px;">Document List</span></a></li>
        <li class="nav-item"><a href="./analisis_error_list.html" class="nav-link"><i class="fas fa-tasks" style="color: #0a6ed1; font-size: 16px;"></i> <span style="color: #0a6ed1; font-size: 14px;">Analisis Error List</span></a></li>
        <li class="nav-item"><a href="./document_trainning.html" class="nav-link"><i class="fas fa-brain" style="color: #0a6ed1; font-size: 16px;"></i> <span style="color: #0a6ed1; font-size: 14px;">Doc. Trainning</span></a></li>
        <li class="nav-item"><a href="./document_processing.html" class="nav-link"><i class="fas fa-file-code" style="color: #0a6ed1; font-size: 16px;"></i> <span style="color: #0a6ed1; font-size: 14px;">Doc. Processing</span></a></li>
        <li class="nav-item"><a href="./document_types.html" class="nav-link"><i class="fas fa-file-upload" style="color: #0a6ed1; font-size: 16px;"></i> <span style="color: #0a6ed1; font-size: 14px;">New Doc. Type</span></a></li>
        <li class="nav-item"><a href="./document_upload.html" class="nav-link"><i class="fas fa-upload" style="color: #0a6ed1; font-size: 16px;"></i> <span style="color: #0a6ed1; font-size: 14px;">Doc. Upload</span></a></li>
        <li class="nav-item"><a href="./worker_registry.html" class="nav-link"><i class="fas fa-user" style="color: #0a6ed1; font-size: 16px;"></i> <span style="color: #0a6ed1; font-size: 14px;">New Worker</span></a></li>
      </ul>
    </li>
  </ul>
    `)
}

function sair() {
    sessionStorage.setItem('userName', '');
    sessionStorage.setItem('password', '');
    sessionStorage.setItem('logged', false)

    window.location = login
}

function sapFieldglass() {

    window.location = 'https://partner10.fgvms.com/desktop.do?cf=1'
}

function redirecionarPerfilFornecedor(id) {

    window.location.href = `${address}/supplier_profile.html?id=${id}`

}

function getTokenFGJquery() {

    var form = new FormData();
    var settings = {
        "url": "https://partner10.fgvms.com/api/oauth2/v2.0/token?grant_type=client_credentials&response_type=token",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded ",
            "X-ApplicationKey": "G9qSqY86m3QqgdhMMMLbnX8qXjd",
            "Authorization": "Basic QVBJX0QwMDI6RDAwMl9SSlJIc05VSmRYUFZqTjczZ2U2UVBrcmxHTUo=",
            "Cookie": "SAPFG=!XqLrmNACyH2c8KwYhAxdeafCz732NBGKaNnD/Dg/Ad6p9Xj/YVHhWRzmP5zAQW9OfhWVFUVIFJaU52Q=; JSESSIONID=35D21B7F3431A100C2385FFDBB633B56"
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function getTokenFGJSFetch() {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded ");
    myHeaders.append("X-ApplicationKey", "G9qSqY86m3QqgdhMMMLbnX8qXjd");
    myHeaders.append("Authorization", "Basic QVBJX0QwMDI6RDAwMl9SSlJIc05VSmRYUFZqTjczZ2U2UVBrcmxHTUo=");
    myHeaders.append("Cookie", "SAPFG=!XqLrmNACyH2c8KwYhAxdeafCz732NBGKaNnD/Dg/Ad6p9Xj/YVHhWRzmP5zAQW9OfhWVFUVIFJaU52Q=; JSESSIONID=35D21B7F3431A100C2385FFDBB633B56");
    
    var formdata = new FormData();
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://partner10.fgvms.com/api/oauth2/v2.0/token?grant_type=client_credentials&response_type=token", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}