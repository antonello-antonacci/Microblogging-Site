<?php
    $username = $_POST['username'];
    $serverid = $_POST['serverID'];
    $userid = $_POST['userID'];
    $postid = $_POST['postID'];
    $article = $_POST['article'];
                
    if($serverid!="" && $userid!="" && $postid!="" && $article!=""){
        $path = "../data/post/".$username;

        if(!is_dir($path)){
            mkdir($path,0755);
        }
        
        $files = scandir($path);
        $lastFile=0;

        for($index=0;$index<count($files);$index++){
            if((int)str_replace(".xml","",$files[$index])>$lastFile){
                $lastFile = (int)str_replace(".xml","",$files[$index]);
            }
        }

        $lastFile++;

        $doc= new DomDocument('1.0','utf-8');
        
        $doc->loadXML($article);
        $elem =$doc->getElementsByTagName("article")->item(0);
        $elem->setAttribute("prefix","sioc: http://rdfs.org/sioc/ns# ctag: http://commontag.org/ns# skos: http://www.w3.org/2004/02/skos/core# dcterms: http://purl.org/dc/terms/ tweb: http://vitali.web.cs.unibo.it/vocabulary/");
        
        $elem->setAttribute("about","/".$serverid."/".$userid."/".$postid);
        $elem->setAttribute("typeof","sioc:reply_of");
        $elem->setAttribute("rel","sioc:has_creator");
        $elem->setAttribute("resource","/ltw1120/".$username);
        $elem->setAttribute("property","dcterms:created");
        $elem->setAttribute("content",date(c,filemtime($path)));
        $doc->formatOutput=TRUE;
        $filePath = $path."/".$lastFile.".xml";   
        $doc->save($filePath);
        chmod($filePath,0755);        
        
        $url = "http://".$serverid.".web.cs.unibo.it/hasreply";
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_POST,1);
        curl_setopt($ch,CURLOPT_POSTFIELDS,"serverID=ltw1120&userID=".$username."&postID=".$lastFile."&userID2Up=".$userid."&postID2Up=".$postid);
        curl_exec($ch);
        curl_close($ch);
    }
    
?>