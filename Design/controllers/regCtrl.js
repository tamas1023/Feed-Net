app.controller('regCtrl',function($scope,$rootScope,$location,dbfactory){
    $rootScope.loggedIn=false;
    $rootScope.logJog="";
    $rootScope.logivagyreg=true;
    $rootScope.sidebar=false;
    $scope.reg=function(){
        if ($scope.ujemail == null || $scope.ujjelszo == null||$scope.ujnev==null||$scope.ujjelszo2==null) {
            alert('Nem adtál meg minden regisztráláshoz adatot!');
        }
        else
        {
            if($scope.ujjelszo!=$scope.ujjelszo2)
            {
                alert("A két jelszó nem egyezik");
            }
            else
            {
              // alert($scope.ujemail);
                    
                dbfactory.emailcheck($scope.ujemail).then(function(res){
                    if(res.data.length>0)
                    {
                        alert('Ez az email cím már foglalat');
                    }
                })
            }
        }
    }
})