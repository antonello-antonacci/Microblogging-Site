$(document).ready(function() {
    $("#logout").click(function(){
        

        $.ajax({ 
        type: "POST",
        contentType: "application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
        url: "http://ltw1120.web.cs.unibo.it/logout",
        success: function(data){
      	   $("#username").html("");
            $("#login").fadeIn(200);
            $("#login").clearForm();
            $("#logout").fadeOut(200);
            $("#post").fadeOut(200);
            $("#postrequest").fadeOut(200);
            $("#respam").fadeOut(200);
            $("#replyto").fadeOut(200);
            $("#like").fadeOut(200);
            $("#dislike").fadeOut(200);
            $("#getservers").fadeOut(200);
            $("#setservers").fadeOut(200);
            $("#setfollow").fadeOut(200);
            $("#setunfollow").fadeOut(200);
            $("#addterm").fadeOut(200);
            $("#remterm").fadeOut(200);
            $("#thesaurus").fadeOut(200);
            $("#search").fadeOut(200);
        },
        error: function (data, ajaxOptions, thrownError){
            switch(data.status){
            case 403:
            $("error").html("logout "+data.status+" accesso negato");
            break;
            case 404:
            $("error").html("logout "+data.status+ "impossibile trovare la pagina");
            break;
            case 405:
            $("error").html("logout "+data.status+ "la pagina non e' disponibile");
            break;
            case 406:
            $("error").html("logout "+data.status + "impossibile visualizzare la pagina");
            break;
            case 500:
            $("error").html("logout "+data.status+" Server Error");
            break;
            case 501:
            $("error").html("logout "+data.status+ "il server non puo' rispondere alla richiesta");
            break;
            }
        }
        });
    });
});