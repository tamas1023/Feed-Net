app.controller('profilmodCtrl',function($scope,$rootScope,dbfactory,$location){
    $rootScope.sidebar=false;
    $scope.admin=false;
    $scope.pass="";
    $scope.email="";
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
        $scope.pass=res.data[0].Jelszo;
        $scope.email=res.data[0].Email;
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
        if($scope.ujpass==null||$scope.ujpass1==null&&$scope.oldpass==null)
        {
            alert('nem adtál meg mindem mezőt');
        }
        else
        {
            if(CryptoJS.SHA1($scope.oldpass).toString()!=$scope.pass)
            {
                alert("nem megfelelő régi jelszó")
            }
            else
            {
                if($scope.ujpass!=$scope.ujpass1)
                {
                    alert('A két új jeszó nem egyezik');
                }
                else
                {
                    if($scope.ujpass==$scope.pass)
                    {
                        alert('A régi jelszó nem lehet az új jelszó');
                    }
                    else
                    {
                        let pattern =  /^[a-zA-Z0-9]{8,}$/;
                        if(!$scope.ujpass.match(pattern))
                        {
                            alert('a követelményeknak nem felel meg az új jelszó(8 karakter minimum 1 nagy és kell bele szám)');
                        }
                        else
                        {
                            if($scope.email==$scope.ujemail)
                            {
                                dbfactory.profilmod($rootScope.loggedInUserID, $scope.ujemail,$scope.ujnev,CryptoJS.SHA1($scope.ujpass).toString(), $scope.ujtelefon).then(function(res){
                                    alert('Módosítva');
                                        dbfactory.profilselect($rootScope.loggedInUserID).then(function(res){
                                            if(res.data.length>0)
                                            {
                                            $scope.ujnev=res.data[0].Nev;
                                            $scope.ujemail=res.data[0].Email;
                                            $scope.ujtelefon=res.data[0].Telefon;
                                            $scope.pass=res.data[0].Jelszo;
                                            $scope.email=res.data[0].Email;
                                            }
                                        })
                                    })
                            }
                            else
                            {
                                dbfactory.emailcheck('ettermek',$scope.ujemail).then(function(res){
                                    if(res.data.length>0)
                                    {
                                        alert('Ez az email cím már foglalat');
                                    }
                                    else
                                    {
                                        dbfactory.profilmod($rootScope.loggedInUserID, $scope.ujemail,$scope.ujnev,CryptoJS.SHA1($scope.ujpass).toString(), $scope.ujtelefon).then(function(res){
                                            alert('Módosítva');
                                                dbfactory.profilselect($rootScope.loggedInUserID).then(function(res){
                                                    if(res.data.length>0)
                                                    {
                                                    $scope.ujnev=res.data[0].Nev;
                                                    $scope.ujemail=res.data[0].Email;
                                                    $scope.ujtelefon=res.data[0].Telefon;
                                                    $scope.pass=res.data[0].Jelszo;
                                                    $scope.email=res.data[0].Email;
                                                    }
                                                })
                                            })
                                    }
                                })
                            }
                           
                        }
                    
                    }
                
                }
                
            }
        }
    }
          
})
