funcionarioObject = {
  idFunc: 'DW000665342',
  fotoPerfil: '../../../pages/docs/foto.jpg',
  nomeFunc: 'Caio Moraes',
  idFieldglass: 'XPTO1',
  linkField: 'google.com',
  cargoFunc: 'Analista Financeiro I'
}

let funcionariosCovid = [{
  id: 100001,
  nome: "Olivia",
  idade: "27",
  cargo: "Tecnologia Informação",
  foto: "./assets/img/news/olivia.jpg"
}, {
  id: 100002,
  nome: "Julia",
  idade: "32",
  cargo: "Técnica Laboratório",
  foto: "./assets/img/news/julia.jpg"
}, {
  id: 100003,
  nome: "Sara",
  idade: "48",
  cargo: "Administração",
  foto: "./assets/img/news/sara.jpg"
}, {
  id: 100004,
  nome: "Lucas",
  idade: "35",
  cargo: "Administração",
  foto: "./assets/img/news/lucas.jpg"
}, {
  id: 100005,
  nome: "David",
  idade: "26",
  cargo: "Operador Maquina I",
  foto: "./assets/img/news/david.jpg"
}]

var url = 'http://str-covid.azurewebsites.net/api/Temperatura'
// var url = '../../../pages/mocks/funcionario.json'
var medirTemperaturaGlobal = 3000
var tempGlobal
var registroFuncionario
var funcionarioCovid
var modalTemp = 1
var imgBase64Global
var nomeFuncGlobal
var registroGlobal

let addressCovid = location.protocol + `//` + location.host;
let index = addressCovid + "/index.html";

let urlGetDocuments = './mocks/funcionario.json';

$(function () {

  $('#inputRegistroUsuario').focus();

  $('#modalIdentificacao').modal('show');

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
      $('#modalIdentificacao').modal('hide');
    }
  });

  $('#form_covid').on('submit', function (e) { //use on if jQuery 1.7+
    e.preventDefault(); //prevent form from submitting
    var data = $("#form_covid :input").serializeArray();
    console.log(data); //use the console for debugging, F12 in Chrome, not alerts
    localStorage.setItem('dataForm', JSON.stringify(data));
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
  nomeFuncGlobal = userData[0].nome
  $('#idFuncionario').text(userData[0].id)
  registroGlobal = userData[0].id
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
      
      $('#cardRecomendacao').removeAttr('hidden');

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
      // $('#cardPortaria').removeAttr('hidden');
      // $('#cardUpload').removeAttr('hidden');
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

var distinct = function (valor, indice, self) {

  return self.indexOf(valor) == indice
}



function criaDocFormulario() {

  // var indexFormulario = localStorage.getItem('dataForm');
  // indexFormulario = JSON.parse(indexFormulario);
  // var objSintomas = indexFormulario.filter((sintomas) => {return sintomas.name == "valueSintomas"})
  // var objDias = indexFormulario.filter((dias) => {return dias.name == "valueDias"})
  // var objIdade = indexFormulario.filter((idade) => {return idade.name == "valueIdade"})
  // var objSexo = indexFormulario.filter((sexo) => {return sexo.name == "valueSexo"})
  // var objDoencas = indexFormulario.filter((doencas) => {return doencas.name == "valueDoencas"})
  // var objOutrosSintomas = indexFormulario.filter((outrosSintomas) => {return outrosSintomas.name == "outrosSintomas"});

  // var respirar, dorGarganta, febre, tosse, ndsintomas;
  // var sintomasFinal

  // objSintomas.forEach((element) => {
  //   if(element.value == 'respirar') {
  //     respirar = `${$.i18n('c19-sintomas-dif-respirar')}`
  //   }
  //   if(element.value == 'dorGarganta') {
  //     dorGarganta = `${$.i18n('c19-sintomas-dor-garganta')}`
  //   }
  //   if(element.value == 'febre') {
  //     febre = `${$.i18n('c19-sintomas-febre')}`
  //   }
  //   if(element.value == 'tosse') {
  //     tosse = `${$.i18n('c19-sintomas-tosse')}`
  //   }
  //   if(element.value == 'nds') {
  //     ndsintomas = `${$.i18n('c19-sintomas-nds')}`
  //   }    
  // });

  // var respostaSintomas = ''
  // var respostaTempo = ''
  // var respostaIdade = ''
  // var respostaSexto = ''
  // var respostaOutrasDoencas = ''
  // var respostaOutrosSintomas = ''

  var doc = new jsPDF()

  // You'll need to make your image into a Data URL
  // Use http://dataurl.net/#dataurlmaker
  var imgStratesys = 'data:image/png;base64,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'
  // var imgSiemens = 'data:image/png;base64,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'
  var doc = new jsPDF()

  doc.setFontSize(30)
  doc.text(15, 40, 'Formulario de Sintomas App Covid 19')
  doc.setFontSize(20)
  doc.text(15, 60, `Nome: ${nomeFuncGlobal}`)
  doc.text(15, 70, `Id/Registro: ${registroGlobal}`)
  doc.setTextColor(255, 0, 0)
  doc.text(15, 80, `Temperatura Registrada: ${tempGlobal} °C`)
  doc.setFontSize(20)
  doc.setTextColor(0, 0, 0)
  doc.text(15, 100, `${$.i18n('covid-sintomas')}`)
  doc.setFontSize(15)
  doc.text(20, 110, 'Dor de Garganta | Febre | Tosse')

  doc.setFontSize(20)
  doc.text(15, 130, `${$.i18n('covid-quanto-tempo')}`)
  doc.setFontSize(15)
  doc.text(20, 140, '1 a 7 Dias')

  doc.setFontSize(20)
  doc.text(15, 160, `${$.i18n('c19-idade')}`)
  doc.setFontSize(15)
  doc.text(20, 170, '18 a 39 anos')

  doc.setFontSize(20)
  doc.text(15, 190, `${$.i18n('c19-modal-sexo')}`)
  doc.setFontSize(15)
  doc.text(20, 200, 'Feminino')

  doc.setFontSize(20)
  doc.text(15, 220, `${$.i18n('c19-outras-doencas')}`)
  doc.setFontSize(15)
  doc.text(20, 230, 'Não Possuo')

  doc.setFontSize(20)
  doc.text(15, 250, `${$.i18n('c19-modal-oss')}`)
  doc.setFontSize(15)
  doc.text(20, 260, 'Pressão Baixa | Respirando Muito Rápido')

  doc.setFontSize(20)
  doc.text(15, 275, `Data: ${new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()}`)
  doc.setFontSize(20)
  doc.text(15, 285, 'Ass: ')


  // doc.addImage(imgSiemens, 'PNG', 150, 270, 50, 8)
  doc.addImage(imgStratesys, 'PNG', 150, 15, 40, 10)

  doc.save('formulario.pdf')

}