app.controller('kivalasztottCtrl',function($rootScope,$scope,dbfactory,$route){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $rootScope.feltetel="";
    $rootScope.ertekeles="";
    $rootScope.alapfeltetel="1";
    $rootScope.ettermek=[];

    //andrás tól ezzel állítjuk be pl ng-clickre
    
    $rootScope.kivalasztottetteremID=$id;
        $scope.etlap=[{id:1,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"},
       
        {id:3,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska két tálon "}];

    $location.url('/admin/etlap/'+$rootScope.kivalasztottetteremID);

    dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.nincsetterem="";
            $rootScope.ettermek=res.data;
            
        } 
        
    });
    
});

