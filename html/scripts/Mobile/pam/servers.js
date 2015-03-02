$(document).ready(function() {
    $("#setservers").ajaxForm(function(){
        var servers ="<servers> <server serverID="+$("#listaserver").val()+"></servers>";
        
        $.ajax({
            type: "POST",
            data:"servers="+servers,
            contentType:"application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
            url: "http://ltw1120.web.cs.unibo.it/servers",
            success: function(data){
            },
            error: function (data, ajaxOptions, thrownError){
            }
        });
    });
});