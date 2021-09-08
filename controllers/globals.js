let address = location.protocol + `//` + location.host;
let index = address + "/index.html";
let enJSON = address + '/assets/plugins/jquery.i18n/languages/en.json'
let esJSON = address + '/assets/plugins/jquery.i18n/languages/es.json'
let ptbrJSON = address + '/assets/plugins/jquery.i18n/languages/ptbr.json'
let user, senha

let root = 'uverify'
let ross = 'str123'

let root1 = 'admin'
let ross1 = 'str123'

let language = ''
let langI18n, langI18nVal

$(function () {
    language = $('#dplLanguage').val()
    sessionStorage.setItem('language', language);
});

$.i18n().load({
    'en': enJSON,
    'ptbr': ptbrJSON,
    'es': esJSON,
    'mx': esJSON
}).done(function () {
    $.i18n().locale = language;
    $('html').i18n();
    $('#dplLanguage').change(function () {
        language = $('#dplLanguage').val();
        sessionStorage.setItem('language', language);
        $.i18n().locale = language;
        $('html').i18n();
    })
});

function swalErro(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        footer: ''
    })
}

function swalLogin() {
    let timerInterval
    Swal.fire({
        title: `${$.i18n('login-swal-login-title')}`,
        timer: 2000,

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
            // console.log('I was closed by the timer' + address);

            sessionStorage.setItem('userName', user);
            sessionStorage.setItem('password', senha);
            sessionStorage.setItem('logged', true)

            window.location = index;
        }
    })
}