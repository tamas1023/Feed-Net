app.controller('etteremetlapCtrl',function($scope,$rootScope,$location){

    $rootScope.felvesz2=1;
        $scope.etteremad=0;
        $scope.ujnevetel=null;
        $scope.ujar=null;
        $scope.ujleirasetel=null;
        $scope.etlap=[{id:1,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"},
       
        {id:3,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska két tálon "}];
        $scope.visszavaltas=function($rootScope,$location){
            $location.url('/admin');
            $rootScope.loggedIn=true;
            $rootScope.logJog="admin";
        }
})