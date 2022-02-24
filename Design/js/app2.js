var app= new angular.module('Feed-Net',['ngAnimate']);

app.run(function($rootScope){
    $rootScope.title="Étterem";
    $rootScope.felvesz=1;
    $rootScope.felvesz2=1;
  
});
app.controller('etteremCtrl',function($scope,$rootScope){
    /* a  kisbetűs neveket min id nev lehet hogy ki kell cserélni majd ha az adatbázisból kapja
    az adatokat nagy betűsökre (itt is meg a html ben is)
    */ 
    $scope.ettermek=[];
    $scope.title="Étterem";
    $scope.teszt1="teszt1";
    $scope.etteremad=1;
    $scope.ettermek=[
        {id:1,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799462",parkolo:1,bankkartlya:0,glutenmentes:0,terasz:0,berelheto:1,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria hosszabb leírás hogy nézzük mit csinál ha sokkal több a szöveg ebben a box ban"},
        {id:2,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799463",parkolo:1,bankkartlya:0,glutenmentes:0,terasz:1,berelheto:1,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:3,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799464",parkolo:1,bankkartlya:0,glutenmentes:0,terasz:0,berelheto:0,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:4,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799465",parkolo:0,bankkartlya:0,glutenmentes:0,terasz:0,berelheto:1,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:5,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799466",parkolo:0,bankkartlya:0,glutenmentes:0,terasz:0,berelheto:0,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:6,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799467",parkolo:0,bankkartlya:0,glutenmentes:0,terasz:1,berelheto:0,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"}
    ];
    $scope.etlap=[
        {id:1,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"},
        {id:2,nev:"Harcsa leves",ar:950,leiras:"Harkcsa hús leves zöldségekkel"},
        {id:3,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"},
        {id:4,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"},
        {id:5,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"}
    ];
    $scope.selectRow=function($id){
       $scope.ujID=$scope.ettermek[$id-1].id;
        $scope.ujnev=$scope.ettermek[$id-1].nev;
        $scope.ujemail=$scope.ettermek[$id-1].email;
        $scope.ujtelefon=$scope.ettermek[$id-1].telefon;
        $scope.ujcim=$scope.ettermek[$id-1].cim;
        $scope.ujleiras=$scope.ettermek[$id-1].leiras;
        $scope.parkolo=$scope.ettermek[$id-1].parkolo;
        $rootScope.felvesz=0;
    }
    $scope.unselectRow=function()
    {
        $scope.ujID=null;
        $scope.ujnev=null;
        $scope.ujemail=null;
        $scope.ujtelefon=null;
        $scope.ujcim=null;
        $scope.ujleiras=null;
        $scope.parkolo=null;
        $rootScope.felvesz=1;
        
    }
    $scope.etterem=function($id){
        // adatok lekérdezése
        $rootScope.felvesz2=1;
        $scope.etteremad=0;
        $scope.ujnevetel=null;
        $scope.ujar=null;
        $scope.ujleirasetel=null;
        $scope.etlap=[{id:1,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"},
        {id:2,nev:"Harcsa leves",ar:950,leiras:"Harkcsa hús leves zöldségekkel"},
        {id:3,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"}];
       
        
    }
    $scope.selectRowEtlap=function($id)
    {
        $scope.ujID=$scope.etlap[$id-1].id;
        $scope.ujnevetel=$scope.etlap[$id-1].nev;
        $scope.ujar=$scope.etlap[$id-1].ar;
        $scope.ujleirasetel=$scope.etlap[$id-1].leiras;
        $rootScope.felvesz2=0;
    }
    $scope.unselectRowEtlap=function(){
        $rootScope.felvesz2=1;
        $scope.ujnevetel=null;
        $scope.ujar=null;
        $scope.ujleirasetel=null;
        
    }
    $scope.visszavaltasetterem=function()
    {
        $scope.ujID=null;
        $scope.ujnev=null;
        $scope.ujemail=null;
        $scope.ujtelefon=null;
        $scope.ujcim=null;
        $scope.ujleiras=null;
        $scope.parkolo=null;
        $rootScope.felvesz2=1;
        $rootScope.felvesz=1;
        $scope.etteremad=1;
    }
});
app.controller('felhasznalokCtrl',function($scope,$rootScope){
    
})