app.controller('ettermekCtrl',function($rootScope,$scope,dbfactory,$route,$location){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $rootScope.feltetel="";
    $rootScope.ertekeles="";
    $rootScope.alapfeltetel="1";
    $rootScope.ettermek=[];
    $rootScope.nincsetterem="Nem találtunk egyezést ezekre a szűrési paraméterekre.";
    dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.nincsetterem="";
            $rootScope.ettermek=res.data;
            
        } 
        
    });
    $scope.kedvencettermek=[
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
    ]

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
        
        dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.feltetel).then(function(res) {
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
        //andrás tól ezzel állítjuk be pl ng-clickre
        //console.log($id);
        $rootScope.kivalasztottetteremID=$id;

        //$location.url('/kivalasztott/'+$rootScope.kivalasztottetteremID);
        // erre megcsinálni, hogy erre elküldi és majd a link ből ki kell olvasni a számot

        $location.url('/kivalasztott');
    }

});

