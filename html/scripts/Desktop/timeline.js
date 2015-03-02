var lastRequest = "";

//var timer= setInterval('updatePosts()',20000); 
var timerTl= setInterval('updateTl()',20000); 

var timer;
var timerTl;

    function startTimer(){
        lastRequest = "";
        updateTl();
        clearTimeout(timerTl);
        timerTl= setInterval('updateTl()',10000); 
        updatePosts();

    }
    function updateTl(){
    if($("#username").html()!=""){
        $.ajax({
            type: "GET",
            url: "http://"+server+".web.cs.unibo.it/search/10/author/"+serverName+"/"+$("#username").html(),
            success: function(data){
               var arrayContent = new Array();
               
               posts = "<tmp>"+data+"</tmp>"
               
               $(posts).find("article").each(function(){    
                                             
                    arrayContent.push(this);

                });

               var listaPost = ""

               for(index=0;index<arrayContent.length;index++){

                    var testo = arrayContent[index];

                    $(testo).find("span").each(function(){
                         
                        if($(this).attr("typeOf")=="skos:Concept"){
                                var text = $(this).text();
                                $(this).html("<a id='thes-word' onClick=searchFromThesaurus('"+text+"')>"+text+"</a>");
                        }
                                          
                        if($(this).attr("rel")=="sioc:has_reply"){
                                          
                            var risposta = "</br><a id='replyTo' onClick=showOriginalPost('"+$(this).attr("resource")+"')>risposta...</a>";
                                          
                                testo = testo.innerHTML+risposta.toString();
                            }
                                          
                            if($(this).attr("resource")=="image"){
                                    $(this).replaceWith("<img height=50% src="+ $(this).attr("src") +" alt='img'></img>");
                            }else if($(this).attr("resource")=="video"){
                                    $(this).replaceWith("<video height=18% src="+ $(this).attr("src") +"></video>");
                            }else if($(this).attr("resource")=="audio"){                           
                                    $(this).replaceWith("<audio controls='controls' src="+$(this).attr("src")+">audio tag not supported.</audio>");
                            }
                    });

               listaPost = listaPost + "<p id='post'>"+testo.innerHTML+"</p>"+ '<div id="timeline-separator"/>';
               
               }

               $("#lastPostContent").html(listaPost);
               

            },
            error: function (data, ajaxOptions, thrownError){
            }
        });
        };
        }