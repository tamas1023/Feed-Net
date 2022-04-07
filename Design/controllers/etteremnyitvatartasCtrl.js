app.controller('etteremnyitvatartasCtrl',function($scope,$rootScope,dbfactory){
    $rootScope.sidebar=false;
    $scope.nyitas=[];
    $scope.modID=0;
    if($rootScope.logJog=="etterem"){ 
        dbfactory.etteremid($rootScope.EtteremEmail).then(function(r){
             if(r.data.length>0)
             {
                 $rootScope.selectedetteremID=r.data[0].ID;
                 dbfactory.open($rootScope.selectedetteremID).then(function(res){
                     if(res.data.length>0)
                     {
                         $scope.nyitas=res.data;
                         for(let i=0;i<$scope.nyitas.length;i++)
                         {
                            let nyitasdate=new Date(moment('12-25-1995 '+$scope.nyitas[i].Nyitas).format('YYYY MM DD HH:mm:ss',true));
                            let nyitasora=nyitasdate.getHours();
                            let nyitasperc=nyitasdate.getMinutes();
                            $scope.nyitas[i].Nyitas=nyitasora+":"+nyitasperc;
                            console.log(nyitasora+":"+nyitasperc);
                            //alert($scope.nyitas[i].Nyitas);
                            
                            let zarasdate=new Date(moment('12-25-1995 '+$scope.nyitas[i].Zaras).format('YYYY MM DD HH:mm:ss',true));
                            let zarasora=zarasdate.getHours();
                            let zarasperc=zarasdate.getMinutes();
                            $scope.nyitas[i].Zaras=zarasora+":"+zarasperc;
                        }
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
                 for(let i=0;i<$scope.nyitas.length;i++)
                         {/*
                            let nyitasdate=new Date(moment('12-25-1995 '+$scope.nyitas[i].Nyitas).format('YYYY MM DD HH:mm:ss'));
                            let nyitasora=nyitasdate.getHours();
                            let nyitasperc=nyitasdate.getMinutes();
                            $scope.nyitas[i].Nyitas=nyitasora+":"+nyitasperc;
                            console.log(nyitasora+":"+nyitasperc);
                            //alert($scope.nyitas[i].Nyitas);
                            
                            let zarasdate=new Date(moment('12-25-1995 '+$scope.nyitas[i].Zaras).format('YYYY MM DD HH:mm:ss'));
                            let zarasora=zarasdate.getHours();
                            let zarasperc=zarasdate.getMinutes();
                            $scope.nyitas[i].Zaras=zarasora+":"+zarasperc;*/


                            /*$scope.nyitas[i].Nyitas=new Date( $scope.nyitas[i].Nyitas);
                            $scope.nyitas[i].Zaras=new Date( $scope.nyitas[i].Zaras);*/
                        }
             }
         });
     }
     $scope.egyvalaszt=function(id)
     {
        $scope.modID=id;
     }
     $scope.select=function(id)
     {
         $rootScope.felvesz=0;
         $scope.ujnyitas=new Date(moment('12-25-1995 '+$scope.nyitas[id].Nyitas).format());
         $scope.ujzaras=new Date(moment('12-25-1995 '+$scope.nyitas[id].Zaras).format());
         $scope.ujnap=$scope.nyitas[id].Nap;
     }
     $scope.update=function()
     {
        alert($scope.ujzaras);
       let zaras=new Date(moment($scope.ujzaras).format('YYYY MM DD HH:mm:ss'));
       let zarasora=zaras.getHours();
       let zarasperc=zaras.getMinutes();
       let zarasvegleges=zarasora+":"+zarasperc;


       let nyitas=new Date(moment($scope.ujnyitas).format('YYYY MM DD HH:mm:ss'));
       let nyitasora=nyitas.getHours();
       let nyitasperc=nyitas.getMinutes();
       let nyitasvegleges=nyitasora+":"+nyitasperc;
       alert(nyitasvegleges);
        dbfactory.openupdate($scope.modID,nyitasvegleges,zarasvegleges).then(function(res){
            dbfactory.open($rootScope.selectedetteremID).then(function(res){
                if(res.data.length>0)
                {
                    $scope.nyitas=res.data;
                }
            });
        })
     }
     $scope.insert=function()
     {
        
        dbfactory.openinsert($rootScope.selectedetteremID,$scope.ujnap,$scope.ujnyitas,$scope.ujzaras).then(function(res){
            dbfactory.open($rootScope.selectedetteremID).then(function(res){
                if(res.data.length>0)
                {
                    $scope.nyitas=res.data;
                }
            });
        })
     }
     $scope.unselectRow=function()
     {
         $rootScope.felvesz=1;
         $scope.ujnyitas=null;
         $scope.ujzaras=null;
         $scope.ujnap=null;
     }
})