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
                        

			  $.ajax({
                               type: "GET",
                               url: "http://ltw1120.web.cs.unibo.it/tesauro",
                               dataType: "xml",
                               success: function(data3) {
                                    var tesauro="";

                                   $(data3).find("tesauro").each(function(){
                                        tesauro=tesauro+"<option>"+$(this).attr("rdf:resource")+"</option>"
                                    });
                                    $("#tesauro").html(tesauro);

                                   }

                               });
                        }
               
               
                    },
                error:function (data, ajaxOptions, thrownError){

                    $("error").html(data.status+" "+data.responseText);
                }
        });
    });
                  
});