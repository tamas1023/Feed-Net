app.controller('etteremetlapCtrl',function($scope,$rootScope,$location,dbfactory){

    $rootScope.felvesz2=1;
        $scope.etteremad=0;
        $scope.ujnevetel=null;
        $scope.ujar=null;
        $scope.ujleirasetel=null;
        $rootScope.sidebar=false;
        $scope.etlap=[];
        $scope.torolegyid=0;
        //alert($rootScope.selectedetteremID);
        dbfactory.adminfoodselect($rootScope.selectedetteremID).then(function(res){
            if(res.data.length>0)
            {
                $scope.etlap=res.data;
            }
           //console.log(res.data.length);
        });
        $scope.visszavaltas=function(){
            $location.path('#!/admin');
        }
        $scope.selectRowEtlap=function($id)
        {
            $scope.ujID=$scope.etlap[$id].ID;
            $scope.ujnevetel=$scope.etlap[$id].Nev;
            $scope.ujar=$scope.etlap[$id].Ar;
            $scope.ujleirasetel=$scope.etlap[$id].Leiras;
            $rootScope.felvesz2=0;
            //alert($scope.ujID);
        }
        $scope.unselectRowEtlap=function(){
            $rootScope.felvesz2=1;
            $scope.ujnevetel=null;
            $scope.ujar=null;
            $scope.ujleirasetel=null;
        }
            
        $scope.insertEtlap=function()
        {
            if($scope.ujnevetel==null|| $scope.ujar==null|| $scope.ujleirasetel==null)
            {
                alert('a kellő adatok nincsenek kitöltve ');
            }
            else
            {
                dbfactory.adminfoodinsert($rootScope.selectedetteremID,$scope.ujnevetel,$scope.ujar, $scope.ujleirasetel).then(function(res){
                    dbfactory.adminfoodselect($rootScope.selectedetteremID).then(function(res){
                        if(res.data.length>0)
                        {
                            $scope.etlap=res.data;
                        }
                       //console.log(res.data.length);
                    });
                })
                $scope.unselectRowEtlap();
            }
           
        }
        $scope.egyvalaszt=function(id)
        {
            $scope.torolegyid=$scope.etlap[id].ID;
        }
        $scope.deleteRecord=function()
        {
            dbfactory.adminfooddelete($scope.torolegyid).then(function(res){
                dbfactory.adminfoodselect($rootScope.selectedetteremID).then(function(res){
                    if(res.data.length>0)
                    {
                        $scope.etlap=res.data;
                    }
                    $scope.unselectRowEtlap();
                   //console.log(res.data.length);
                });
            })
        }
        $scope.updateEtlap=function()
        {
            dbfactory.adminfoodupdate($scope.ujID,$rootScope.selectedetteremID,$scope.ujnevetel,$scope.ujar,$scope.ujleirasetel).then(function(res){
                dbfactory.adminfoodselect($rootScope.selectedetteremID).then(function(res){
                    if(res.data.length>0)
                    {
                        $scope.etlap=res.data;
                    }
                    $scope.unselectRowEtlap();
                   //console.log(res.data.length);
                });
            })
        }
})