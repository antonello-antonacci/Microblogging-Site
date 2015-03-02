$(document).ready(function() {
		var geocoding = false;

    $("#inviopost").ajaxForm(function(){
        var testoPost = document.forms[1].elements[0].value;

        if(testoPost.length<=140 && testoPost.length>0){
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
                    }
                );

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
								if (geocoding){
                var lat=position.coords.latitude;
                var long=position.coords.longitude;

                if(long!="" && lat!=""){
                var geospan = "<span id=\"geolocationspan\" long=\""+long+"\"lat=\""+lat+"\">";

                testoFinale = testoFinale+geospan;
                }
                }

                testoSharp = testoSharp.substring(currentPos,testoSharp.length);
position.coords.latitude
                pos = testoSharp.search("#");
            }
            
            testoFinale = "<article>"+testoFinale+testoSharp.substring(0,testoSharp.length)+"</article>";

            $.ajax({url: "http://ltw1120.web.cs.unibo.it/post",
                type: "POST",
                data:"article="+testoFinale,
                contentType:"application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
                success: function(data){
                    
                    alert(data);
                    
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
    });
});