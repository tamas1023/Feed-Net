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
        
        {id:3,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799464",parkolo:1,bankkartlya:0,glutenmentes:0,terasz:0,berelheto:0,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:4,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799465",parkolo:0,bankkartlya:0,glutenmentes:0,terasz:0,berelheto:1,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
    
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
       $scope.ujID=$scope.ettermek[$id].id;
        $scope.ujnev=$scope.ettermek[$id].nev;
        $scope.ujemail=$scope.ettermek[$id].email;
        $scope.ujtelefon=$scope.ettermek[$id].telefon;
        $scope.ujcim=$scope.ettermek[$id].cim;
        $scope.ujleiras=$scope.ettermek[$id].leiras;
        $scope.parkolo=$scope.ettermek[$id].parkolo;
        $scope.ujparkolo=$scope.ettermek[$id].parkolo;
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
       
        {id:3,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska két tálon "}];
       
        
    }
    $scope.selectRowEtlap=function($id)
    {
        $scope.ujID=$scope.etlap[$id].id;
        $scope.ujnevetel=$scope.etlap[$id].nev;
        $scope.ujar=$scope.etlap[$id].ar;
        $scope.ujleirasetel=$scope.etlap[$id].leiras;
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