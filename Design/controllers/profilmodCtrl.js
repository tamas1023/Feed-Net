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
        if($scope.ujnev==""||$scope.ujemail=="")
        {
            alert('nem adtál meg mindem mezőt');
        }
        else
        {
            if($scope.ujpass==null&&$scope.ujpass1==null&&$scope.oldpass==null)
            {
                
                $scope.updatenameoremail();
            }
           else
           {
               $scope.updatepass();
                
           }
        }
    }
    $scope.updatenameoremail=function()
    {
        if($scope.email==$scope.ujemail)
                {
                    dbfactory.profilmod($rootScope.loggedInUserID, $scope.ujemail,$scope.ujnev,$scope.pass, $scope.ujtelefon).then(function(res){
                        alert('Módosítva csak név vagy email vagy telefon');
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
                            dbfactory.profilmod($rootScope.loggedInUserID, $scope.ujemail,$scope.ujnev,$scope.pass, $scope.ujtelefon).then(function(res){
                                alert('Módosítva csak név vagy email vagy telefon');
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
    $scope.updatepass=function()
    {
        if($scope.ujpass==""||$scope.ujpass1==""||$scope.oldpass=="")
        {
        alert('A jelszavak nincsenek kitöltve');
        }
        else
        {
            if($scope.ujpass!=""&&$scope.ujpass1!=""&&$scope.oldpass!="")
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
                            //let pattern =  /^[a-zA-Z0-9]{8,}$/;
                            //!$scope.ujpass.match(pattern)
                            let Lenght = RegExp(/^.{8,32}$/);
                            let hasNumber = RegExp(/^.*[0-9].*$/);
                            let hasUpperLowerCase = RegExp(/(?=.*[a-z])(?=.*[A-Z])/);
                            if(!Lenght.test($scope.ujpass)||!hasNumber.test($scope.ujpass)||!hasUpperLowerCase.test($scope.ujpass))
                            {
                                alert('a követelményeknak nem felel meg a jelszó(8 karakter minimum 1 nagy és kell bele minimum 1 szám)');
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
                                                    $scope.oldpass=null;
                                                    $scope.ujpass=null;
                                                    $scope.ujpass1=null;
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
                                                        $scope.oldpass=null;
                                                        $scope.ujpass=null;
                                                        $scope.ujpass1=null;
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
    }
})
