let egesz=document.getElementById("egesz");
let menu=document.getElementById("menu");
var positionInfo = egesz.getBoundingClientRect();
var egeszheight = positionInfo.height;
var egeszwidth = positionInfo.width;
var opened=false;
let width = innerWidth;
let height = innerHeight;

let topnavopened=false;
window.addEventListener('resize',()=>{
    egesz=document.getElementById("egesz");
    positionInfo = egesz.getBoundingClientRect();
    //inner width a képernyő szélessége
    width=innerWidth;
    egeszheight = positionInfo.height;
    egeszwidth = positionInfo.width;
    if (width<=640) {
      document.getElementById("mySidebar").style.width = "100%";
    }
    else{
      document.getElementById("mySidebar").style.width = "250px";
    }
    if (width>=767) {
      document.getElementById("main").style.top = "56px";
    }
    if (width<767 && topnavopened==true) {
      document.getElementById("main").style.top = "216px";
    }
    
    //console.log(width);
    //console.log("Egesz width: "+egeszwidth);
    //ha eltűnik a menü kinyitás rész
/*
    if (width>=768) {
      let pos=document.getElementById("main");
      let  posInfo = pos.getBoundingClientRect();
      if(posInfo.top==55)
        {
          document.getElementById("main").style.top = "215px";
     
        }
      TopNav();
      
    }
*/
    if (opened) {
      document.getElementById("egesz").style.width =width-250+"px";
      document.getElementById("footer").style.width =width -250+"px";
    }
    else{
      document.getElementById("egesz").style.width ="100%";
      document.getElementById("footer").style.width ="100%";
    }
});

function openNav() {
    //amikor válltozik a képernyő width je akkor is válltoztassuk a méretét
    //900px alatt egymás alá kerüljenek az étterem értékelés kép
    opened=true;
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("main").style.display = "none";
    document.getElementById("egesz").style.marginLeft = "250px";
    document.getElementById("footer").style.marginLeft = "250px";
    //console.log(width);
    document.getElementById("egesz").style.width =width -250+"px";
    document.getElementById("footer").style.width =width -250+"px";
    //document.getElementsByClassName("jobboldal").style.width ="100%";
    //TopNav();
  }
  function TopNav() {
    let pos=document.getElementById("main");
    let posInfo = pos.getBoundingClientRect();
    console.log(posInfo.top);
    if(posInfo.top==56)
        {
          topnavopened=true;
          document.getElementById("main").style.top = "216px";
     
        }
      else
        {
         if(posInfo.top==216)
          {
            topnavopened=false;
            document.getElementById("main").style.top = "56px";
      
          }
        }
    //document.getElementById("main").style.top = "215px";
  }
  
  function closeNav() {
    opened=false;
    let width = innerWidth;
    let height = innerHeight;
    //console.log("width: "+width);
    //console.log("height: "+height);
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("main").style.display= "block";
    document.getElementById("egesz").style.marginLeft = "0";
    document.getElementById("egesz").style.width = "100%";
    document.getElementById("footer").style.marginLeft = "0";
    document.getElementById("footer").style.width = "100%";
    //document.getElementsByClassName("jobboldal").style.width = "100%";
    //TopNav();
  }