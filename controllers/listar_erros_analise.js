var table;

$(function listarDocumentos() {
    tokenGB = sessionStorage.getItem('tokenGB');
    table = $('#tableListarAnaliseErros').DataTable({
        ajax: {
            url: 'https://uverifydevpoc1.azurewebsites.net/api/AnalizeError?take=100',
            headers: {
                "Authorization": `Bearer ${tokenGB}`,
                "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
              },
            dataSrc: ''
        },
        'paging': true,
        'lengthChange': true,
        'searching': true,
        'ordering': true,
        'info': true,
        'autoWidth': true,
        "pagingType": "full_numbers",
        dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>" +
        "<'row'<'col-sm-12 'B>>",
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            {
                extend: 'pdfHtml5',
                download: 'open'
            },
            'print'
        ],
        responsive: true,
        columns: [{
            data: 'msg'
        },
        {
            data: 'tipo'
        },
        {
            data: 'documentId'
        },
        {
            data: 'id'
        },
        {
            data: 'created'
        },
        {
            data: 'modified'
        },
        {
            data: 'url'
        }],
        order: [5, 'desc'],
        "columnDefs": [
            {
                "targets": [4, 5],
                render: function (data, type, row) {
                    var date = new Date(data);
                    return date.toLocaleString();
                }
            },
            {
                "targets": 6,
                "data": null,
                render: function (data, type, row) {
                    if (data != null) {
                        return `<button title="Copy" class="btn btn-sm btn-info"><i class="fas fa-copy"></i></button>`
                    } else {
                        return `<button title="Copy" class="btn btn-sm btn-info" disabled><i class="fas fa-copy"></i></button>`
                    }
                }
            }],
    });
});

function showDetailAnalyze(idDocumentos) {
    alert(idDocumentos)
}

$('#tableListarAnaliseErros tbody').on('click', 'button', function () {
    var data = table.row($(this).parents('tr')).data();

    if (data.url != null) {

        const el = document.createElement('textarea');
        el.value = data.url;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        iziToast.success({
            title: `Url copiada al portapapeles`,
            // message: `Document not found`,
            position: 'topRight'
        });

        setTimeout(() => {
            window.open('https://uverify.z20.web.core.windows.net/', '_blank');
        }, 5000);
    };
});