<?php    
    $username=$_POST['username'];
    $serverid = $_POST['serverID'];
    $userid = $_POST['userID'];
    $value = $_POST['value'];

    $path = "../data/users/".$username."/followusers.xml";

    echo $path;
        $doc = new DOMDocument('1.0');
        $doc->load($path);
        $root = $doc->getElementsByTagName("users")->item(0);
        
        $users = $doc->getElementsByTagName("user");
        
        if($value==1){
            $trovato=0;
            
            for($index=0;$index<$users->length;$index++){
                if($users->item($index)->getAttribute("id")==$userid){
                    $trovato=1;
                    $index=$users->length;
                }else{
                    $trovato=0;
                }
            }

            if($trovato==0){
                                
                $user = $doc->createElement("user");
                $root->appendChild($user);
                $user->setAttribute("id",$_POST["userID"]);
                $user->setAttribute("serverid",$serverid);
                
                $doc->formatOutput=TRUE;
                $doc->save($path);
            }

        }else if($value==0){

            $trovato=0;
            $pos=0;
            
            for($index=0;$index<$users->length;$index++){
                if($users->item($index)->getAttribute("id")==$userid){
                    $trovato=1;
                    $pos=$index;
                    $index=$users->length;
                }else{
                    $trovato=0;
                }
            }

            if($trovato==1){
                
                $node = $doc->getElementsByTagName("user")->item($pos);
                $node->removeAttribute("id");
                $node->removeAttribute("serverid");
                                
                $node->parentNode->removeChild($node);
                $doc->formatOutput=TRUE;
                $doc->save($path);
            }
    }
?>
