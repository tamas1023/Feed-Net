app.controller('kivalasztottCtrl',function($rootScope,$routeParams,$scope,dbfactory,$route){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $rootScope.feltetel="";
    $rootScope.ertekeles="";
    $rootScope.alapfeltetel="1";
    $rootScope.etterem=[];
    $rootScope.kepek=[];
    $id=$routeParams.id;
    
    $rootScope.alapfeltetel=" ID="+$id;
    //neve és a egyéb adatai
    dbfactory.selectCustom("ettermek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.etterem=res.data;  
            
        } 
        else{
            console.log(res.data);
        }
    });
    //képek lekérése
    $rootScope.feltetel=" Etterem_ID="+$id;
    dbfactory.selectCustom("kepek",$rootScope.feltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.kepek=res.data;  
            
        } 
        else{
            console.log(res.data);
        }
    });
    //Felszereltségek pl: egy string be összetesszük az alapján
    //hogy 0 vagy 1 e és azt iratjuk ki
    $scope.felszereltseg="";
    //az etterem tömbből kiolvasni az összes felszereltséget
    //és kézzel 
    
});

