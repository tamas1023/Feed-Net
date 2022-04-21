app.controller('loginCtrl',function($scope,$rootScope,$location,dbfactory,Notify){
    $rootScope.loggedIn=false;
    $rootScope.logJog="";
    $rootScope.logivagyreg=true;
    $rootScope.sidebar=false;
    dbfactory.logout().then(function(res){
        $rootScope.loggedIn=false;
        $rootScope.logJog="";
    });
    $scope.login=function(){
         if ($scope.email == null || $scope.jelszo == null) {
             //alert('Nem adtál meg minden belépési adatot!');
             Notify.addMessage('Nem adtál meg minden belépési adatot!', "danger");
         } else {
             dbfactory.logincheck($scope.email, CryptoJS.SHA1($scope.jelszo).toString()).then(function(res) {
                 if (res.data.length > 0) {
                     if(res.data[0].Statusz==1)
                     {
                        //bejeletkezett a felhasználó
                        $rootScope.loggedIn = true;
                        $rootScope.logJog=res.data[0].Jog;
                        $rootScope.loggedInUserID=res.data[0].ID;
                        $rootScope.logivagyreg=false;
                        $rootScope.sidebar=true;
                        $location.path("#!/");
                        if(res.data[0].Jog=="etterem")
                        {
                            $rootScope.EtteremEmail=res.data[0].Email;
                        }
                     }
                     else
                     {
                         
                         Notify.addMessage('Tiltott felhasználó!', "danger");
                     }
                    
                 } else {
                     
                     Notify.addMessage('Hibás belépési adatok!', "danger");
                 }
             });
         }
     }
})