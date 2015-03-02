<?php
    session_start();
    require_once ('limonade/limonade.php');
    
    //protocollo pam
    
    dispatch_post('/login', 'postlogin');
    
    function postlogin(){
        
        if($_POST['username']!="" && !IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/login.php";

            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml; charset=utf-8"));
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

            curl_setopt($ch, CURLOPT_POSTFIELDS,"username=".$_POST['username']);
            $result = curl_exec ($ch);
                        
            if($result==1){
                $_SESSION["username"]=$_POST['username'];
            }else{
                header('HTTP/1.1 401 Unauthorized');
            }
            curl_close ($ch);
        }else{
            header('HTTP/1.1 400 Bad Syntax');
        }
    }
    
    dispatch_post('/logout', 'postlogout');
    
    function postlogout(){
        if(IsSet($_SESSION["username"])){
            $_SESSION=array();
            session_destroy();
        }else{
            header('HTTP/1.1 406');
        }
    }

    dispatch_post('/post','sendPost');

    function sendPost(){

        $username = $_SESSION["username"];

        if($username!=""){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/post.php";
             
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml; charset=utf-8"));            
            curl_setopt($ch, CURLOPT_POSTFIELDS,"username=".$_SESSION['username']."&article=".$_POST['article']);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
                header('HTTP/1.1 201 Created');
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }

    dispatch_post('/respam','respamPost');
    
    function respamPost(){

        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/respam.php";

            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml; charset=utf-8"));
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            curl_setopt($ch, CURLOPT_POSTFIELDS,"username=".$_SESSION['username']."&serverID=".$_POST['serverID']."&userID=".$_POST['userID']."&postID=".$_POST['postID']);
            $result = curl_exec ($ch);
            curl_close ($ch);

            if($result!=""){
                header('HTTP/1.1 201 Created');
            }

        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_post('/replyto','replyPost');
    
    function replyPost(){
    
        $username = $_SESSION["username"];
    
        if($username!=""){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/replyto.php";
            
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml; charset=utf-8"));

            curl_setopt($ch, CURLOPT_POSTFIELDS,"username=".$_SESSION['username']."&serverID=".$_POST['serverID']."&userID=".$_POST['userID']."&postID=".$_POST['postID']."&article=".$_POST['article']);

            curl_exec ($ch);
            curl_close ($ch);
            
            header('HTTP/1.1 201 Created');
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_get('/search/:limit/author/:serverID/:userID','searchAuthorPost');
    
    function searchAuthorPost(){
        if(IsSet($_SESSION["username"])){
            
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/search.php?username=".$_SESSION['username']."&limit=".params('limit')."&type=author&serverID=".params('serverID')."&userID=".params('userID');
        
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_get('/search/:limit/following','searchFollowingPost');
    
    function searchFollowingPost(){
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/search.php?username=".$_SESSION['username']."&limit=".params('limit')."&type=following";
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    dispatch_get('/search/:limit/recent/:term','searchRecentPost');
    
    function searchRecentPost(){
    
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/search.php?username=".$_SESSION['username']."&limit=".params('limit')."&type=recent&term=".params('term'); 
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    dispatch_get('/search/:limit/related/:term','searchRelatedPost');
    
    function searchRelatedPost(){
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/search.php?username=".$_SESSION['username']."&limit=".params('limit')."&type=related&term=".params('term');
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_get('/search/:limit/fulltext/:string','searchFulltextPost');
    
    function searchFulltextPost(){
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/search.php?username=".$_SESSION['username']."&limit=".params('limit')."&type=fulltext&string=".params('string');            
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_get('/search/:limit/affinity/:serverID/:userID/:postID','searchAffinityPost');

    function searchAffinityPost(){
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/search.php?username=".$_SESSION['username']."&limit=".params('limit')."&type=affinity&serverID=".params('serverID')."&userID=".params('userID')."&postID=".params('postID');
            
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_get('/post/:serverID/:userID/:postID','postRequest');

    function postRequest(){
        if(IsSet($_SESSION["username"])){
        
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/postRequest.php?serverID=".params('serverID')."&userID=".params('userID')."&postID=".params('postID');
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            curl_setopt($ch,CURLOPT_URL,$url);
            $result = curl_exec ($ch);
            curl_close ($ch);
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_post('/setlike','setLike');

    function setLike(){
        
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/setlike.php";

            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml; charset=utf-8"));            

            curl_setopt($ch, CURLOPT_POSTFIELDS,"username=".$_SESSION['username']."&serverID=".$_POST['serverID']."&userID=".$_POST['userID']."&postID=".$_POST['postID']."&value=".$_POST['value']);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_get('/servers','getServersList');
    
    function getServersList(){
            
        if($_SESSION["username"]!=""){

            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/getservers.php?username=".$_SESSION["username"];
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            echo $result;
        }
    }
    
    dispatch_post('/servers','setServerList');
    
    function setServerList(){
        
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/setservers.php";

            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml; charset=utf-8"));            

            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            curl_setopt($ch, CURLOPT_POSTFIELDS,"username=".$_SESSION['username']."&servers=".$_POST['servers']);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_post('/setfollow','setfollow');
    
    function setfollow(){
        
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/setfollow.php";
            
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml; charset=utf-8"));            

            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS,"username=".$_SESSION['username']."&serverID=".$_POST['serverID']."&userID=".$_POST['userID']."&value=".$_POST['value']);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_get('/followers','getFollowersList');
    
    function getFollowersList(){
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/getfollowers.php?username=".$_SESSION["username"];
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_post('/addterm','addTerm');
    
    function addTerm(){
        
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/thesaurus.php";
            
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml; charset=utf-8"));            

            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            curl_setopt($ch, CURLOPT_POSTFIELDS,"username=".$_SESSION['username']."&parentterm=".$_POST['parentterm']."&term=".$_POST['term']);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
            
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }
    
    dispatch_get('/thesaurus','getThesaurus');
    
    function getThesaurus(){
        if(IsSet($_SESSION["username"])){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/thesaurus.php?username=".$_SESSION['username'];
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            echo $result;
        }else{
            header('HTTP/1.1 401 Unauthorized');
        }
    }

    //protocollo upim
    
    dispatch_get('/searchserver/:limit/author/:serverID/:userID','searchServerAuthorPost');
    
    function searchServerAuthorPost(){
                
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/searchserver.php?limit=".params('limit')."&type=author&serverID=".params('serverID')."&userID=".params('userID');
                        
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
    }
    

    dispatch_get('/searchserver/:limit/recent/:term','searchServerRecentPost');
    
    function searchServerRecentPost(){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/searchserver.php?limit=".params('limit')."&type=recent&term=".params('term');
            
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
    }
    dispatch_get('/searchserver/:limit/related/:term','searchServerRelatedPost');
    
    function searchServerRelatedPost(){
        $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/searchserver.php?limit=".params('limit')."&type=related&term=".params('term');            
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);
            
            echo $result;
    }
    dispatch_get('/searchserver/:limit/fulltext/:string','searchServerFulltextPost');
    
    function searchServerFulltextPost(){
        $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/searchserver.php?limit=".params('limit')."&type=fulltext&string=".params('string');

        $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

            $result = curl_exec ($ch);
            curl_close ($ch);

            echo $result;
    }
    dispatch_get('/searchserver/:limit/affinity/:serverID/:userID/:postID/:k/:j','searchServerAffinityPost');
    
    function searchServerAffinityPost(){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/searchserver.php?limit=".params('limit')."&type=affinity&serverID=".params('serverID')."&userID=".params('userID')."&postID=".params('postID')."&k=".params('k')."&j=".params('j');
        
        
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec ($ch);
            curl_close ($ch);

            echo $result;
    }

    dispatch_get('/postserver/:userID/:postID','postServerRequest');
    
    function postServerRequest(){
                            
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/postrequestServer.php?userID=".params("userID")."&postID=".params("postID");            
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_HEADER, false);
            $result =  curl_exec ($ch);
            curl_close ($ch);
            echo $result;
    }

    dispatch_post('/propagatelike','propagatelike');
    
    function propagatelike(){

            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/propagatelike.php";
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml; charset=utf-8"));            

            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            curl_setopt($ch, CURLOPT_POSTFIELDS,"serverID1=".$_POST['serverID1']."&userID1=".$_POST['userID1']."&value=".$_POST['value']."&serverID2=".$_POST['serverID2']."&userID2=".$_POST['userID2']."&postID2=".$_POST['postID2']);
            $result= curl_exec ($ch);
            curl_close ($ch);
        echo $result;
    }

    dispatch_post('/hasreply','hasreply');

    function hasreply(){
            $url = "http://ltw1120.web.cs.unibo.it/cgi-bin/hasreply.php";

            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_HTTPHEADER,array ("Content-Type: application/x-www-form-urlencoded, text/html, application/xml, application/rdf-xml, text/html+xml; charset=utf-8"));            

            curl_setopt($ch, CURLOPT_POSTFIELDS,"serverID=".$_POST['serverID']."&userID=".$_POST['userID']."&postID=".$_POST['postID']."&userID2Up=".$_POST['userID2Up']."&postID2Up=".$_POST['postID2Up']);
            $result = curl_exec ($ch);
            curl_close ($ch);

            echo $result;
    }
    
    dispatch_delete('/**','delete');
    
    function delete(){
        header('HTTP/1.1 405');
    }
    run();
?>
