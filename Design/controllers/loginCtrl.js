app.controller('loginCtrl',function($scope,$rootScope,$location,dbfactory){
    $rootScope.loggedIn=false;
    $rootScope.logJog="";
    $rootScope.logivagyreg=true;
    $rootScope.sidebar=false;
    sessionStorage.removeItem('User');
    $scope.login=function(){
        //alert("belepett");
         if ($scope.email == null || $scope.jelszo == null) {
             alert('Nem adtál meg minden belépési adatot!');
         } else {
             dbfactory.logincheck($scope.email, CryptoJS.SHA1($scope.jelszo).toString()).then(function(res) {
                 if (res.data.length > 0) {
                     //bejeletkezett a felhasználó
                     $rootScope.loggedIn = true;
                     $rootScope.logJog=res.data[0].Jog;
                     $rootScope.logivagyreg=false;
                     $rootScope.sidebar=true;
                     $location.path("#!/");
                     //alert(res.data[0].Jog);
                     //$rootScope.loggedUser = $scope.username;
                     sessionStorage.setItem('User', angular.toJson($rootScope.logJog));
                 } else {
                     alert('Hibás belépési adatok!');
                 }
             });
         }
     }
})