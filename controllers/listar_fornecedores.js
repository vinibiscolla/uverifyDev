let suppliersObject

$(document).ready(function () {

  sessionStorage.removeItem("suppliersObject");
  //Timer para dar tempo de carregar a lib ptbr e não quebrar a chamada das traduções
  loadCompanies()

});


function loadCompanies() {

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

    let getSuppliersDataFromSessionStorage = sessionStorage.getItem('suppliersObject')
    if (getSuppliersDataFromSessionStorage != '') {
      suppliersObject = data
      sessionStorage.setItem('suppliersObject', JSON.stringify(suppliersObject))
    }

    $.each(data, function (key, val) {

      //Torcar val.externalId para cnpj
      if (val.dataSource == 'FieldGlass') {
        var linha = `<tr id="${key}" onclick="redirecionarPerfilFornecedor('${val.companyCode}')">
          <td> ${val.companyCode}</td>
          <td> ${val.name}</td>                        
          <td> <span class="badge badge-success"> ${val.status} </span></td>                        
        </tr>`
        $('#tableListarFornecedor').append(linha)
      }
    });

    $('#tableListarFornecedor').DataTable({
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
      ],
      rowReorder: {
        selector: 'td:nth-child(2)'
    }
    });


    console.log(data);

  }).fail(function (err) {
    console.log(err);
  });

}