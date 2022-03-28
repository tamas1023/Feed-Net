app.controller('kivalasztottCtrl',function($rootScope,$routeParams,$scope,dbfactory,$route){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $rootScope.feltetel="";
    $rootScope.ertekeles="";
    $rootScope.alapfeltetel="1";
    $rootScope.etterem=[];
    $rootScope.kepek=[];
    $id=$routeParams.id;
    $rootScope.feltetelek=[];
    /*

    Carousel jobbra balra gombok javítása, hogy jobban látszódjanak,
    a lenti sor ami mutatja hogy hány kép van, azt is láthatóbbá tenni

    A főoldalon a linkekre ha rávisszük az egeret pointer legyen a kulzor
     */
    
    $rootScope.sidebar=false;
    $rootScope.felszereltseg=[];
    $rootScope.alapfeltetel=" ID="+$id;
    //neve és a egyéb adatai
    dbfactory.selectCustom("ettermek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.etterem=res.data;  
            $rootScope.felszereltseg=res.data;
            Felszerelesek();
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

    Felszerelesek=function () {
        $rootScope.feltetelek=[];
        //console.log($rootScope.felszereltseg[0]);
        if ($rootScope.felszereltseg[0].Bankkartya==1) {
            //$rootScope.feltetelek+="Bankkártya elfogadó hely, ";
            $rootScope.feltetelek.push({"felt":"Bankkártya elfogadó hely"});
            
        }   
        if ($rootScope.felszereltseg[0].Parkolo==1) {
            //$rootScope.feltetelek+="Parkolás, ";
            $rootScope.feltetelek.push({"felt":"Parkolás"});
        }
        if ($rootScope.felszereltseg[0].Glutenmentes==1) {
            //$rootScope.feltetelek+="Gluténmentes, ";
            $rootScope.feltetelek.push({"felt":"Gluténmentes"});
        }
        if ($rootScope.felszereltseg[0].Hazhozszallitas==1) {
            //$rootScope.feltetelek+="Házhozszállítás, ";
            $rootScope.feltetelek.push({"felt":"Házhozszállítás"});
        }
        if ($rootScope.felszereltseg[0].Terasz==1) {
            //$rootScope.feltetelek+="Terasz, ";
            $rootScope.feltetelek.push({"felt":"Terasz"});
        }
        if ($rootScope.felszereltseg[0].Wifi) {
            //$rootScope.feltetelek+="Wifi, ";
            $rootScope.feltetelek.push({"felt":"Wifi"});
        }
        $scope.felszerelt=" ";
        
         for (let i = 0; i < $rootScope.feltetelek.length; i++) {
            
            if (i==$scope.feltetelek.length-1) {
                $scope.felszerelt+=" "+$rootScope.feltetelek[i].felt+" ";
            }
            else{
                $scope.felszerelt+=" "+$rootScope.feltetelek[i].felt+", ";
            }
        }
            
    }
   //értékelések lekérdezése
   $scope.ertekelesek=[];
   dbfactory.selectCustom("ertekelesek",$rootScope.alapfeltetel).then(function(res) {
    if (res.data.length > 0) { 
        $scope.ertekelesek=res.data;
        //console.log($scope.ertekelesek);
        
        for (let i = 0; i < $scope.ertekelesek.length; i++) {
            
            //vagy amikor lekérjük akkor már csak a dátumját kérjük le pl
            //vagy átírni a nézettáblát hogy csak az év hónap és napot mutassa
            $scope.ertekelesek[i].Datum=moment($scope.ertekelesek[i].Datum).format('YYYY MM.DD.');
        }
        
    } 
    else{
        console.log(res.data);
    }
});
    
    
        
});

