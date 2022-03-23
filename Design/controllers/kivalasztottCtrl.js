app.controller('kivalasztottCtrl',function($rootScope,$scope,dbfactory,$route){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $rootScope.feltetel="";
    $rootScope.ertekeles="";
    $rootScope.alapfeltetel="1";
    $rootScope.etterem=[];

    //ha újratöltjük a weoldalt akkor nem dob ki semmit 
    //mert a kiválasztott étterem id valamiért 0 lesz
    //azért mert az oldal újratöltődik== válltozók reszetelődnek
    //a path ből kéne kiolvasni beolvasáskor  pl: kivalasztott/id
    //úgy működni fog
    
    $rootScope.alapfeltetel=" ID="+$rootScope.kivalasztottetteremID;
    console.log($rootScope.alapfeltetel);
    console.log($rootScope.alapfeltetel);

    dbfactory.selectCustom("ettermek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.etterem=res.data;  
            console.log($rootScope.etterem);
        } 
        else{
            console.log(res.data);
        }
    });
    
});

