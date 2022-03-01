app.controller('felhasznalokCtrl',function($scope,$rootScope){
    $scope.admin=false;
    $scope.statusz=0;
    $scope.felhasznalok=[
        {id:1,nev:"Jakab józsef",email:"bajatomato@gmail.com",telefon:"06 70 3799462",jog:"user",statusz:1},
        {id:2,nev:"Jakab józsef1",email:"bajatomato@gmail.com",telefon:"06 70 3799463",jog:"user",statusz:1},
        {id:3,nev:"Jakab józsef2",email:"bajatomato@gmail.com",telefon:"06 70 3799464",jog:"user",statusz:1},
        {id:4,nev:"Jakab józsef3",email:"bajatomato@gmail.com",telefon:"06 70 3799465",jog:"user",statusz:1},
        {id:5,nev:"Jakab józsef4",email:"admin@gmail.com",telefon:"06 70 3799466",jog:"admin",statusz:1},
        {id:6,nev:"Jakab józsef5",email:"bajatomato@gmail.com",telefon:"06 70 3799467",jog:"user",statusz:0}
    ];
    $scope.selectRow=function(id){
         $scope.ujID=$scope.felhasznalok[id].id;
         $scope.ujnev=$scope.felhasznalok[id].nev;
         $scope.ujemail=$scope.felhasznalok[id].email;
         $scope.ujtelefon=$scope.felhasznalok[id].telefon;
         $scope.ujjog=$scope.felhasznalok[id].jog;
         $scope.ujstatusz=$scope.felhasznalok[id].statusz;
         $scope.statusz=$scope.felhasznalok[id].statusz;
         if($scope.ujjog="admin")
         {
            console.log($scope.ujjog,"+ id: "+id);
            $scope.admin=true;
         }
         else
         {
            $scope.admin=false;
         }
         $rootScope.felvesz=0;
     }
     $scope.unselectRow=function()
     {
        $scope.ujnev=null;
        $scope.ujemail=null;
        $scope.ujtelefon=null;
        $scope.ujjog=null;
        $scope.ujstatusz=null;
        $scope.statusz=0;
        $rootScope.felvesz=1;
     }
});