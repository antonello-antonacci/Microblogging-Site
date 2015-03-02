<?php
    $limit=$_GET["limit"];
    $type=$_GET["type"];
    $serverid=$_GET["serverID"];
    $userid=$_GET["userID"];
    $postid=$_GET["postID"];
    $term=$_GET["term"];
    $string=$_GET["string"];
    $username=$_GET["username"];

    switch($type){
        case "author":
            $url = "http://".$serverid.".web.cs.unibo.it/searchserver/".$limit."/author/".$serverid."/".$userid;
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $response = curl_exec($ch);
            curl_close($ch);
            echo $response;
            break;
        case "following":
            $path = "../data/users/".$username."/followusers.xml";

            $doc = new DOMDocument();
            $doc->load($path);
            $users = $doc->getElementsByTagName("user");

            $response ="<tmpTag>";

            for($index=0;$index<$users->length;$index++){
                $user = $users->item($index)->getAttribute("id");
                $server = $users->item($index)->getAttribute("serverid");

                $url = "http://".$server.".web.cs.unibo.it/searchserver/".$limit."/author/".$server."/".$user;

                $ch = curl_init();
                curl_setopt($ch,CURLOPT_URL,$url);
                curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

                $tempResponse = curl_exec($ch);

                if(strpos($tempResponse,"archive")!=0){
                    $tempResponse = str_replace('<?xml version="1.0" encoding="utf-8"?>',"",$tempResponse);
                    $tempResponse = str_replace('<?xml version="1.0"?>',"",$tempResponse);
                    $tempResponse = str_replace('<?xml version="1.0" ?>',"",$tempResponse);

                    $response = $response.$tempResponse;
                }
                curl_close($ch);
            }
            $response = $response."</tmpTag>";
            
            $responseDoc = new DOMDocument();
            $responseDoc->loadXML($response);

            $finalDoc = new DOMDocument();
            $finalArchive = $finalDoc->createElement("archive");
            $finalDoc->appendChild($finalArchive);

            $posts = $responseDoc->getElementsByTagName("post");
            $newlimit=0;

            if($posts->length<$limit){
                $newlimit=$posts->length;
            }else{
                $newlimit=$limit;
            }
            while($newlimit>0){
                $pos=0;
                $minDate = $posts->item($pos)->getElementsByTagName("article")->item(0)->getAttribute("content");
                $tmplength = 0;
                while($tmplength<$posts->length){
                    if($posts->item($tmplength)->getElementsByTagName("article")->item(0)->getAttribute("content")>$minDate){
                        $pos=$tmplength;
                        $minDate=$posts->item($tmplength)->getElementsByTagName("article")->item(0)->getAttribute("content");
                    }
                    $tmplength++;
                }
                $postNode = $finalDoc->importNode($posts->item($pos),true);
                $finalArchive->appendChild($postNode);
                $posts->item($pos)->parentNode->removeChild($posts->item($pos));
                $newlimit--;
            } 
            echo $finalDoc->saveXML();

            break;
        case "recent":
            $doc = new DOMDocument();

            $doc->load("../data/users/".$username."/customservers.xml");
            $users = $doc->getElementsByTagName("server");
            
            $serverlist = array();

            for($index=0;$index<$users->length;$index++){
                $server = $users->item($index)->getAttribute("serverID");
                    array_push($serverlist,$server);
            }
            
            $response ="<tmpTag>";

            for($index=0;$index<count($serverlist);$index++){
                $url = "http://".$serverlist[$index].".web.cs.unibo.it/searchserver/".$limit."/recent/".$term;
    
                $ch = curl_init();
                curl_setopt($ch,CURLOPT_URL,$url);
                curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
                $tempResponse = curl_exec($ch);

                if(strpos($tempResponse,"archive")!=0){

                    $tempResponse = str_replace('<?xml version="1.0" encoding="utf-8"?>',"",$tempResponse);
                    $tempResponse = str_replace('<?xml version="1.0"?>',"",$tempResponse);
                    $tempResponse = str_replace('<?xml version="1.0" ?>',"",$tempResponse);

                    $response = $response.$tempResponse;
                }
                curl_close($ch);
            }

            $response = $response."</tmpTag>";

            $responseDoc = new DOMDocument();
            $responseDoc->loadXML($response);

            $finalDoc = new DOMDocument();
            $finalArchive = $finalDoc->createElement("archive");
            $finalDoc->appendChild($finalArchive);

            $posts = $responseDoc->getElementsByTagName("article");
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
            echo $finalDoc->saveXML();
            
            break;
                
        case "related":
            $doc = new DOMDocument();
            
            $doc->load("../data/users/".$username."/customservers.xml");
            $users = $doc->getElementsByTagName("server");
            
            $serverlist = array();
            
            for($index=0;$index<$users->length;$index++){
                $server = $users->item($index)->getAttribute("serverID");
                array_push($serverlist,$server);
            }
            
            $response ="<tmpTag>";
            
            for($index=0;$index<count($serverlist);$index++){
                $url = "http://".$serverlist[$index].".web.cs.unibo.it/searchserver/".$limit."/related/".$term;
                $ch = curl_init();
                curl_setopt($ch,CURLOPT_URL,$url);
                curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
                $tempResponse = curl_exec($ch);
                
                if(strpos($tempResponse,"archive")!=0){
                    $tempResponse = str_replace('<?xml version="1.0" encoding="utf-8"?>',"",$tempResponse);
                    $tempResponse = str_replace('<?xml version="1.0"?>',"",$tempResponse);
                    $tempResponse = str_replace('<?xml version="1.0" ?>',"",$tempResponse);


                    $response = $response.$tempResponse;
                }
                curl_close($ch);
            }
            
            $response = $response."</tmpTag>";            
            
            $responseDoc = new DOMDocument();
            $responseDoc->loadXML($response);
            
            $finalDoc = new DOMDocument();
            $finalArchive = $finalDoc->createElement("archive");
            $finalDoc->appendChild($finalArchive);
            
            $posts = $responseDoc->getElementsByTagName("article");
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
            echo $finalDoc->saveXML();

            break;
        case "fulltext":
            $doc = new DOMDocument();
            $doc->load("../data/users/".$username."/customservers.xml");
            $users = $doc->getElementsByTagName("server");
            
            $serverlist = array();
            
            for($index=0;$index<$users->length;$index++){
                $server = $users->item($index)->getAttribute("serverID");
                array_push($serverlist,$server);
            }
                        
            $response ="<tmpTag>";
            
            for($index=0;$index<count($serverlist);$index++){
                $url = "http://".$serverlist[$index].".web.cs.unibo.it/searchserver/".$limit."/fulltext/".$string;
                
                $ch = curl_init();
                curl_setopt($ch,CURLOPT_URL,$url);
                curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
                $tempResponse = curl_exec($ch);
                                
                if(strpos($tempResponse,"archive")!=0){
                    
                    $tempResponse = str_replace('<?xml version="1.0" encoding="utf-8"?>',"",$tempResponse);
                    $tempResponse = str_replace('<?xml version="1.0"?>',"",$tempResponse);
                    $tempResponse = str_replace('<?xml version="1.0" ?>',"",$tempResponse);

                    $response = $response.$tempResponse;
                }
                
                curl_close($ch);
            }
            
            $response = $response."</tmpTag>";

echo $response;

                                    
            $responseDoc = new DOMDocument();
            $responseDoc->loadXML($response);
            
            $finalDoc = new DOMDocument();
            $finalArchive = $finalDoc->createElement("archive");
            $finalDoc->appendChild($finalArchive);

            $posts = $responseDoc->getElementsByTagName("article");
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
         //   echo $finalDoc->saveXML();
                                                
                break;
        case "affinity":

            $doc = new DOMDocument();

            $doc->load("../data/users/".$username."/customservers.xml");
            $users = $doc->getElementsByTagName("server");

            $serverlist = array();

            for($index=0;$index<$users->length;$index++){
                $server = $users->item($index)->getAttribute("serverID");
                    array_push($serverlist,$server);
            }

            $response ="<tmpTag>";

            for($index=0;$index<count($serverlist);$index++){
                $url = "http://".$serverlist[$index].".web.cs.unibo.it/searchserver/".$limit."/affinity/".$serverid."/".$userid."/".$postid."/5/2";
                                
                $ch = curl_init();
                curl_setopt($ch,CURLOPT_URL,$url);
                curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
                $tempResponse = curl_exec($ch);
                

                if(strpos($tempResponse,"archive")>0){

                    $tempResponse = str_replace('<?xml version="1.0" encoding="utf-8"?>',"",$tempResponse);
                    $tempResponse = str_replace('<?xml version="1.0"?>',"",$tempResponse);
                    $tempResponse = str_replace('<?xml version="1.0" ?>',"",$tempResponse);

                    $response = $response.$tempResponse;
                }
                
                curl_close($ch);
            }

            $response = $response."</tmpTag>";

            $responseDoc = new DOMDocument();
            $responseDoc->loadXML($response);
            
            $finalDoc = new DOMDocument();
            $finalArchive = $finalDoc->createElement("archive");
            $finalDoc->appendChild($finalArchive);
            
            $posts = $responseDoc->getElementsByTagName("article");
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
            echo $finalDoc->saveXML();

            break;
        }
    
    
?>