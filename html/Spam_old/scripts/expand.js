/*javascript per menu espandibile*/
window.onload=function(){
if(document.getElementsByTagName && document.getElementById){
    document.getElementById("nav").className="jsenable";
    BuildList();
    }
}

function BuildList(){
var hs=document.getElementById("nav").getElementsByTagName("h3");
var hp=document.getElementById("nav").getElementsByTagName("h2");
for(var i=0;i<hs.length;i++){
  hs[i].onclick=function(){
    this.parentNode.className=(this.parentNode.className=="show") ? "hide" : "show";
  }

}
}
