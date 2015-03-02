
    function setlike(post){
                
        var attrlist = $(post).attr("about").split("/");

        $.ajax({
            type: "POST",
            data:"serverID="+attrlist[1]+"&userID="+attrlist[2]+"&postID="+attrlist[3]+"&value=+1",
            contentType:"application/x-www-form-urlencoded",
            url: "http://"+server+".web.cs.unibo.it/setlike",
            success: function(data){
            },
            error: function (data, ajaxOptions, thrownError){
               $("error").html(data.status+" "+data.responseText);
            }
        });
    }

    function setdislike(post){

        var attrlist = $(post).attr("about").split("/");

        $.ajax({
        type: "POST",
            data:"serverID="+attrlist[1]+"&userID="+attrlist[2]+"&postID="+attrlist[3]+"&value=-1",
        contentType:"application/x-www-form-urlencoded",
        url: "http://"+server+".web.cs.unibo.it/setlike",
        success: function(data){
        },
        error: function (data, ajaxOptions, thrownError){
               $("error").html(data.status+" "+data.responseText);

        }
        });
        
    }