var app= new angular.module('elsoApp',['ngAnimate']);

app.run(function($rootScope){
    $rootScope.title="Étterem";
});
/*app.controller('htmlCtrl',function($scope){
    $scope.title="Étterem";
});*/