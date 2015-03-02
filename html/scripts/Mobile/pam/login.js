
var server = "ltw1120";
$(document).ready(function() {
                  $("#logout").hide();
                  $("#loginNotification").hide();

                  var username = $.cookie("ltwlogin");
                  if(username!=null){

                      $("#username").html(username);
                      $("#login").fadeOut(200);
                      $("#loginText").fadeOut(200);
                      $("#logout").fadeIn(200);
                  
                        updatePosts();
                        updateTl();

                  
                      var testo ="";
                      $.ajax({
                         type: "GET",
                         url: "http://"+server+".web.cs.unibo.it/servers",
                         success: function(data){
                         $(data).find("server").each(function(){
                                                     testo=testo+"<option>"+$(this).attr("serverID")+"</option>";
                                                     });

                         $("#searchserverlistLsu").html(testo);
                         $("#searchserverlistLsup").html(testo);
                         $("#followserverlist").html(testo);
                         $("#unfollowserverlist").html(testo);
                         },
                         error: function (data, ajaxOptions, thrownError){
                         }
                        });
                  }else{
                  $("#loginNotification").show();
						$("#loginNotification1").show();
                  }
                  
                  $("#login").click(function(){
                                    var username = $("#loginText").val();


                                         $("#loginNotification").hide();
                                          
                                                                        
                                        $.ajax({url:"http://"+server+".web.cs.unibo.it/login",
                                           type: "POST",
                                           data: "username="+username,
                                           contentType:"application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
                                           success:function(data){
                                           
                                           $.cookie("ltwlogin",username);
                                                                                      
                                           $("#username").html(username);
                                           $("#login").fadeOut(200);
                                           $("#loginText").fadeOut(200);
                                           $("#logout").fadeIn(200);
                                               
                                               updatePosts();
                                               updateTl();

                                               
                                           var testo ="";
                                           $.ajax({
                                                  type: "GET",
                                                  url: "http://"+server+".web.cs.unibo.it/servers",
                                                  success: function(data){
                                                  $(data).find("server").each(function(){
                                                                              testo=testo+"<option>"+$(this).attr("serverID")+"</option>";
                                                                              });
                                                  
                                                  $("#searchserverlistLsu").html(testo);
                                                  $("#searchserverlistLsup").html(testo);
                                                  $("#followserverlist").html(testo);
                                                  $("#unfollowserverlist").html(testo);
                                                  },
                                                  error: function (data, ajaxOptions, thrownError){
                                                  }
                                                  });
                                           },
                                           error:function (data, ajaxOptions, thrownError){
                                           $("error").html(data.status+" "+data.responseText);
                                           }
                                           });
                                    });
                  
                  $("#logout").click(function(){
                                     $.ajax({ 
                                            type: "POST",
                                            contentType: "application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
                                            url: "http://"+server+".web.cs.unibo.it/logout",
                                            success: function(data){
                                            $("#username").html("");
                                            $("#login").fadeIn(200);
                                            $("#loginText").fadeIn(200);
                                            
                                            $("#logout").fadeOut(200);
                                            
                                           $("#loginNotification").show();
                                           $("#loginNotification1").show();
                                            
                                            $.cookie("ltwlogin",null);
                                            
                                            },
                                            error: function (data, ajaxOptions, thrownError){
                                            
                                            }
                                            });
                                     });
                  
                  });