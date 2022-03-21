app.controller('etteremfoglalasCtrl',function($scope,$rootScope,dbfactory){
    $rootScope.sidebar=false;
    $scope.etteremhely=[];
    $scope.etteremid=0;
    $scope.etteremhely=[
        {id:1,Nev:"Kis József",Kezdes:"2022:02:22 12:00:00",Fo:"3",EtteremID:"2"},
        {id:2,Nev:"Nagy Ödön",Kezdes:"2022:02:22 12:00:00",Fo:"3",EtteremID:"2"},
        {id:3,Nev:"Pista Józska",Kezdes:"2022:02:22 12:00:00",Fo:"3",EtteremID:"2"}
    ];
    dbfactory.etteremid($rootScope.EtteremEmail).then(function(r){
        if(r.data.length>0)
        {
            $scope.etteremid=r.data[0].ID;
             dbfactory.etteremselect($scope.etteremid).then(function(res){
            if(res.data.length>0)
            {
                $scope.etteremhely=res.data;
                for(let i=0;i<$scope.etteremhely.length;i++)
                {
                    $scope.etteremhely[i].Kezdes=$scope.etteremhely[i].Kezdes.replace("T"," ").replace(".000Z"," ");
                }
            }
        });
        }
    });
   
    $scope.torol=function()
    {
        dbfactory.etteremdelete($scope.id).then(function(r){
            dbfactory.etteremselect($scope.etteremid).then(function(res){
                if(res.data.length>0)
                {
                    $scope.etteremhely=res.data;
                    for(let i=0;i<$scope.etteremhely.length;i++)
                    {
                        $scope.etteremhely[i].Kezdes=$scope.etteremhely[i].Kezdes.replace("T"," ").replace(".000Z"," ");
                    }
                }
            });
          })
    }
    
    $scope.modosit=function()
    {
        //let str=$scope.ujkezdes.toString().replace("T"," ").replace(".000Z"," ");
        dbfactory.etteremupdate($scope.id,$scope.ujfo,moment($scope.ujkezdes,"YY-MM-DD hh:mm:ss")).then(function(r){
            dbfactory.etteremselect($scope.etteremid).then(function(res){
                if(res.data.length>0)
                {
                    $scope.etteremhely=res.data;
                    for(let i=0;i<$scope.etteremhely.length;i++)
                    {
                        $scope.etteremhely[i].Kezdes=$scope.etteremhely[i].Kezdes.replace("T"," ").replace(".000Z"," ");
                    }
                }
            });
          })
    }
    $scope.select=function(id)
    {
        $scope.id=$scope.etteremhely[id].ID;
        $scope.ujfo=$scope.etteremhely[id].Fo;
        $scope.ujkezdes=new Date($scope.etteremhely[id].Kezdes);

    }
})