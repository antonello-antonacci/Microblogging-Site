<?php
        $followers = file_get_contents("../data/users/".$_GET["username"]."/followusers.xml");
        
			$doc = new DomDocument();
			$doc->loadXML($followers);
	

			$followersDoc = new DomDocument();
			$users = $followersDoc->createElement("followers");
			$followersDoc->appendChild($users);			
			
			for($index=0;$index<$doc->getElementsByTagName("user")->length;$index++){
	
		
			//	$follower = "<follower id=\"tw".substr($doc->getElementsByTagName("user")->item($index)->getAttribute("serverid"),5)."/".$doc->getElementsByTagName("user")->item($index)->getAttribute("id")."\"/>";			
			
				$followerTag = $followersDoc->createElement("follower");
	
				$users->appendChild($followerTag);
				
				$followerTag->setAttribute("id","\"tw".substr($doc->getElementsByTagName("user")->item($index)->getAttribute("serverid"),5)."/".$doc->getElementsByTagName("user")->item($index)->getAttribute("id"));
				
			}
			
			echo $followersDoc->saveXML();
        
?>