app.controller('etteremkepekCtrl',function($scope,$rootScope,dbfactory,Notify){
    $rootScope.sidebar=false;
    $scope.kepek=[];
    $scope.modID=0;
   $scope.selectimage=function()
   {
    if($rootScope.logJog=="etterem"){ 
        dbfactory.etteremid($rootScope.EtteremEmail).then(function(r){
             if(r.data.length>0)
             {
                 $rootScope.selectedetteremID=r.data[0].ID;
                 dbfactory.imageselect($rootScope.selectedetteremID).then(function(res){
                     if(res.data.length>0)
                     {
                         $scope.kepek=res.data;
                         for(let i=0;i<$scope.kepek.length;i++)
                         {
                            $scope.kepek[i].Kepek=$scope.kepek[i].Kepek.replace('img/',' ');
                         }
                     }
                    
                 });
             }   
         });
     }
     else
     {
         dbfactory.imageselect($rootScope.selectedetteremID).then(function(res){
             if(res.data.length>0)
             {
                $scope.kepek=res.data;
                for(let i=0;i<$scope.kepek.length;i++)
                {
                    $scope.kepek[i].Kepek=$scope.kepek[i].Kepek.replace('img/',' ');
                }
             }
         });
     }
   }
   $scope.selectimage();
     $scope.select=function(id,index)
     {
         $scope.modID=id;
         $scope.ujkep=$scope.kepek[index].Kepek;
     }
     $scope.insert=function()
     {
         if($scope.addkep==null||$scope.addkep=="")
         {
             
             Notify.addMessage('Nincs kitöltve a kép neve ', "danger");
         }
         else
         {
             let inset="img/"+$scope.addkep;
            dbfactory.imageinsert($rootScope.selectedetteremID,inset).then(function(res){
                $scope.selectimage();
                $scope.addkep==null;
             })
         }
        
         
     }
     $scope.update=function()
     {
        if($scope.ujkep==null||$scope.ujkep=="")
        {
            
            Notify.addMessage('Nincs kitöltve a kép neve ', "danger");
        }
        else
        {
            let inset="img/"+$scope.ujkep;
           dbfactory.imageupdate($scope.modID,inset).then(function(res){
               $scope.selectimage();
            })
        }
     }
     $scope.delete=function()
     {
         dbfactory.imagedelete($scope.modID).then(function(res){
            $scope.selectimage();
         })
     }
     $scope.unselectrow=function()
     {
         $scope.addkep=null;
     }
})