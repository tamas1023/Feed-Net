app.controller('helyfoglalasCtrl',function($scope,$rootScope,dbfactory){
    $rootScope.sidebar=false;
    $scope.helyfoglalas=[];
    $scope.modID=0;
    $scope.helyfoglalasSelect=function()
{
    dbfactory.reservationSelect($rootScope.loggedInUserID).then(function(res){
        if(res.data.length>0)
        {
            $scope.helyfoglalas=res.data;
        }
        for(let i=0;i<$scope.helyfoglalas.length;i++)
        {
            $scope.helyfoglalas[i].Kezdes=moment($scope.helyfoglalas[i].Kezdes).format('YYYY MM DD HH:mm:ss');
        }
        
    })
}
$scope.helyfoglalasSelect();
    $scope.select=function(index,id)
        {
            $scope.modID=id;
           $scope.ujfo=$scope.helyfoglalas[index].Fo;
           $scope.ujdatum=new Date(moment.parseZone($scope.helyfoglalas[index].Kezdes).format('YYYY MM DD HH:mm:ss'));
        }
        $scope.delete=function()
        {
            dbfactory.reservationDelete($scope.modID).then(function(r){
               $scope.helyfoglalasSelect();
            })
        }
        $scope.update=function()
        {

        }
})