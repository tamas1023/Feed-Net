app.controller('gyikCtrl',function($rootScope,$scope,dbfactory){
    $rootScope.sidebar=false;
    if (sessionStorage.getItem('User')) {
        $rootScope.loggedIn = true;
        $rootScope.logJog = angular.fromJson(sessionStorage.getItem('User'));
    } else {
        $rootScope.loggedIn = false;
        $rootScope.logJog = "";
    }
    dbfactory.session().then(function(res){
        //console.log(res.data);
        sessionStorage.setItem('User', angular.toJson(res.data));
        $rootScope.logJog=res.data;
        //$location.path("#!/");
    })
})
