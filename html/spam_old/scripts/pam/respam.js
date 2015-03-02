$(document).ready(function() {
    $("#respam").click(function(){
        $.ajax({
            type: "POST",
            data:"serverID="+serverid+"&userID="+userid+"&postID="+postid,
            contentType:"application/x-www-form-urlencoded",
            url: "http://ltw1120.web.cs.unibo.it/respam",
            success: function(data){
            },
            error: function (data, ajaxOptions, thrownError){
            switch(data.status){
                case 403:
                $("error").html("respam "+data.status+" accesso negato");
                break;
                case 404:
                $("error").html("respam "+data.status+ "impossibile trovare la pagina");
                break;
                case 405:
                $("error").html("respam "+data.status+ "la pagina non e' disponibile");
                break;
                case 406:
                $("error").html("respam "+data.status + "impossibile visualizzare la pagina");
                break;
                case 500:
                $("error").html("respam "+data.status+" Server Error");
                break;
                case 501:
                $("error").html("respam "+data.status+ "il server non puo' rispondere alla richiesta");
                break;
            }
            }
        });
    });
});