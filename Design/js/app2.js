var app= new angular.module('Feed-Net',['ngAnimate']);

app.run(function($rootScope){
    $rootScope.title="Étterem";
    $rootScope.felvesz=1;
    
  
});
app.controller('htmlCtrl',function($scope){
    $scope.ettermek=[];
    $scope.title="Étterem";
    $scope.teszt1="teszt1";
    $scope.ettermek=[
        {id:1,nev:"Bajai Tomato",telefon:"06 70 3799462",cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria hosszabb leírás hogy nézzük mit csinál ha sokkal több a szöveg ebben a box ban"},
        {id:1,nev:"Bajai Tomato",telefon:"06 70 3799462",cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:1,nev:"Bajai Tomato",telefon:"06 70 3799462",cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:1,nev:"Bajai Tomato",telefon:"06 70 3799462",cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:1,nev:"Bajai Tomato",telefon:"06 70 3799462",cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:1,nev:"Bajai Tomato",telefon:"06 70 3799462",cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"}
    ];

});