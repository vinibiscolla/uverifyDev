let urlGetDocuments = './mocks/funcionario.json';

let imgBase64Global
let image
let resultAnalises
// let audio = new Audio('../../../pages/docs/R2D2.mp3')
let dataTiposDocumentos
let documentFieldsList
let options = []
let dataOCRDocument
let documentTypeGlobal

$(function () {
    // $("select").selectric();
    // $(".inputtags").tagsinput('items');
    getDocumentsType();
    getDocumentsAzure();
})

$.uploadPreview({
    input_field: "#image-upload", // Default: .image-upload
    preview_box: "#image-preview", // Default: .image-preview
    label_field: "#image-label", // Default: .image-label
    label_default: "Choose File", // Default: Choose File
    label_selected: "Change File", // Default: Change File
    no_label: false, // Default: false
    success_callback: null // Default: null
});

$('#urlDocument').change(function () {
    $('#divUrlDocument').removeClass('hide').addClass('show')
    $('#divUploadDocument').addClass('hide').removeClass('show')
    $('#divChooseDocument').addClass('hide').removeClass('show')
    $("#fancyBox").attr("href", '');
    $("#displayImg").attr("src", '');
});

$('#uploadDocument').change(function () {
    $('#divUploadDocument').removeClass('hide').addClass('show')
    $('#divUrlDocument').addClass('hide').removeClass('show')
    $('#divChooseDocument').addClass('hide').removeClass('show')
    $("#fancyBox").attr("href", '');
    $("#displayImg").attr("src", '');
});

$('#chooseDocument').change(function () {
    $('#divChooseDocument').removeClass('hide').addClass('show')
    $('#divUploadDocument').addClass('hide').removeClass('show')
    $('#divUrlDocument').addClass('hide').removeClass('show')
    $("#fancyBox").attr("href", '');
    $("#displayImg").attr("src", '');
});

$('#dplTiposDocumentos').change(function () {
    documentTypeGlobal = $('#dplTiposDocumentos').val()
})

$('#dplChooseDocuments').change(function () {
    let blobUrl = $('#dplChooseDocuments').val()
    // getBase64FromUrl(blogUrl).then((responseStr) => {
    //     console.log(responseStr)
    // })
    //imgBase64Global = reader.result
    $("#fancyBox").attr("href", blobUrl);
    $("#displayImg").attr("src", blobUrl);
})

$('#inputedUrlDocument').on('propertychange input', function (e) {
    let blobUrl = $('#inputedUrlDocument').val()
    $("#fancyBox").attr("href", blobUrl);
    $("#displayImg").attr("src", blobUrl);
});

$('#analise_form').on('submit', function (e) { //use on if jQuery 1.7+
    $('#tabelaRetorno tbody tr').remove()
    $('#tabelaRetornoCampos tbody tr').remove()
    e.preventDefault(); //prevent form from submitting
    let data = $("#analise_form").serializeArray();
    console.log(data); //use the console for debugging, F12 in Chrome, not alerts
    // user = data[0].value;
    toastInfo('Processando Documento', data[1].value)
    enviarDocumentoAnalise(data)

});

const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            resolve(base64data);
        }
    });
}

function getDocumentsType() {
    tokenGB = sessionStorage.getItem('tokenGB');
    let settings = {
        "url": "https://uverifydevpoc1.azurewebsites.net/api/DocumentType?take=1000",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": `Bearer ${tokenGB}`,
            "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
          },
    };

    $.ajax(settings).done(function (response) {

        sessionStorage.setItem('tiposDocumentos', JSON.stringify(response));
        dataTiposDocumentos = JSON.parse(sessionStorage.getItem('tiposDocumentos'))

        let dplLinha = `<option> Selecione </option>`
        $(`#dplTiposDocumentos`).append(dplLinha)

        $.each(dataTiposDocumentos, function (key, val) {
            dplLinha = `<option> ${val.name} </option>`;
            $(`#dplTiposDocumentos`).append(dplLinha)
        })
    });
}

function getDocumentsAzure() {
    tokenGB = sessionStorage.getItem('tokenGB');
    let settings = {
        "url": "https://uverifydevpoc1.azurewebsites.net/api/Document?take=1000",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": `Bearer ${tokenGB}`,
            "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
          }
    };

    $.ajax(settings).done(function (response) {

        let dplLine = `<option> Selecione </option>`
        $(`#dplChooseDocuments`).append(dplLine)

        $.each(response, function (key, val) {
            dplLine = `<option> ${val.uri} </option>`;
            $(`#dplChooseDocuments`).append(dplLine)
        })
    });
}

function encodeImgtoBase64(element) {

    let inputValue = $('#customFile')[0].files[0]
    let img = element.files[0];
    let fileName = element.files[0].name
    let stream = new FormData();
    stream.append('file', inputValue)
    let reader = new FileReader();
    $('#documentoSelectLabel').text(fileName)
    reader.onloadend = function () {
        $("#fancyBox").attr("href", reader.result);
        //   $("#convertImg").text(reader.result);
        imgBase64Global = reader.result
        $("#displayImg").attr("src", reader.result);
        $("#btnSubmit").prop("disabled", false)
    }
    reader.readAsDataURL(img);
    toastInfo('Fazendo Upload Arquivo','');
    fazerUpload(stream)
}

function fazerUpload(stream) {

    tokenGB = sessionStorage.getItem('tokenGB');
    fetch("https://uverifydevpoc1.azurewebsites.net/api/Document/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${tokenGB}`,
        "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
      },
      body: stream,
    })
      .then((r) => r.text())
      .then((d) => {
        console.log(d)
        swalInfo(d);
        $('#urlUploadDocumentHidden').val(d)        
})
}

