
function writeInWindows(posts){
    var arrayContent = new Array();
    var arrayCreator = new Array();
    var arrayLike = new Array();
    var arrayDislike = new Array();    
    
    posts = "<tmp>"+posts+"</tmp>"
    
    $(posts).find("article").each(function(){    
                                  
                                  arrayCreator.push($(this).attr("about"));
                                  arrayContent.push(this);
                                  
                                  });
    
    $(posts).find("span").each(function(){ 
                               if($(this).attr("property")=="tweb:countLike"){
                               arrayLike.push($(this).attr("content"));
                               }
                               if($(this).attr("property")=="tweb:countDislike"){
                               arrayDislike.push($(this).attr("content"));
                               }
                               });
    
    for(index=0;index<arrayCreator.length;index++){
        
        var tmpTitolo = arrayCreator[index];
        
        var arrayName = tmpTitolo.split("/");
        
        var titolo = arrayName[2]+" Like:"+arrayLike[index]+" Dislike:"+arrayDislike[index];
        var testo = arrayContent[index];
        
        $(testo).find("span").each(function(){
               if($(this).attr("typeOf")=="skos:Concept"){
               var text = $(this).text();
               $(this).html("<a id='thes-word' onClick=searchFromThesaurus('"+text+"')>"+text+"</a>");
               }
               
               if($(this).attr("rel")=="sioc:has_reply"){
               
                    var risposta = "</br><a id='replyTo' onClick=showOriginalPost('"+$(this).attr("resource")+"')>leggi la risposta...</a>";
                                   
                    testo = testo.innerHTML+risposta.toString();
               }
                if($(this).attr("resource")=="image"){
                            $(this).replaceWith("<img height=18% src="+ $(this).attr("src") +" alt='img'></img>");
                    }else if($(this).attr("resource")=="video"){
                            $(this).replaceWith("<video height=18% src="+ $(this).attr("src") +"></video>");
                    }else if($(this).attr("resource")=="audio"){                           
                        $(this).replaceWith("<audio controls='controls' src="+escape($(this).attr("src"))+"></audio>");
                    }
                    
        });
        
        $("#Finestra"+index).show();
        $("#Finestra"+index+"t").show();
        $("#li"+index).show();
        $("#Finestra"+index).html(testo);
        $("#Finestra"+index+"t").html(titolo);
        }
    }

function updatePosts(){

        $.ajax({
            type: "GET",
            url: "http://ltw1120.web.cs.unibo.it/search/8/following",
            success: function(data2){
                clearWindows();
                writeInWindows(data2);
            },
            error: function (data, ajaxOptions, thrownError){
            }
        });
    }


function clearWindows(){

    for(index=0;index<=7;index++){
        $("#Finestra"+index).hide();
        $("#Finestra"+index+"t").hide();
        $("#li"+index).hide();
    }
}


function showOriginalPost(urlpost){
    $.ajax({
        type: "GET",
        url: "http://ltw1120.web.cs.unibo.it/post/"+urlpost,
        success: function(data){
           clearWindows();
           writeInWindows(data);
        },
        error: function (data, ajaxOptions, thrownError){
        }
    });
}

function searchFromThesaurus(term){
    $.ajax({
        type: "GET",
        url: "http://ltw1120.web.cs.unibo.it/search/7/related/"+term,
        success: function(data){
            clearWindows();
            writeInWindows(data);
            clearTimeout(timer);
        },
        error: function (data, ajaxOptions, thrownError){
        }
    });
}