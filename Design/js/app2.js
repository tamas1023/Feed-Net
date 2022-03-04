var app= new angular.module('Feed-Net',['ngRoute',]);

app.run(function($rootScope){
    $rootScope.sidebar=false;
    $rootScope.title="Étterem";
    $rootScope.felvesz=1;
    $rootScope.felvesz2=1;
    $rootScope.selectedetteremID=0;
    //be van e jelentezve és a jogosultsága admin/user/etterem
    $rootScope.loggedIn=true;
    $rootScope.logJog="admin";
  
});
app.controller('loginCtrl',function($scope,$rootScope,$location){
    $scope.login=function(){
       //alert("belepett");
        if ($scope.email == null || $scope.jelszo == null) {
            alert('Nem adtál meg minden belépési adatot!');
        } else {
            dbfactory.logincheck($scope.email, CryptoJS.SHA1($scope.jelszo).toString()).then(function(res) {
                if (res.data.length > 0) {
                    //bejeletkezett a felhasználó
                    $rootScope.loggedIn = true;
                    $rootScope.logJog=res.Jog;
                    //$rootScope.loggedUser = $scope.username;
                    //sessionStorage.setItem('pizzaUser', angular.toJson($scope.username));
                } else {
                    alert('Hibás belépési adatok!');
                }
            });
        }
    }
})
app.config(function($routeProvider){
    $routeProvider
    
    .when('/',{
       
        templateUrl:'ettermek.html',
        controller:'ettermekCtrl'
    })
    .when('/kedvencek',{
       
        templateUrl:'kedvencettermek.html',
        controller:'kedvencekCtrl'
    })
    .when('/gyik',{
       
        templateUrl:'gyik.html',
        controller:'gyikCtrl'
    })
    .when('/admin',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="admin"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'admin.html',
        controller:'etteremCtrl'
    })
    .when('/admin/etlap/:id',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="admin"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'adminetlap.html',
        controller:'etteremetlapCtrl'
    })
    .when('/admin/felhasznalo',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="admin"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'felhasznaloszerkesztes.html',
        controller:'felhasznalokCtrl'
    })
    .when('/admin/hiba',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="admin"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'hibajelentesek.html',
        controller:'hibajelentesekCtrl'
    })
    .when('/etteremfoglalas',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="etterem"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'etteremfoglalas.html',
        controller:'etteremfoglalasCtrl'
    })
    
})



