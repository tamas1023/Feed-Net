app.controller('regCtrl',function($scope,$rootScope,$location,dbfactory){
    $rootScope.loggedIn=false;
    $rootScope.logJog="";
    $rootScope.logivagyreg=true;
    $rootScope.sidebar=false;
    sessionStorage.removeItem('User');
    dbfactory.logout().then(function(res){});
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
              //alert($scope.ujemail);
                    
                dbfactory.emailcheck('felhasznalok',$scope.ujemail).then(function(res){
                    if(res.data.length>0)
                    {
                        alert('Ez az email cím már foglalat');
                    }
                    else
                    { 
                        let pattern =  /^[a-zA-Z0-9]{8,}$/;
                        if(!$scope.ujjelszo.match(pattern))
                        {
                            alert('A jelszó nep felel meg a minimális követelményeknek');
                        }
                        else
                        {
                            dbfactory.reg($scope.ujemail,$scope.ujnev,CryptoJS.SHA1($scope.ujjelszo).toString()).then(function(res){
                                $location.path("#!/login");
                            });
                        }      
                    }
                })
            }
        }
    }
})