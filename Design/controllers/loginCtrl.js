app.controller('loginCtrl',function($scope,$rootScope,$location){
    $rootScope.loggedIn=false;
    $rootScope.logJog="";
    $rootScope.logivagyreg=true;
    $rootScope.sidebar=false;
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