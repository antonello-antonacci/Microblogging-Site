$(document).ready(function() {

$("#logout").hide();
                  

    $.ajax({url:"http://ltw1120.web.cs.unibo.it/login",
        type: "POST",
        contentType:"application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
        success:function(data){

            if(data==0){
                $("#login").fadeIn(200);
            }else{

                updatePosts();
                $("#username").html(data);
                $("#login").fadeOut(200);
                $("#logout").fadeIn(200);
           
           $.ajax({
                  type: "GET",
                  url: "http://ltw1120.web.cs.unibo.it/servers",
                  dataType: "xml",
                  success: function(data2) {
                  var listaserver="";
                  
                  $(data2).find("server").each(function(){
                                               listaserver=listaserver+"<option>"+$(this).attr("serverID")+"</option>"
                                               });
                  $("#listaserver").html(listaserver);
                  
                  }

                  });
            }
        }
    });

    $("#login").ajaxForm(function(){
        var username = document.forms[0].elements["username"].value;

        $.ajax({url:"http://ltw1120.web.cs.unibo.it/login",
                type: "POST",
                data: "username="+username,
                contentType:"application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
                success:function(data){
                    if(data!=0){
                        updatePosts();

                        $("#username").html(username);
                        $("#login").fadeOut(200);
                        $("#logout").fadeIn(200);

               
                        $.ajax({
                               type: "GET",
                               url: "http://ltw1120.web.cs.unibo.it/servers",
                               dataType: "xml",
                               success: function(data2) {
                                    var listaserver="";

                                   $(data2).find("server").each(function(){
                                        listaserver=listaserver+"<option>"+$(this).attr("serverID")+"</option>"
                                    });
                                    $("#listaserver").html(listaserver);

                                   }

                               });
                        }
               
               
                    },
                error:function (data, ajaxOptions, thrownError){
                switch(data){
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