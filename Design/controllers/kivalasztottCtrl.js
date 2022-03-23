app.controller('kivalasztottCtrl',function($rootScope,$scope,dbfactory,$route){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $rootScope.feltetel="";
    $rootScope.ertekeles="";
    $rootScope.alapfeltetel="1";
    $rootScope.ettermek=[];

    //andrás tól ezzel állítjuk be pl ng-clickre

    //megnézni andrás hogy csinálta az admin étlap kiválasztást, és az alapján ugyan úgy megcsinálni
    
    $rootScope.kivalasztottetteremID;
    $rootScope.alapfeltetel=" ID="+$rootScope.kivalasztottetteremID;
    console.log($rootScope.alapfeltetel)

    dbfactory.selectCustom("ettermek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.nincsetterem="";
            $rootScope.ettermek=res.data;
            
        } 
        
    });
    
});

