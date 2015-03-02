<?php    
    session_start();
    $username = $_POST["username"];
    
    if(IsSet($_POST["username"])){
        $doc = new DOMDocument();
        $doc->load('../data/users/users.xml');
        $listNames = $doc->getElementsByTagName('user');
        
        $index=0;
        $trovato =0;
        
        while($index<$listNames->length){

            $usernamexml = $listNames->item($index)->getAttribute("name");
            $serverxml = $listNames->item($index)->getAttribute("serverID");

            if($usernamexml!=$username){
                $index++;
            }else{
                $trovato=1;
                $index=$listNames->length;
            }
        }
        
        echo $trovato;
        
    }
?>