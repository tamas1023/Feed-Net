app.controller('ettermekCtrl',function($rootScope,$scope,dbfactory,$location){
    if (sessionStorage.getItem('User')) {
        $rootScope.loggedIn = true;
        $rootScope.logJog = angular.fromJson(sessionStorage.getItem('User'));
    } else {
        $rootScope.loggedIn = false;
        $rootScope.logJog = "";
    }
    dbfactory.session().then(function(res){
        //console.log(res.data);
        sessionStorage.setItem('User', angular.toJson(res.data));
        $rootScope.logJog=res.data;
        //$location.path("#!/");
    })
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    if (sessionStorage.getItem('User')) {
        $rootScope.loggedIn = true;
        $rootScope.logJog = angular.fromJson(sessionStorage.getItem('User'));
    } else {
        $rootScope.loggedIn = false;
        $rootScope.logJog = "";
    }
    dbfactory.session().then(function(res){
        //console.log(res.data);
        sessionStorage.setItem('User', angular.toJson(res.data));
        $rootScope.logJog=res.data;
        //console.log(res.data);
        //$location.path("#!/");
    })
    $scope.ettermek=[
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        /*
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3 ☆},
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3},
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3},
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3},*/

    ];
    $scope.kedvencettermek=[
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
    ]

});