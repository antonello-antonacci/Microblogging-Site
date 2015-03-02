<?php
        
    $username = $_POST['username'];
    $serverid = $_POST['serverID'];
    $userid = $_POST['userID'];
    $postid = $_POST['postID'];

    if($serverid!="" && $userid!="" && $postid!=""){

        $path = "../data/post/".$username;

        if(!is_dir($path)){
            mkdir($path,0755);
        }

        $url = "http://".$serverid.".web.cs.unibo.it/postserver/".$userid."/".$postid;
    
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_HTTP_VERSION,CURL_HTTP_VERSION_1_0);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        $article= curl_exec($ch);
        curl_close($ch);

        $files = scandir($path);
        $lastFile=0;

        for($index=0;$index<count($files);$index++){
            if((int)str_replace(".xml","",$files[$index])>$lastFile){
                $lastFile = (int)str_replace(".xml","",$files[$index]);
            }
        }

        $lastFile++;

        $filePath = $path."/".$lastFile.".xml";

        $doc= new DomDocument('1.0','utf-8');
        $doc->loadXML($article);
        $elem =$doc->getElementsByTagName("article")->item(0);
        $elem->setAttribute("typeof","tweb:respamOf");
//        $elem->setAttribute("rel","sioc:has_creator");
 //       $elem->setAttribute("resource","/ltw1120/".$username);
 //       $elem->setAttribute("property","dcterms:created");
 //       $elem->setAttribute("content",date(c,filemtime($path)));
        $doc->formatOutput=TRUE;
        $filePath = $path."/".$lastFile.".xml";        
        $doc->save($filePath);
        chmod($filePath,0755);
    }
    
?>
