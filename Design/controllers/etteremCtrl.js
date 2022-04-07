app.controller('etteremCtrl',function($scope,$rootScope,$location,dbfactory){

   
    $scope.ettermek=[];
    $scope.title="Étterem";
    $scope.teszt1="teszt1";
    $rootScope.sidebar=false;
    $scope.etteremad=1;
    $scope.ModID=0;
    dbfactory.admindingingselect().then(function(res){
        if(res.data.length>0)
        {
            $scope.ettermek=res.data;
        }
       //console.log(res.data.length);
    });
    $scope.selectRow=function($id){
       $scope.ModID=$scope.ettermek[$id].ID;
        $scope.ujnev=$scope.ettermek[$id].Nev;
        $scope.ujemail=$scope.ettermek[$id].Email;
        $scope.ujtelefon=$scope.ettermek[$id].Telefon;
        $scope.ujcim=$scope.ettermek[$id].Cim;
        $scope.ujleiras=$scope.ettermek[$id].Leiras;
       // $scope.parkolo=$scope.ettermek[$id].Parkolo;
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
        dbfactory.emailcheck('ettermek',$scope.ujemail).then(function(res){
            if(res.data.length>0)
            {
                alert('Ez az email cím már foglalat');
            }
            else
            {
                dbfactory.admindiningupdate($scope.ModID,$scope.ujnev,$scope.ujemail,$scope.ujtelefon,$scope.ujcim,$scope.ujferohely,$scope.ujleiras,$scope.ujparkolo,$scope.ujbankkartya,$scope.ujglutenmentes,$scope.ujterasz,$scope.ujberelheto,$scope.ujhazhozszallitas,$scope.ujstatusz).then(function(res){
            
                    dbfactory.admindingingselect().then(function(res){
                        if(res.data.length>0)
                        {
                            $scope.ettermek=res.data;
                        }
                       //console.log(res.data.length);
                    });
                    $scope.unselectRow();
                })
            }
        })
       
    }
    $scope.unselectRow=function()
    {
        $scope.ujID=null;
        $scope.ujnev=null;
        $scope.ujemail=null;
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
                alert('Ez az email cím már foglalat');
            }
            else
            {
                if($scope.ujnev==null|| $scope.ujemail==null||$scope.ujtelefon==null||$scope.ujcim==null||$scope.ujleiras==null)
                {
                    alert('a kellő adatok nincsenek kitöltve ')
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
                    dbfactory.admindininginsert($scope.ModID,$scope.ujnev,$scope.ujemail,$scope.ujtelefon,$scope.ujcim,$scope.ujferohely,$scope.ujleiras,$scope.ujparkolo,$scope.ujbankkartya,$scope.ujglutenmentes,$scope.ujterasz,$scope.ujberelheto,$scope.ujhazhozszallitas,$scope.ujstatusz).then(function(res){
                        dbfactory.admindingingselect().then(function(res){
                            if(res.data.length>0)
                            {
                                $scope.ettermek=res.data;
                            }
                        //console.log(res.data.length);
                        });
                    })
                    $scope.unselectRow();
                }
            }
        })
       
    }
});