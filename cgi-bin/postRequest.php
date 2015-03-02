<?php
        
    $serverid = $_GET['serverID'];
    $userid = $_GET['userID'];
    $postid = $_GET['postID'];
    

    if($serverid!="" && $userid!="" && $postid!=""){

        $url = "http://".$serverid.".web.cs.unibo.it/postserver/".$userid."/".$postid;

        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_HTTP_VERSION,CURL_HTTP_VERSION_1_0);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        $article= curl_exec($ch);
        curl_close($ch);

        echo $article;

    }
    
?>
