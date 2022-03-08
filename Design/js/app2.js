var app= new angular.module('Feed-Net',['ngRoute',]);

app.run(function($rootScope,dbfactory){
    $rootScope.sidebar=false;
    $rootScope.title="Étterem";
    $rootScope.felvesz=1;
    $rootScope.felvesz2=1;
    $rootScope.selectedetteremID=0;
    $rootScope.logivagyreg=false;
    //be van e jelentezve és a jogosultsága admin/user/etterem
    $rootScope.loggedIn=true;
    $rootScope.logJog="etterem";
   
   
});
app.config(function($routeProvider){
    $routeProvider
    
    .when('/reg',{
       
        templateUrl:'reg.html',
        controller:'regCtrl'
    })
    .when('/login',{
       
        templateUrl:'login.html',
        controller:'loginCtrl'
    })
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



