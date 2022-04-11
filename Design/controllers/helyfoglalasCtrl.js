app.controller('helyfoglalasCtrl',function($scope,$rootScope,dbfactory){
    $rootScope.sidebar=false;
    $scope.helyfoglalas=[];
    $scope.modID=0;
    $scope.serverido=new Date();
    $scope.regidatum=new Date();
    $scope.regiadat=0;
    $scope.feltetel=" AND CURRENT_TIMESTAMP<Kezdes";
    dbfactory.time().then(function(res){
        $scope.serverido=new Date(moment.parseZone(res.data[0].Ido).format('YYYY MM DD HH:mm:ss'));
        $scope.serverido.setHours($scope.serverido.getHours()+12);
    })
    $scope.helyfoglalasSelect=function()
{
    dbfactory.reservationSelect($rootScope.loggedInUserID, $scope.feltetel).then(function(res){
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
           $scope.regidatum=new Date(moment.parseZone($scope.helyfoglalas[index].Kezdes).format('YYYY MM DD HH:mm:ss'));
        }
        $scope.delete=function()
        {
            if($scope.regidatum>$scope.serverido)
            {
                dbfactory.reservationDelete($scope.modID).then(function(r){
                    $scope.helyfoglalasSelect();
                 })
            }
            else
            {
                alert('nem módosítható');
            }
           
        }
        $scope.update=function()
        {

            //kellenek a feltételek

            if($scope.ujdatum>$scope.serverido&&$scope.regidatum>$scope.serverido)
            {
                dbfactory.reservationUpdate( $scope.modID,$scope.ujdatum,$scope.ujfo).then(function(res){
                    $scope.helyfoglalasSelect();
                })
            }
            else
            {
                alert('nem módosítható');
            }
        }
        $scope.regiadatok=function()
        {
            $scope.regiadat=($scope.regiadat)? true : false;
            if($scope.regiadat)
            {
                $scope.feltetel=" AND CURRENT_TIMESTAMP<Kezdes";
                $scope.helyfoglalasSelect();
            }
            else
            {
                $scope.feltetel=" ";
                $scope.helyfoglalasSelect();
            }
        }
})