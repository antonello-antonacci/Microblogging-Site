    var timer= setInterval('updatePosts()',10000); // ho modificato il tempo da 60000 a 4000 alberto

    function startTimer(){
        timer= setInterval('updatePosts()',10000);

    }

    function writeInWindows(posts){

        var arrayTitoli = new Array();
        var arrayContent = new Array();
        var arrayLike = new Array();
        var arrayDislike = new Array();

        $(posts).find("article").each(function(){
            arrayTitoli.push($(this).attr("resource"));
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

            $("#Finestra0").dialog(
            {title:arrayTitoli[0]+" Like:"+arrayLike[0]+" Dislike:"+arrayDislike[0]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra0").html(arrayContent[0]); //QUI VA MESSO Il CONTENUTO DEl POST


            $("#Finestra1").dialog(
            {title:arrayTitoli[1]+" Like:"+arrayLike[1]+" Dislike:"+arrayDislike[1]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra1").html(arrayContent[1]); //QUI VA MESSO Il CONTENUTO DEl POST

            $("#Finestra2").dialog(
            {title:arrayTitoli[2]+" Like:"+arrayLike[2]+" Dislike:"+arrayDislike[2]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra2").html(arrayContent[2]); //QUI VA MESSO Il CONTENUTO DEl POST

            $("#Finestra3").dialog(
            {title:arrayTitoli[3]+" Like:"+arrayLike[3]+" Dislike:"+arrayDislike[3]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra3").html(arrayContent[3]); //QUI VA MESSO Il CONTENUTO DEl POST

           
    }


    function updatePosts(){
        if($("#username").html()!=""){
            $.ajax({
                type: "GET",
                url: "http://ltw1120.web.cs.unibo.it/search/10/author/ltw1120/"+$("#username").html(),
                success: function(data){

                    var att="";
                    
                    $(data).find("article").each(function(){//pezza
                        if(att=="")
                        att=$(this).attr("about");
                    });
                    var content = data.replace(/text\/html charset=UTF8/gi,"");

                    
                    var listapost="";
								$(content).find("article").each(function(){//pezza
                        listapost=listapost+'<p>'+$(this).text()+'</p>';
                    });
                    
                    $("#lastPost").html(listapost);                    
                    
                    $.ajax({
                        type: "GET",
                        url: "http://ltw1120.web.cs.unibo.it/search/4/affinity"+att,

                        success: function(data2){

                            writeInWindows(data2);
                            
                        },
                        error: function (data, ajaxOptions, thrownError){
                            switch(data.status){
                                case 403:
                                $("error").html("affinity "+data.status+" accesso negato");
                                break;
                                case 404:
                                $("error").html("affinity "+data.status+ "impossibile trovare la pagina");
                                break;
                                case 405:
                                $("error").html("affinity "+data.status+ "la pagina non e' disponibile");
                                break;
                                case 406:
                                $("error").html("affinity "+data.status + "impossibile visualizzare la pagina");
                                break;
                                case 500:
                                $("error").html("affinity "+data.status+" Server Error");
                                break;
                                case 501:
                                $("error").html("affinity "+data.status+ "il server non puo' rispondere alla richiesta");
                                break;
                            }
                        }
                    });

                        var content = data.replace(/text\/html charset=UTF8/gi,"");
                                        },
                error: function (data, ajaxOptions, thrownError){
                    switch(data.status){
                        case 403:
                        $("div").html("setfollow "+data.status+" accesso negato");
                        break;
                        case 404:
                        $("div").html("setfollow "+data.status+ "impossibile trovare la pagina");
                        break;
                        case 405:
                        $("div").html("setfollow "+data.status+ "la pagina non e' disponibile");
                        break;
                        case 406:
                        $("div").html("setfollow "+data.status + "impossibile visualizzare la pagina");
                        break;
                        case 500:
                        $("div").html("setfollow "+data.status+" Server Error");
                        break;
                        case 501:
                        $("div").html("setfollow "+data.status+ "il server non puo' rispondere alla richiesta");
                        break;
                    }
                }
            });
        }
    }

function clearWindows(){
$("#Finestra0").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra0").html(""); //QUI VA MESSO Il CONTENUTO DEl POST


$("#Finestra1").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra1").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra2").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra2").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra3").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra3").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra4").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra4").html(""); //QUI VA MESSO Il CONTENUTO DEl POST





$("#search").ajaxForm(function(){
    var limit = document.forms[1].elements[3].value;
    var type = document.forms[1].elements[2].value;
    var param = document.forms[1].elements[0].value;
    var serverid = document.forms[1].elements[1].value;

    clearTimeout(timer);                        



    if(type=="author"){
    $.ajax({
    type: "GET",
    url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type+"/"+serverid+"/"+param,
    success: function(data){
 //   if(data.status==200){
    clearWindows();
    writeInWindows(data);
 //   }
    },
    error: function (data, ajaxOptions, thrownError){
    switch(data.status){
    case 403:
    $("error").html("author "+data.status+" accesso negato");
    break;
    case 404:
    $("error").html("author "+data.status+ "impossibile trovare la pagina");
    break;
    case 405:
    $("error").html("author "+data.status+ "la pagina non e' disponibile");
    break;
    case 406:
    $("error").html("author "+data.status + "impossibile visualizzare la pagina");
    break;
    case 500:
    $("error").html("author "+data.status+" Server Error");
    break;
    case 501:
    $("error").html("author "+data.status+ "il server non puo' rispondere alla richiesta");
    break;
    }
    }
    });
    }else if(type=="following"){

    $.ajax({
    type: "GET",
    url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type,
    // url: "http://ltw1120.web.cs.unibo.it/search/10/following",
    success: function(data){
 //   if(data.status==200){
clearWindows();

    writeInWindows(data);
 //   }
    },
    error: function (data, ajaxOptions, thrownError){
    switch(data.status){
    case 403:
    $("error").html("following "+data.status+" accesso negato");
    break;
    case 404:
    $("error").html("following "+data.status+ "impossibile trovare la pagina");
    break;
    case 405:
    $("error").html("following "+data.status+ "la pagina non e' disponibile");
    break;
    case 406:
    $("error").html("following "+data.status + "impossibile visualizzare la pagina");
    break;
    case 500:
    $("error").html("following "+data.status+" Server Error");
    break;
    case 501:
    $("error").html("following "+data.status+ "il server non puo' rispondere alla richiesta");
    break;
    }
    }
    });
    }else if(type=="recent"){
    $.ajax({
    type: "GET",
    url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type+"/"+param,
    success: function(data){
   // alert(data.status);
  //  if(data.status==200){
clearWindows();

    writeInWindows(data);
    },
    error: function (data, ajaxOptions, thrownError){
    switch(data.status){
    case 403:
    $("error").html("recent "+data.status+" accesso negato");
    break;
    case 404:
    $("error").html("recent "+data.status+ "impossibile trovare la pagina");
    break;
    case 405:
    $("error").html("recent "+data.status+ "la pagina non e' disponibile");
    break;
    case 406:
    $("error").html("recent "+data.status + "impossibile visualizzare la pagina");
    break;
    case 500:
    $("error").html("recent "+data.status+" Server Error");
    break;
    case 501:
    $("error").html("recent "+data.status+ "il server non puo' rispondere alla richiesta");
    break;
    }
    }
    });
    }else if(type=="related"){
    $.ajax({
    type: "GET",
    url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type+"/"+param,
    //url: "http://ltw1120.web.cs.unibo.it/related/5/fulltext/prova",
    success: function(data){
//    if(data.status==200){
clearWindows();

    writeInWindows(data);
//    }
},
    error: function (data, ajaxOptions, thrownError){
    switch(data.status){
    case 403:
    $("error").html("related "+data.status+" accesso negato");
    break;
    case 404:
    $("error").html("related "+data.status+ "impossibile trovare la pagina");
    break;
    case 405:
    $("error").html("related "+data.status+ "la pagina non e' disponibile");
    break;
    case 406:
    $("error").html("related "+data.status + "impossibile visualizzare la pagina");
    break;
    case 500:
    $("error").html("related "+data.status+" Server Error");
    break;
    case 501:
    $("error").html("related "+data.status+ "il server non puo' rispondere alla richiesta");
    break;
    }
    }
    });
    }else if(type=="fulltext"){
    $.ajax({
    type: "GET",
    url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type+"/"+param,
    //url: "http://ltw1120.web.cs.unibo.it/search/5/fulltext/prova",
    success: function(data){
//    if(data.status==200){
clearWindows();

    writeInWindows(data);
//    }
},
    error: function (data, ajaxOptions, thrownError){
    switch(data.status){
    case 403:
    $("error").html("fulltext "+data.status+" accesso negato");
    break;
    case 404:
    $("error").html("fulltext "+data.status+ "impossibile trovare la pagina");
    break;
    case 405:
    $("error").html("fulltext "+data.status+ "la pagina non e' disponibile");
    break;
    case 406:
    $("error").html("fulltext "+data.status + "impossibile visualizzare la pagina");
    break;
    case 500:
    $("error").html("fulltext "+data.status+" Server Error");
    break;
    case 501:
    $("error").html("fulltext "+data.status+ "il server non puo' rispondere alla richiesta");
    break;
    }
    }
    });
    }else{
    $.ajax({
    type: "GET",
    url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type+"/"+serverid+"/"+param,
    success: function(data){
//    if(data.status==200){
clearWindows();

    writeInWindows(data);
//    }
},
    error: function (data, ajaxOptions, thrownError){
    switch(data.status){
    case 403:
    $("error").html("affinity "+data.status+" accesso negato");
    break;
    case 404:
    $("error").html("affinity "+data.status+ "impossibile trovare la pagina");
    break;
    case 405:
    $("error").html("affinity "+data.status+ "la pagina non e' disponibile");
    break;
    case 406:
    $("error").html("affinity "+data.status + "impossibile visualizzare la pagina");
    break;
    case 500:
    $("error").html("affinity "+data.status+" Server Error");
    break;
    case 501:
    $("error").html("affinity "+data.status+ "il server non puo' rispondere alla richiesta");
    break;
    }
    }
    });
    }        
});
}