app.controller('hibajelentesekCtrl',function($scope,$rootScope,dbfactory){
    $scope.torolegyid=0;
    $scope.hibak=[];
    dbfactory.errorselect().then(function(res){
        if(res.data.length>0)
        {
            $scope.hibak=res.data;
        }
    });
  
    $scope.egyvalaszt=function(id)
    {
        $scope.torolegyid=$scope.hibak[id].ID;
    }
    $scope.delete=function()
    {
        
        dbfactory.errordelete($scope.torolegyid).then(function(res){
            dbfactory.errorselect().then(function(res){
                if(res.data.length>0)
                {
                    $scope.hibak=res.data;
                }
            });
        });
       
    }
})