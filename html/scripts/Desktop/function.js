var server ="ltw1120";
var serverName = "ltw1120";

function setDestinationServer(status) {

    if(status==true){
        server = "ltw1113";
        serverName = "TerSoft";
    }else{
        server = "ltw1120";
        serverName= "ltw1120";
    }
}

$(document).ready(function() {
        	

    $(".myTextArea").charCounter(141, {
           format: "%1 Caratteri Rimanenti!",
           delay: 100
     });

     $(".myTextAreainvio").charCounter(140, {
        format: "%1 Caratteri Rimanenti!",	
        delay: 100
    });

    posizionix = new Array ();

    posizionix [0] = (screen.width / 5);
    posizionix [1] = (screen.width / 2.5);
    posizionix [2] = (screen.width / 1.65);
    posizionix [3] = (screen.width / 1.55);
    posizionix [4] = (screen.width / 1.65);
    posizionix [5] = (screen.width / 2.5);
    posizionix [6] = (screen.width / 5);
    posizionix [7] = (screen.width / 5.9);
   
   
    

    posizioniy = new Array ();

  posizioniy [0] = (screen.height /4.5);
  posizioniy [1] = (screen.height /5);
  posizioniy [2] = (screen.height /4.5);
  posizioniy [3] = (screen.height /2.6);
  posizioniy [4] = (screen.height /1.8);
  posizioniy [5] = (screen.height /1.74);
  posizioniy [6] = (screen.height /1.8);
  posizioniy [7] = (screen.height /2.6);
  
 
  

  fin = new Array();
  fin[0] = '#Finestra0';
  fin[1] = '#Finestra1';
  fin[2] = '#Finestra2';
  fin[3] = '#Finestra3';
  fin[4] = '#Finestra4';
  fin[5] = '#Finestra5';
  fin[6] = '#Finestra6';
  fin[7] = '#Finestra7';
  
  
 
   

 
  for (i=0;i<8;i++){

  $(fin[i]).dialog({
		position: [posizionix [i],posizioniy [i]],
 
		width: 230,
		minHeight: 110,
		modal: false,
		autoOpen: false,
		resizable: true,
        close: function(ev,ai){},
		buttons: {
            "Focus":  function() {	
                   
                   if ($(this).attr("id")=='Finestra0'){
                            i=0;   
                            $("#Finestra1").dialog("close");
                            $("#Finestra2").dialog("close");
                            $("#Finestra3").dialog("close");
                            $("#Finestra4").dialog("close");
                            $("#Finestra5").dialog("close");
                            $("#Finestra6").dialog("close");
                            $("#Finestra7").dialog("close");
                      
                            
                   }else if ($(this).attr("id")=='Finestra1'){
                        i=1;	
                            $("#Finestra0").dialog("close");
                            $("#Finestra2").dialog("close");
                            $("#Finestra3").dialog("close");
                            $("#Finestra4").dialog("close");
                            $("#Finestra5").dialog("close");
                            $("#Finestra6").dialog("close");
                            $("#Finestra7").dialog("close");
                            
                        
        
                   }else if ($(this).attr("id")=='Finestra2'){
                        i=2;
                            $("#Finestra0").dialog("close");
                            $("#Finestra1").dialog("close");
                            $("#Finestra3").dialog("close");
                            $("#Finestra4").dialog("close");
                            $("#Finestra5").dialog("close");
                            $("#Finestra6").dialog("close");
                            $("#Finestra7").dialog("close");
                            
                        
                        
                    }else if ($(this).attr("id")=='Finestra3'){
                        i=3;
                            $("#Finestra0").dialog("close");
                            $("#Finestra1").dialog("close");
                            $("#Finestra2").dialog("close");
                            $("#Finestra4").dialog("close");
                            $("#Finestra5").dialog("close");
                            $("#Finestra6").dialog("close");
                            $("#Finestra7").dialog("close");
                       
                        
                       
                    }else if ($(this).attr("id")=='Finestra4'){
                        i=4;
                            $("#Finestra0").dialog("close");
                            $("#Finestra1").dialog("close");
                            $("#Finestra2").dialog("close");
                            $("#Finestra3").dialog("close");
                            $("#Finestra5").dialog("close");
                            $("#Finestra6").dialog("close");
                            $("#Finestra7").dialog("close");
                         
                        
                       
                    }
                    else if ($(this).attr("id")=='Finestra5'){
                        i=5;
                           $("#Finestra0").dialog("close");
                            $("#Finestra1").dialog("close");
                            $("#Finestra2").dialog("close");
                            $("#Finestra3").dialog("close");
                            $("#Finestra4").dialog("close");
                            $("#Finestra6").dialog("close");
                            $("#Finestra7").dialog("close");
                          
                        
                       
                    }else if ($(this).attr("id")=='Finestra6'){
                        i=6;
                            $("#Finestra0").dialog("close");
                            $("#Finestra1").dialog("close");
                            $("#Finestra2").dialog("close");
                            $("#Finestra3").dialog("close");
                            $("#Finestra4").dialog("close");
                            $("#Finestra5").dialog("close");
                            $("#Finestra7").dialog("close");
                      
                        
                       
                    }else if ($(this).attr("id")=='Finestra7'){
                        i=7;
                            $("#Finestra0").dialog("close");
                            $("#Finestra1").dialog("close");
                            $("#Finestra2").dialog("close");
                            $("#Finestra3").dialog("close");
                            $("#Finestra4").dialog("close");
                            $("#Finestra5").dialog("close");
                            $("#Finestra6").dialog("close");
                        
                        
                       
                    }

                   $(fin[i]).dialog({ position: 'center'});

                    var param="";

                    $(this).find("article").each(function(){
                            param=$(this).attr("about");
                    });

                    $.ajax({
                        type: "GET",
                        url: "http://"+server+".web.cs.unibo.it/search/5/affinity/"+param,
                        success: function(data){
                           clearWindows();
                           writeInWindows(data);
                        },
                        error: function (data, ajaxOptions, thrownError){
                        }
                    });
                   },

                   "Like":  function() {
                       setlike($(this).html());
                   },
                   "Dislike": function() { 
                       setdislike($(this).html());
                   },
                   "Reply":  function() {
                   $(this).find("article").each(function(){
                        openReplyWindow($(this).attr("about"));
                        });
                    },
                   "Respam":  function() { 
                        var param="";

                        $(this).find("article").each(function(){                                                     
                            var attrlist = $(this).attr("about").split("/");
                            param = "serverID="+attrlist[1]+"&userID="+attrlist[2]+"&postID="+attrlist[3];
                       
                        });
                        $.ajax({
                            type: "POST",
                            url: "http://"+server+".web.cs.unibo.it/respam",
                            data: param,
                            success: function(data){
                            },
                            error: function (data, ajaxOptions, thrownError){
                            }
                        });
                   },
        },

 open: function() {
       			$('.ui-dialog-buttonpane')
    				.find('button:contains("Focus")')
    				.removeClass('ui-button-text-only')
    				.addClass('ui-button-icon-only')
    				.prepend('<span class="ui-icon ui-icon-radio-off"></span>');
	
	

			$('.ui-dialog-buttonpane')
    				.find('button:contains("Like")')
    				.removeClass('ui-button-text-only')
    				.addClass('ui-button-icon-only')
    				.prepend('<span class="ui-icon ui-icon-plus"></span>');

			$('.ui-dialog-buttonpane')
    				.find('button:contains("Dislike")')
    				.removeClass('ui-button-text-only')
   				.addClass('ui-button-icon-only')
    				.prepend('<span class="ui-icon ui-icon-minus"></span>');

 			$('.ui-dialog-buttonpane')
    				.find('button:contains("Respam")')
    				.removeClass('ui-button-text-only')
    				.addClass('ui-button-icon-only')
    				.prepend('<span class="ui-icon ui-icon-refresh"></span>');

			$('.ui-dialog-buttonpane')
    				.find('button:contains("Reply")')
    				.removeClass('ui-button-text-only')
    				.addClass('ui-button-icon-only')
    				.prepend('<span class="ui-icon ui-icon-arrowreturnthick-1-w"></span>');
    }
  });
  }

    // Accordion
    $("#accordion").accordion({ header: "h3"});
    $("#accordion1").accordion({ header: "h3"});

    // Tabs
    $('#tabs').tabs();

    // Dialog			
    $('#finestraContatti').dialog({
        modal: true,
        autoOpen: false,
        position: [450, 120],
        width: 600,
        height:600,
        buttons: {
            "Ok": function() { 
                $(this).dialog("close"); 
            }, 
        }
    });

    // Dialog			
    $('#finestraGetServer').dialog({
        autoOpen: false,
        position: [250, 150],
        width: 200,
        buttons: {
            "Ok": function() { 
                $(this).dialog("close"); 
            }, 
        }
    });

        // Dialog			
        $('#finestrainvio').dialog({
            width: 300,
            modal: false,
	    resizable: false,
	    position : "center",
            buttons: {
                    "Invio":  function() {
                             sendPost($('.myTextAreainvio').val());
                                   $('.myTextAreainvio').val("");
                    },
            }
        });
        
        // Dialog Link
        $('#dialog').click(function(){
            $('#finestraContatti').dialog('open');
            return false;
        });
        
        // Dialog Link
        $('#prova').click(function(){
            $('#finestraGetServer').dialog('open');
            return false;
        });

        // Datepicker
        $('#datepicker').datepicker({
            inline: true
        });
        
        // Slider
        $('#slider').slider({
            range: true,
            values: [17, 67]
        });
        
        // Progressbar
        $("#progressbar").progressbar({
            value: 20 
        });
        
        //hover states on the static widgets
        $('#dialog_link, ul#icons li').hover(
            function() { $(this).addClass('ui-state-hover'); }, 
            function() { $(this).removeClass('ui-state-hover'); }
        );
});

function openReplyWindow(param){
    $( "#dialog-modal").dialog({
        autoOpen: false,
        width: 300,
        modal: true,
        buttons:{"Invio": function(){
                replyPost($('.myTextArea').val(),param);
                $("#dialog-modal").dialog("close");
            },
        }
    });
    
    $("#dialog-modal").html('<textarea id="articolo" class="myTextArea" cols=42 rows=3> </textarea>');

    
    $("#dialog-modal").dialog("open");

}

