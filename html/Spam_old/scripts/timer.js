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

            $("#Finestra4").dialog(
            {title:arrayTitoli[4]+" Like:"+arrayLike[4]+" Dislike:"+arrayDislike[4]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra4").html(arrayContent[4]); //QUI VA MESSO Il CONTENUTO DEl POST


            $("#Finestra5").dialog(
            {title:arrayTitoli[5]+" Like:"+arrayLike[5]+" Dislike:"+arrayDislike[5]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra5").html(arrayContent[5]); //QUI VA MESSO Il CONTENUTO DEl POST


            $("#Finestra6").dialog(
            {title:arrayTitoli[6]+" Like:"+arrayLike[6]+" Dislike:"+arrayDislike[6]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra6").html(arrayContent[6]); //QUI VA MESSO Il CONTENUTO DEl POST

            $("#Finestra7").dialog(
            {title:arrayTitoli[7]+" Like:"+arrayLike[7]+" Dislike:"+arrayDislike[7]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra7").html(arrayContent[7]); //QUI VA MESSO Il CONTENUTO DEl POST

            $("#Finestra8").dialog(
            {title:arrayTitoli[8]+" Like:"+arrayLike[8]+" Dislike:"+arrayDislike[8]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra8").html(arrayContent[8]); //QUI VA MESSO Il CONTENUTO DEl POST

            $("#Finestra9").dialog(
            {title:arrayTitoli[9]+" Like:"+arrayLike[9]+" Dislike:"+arrayDislike[9]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra9").html(arrayContent[9]); //QUI VA MESSO Il CONTENUTO DEl POST

            $("#Finestra10").dialog(
            {title:arrayTitoli[10]+" Like:"+arrayLike[10]+" Dislike:"+arrayDislike[10]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra10").html(arrayContent[10]); //QUI VA MESSO Il CONTENUTO DEl POST


            $("#Finestra11").dialog(
            {title:arrayTitoli[11]+" Like:"+arrayLike[11]+" Dislike:"+arrayDislike[11]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra11").html(arrayContent[11]); //QUI VA MESSO Il CONTENUTO DEl POST

            $("#Finestra12").dialog(
            {title:arrayTitoli[12]+" Like:"+arrayLike[12]+" Dislike:"+arrayDislike[12]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra12").html(arrayContent[12]); //QUI VA MESSO Il CONTENUTO DEl POST

            $("#Finestra13").dialog(
            {title:arrayTitoli[13]+" Like:"+arrayLike[13]+" Dislike:"+arrayDislike[13]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra13").html(arrayContent[13]); //QUI VA MESSO Il CONTENUTO DEl POST

            $("#Finestra14").dialog(
            {title:arrayTitoli[14]+" Like:"+arrayLike[14]+" Dislike:"+arrayDislike[14]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra14").html(arrayContent[14]); //QUI VA MESSO Il CONTENUTO DEl POST                            

            $("#Finestra15").dialog(
            {title:arrayTitoli[15]+" Like:"+arrayLike[15]+" Dislike:"+arrayDislike[15]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra15").html(arrayContent[15]); //QUI VA MESSO Il CONTENUTO DEl POST


            $("#Finestra16").dialog(
            {title:arrayTitoli[16]+" Like:"+arrayLike[16]+" Dislike:"+arrayDislike[16]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra16").html(arrayContent[16]); //QUI VA MESSO Il CONTENUTO DEl POST

            $("#Finestra17").dialog(
            {title:arrayTitoli[17]+" Like:"+arrayLike[17]+" Dislike:"+arrayDislike[17]}  //QUI VA MESSO Il TITOlO DEl POST
            );

            $("#Finestra17").html(arrayContent[17]); //QUI VA MESSO Il CONTENUTO DEl POST
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
                        listapost=listapost+"<p>"+$(this).text()+"</p>";
                    });
                    
                    $("#lastPost").html(listapost);                    
                    
                    $.ajax({
                        type: "GET",
                        url: "http://ltw1120.web.cs.unibo.it/search/18/affinity"+att,

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


$("#Finestra5").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra5").html(""); //QUI VA MESSO Il CONTENUTO DEl POST


$("#Finestra6").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra6").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra7").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra7").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra8").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra8").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra9").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra9").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra10").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra10").html(""); //QUI VA MESSO Il CONTENUTO DEl POST


$("#Finestra11").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra11").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra12").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra12").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra13").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra13").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra14").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra14").html(""); //QUI VA MESSO Il CONTENUTO DEl POST                            

$("#Finestra15").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra15").html(""); //QUI VA MESSO Il CONTENUTO DEl POST


$("#Finestra16").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra16").html(""); //QUI VA MESSO Il CONTENUTO DEl POST

$("#Finestra17").dialog(
{title:""}  //QUI VA MESSO Il TITOlO DEl POST
);

$("#Finestra17").html(""); //QUI VA MESSO Il CONTENUTO DEl POST
}


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

