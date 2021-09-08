let urlGetDocuments = './mocks/funcionario.json';

var imgBase64Global
var image
var resultAnalises
// var audio = new Audio('../../../pages/docs/R2D2.mp3')
let dataTiposDocumentos
let documentFieldsList
let options = []
let dataOCRDocument
let documentTypeGlobal

$(function () {
    // $("select").selectric();
    // $(".inputtags").tagsinput('items');
    getDocumentsType();
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

$('#urlDocumento').change(function() {
    $('#divUrlDocumento').removeClass('hide').addClass('show')
    $('#divSelecionarDocumento').addClass('hide').removeClass('show')
});

$('#inputedDocumento').change(function() {
    $('#divUrlDocumento').addClass('hide').removeClass('show')
    $('#divSelecionarDocumento').removeClass('hide').addClass('show')
    
});

$('#dplTiposDocumentos').change(function() {
    documentTypeGlobal = $('#dplTiposDocumentos').val()
})

$('#analise_form').on('submit', function (e) { //use on if jQuery 1.7+
    e.preventDefault(); //prevent form from submitting
    var data = $("#analise_form").serializeArray();
    console.log(data); //use the console for debugging, F12 in Chrome, not alerts
    // user = data[0].value;
    enviarDocumentoAnalise(data)

});

function getDocumentsType() {
    var settings = {
        "url": "https://uverifydevpoc1.azurewebsites.net/api/DocumentType?take=1000",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        
        sessionStorage.setItem('tiposDocumentos', JSON.stringify(response));
        dataTiposDocumentos = JSON.parse(sessionStorage.getItem('tiposDocumentos'))            
        
        let dplLinha = `<option> Selecione </option>`
        $(`#dplTiposDocumentos`).append(dplLinha)
        
        $.each(dataTiposDocumentos, function(key, val) {
            dplLinha = `<option> ${val.name} </option>`;
            $(`#dplTiposDocumentos`).append(dplLinha)
        })
      });
}

function encodeImgtoBase64(element) {

    var img = element.files[0];
    var fileName = element.files[0].name
    var reader = new FileReader();
    $('#documentoSelectLabel').text(fileName)
    reader.onloadend = function () {
        $("#fancyBox").attr("href", reader.result);
        //   $("#convertImg").text(reader.result);
        imgBase64Global = reader.result
        $("#displayImg").attr("src", reader.result);
        $("#btnSubmit").prop("disabled", false)
    }
    reader.readAsDataURL(img);
}

function enviarDocumentoAnalise(objetoForm) {

    // swalEnviandoDocs()
    // audio.play();

    // imgBase64Global = imgBase64Global.split(',')
    // var imgFinal = imgBase64Global[1]
    var url = 'https://validateocrgenerate.azurewebsites.net/api/generate'
    var valorTipoDocumentoSelecionado = objetoForm[0].value
    var urlDocumentoSelecionado = objetoForm[2].value

    var settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "url": urlDocumentoSelecionado,
          "type": valorTipoDocumentoSelecionado
        }),
      };

    let documentoList = dataTiposDocumentos.filter(f => f.name == valorTipoDocumentoSelecionado)
    documentFieldsList = documentoList[0].documentFields
    
    let selectLine = `<option> Selecione </option>`
    options.push(selectLine);

    $.each(documentFieldsList, function (key, val) { 
        selectLine = `<option value='${val.name}, ${val.type}'> ${val.name} </option>`        
        options.push(selectLine);
     })

    $.ajax(settings).done(function (response) {
        // console.log(response);
        dataOCRDocument = JSON.parse(response)
        let description
        $.each(dataOCRDocument, function (key, val) {

            if(key == 0) {

            } else {
                description = val.Description

                let linhaTabela =
                `<tr>
                <td>${description}</td>   
                <td><select id='select_${key}' value='${key}' onchange="pegaValorObjeto(this, ${key})"> ${options} </select></td>
                </tr>`
                
                $(`#TabelaRetornoTreino`).append(linhaTabela)
            }            
        });

        // Descer tela aos dados carregados...
        $('html, body').animate({
            scrollTop: $("#valoresDocumento").offset().top - 40
        }, 2000);

    }).fail(function (response) {
        console.log(response)
    });

}

function pegaValorObjeto(object, arrayPosition) {
    var value = object.value;  
    alert(value);

    //identificar o tipo de documento selecionado
    //criar a logica do data para envio do documento "append por exemplo campos como nome" monta esse objeto e envia ao serviço do Leandro

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