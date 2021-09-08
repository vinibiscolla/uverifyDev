let workersObject;
let workerObject;
let workersObjectFiltered
let workerObjectFiltered
let spnCompanyName, spnCompanyCode;
let urlListarFuncionario = window.location.href
let idCompanyCode
let stringCompany
let supplierIdForDropdown
let table
let suppliersObject = JSON.parse(sessionStorage.getItem('suppliersObject'));

if (suppliersObject == null) {
    $.getJSON(urlGetCompanyAll, function (data) {
        suppliersObject = data
        sessionStorage.setItem('suppliersObject', JSON.stringify(suppliersObject))
    });
}

$(function () {

    var urlPageSplit = urlListarFuncionario.split("=");
    idSupplier = urlPageSplit[1];
    idCompanyCode = idSupplier

    for (var i = 0; i < suppliersObject.length; i++) {
        if (suppliersObject[i].dataSource == 'FieldGlass') {
            $("#spanCompany").append("<option value='" + suppliersObject[i].companyCode + "'>" + suppliersObject[i].name + "</option>");
        }
    }

    $("#spanCompany").change(function () {
        if ($("#spanCompany").val() != "All") {
            let supplierObject

            supplierObject = suppliersObject.filter((suppliersObject => {
                return suppliersObject.companyCode == $("#spanCompany").val()
            }))
            spnCompanyName = supplierObject[0].name
            spnCompanyCode = supplierObject[0].companyCode
            stringCompany = spnCompanyName + ' ' + spnCompanyCode

            table.clear().destroy();
            listarFuncioarios(spnCompanyCode);
        } else {
            stringCompany = 'All'
            table.clear().destroy();
            listarFuncioarios(undefined);
        }
    });

    if (idCompanyCode != undefined) {
        let supplierObject

        supplierObject = suppliersObject.filter((suppliersObject => {
            return suppliersObject.companyCode == idCompanyCode
        }))
        spnCompanyName = supplierObject[0].name
        spnCompanyCode = supplierObject[0].companyCode
        stringCompany = spnCompanyName + ' ' + spnCompanyCode
        supplierIdForDropdown = spnCompanyCode
    } else {
        stringCompany = 'All'
        supplierIdForDropdown = 'All'
    }


    $('#spanCompany').val(supplierIdForDropdown);

    sessionStorage.removeItem("workersObject");
    listarFuncioarios(idCompanyCode);

});


function listarFuncioarios(companyCode) {

    let objectWorkers
    let objectWorker

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

        objectWorkers = data;

        if (companyCode != undefined) {
            objectWorker = objectWorkers.filter((objectWorkers => {
                return objectWorkers.vendorNumber == companyCode
            }))
        } else {
            objectWorker = objectWorkers
        }

        sessionStorage.setItem('workersObject', JSON.stringify(objectWorker))

        $.each(objectWorker, function (key, val) {

            var link = `onclick="redirecionar('${val.workerID}')"`

            var linha = `<tr id="${key}" ${link}>
                        <td> ${val.workerID}</td>                        
                        <td> ${val.name} ${val.lastName}</td>
                        <td> ${val.workerEmail} </td>
                        <td> ${val.vendorNumber} </td>
                        <td> ${val.vendorName} </td>
                    </tr>`

            $('#tableListarFuncionarios').append(linha)
        });

        table = $('#tableListarFuncionarios').DataTable({
            destroy: true,
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
            order: [1, 'asc'],
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

        console.log(data);

    }).fail(function (err) {
      console.log(err);
    });
}


function openUploadData() {
    (async () => {

        const { value: file } = await Swal.fire({
            title: 'Upload Datos',
            input: 'file',
            inputAttributes: {
                'accept': 'file/*',
                'aria-label': 'Upload Master Data Record Worker'
            }
        })

        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                Swal.fire({
                    title: 'Your file was uploaded',
                    imageUrl: e.target.result,
                    imageAlt: 'The uploaded file'
                })
            }
            reader.readAsDataURL(file)
        }

    })()
}

function redirecionar(id) {

    window.location.href = `${address}/worker_profile.html?id=${id}`

}

function swalFuncionarioSemDocumentosParaVisualizacao(user) {
    Swal.fire({
        icon: 'error',
        title: `${$.i18n('listar-funcionarios-swal-user-sem-documentos')}`,
        html: `<b>${user}</b> ${$.i18n('listar-funcionarios-swal-sem-documentos')}`,
    })
}