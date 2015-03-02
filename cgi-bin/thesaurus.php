<?php
    
    $parentTerm = $_POST["parentterm"];
    $term = $_POST["term"];
    $user = $_POST["username"];
    

    if($user){
        
        $dom = new DomDocument('1.0');
        $dom->load("../data/users/".$user."/tesauro.xml");
        $rdf=$dom->documentElement;

        $description = $dom->createElement("rdf:Description");
        $description->setAttribute("rdf:about","tweb:".$parentTerm."/".$term);
        $description->setAttribute("rdf:type","skos:Concept");

        $schema = $dom->createElement("skos:inScheme");
        $schema->setAttribute("rdf:resource","tweb");
        
        $description->appendChild($schema);
        
        $prefLabel = $dom->createElement("skos:prefLabel");
        $prefLabel->nodeValue = $term;
        
        $description->appendChild($prefLabel);
        
        $broader = $dom->createElement("skos:broader");
        $broader->setAttribute("rdf:resource","tweb:".$parentTerm);
        
        $description->appendChild($broader);

        $rdf->appendChild($description);
        
        echo $dom->save("../data/users/".$user."/tesauro.xml");
        
        
    }else{
        $user = $_GET["username"];
        
        echo file_get_contents("../data/users/".$user."/tesauro.xml");
        
    }

?>