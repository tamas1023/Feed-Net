app.controller('hibajelentesekCtrl',function($scope,$rootScope){
    // étterem nevet fogunk ki írni views segítségével a msql ből
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
    $scope.torolegyid=0;
    $scope.hibak=[
        {id:1,Nev:"Bajai Tomato",Tipus:"Rossz adat",Leiras:"Az ár le lett írva az halrudacskáknál az 60 forintal olcsóbb"},
        {id:2,Nev:"Bajai Tomato",Tipus:"duplikált étterem",Leiras:"Ez az étterem készeszer jelenik meg nekem"},
        {id:3,Nev:"Bajai JD stake ház",Tipus:"bezárt étterem",Leiras:"Ez az étterem nem volt amikor lementem a helyére"},
    ];
    $scope.egyvalaszt=function($id)
    {
        $scope.torolegyid=$id;
    }
})