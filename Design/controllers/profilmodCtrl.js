app.controller('profilmodCtrl',function($scope,$rootScope,dbfactory,$location,Notify){
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
    
    $scope.update=function()
    {
        if($scope.ujnev==""||$scope.ujemail=="")
        {
           
            Notify.addMessage('Nem adtál meg mindem mezőt', "danger");
        }
        else
        {
            if(($scope.ujpass==null||$scope.ujpass=="")&&($scope.ujpass1==null||$scope.ujpass1=="")&&($scope.oldpass==null||$scope.oldpass==""))
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
                        
                            Notify.addMessage('Sikeres módosítás', "success");
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
                    dbfactory.emailcheck('felhasznalok',$scope.ujemail).then(function(res){
                        if(res.data.length>0)
                        {
                            
                            Notify.addMessage('Ez az email cím már foglalt', "danger");
                        }
                        else
                        {
                            dbfactory.profilmod($rootScope.loggedInUserID, $scope.ujemail,$scope.ujnev,$scope.pass, $scope.ujtelefon).then(function(res){
                               
                                Notify.addMessage('Sikeres módosítás', "success");
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
        
        Notify.addMessage('A jelszavak nincsenek kitöltve', "danger");
        }
        else
        {
            if($scope.ujpass!=""&&$scope.ujpass1!=""&&$scope.oldpass!="")
            {
                if(CryptoJS.SHA1($scope.oldpass).toString()!=$scope.pass)
                {
                    
                    Notify.addMessage('Nem megfelelő régi jelszó', "danger");
                }
                else
                {
                    if($scope.ujpass!=$scope.ujpass1)
                    {
                        
                        Notify.addMessage('A két új jeszó nem egyezik', "danger");
                    }
                    else
                    {
                        if($scope.ujpass==$scope.pass)
                        {
                            
                            Notify.addMessage('A régi jelszó nem lehet az új jelszó', "danger");
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
                                
                                Notify.addMessage('A követelményeknek nem felel meg a jelszó(minimum 8  karakter, egy nagy betű,és egy szám)', "danger");
                            }
                            else
                            {
                                if($scope.email==$scope.ujemail)
                                {
                                    dbfactory.profilmod($rootScope.loggedInUserID, $scope.ujemail,$scope.ujnev,CryptoJS.SHA1($scope.ujpass).toString(), $scope.ujtelefon).then(function(res){
                                        
                                        Notify.addMessage('Módosítva', "success");
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
                                            
                                            Notify.addMessage('Ez az email cím már foglalt', "danger");
                                        }
                                        else
                                        {
                                            dbfactory.profilmod($rootScope.loggedInUserID, $scope.ujemail,$scope.ujnev,CryptoJS.SHA1($scope.ujpass).toString(), $scope.ujtelefon).then(function(res){
                                                
                                                 Notify.addMessage('Módosítva', "success");
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
