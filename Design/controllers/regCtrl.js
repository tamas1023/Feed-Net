app.controller('regCtrl',function($scope,$rootScope,$location,dbfactory){
    $rootScope.loggedIn=false;
    $rootScope.logJog="";
    $rootScope.logivagyreg=true;
    $rootScope.sidebar=false;
    dbfactory.logout().then(function(res){
        $rootScope.loggedIn=false;
        $rootScope.logJog="";
    });
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
                    
                dbfactory.emailcheck('felhasznalok',$scope.ujemail).then(function(res){
                    if(res.data.length>0)
                    {
                        alert('Ez az email cím már foglalat');
                    }
                    else
                    { 
                        //let pattern =  /^[a-zA-Z0-9]{8,}$/;
                        let Lenght = RegExp(/^.{8,32}$/);
                        let hasNumber = RegExp(/^.*[0-9].*$/);
                        let hasUpperLowerCase = RegExp(/(?=.*[a-z])(?=.*[A-Z])/);
                        if(Lenght.test($scope.ujjelszo))
                        {
                            alert('hossz megfelel');
                        }
                        if(hasNumber.test($scope.ujjelszo))
                        {
                            alert('Van szám');
                        }
                        else
                        {
                            alert('Nincs szám');
                        }
                        if(hasUpperLowerCase.test($scope.ujjelszo))
                        {
                            alert('Van Nagy kicsi ');
                        }
                        else
                        {
                            alert("Nincs nagy kicsi");
                        }
                        //!$scope.ujjelszo.match(pattern)
                        if(!Lenght.test($scope.ujjelszo)||!hasNumber.test($scope.ujjelszo)||!hasUpperLowerCase.test($scope.ujjelszo))
                        {
                            alert('a követelményeknak nem felel meg a jelszó(8 karakter minimum 1 nagy és kell bele minimum 1 szám)');
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