app.controller('etteremfoglalasCtrl',function($scope,$rootScope,dbfactory){
    $rootScope.sidebar=false;
    $scope.etteremhely=[];
    $scope.etteremid=0;
    $scope.mostido;
    $scope.regiadat=0;
    $scope.feltetel=" AND CURRENT_TIMESTAMP<Kezdes";
    $scope.selectrendeles=function()
     {
        dbfactory.etteremid($rootScope.EtteremEmail).then(function(r){
            if(r.data.length>0)
            {
                $scope.etteremid=r.data[0].ID;
                 dbfactory.etteremselect($scope.etteremid,$scope.feltetel).then(function(res){
                if(res.data.length>0)
                {
                    $scope.etteremhely=res.data;
                    $scope.mostido=moment(res.data[0].ido).format('YYYY MM DD HH:mm:ss');
                    for(let i=0;i<$scope.etteremhely.length;i++)
                    {
                        $scope.etteremhely[i].Kezdes=moment($scope.etteremhely[i].Kezdes).format('YYYY MM DD HH:mm:ss');
                    }
                }
            });
            }
        });
     };
    $scope.selectrendeles();
    $scope.torol=function()
    {
        dbfactory.etteremdelete($scope.id).then(function(r){
            dbfactory.etteremselect($scope.etteremid,$scope.feltetel).then(function(res){
                if(res.data.length>0)
                {
                    $scope.etteremhely=res.data;
                    for(let i=0;i<$scope.etteremhely.length;i++)
                    {
                        $scope.etteremhely[i].Kezdes=moment($scope.etteremhely[i].Kezdes).format('YYYY MM DD HH:mm:ss');
                    }
                }
            });
          })
    }
    $scope.regiadatok=function()
    {
        $scope.regiadat=($scope.regiadat)? true : false;
        if($scope.regiadat)
        {
            $scope.feltetel=" AND CURRENT_TIMESTAMP<Kezdes";
            $scope.selectrendeles();
        }
        else
        {
            $scope.feltetel=" ";
            $scope.selectrendeles();
        }
    }
    $scope.select=function(id)
    {
        $scope.id=$scope.etteremhely[id].ID;
        $scope.ujfo=$scope.etteremhely[id].Fo;
        $scope.ujkezdes=new Date($scope.etteremhely[id].Kezdes);

    }
})