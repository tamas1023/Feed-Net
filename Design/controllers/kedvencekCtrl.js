app.controller('kedvencekCtrl',function($rootScope,$scope,dbfactory,$location){
    $rootScope.sidebar=false;
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
    $scope.kedvencettermek=[
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
    ]
})