$(document).ready(function() {

$("#addterm").click(function(){

    var parentterm;
    var term;

    $.ajax({
    type: "POST",
    data:"partentterm=<"+parentterm+">&term=<"+term+">",
    contentType:"text/html",
    url: "http://ltw1120.web.cs.unibo.it/addterm", //da cambiare con htaccess
    success: function(data){
    },
    error: function (data, ajaxOptions, thrownError){
        switch(data.status){
        case 403:
        $("error").html("addterm "+data.status+" accesso negato");
        break;
        case 404:
        $("error").html("addterm "+data.status+ "impossibile trovare la pagina");
        break;
        case 405:
        $("error").html("addterm "+data.status+ "la pagina non e' disponibile");
        break;
        case 406:
        $("error").html("addterm "+data.status + "impossibile visualizzare la pagina");
        break;
        case 500:
        $("error").html("addterm "+data.status+" Server Error");
        break;
        case 501:
        $("error").html("addterm "+data.status+ "il server non puo' rispondere alla richiesta");
        break;
        }
    }
    });
});

$("#thesaurus").click(function(){
    $.ajax({
    type: "GET",
    url: "http://ltw1120.web.cs.unibo.it/tesauro",
    success: function(data){
           alert(data);
    },
    error: function (data, ajaxOptions, thrownError){
        switch(data.status){
        case 403:
        $("error").html("thesaurus "+data.status+" accesso negato");
        break;
        case 404:
        $("error").html("thesaurus "+data.status+ "impossibile trovare la pagina");
        break;
        case 405:
        $("error").html("thesaurus "+data.status+ "la pagina non e' disponibile");
        break;
        case 406:
        $("error").html("thesaurus "+data.status + "impossibile visualizzare la pagina");
        break;
        case 500:
        $("error").html("thesaurus "+data.status+" Server Error");
        break;
        case 501:
        $("error").html("thesaurus "+data.status+ "il server non puo' rispondere alla richiesta");
        break;
        }
    }
    });
});
});
