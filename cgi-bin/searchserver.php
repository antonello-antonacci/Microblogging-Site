<?php
    
    $limit=$_GET["limit"];
    $type=$_GET["type"];
    $serverid=$_GET["serverID"];
    $userid=$_GET["userID"];
    $postid=$_GET["postID"];
    $term=$_GET["term"];
    $string=$_GET["string"];
    $k = $_GET["k"];
    $j = $_GET["j"];

    $response="";

    switch($type){
        case "author":
            $path = "../data/post/".$userid."/";
            $files = scandir($path);

            $doc= new DomDocument();
            $archive = $doc->createElement("archive");
            $doc->appendChild($archive);

            if(count($files)>0){
                $lastFile=0;
                for($index=0;$index<count($files);$index++){
                    if((int)str_replace(".xml","",$files[$index])>$lastFile){
                        $lastFile = (int)str_replace(".xml","",$files[$index]);
                    }
                }

                while($index>0 && $lastFile>0 && $found<$limit){

                    $post = postRequest($userid,$lastFile);

                    $postDoc= new DomDocument();
                    $postDoc->loadXML($post);

                    $postTag =$doc->createElement("post");
                    $archive->appendChild($postTag);
                    $contentDoc = $doc->createElement("content");
                    $postTag->appendChild($contentDoc);
                    $contentDoc->nodeValue = "text/html charset=UTF8";

                    $postTag->appendChild($doc->importNode($postDoc->documentElement,true));	                        

                    $found++;
                    $lastFile--;
                    $index--;
                }
            }

            echo utf8_encode($doc->saveXML());

                break;
        case "recent":
            $docUser = new DOMDocument();
            $docUser->load("../data/users/users.xml");
            $users = $docUser->getElementsByTagName("user");

            $doc= new DomDocument('1.0','utf-8');
            $archive = $doc->createElement("archive");
            $doc->appendChild($archive);

            for($index=0;$index<$users->length;$index++){
                $user = $users->item($index)->getAttribute("name");
                $path = "../data/post/".$user."/";
                $lastFile=0;
                $files = scandir($path);

                for($index1=0;$index1<count($files);$index1++){
                    if((int)str_replace(".xml","",$files[$index1])>$lastFile){
                        $lastFile = (int)str_replace(".xml","",$files[$index1]);
                    }
                }
                for($index3=$lastFile;$index3>0;$index3--){
                    $post = postRequest($user,$index3);

                    $postDoc= new DomDocument();
                    $postDoc->loadXML($post);

                    if(strstr($postDoc->getElementsByTagName("article")->item(0)->nodeValue,$term) !=false){
                        $postTag =$doc->createElement("post");
                        $archive->appendChild($postTag);
                        $contentDoc = $doc->createElement("content");
                        $postTag->appendChild($contentDoc);
                        $contentDoc->nodeValue = "text/html charset=UTF8";

                        $postTag->appendChild($doc->importNode($postDoc->documentElement,true));	                        
                    }
                }
            }

            $finalDoc = new DOMDocument();
            $finalArchive = $finalDoc->createElement("archive");
            $finalDoc->appendChild($finalArchive);

            $posts = $doc->getElementsByTagName("article");
            $newlimit=0;

            if($posts->length<$limit){
                $newlimit=$posts->length;
            }else{
                $newlimit=$limit;
            }

            while($newlimit>0){
                $pos=0;
                $minDate = $posts->item($pos)->getAttribute("content");
                $tmplength = 0;

                while($tmplength<$posts->length){
                    
                    if($posts->item($tmplength)->getAttribute("content")>$minDate){
                        $pos=$tmplength;
                        $minDate=$posts->item($tmplength)->getAttribute("content");
                    }
                    $tmplength++;
                }

                $postTag =$finalDoc->createElement("post");
                $finalArchive->appendChild($postTag);
                $contentDoc = $finalDoc->createElement("content");
                $postTag->appendChild($contentDoc);
                $contentDoc->nodeValue = "text/html charset=UTF8";
                
                $articleNode = $finalDoc->importNode($posts->item($pos),true);
                $postTag->appendChild($articleNode);
                $posts->item($pos)->parentNode->removeChild($posts->item($pos));
                $newlimit--;
            }
            echo utf8_encode($finalDoc->saveXML());
            
            break;
            
        case "related":
            $docUser = new DOMDocument();
            $docUser->load("../data/users/users.xml");
            $users = $docUser->getElementsByTagName("user");
            
            $doc= new DomDocument('1.0','utf-8');
            $archive = $doc->createElement("archive");
            $doc->appendChild($archive);

            $docThes = new DOMDocument();
            $docThes->load("../data/tesauro.xml");
            $nodi = $docThes->getElementsByTagName("prefLabel");
            $parentTerm="";
            
            for($index=0;$index<$nodi->length;$index++){                
                if($term==$nodi->item($index)->nodeValue){
                    $parentTerm= $nodi->item($index)->parentNode->getElementsByTagName("broader")->item(0)->attributes->item(0)->value;
                }
            }
          
            for($index=0;$index<$users->length;$index++){
                $user = $users->item($index)->getAttribute("name");
                $path = "../data/post/".$user."/";
                $lastFile=0;
                $files = scandir($path);
                
                for($index1=0;$index1<count($files);$index1++){
                    if((int)str_replace(".xml","",$files[$index1])>$lastFile){
                        $lastFile = (int)str_replace(".xml","",$files[$index1]);
                    }
                }
                for($index3=$lastFile;$index3>0;$index3--){
                    $post = postRequest($user,$index3);
                    
                    $postDoc= new DomDocument();
                    $postDoc->loadXML($post);

                    if(strpos($post,$term)!=false){
                        $postTag =$doc->createElement("post");
                        $archive->appendChild($postTag);
                        $contentDoc = $doc->createElement("content");
                        $postTag->appendChild($contentDoc);
                        $contentDoc->nodeValue = "text/html charset=UTF8";
                        $postTag->appendChild($doc->importNode($postDoc->documentElement,true));	                        
                    }else if(strpos($post,$parentTerm)!=false){
                        $postTag =$doc->createElement("post");
                        $archive->appendChild($postTag);
                        $contentDoc = $doc->createElement("content");
                        $postTag->appendChild($contentDoc);
                        $contentDoc->nodeValue = "text/html charset=UTF8";
                        $postTag->appendChild($doc->importNode($postDoc->documentElement,true));
                    }
                }
            }
            
            $finalDoc = new DOMDocument();
            $finalArchive = $finalDoc->createElement("archive");
            $finalDoc->appendChild($finalArchive);
            
            $posts = $doc->getElementsByTagName("article");
            $newlimit=0;
            
            if($posts->length<$limit){
                $newlimit=$posts->length;
            }else{
                $newlimit=$limit;
            }
            
            while($newlimit>0){
                $pos=0;
                $minDate = $posts->item($pos)->getAttribute("content");
                $tmplength = 0;
                
                while($tmplength<$posts->length){
                    
                    if($posts->item($tmplength)->getAttribute("content")>$minDate){
                        $pos=$tmplength;
                        $minDate=$posts->item($tmplength)->getAttribute("content");
                    }
                    $tmplength++;
                }
                
                $postTag =$finalDoc->createElement("post");
                $finalArchive->appendChild($postTag);
                $contentDoc = $finalDoc->createElement("content");
                $postTag->appendChild($contentDoc);
                $contentDoc->nodeValue = "text/html charset=UTF8";
                
                $articleNode = $finalDoc->importNode($posts->item($pos),true);
                $postTag->appendChild($articleNode);
                $posts->item($pos)->parentNode->removeChild($posts->item($pos));
                $newlimit--;
            }
            echo utf8_encode($finalDoc->saveXML());
            
            break;
            
        case "fulltext":
            $docUser = new DOMDocument();
            $docUser->load("../data/users/users.xml");
            $users = $docUser->getElementsByTagName("user");
            
            $doc= new DomDocument('1.0','utf-8');
            $archive = $doc->createElement("archive");
            $doc->appendChild($archive);
            
            for($index=0;$index<$users->length;$index++){
                $user = $users->item($index)->getAttribute("name");
                $path = "../data/post/".$user."/";
                $lastFile=0;
                $files = scandir($path);
                
                for($index1=0;$index1<count($files);$index1++){
                    if((int)str_replace(".xml","",$files[$index1])>$lastFile){
                        $lastFile = (int)str_replace(".xml","",$files[$index1]);
                    }
                }
                for($index3=$lastFile;$index3>0;$index3--){
                    $post = postRequest($user,$index3);
                    
                    $postDoc= new DomDocument();
                    $postDoc->loadXML($post);
                    
                    if(strpos($postDoc->getElementsByTagName("article")->item(0)->nodeValue,$string) !=false){

                        $postTag =$doc->createElement("post");
                        $archive->appendChild($postTag);
                        $contentDoc = $doc->createElement("content");
                        $postTag->appendChild($contentDoc);
                        $contentDoc->nodeValue = "text/html charset=UTF8";
                        
                        $postTag->appendChild($doc->importNode($postDoc->documentElement,true));	                        
                    }
                }
            }
            
            $finalDoc = new DOMDocument();
            $finalArchive = $finalDoc->createElement("archive");
            $finalDoc->appendChild($finalArchive);
            
            $posts = $doc->getElementsByTagName("article");
            $newlimit=0;
            
            if($posts->length<$limit){
                $newlimit=$posts->length;
            }else{
                $newlimit=$limit;
            }
            
            while($newlimit>0){
                $pos=0;
                $minDate = $posts->item($pos)->getAttribute("content");
                $tmplength = 0;
                
                while($tmplength<$posts->length){
                    
                    if($posts->item($tmplength)->getAttribute("content")>$minDate){
                        $pos=$tmplength;
                        $minDate=$posts->item($tmplength)->getAttribute("content");
                    }
                    $tmplength++;
                }
                
                $postTag =$finalDoc->createElement("post");
                $finalArchive->appendChild($postTag);
                $contentDoc = $finalDoc->createElement("content");
                $postTag->appendChild($contentDoc);
                $contentDoc->nodeValue = "text/html charset=UTF8";
                
                $articleNode = $finalDoc->importNode($posts->item($pos),true);
                $postTag->appendChild($articleNode);
                $posts->item($pos)->parentNode->removeChild($posts->item($pos));
                $newlimit--;
            }
            
            echo utf8_encode($finalDoc->saveXML());

            break;
            case "affinity":

            $docUser = new DOMDocument();
            $docUser->load("../data/users/users.xml");
            $users = $docUser->getElementsByTagName("user");

            $doc= new DomDocument('1.0','utf-8');
            $archive = $doc->createElement("archive");
            $doc->appendChild($archive);

            $originalPost = postRequest($userid,$postid);

            $originalDoc= new DOMDocument();
            $originalDoc->loadXML($originalPost);

            $originalDate = $originalDoc->getElementsByTagName("article")->item(0)->getAttribute("content");

            $originalSpanlist =$originalDoc->getElementsByTagName("span");

            $originalTheslist = array();

            for($index=0;$index<$originalSpanlist->length;$index++){
                if($originalSpanlist->item($index)->getAttribute("about")){
                    array_push($originalTheslist,$originalSpanlist->item($index)->getAttribute("about"));
                }
            }

            for($index=0;$index<$users->length;$index++){
                                
                $user = $users->item($index)->getAttribute("name");
                $path = "../data/post/".$user."/";
                $lastFile=0;
                $files = scandir($path);
                
                for($index1=0;$index1<count($files);$index1++){
                    if((int)str_replace(".xml","",$files[$index1])>$lastFile){
                        $lastFile = (int)str_replace(".xml","",$files[$index1]);
                    }
                }
                
                for($index3=$lastFile;$index3>0;$index3--){
                                        
                    $post = postRequest($user,$index3);

                    $postDoc= new DomDocument();
                    $postDoc->loadXML($post);

                    $postTag =$doc->createElement("post");
                    $archive->appendChild($postTag);
                    $contentDoc = $doc->createElement("content");
                    $postTag->appendChild($contentDoc);
                    $contentDoc->nodeValue = "text/html charset=UTF8";
                    $affinityDoc = $doc->createElement("affinity");
                    $postTag->appendChild($affinityDoc);
                    
                    $affinityDate =  $postDoc->getElementsByTagName("article")->item(0)->getAttribute("content");
                    
                    $affinitySpanlist =$postDoc->getElementsByTagName("span");
                    
                    $affinitylikeSum = $affinitySpanlist->item($affinitySpanlist->length-2)->getAttribute("content")-$affinitySpanlist->item($affinitySpanlist->length-1)->getAttribute("content");
                    
                    $affinityTheslist = array();
                    
                    for($index4=0;$index4<$affinitySpanlist->length;$index4++){
                        
                        if($affinitySpanlist->item($index)->getAttribute("about")){
                            array_push($affinityTheslist,$affinitySpanlist->item($index)->getAttribute("about"));
                        }
                    }
                                        
                    $originalDiv = explode("T", $originalDate);
                    
                    $originalDay = explode("-",$originalDiv[0]);
                    $originalHours= explode(":",$originalDiv[1]);

                    $affinityDiv = explode("T", $affinityDate);
                    
                    $affinityDay = explode("-",$affinityDiv[0]);
                    $affinityHours= explode(":",$affinityDiv[1]);
                    
                    $date_diff = mktime($originalHours[0], $originalHours[1], $originalHours[2], $originalDay[1], $originalDay[2], $originalDay[0]) - mktime($affinityHours[0], $affinityHours[1], $affinityHours[2], $affinityDay[1], $affinityDay[2], $affinityDay[0]);
                    $date_diff  = floor((($date_diff / 60 / 60 / 24)*86400)/1000);
                    
                    $sameHash=0;
                                        
                    for($index5=0;$index5<count($originalTheslist);$index5++){
                                                
                        for($index6=0;$index6<count($affinityTheslist);$index6++){
                                                        
                            if($originalTheslist[$index5]==$affinityTheslist[$index6]){
                                
                
                                $sameHash++;
                            }
                        }
                    }
                    
                    if($affinitylikeSum==0){
                        $affinitylikeSum=1;
                    }
                                        
                    $affinity = ($k * $date_diff + $j* $sameHash) * $affinitylikeSum;

                    $affinityDoc->nodeValue = $affinity;
                                                            
                    $postTag->appendChild($doc->importNode($postDoc->documentElement,true));	                        
                }
            }

            $finalDoc = new DOMDocument();
            $finalArchive = $finalDoc->createElement("archive");
            $finalDoc->appendChild($finalArchive);
                        
            $posts = $doc->getElementsByTagName("post");
            $newlimit=0;
            
            if($posts->length<$limit){
                $newlimit=$posts->length;
            }else{
                $newlimit=$limit;
            }

            while($newlimit>0){
                $pos=0;
                $minDate = $posts->item($pos)->getElementsByTagName("affinity")->nodeValue;
                                
                $tmplength = 0;
                
                while($tmplength<$posts->length){
                    
                    if($posts->item($tmplength)->getElementsByTagName("affinity")->nodeValue>$minDate){
                        $pos=$tmplength;
                        $minDate=$posts->item($tmplength)->getElementsByTagName("affinity")->nodeValue;
                    }
                    $tmplength++;
                }
                
                $articleNode = $finalDoc->importNode($posts->item($pos),true);
                $finalArchive->appendChild($articleNode);
                $posts->item($pos)->parentNode->removeChild($posts->item($pos));
                $newlimit--;
            }
            
            echo utf8_encode($finalDoc->saveXML());

            break;
        }
    
    
    
    function postRequest($user,$post){
        
        $contentlike = 0;
        $contentdislike = 0;
        $userlike = 0;
        
        if(file_exists("../data/setlike/ltw1120/".$user."/".$post.".xml")){
            
            $doclike = new DOMDocument();
            $doclike->loadXML(file_get_contents("../data/setlike/ltw1120/".$user."/".$post.".xml"));
            
            $likeElements = $doclike->getElementsByTagName("setlike");
            
            if($likeElements->length>0){
                $index=0;
                for($index=0;$index<$likeElements->length;$index++){
                    
                    if($likeElements->item($index)->getAttribute("userid")==$user){
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
        $path = "../data/post/".$user."/".$post.".xml";
        
        $article = file_get_contents($path);

        if(substr($article,0,5)=="<?xml"){
            $article = substr($article,22);
        }
        
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
        
        $doc->getElementsByTagName("article")->item(0)->setAttribute("about","/ltw1120/".$user."/".$post);
        
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
                
                $spanTag->item($index)->setAttribute("resource","/ltw1120/".$user."/".$post);
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
            
            $spanrev->setAttribute("resource","/ltw1120/".$user);
            
            $spanlike = $doc->createElement("span");
            $articleContent->appendChild($spanlike);
            
            $spanlike->setAttribute("property","tweb:countLike");
            $spanlike->setAttribute("content",$contentlike);
            
            $spandislike = $doc->createElement("span");
            $articleContent->appendChild($spandislike);
            
            $spandislike->setAttribute("property","tweb:countDislike");
            $spandislike->setAttribute("content",$contentdislike);
        }
        return $doc->saveXML();
    }
    
?>