app.controller('regCtrl',function($scope,$rootScope,$location,dbfactory,Notify){
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
            
            Notify.addMessage('Nem adtál meg minden regisztráláshoz adatot!', "danger");
        }
        else
        {
            if($scope.ujjelszo!=$scope.ujjelszo2)
            {
                
                Notify.addMessage('A két jelszó nem egyezik', "danger");
            }
            else
            {
                    
                dbfactory.emailcheck('felhasznalok',$scope.ujemail).then(function(res){
                    if(res.data.length>0)
                    {
                        
                        Notify.addMessage('Ez az email cím már foglalt', "danger");
                    }
                    else
                    { 
                        //let pattern =  /^[a-zA-Z0-9]{8,}$/;
                        let Lenght = RegExp(/^.{8,32}$/);
                        let hasNumber = RegExp(/^.*[0-9].*$/);
                        let hasUpperLowerCase = RegExp(/(?=.*[a-z])(?=.*[A-Z])/);
                        //!$scope.ujjelszo.match(pattern)
                        if(!Lenght.test($scope.ujjelszo)||!hasNumber.test($scope.ujjelszo)||!hasUpperLowerCase.test($scope.ujjelszo))
                        {
                            
                            Notify.addMessage('A követelményeknek nem felel meg a jelszó(8 karakter minimum 1 nagy és kell bele minimum 1 szám)', "danger");
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