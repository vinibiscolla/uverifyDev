let urlGetDocuments = './mocks/funcionario.json';

let imgBase64Global
let image
let resultAnalises
// let audio = new Audio('../../../pages/docs/R2D2.mp3')
let dataTiposDocumentos
let documentFieldsList
let options = []
let dataOCRDocument = []
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
    // let urlImg = $('#inputedUrlDocument').val()
    // let urlSpplited
    // urlSpplited = urlImg.split('/')
    // let urlSelecionada = urlSpplited[2]
    // if (urlSelecionada != 'uverify.blob.core.windows.net') {
    //     // baixarImg(urlImg);
    //     swalInfo(urlSelecionada)
    // }
    let blobUrl = $('#inputedUrlDocument').val()
    $("#fancyBox").attr("href", blobUrl);
    $("#displayImg").attr("src", blobUrl);
});

$('#analise_form').on('submit', function (e) { //use on if jQuery 1.7+
    $('#tabelaRetornoTreino tbody tr').remove()
    e.preventDefault(); //prevent form from submitting
    let data = $("#analise_form").serializeArray();
    console.log(data); //use the console for debugging, F12 in Chrome, not alerts
    // user = data[0].value;
    toastInfo('Processando Documento', data[1].value)
    enviarDocumentoAnalise(data)

});

$('#btnSalvar').click(function () {
    salvarModelo();
});

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

function getDocumentsType() {
    tokenGB = sessionStorage.getItem('tokenGB');
    let settings = {
        "url": "https://uverifydevpoc1.azurewebsites.net/api/DocumentType",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": `Bearer ${tokenGB}`,
            "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
        }
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
    toastInfo('Fazendo Upload Arquivo', '');
    fazerUpload(stream)

}

function baixarImg(url) {

    // let url
    fetch(url, {
        method: "GET"
    })
        .then((r) => r.text())
        .then((d) => {
            console.log(d)
            // swalInfo(d);
        });
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
        });

}

function enviarDocumentoAnalise(objetoForm) {

    // swalEnviandoDocs()
    // audio.play();

    // imgBase64Global = imgBase64Global.split(',')
    // let imgFinal = imgBase64Global[1]
    let url = 'https://validateocrgenerate.azurewebsites.net/api/generate'

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

    let settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "url": parametroUrl,
            "type": tipoDocumentoSelecionado
        }),
    };

    let documentoList = dataTiposDocumentos.filter(f => f.name == tipoDocumentoSelecionado)
    documentFieldsList = documentoList[0].documentFields

    let selectLine = `<option> Selecione </option>`
    options.push(selectLine);

    $.each(documentFieldsList, function (key, val) {
        selectLine = `<option value='${val.name}, ${val.type}'> ${val.name} </option>`
        options.push(selectLine);
    })

    $.ajax(settings).done(function (response) {
        // console.log(response);
        retornoRequest = JSON.parse(response)
        let description
        $.each(retornoRequest, function (key, val) {

            if (key == 0) {
                dataOCRDocument.push({ ...val, obrigatorio: false, campo: "" })
            } else {
                description = val.Description
                dataOCRDocument.push({ ...val, obrigatorio: false, campo: "" })
                let linhaTabela =
                    `<tr>
                <td>${description}</td>   
                <td><select id='select_${key}' value='${key}' onchange="pegaValorObjeto(this, ${key})"> ${options} </select></td>
                </tr>`

                $('#tabelaRetornoTreino').append(linhaTabela)
            }
        });

        // Descer tela aos dados carregados...
        $('html, body').animate({
            scrollTop: $("#valoresDocumento").offset().top - 40
        }, 2000);

    }).fail(function (response) {
        console.log(response)
        let stringRetorno = response.status + ' ' + response.statusText
        toastError('Erro', stringRetorno)
    });

}

// const sel = $(`#select_${arrayIndex}`) //#select_arrayIndex

// sel.addEventListener("change", (e) => {
//     console.log(e.target.value)
// })

function pegaValorObjeto(object, arrayIndex) {
    let value = object.value;
    let obj = dataOCRDocument[arrayIndex]

    for (let index = 0; index < dataOCRDocument.length; index++) {
        const element = dataOCRDocument[index];

        if (
            element.Description === obj.Description &&
            element.obrigatorio === false &&
            element.BoundingPoly.Vertices[0].X ===
            obj.BoundingPoly.Vertices[0].X &&
            element.BoundingPoly.Vertices[1].X ===
            obj.BoundingPoly.Vertices[1].X &&
            element.BoundingPoly.Vertices[2].X ===
            obj.BoundingPoly.Vertices[2].X &&
            element.BoundingPoly.Vertices[3].X === obj.BoundingPoly.Vertices[3].X
        ) {
            dataOCRDocument[index].obrigatorio = true;
            let descriptionName = object.value.split(',')
            dataOCRDocument[index].campo = descriptionName[0];
            dataOCRDocument[index].index = index;
            console.log(dataOCRDocument[index]);
            break;
        }
    }

}

function salvarModelo() {
    toastInfo('Salvando Modelo', '');

    const obj = {
        tipo: documentTypeGlobal,
        data: JSON.stringify(dataOCRDocument),
    };

    tokenGB = sessionStorage.getItem('tokenGB');

    const url =
        "https://uverifydevpoc1.azurewebsites.net/api/OcrTemplate";
    const json = JSON.stringify(obj);

    fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${tokenGB}`,
            "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
        },
        body: json,
    }).then((r) => {
        toastSuccess('Modelo Salvo', r.status)
        console.log(r.status);
        location.reload(true)
    });
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