app.controller('ettermekCtrl',function($rootScope,$scope,dbfactory){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $scope.feltétel=1;
    $scope.ettermek=[];
    dbfactory.selectCustom("ettermek",$scope.feltétel).then(function(res) {
        if (res.data.length > 0) {
            
            console.log(res.data);
            $scope.ettermek=res.data;
        } else {
            
            
        }
        
    });
    console.log("Étterem");
    console.log($scope.ettermek);
    /*
    $scope.ettermek=[
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 ",kartya:1},
        
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 ",kartya:0},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:1,nev:"Bajai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},

        {id:2,nev:"Kecskeméti Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"2 "},
        {id:3,nev:"Pesti Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"3 "},
        {id:4,nev:"Baranyai Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"4 "},
        {id:5,nev:"Péceli Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        

    ];*/
    $scope.kedvencettermek=[
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
    ]
    $scope.Szures=function () {
        
        dbfactory.selectCustom("ettermek",$scope.feltétel).then(function(res) {
            if (res.length > 0) {
                
                console.log(res);
            } else {
                
                console.log(res);
            }
        });
    }
    

});

