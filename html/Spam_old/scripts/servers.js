$(document).ready(function() {
    $("#getservers").click(function(){
        $.ajax({
        type: "GET",
        url: "http://ltw1120.web.cs.unibo.it/servers",
        success: function(data){
               alert(data);
        },
        error: function (data, ajaxOptions, thrownError){
            switch(data.status){
            case 403:
            $("error").html("getservers "+data.status+" accesso negato");
            break;
            case 404:
            $("error").html("getservers "+data.status+ "impossibile trovare la pagina");
            break;
            case 405:
            $("error").html("getservers "+data.status+ "la pagina non e' disponibile");
            break;
            case 406:
            $("error").html("getservers "+data.status + "impossibile visualizzare la pagina");
            break;
            case 500:
            $("error").html("getservers "+data.status+" Server Error");
            break;
            case 501:
            $("error").html("getservers "+data.status+ "il server non puo' rispondere alla richiesta");
            break;
            }
        }
        });

    });
        $("#setservers").ajaxForm(function(){
            
        var servers = document.forms[4].elements[0].value;

        $.ajax({
        type: "POST",
        data:"servers="+servers,
        contentType:"application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
        url: "http://ltw1120.web.cs.unibo.it/servers",
        success: function(data){
               alert(data);
        },
        error: function (data, ajaxOptions, thrownError){
            switch(data.status){
            case 403:
            $("error").html("setservers "+data.status+" accesso negato");
            break;
            case 404:
            $("error").html("setservers "+data.status+ "impossibile trovare la pagina");
            break;
            case 405:
            $("error").html("setservers "+data.status+ "la pagina non e' disponibile");
            break;
            case 406:
            $("error").html("setservers "+data.status + "impossibile visualizzare la pagina");
            break;
            case 500:
            $("error").html("setservers "+data.status+" Server Error");
            break;
            case 501:
            $("error").html("setservers "+data.status+ "il server non puo' rispondere alla richiesta");
            break;
            }
        }
        });
    });
});