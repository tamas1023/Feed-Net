app.controller('etteremnyitvatartasCtrl',function($scope,$rootScope,dbfactory){
    $rootScope.sidebar=false;
    $scope.nyitas=[];
    $scope.modID=0;
    $scope.index=0;
    $scope.ujnap="Hétfő";
    if($rootScope.logJog=="etterem"){ 
        dbfactory.etteremid($rootScope.EtteremEmail).then(function(r){
             if(r.data.length>0)
             {
                 $rootScope.selectedetteremID=r.data[0].ID;
                 dbfactory.open($rootScope.selectedetteremID).then(function(res){
                     if(res.data.length>0)
                     {
                         $scope.nyitas=res.data;
                     }
                     
                 });
             }   
         });
     }
     else
     {
         dbfactory.open($rootScope.selectedetteremID).then(function(res){
             if(res.data.length>0)
             {
                 $scope.nyitas=res.data;
             }
         });
     }
     $scope.egyvalaszt=function(id)
     {
        $scope.modID=id;
     }
     $scope.select=function(id,adatid)
     {
        $scope.index=id;
        alert($scope.index);
        $scope.modID=adatid;
         $rootScope.felvesz=0;
         $scope.ujnyitas=new Date(moment.parseZone('12-25-1995 '+$scope.nyitas[id].Nyitas).format());
         $scope.ujzaras=new Date(moment.parseZone('12-25-1995 '+$scope.nyitas[id].Zaras).format());
         $scope.ujnap=$scope.nyitas[id].Nap;
     }
     $scope.update=function()
     {
       let zaras=new Date(moment.parseZone($scope.ujzaras).format('YYYY MM DD HH:mm:ss'));
       let zarasora=zaras.getHours();
       let zarasperc=zaras.getMinutes();
       let zarasvegleges=zarasora+":"+zarasperc;


       let nyitas=new Date(moment.parseZone($scope.ujnyitas).format('YYYY MM DD HH:mm:ss'));
       let nyitasora=nyitas.getHours();
       let nyitasperc=nyitas.getMinutes();
       let nyitasvegleges=nyitasora+":"+nyitasperc;
        if($rootScope.logJog=="etterem"&&$rootScope.selectedetteremID==$scope.nyitas[$scope.index].Etterem_ID)
        {
            dbfactory.openupdate($scope.modID,nyitasvegleges,zarasvegleges).then(function(res){
                dbfactory.open($rootScope.selectedetteremID).then(function(res){
                    if(res.data.length>0)
                    {
                        $scope.nyitas=res.data;
                    }
                });
            })
        }
        else
        {
            if($rootScope.logJog=="admin")
            {
                dbfactory.openupdate($scope.modID,nyitasvegleges,zarasvegleges).then(function(res){
                    dbfactory.open($rootScope.selectedetteremID).then(function(res){
                        if(res.data.length>0)
                        {
                            $scope.nyitas=res.data;
                        }
                    });
                })
            }
            else
            {
                alert('nem végezheted el ezt');
            }
        }
        
     }
     $scope.insert=function()
     {
         if($scope.ujnap==null||$scope.ujnyitas==null||$scope.ujzaras==null)
         {
             alert('Nincsenek az adatok megava');
         }
         else
         {
            let zaras=new Date(moment.parseZone($scope.ujzaras).format('YYYY MM DD HH:mm:ss'));
            let zarasora=zaras.getHours();
            let zarasperc=zaras.getMinutes();
            let zarasvegleges=zarasora+":"+zarasperc;
       
            let nyitas=new Date(moment.parseZone($scope.ujnyitas).format('YYYY MM DD HH:mm:ss'));
            let nyitasora=nyitas.getHours();
            let nyitasperc=nyitas.getMinutes();
            let nyitasvegleges=nyitasora+":"+nyitasperc;
               
               dbfactory.openinsert($rootScope.selectedetteremID,$scope.ujnap,nyitasvegleges,zarasvegleges).then(function(res){
                $scope.unselectRow();
                dbfactory.open($rootScope.selectedetteremID).then(function(res){
                       if(res.data.length>0)
                       {
                           $scope.nyitas=res.data;
                       }  
                   });
               })
         } 
     
     }
     $scope.unselectRow=function()
     {
         $rootScope.felvesz=1;
         $scope.ujnyitas=null;
         $scope.ujzaras=null;
         $scope.ujnap=null;
     }
     $scope.delete=function()
     {
        dbfactory.opendelete($scope.modID).then(function(res){
            $scope.unselectRow();
            dbfactory.open($rootScope.selectedetteremID).then(function(res){
                    $scope.nyitas=res.data;
            });
        })
     }
})