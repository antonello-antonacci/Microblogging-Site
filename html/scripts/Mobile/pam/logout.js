$(document).ready(function() {
    $("#logout").click(function(){
        

        $.ajax({ 
        type: "POST",
        contentType: "application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml",
        url: "http://ltw1120.web.cs.unibo.it/logout",
        success: function(data){
      	   $("#username").html("");
            $("#login").fadeIn(200);
            hideAllWindows();
        },
        error: function (data, ajaxOptions, thrownError){

        }
        });
    });
});