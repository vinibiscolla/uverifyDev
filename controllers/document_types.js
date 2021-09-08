var table;

let activityItemObject1 = [
    { "Activity Item Action": "Adjuntar Certificado AEAT", "Activity Item Code": "AEAT", "Module": "SOW" },
    { "Activity Item Action": "Adjuntar Certificado TGSS", "Activity Item Code": "TGSS", "Module": "SOW" },
    { "Activity Item Action": "UploadPasaporte", "Activity Item Code": "Pasaporte", "Module": "Worker" },
    { "Activity Item Action": "Upload DNI", "Activity Item Code": "DNI", "Module": "Worker" },
    { "Activity Item Action": "Upload NIE", "Activity Item Code": "NIE", "Module": "Worker" }

];



$(function () {

    listarDocumentos()
    StartJsGrid();
});

function StartJsGrid() {
    $("#jsGrid").jsGrid({
        width: "100%",
        height: "400px",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,

        data: activityItemObject1,

        fields: [
            { name: "Activity Item Action", type: "text", width: 100 },
            { name: "Activity Item Code", type: "text", width: 100 },
            { name: "Module", type: "text", width: 100 },
            { type: "control" }
        ]
    });
}

function listarDocumentos() {
    tokenGB = sessionStorage.getItem('tokenGB');
    table = $('#tabelaDocumentos').DataTable({
        ajax: {
            url: 'https://uverifydevpoc1.azurewebsites.net/api/DocumentType?take=1000',
            dataSrc: '',
            headers: {
                "Authorization": `Bearer ${tokenGB}`,
                "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
            }
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
        columns: [
            {
                "className": 'details-control text-center',
                "orderable": false,
                "data": null,
                "defaultContent": '<i class="fas fa-search-plus"></i>'
            },
            {
                data: 'name'
            },
            {
                data: 'created'
            }
        ],
        order: [0, 'desc'],
        "columnDefs": [
            {
                "targets": 2,
                render: function (data, type, row) {
                    var date = new Date(data);
                    return date.toLocaleString();
                }
            },
            {
                "targets": 3,
                "data": null,
                render: function (data, type, row) {
                    if (data != null) {
                        return `<button disabled title="Edit" class="btn btn-sm btn-warning mr-1"><i class="fas fa-pen"></i></button> 
                                <button disabled title="Delete" class="btn btn-sm btn-danger"> <i class="fas fa-trash-alt"></i></button>`
                    } else {
                        return `<button disabled title="Edit" class="btn btn-sm btn-warning mr-1"><i class="fas fa-pen"></i></button> 
                                <button disabled title="Delete" class="btn btn-sm btn-danger"> <i class="fas fa-trash-alt"></i></button>`
                    }
                }
            }],
    });
}

$('#tabelaDocumentos tbody').on('click', 'td.details-control', function (r) {
    var tr = $(this).closest('tr');
    var row = table.row(tr);

    if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
    }
    else {
        // Open this row
        row.child(format(row.data())).show();
    }
});

function format(d) {
    var dataRow = "";
    for (let index = 0; index < d.documentFields.length; index++) {
        dataRow += `<tr>
                <td>Name:</td>
                <td>${d.documentFields[index].name}</td>
                </tr>
                <tr>
                <td>Type:</td>
                <td>${d.documentFields[index].type}</td>
                </tr>`;
    }
    
    return `<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
            ${dataRow}
            </table>`;
}

$('body').on('click', '.btnCriarTipoDocumento', function () {
    Swal.fire({
        title: 'Criar Tipo de Documento',
        html: `<div>
            <label class="col-form-label">Tipo de Documento</label>
            <input type="text" class="form-control" id="tipoDocumento">
            <hr/>

            <label class="col-form-label">Campos</label>
            <div id='clonedSection1' class='clonedSection'>
                <div style='margin-bottom:4px;' class='clonedInput'>
                    <input type="text" name='campoDocumento1' class="form-control" id="campoDocumento1">
                </div>
                <div style='margin-bottom:4px;' class='clonedInputTwo'>
                    <select type="text" name='valueTypeCampoDocumento1' class="form-control" id="valueTypeCampoDocumento1">
                        <option value="text">Texto</option>
                        <option value="number">Número</option>
                        <option value="date">Data</option>
                    </select> 
                </div>
            </div>
            
            <div class="mt-1">
                <button id='btnAdd' title="Adicionar campo" class="btn btn-success fas fa-plus" />
                <button id='btnDel' title="Remover campo" class="btn btn-danger fas fa-minus" />
            </div>
            </div>`,
        preConfirm: () => {
            if ($('#tipoDocumento').val()) {
                var jsonObj = [];

                for (let index = 1; index <= $('.clonedSection').length; index++) {

                    let nome = $(`#campoDocumento${index}`).val();
                    let tipo = $(`#valueTypeCampoDocumento${index}`).val();

                    item = {}
                    item["name"] = nome;
                    item["type"] = tipo;

                    jsonObj.push(item);
                }

                var data = {
                    name: $("#tipoDocumento").val(),
                    documentFields: jsonObj
                };
                
                tokenGB = sessionStorage.getItem('tokenGB');

                $.ajax({
                    url: "https://uverifydevpoc1.azurewebsites.net/api/DocumentType",
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${tokenGB}`,
                        "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
                    },
                    data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                }).then(function successCallback() {
                    toastSuccess('Tipo de Documento Cadastrado', '');
                }, function errorCallback() {
                    toastError('Erro ao cadastrar Tipo de Documento', '');
                });
            }
        }
    });

    $('#btnAdd').click(function () {
        var num = $('.clonedSection').length;
        var newNum = new Number(num + 1);

        var newSection = $('#clonedSection' + num).clone().attr('id', 'clonedSection' + newNum);

        newSection.children(':first').children(':first').attr('id', 'campoDocumento' + newNum).attr('name', 'campoDocumento' + newNum).val("");
        newSection.children(':nth-child(2)').children(':first').attr('id', 'valueTypeCampoDocumento' + newNum).attr('name', 'valueTypeCampoDocumento' + newNum);

        $('.clonedSection').last().append(newSection);

        // $('#btnDel').attr('disabled', '');

        // if (newNum == 5)
        //     $('#btnAdd').attr('disabled', 'disabled');
    });

    $('#btnDel').click(function () {
        var num = $('.clonedSection').length; // how many "duplicatable" input fields we currently have
        if (num !== 1) {
            $('#clonedSection' + num).remove();     // remove the last element
        }

        // enable the "add" button
        // $('#btnAdd').attr('disabled', '');

        // if only one element remains, disable the "remove" button
        // if (num - 1 == 1)
        //     $('#btnDel').attr('disabled', 'disabled');
    });

});

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