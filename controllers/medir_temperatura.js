funcionarioObject = {
  idFunc: 'DW000665342',
  fotoPerfil: '../../../pages/docs/foto.jpg',
  nomeFunc: 'Caio Moraes',
  idFieldglass: 'XPTO1',
  linkField: 'google.com',
  cargoFunc: 'Analista Financeiro I'
}

var url = 'http://str-covid.azurewebsites.net/api/Temperatura'
// var url = '../../../pages/mocks/funcionario.json'
var medirTemperaturaGlobal = 3000
var tempGlobal
var registroFuncionario
var funcionarioCovid
var modalTemp = 1
var imgBase64Global

let addressCovid = location.protocol + `//` + location.host;
let index = addressCovid + "/index.html";

let urlGetDocuments = './mocks/funcionario.json';

$(function () {

  atualizaTemperatura(38.4)

  if (modalTemp == 1) {
    $("#modalApontamento").modal('show')
    blink()
  }

  $('#modalApontamento').on('hidden.bs.modal', function () {
    $('#inputRegistroUsuario').focus()
    $('html, body').animate({
      scrollTop: $("#divIdentificacao").offset().top - 80
    }, 1300);
  })

  $('#pesquisar_form').on('submit', function (e) { //use on if jQuery 1.7+
    e.preventDefault(); //prevent form from submitting
    var data = $("#pesquisar_form :input").serializeArray();
    console.log(data); //use the console for debugging, F12 in Chrome, not alerts
    registroFuncionario = data[0].value;
    // var texto = data[0].value;
    var userEscolhido = escolherUser(registroFuncionario)
    if (userEscolhido == '' || userEscolhido == undefined) {
      limpaCampos()
      swalErroUser(registroFuncionario)
    } else {
      limpaCampos()
      popularDadosUser(userEscolhido);
    }
  });

  $('#form_covid').on('submit', function (e) { //use on if jQuery 1.7+
    e.preventDefault(); //prevent form from submitting
    var data = $("#form_covid :input").serializeArray();
    console.log(data); //use the console for debugging, F12 in Chrome, not alerts
    $('#modalStatusMal').modal('hide')
    chamaSwalApontamento();

  });

  // pegaTemperatura(url)


  $('#tabela_covid').DataTable({
    'paging': true,
    'lengthChange': true,
    'searching': true,
    'ordering': true,
    'info': true,
    'autoWidth': true,
    dom: 'Bfrtip',
    buttons: [
      'copyHtml5',
      'excelHtml5',
      'csvHtml5',
      {
        extend: 'pdfHtml5',
        download: 'open'
      },
      'print'
    ]
  });

  $('#inputRegistroUsuario').focus()

  $('#inputRegistroUsuario').change(function () {
    $('#btnPesquisar').prop("disabled", false);
  });
  $('#inputMedirTemperatura').bind("change paste keyup", function () {
    $('#btnApontarTemperatura').prop("disabled", false);
    tempGlobal = $('#inputMedirTemperatura').val();
    atualizaTemperatura(tempGlobal);
  });
  $('#btnMedirTemperatura').click(function () {
    chamaSwalMedicao(tempGlobal)
    // $('#btnApontarTemperatura').prop("disabled", false);
    // medirTemperaturaGlobal = 30000
  });
  $('#inputRegistroUsuario').keypress(function () {
    $('#btnPesquisar').prop("disabled", false);
  });
  $('#btnPesquisar').click(function () {
    chamaSwal();
  })
  $('#btnApontarTemperatura').click(function () {
    chamaSwalApontamento();
    //$('#cardBodySaude').removeAttr('hidden')
  });

  // atualizaTemperatura();
  $("input[name=valueSintomas]").on('change', function () {
    // var nds = $("input[name=valueSintomas][value=nds]")
    // var respirar = $("input[name=valueSintomas][value=respirar]")
    // var dorGarganta = $("input[name=valueSintomas][value=dorGarganta]")
    // var febre = $("input[name=valueSintomas][value=febre]")
    // var tosse = $("input[name=valueSintomas][value=tosse]")

    // if(nds.is(":checked") == true) {
    //   respirar.prop("checked", false);
    //   dorGarganta.prop("checked", false);
    //   febre.prop("checked", false);
    //   tosse.prop("checked", false);      
    // } else {
    //   nds.prop("checked", false);   
    // }

    if ($(this).val() == "nds") {
      $('.active input[name=valueSintomas]').prop('checked', false)
      $(this).prop('checked', true)
    } else {
      $("input[name=valueSintomas][value=nds]").prop('checked', false)
    }

  })

  $("input[name=valueDoencas]").on('change', function () {

    if ($(this).val() == "naoPossuo") {
      $('.active input[name=valueDoencas]').prop('checked', false)
      $(this).prop('checked', true)
    } else {
      $("input[name=valueDoencas][value=naoPossuo]").prop('checked', false)
    }

  })

  $("input[name=outrosSintomas]").on('change', function () {

    if ($(this).val() == "nenhumDessesSintomas") {
      $('.active input[name=outrosSintomas]').prop('checked', false)
      $(this).prop('checked', true)
    } else {
      $("input[name=outrosSintomas][value=nenhumDessesSintomas]").prop('checked', false)
    }

  })

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

function blink() {
  $('#alertModal').fadeOut(500).fadeIn(500, blink);
}

function escolherUser(nome) {
  // funcionarioCovid = JSON.parse(funcionariosCovid)
  funcionarioCovid = funcionariosCovid.filter((funcionariosCovid => {
    return funcionariosCovid.nome.includes(nome)
  }));
  return funcionarioCovid;
}

function limpaCampos() {
  $('#imgFuncionario').attr('src', '')
  $('#nomeFuncionario').text('')
  $('#idFuncionario').text('')
  $('#cargoFuncionario').text('')
}

function popularDadosUser(userData) {

  $('#imgFuncionario').attr('src', userData[0].foto)
  $('#nomeFuncionario').text(userData[0].nome)
  $('#idFuncionario').text(userData[0].id)
  $('#cargoFuncionario').text(userData[0].cargo)
}

function chamaSwal() {
  let timerInterval
  Swal.fire({
    title: `${$.i18n('covid-sweet-search-title')}`,
    html: `${$.i18n('covid-sweet-search-msg')}`,
    timer: 1300,
    allowOutsideClick: false,
    timerProgressBar: true,
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
    if (result.dismiss === Swal.DismissReason.timer) {
      $('#cardBodyPerfilFuncionario').removeAttr('hidden')
      $('#cardBodyRegistroTemperatura').removeAttr('hidden')

      $('html, body').animate({
        scrollTop: $("#cardBodyPerfilFuncionario").offset().top - 80
      }, 1300);
    }
  })
}

function chamaSwalApontarFieldglass() {
  Swal.fire({
    title: `${$.i18n('covid-sweet-apontar-title')}`,
    html: `${$.i18n('covid-sweet-apontar-msg')}`,
    timer: 1500,
    allowOutsideClick: false,
    timerProgressBar: true,
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
      }, 1000)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {

    }
  })
}

