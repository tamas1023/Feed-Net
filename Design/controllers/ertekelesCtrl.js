app.controller('ertekelesCtrl',function($scope,$rootScope,dbfactory){
    $scope.torolegyid=0;
    $rootScope.sidebar=false;
    $scope.ertekelesek=[];
    dbfactory.ratingselect().then(function(res){
        if(res.data.length>0)
        {
            $scope.ertekelesek=res.data;
        }
        for(let i=0;i<$scope.ertekelesek.length;i++)
        {
            $scope.ertekelesek[i].Datum=moment($scope.ertekelesek[i].Datum).format('YYYY MM DD HH:mm:ss');
        }
    });
    $scope.selectRow=function(id)
    {
        $scope.torolegyid=$scope.ertekelesek[id].ID;
    }
    $scope.delete=function()
    { 
        dbfactory.ratingdelete($scope.torolegyid).then(function(res){
            dbfactory.ratingselect().then(function(res){
                if(res.data.length>0)
                {
                    $scope.ertekelesek=res.data;
                }
                for(let i=0;i<$scope.ertekelesek.length;i++)
                {
                    $scope.ertekelesek[i].Datum=moment($scope.ertekelesek[i].Datum).format('YYYY MM DD HH:mm:ss');;
                }
            });
        });
    }
})