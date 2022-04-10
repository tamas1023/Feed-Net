app.controller('profilmodCtrl',function($scope,$rootScope,dbfactory,$location){
    $rootScope.sidebar=false;
    $scope.admin=false;
    if($rootScope.logJog=="admin")
    {
        $scope.admin=true;
    }
    else
    {
        $scope.admin=false;
    }
    dbfactory.profilselect($rootScope.loggedInUserID).then(function(res){
        if(res.data.length>0)
        {
        $scope.ujnev=res.data[0].Nev;
        $scope.ujemail=res.data[0].Email;
        $scope.ujtelefon=res.data[0].Telefon;
        $scope.ujpass=res.data[0].Jelszo;
        }
    })
    $scope.deleteRecord=function()
    {
        if($rootScope.logJog=='admin')
        {
            alert('Nem törölheted ki magad');
        }
        else
        {
            dbfactory.profildelete($rootScope.loggedInUserID).then(function(res){
                $rootScope.loggedIn=false;
                $rootScope.logJog="";
                $rootScope.EtteremEmail=0;
                $rootScope.loggedInUserID=0;
                $location.url('/');
            })
        }
    }
    $scope.update=function()
    {
        dbfactory.profilmod($rootScope.loggedInUserID, $scope.ujemail,$scope.ujnev,CryptoJS.SHA1($scope.ujpass).toString(), $scope.ujtelefon).then(function(res){
            alert('Módosítva');
            dbfactory.profilselect($rootScope.loggedInUserID).then(function(res){
                if(res.data.length>0)
                {
                $scope.ujnev=res.data[0].Nev;
                $scope.ujemail=res.data[0].Email;
                $scope.ujtelefon=res.data[0].Telefon;
                $scope.ujpass=res.data[0].Jelszo;
                }
            })
            })
    }
    
        
        
        
})