function chamaSwalMedicao(temperatura) {
  let timerInterval
  Swal.fire({
    title: `${$.i18n('covid-sweet-medir-title')}`,
    html: `${$.i18n('covid-sweet-medir-msg')}  ${temperatura} °C`,
    timer: 1500,
    allowOutsideClick: false,
    timerProgressBar: true,
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
      }, 1000)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {

      $('#btnApontarTemperatura').prop("disabled", false);
      $('#cardBodySaude').removeAttr('hidden');

      $('html, body').animate({
        scrollTop: $("#cardBodySaude").offset().top - 80
      }, 1300);
    }
  })
}

function pegaTemperatura(url) {
  $.get(url, function (data, status) {
    tempGlobal = data
  });
  return tempGlobal
  //chamaSwalMedicao(temp);
  //Swal.fire('Any fool can use a computer' + data)
}


function chamaSwalApontamento() {
  let timerInterval
  Swal.fire({
    title: `${$.i18n('covid-sweet-apontamento-title')}`,
    html: `${$.i18n('covid-sweet-apontamento-msg')}`,
    timer: 2000,
    allowOutsideClick: false,
    timerProgressBar: true,
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
      }, 1000)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      $('html, body').animate({
        scrollTop: $("#cardBodySaude").offset().top - 80
      }, 1300);
      // $('#btnApontarTemperatura').prop("disabled", false);
      // $('#cardBodySaude').removeAttr('hidden')
      // location.reload();
      $('#cardRecomendacao').removeAttr('hidden');
      $('#cardPortaria').removeAttr('hidden');
      $('#cardUpload').removeAttr('hidden');
    }
  })
}

