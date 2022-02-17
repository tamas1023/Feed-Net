var app= new angular.module('Feed-Net',['ngAnimate']);

app.run(function($rootScope){
    $rootScope.title="Étterem";
  
});
app.controller('htmlCtrl',function($scope){
    $scope.title="Étterem";
    $scope.teszt1="teszt1";
});