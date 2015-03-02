<?php

    $username = $_POST['username'];
    $article = $_POST['article'];

    $article = utf8_encode($article);

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
    
    $article = stripslashes($article);
    
    $doc= new DomDocument('1.0','utf-8');

    $doc->loadXML($article);
    $doc->preserveWhiteSpace = false;
    $doc->formatOutput=true;
    
    $elem =$doc->getElementsByTagName("article")->item(0);
    $elem->setAttribute("prefix","sioc: http://rdfs.org/sioc/ns# ctag: http://commontag.org/ns# skos: http://www.w3.org/2004/02/skos/core# dcterms: http://purl.org/dc/terms/ tweb: http://vitali.web.cs.unibo.it/vocabulary/");

    $elem->setAttribute("about","/ltw1120/".$username."/".$lastFile);
    $elem->setAttribute("typeof","sioc:Post");
    $elem->setAttribute("rel","sioc:has_creator");
    $elem->setAttribute("resource","/ltw1120/".$username);
    $elem->setAttribute("property","dcterms:created");
    $elem->setAttribute("content",date("c",filemtime($path)));

    $filePath = $path."/".$lastFile.".xml";
    if($doc->save($filePath)!=""){
    }
    chmod($filePath,0755);
?>
