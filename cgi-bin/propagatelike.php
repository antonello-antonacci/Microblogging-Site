<?php
    $serverid = $_POST["serverID1"];
    $userid = $_POST["userID1"];
    $value = $_POST["value"];
    $serverid2 = $_POST["serverID2"];
    $userid2 = $_POST["userID2"];
    $postid2 = $_POST["postID2"];

    $filePath = "../data/setlike/".$userId2."/".$postId2.".xml";

    $doc = new DOMDocument('1.0');

    if(file_exists($filePath)){
        $doc->load($filePath);

        $elemlist = $doc->getElementsByTagName("setlike");

        $flag=0;

        for ($index=0;$index<$elemlist->length;$index++){
            if($elemlist->item($index)->getAttribute("serverid")==$serverid && $elemlist->item($index)->getAttribute("userid")==$userid && $elemlist->item($index)->getAttribute("postid")==$postId2){
                $elemlist->item($index)->setAttribute("value",$value);
                $flag=1;
            }
        }
        
        if($flag==0){
            $rootelem = $doc->getElementsByTagName("setlikes")->item(0);
            $likeelem = $doc->createElement("setlike");
            $rootelem->appendChild($likeelem);
            $likeelem->setAttribute("serverid",$serverid);
            $likeelem->setAttribute("userid",$userid);
            $likeelem->setAttribute("postid",$postid2);
            $likeelem->setAttribute("value",$value);
            $doc->formatOutput=TRUE;
            $doc->save($filePath);   
        }
        
    }else{
        $rootelem = $doc->createElement("setlikes");
        $doc->appendChild($rootelem);
        $likeelem = $doc->createElement("setlike");
        $rootelem->appendChild($likeelem);
        $likeelem->setAttribute("serverid",$serverid);
        $likeelem->setAttribute("userid",$userid);
        $likeelem->setAttribute("postid",$postid2);
        $likeelem->setAttribute("value",$value);
        $doc->formatOutput=TRUE;
        $doc->save($filePath);
    }

?>