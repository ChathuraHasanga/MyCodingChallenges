function myFunction(){
    var x = document.getElementById("mainnav");
    if(x.className === "container"){
        x.className += " responsive";
    }else{
        x.className == "container";
    }
}