function verificaTipoDocumento(urlDocumento) {
    toastInfo('Verificando tipo de documento...', '')

    let matchString
    let tipoDocumento = documentTypeGlobal
    let documentAction

    let splited = tipoDocumento.split(' ');

    switch (tipoDocumento) {
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
        case 'pasaporte':
            tipoDocumento = 'Pasaporte'
            documentAction = 'Pasaporte'
            matchString = 'pasaporte'
            break;
        case 'cnh':
            tipoDocumento = 'cnh'
            documentAction = 'cnh'
            matchString = 'cnh'
            break;
        case 'iso':
            tipoDocumento = 'iso'
            documentAction = 'iso'
            matchString = 'iso'
            break;
        default:
            matchString = '';
            break;
    }

    matchString = matchString.toLowerCase();
    const url = "https://validateocrgenerate.azurewebsites.net/api/generate";
    const request = {
        url: urlDocumento,
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
                toastError('O documento NÃO é um: ', tipoDocumento)
                // let status = statusOutput = `<span class="badge badge-danger"> Tipo de documento no válido <span> <i class="fa fa-times"> </i> </span> </span>`
                // $(`#statuDoc_${idDocumento}`).html(status);

            } else {
                toastSuccess('O Documento é um: ', tipoDocumento)
                // analiseDocumento(idDocumento, tipoDocumento, idSupplierUverifyGb, uriAzure, nameDocument);
            }
            // console.log(resultado);
        });

}

function enviarDocumentoAnalise(objetoForm) {

    // swalEnviandoDocs()
    // audio.play();

    // imgBase64Global = imgBase64Global.split(',')
    // let imgFinal = imgBase64Global[1]
    //$('input[name=option]:checked','#analise_form').val();
    let tipoDocumentoSelecionado = objetoForm[1].value 
    let tipoUploadDocumento = objetoForm[0].value 
    let valorCampoImagem

    switch (tipoUploadDocumento) {
        case 'urlDocument':
            valorCampoImagem = objetoForm[2].value
            break;
        case 'chooseDocument': 
            valorCampoImagem = objetoForm[3].value
            break;
        case 'uploadDocument': 
            valorCampoImagem = objetoForm[4].value
            break;
        default:
            break;
    }
    let valorCampoUrl = valorCampoImagem
    let valorCampoSelectUrl = valorCampoImagem 
    let parametroUrl
    options = []

    if (valorCampoUrl == "") {
        parametroUrl = valorCampoSelectUrl
    } else {
        parametroUrl = valorCampoUrl
    }

    let url = 'https://validateocrprocess.azurewebsites.net/api/Process'

    let urlDocumentoSelecionado = objetoForm[2].value

    verificaTipoDocumento(parametroUrl)

    tokenGB = sessionStorage.getItem('tokenGB');
    
    let settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenGB}`,
            "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
        },
        "data": JSON.stringify({
            "url": parametroUrl,
            "type": tipoDocumentoSelecionado
        }),
    };

    $.ajax(settings).done(function (response) {
        // console.log(response);
        dataOCRDocument = JSON.parse(response)

        toastInfo('Resultado', response);
        let dataOCRContent 
        
        if(dataOCRDocument.Content != null) {
            dataOCRContent = JSON.stringify(dataOCRDocument.Content[0])
            tableFromJson(dataOCRDocument.Content)
        } else {
            dataOCRContent = dataOCRDocument.Content
        }

        let linhaTabela =
            `<tr>
                <td>${dataOCRDocument.Sucesso}</td>   
                <td>${dataOCRDocument.Messages}</td>
                <td>${dataOCRContent}</td>
            </tr>`

        $(`#tabelaRetorno`).append(linhaTabela)

        
        // Descer tela aos dados carregados...
        $('html, body').animate({
            scrollTop: $("#valoresDocumento").offset().top - 40
        }, 2000);

    }).fail(function (response) {
    console.log(response)
    let stringRetorno = response.status + ' ' + response.statusText
    toastWarning('Template Não Encontrado', stringRetorno)
});

}

function pegaValorObjeto(object, arrayPosition) {
    let value = object.value;
    alert(value);

    //identificar o tipo de documento selecionado
    //criar a logica do data para envio do documento "append por exemplo campos como nome" monta esse objeto e envia ao serviço do Leandro

}


function tableFromJson(jsonObject) {
    // the json data. (you can change the values for output.)
    var myJsonObject = jsonObject

    // Extract value from table header. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myJsonObject.length; i++) {
        for (var key in myJsonObject[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // Create a table.
    var table = document.createElement("table");

    // Create table header row using the extracted headers above.
    var tr = table.insertRow(-1);                   // table row.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (var i = 0; i < myJsonObject.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myJsonObject[i][col[j]];
        }
    }

    // Now, add the newly created table with json data, to a container.
    // var divShowData = document.getElementById('showData');
    // divShowData.innerHTML = "";
    // divShowData.appendChild(table);
    $('#tabelaRetornoCampos').html(table)
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

function swalEnviandoDocs() {
    Swal.fire({
        title: 'Analisando Documento',
        html: '',
        // timer: 3000,
        allowOutsideClick: false,
        timerProgressBar: true,
        imageUrl: address + '/assets/img/file-alt.png',
        imageWidth: 400,
        imageHeight: 100,
        onOpen: () => {
            Swal.showLoading()

        }
    }).then((result) => {

    })
}

function swalError() {
    Swal.fire({
        icon: 'error',
        title: 'Documento Inválido para Análise',
        text: 'Por favor selecione outro documento e tente novamente',
        // footer: '<a href>Why do I have this issue?</a>'
    })
}

function swalInfo(url) {
    Swal.fire({
        icon: 'info',
        title: 'Url Documento',
        text: url,
        // footer: '<a href>Why do I have this issue?</a>'
    })
}

