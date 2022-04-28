app.controller('etteremnyitvatartasCtrl',function($scope,$rootScope,dbfactory,Notify){
    $rootScope.sidebar=false;
    $scope.nyitas=[];
    $scope.nyitasmutat=[];
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
                         $scope.nyitasmutat=res.data;
                         for(let i=0;i<$scope.nyitasmutat.length;i++)
                         {
                            if($scope.nyitasmutat[i].Nyitas==null&&$scope.nyitasmutat[i].Zaras==null)
                             {
                                $scope.nyitasmutat[i].Nyitas="Zárva";
                                $scope.nyitasmutat[i].Zaras="Zárva";
                             }
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
                 $scope.nyitasmutat=res.data;
                 for(let i=0;i<$scope.nyitasmutat.length;i++)
                 {
                    if($scope.nyitasmutat[i].Nyitas==null&&$scope.nyitasmutat[i].Zaras==null)
                     {
                        $scope.nyitasmutat[i].Nyitas="Zárva";
                        $scope.nyitasmutat[i].Zaras="Zárva";
                     }
                 }
             }
         });
     }
     $scope.select=function(id,adatid)
     {
        $scope.index=id;
        $scope.modID=adatid;
         $rootScope.felvesz=0;
         if($scope.nyitas[id].Nyitas=="Zárva"&&$scope.nyitas[id].Zaras=="Zárva")
         {
            $scope.ujnyitas=new Date(moment.parseZone('12-25-1995 '+"00:00:00").format());
            $scope.ujzaras=new Date(moment.parseZone('12-25-1995 '+"00:00:00").format());
            $scope.ujnap=$scope.nyitas[id].Nap;
         }
         else
         {
            $scope.ujnyitas=new Date(moment.parseZone('12-25-1995 '+$scope.nyitas[id].Nyitas).format());
            $scope.ujzaras=new Date(moment.parseZone('12-25-1995 '+$scope.nyitas[id].Zaras).format());
            $scope.ujnap=$scope.nyitas[id].Nap;
        }
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
       let napid=0;
       if($scope.ujnap=="Vasárnap")
       {
           napid=1;
       }
       if($scope.ujnap=="Hétfő")
       {
           napid=2;
       }
       if($scope.ujnap=="Kedd")
       {
           napid=3;
       }
       if($scope.ujnap=="Szerda")
       {
           napid=4;
       }
       if($scope.ujnap=="Csütörtök")
       {
           napid=5;
       }
       if($scope.ujnap=="Péntek")
       {
           napid=6;
       }
       if($scope.ujnap=="Szombat")
       {
           napid=7;
       }
       if(nyitasvegleges=="0:0"&&zarasvegleges=="0:0")
        {
            nyitasvegleges=null;
            zarasvegleges=null;
        }
        if($rootScope.logJog=="etterem"&&$rootScope.selectedetteremID==$scope.nyitas[$scope.index].Etterem_ID)
        {
            dbfactory.openupdate($scope.modID,nyitasvegleges,zarasvegleges,napid,$scope.ujnap).then(function(res){
                dbfactory.open($rootScope.selectedetteremID).then(function(res){
                    if(res.data.length>0)
                    {
                        $scope.nyitas=res.data;
                        $scope.nyitasmutat=res.data;
                        for(let i=0;i<$scope.nyitasmutat.length;i++)
                        {
                            if($scope.nyitasmutat[i].Nyitas==null&&$scope.nyitasmutat[i].Zaras==null)
                            {
                               $scope.nyitasmutat[i].Nyitas="Zárva";
                               $scope.nyitasmutat[i].Zaras="Zárva";
                            }
                        }
                    }
                });
            })
        }
        else
        {
            if($rootScope.logJog=="admin")
            {
                
                dbfactory.openupdate($scope.modID,nyitasvegleges,zarasvegleges,napid,$scope.ujnap).then(function(res){
                    dbfactory.open($rootScope.selectedetteremID).then(function(res){
                        if(res.data.length>0)
                        {
                            $scope.nyitas=res.data;
                            $scope.nyitasmutat=res.data;
                            for(let i=0;i<$scope.nyitasmutat.length;i++)
                            {
                                if($scope.nyitasmutat[i].Nyitas==null&&$scope.nyitasmutat[i].Zaras==null)
                                {
                                   $scope.nyitasmutat[i].Nyitas="Zárva";
                                   $scope.nyitasmutat[i].Zaras="Zárva";
                                }
                            }
                        }
                    });
                })
            }
            else
            {
                
                Notify.addMessage('Nem végezheted el ezt ', "danger");
            }
        }
        
     }
     $scope.insert=function()
     {
         if($scope.ujnap==null||$scope.ujnyitas==null||$scope.ujzaras==null)
         {
             
             Notify.addMessage('Nincsenek az adatok megava', "danger");
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
            let napid=0;
            if($scope.ujnap=="Vasárnap")
            {
                napid=1;
            }
            if($scope.ujnap=="Hétfő")
            {
                napid=2;
            }
            if($scope.ujnap=="Kedd")
            {
                napid=3;
            }
            if($scope.ujnap=="Szerda")
            {
                napid=4;
            }
            if($scope.ujnap=="Csütörtök")
            {
                napid=5;
            }
            if($scope.ujnap=="Péntek")
            {
                napid=6;
            }
            if($scope.ujnap=="Szombat")
            {
                napid=7;
            }
            if(nyitasvegleges=="0:0"&&zarasvegleges=="0:0")
            {
                nyitasvegleges=null;
                zarasvegleges=null;
            }
            if($rootScope.logJog=="etterem"&&$rootScope.selectedetteremID==$scope.nyitas[$scope.index].Etterem_ID)
            {
                dbfactory.openinsert($rootScope.selectedetteremID,$scope.ujnap,nyitasvegleges,zarasvegleges,napid).then(function(res){
                    $scope.unselectRow();
                    dbfactory.open($rootScope.selectedetteremID).then(function(res){
                           if(res.data.length>0)
                           {
                               $scope.nyitas=res.data;
                               $scope.nyitasmutat=res.data;
                               for(let i=0;i<$scope.nyitasmutat.length;i++)
                               {
                                if($scope.nyitasmutat[i].Nyitas==null&&$scope.nyitasmutat[i].Zaras==null)
                                   {
                                      $scope.nyitasmutat[i].Nyitas="Zárva";
                                      $scope.nyitasmutat[i].Zaras="Zárva";
                                   }
                               }
                           }  
                       });
                   })
            }
            else
            {
                if($rootScope.logJog=="admin")
                {
                    dbfactory.openinsert($rootScope.selectedetteremID,$scope.ujnap,nyitasvegleges,zarasvegleges,napid).then(function(res){
                        $scope.unselectRow();
                        dbfactory.open($rootScope.selectedetteremID).then(function(res){
                               if(res.data.length>0)
                               {
                                   $scope.nyitas=res.data;
                                   $scope.nyitasmutat=res.data;
                                   for(let i=0;i<$scope.nyitasmutat.length;i++)
                                   {
                                    if($scope.nyitasmutat[i].Nyitas==null&&$scope.nyitasmutat[i].Zaras==null)
                                       {
                                          $scope.nyitasmutat[i].Nyitas="Zárva";
                                          $scope.nyitasmutat[i].Zaras="Zárva";
                                       }
                                   }
                               }  
                           });
                       })
                }
                else
                {
                    
                    Notify.addMessage('Nem végezheted el ezt', "danger");
                }
            }
               
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
                    $scope.nyitasmutat=res.data;
                    for(let i=0;i<$scope.nyitasmutat.length;i++)
                    {
                        if($scope.nyitasmutat[i].Nyitas==null&&$scope.nyitasmutat[i].Zaras==null)
                        {
                           $scope.nyitasmutat[i].Nyitas="Zárva";
                           $scope.nyitasmutat[i].Zaras="Zárva";
                        }
                    }
            });
        })
     }
     $scope.unselectRow();
})