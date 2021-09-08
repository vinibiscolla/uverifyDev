$(function () {
    $('.selectpicker').selectpicker();
    $('#login_form').on('submit', function (e) { //use on if jQuery 1.7+
        e.preventDefault(); //prevent form from submitting
        var data = $("#login_form :input").serializeArray();
        console.log(data); //use the console for debugging, F12 in Chrome, not alerts
        user = data[0].value;
        senha = data[1].value;

        var type = 'error'
        var title = `${$.i18n('login-swal-error-title')}`
        var msg = `${$.i18n('login-swal-error-msg')}`

        switch (user) {
            case 'uverify':
                if (user == root && senha == ross) {
                    swalLogin()
                } else {
                    swalErro(type, title, msg)
                } 
                break;
            case 'admin':
                if (user == root1 && senha == ross1) {
                    swalLogin()
                } else {
                    swalErro(type, title, msg)
                } 
                break;
            default:
                swalErro(type, title, msg)
                break;
        }

    });
})