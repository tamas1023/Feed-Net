app.controller('ettermekCtrl',function($rootScope,$scope,dbfactory,$route,$location){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $rootScope.feltetel="";
    $rootScope.ertekeles="";
    $rootScope.alapfeltetel=" Statusz=1";
    $rootScope.ettermek=[];
    $rootScope.nincsetterem="Nem találtunk egyezést ezekre a szűrési paraméterekre.";
    dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.nincsetterem="";
            $rootScope.ettermek=res.data;
            
        } 
        
    });

    

    //egy gomb ami az összes szűrési feltételt reszeteli
    $scope.Szures=function () {
        
        
        $scope.feltetelek=[];
        if ($scope.kartyaszures) {
            $scope.feltetelek.push({"felt":"Bankkartya=1"});
        }
        
        if ($scope.parkolo) {
            $scope.feltetelek.push({"felt":"Parkolo=1"});
        }
        if ($scope.gluten) {
            $scope.feltetelek.push({"felt":"Glutenmentes=1"});
        }
        if ($scope.szallitas) {
            $scope.feltetelek.push({"felt":"Hazhozszallitas=1"});
        }
        if ($scope.terasz) {
            $scope.feltetelek.push({"felt":"Terasz=1"});
        }
        if ($scope.wifi) {
            $scope.feltetelek.push({"felt":"Wifi=1"});
        }
        if ($scope.nyitva) {
            //lekérni a current time ot a backendről


            //utána (then be) lekérnni a napot

            // ide majd a lekérdezett n ap jön majd
            let datum=new Date();
            let hetmelyiknap=datum.getDay();
            let melyiknapszo="";
            //0 vasárnap ... 6 szombat
            //console.log(hetmelyiknap);
    
            if (hetmelyiknap==0 ) {
                melyiknapszo="Vasárnap";
                        
            }
            if (hetmelyiknap==1 ) {
                melyiknapszo="Hétfő";
                        
            }
            if (hetmelyiknap==2 ) {
                melyiknapszo="Kedd";
                        
            }
            if (hetmelyiknap==3 ) {
                melyiknapszo="Szerda";
                        
            }
            if (hetmelyiknap==4 ) {
                melyiknapszo="Csütörtök";
                        
            }
            if (hetmelyiknap==5 ) {
                melyiknapszo="Péntek";
                        
                }
            if (hetmelyiknap==6 ) {
                melyiknapszo="Szombat";
                        
            }

            //lekérni minden egyes étterem nek az aznapi nyitvatartását
            //és ha a mostani órában nyitva van akkor az étterem id jét
            //letárolni, és azután az éttermek listát frissíteni
            //azokkal az elemekkel ami benne van a listában
            
            for (let i = 0; i < $scope.nyitvatartas.length; i++) {
                if ( $scope.nyitvatartas[i].Nap==melyiknapszo) {
                    
                }
        
            }
        }
        
        $rootScope.feltetel=" ";
        for (let i = 0; i < $scope.feltetelek.length; i++) {
            
            if (i==$scope.feltetelek.length-1) {
                $rootScope.feltetel+=" "+$scope.feltetelek[i].felt+" ";
            }
            else{
                $rootScope.feltetel+=" "+$scope.feltetelek[i].felt+" AND";
            }
        }
        
        if ($rootScope.feltetel==" ") {
            if ($rootScope.ertekeles!="") {
                $rootScope.feltetel+=" "+$rootScope.ertekeles;
            }
            else{
                $rootScope.feltetel=" 1";
            }
            
        }
        else{
            if ($rootScope.ertekeles!="") {
                $rootScope.feltetel+=" AND "+$rootScope.ertekeles;
            }
        } 
        
        dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.feltetel+" AND Statusz=1").then(function(res) {
            if (res.data.length > 0) {
                $rootScope.nincsetterem="";
                $rootScope.ettermek=res.data;
            } else {
                $rootScope.nincsetterem="Nem találtunk egyezést ezekre a szűrési paraméterekre.";
                $rootScope.ettermek=res.data;
            }
        });

    }

    $scope.Csillag=function (id) {
        $rootScope.ertekeles=" Ertekeles >="+id+" ";
        
    }
    $scope.Valasztas=function ($id) { 
        $location.url('/kivalasztott/'+$id);
    }

});

