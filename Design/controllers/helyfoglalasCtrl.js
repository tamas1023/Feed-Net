app.controller('helyfoglalasCtrl',function($scope,$rootScope,dbfactory){
    $rootScope.sidebar=false;
    $scope.helyfoglalas=[];
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
})