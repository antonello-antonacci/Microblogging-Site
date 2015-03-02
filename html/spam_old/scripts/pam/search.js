$(document).ready(function() {
//
//    $("#search").ajaxForm(function(){
//        var limit = document.forms[1].elements[3].value;
//        var type = document.forms[1].elements[2].value;
//        var param = document.forms[1].elements[0].value;
//        var serverid = document.forms[1].elements[1].value;
//
//        if(type=="author"){
//            $.ajax({
//                type: "GET",
//                url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type+"/"+serverid+"/"+param,
//                //   url: "http://ltw1120.web.cs.unibo.it/search/5/author/ltw1120/Paolo",
//                success: function(data){
//                    if(data.status==200){
//                        writeInWindows(data);
//                    }
//                },
//                error: function (data, ajaxOptions, thrownError){
//                    switch(data.status){
//                        case 403:
//                        $("error").html("author "+data.status+" accesso negato");
//                        break;
//                        case 404:
//                        $("error").html("author "+data.status+ "impossibile trovare la pagina");
//                        break;
//                        case 405:
//                        $("error").html("author "+data.status+ "la pagina non e' disponibile");
//                        break;
//                        case 406:
//                        $("error").html("author "+data.status + "impossibile visualizzare la pagina");
//                        break;
//                        case 500:
//                        $("error").html("author "+data.status+" Server Error");
//                        break;
//                        case 501:
//                        $("error").html("author "+data.status+ "il server non puo' rispondere alla richiesta");
//                        break;
//                    }
//                }
//            });
//        }else if(type=="following"){
//
//            $.ajax({
//                type: "GET",
//                url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type,
//               // url: "http://ltw1120.web.cs.unibo.it/search/10/following",
//                success: function(data){
//                    alert(data);
//                },
//                error: function (data, ajaxOptions, thrownError){
//                    switch(data.status){
//                        case 403:
//                        $("error").html("following "+data.status+" accesso negato");
//                        break;
//                        case 404:
//                        $("error").html("following "+data.status+ "impossibile trovare la pagina");
//                        break;
//                        case 405:
//                        $("error").html("following "+data.status+ "la pagina non e' disponibile");
//                        break;
//                        case 406:
//                        $("error").html("following "+data.status + "impossibile visualizzare la pagina");
//                        break;
//                        case 500:
//                        $("error").html("following "+data.status+" Server Error");
//                        break;
//                        case 501:
//                        $("error").html("following "+data.status+ "il server non puo' rispondere alla richiesta");
//                        break;
//                    }
//                }
//            });
//        }else if(type=="recent"){
//            $.ajax({
//                type: "GET",
//                url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type+"/"+param,
//               // url: "http://ltw1120.web.cs.unibo.it/search/5/recent/prova",
//                success: function(data){
//                    alert(data);
//                },
//                error: function (data, ajaxOptions, thrownError){
//                    switch(data.status){
//                        case 403:
//                        $("error").html("recent "+data.status+" accesso negato");
//                        break;
//                        case 404:
//                        $("error").html("recent "+data.status+ "impossibile trovare la pagina");
//                        break;
//                        case 405:
//                        $("error").html("recent "+data.status+ "la pagina non e' disponibile");
//                        break;
//                        case 406:
//                        $("error").html("recent "+data.status + "impossibile visualizzare la pagina");
//                        break;
//                        case 500:
//                        $("error").html("recent "+data.status+" Server Error");
//                        break;
//                        case 501:
//                        $("error").html("recent "+data.status+ "il server non puo' rispondere alla richiesta");
//                        break;
//                    }
//                }
//            });
//        }else if(type=="related"){
//            $.ajax({
//                type: "GET",
//                url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type+"/"+param,
//                //url: "http://ltw1120.web.cs.unibo.it/related/5/fulltext/prova",
//                success: function(data){
//                    alert(data);
//                },
//                error: function (data, ajaxOptions, thrownError){
//                    switch(data.status){
//                        case 403:
//                        $("error").html("related "+data.status+" accesso negato");
//                        break;
//                        case 404:
//                        $("error").html("related "+data.status+ "impossibile trovare la pagina");
//                        break;
//                        case 405:
//                        $("error").html("related "+data.status+ "la pagina non e' disponibile");
//                        break;
//                        case 406:
//                        $("error").html("related "+data.status + "impossibile visualizzare la pagina");
//                        break;
//                        case 500:
//                        $("error").html("related "+data.status+" Server Error");
//                        break;
//                        case 501:
//                        $("error").html("related "+data.status+ "il server non puo' rispondere alla richiesta");
//                        break;
//                    }
//                }
//            });
//        }else if(type=="fulltext"){
//            $.ajax({
//                type: "GET",
//                url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type+"/"+param,
//                //url: "http://ltw1120.web.cs.unibo.it/search/5/fulltext/prova",
//                success: function(data){
//                    alert(data);
//                },
//                error: function (data, ajaxOptions, thrownError){
//                    switch(data.status){
//                        case 403:
//                        $("error").html("fulltext "+data.status+" accesso negato");
//                        break;
//                        case 404:
//                        $("error").html("fulltext "+data.status+ "impossibile trovare la pagina");
//                        break;
//                        case 405:
//                        $("error").html("fulltext "+data.status+ "la pagina non e' disponibile");
//                        break;
//                        case 406:
//                        $("error").html("fulltext "+data.status + "impossibile visualizzare la pagina");
//                        break;
//                        case 500:
//                        $("error").html("fulltext "+data.status+" Server Error");
//                        break;
//                        case 501:
//                        $("error").html("fulltext "+data.status+ "il server non puo' rispondere alla richiesta");
//                        break;
//                    }
//                }
//            });
//        }else{
//            $.ajax({
//                type: "GET",
//                url: "http://ltw1120.web.cs.unibo.it/search/"+limit+"/"+type+"/"+serverid+"/"+param,
//                success: function(data){
//                    alert(data);
//                },
//                error: function (data, ajaxOptions, thrownError){
//                    switch(data.status){
//                        case 403:
//                        $("error").html("affinity "+data.status+" accesso negato");
//                        break;
//                        case 404:
//                        $("error").html("affinity "+data.status+ "impossibile trovare la pagina");
//                        break;
//                        case 405:
//                        $("error").html("affinity "+data.status+ "la pagina non e' disponibile");
//                        break;
//                        case 406:
//                        $("error").html("affinity "+data.status + "impossibile visualizzare la pagina");
//                        break;
//                        case 500:
//                        $("error").html("affinity "+data.status+" Server Error");
//                        break;
//                        case 501:
//                        $("error").html("affinity "+data.status+ "il server non puo' rispondere alla richiesta");
//                        break;
//                    }
//                }
//            });
//        }        
//    });

    });