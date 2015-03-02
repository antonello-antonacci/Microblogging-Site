$(document).ready(function() {
                  
    $("#like").click(function(){

        $.ajax({
        type: "POST",
        data:"serverID="+serverid+"&userID="+userid+"&postID="+postid+"&value=+1",
        contentType:"application/x-www-form-urlencoded",
        url: "http://ltw1120.web.cs.unibo.it/setlike",
        success: function(data){
               alert(data);
        },
        error: function (data, ajaxOptions, thrownError){
            switch(data.status){
            case 403:
            $("error").html("like "+data.status+" accesso negato");
            break;
            case 404:
            $("error").html("like "+data.status+ "impossibile trovare la pagina");
            break;
            case 405:
            $("error").html("like "+data.status+ "la pagina non e' disponibile");
            break;
            case 406:
            $("error").html("like "+data.status + "impossibile visualizzare la pagina");
            break;
            case 500:
            $("error").html("like "+data.status+" Server Error");
            break;
            case 501:
            $("error").html("like "+data.status+ "il server non puo' rispondere alla richiesta");
            break;
            }
        }
        });

    });

    $("#dislike").click(function(){
                        
        $.ajax({
        type: "POST",
        data:"serverID="+serverid+"&userID="+userid+"&postID="+postid+"&value=-1",
        contentType:"application/x-www-form-urlencoded",
        url: "http://ltw1120.web.cs.unibo.it/setlike",
        success: function(data){
                alert(data);
        },
        error: function (data, ajaxOptions, thrownError){
            switch(data.status){
            case 403:
            $("error").html("dislike "+data.status+" accesso negato");
            break;
            case 404:
            $("error").html("dislike "+data.status+ "impossibile trovare la pagina");
            break;
            case 405:
            $("error").html("dislike "+data.status+ "la pagina non e' disponibile");
            break;
            case 406:
            $("error").html("dislike "+data.status + "impossibile visualizzare la pagina");
            break;
            case 500:
            $("error").html("dislike "+data.status+" Server Error");
            break;
            case 501:
            $("error").html("dislike "+data.status+ "il server non puo' rispondere alla richiesta");
            break;
            }
        }
        });
    });
});