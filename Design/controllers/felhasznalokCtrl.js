app.controller('felhasznalokCtrl',function($scope,$rootScope,dbfactory,Notify){
    $scope.admin=false;
    $rootScope.sidebar=false;
    $scope.jelszo="";
    $scope.email="";
    $scope.felhasznalok=[];
    dbfactory.userselect().then(function(res){
      if(res.data.length>0)
      {
          $scope.felhasznalok=res.data;
      }
  });
    $scope.selectRow=function(id){
         $scope.ujID=$scope.felhasznalok[id].ID;
         $scope.ujnev=$scope.felhasznalok[id].Nev;
         $scope.ujemail=$scope.felhasznalok[id].Email;
         $scope.email=$scope.felhasznalok[id].Email;
         $scope.ujtelefon=$scope.felhasznalok[id].Telefon;
         $scope.ujpass=$scope.felhasznalok[id].Jelszo;
         $scope.jelszo=$scope.felhasznalok[id].Jelszo;
         $scope.ujjog=$scope.felhasznalok[id].Jog;
         $scope.ujstatusz=$scope.felhasznalok[id].Statusz ? true:false;
         if($scope.felhasznalok[id].Jog=="admin")
         {
            $scope.admin=true;
         }
         else
         {
            $scope.admin=false;
         }
         $rootScope.felvesz=0;
     }
     $scope.unselectRow=function()
     {
        $scope.ujnev=null;
        $scope.email=null;
        $scope.ujemail=null;
        $scope.ujtelefon=null;
        $scope.ujjog=null;
        $scope.ujstatusz=null;
        $rootScope.felvesz=1;
        $scope.admin=false;
        $scope.ujpass=null;
     }
     $scope.deleteRecord=function()
     {
        dbfactory.userdelete($scope.ujID).then(function(res){
            dbfactory.userselect().then(function(res){
                if(res.data.length>0)
                {
                    $scope.felhasznalok=res.data;
                }
            });
        })
        $scope.unselectRow();
     }
     $scope.insert=function()
     { 
        if($scope.ujnev==null|| $scope.ujemail==null||$scope.ujjog==null||$scope.ujstatusz==null)
        {
            
            Notify.addMessage('A kellő adatok nincsenek kitöltve ', "danger");
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
                    $scope.ujstatusz=($scope.ujstatusz) ? true:false;
                
                    //let pattern =  /^[a-zA-Z0-9]{8,}$/;
                    let Lenght = RegExp(/^.{8,32}$/);
                    let hasNumber = RegExp(/^.*[0-9].*$/);
                    let hasUpperLowerCase = RegExp(/(?=.*[a-z])(?=.*[A-Z])/);
                    if(!Lenght.test($scope.ujpass)||!hasNumber.test($scope.ujpass)||!hasUpperLowerCase.test($scope.ujpass))
                    {
                        
                        Notify.addMessage('A követelményeknek nem felel meg a jelszó(minimum 8  karakter, egy nagy betű,és egy szám)', "danger");
                    }
                    else
                    {
                        if($scope.ujtelefon==null)
                        {
                            $scope.ujtelefon="";
                        }
                        dbfactory.userinsert($scope.ujID,$scope.ujemail,$scope.ujnev,$scope.ujtelefon,CryptoJS.SHA1($scope.ujpass).toString(),$scope.ujjog,$scope.ujstatusz).then(function(res){
                            dbfactory.userselect().then(function(res){
                                if(res.data.length>0)
                                {
                                    $scope.felhasznalok=res.data;
                                }
                            });
                        })
                        $scope.unselectRow();
                    }
                }
            
            })
        }
     }
     $scope.update=function()
     {  
        if($scope.jelszo!=$scope.ujpass)
        {
           
            let Lenght = RegExp(/^.{8,32}$/);
            let hasNumber = RegExp(/^.*[0-9].*$/);
            let hasUpperLowerCase = RegExp(/(?=.*[a-z])(?=.*[A-Z])/);
            if(!Lenght.test($scope.ujpass)||!hasNumber.test($scope.ujpass)||!hasUpperLowerCase.test($scope.ujpass))
            {
                
                Notify.addMessage('A követelményeknek nem felel meg a jelszó(minimum 8  karakter, egy nagy betű,és egy szám)', "danger");
            }
            else
            {
                $scope.ujpass=CryptoJS.SHA1($scope.ujpass).toString();
                if($scope.ujnev==""||$scope.ujemail=="")
                {
                
                Notify.addMessage('A kellő adatok nincsenek kitöltve ', "danger");
                }
                else
                {
                        if($scope.email!=$scope.ujemail)
                        {
                            dbfactory.emailcheck('ettermek',$scope.ujemail).then(function(res){
                                if(res.data.length>0)
                                {
                                
                                Notify.addMessage('Ez az email cím már foglalt', "danger");
                                }
                                else
                                {
                                    dbfactory.userupdate($scope.ujID,$scope.ujemail,$scope.ujnev,$scope.ujtelefon,$scope.ujpass,$scope.ujjog,$scope.ujstatusz).then(function(res){
                                        dbfactory.userselect().then(function(res){
                                            if(res.data.length>0)
                                            {
                                            $scope.felhasznalok=res.data;
                                            }
                                        });
                                    $scope.unselectRow();
                                    })
                                }
                            })
                        }
                        else
                        {
                        dbfactory.userupdate($scope.ujID,$scope.ujemail,$scope.ujnev,$scope.ujtelefon,$scope.ujpass,$scope.ujjog,$scope.ujstatusz).then(function(res){
                            dbfactory.userselect().then(function(res){
                                if(res.data.length>0)
                                {
                                $scope.felhasznalok=res.data;
                                }
                            });
                            $scope.unselectRow();
                        })
                    }
                }
            }
        }
        else
        {
            if($scope.ujnev==""||$scope.ujemail=="")
            {
            
            Notify.addMessage('A kellő adatok nincsenek kitöltve', "danger");
            }
            else
            {
                    if($scope.email!=$scope.ujemail)
                    {
                        dbfactory.emailcheck('ettermek',$scope.ujemail).then(function(res){
                            if(res.data.length>0)
                            {
                            
                            Notify.addMessage('Ez az email cím már foglalt', "danger");
                            }
                            else
                            {
                                dbfactory.userupdate($scope.ujID,$scope.ujemail,$scope.ujnev,$scope.ujtelefon,$scope.ujpass,$scope.ujjog,$scope.ujstatusz).then(function(res){
                                    dbfactory.userselect().then(function(res){
                                        if(res.data.length>0)
                                        {
                                        $scope.felhasznalok=res.data;
                                        }
                                    });
                                $scope.unselectRow();
                                })
                            }
                        })
                    }
                    else
                    {
                    dbfactory.userupdate($scope.ujID,$scope.ujemail,$scope.ujnev,$scope.ujtelefon,$scope.ujpass,$scope.ujjog,$scope.ujstatusz).then(function(res){
                        dbfactory.userselect().then(function(res){
                            if(res.data.length>0)
                            {
                            $scope.felhasznalok=res.data;
                            }
                        });
                        $scope.unselectRow();
                    })
                }
            }
        } 
    }
});