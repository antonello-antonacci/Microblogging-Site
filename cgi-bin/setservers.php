<?php    

    $servers = $_POST['servers'];
    $username = $_POST['username'];
    
//    $servers = stripslashes($servers);
    
    $serverlist = "../data/users/".$username."/customservers.xml";

    $userDoclist = new DOMDocument();
    $userDoclist->loadXML($servers);
        
    $doclist = new DOMDocument()
    $doclist->loadXML($serverlist);

    $fulllist = $doclist->getElementsByTagName("server");
    $newServer = $userDoclist->getElementsByTagName("server")->item(0);
    
    $trovato=0;
    
    for($index=0;$index<$fulllist->length;$index++){
        if($newServer->getAttribute("serverID")==$fulllist->item($index)->getAttribute("serverID")){
            $trovato=1;
        }
    }
    
    if($trovato==0){
        $servers = $doclist->getElementsByTagName("servers");
        $new = $docList->createElement("server");
        $servers->appendChild($new);
        $new->setAttribute("serverID",$newServer->getAttribute("serverID"));
        $doclist->saveXML();
    }
    
    
?>
