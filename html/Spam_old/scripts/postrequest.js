$(document).ready(function() {

    $("#postrequest").click(function(){

                            
        var url = "http://ltw1120.web.cs.unibo.it/post/"+serverid+"/"+userid+"/"+postid;
        
        $.ajax({
           type: "GET",
           url: url,
           success: function(data){
               alert(data);
           },
           error: function (data, ajaxOptions, thrownError){
               switch(data.status){
               case 403:
                    $("error").html("postrequest "+data.status+" accesso negato");
               break;
               case 404:
                    $("error").html("postrequesat "+data.status+ "impossibile trovare la pagina");
               break;
               case 405:
                    $("error").html("postrequest "+data.status+ "la pagina non e' disponibile");
               break;
               case 406:
                    $("error").html("postrequest "+data.status + "impossibile visualizzare la pagina");
               break;
               case 500:
                    $("error").html("postrequest "+data.status+" Server Error");
               break;
               case 501:
                    $("error").html("postrequest "+data.status+ "il server non puo' rispondere alla richiesta");
               break;
               }
           }
        });
    });
});