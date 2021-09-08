let suppliersObject

$(document).ready(function () {

  //Timer para dar tempo de carregar a lib ptbr e não quebrar a chamada das traduções
  setTimeout(() => {
    loadCompanies() 
  }, 4000);

});

function loadCompanies() {


  var settings = {
    "url": urlGetCompanyAll,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": `Bearer ${tokenGB}`,
      "Cookie": ".AspNetCore.Identity.Application=CfDJ8M4xoSVt63dCmU9B3CMFVHjLbv4CMWno6K_mt3POvxRDMcxni5DWtJXWo0rpt5W5FEycs87IhXg0W95ikHmluUT0wbD3XudEDbBY1MnKvJ9qKlUh8tfQ3mRB8NLPmS9vy0VwntDDmNnrkLA80vNWqyGrhw589jnkp2giBWx7ZD9O0AYxAcO-_ta5I34_EPsAvhfnEvh4b7i--RD74ZO9VmEo5L_QMW3wixkKTk2bkVyV1RgjwJQmHJ1M35rMJexTJhemaQGZ8opixq6lsODjG-ocN2XAAI1I3v4k-JjoX4PlGfVq565fEWExnG_4GWGQS5Zw97MHwyHhDZ5YX3N6vLi3zbjFKR7ImCQLvu3gOhrLiZhqOQsFNq2IKbDO-_0UOwNx9EQdBsDkOxn8_0LdwRQeW-gGRxoySYrNQjNfDHwDp576ssUasfpCw97CEif5bAnCwIzRxfJvcJll0uU13sD7LIvkzyo_TEx11mxdftKOwhx6SwNA4Dta_RHRoMIpvuk6Drogh_XxOE8fr9LLD-6C3eUkS4UY74C28q1S2lT8ZbN1omWaGW3g6EUVT1_3CQPo4yvUYjAqxz7w-hOzRAFk3KCJVxDxsYPsTh5Yb3L4; ARRAffinity=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1; ARRAffinitySameSite=f5ecfb306e60620010bb76308e041dc8ca96ba5fca7967d574bfef606d2482e1"
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

  }).fail(function (err) {
    console.log(err);
  });

  //Função para iniciar serviço do Azure -- cota mais
  // $.getJSON(urlGetCompanyAll, function (data) {
  //   console.log(data);
  //   let getSuppliersDataFromSessionStorage = sessionStorage.getItem('suppliersObject')
  //   if (getSuppliersDataFromSessionStorage != '') {
  //     suppliersObject = data
  //     sessionStorage.setItem('suppliersObject', JSON.stringify(suppliersObject))
  //   }
  // });

}