

$(function(){
    
    function like(path){
        
        var array = new Array();
        var inizio=0;
        for(index=0;index<3;index++){
            var word="";
            for(index2=inizio;index2<path.length;index2++){
                if(path[index2]!="/"){
                    word+=path[index2];
                }else if(word.length>0){
                    inizio=index2+1;
                    index2=path.length;
                }
            }
            array[index]=word;
        }
        

        $.ajax({
            type: "POST",
            data:"serverID="+array[0]+"&userID="+array[1]+"&postID="+array[2]+"&value=+1",
            contentType:"application/x-www-form-urlencoded",
            url: "http://ltw1120.web.cs.unibo.it/setlike",
            success: function(data){

            },
            error: function (data, ajaxOptions, thrownError){
                switch(data.status){
                    case 403:
                    $("error").html("like "+data.status+" accesso negato");
                    break;
                    case 404:
                    $("error").html("like "+data.status+ "impossibile trovare la pagina");
                    break;
                    case 405:
                    $("error").html("like "+data.status+ "la pagina non e' disponibile");
                    break;
                    case 406:
                    $("error").html("like "+data.status + "impossibile visualizzare la pagina");
                    break;
                    case 500:
                    $("error").html("like "+data.status+" Server Error");
                    break;
                    case 501:
                    $("error").html("like "+data.status+ "il server non puo' rispondere alla richiesta");
                    break;
                }
            }
        });
    }
    
    function dislike(path){
        
        var array = new Array();
        var inizio=0;
        for(index=0;index<3;index++){
            var word="";
            for(index2=inizio;index2<path.length;index2++){
                if(path[index2]!="/"){
                    word+=path[index2];
                }else if(word.length>0){
                    inizio=index2+1;
                    index2=path.length;
                }
            }
            array[index]=word;
        }
                
        $.ajax({
            type: "POST",
            data:"serverID="+array[0]+"&userID="+array[1]+"&postID="+array[2]+"&value=-1",
            contentType:"application/x-www-form-urlencoded",
            url: "http://ltw1120.web.cs.unibo.it/setlike",
            success: function(data){
            },
            error: function (data, ajaxOptions, thrownError){
                switch(data.status){
            case 403:
            $("error").html("dislike "+data.status+" accesso negato");
            break;
            case 404:
            $("error").html("dislike "+data.status+ "impossibile trovare la pagina");
            break;
            case 405:
            $("error").html("dislike "+data.status+ "la pagina non e' disponibile");
            break;
            case 406:
            $("error").html("dislike "+data.status + "impossibile visualizzare la pagina");
            break;
            case 500:
            $("error").html("dislike "+data.status+" Server Error");
            break;
            case 501:
            $("error").html("dislike "+data.status+ "il server non puo' rispondere alla richiesta");
            break;
            }
            }
        });
    }
    
    function reply(path,post){

        var array = new Array();
        var inizio=0;
        for(index=0;index<3;index++){
            var word="";
            for(index2=inizio;index2<path.length;index2++){
                if(path[index2]!="/"){
                    word+=path[index2];
                }else if(word.length>0){
                    inizio=index2+1;
                    index2=path.length;
                }
            }
            array[index]=word;
        }

        var testoPost = post;
        
        var currentPos=0;
        var tempTesto = testoPost;
        var testoSharp="";
        
        var pos = tempTesto.search("#");
        
        while(pos!=-1){
            currentPos=pos;
            
            testoSharp = testoSharp+tempTesto.substring(0,currentPos);
            
            while(tempTesto[currentPos]!=" " && currentPos<tempTesto.length){
                currentPos++;
            }
            
            var hashtag = tempTesto.substring(pos,currentPos);
            
            var span = '<span rel="sioc:topic">#<span typeof="ctag:Tag" property="ctag:label" >' + hashtag.substring(1,hashtag.length) + '</span></span>';
            testoSharp=testoSharp+span;
            
            tempTesto = tempTesto.substring(currentPos,tempTesto.length);
            
            pos = tempTesto.search("#");
            
        }
        testoSharp = testoSharp+tempTesto.substring(0,tempTesto.length);
        
        var testoFinale="";
        pos = testoSharp.search("http:");
        
        
        while(pos!=-1){
            currentPos=pos;
            testoFinale = testoFinale+testoSharp.substring(0,currentPos);
            while(testoSharp[currentPos]!=" " && currentPos<testoSharp.length){
                currentPos++;
            }
            
            var media = testoSharp.substring(pos,currentPos);
            
            var ext = media.substring(media.length-4,media.length);
            
            var span="";
            if(ext == ".png" || ext==".jpg" || ext==".gif"){
                span = '<span resource="image" src='+media+'/>';
                
            }else if(ext == ".mp3" || ext==".m4a" || ext==".ogg" || ext==".wav"){
                span = '<span resource="audio" src='+media+' />';
                
            }else if(ext==".avi" || ext==".3gp" || ext==".wmv" || ext==".mp4"){
                span = '<span resource="video" src='+media+'/>';
            }else{
                span = media;
            }

            testoFinale = testoFinale+span;

            testoSharp = testoSharp.substring(currentPos,testoSharp.length);

            pos = testoSharp.search("#");
        }
        
        testoFinale = 'serverID='+array[0]+'&userID='+array[1]+'&postID='+array[2]+'&article=<article>'+testoFinale+testoSharp.substring(0,testoSharp.length)+'</article>';
        
        $.ajax({url: "http://ltw1120.web.cs.unibo.it/replyto",
            type: "POST",
            contentType:"application/x-www-form-urlencoded",
            data:testoFinale,
            success: function(data){

            },
            error: function (data, ajaxOptions, thrownError){
                switch(data.status){
                    case 403:
                    $("error").html("replyto "+data.status+" accesso negato");
                    break;
                    case 404:
                    $("error").html("replyto "+data.status+ "impossibile trovare la pagina");
                    break;
                    case 405:
                    $("error").html("replyto "+data.status+ "la pagina non e' disponibile");
                    break;
                    case 406:
                    $("error").html("replyto "+data.status + "impossibile visualizzare la pagina");
                    break;
                    case 500:
                    $("error").html("replyto "+data.status+" Server Error");
                    break;
                    case 501:
                    $("error").html("replyto "+data.status+ "il server non puo' rispondere alla richiesta");
                    break;
                }
            }
        });
    }
    
    function respam(path){
        
        var array = new Array();
        var inizio=0;
        for(index=0;index<3;index++){
            var word="";
            for(index2=inizio;index2<path.length;index2++){
                if(path[index2]!="/"){
                    word+=path[index2];
                }else if(word.length>0){
                    inizio=index2+1;
                    index2=path.length;
                }
            }
            array[index]=word;
        }
        
        $.ajax({
            type: "POST",
            data:"serverID="+array[0]+"&userID="+array[1]+"&postID="+array[2],
            contentType:"application/x-www-form-urlencoded",
            url: "http://ltw1120.web.cs.unibo.it/respam",
            success: function(data){
            },
            error: function (data, ajaxOptions, thrownError){
                switch(data.status){
                    case 403:
                    $("error").html("respam "+data.status+" accesso negato");
                    break;
                    case 404:
                    $("error").html("respam "+data.status+ "impossibile trovare la pagina");
                    break;
                    case 405:
                    $("error").html("respam "+data.status+ "la pagina non e' disponibile");
                    break;
                    case 406:
                    $("error").html("respam "+data.status + "impossibile visualizzare la pagina");
                    break;
                    case 500:
                    $("error").html("respam "+data.status+" Server Error");
                    break;
                    case 501:
                    $("error").html("respam "+data.status+ "il server non puo' rispondere alla richiesta");
                    break;
                }
            }
        });
    }
    
    function geo(){
    				geocoding = true;
    			
        
 
        }
  
    
 $('#Finestra0').dialog({
		position: [220,280],
		height: 120,
		draggable: false,
		resizable: false,
		buttons: {
			"Like":  function() {
                var text =$("#Finestra0").html();
                var path = $(text).attr("about");
                like(path);
            },
			"Dislike": function() {
                
                var text =$("#Finestra0").html();
                var path = $(text).attr("about");

                dislike(path);
            },
			"Reply":  function() {
						
                var text = $("#Finestra0").html();
                var path = $(text).attr("about");
				replyfinestra(path);
               
            },
            "Respam":  function() { 
                
                var text =$("#Finestra0").html();
                var path = $(text).attr("about");

                respam(path);
            },
            "Geo":  function() {
                var text =$("#Finestra0").html();
                var lat  = $(text).attr("lat");
                var lng  = $(text).attr("long");

                geo(lat,lng);
            },
			
        }
    });
    

// Dialog			
$('#Finestra1').dialog({
                       
		position: [220, 410],
		height: 120,
		draggable: false,
		resizable: false,
		buttons: {
			"Like":  function() {
                var text =$("#Finestra1").html();
                var path = $(text).attr("about");
                like(path);
            },
			"Dislike": function() {
                
                var text =$("#Finestra1").html();
                var path = $(text).attr("about");

                dislike(path);
            },
			"Reply":  function() {
                var text =$("#Finestra1").html();
                var path = $(text).attr("about");

                replyfinestra(path);
            },
            "Respam":  function() { 
                
                var text =$("#Finestra1").html();
                var path = $(text).attr("about");

                respam(path);
            },
            "Geo":  function() {
                var text =$("#Finestra1").html();
                var lat  = $(text).attr("lat");
                var lng  = $(text).attr("long");
                
                geo(lat,lng);
            },
			
        }
    });
    
			
$('#Finestra2').dialog({
		position: [220, 540],
		width: 300,
		height: 120,
		draggable: false,
		resizable: false,
		buttons: {
			"Like":  function() {
                var text =$("#Finestra2").html();
                var path = $(text).attr("about");
                like(path);
            },
			"Dislike": function() {
                
                var text =$("#Finestra2").html();
                var path = $(text).attr("about");

                dislike(path);
            },
			"Reply":  function() {
                var text =$("#Finestra2").html();
                var path = $(text).attr("about");

                replyfinestra(path);
            },
            "Respam":  function() { 
                
                var text =$("#Finestra2").html();
                var path = $(text).attr("about");

                respam(path);
            },
			"Geo":  function() {
                var text =$("#Finestra2").html();
                var lat  = $(text).attr("lat");
                var lng  = $(text).attr("long");
                
                geo(lat,lng);
            },
        }
    });
    
			
$('#Finestra3').dialog({
		position: [220, 670],
		width: 300,
		height: 120,
		draggable: false,
		resizable: false,
		buttons: {
			"Like":  function() {
                var text =$("#Finestra3").html();
                var path = $(text).attr("about");
                like(path);
            },
			"Dislike": function() {
                
                var text =$("#Finestra3").html();
                var path = $(text).attr("about");

                dislike(path);
            },
			"Reply":  function() {
                var text =$("#Finestra3").html();
                var path = $(text).attr("about");

                replyfinestra(path);
            },
            "Respam":  function() { 
                
                var text =$("#Finestra3").html();
                var path = $(text).attr("about");

                respam(path);
            },
            "Geo":  function() {
                var text =$("#Finestra3").html();
                var lat  = $(text).attr("lat");
                var lng  = $(text).attr("long");
                
                geo(lat,lng);
            },
			
        }
    });
    

    
				
    
    

$('#finestrainvio').dialog({
		position: [220, 150],
		width: 300,
		height: 120,
		draggable: false,
		resizable: false,
		buttons: {
			"Invio":  function() { 
                if($("#articolo").val().length<=140 && $("#articolo").val().length>0){
                    var currentPos=0;
                    var tempTesto = $("#articolo").val();

                    var testoSharp="";

                    var pos = tempTesto.search("#");

                    while(pos!=-1){
                        currentPos=pos;

                        testoSharp = testoSharp+tempTesto.substring(0,currentPos);

                        while(tempTesto[currentPos]!=" " && currentPos<tempTesto.length){
                        currentPos++;
                    }

                    var hashtag = tempTesto.substring(pos,currentPos);
                    var span="";

                    var rdf = $.rdf()
                    .prefix('sioc', 'http://rdfs.org/sioc/ns#')
                    .prefix('ctag', 'http://commontag.org/ns#')
                    .prefix('skos', 'http://www.w3.org/2004/02/skos/core#')
                    .prefix('dc', 'http://purl.org/dc/terms/')
                    .where('?schema ?label ?broader')
                    .each(function(){
                        if(this.schema.value.search(hashtag.substring(1,hashtag.length))!=-1){

                            span = '<span rel="sioc:topic">#<span typeof="skos:Concept" about='+this.schema.value+' rel="skos:inScheme" resource="http://ltw11.web.cs.unibo.it/thesaurus"</span></span>';
                            testoSharp=testoSharp+span;
                        }
                    });

                    if(span==""){
                        testoSharp=testoSharp+'<span rel="sioc:topic">#<span typeof="ctag:Tag" property="ctag:label" >' + hashtag.substring(1,hashtag.length) + '</span></span>';
                    }

                    tempTesto = tempTesto.substring(currentPos,tempTesto.length);

                    pos = tempTesto.search("#");

                }

                testoSharp = testoSharp+tempTesto.substring(0,tempTesto.length);

                var testoFinale="";
                pos = testoSharp.search("http:");

                while(pos!=-1){
                    currentPos=pos;
                    testoFinale = testoFinale+testoSharp.substring(0,currentPos);
                    while(testoSharp[currentPos]!=" " && currentPos<testoSharp.length){
                        currentPos++;
                    }

                    var media = testoSharp.substring(pos,currentPos);

                    var ext = media.substring(media.length-4,media.length);

                    var span="";
                    if(ext == ".png" || ext==".jpg" || ext==".gif"){
                        span = "<span resource=\"image\" src=\""+media+"\"/>";
                    }else if(ext == ".mp3" || ext==".m4a" || ext==".ogg" || ext==".wav"){
                        span = "<span resource=\"audio\" src=\""+media+"\"/>";
                    }else if(ext==".avi" || ext==".3gp" || ext==".wmv" || ext==".mp4"){
                        span = "<span resource=\"video\" src=\""+media+"\"/>";
                    }else{
                        span =media;
                    }

                    testoFinale = testoFinale+span;

                    var lat;
                    var long;

                    if(long!="" && lat!=""){

                        var geospan = "<span id=\"geolocationspan\" long=\""+long+"\"lat=\""+lat+"\">";

                        testoFinale = testoFinale+geospan;
                    }

                    testoSharp = testoSharp.substring(currentPos,testoSharp.length);

                    pos = testoSharp.search("#");
                }

                testoFinale = "<article>"+testoFinale+testoSharp.substring(0,testoSharp.length)+"</article>";

                $.ajax({url: "http://ltw1120.web.cs.unibo.it/post",
                    type: "POST",
                    data:"article="+testoFinale,
                    contentType:"application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
                    success: function(data){
                        $("#articolo").val("");

                    },

                    error: function (data, ajaxOptions, thrownError){
                    switch(data.status){
                    case 403:
                    $("error").html("post "+data.status+" accesso negato");
                    break;
                    case 404:
                    $("error").html("post "+data.status+ "impossibile trovare la pagina");
                    break;
                    case 405:
                    $("error").html("post "+data.status+ "la pagina non e' disponibile");
                    break;
                    case 406:
                    $("error").html("post "+data.status + "impossibile visualizzare la pagina");
                    break;
                    case 500:
                    $("error").html("post "+data.status+" Server Error");
                    break;
                    case 501:
                    $("error").html("post "+data.status+ "il server non puo' rispondere alla richiesta");
                    break;
                    }
                    }
                }); 
            }
						},
			"Geo":  function() { geo();
						}
					}
				});
				
				
function replyfinestra (path) {
				
$('#finestrareply').dialog({
		width: 300,
		position: [(screen.width / 2.8),(screen.height /3)],
		buttons: {
			"Invio":  function() {
                if($("#articoloreply").val().length<=140 && $("#articoloreply").val().length>0){
                    reply(path,$("#articoloreply").val());
                    $(this).dialog("close");
                }
            },
			
            
            
        }
    });
}
//hover states on the static widgets
$('ul#icons li').hover(
		function() { $(this).addClass('ui-state-hover'); }, 
		function() { $(this).removeClass('ui-state-hover'); }
				);
				
			});