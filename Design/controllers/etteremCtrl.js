app.controller('etteremCtrl',function($scope,$rootScope,$location,dbfactory,Notify){
    $scope.ettermek=[];
    $scope.title="Étterem";
    $scope.teszt1="teszt1";
    $rootScope.sidebar=false;
    $scope.etteremad=1;
    $scope.ModID=0;
    $scope.email="";
    $scope.etteremselect=function()
    {
        dbfactory.selectCustom("ettermek",`Email='${$rootScope.EtteremEmail}'`).then(function(res){
            if(res.data.length>0)
            {
                $scope.ettermek=res.data;
                $scope.ModID=$scope.ettermek[0].ID;
                $scope.ujnev=$scope.ettermek[0].Nev;
                $scope.ujemail=$scope.ettermek[0].Email;
                $scope.email=$scope.ettermek[0].Email;
                $scope.ujtelefon=$scope.ettermek[0].Telefon;
                $scope.ujcim=$scope.ettermek[0].Cim;
                $scope.ujweboldal=$scope.ettermek[0].Weboldal;
                $scope.ujfacebook=$scope.ettermek[0].Facebook;
                $scope.ujleiras=$scope.ettermek[0].Leiras;
                $scope.ujtipus=$scope.ettermek[0].Tipus;
                $scope.ujwifi=($scope.ettermek[0].Wifi)? true : false;
                $scope.ujparkolo=($scope.ettermek[0].Parkolo)? true : false;
                $scope.ujbankkartya=($scope.ettermek[0].Bankkartya)? true : false;
                $scope.ujglutenmentes=($scope.ettermek[0].Glutenmentes)? true : false;
                $scope.ujterasz=($scope.ettermek[0].Terasz)? true : false;
                $scope.ujberelheto=($scope.ettermek[0].Berelheto)? true : false;
                $scope.ujhazhozszallitas=($scope.ettermek[0].Hazhozszallitas)? true : false;
                $scope.ujferohely=$scope.ettermek[0].Ferohely;
                $scope.ujstatusz=($scope.ettermek[0].Statusz)? true : false;
            }
        });
    }
    if($rootScope.logJog=="etterem")
    {
        $scope.etteremselect();
    }
    else
    {
        dbfactory.admindingingselect().then(function(res){
            if(res.data.length>0)
            {
                $scope.ettermek=res.data;
            }
        });
    }
    $scope.selectRow=function($id){
       $scope.ModID=$scope.ettermek[$id].ID;
        $scope.ujnev=$scope.ettermek[$id].Nev;
        $scope.ujemail=$scope.ettermek[$id].Email;
        $scope.email=$scope.ettermek[$id].Email;
        $scope.ujtelefon=$scope.ettermek[$id].Telefon;
        $scope.ujcim=$scope.ettermek[$id].Cim;
        $scope.ujweboldal=$scope.ettermek[$id].Weboldal;
        $scope.ujfacebook=$scope.ettermek[$id].Facebook;
        $scope.ujleiras=$scope.ettermek[$id].Leiras;
        $scope.ujtipus=$scope.ettermek[$id].Tipus;
        $scope.ujwifi=($scope.ettermek[$id].Wifi)? true : false;
        $scope.ujparkolo=($scope.ettermek[$id].Parkolo)? true : false;
        $scope.ujbankkartya=($scope.ettermek[$id].Bankkartya)? true : false;
        $scope.ujglutenmentes=($scope.ettermek[$id].Glutenmentes)? true : false;
        $scope.ujterasz=($scope.ettermek[$id].Terasz)? true : false;
        $scope.ujberelheto=($scope.ettermek[$id].Berelheto)? true : false;
        $scope.ujhazhozszallitas=($scope.ettermek[$id].Hazhozszallitas)? true : false;
        $scope.ujferohely=$scope.ettermek[$id].Ferohely;
        $scope.ujstatusz=($scope.ettermek[$id].Statusz)? true : false;
        $rootScope.felvesz=0;
    }
    $scope.update=function()
    {   
        if($scope.email!=$scope.ujemail)
        {
            dbfactory.emailcheck('ettermek',$scope.ujemail).then(function(res){
                if(res.data.length>0)
                {
                    
                    Notify.addMessage('Ez az email cím már foglalat', "danger");
                }
                else
                {
                    if($scope.ujnev==null|| $scope.ujemail==null||$scope.ujtelefon==null||$scope.ujcim==null||$scope.ujleiras==null)
                    {
                        
                        Notify.addMessage('A kellő adatok nincsenek kitöltve', "danger");
                    }
                    else
                    {
                        dbfactory.admindiningupdate($scope.ModID,$scope.ujnev,$scope.ujemail,$scope.ujtelefon,$scope.ujcim,$scope.ujferohely,$scope.ujleiras,$scope.ujparkolo,$scope.ujbankkartya,$scope.ujglutenmentes,$scope.ujterasz,$scope.ujberelheto,$scope.ujhazhozszallitas,$scope.ujstatusz,$scope.ujweboldal,$scope.ujfacebook,$scope.ujtipus,$scope.ujwifi).then(function(res){
                    
                            if($rootScope.logJog=="etterem")
                            {
                                $scope.etteremselect();
                                Notify.addMessage('Az adatok módosítva', "success");
                            }
                            else
                            {
                                dbfactory.admindingingselect().then(function(res){
                                    if(res.data.length>0)
                                    {
                                        $scope.ettermek=res.data;
                                    }
                                });
                                if($rootScope.logJog=="admin")
                                {
                                $scope.unselectRow();
                                }
                            }
                           
                        })
                    }
                }
            })
        }
        else
        { 
            if($scope.ujnev==""|| $scope.ujemail==null||$scope.ujtelefon==""||$scope.ujcim==""||$scope.ujleiras=="")
            {
               
                Notify.addMessage('A kellő adatok nincsenek kitöltve ', "danger");
            }
            else
            {
                dbfactory.admindiningupdate($scope.ModID,$scope.ujnev,$scope.ujemail,$scope.ujtelefon,$scope.ujcim,$scope.ujferohely,$scope.ujleiras,$scope.ujparkolo,$scope.ujbankkartya,$scope.ujglutenmentes,$scope.ujterasz,$scope.ujberelheto,$scope.ujhazhozszallitas,$scope.ujstatusz,$scope.ujweboldal,$scope.ujfacebook,$scope.ujtipus,$scope.ujwifi).then(function(res){
            
                    if($rootScope.logJog=="etterem")
                    {
                        $scope.etteremselect();
                        Notify.addMessage('Az adatok módosítva', "success");
                    }
                    else
                    {
                        dbfactory.admindingingselect().then(function(res){
                            if(res.data.length>0)
                            {
                                $scope.ettermek=res.data;
                            }
                        });
                        if($rootScope.logJog=="admin")
                        {
                        $scope.unselectRow();
                        }
                    }
                })
            }
        }
       
    }
    $scope.unselectRow=function()
    {
        $scope.ujID=null;
        $scope.ujnev=null;
        $scope.ujemail=null;
        $scope.email=null;
        $scope.ujtelefon=null;
        $scope.ujcim=null;
        $scope.ujleiras=null;
        $scope.ujparkolo=null;
        $scope.ujbankkartya=null;
        $scope.ujglutenmentes=null;
        $scope.ujterasz=null;
        $scope.ujberelheto=null;
        $scope.ujhazhozszallitas=null
        $scope.ujferohely=null;
        $scope.ujstatusz=null;
        $scope.ujweboldal=null;
        $scope.ujfacebook=null;
        $scope.ujtipus=null;
        $scope.ujwifi=null;
        $rootScope.felvesz=1;
        
    }
    $scope.etterem=function($id){
        // adatok lekérdezése
        $rootScope.felvesz2=1;
        $scope.etteremad=0;
        $scope.ujnevetel=null;
        $scope.ujar=null;
        $scope.ujleirasetel=null;
        $rootScope.selectedetteremID=$id;
       $location.url('/admin/etlap/'+$rootScope.selectedetteremID);
    }
    $scope.etteremnyitva=function(id)
    {
        $rootScope.selectedetteremID=id;
        $location.url('/admin/etteremnyitva/'+$rootScope.selectedetteremID);
    }
    $scope.etteremkepek=function(id)
    {            
        $rootScope.selectedetteremID=id;
        $location.url('/admin/etteremkepek/'+$rootScope.selectedetteremID);
    }
    $scope.visszavaltasetterem=function()
    {
        $scope.ujID=null;
        $scope.ujnev=null;
        $scope.ujemail=null;
        $scope.ujtelefon=null;
        $scope.ujcim=null;
        $scope.ujleiras=null;
        $scope.parkolo=null;
        $rootScope.felvesz2=1;
        $rootScope.felvesz=1;
        $scope.etteremad=1;
    }
    $scope.insert=function()
    {
        dbfactory.emailcheck('ettermek',$scope.ujemail).then(function(res){
            if(res.data.length>0)
            {
                
                Notify.addMessage('Ez az email cím már foglalt', "danger");
            }
            else
            {
                if($scope.ujnev==null|| $scope.ujemail==null||$scope.ujtelefon==null||$scope.ujcim==null||$scope.ujleiras==null||$scope.ujtipus==null)
                {
                    
                    Notify.addMessage('A kellő adatok nincsenek kitöltve ', "danger");
                }
                else
                {
                    $scope.ujparkolo=($scope.ujparkolo)? true : false;
                    $scope.ujbankkartya=($scope.ujbankkartya)? true : false;
                    $scope.ujglutenmentes=($scope.ujglutenmentes)? true : false;
                    $scope.ujterasz=($scope.ujterasz)? true : false;
                    $scope.ujberelheto=( $scope.ujberelheto)? true : false;
                    $scope.ujhazhozszallitas=( $scope.ujhazhozszallitas)? true : false;
                    $scope.ujstatusz=( $scope.ujstatusz)? true : false;
                    $scope.ujwifi=($scope.ujwifi)? true : false;
                    dbfactory.admindininginsert($scope.ModID,$scope.ujnev,$scope.ujemail,$scope.ujtelefon,$scope.ujcim,$scope.ujferohely,$scope.ujleiras,$scope.ujparkolo,$scope.ujbankkartya,$scope.ujglutenmentes,$scope.ujterasz,$scope.ujberelheto,$scope.ujhazhozszallitas,$scope.ujstatusz,$scope.ujweboldal,$scope.ujfacebook,$scope.ujtipus,$scope.ujwifi).then(function(res){
                        dbfactory.admindingingselect().then(function(res){
                            if(res.data.length>0)
                            {
                                $scope.ettermek=res.data;
                            }
                        });
                    })
                    $scope.unselectRow();
                }
            }
        })
       
    }
   
});