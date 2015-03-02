
function loadFollowing(){
    
    var index;
    
    var listaContent="";
    
    for(index=0;index<7;index++){
        listaContent = listaContent + '<li data-role="list-divider" id="Finestra'+index+'t"></li><li id="li'+index+'"><div id="Finestra'+index+'"></div><div id="1"><button id="Like'+index+'" data-role="button" data-inline="true" data-theme="b" data-icon="plus" data-iconpos="notext">Like</button><button id="Dislike'+index+'" data-role="button" data-inline="true" data-theme="b" data-icon="minus" data-iconpos="notext" >Dislike</button><button id="Reply'+index+'" data-role="button" data-inline="true" data-theme="b" data-icon="back" data-iconpos="notext">Reply</button><button id="Respam'+index+'" data-role="button" data-inline="true" data-theme="b" data-icon="refresh" data-iconpos="notext"  >Respam</button></div>';
    }
    $("#listviewdatarole").html(listaContent);
}

$(document).ready(function() {
                 

	$(".hideit").click(function() {	
		$(this).fadeOut(700);
		location.href='mobile.html#accesso';

	});                 
                 
                 
                  clearWindows();
                  
 $(".myTextArea").charCounter(140, {
           format: "%1 Caratteri Rimanenti!",
           delay: 100
     });               
                  
$(".myTextAreainvio").charCounter(140, {
        format: "%1 Caratteri Rimanenti!",	
        delay: 100
    });


$("#finestrainvio" ).button({text: true,}).click(function() {
        sendPost($('.myTextAreainvio').val());
        $('.myTextAreainvio').val("");

    });

$("#rispondipost").click(function() {

     replyPost($('.myTextArea').val());
	 $('.myTextArea').val("");

    });

var Like = new Array ();
var Dislike = new Array ();
var Reply = new Array ();
var Respam = new Array ();

for (i=0;i<7;i++){
                  
var like =  "#Like"+i;                  
var dislike =  "#Dislike"+i;
var reply = "#Reply"+i;
var respam = "#Respam"+i;

$(like).click(function(){
                       
    setlike($(this).parent().parent().find("div:first").html());
                       
});
                  
$(dislike).button().click(function() {
    setdislike($(this).parent().parent().find("div:first").html());

});

$(reply).button().click(function() { 

$(this).parent().parent().find("article").each(function(){                                                     
                replyParam = $(this).attr("about");
                                               
                $.cookie("tmp",replyParam);

                                               
});

location.href='mobile.html#risp';

});

$(respam).button().click(function() {   
        var param="";

        $(this).parent().parent().find("article").each(function(){                                                     
            var attrlist = $(this).attr("about").split("/");
            param = "serverID="+attrlist[1]+"&userID="+attrlist[2]+"&postID="+attrlist[3];
            
        });
                         
        $.ajax({
            type: "POST",
            url: "http://ltw1120.web.cs.unibo.it/respam",
            data: param,
            success: function(data){
            },
            error: function (data, ajaxOptions, thrownError){
            }
        });    
});
}
});