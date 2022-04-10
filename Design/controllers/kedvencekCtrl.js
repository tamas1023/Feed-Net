app.controller('kedvencekCtrl',function($rootScope,$scope,dbfactory){
    $rootScope.sidebar=false;
    
    
    $rootScope.nincsetterem="Nincsen még kedvenc éttermed.";
    
    $scope.idk=[];
    $scope.feltetel=" Felhasznalo_ID="+$rootScope.loggedInUserID;
    $scope.kedvencek="";
    dbfactory.selectCustom("kedvenc",$scope.feltetel).then(function(res) {
        if (res.data.length > 0) { 
            //van kedvenc étterem
            $rootScope.nincsetterem="";
            for (let i = 0; i < res.data.length; i++) {
                $scope.idk.push({"id":res.data[i].Etterem_ID});
                //console.log(res.data);
                
            }
            //console.log($scope.idk);
            for (let i = 0; i < $scope.idk.length; i++) {
            
                if (i==$scope.idk.length-1) {
                    $scope.kedvencek+=" ID="+$scope.idk[i].id+" ";
                }
                else{
                    $scope.kedvencek+=" ID="+$scope.idk[i].id+" OR ";
                }
            }
            //console.log($scope.kedvencek);

            $scope.kedvencek+=" AND Statusz=1";
            dbfactory.selectCustom("ettermek_ertekelesek",$scope.kedvencek).then(function(res) {
                if (res.data.length > 0) { 
                    $rootScope.nincsetterem="";
                    //$scope.kedvencettermek=res.data;
                    $scope.kedvencettermek=res.data;
                } 
                
            });
            
        } 
        else
        {
            //nincs kedvenc étterem

            $rootScope.nincsetterem="Nincsen még kedvenc éttermed.";
        }
        
    });

    

    /*
    $scope.kedvencettermek=[
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
    ]
    */
})