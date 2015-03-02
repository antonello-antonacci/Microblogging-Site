var numFinestre = 8;

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
        
        for(index=0;index<arrayContent.length;index++){

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
                            $(this).replaceWith("<img height=18%  src="+ $(this).attr("src") +" alt='img'></img>");
                    }else if($(this).attr("resource")=="video"){
                            $(this).replaceWith("<video height=18% src="+ $(this).attr("src") +"></video>");
                    }else if($(this).attr("resource")=="audio"){                           
                            $(this).replaceWith("<audio controls='controls' src="+$(this).attr("src")+">audio tag not supported.</audio>");
                    }
                });                
                $("#Finestra"+index).dialog("open");
                $("#Finestra"+index).dialog({title:titolo});
                $("#Finestra"+index).html(testo);
        }
    }

function updatePosts(){
        $.ajax({
            type: "GET",
            url: "http://"+server+".web.cs.unibo.it/search/8/following",
            success: function(data2){
                writeInWindows(data2);
            },
            error: function (data, ajaxOptions, thrownError){
        }
    });
}


function clearWindows(){
    
    for(index=0;index<numFinestre;index++){
        $("#Finestra"+index).dialog("close");
    }
}


function showOriginalPost(urlpost){
    $("#opaqueView").css({height:'10%'});
    $("#opaqueView").activity({'color':'white'});
    clearWindows();

    
    $.ajax({
        type: "GET",
        url: "http://"+server+".web.cs.unibo.it/post"+urlpost,
        success: function(data){
           $("#opaqueView").activity(false);
           writeInWindows(data);
           clearTimeout(timer);
        },
        error: function (data, ajaxOptions, thrownError){
        }
    });
}

function searchFromThesaurus(term){
    $("#opaqueView").css({height:'10%'});
    $("#opaqueView").activity({'color':'white'});
    clearWindows();

    $.ajax({
        type: "GET",
        url: "http://"+server+".web.cs.unibo.it/search/7/related/"+term,
        success: function(data){
            $("#opaqueView").activity(false);
            writeInWindows(data);
            clearTimeout(timer);
        },
        error: function (data, ajaxOptions, thrownError){
        }
    });
}

function hideFinestraInput(){
    $("#finestrainvio").dialog("close");
}

function showFinestraInput(){
    $("#finestrainvio").dialog("open");
}

var numFinestre = 8;

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
        
        for(index=0;index<arrayContent.length;index++){

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
                            $(this).replaceWith("<img height=18%  src="+ $(this).attr("src") +" alt='img'></img>");
                    }else if($(this).attr("resource")=="video"){
                            $(this).replaceWith("<video height=18% src="+ $(this).attr("src") +"></video>");
                    }else if($(this).attr("resource")=="audio"){                           
                            $(this).replaceWith("<audio controls='controls' src="+$(this).attr("src")+">audio tag not supported.</audio>");
                    }
                });                
                $("#Finestra"+index).dialog("open");
                $("#Finestra"+index).dialog({title:titolo});
                $("#Finestra"+index).html(testo);
        }
    }

function updatePosts(){
        $.ajax({
            type: "GET",
            url: "http://"+server+".web.cs.unibo.it/search/8/following",
            success: function(data2){
                writeInWindows(data2);
            },
            error: function (data, ajaxOptions, thrownError){
        }
    });
}


function clearWindows(){
    
    for(index=0;index<numFinestre;index++){
        $("#Finestra"+index).dialog("close");
    }
}


function showOriginalPost(urlpost){
    $("#opaqueView").css({height:'10%'});
    $("#opaqueView").activity({'color':'white'});
    clearWindows();

    
    $.ajax({
        type: "GET",
        url: "http://"+server+".web.cs.unibo.it/post"+urlpost,
        success: function(data){
           $("#opaqueView").activity(false);
           writeInWindows(data);
           clearTimeout(timer);
        },
        error: function (data, ajaxOptions, thrownError){
        }
    });
}

function searchFromThesaurus(term){
    $("#opaqueView").css({height:'10%'});
    $("#opaqueView").activity({'color':'white'});
    clearWindows();

    $.ajax({
        type: "GET",
        url: "http://"+server+".web.cs.unibo.it/search/7/related/"+term,
        success: function(data){
            $("#opaqueView").activity(false);
            writeInWindows(data);
            clearTimeout(timer);
        },
        error: function (data, ajaxOptions, thrownError){
        }
    });
}

function hideFinestraInput(){
    $("#finestrainvio").dialog("close");
}

function showFinestraInput(){
    $("#finestrainvio").dialog("open");
}

var numFinestre = 8;

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
        
        for(index=0;index<arrayContent.length;index++){

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
                            $(this).replaceWith("<img height=18%  src="+ $(this).attr("src") +" alt='img'></img>");
                    }else if($(this).attr("resource")=="video"){
                            $(this).replaceWith("<video height=18% src="+ $(this).attr("src") +"></video>");
                    }else if($(this).attr("resource")=="audio"){                           
                            $(this).replaceWith("<audio controls='controls' src="+$(this).attr("src")+">audio tag not supported.</audio>");
                    }
                });                
                $("#Finestra"+index).dialog("open");
                $("#Finestra"+index).dialog({title:titolo});
                $("#Finestra"+index).html(testo);
        }
    }

function updatePosts(){
        $.ajax({
            type: "GET",
            url: "http://"+server+".web.cs.unibo.it/search/8/following",
            success: function(data2){
                writeInWindows(data2);
            },
            error: function (data, ajaxOptions, thrownError){
        }
    });
}


function clearWindows(){
    
    for(index=0;index<numFinestre;index++){
        $("#Finestra"+index).dialog("close");
    }
}


function showOriginalPost(urlpost){
    $("#opaqueView").css({height:'10%'});
    $("#opaqueView").activity({'color':'white'});
    clearWindows();

    
    $.ajax({
        type: "GET",
        url: "http://"+server+".web.cs.unibo.it/post"+urlpost,
        success: function(data){
           $("#opaqueView").activity(false);
           writeInWindows(data);
           clearTimeout(timer);
        },
        error: function (data, ajaxOptions, thrownError){
        }
    });
}

function searchFromThesaurus(term){
    $("#opaqueView").css({height:'10%'});
    $("#opaqueView").activity({'color':'white'});
    clearWindows();

    $.ajax({
        type: "GET",
        url: "http://"+server+".web.cs.unibo.it/search/7/related/"+term,
        success: function(data){
            $("#opaqueView").activity(false);
            writeInWindows(data);
            clearTimeout(timer);
        },
        error: function (data, ajaxOptions, thrownError){
        }
    });
}

function hideFinestraInput(){
    $("#finestrainvio").dialog("close");
}

function showFinestraInput(){
    $("#finestrainvio").dialog("open");
}

