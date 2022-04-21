var app= new angular.module('Feed-Net',['ngRoute','angularjsNotify',]);

app.run(function($rootScope,dbfactory){
    $rootScope.sidebar=false;
    $rootScope.title="Étterem";
    $rootScope.felvesz=1;
    $rootScope.felvesz2=1;
    $rootScope.selectedetteremID=0;
    $rootScope.kivalasztottetteremID=0;
    $rootScope.logivagyreg=false;
    //be van e jelentezve és a jogosultsága admin/user/etterem
    $rootScope.loggedIn=false;
    $rootScope.logJog="";
    $rootScope.EtteremEmail=0;
    $rootScope.loggedInUserID=0;
    dbfactory.email().then(function(res){
        $rootScope.EtteremEmail=res.data;
    })
    dbfactory.session().then(function(res){
        $rootScope.logJog=res.data[0].Rights;
        $rootScope.loggedInUserID=res.data[0].ID;
        
        if(res.data[0].Rights=="user"||res.data[0].Rights=="admin"||res.data[0].Rights=="etterem")
        {
            $rootScope.loggedIn=true;
        }
    })
   
});
app.config(function($routeProvider,NotifyProvider){
    NotifyProvider.config.displayTime = 3000;
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
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn))
                {
                    $location.path('/');
                }
            }
        },
       
        templateUrl:'kedvencettermek.html',
        controller:'kedvencekCtrl'
    })
    
    .when('/kivalasztott/:id',{
        
        templateUrl:'kivalasztott.html',
        controller:'kivalasztottCtrl'
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
    .when('/admin/etteremnyitva/:id',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="admin"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'adminetteremnyitva.html',
        controller:'etteremnyitvatartasCtrl'
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
    .when('/admin/ertekeles',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="admin"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'ertekeles.html',
        controller:'ertekelesCtrl'
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
    .when('/profilmod',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'profilmod.html',
        controller:'profilmodCtrl'
    })
    .when('/etteremetlap',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="etterem"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'etteremetlap.html',
        controller:'etteremetlapCtrl'
    })
    .when('/etteremnyitvatartas',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="etterem"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'etteremnyitvatartas.html',
        controller:'etteremnyitvatartasCtrl'
    })
    .when('/etteremkepek',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="etterem"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'etteremkepek.html',
        controller:'etteremkepekCtrl'
    })
   
    .when('/admin/etteremkepek/:id',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&$rootScope.logJog=="admin"))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'etteremkepek.html',
        controller:'etteremkepekCtrl'
    })
    .when('/reservationmod',{
        resolve:
        {
            function ($location,$rootScope) {
                if(!($rootScope.loggedIn&&($rootScope.logJog=="admin"||$rootScope.logJog=="user")))
                {
                    $location.path('/');
                }
            }
        },
        templateUrl:'helyfoglalasmodisitas.html',
        controller:'helyfoglalasCtrl'
    })
})