function swalTemperatura() {
  let timerInterval
  Swal.fire({
    title: `${$.i18n('covid-sweet-temp-title')}`,
    html: `${$.i18n('covid-sweet-temp-msg')}`,
    imageUrl: addressCovid + '/assets/img/sap-fieldglass-vector-logo.png',
    imageWidth: 400,
    imageHeight: 100,
    timer: 1500,
    allowOutsideClick: false,
    timerProgressBar: true,
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
      }, 1000)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      $('#cardBodyPerfilFuncionario').removeAttr('hidden')
      $('#cardBodyRegistroTemperatura').removeAttr('hidden')

    }
  })
}

function swalErroUser(user) {
  Swal.fire({
    icon: 'error',
    title: `${$.i18n('covid-sweet-error-title')}`,
    text: `${$.i18n('covid-sweet-error-msg1')} ${user} ${$.i18n('covid-sweet-error-msg2')} `
  })
}

function swalEnviandoDocCovid() {
  Swal.fire({
    title: 'Analisando Documento',
    html: 'Analisando Teste Covid 19',
    // timer: 3000,
    allowOutsideClick: false,
    timerProgressBar: true,
    imageUrl: addressCovid + '/assets/img/file-alt.png',
    imageWidth: 400,
    imageHeight: 100,
    onOpen: () => {
      Swal.showLoading()
    }
  }).then((result) => {

  })
}

function atualizaTemperatura(temperaturaInput) {
  var tempNow
  // setInterval(() => {
  tempNow = temperaturaInput
  //pegaTemperatura(url)
  $('#inputMedirTemperatura').val(tempNow)
  $('.spanTemperatura').text(tempNow.toString())
  // $('#spanTemperatura1').text(tempNow.toString())

  if (tempNow < 34 && tempNow <= 36.5) {
    $('.iconThermometer').remove();
    $('.cardStatColor').removeClass('bg-warning').addClass('bg-success')
    $('.cardStatColor').removeClass('bg-danger').addClass('bg-success')
    $('.cardStatColor').append(`<i class="fa fa-thermometer-quarter fa-2x text-white iconThermometer"></i>`)
  } else if (tempNow >= 36.5 && tempNow <= 37.2) {
    $('.iconThermometer').remove();
    $('.cardStatColor').removeClass('bg-success').addClass('bg-warning')
    $('.cardStatColor').removeClass('bg-danger').addClass('bg-warning')
    $('.cardStatColor').append(`<i class="fa fa-thermometer-half fa-2x text-white iconThermometer"></i>`)
  } else if (tempNow >= 37.2 && tempNow <= 43 || tempNow > 43) {
    $('.iconThermometer').remove();
    $('.cardStatColor').removeClass('bg-success').addClass('bg-danger')
    $('.cardStatColor').removeClass('bg-warning').addClass('bg-danger')
    $('.cardStatColor').append(`<i class="fa fa-thermometer-three-quarters fa-2x text-white iconThermometer"></i>`)
  }
  // console.log(genRand(34,37, 2));
  // }, medirTemperaturaGlobal);
}

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

function genRand(min, max, decimalPlaces) {
  var rand = Math.random() * (max - min) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
}

function enviarDocAnalise() {

  swalEnviandoDocCovid()

  imgBase64Global = imgBase64Global.split(',')
  var imgFinal = imgBase64Global[1]
  var url = 'https://str-apifieldglass.azurewebsites.net/documento/analisar'
  url = addressCovid + '/mocks/mockCovid.json'

  // var settings = {
  //   "url": url,
  //   "method": "POST",
  //   "timeout": 0,
  //   "headers": {
  //     "Content-Type": "application/json",
  //   },
  //   "data": JSON.stringify(imgFinal)
  // };

  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    // console.log(response);
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