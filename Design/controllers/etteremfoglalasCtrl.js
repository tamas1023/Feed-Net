app.controller('etteremfoglalasCtrl',function($scope,$rootScope){
    $rootScope.sidebar=false;
    $scope.etteremhely=[
        {id:1,Nev:"Kis József",Kezdes:"2022:02:22 12:00:00",Fo:"3",EtteremID:"2"},
        {id:2,Nev:"Nagy Ödön",Kezdes:"2022:02:22 12:00:00",Fo:"3",EtteremID:"2"},
        {id:3,Nev:"Pista Józska",Kezdes:"2022:02:22 12:00:00",Fo:"3",EtteremID:"2"}
    ];
})