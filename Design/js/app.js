var app= new angular.module('elsoApp',['ngAnimate']);

app.run(function($rootScope){
    $rootScope.title="Étterem";
});
/*app.controller('htmlCtrl',function($scope){
    $scope.title="Étterem";
});*/
app.controller('ettermekCtrl',function($scope){
    $scope.ettermek=[
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        /*
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3 ☆},
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3},
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3},
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3},*/

    ]
});