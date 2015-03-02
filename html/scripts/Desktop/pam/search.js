$(document).ready(function() {
    $("#lsu").css("z-index","3");
    $("#l").css("z-index","2");
    $("#lt").css("z-index","1");
    $("#lsup").css("z-index","0");
                  
                  
    $("#searchType").change(function(){
                    
                            if($(this).val()=="author"){
                                
                                $("#lsu").css("z-index","1");
                                $("#l").css("z-index","0");
                                $("#lt").css("z-index","0");
                                $("#lsup").css("z-index","0");
                                
                            }else if($(this).val()=="following"){
                                $("#lsu").css("z-index","0");
                                $("#l").css("z-index","1");
                                $("#lt").css("z-index","0");
                                $("#lsup").css("z-index","0");
                            }else if($(this).val()=="recent" || $(this).val()=="related" || $(this).val()=="fulltext"){
                                $("#lsu").css("z-index","0");
                                $("#l").css("z-index","0");
                                $("#lt").css("z-index","1");
                                $("#lsup").css("z-index","0");
                            }else{
                                $("#lsu").css("z-index","0");
                                $("#l").css("z-index","0");
                                $("#lt").css("z-index","0");
                                $("#lsup").css("z-index","1");
                            }
                    
    });

});


function search(){
        var type = $("#searchType").val();
        var limit = $("#selectLimit option:selected").val();
    
          $("#opaqueView").css({height:'10%'});
          $("#opaqueView").activity({'color':'white'});
          clearWindows();


        if(type=="author"){
                      
            var serverid = $("#searchserverlistLsu option:selected").val();
            var param = $("#paramUserIdLsu").val();
            
            $.ajax({
                type: "GET",
                url: "http://"+server+".web.cs.unibo.it/search/"+limit+"/"+type+"/"+serverid+"/"+param,
                success: function(data){
                   $("#opaqueView").activity(false);
                        writeInWindows(data);
                    
                },
                error: function (data, ajaxOptions, thrownError){
                }
            });
        }else if(type=="following"){
                      
            $.ajax({
                type: "GET",
                url: "http://"+server+".web.cs.unibo.it/search/"+limit+"/"+type,
                success: function(data){
                   $("#opaqueView").activity(false);
                    writeInWindows(data);
                },
                error: function (data, ajaxOptions, thrownError){
                }
            });
        }else if(type=="recent"){

            var param = $("#paramTermLt").val();

            $.ajax({
                type: "GET",
                url: "http://"+server+".web.cs.unibo.it/search/"+limit+"/"+type+"/"+param,
                success: function(data){
                   $("#opaqueView").activity(false);
                    writeInWindows(data);
                },
                error: function (data, ajaxOptions, thrownError){
                }
            });
        }else if(type=="related"){
                      
            var param = $("#paramTermLt").val();

            $.ajax({
                type: "GET",
                url: "http://"+server+".web.cs.unibo.it/search/"+limit+"/"+type+"/"+param,
                success: function(data){
                   $("#opaqueView").activity(false);
                    writeInWindows(data);
                },
                error: function (data, ajaxOptions, thrownError){
                }
            });
        }else if(type=="fulltext"){
            var param = $("#paramTermLt").val();

            $.ajax({
                type: "GET",
                url: "http://"+server+".web.cs.unibo.it/search/"+limit+"/"+type+"/"+param,
                success: function(data){
                   $("#opaqueView").activity(false);
                    writeInWindows(data);
                                      
                },
                error: function (data, ajaxOptions, thrownError){
                }
            });
        }else{
            var serverid = $("#searchserverlistLsup option:selected").val();
            var userid = $("#paramUserLsup").val();
            var postid = $("#paramPostLsup").val();

            $.ajax({
                type: "GET",
                url: "http://"+server+".web.cs.unibo.it/search/"+limit+"/"+type+"/"+serverid+"/"+userid+"/"+postid,
                success: function(data){
                   $("#opaqueView").activity(false);
                    writeInWindows(data);
                },
                error: function (data, ajaxOptions, thrownError){
                }
            });
        }   
}