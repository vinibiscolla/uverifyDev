$(function listarDocumentos() {
    tokenGB = sessionStorage.getItem('tokenGB');
    $('#tableListarDocumentos').DataTable({
        ajax: {
            url: 'https://uverifydevpoc1.azurewebsites.net/api/Document?take=100',
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
            data: 'uri'
        },
        {
            data: 'name'
        },
        {
            data: 'name'
        },
        {
            data: 'created'
        },
        {
            data: 'name'
        }],
        order: [3, 'desc'],
        "columnDefs": [{
            "targets": 0,
            render: function (data, type, row) {
                return `<a data-fancybox="gallery" href="${data}">
                            <img class="author-box-picture mr-3" width="100" src="${data}">                        
                        </a>`
            }
        }, {
            "targets": 1,
            render: function (data, type, row) {
                let objRef = data.split("~")[0];
                if (objRef == null) {return data} else {return objRef};
            }
        },
        {
            "targets": 2,
            render: function (data, type, row) {
                let itemRef = data.split("~")[1];
                if (itemRef == null) {return data} else {return itemRef};
            }
        },
        {
            "targets": 3,
            render: function (data, type, row) {
                var date = new Date(data);
                return date.toLocaleString();
            }
        },
        {
            "targets": 4,
            render: function (data, type, row) {
                return `<button title="Download Document" class="btn btn-sm btn-warning" onclick="saveImage('${data}', '${row.uri}')"><i class="fas fa-file-download"></i></button>
                        <button title="Upload Document" class="btn btn-sm btn-success"><i class="fas fa-file-upload"></i></button>`
            }
        }],
    });

});

function saveImage(name, adress) {
    if (confirm('¿Quieres descargar el archivo?')) {
        window.win = open(adress);
        //response.redirect("~/testpage.html");
        setTimeout('win.document.execCommand("SaveAs")', 100);
        setTimeout('win.close()', 500);
    }
}

function sweetAlert2(title, text, type, imgUri, imgName) {
    swal({
        title: `${title}`,
        text: `${text}`,
        type: `${type}`,
        imageUrl: `${imgUri}`,
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: `${imgName}`,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Download ?",
        cancelButtonText: "No, cancel !",
        closeOnConfirm: false,
        closeOnCancel: false },
        function(isConfirm, imgUri){
            if (isConfirm) {
                window.win = open(imgUri);
                //response.redirect("~/testpage.html");
                setTimeout('win.document.execCommand("SaveAs")', 100);
                setTimeout('win.close()', 500);
                swal("Download!", "Your file has been downloaded.", "success");
            } else {
                swal("Cancelled", "Your download has been canceled)", "warning");
            }
            });
}