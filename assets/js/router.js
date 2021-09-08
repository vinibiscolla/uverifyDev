$(document).ready(function() {
    //loadQualificacao();
    //loadConsulta();
    //loadRelConsulta();
    //loadPerfilFornecedor();
    //loadFornecedores();
    analiseFornecedor();
});

function loadQualificacao(){
    $('.main-content').load('/pages/dashboard.html');
}

function loadConsulta(){
    $('.main-content').load('/pages/consulta.html');
}

function loadValidacaoCadastral(){
    $('.main-content').load('/pages/validacaoCadastral.html');
}

function loadFornecedor(){
    $('.main-content').load('/pages/fornecedor.html');
}

function loadRelConsulta(){
    $('.main-content').load('/pages/relatorio-consulta.html');
}

function loadPerfilFornecedor(){
    $('.main-content').load('/pages/perfil-fornecedor.html');
}

function loadFornecedores(){
    $('.main-content').load('/pages/fornecedores.html');
}

function loadHistoricoFornecedor(){
    $('.main-content').load('/pages/historico-fornecedor.html');
}

// Funções Carrgar Paginas Menu Fieldglass //

function loadFornecedorFieldglass() {
    $('.main-content').load('/pages/fornecedor_fieldglass.html');
}

function loadFornecedoresFieldglass(){
    $('.main-content').load('/pages/fornecedores_fieldglass.html');
}

function analiseFornecedoresFieldglass(){
    $('.main-content').load('/pages/fornecedor_fieldglass_analise.html');
}

function analiseFornecedor(){
    $('.main-content').load('/pages/fornecedor_analise.html');
}

