<?php
    $username = $_POST['username'];
    
    $serverid = $_POST['serverID'];
    $userid = $_POST['userID'];
    $postid = $_POST['postID'];
    $value = $_POST['value'];
   
    
    if($serverid!="" && $userid!="" && $postid!="" && $value!=""){

        $path = "../data/setlike/".$serverid."/".$userid;
            
        if(!is_dir($path)){
            if(!is_dir("../data/setlike/".$serverid)){
                mkdir("../data/setlike/".$serverid,0755);
            }
            mkdir($path,0755);
        }

        $filePath = $path."/".$postid.".xml";

        $doc = new DOMDocument('1.0');

        if(file_exists($filePath)){

            $doc->load($filePath);

            $elemlist = $doc->getElementsByTagName("setlike");

            $flag=0;

            for ($index=0;$index<$elemlist->length;$index++){
               if($elemlist->item($index)->getAttribute("serverid")==$serverid && $elemlist->item($index)->getAttribute("userid")==$userid && $elemlist->item($index)->getAttribute("postid")==$postid){
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
                $likeelem->setAttribute("postid",$postid);
                $likeelem->setAttribute("value",$value);  
            }

            $doc->formatOutput=TRUE;
            $doc->save($filePath); 
            
        }else{
            
            $rootelem = $doc->createElement("setlikes");
            $doc->appendChild($rootelem);
            $likeelem = $doc->createElement("setlike");
            $rootelem->appendChild($likeelem);
            $likeelem->setAttribute("serverid",$serverid);
            $likeelem->setAttribute("userid",$userid);
            $likeelem->setAttribute("postid",$postid);
            $likeelem->setAttribute("value",$value);
            $doc->formatOutput=TRUE;
            $doc->save($filePath);
        }

        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,"http://".$serverid.".web.cs.unibo.it/propagatelike");
        curl_setopt($ch,CURLOPT_POST,1);
        curl_setopt($ch,CURLOPT_POSTFIELDS,"serverID1=ltw1120&userID1=".$username."&value=".$value."&serverID2=".$serverid."&userID2=".$userid."&postID2=".$postid);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_exec($ch);
        curl_close($ch);        
        
        chmod($filePath,0755);
    }
?>
