$(document).ready(function() {
    
    $("#replyto").ajaxForm(function(){
        var testoPost = document.forms[2].elements[0].value;
        
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
        
        testoFinale = 'serverID='+serverid+'&userID='+userid+'&postID='+postid+'&article=<article>'+testoFinale+testoSharp.substring(0,testoSharp.length)+'</article>';

 //       testoFinale = testoFinale+testoSharp.substring(0,testoSharp.length);
        
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
    });
});