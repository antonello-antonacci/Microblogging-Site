$(document).ready(function() {

    $("#setfollow").ajaxForm(function(){
        var userid = document.forms[2].elements[0].value;
        var serverid = document.forms[2].elements[1].value;
        
        $.ajax({
            type: "POST",
            data:"serverID="+serverid+"&userID="+userid+"&value=1",
            contentType: "application/x-www-form-urlencoded",
            url: "http://"+server+".web.cs.unibo.it/setfollow",
            success: function(data){
            },
            error: function (data, ajaxOptions, thrownError){
            }
        });
    });

    $("#setunfollow").ajaxForm(function(){

        var userid = document.forms[3].elements[0].value;
        var serverid = document.forms[3].elements[1].value;
        
        $.ajax({
        type: "POST",
            data:"serverID="+serverid+"&userID="+userid+"&value=0",
        contentType: "application/x-www-form-urlencoded",
        url: "http://"+server+".web.cs.unibo.it/setfollow",
        success: function(data){
        },
        error: function (data, ajaxOptions, thrownError){
        }
        });
    });
});