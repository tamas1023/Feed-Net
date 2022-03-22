app.controller('etteremfoglalasCtrl',function($scope,$rootScope,dbfactory){
    $rootScope.sidebar=false;
    $scope.etteremhely=[];
    $scope.etteremid=0;
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
                    //alert($scope.etteremhely[i].Kezdes);
                    $scope.etteremhely[i].Kezdes=moment($scope.etteremhely[i].Kezdes).format('YYYY MM DD HH:mm:ss');
                    //alert($scope.etteremhely[i].Kezdes);
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
                        $scope.etteremhely[i].Kezdes=moment($scope.etteremhely[i].Kezdes).format('YYYY MM DD HH:mm:ss');
                    }
                }
            });
          })
    }
    
    $scope.modosit=function()
    {
        let year=$scope.ujkezdes.getFullYear();
        let month=$scope.ujkezdes.getMonth()+1;
        let day=$scope.ujkezdes.getDate();
        let hours=$scope.ujkezdes.getHours();
        let minutes=$scope.ujkezdes.getMinutes();
        let seconds=$scope.ujkezdes.getSeconds();
        if(month<=9)
        {
            month="0"+month;
        }
        if(day<=9)
        {
            day="0"+day;
        }
        if(hours<=9)
        {
            hours="0"+hours;
        }
        if(minutes<=9)
        {
            minutes="0"+minutes;
        }
        if(seconds<=9)
        {
            seconds="0"+seconds;
        }
        let str=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        //alert(str);
        //alert(moment($scope.ujkezdes,"YY-MM-DD hh:mm:ss"));
        dbfactory.etteremupdate($scope.id,$scope.ujfo,str).then(function(r){
            dbfactory.etteremselect($scope.etteremid).then(function(res){
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
    $scope.select=function(id)
    {
        $scope.id=$scope.etteremhely[id].ID;
        $scope.ujfo=$scope.etteremhely[id].Fo;
        $scope.ujkezdes=new Date($scope.etteremhely[id].Kezdes);

    }
})