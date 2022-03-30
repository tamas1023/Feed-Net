let egesz=document.getElementById("egesz");
let menu=document.getElementById("menu");
var positionInfo = menu.getBoundingClientRect();
var menuheight = positionInfo.height;
var menuwidth = positionInfo.width;
var opened=false;
let width = innerWidth;
let height = innerHeight;


const delay = ms => new Promise(res => setTimeout(res, ms));

let topnavopened=false;
window.addEventListener('resize',()=>{
    menu=document.getElementById("menu");
    positionInfo = menu.getBoundingClientRect();
    //inner width a képernyő szélessége
    width=innerWidth;
    menuheight = positionInfo.height;
    menuwidth = positionInfo.width;
    if (width<=650) {
      document.getElementById("mySidebar").style.width = "100%";
    }
    else{
      document.getElementById("mySidebar").style.width = "250px";
    }

    console.log("Menu height: "+menuheight);

if (width>=767) {
  document.getElementById("main").style.top =Math.round(menuheight)+"px";
}
if (width<767 && topnavopened==true) {
  document.getElementById("main").style.top =Math.round(menuheight)+"px";
}
    if (opened) {
      document.getElementById("egesz").style.width =width-250+"px";
      document.getElementById("footer").style.width =width-250+"px";
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
    //ha kis képernyőn nézzük akkor a sidebar kihúzódik sokat és az úgy nem szép
    //ezt megoldjuk ezzel
    if (width>=450) {
      document.getElementById("egesz").style.marginLeft = "250px";
      document.getElementById("footer").style.marginLeft = "250px";
    }
    else{
      document.getElementById("egesz").style.marginLeft = "0px";
      document.getElementById("footer").style.marginLeft = "0px";
    }
    
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
    console.log("Menu height: "+menuheight);
    resizing();
    if(posInfo.top<=56)
        {
          topnavopened=true;
          document.getElementById("main").style.top =Math.floor(menuheight)+"px";
     
        }
      else
        {
         if(posInfo.top>=271)
          {
            topnavopened=false;
            document.getElementById("main").style.top =Math.floor(menuheight)+"px";
      
          }
        }
    //document.getElementById("main").style.top = "215px";
  }
  const resizing= async ()=> {
    await delay(339);
    //console.log('1.s várakozás');
    menu=document.getElementById("menu");
    positionInfo = menu.getBoundingClientRect();
    menuheight = positionInfo.height;
    menuwidth = positionInfo.width;
    
    if (width>=767) {
      document.getElementById("main").style.top =Math.floor(menuheight)+"px";
    }
    if (width<767 && topnavopened==true) {
      document.getElementById("main").style.top =Math.floor(menuheight)+"px";
    }
    else{
      document.getElementById("main").style.top =Math.floor(menuheight)+"px";
    }
    
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