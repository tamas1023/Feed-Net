app.controller('profilmodCtrl',function($scope,$rootScope,dbfactory){
    $rootScope.sidebar=false;
    $scope.deleteRecord=function()
    {
        /*dbfactory.profildelete(7).then(function(res){
            console.log(res);
        })*/
    }
})