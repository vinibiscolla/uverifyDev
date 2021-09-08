// let address = location.protocol + `//` + location.host;
// let index0 = address + "/index.html";

let urlGetDocuments = './mocks/funcionario.json';

var imgBase64Global
var image
var resultAnalises
// var audio = new Audio('../../../pages/docs/R2D2.mp3')
// let urlGetFornecedores = 'https://str-apifieldglass.azurewebsites.net/empresa/listar'
// let urlGetFuncionarios = 'https://str-apifieldglass.azurewebsites.net/funcionario/listar'

$(function () {
    // $("select").selectric();
    carregarFornecedores();
    carregarWorkers();
    $.uploadPreview({
        input_field: "#image-upload", // Default: .image-upload
        preview_box: "#image-preview", // Default: .image-preview
        label_field: "#image-label", // Default: .image-label
        label_default: "Choose File", // Default: Choose File
        label_selected: "Change File", // Default: Change File
        no_label: false, // Default: false
        success_callback: null // Default: null
    });
    $(".inputtags").tagsinput('items');

    $('#analise_form').on('submit', function (e) { //use on if jQuery 1.7+
        e.preventDefault(); //prevent form from submitting
        var data = $("#analise_form :input").serializeArray();
        console.log(data);
        enviarDocFake(data[2].value)

    });
})

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

function enviarDocFake(docName) {

    swalFakeEnviandoDocs(docName)
}

function enviarDocAnalise() {

    swalEnviandoDocs()
    // audio.play();
    imgBase64Global = imgBase64Global.split(',')
    var imgFinal = imgBase64Global[1]
    // var url = 'https://str-apifieldglass.azurewebsites.net/documento/analisar'

    var settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(imgFinal)
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        $('#listaAnalises').empty()
        $('#dadosDoc').empty()
        // audio.pause();
        $(document).ajaxStop(swal.close());
        resultAnalises = Object.entries(response)

        for (let i = 0; i < resultAnalises.length; i++) {
            for (let j = 0; j < resultAnalises[i].length; j++) {

                if (j == 1) {

                    var linhaAnalise =
                        `<li class="media"> 
                <div class="media-body">
                <div class="media-right"><div class="text-primary"><span class="badge badge-success"> Analise <i class="fa fa-check"> </i> </span></div></div>
                <div class="media-description txt-black">
                    <ul style="list-style-type: none; padding-left:0">                                                                
                        <li><b>Campo Analise:</b> ${resultAnalises[i][j].campoAnalise}</li>  
                        <li><b>Valor Analise:</b> ${resultAnalises[i][j].valorAnalise}</li>
                        <li><b>Data:</b> ${new Date(resultAnalises[i][j].dataCriacao).toLocaleDateString() + ' ' + new Date(resultAnalises[i][j].dataCriacao).toLocaleTimeString()} </b> </li>                                                           
                    </ul>
                                                         
                </div>
                </div>   
            </li>`

                    $('#listaAnalises').append(linhaAnalise)
                    var linhaDadosDocs =
                        `<li><b>${resultAnalises[i][j].campoAnalise}:</b> ${resultAnalises[i][j].valorAnalise}</li>`
                    $('#dadosDoc').append(linhaDadosDocs)

                }
            }
        }
        $("#btnSubmit").prop("disabled", true)
        $('html, body').animate({
            scrollTop: $("#listaAnalises").offset().top - 40
        }, 2000);
    });

    $.ajax(settings).fail(function (response) {
        swal.close()
        swalError();
        $('#image-upload').focus()
    });

}

function postGenerico(url, data) {
    $.blockUI({
        message: '<h2><img style="max-width:100px;max-height:100px;" src="../../../assets/img/loading/loading_2.gif" /> Carregando</h2>'
    });

    var request = $.post(url, data).done(function (x) {
        $(document).ajaxStop($.unblockUI);
        setTimeout(function () {
            location.reload();
        }, 1600);
    });
}

function carregarFornecedores() {

    tokenGB = sessionStorage.getItem('tokenGB');
    var settings = {
        "url": urlGetCompanyAll,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": `Bearer ${tokenGB}`,
            "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
        },
    };

    $.ajax(settings).done(function (data) {

        $.each(data, function (key, val) {
            $("#dplFornecedores").append(
                `<option value='${val.companyCode}'> ${val.companyCode} - ${val.name} </option>`
            );
        });
        $("#dplFornecedores").val("STR1").change();
        console.log(data);

    }).fail(function (err) {
        console.log(err);
    });
}

function carregarWorkers() {

    tokenGB = sessionStorage.getItem('tokenGB');
    var settings = {
        "url": urlGetEmployeesAll,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": `Bearer ${tokenGB}`,
            "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
        },
    };

    $.ajax(settings).done(function (data) {

        $.each(data, function (key, val) {
            $("#dplWorkers").append(
                `<option value='${val.workerID}'> ${val.workerID} - ${val.name} ${val.lastName} </option>`
            );
            $("#dplWorkers").val("D002PW00000048").change();
        });

        console.log(data);

    }).fail(function (err) {
        console.log(err);
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

function swalError() {
    Swal.fire({
        icon: 'error',
        title: 'Documento Inválido para Análise',
        text: 'Por favor selecione outro documento e tente novamente',
        // footer: '<a href>Why do I have this issue?</a>'
    })
}