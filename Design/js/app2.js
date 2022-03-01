var app= new angular.module('Feed-Net',['ngRoute','ngAnimate']);

app.run(function($rootScope){
    $rootScope.title="Étterem";
    $rootScope.felvesz=1;
    $rootScope.felvesz2=1;
  
});
app.config(function($routeProvider){
    $routeProvider
    .when('/admin',{
        templateUrl:'admin.html',
        controller:'etteremCtrl'
    })
    .when('/admin/felhasznalo',{
        templateUrl:'felhasznaloszerkesztes.html',
        controller:'felhasznalokCtrl'
    })
    .when('/admin/hiba',{
        templateUrl:'hibajelentesek.html',
        controller:'hibajelentesekCtrl'
    })
})



