
let activityItemObject1 = [
    { "Activity Item Action":"Adjuntar Certificado AEAT", "Activity Item Code":"AEAT", "Module":"SOW" },
    { "Activity Item Action":"Adjuntar Certificado TGSS", "Activity Item Code":"TGSS", "Module":"SOW" },
    { "Activity Item Action":"UploadPasaporte", "Activity Item Code":"Pasaporte", "Module":"Worker" },
    { "Activity Item Action":"Upload DNI", "Activity Item Code":"DNI", "Module":"Worker" },
    { "Activity Item Action":"Upload NIE", "Activity Item Code":"NIE", "Module":"Worker" }

];

$(function() {
 
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


    $("#jsGrid1").jsGrid({
        width: "100%",
        height: "400px",
        editing: true,
        autoload: true,
        paging: true,
        deleteConfirm: function(item) {
            return "Activity Item \"" + item.Name + "\" will be removed. Are you sure?";
        },
        rowClick: function(args) {
            showDetailsDialog("Edit", args.item);
        },
        controller: db,
        fields: [
            { name: "Activity Item Action", type: "text", width: 100 },
            { name: "Activity Item Code", type: "text", width: 100 },
            { name: "Module", type: "text", width: 100 },
            {
                type: "control",
                modeSwitchButton: false,
                editButton: false,
                headerTemplate: function() {
                    return $("<button>").attr("type", "button").text("Add")
                            .on("click", function () {
                                showDetailsDialog("Add", {});
                            });
                }
            }
        ]
    });
 
    $("#detailsDialog").dialog({
        autoOpen: false,
        width: 400,
        close: function() {
            $("#detailsForm").validate().resetForm();
            $("#detailsForm").find(".error").removeClass("error");
        }
    });
 
    $("#detailsForm").validate({
        rules: {
            name: "required",
            age: { required: true, range: [18, 150] },
            address: { required: true, minlength: 10 },
            country: "required"
        },
        messages: {
            name: "Please enter name",
            age: "Please enter valid age",
            address: "Please enter address (more than 10 chars)",
            country: "Please select country"
        },
        submitHandler: function() {
            formSubmitHandler();
        }
    });
 
    var formSubmitHandler = $.noop;
 
    var showDetailsDialog = function(dialogType, client) {
        $("#name").val(client.Name);
        $("#age").val(client.Age);
        $("#address").val(client.Address);
        $("#country").val(client.Country);
        $("#married").prop("checked", client.Married);
 
        formSubmitHandler = function() {
            saveClient(client, dialogType === "Add");
        };
 
        $("#detailsDialog").dialog("option", "title", dialogType + " Client")
                .dialog("open");
    };
 
    var saveClient = function(client, isNew) {
        $.extend(client, {
            Name: $("#name").val(),
            Age: parseInt($("#age").val(), 10),
            Address: $("#address").val(),
            Country: parseInt($("#country").val(), 10),
            Married: $("#married").is(":checked")
        });
 
        $("#jsGrid").jsGrid(isNew ? "insertItem" : "updateItem", client);
 
        $("#detailsDialog").dialog("close");
    };

});