$(document).ready(function() {

    if($("#username").html()!=""){
        $.ajax({
        type: "GET",
        url: "http://ltw1120.web.cs.unibo.it/followers",

            success: function(data){
     //           alert(data);
            },
            error: function (data, ajaxOptions, thrownError){
            switch(data.status){
            case 403:
            $("error").html("follow "+data.status+" accesso negato");
            break;
            case 404:
            $("error").html("follow "+data.status+ "impossibile trovare la pagina");
            break;
            case 405:
            $("error").html("follow "+data.status+ "la pagina non e' disponibile");
            break;
            case 406:
            $("error").html("follow "+data.status + "impossibile visualizzare la pagina");
            break;
            case 500:
            $("error").html("follow "+data.status+" Server Error");
            break;
            case 501:
            $("error").html("follow "+data.status+ "il server non puo' rispondere alla richiesta");
            break;
            }
        }
    });
}

    $("#setfollow").ajaxForm(function(){
        var userid = document.forms[2].elements[0].value;
        var serverid = document.forms[2].elements[1].value;
        
        $.ajax({
        type: "POST",
        data:"serverID="+serverid+"&userID="+userid+"&value=1",
        contentType: "application/x-www-form-urlencoded",
        url: "http://ltw1120.web.cs.unibo.it/setfollow",
        success: function(data){
            alert(data);
        },
        error: function (data, ajaxOptions, thrownError){
            switch(data.status){
            case 403:
            $("error").html("setfollow "+data.status+" accesso negato");
            break;
            case 404:
            $("error").html("setfollow "+data.status+ "impossibile trovare la pagina");
            break;
            case 405:
            $("error").html("setfollow "+data.status+ "la pagina non e' disponibile");
            break;
            case 406:
            $("error").html("setfollow "+data.status + "impossibile visualizzare la pagina");
            break;
            case 500:
            $("error").html("setfollow "+data.status+" Server Error");
            break;
            case 501:
            $("error").html("setfollow "+data.status+ "il server non puo' rispondere alla richiesta");
            break;
            }
        }
        });
    });

    $("#setunfollow").ajaxForm(function(){

        var userid = document.forms[3].elements[0].value;
        var serverid = document.forms[3].elements[1].value;
        
        $.ajax({
        type: "POST",
        data:"serverID="+serverid+"&userID="+userid+"&value=0",
        contentType: "application/x-www-form-urlencoded",
        url: "http://ltw1120.web.cs.unibo.it/setfollow",
        success: function(data){
            alert(data);

        },
        error: function (data, ajaxOptions, thrownError){
            switch(data.status){
            case 403:
            $("error").html("setunfollow "+data.status+" accesso negato");
            break;
            case 404:
            $("error").html("setunfollow "+data.status+ "impossibile trovare la pagina");
            break;
            case 405:
            $("error").html("setunfollow "+data.status+ "la pagina non e' disponibile");
            break;
            case 406:
            $("error").html("setunfollow "+data.status + "impossibile visualizzare la pagina");
            break;
            case 500:
            $("error").html("setunfollow "+data.status+" Server Error");
            break;
            case 501:
            $("error").html("setunfollow "+data.status+ "il server non puo' rispondere alla richiesta");
            break;
            }
        }
        });
    });
});