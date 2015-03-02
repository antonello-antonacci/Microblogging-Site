var thesaurus;

function addTerm(){
    
        var word=$("#addTermText").val();
    
        var lastpos = word.lastIndexOf("/");

        var parentterm = word.substring(0,lastpos);
        var term = word.substring(lastpos+1,word.legth);

    
        $.ajax({
            type:"POST",
            data:"parentterm="+parentterm+"&term="+term,
            contentType:"application/x-www-form-urlencoded",
            url: "http://"+server+".web.cs.unibo.it/addterm",
            success: function(data){
               getThesaurus();
            },
            error: function (data, ajaxOptions, thrownError){
                $("error").html(data.status+" "+data.responseText);
            }
        });
}

function getThesaurus(){
        
    if($("#username").text()!=""){
        $.ajax({
            type: "GET",
            url: "http://"+server+".web.cs.unibo.it/thesaurus",
            success: function(tesauro){

               if(server=="ltw1120"){
               thesaurus=tesauro;
               }else{
               thesaurus =(new XMLSerializer()).serializeToString(tesauro);
               }
               
                var testoTesauro="";

                $(thesaurus).find("rdf\\:Description").each(function(){

                    var word ="";

                    $(this).find("skos\\:preflabel").each(function(){
                        word = $(this).text();
                    });

                    $(this).find("skos\\:broader").each(function(){
                        testoTesauro=testoTesauro+"<p broader='"+$(this).attr("rdf:resource")+"'><a id='thes-word' onClick=searchFromThesaurus('"+word+"') >"+word+"</a></p>";
                    });
                });

               testoTesauro = testoTesauro +'<input placeholder="/parentterm/term" id="addTermText" type="text"/><input id="addTerm" onclick="addTerm()" type="submit"/>';
               
                $("#thesauro-content").html(testoTesauro);
               
            },
            error: function (data, ajaxOptions, thrownError){
                $("error").html(data.status+" "+data.responseText);
            }
        });
    }
}