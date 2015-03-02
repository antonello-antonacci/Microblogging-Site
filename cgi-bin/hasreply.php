<?php
    $serverid = $_POST["serverID"];
    $userid = $_POST["userID"];
    $postid = $_POST["postID"];
    $userID2Up = $_POST["userID2Up"];
    $postID2Up = $_POST["postID2Up"];
    
    $doc = new DOMDocument();
    $path = "../data/post/".$userID2Up."/".$postID2Up.".xml";

    $doc->load($path);
    $elem = $doc->getElementsByTagName("article")->item(0);
    $span = $doc->createElement("span");
    $elem->appendChild($span);
    $span->setAttribute("rel","sioc:has_reply");
    $span->setAttribute("resource","/".$serverid."/".$userid."/".$postid);
    
    $doc->save("../data/post/".$userID2Up."/".$postID2Up.".xml");
?>