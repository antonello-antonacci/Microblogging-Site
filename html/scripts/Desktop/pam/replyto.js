function replyPost(testoPost,params){
    var geocoding=false;
    
    if(testoPost.length<=140 && testoPost.length>0){        
        var currentPos=0;
        var tempTesto = testoPost;
        var testoSharp="";
        var pos = tempTesto.search("#");        
        var tesauro;
        
        if(pos!=-1){
            
            $.ajax({url: "http://"+server+".web.cs.unibo.it/thesaurus",
                   type: "GET",
                   async:false,
                   success: function(data){
                   tesauro = data;
                   },
                   error: function (data, ajaxOptions, thrownError){
                   $("error").html(data.status+" "+data.responseText);
                   }
                   });
            
            while(pos!=-1){
                
                currentPos=pos;
                
                while(tempTesto[currentPos]!=" " && currentPos<tempTesto.length){
                    currentPos++;
                }
                if(pos>0){
                    testoSharp = testoSharp+tempTesto.substring(0,pos);
                }

                hashtag = tempTesto.substring(pos,currentPos);
                
                $(tesauro).find("rdf\\:Description").each(function(){
                                                          
                                                          var trovato = 0;
                                                          var parent ="";
                                                          var name = "";
                                                          
                                                          $(this).find("skos\\:preflabel").each(function(){
                                                                                                
                                                                                                if($(this).text()==hashtag.substring(1,hashtag.length)){
                                                                                                trovato =1;
                                                                                                name= hashtag.substring(1,hashtag.length);
                                                                                                }
                                                                                                });
                                                          
                                                          if(trovato==1){
                                                          
                                                          $(this).find("skos\\:broader").each(function(){
                                                                                              span = '<span rel="sioc:topic">#<span typeof="skos:Concept" about="'+$(this).attr("rdf:resource")+'" rel="skos:inScheme" resource="http://ltw1120.web.cs.unibo.it/thesaurus">'+name+'</span></span>';
                                                                                              testoSharp=testoSharp+span;        
                                                                                              });
                                                          }
                                                          });
                
                tempTesto = tempTesto.substring(currentPos,tempTesto.length);
                
                pos = tempTesto.search("#");
            }
        }
        
        testoSharp = testoSharp+tempTesto;
        
        var testoFinale="";
        pos = testoSharp.search("http://");
        currentPos=-1;
        
        while(pos!=-1 && pos!=currentPos){
            
            currentPos=pos;
            testoFinale = testoFinale+testoSharp.substring(0,currentPos);
            while(testoSharp[currentPos]!=" " && currentPos<tempTesto.length){
                currentPos++;
            }

            var media = testoSharp.substring(pos,currentPos);
            
            var ext = media.substring(media.length-4,media.length);
            
            var span="";
            if(ext == ".png" || ext==".jpg" || ext==".gif"){
                span = "<span resource=\"image\" src=\""+media+"\"/>"+media;
                
            }else if(ext == ".mp3" || ext==".m4a" || ext==".ogg" || ext==".wav"){
                span = "<span resource=\"audio\" src=\""+media+"\"/>"+media;
                
            }else if(ext==".avi" || ext==".3gp" || ext==".wmv" || ext==".mp4"){
                span = "<span resource=\"video\" src=\""+media+"\"/>"+media;
            }else{
                span =media;
            }

            testoFinale = testoFinale+span;
            if (geocoding){
                var lat=position.coords.latitude;
                var long=position.coords.longitude;
                
                if(long!="" && lat!=""){
                    var geospan = "<span id=\"geolocationspan\" long=\""+long+"\"lat=\""+lat+"\">";
                    testoFinale = testoFinale+geospan;
                }
            }
            testoSharp = testoSharp.substring(currentPos,testoSharp.length);
            pos = testoSharp.search("http:");
        }

        var param = params.split("/");
        
        $.ajax({url: "http://"+server+".web.cs.unibo.it/replyto",
            type: "POST",
            data:"serverID="+param[1]+"&userID="+param[2]+"&postID="+param[3]+"&article=<article>"+escape(testoFinale+testoSharp)+"</article>",
            contentType:"application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
            success: function(data){
            },
            error: function (data, ajaxOptions, thrownError){
            }
        });        
    }
}