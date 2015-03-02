<?php
            
    $userid = $_GET['userID'];
    $postid = $_GET['postID'];

    if($userid!="" && $postid!=""){

        $contentlike = 0;
        $contentdislike = 0;
        $userlike = 0;
        
        if(file_exists("../data/setlike/ltw1120/".$userid."/".$postid.".xml")){

            $doclike = new DOMDocument();
            $doclike->loadXML(file_get_contents("../data/setlike/ltw1120/".$userid."/".$postid.".xml"));
                        
            $likeElements = $doclike->getElementsByTagName("setlike");

            if($likeElements->length>0){
                $index=0;
                for($index=0;$index<$likeElements->length;$index++){

                    if($likeElements->item($index)->getAttribute("userid")==$userid){
                        $userlike = $likeElements->item($index)->getAttribute("value");
                    }
                    
                    if($likeElements->item($index)->getAttribute("value")=="-1"){
                        $contentdislike++;
                    }else if($likeElements->item($index)->getAttribute("value")=="1"){
                        $contentlike++;
                    }
                }
            }
        }
        
        $path = "../data/post/".$userid."/".$postid.".xml";

        $article = file_get_contents($path);

        $doc = new DOMDocument();
        $doc->loadXML($article);
        
        $articleContent =  $doc->getElementsByTagName("article")->item(0);
        
        
        if($articleContent->getAttribute("typeof")=="scioc:reply_of"){
        		$spanReply = $doc->createElement("span");
        		$articleContent->appendChild($spanReply);
        		
        		$spanReply->setAttribute("rel","scioc:reply_of");
        		$spanReply->setAttribute("resource",$articleContent->getAttribute("about"));
        }
        
        if($articleContent->getAttribute("typeof")=="tweb:respamOf"){
        		$spanRespam = $doc->createElement("span");
        		$articleContent->appendChild($spanRespam);
        		
                $spanRespam->setAttribute("rel","tweb:respamOf");
        		$spanRespam->setAttribute("resource",$articleContent->getAttribute("about"));
        }
        
        $doc->getElementsByTagName("article")->item(0)->setAttribute("about","/ltw1120/".$userid."/".$postid);
        
        $spanTag = $doc->getElementsByTagName("span");
	
		  $existTag=0;
        
        for($index=$spanTag->length-1;$index>0;$index--){
        		if($spanTag->item($index)->getAttribute("property")=="tweb:countDislike"){
					$spanTag->item($index)->setAttribute("content",$contentdislike);
					$existTag=1;
					
        		}else if($spanTag->item($index)->getAttribute("property")=="tweb:countlike"){
					$spanTag->item($index)->setAttribute("content",$contentlike);
					$existTag=1;
					
        		}if($spanTag->item($index)->getAttribute("rev")=="tweb:dislike" || $spanTag->item($index)->getAttribute("rev")=="tweb:like" || $spanTag->item($index)->getAttribute("rev")=="tweb:neutral"){
					if($userlike==-1){
         		   $spanTag->item($index)->setAttribute("rev","tweb:dislike");
       		  }else if($userlike==1){
         		   $spanTag->item($index)->setAttribute("rev","tweb:like");
        		  }else{
            		$spanTag->item($index)->setAttribute("rev","tweb:neutral");
        		  }
        		  
        		   $spanTag->item($index)->setAttribute("resource","/ltw1120/".$userid."/".$postid);
					$existTag=1;
					
        		}
        }

        if($existTag=="scioc:reply_of"){
        
              $spanrev = $doc->createElement("span");
      		  $articleContent->appendChild($spanrev);
        
   		     if($userlike==-1){
         		   $spanrev->setAttribute("rev","tweb:dislike");
       		  }else if($userlike==1){
         		   $spanrev->setAttribute("rev","tweb:like");
        		  }else{
            		$spanrev->setAttribute("rev","tweb:neutral");
        		  }

     			  $spanrev->setAttribute("resource","/ltw1120/".$userid);

     			  $spanlike = $doc->createElement("span");
     		     $articleContent->appendChild($spanlike);

      		  $spanlike->setAttribute("property","tweb:countLike");
      		  $spanlike->setAttribute("content",$contentlike);

   		     $spandislike = $doc->createElement("span");
   		     $articleContent->appendChild($spandislike);
        
		        $spandislike->setAttribute("property","tweb:countDislike");
		        $spandislike->setAttribute("content",$contentdislike);
        }
        
        $article = $doc->saveXML();
        
        echo utf8_encode($article);
    }
?>
