app.controller('ettermekCtrl',function($rootScope,$scope,dbfactory){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $scope.feltétel=1;

    
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
        /*
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3 ☆},
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3},
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3},
        {id:1,nev:"Bajai Étterem ",kep:"Link ",ertekeles:3},*/

    ];
    $scope.kedvencettermek=[
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/rozsaetterem.jpg",ertekeles:"5 "},
        {id:1,nev:"Kedvenc Étterem ",kep:"img/kedvencetterem.jpg",ertekeles:"5 "},
    ]
    $scope.Szures=function () {
        alert("Katt");
        dbfactory.selectCustom("ettermek",$scope.feltétel).then(function(res) {
            if (res.length > 0) {
                alert("Jött adat");
                console.log(res);
            } else {
                alert("Nem jött adat");
                console.log(res);
            }
        });
    }
    

});

