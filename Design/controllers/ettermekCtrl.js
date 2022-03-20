app.controller('ettermekCtrl',function($rootScope,$scope,dbfactory,$route){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $rootScope.feltetel="";
    $rootScope.alapfeltetel="1";
    $rootScope.ettermek=[];
    dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            
            $rootScope.ettermek=res.data;
            console.log($rootScope.ettermek);
        } 
        
    });
    
    

    $scope.kedvencettermek=[
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
    ]

    $scope.Szures=function () {
        
        

        
        $rootScope.feltetel="1";
        $scope.feltetelek=[];
        if ($scope.kartyaszures) {
            //$rootScope.feltetel+="Bankkartya=1 AND ";
            $scope.feltetelek.push({"felt":"Bankkartya=1"});
        }
        
        if ($scope.parkolo) {
            //$rootScope.feltetel+="Parkolo=1 AND ";
            $scope.feltetelek.push({"felt":"Parkolo=1"});
        }
        if ($scope.gluten) {
            //$rootScope.feltetel+="Glutenmentes=1 AND ";
            //$scope.feltetelek+="Glutenmentes=1";
            $scope.feltetelek.push({"felt":"Glutenmentes=1"});
        }
        if ($scope.szallitas) {
            //$rootScope.feltetel+="Hazhozszallitas=1 AND ";
            //$scope.feltetelek+="Hazhozszallitas=1";
            $scope.feltetelek.push({"felt":"Hazhozszallitas=1"});
        }
        if ($scope.terasz) {
            //$rootScope.feltetel+="Terasz=1 AND ";
           //$scope.feltetelek+="Terasz=1";
            $scope.feltetelek.push({"felt":"Terasz=1"});
        }
        if ($scope.wifi) {
            //$rootScope.feltetel+="Wifi=1 AND ";
            //$scope.feltetelek+="Wifi=1";
            $scope.feltetelek.push({"felt":"Wifi=1"});
        }
        
        


        $rootScope.feltetel=" ";
        for (let i = 0; i < $scope.feltetelek.length; i++) {
            //console.log($scope.feltetelek[i].felt);
            if (i==$scope.feltetelek.length-1) {
                $rootScope.feltetel+=" "+$scope.feltetelek[i].felt+" ";
            }
            else{
                $rootScope.feltetel+=" "+$scope.feltetelek[i].felt+" AND";
            }
        }
        
        //lekérésnél a 0,1 et átkonvertálja true vagy false ra
        //$scope.ujparkolo=($scope.ujparkolo)?true:false;


        //nyitvatartást megcsinálni, felvenni a backendbe adatokat
        //ha azt is kell akkor olyan lekérdezés, ami a nyitvatartást, és a szűrést
        //is benne van, ha nincs nyitv. akkor csak ami most van az is jó

        //valamiért nem frissíti az index.html-t de már a lekérés jó
        //console.log($rootScope.feltetel);
        if ($rootScope.feltetel==" ") {
            $rootScope.feltetel=" 1";
        } 
        

        // megoldani hogy vagy hozzáadjuk a viewtable be a szűréseket
        // vagy a szűrést külön végezzük és az alapján a viewtable ből kikérjük   ?
        dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.feltetel).then(function(res) {
            if (res.data.length > 0) {
                
                $rootScope.ettermek=res.data;
                //az include olt oldal újratöltése
                //elvileg ha kitöröljük/frissítjük az éttermeket
                //akkor frissül a weboldal is?? csak valamiért nem frissül 
                
                console.log(res.data);
                console.log($rootScope.ettermek);
                //console.log($scope.ettermek[1].Nev);
                console.log("Jó");
            } else {
                
                console.log(res.data);
                console.log("Nem jó");
            }
        });

    }
    

});

