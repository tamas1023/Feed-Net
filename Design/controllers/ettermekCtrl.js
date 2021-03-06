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
        
        if ($scope.nyitva) {
            $rootScope.ettermek=[];
            dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.feltetel+" AND Statusz=1").then(function(res) {
                if (res.data.length > 0) {
                   
                    for (let i = 0; i < res.data.length; i++) {
                        
                        if (res.data[i].nyitvavane) {
                            $rootScope.nincsetterem="";
                            $rootScope.ettermek.push(res.data[i]);
                            console.log($rootScope.ettermek);
                            console.log(res.data[i]);
                        }
                        
                    }
                    
                    
                } else {
                    console.log($rootScope.ettermek);
                    $rootScope.nincsetterem="Nem találtunk egyezést ezekre a szűrési paraméterekre.";
                    $rootScope.ettermek=res.data;
                }
            });
        }
        else
        {
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
        

    }

    $scope.Csillag=function (id) {
        $rootScope.ertekeles=" Ertekeles >="+id+" ";
        
    }
    $scope.Valasztas=function ($id) { 
        $location.url('/kivalasztott/'+$id);
    }

});

