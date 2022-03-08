app.controller('etteremCtrl',function($scope,$rootScope,$location,dbfactory){

    /* db factory ha lesz akkor itt fellül kell mit a location 
    a  kisbetűs neveket min id nev lehet hogy ki kell cserélni majd ha az adatbázisból kapja
    az adatokat nagy betűsökre (itt is meg a html ben is)
    */ 
   
    $scope.ettermek=[];
    $scope.title="Étterem";
    $scope.teszt1="teszt1";
    $rootScope.sidebar=false;
    $scope.etteremad=1;
    dbfactory.admindingingselect().then(function(res){
        if(res.data.length>0)
        {
            $scope.ettermek=res.data;
        }
    });
    $scope.etlap=[
        {id:1,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"},
        {id:2,nev:"Harcsa leves",ar:950,leiras:"Harkcsa hús leves zöldségekkel"},
        {id:3,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"},
        {id:4,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"},
        {id:5,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"}
    ];
    $scope.selectRow=function($id){
       $scope.ujID=$scope.ettermek[$id].ID;
        $scope.ujnev=$scope.ettermek[$id].Nev;
        $scope.ujemail=$scope.ettermek[$id].Email;
        $scope.ujtelefon=$scope.ettermek[$id].Telefon;
        $scope.ujcim=$scope.ettermek[$id].Cim;
        $scope.ujleiras=$scope.ettermek[$id].Leiras;
       // $scope.parkolo=$scope.ettermek[$id].Parkolo;
        $scope.ujparkolo=$scope.ettermek[$id].Parkolo;
        $scope.ujbankkartya=$scope.ettermek[$id].Bankkartya;
        $scope.ujglutenmentes=$scope.ettermek[$id].Glutenmentes;
        $scope.ujterasz=$scope.ettermek[$id].Terasz;
        $scope.ujberelheto=$scope.ettermek[$id].Berelheto;
        $scope.ujhazhozszallitas=$scope.ettermek[$id].Hazhozszallitas;
        $scope.ujferohely=$scope.ettermek[$id].Ferohely;
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
        $scope.ujparkolo=null;
        $scope.ujbankkartya=null;
        $scope.ujglutenmentes=null;
        $scope.ujterasz=null;
        $scope.ujberelheto=null;
        $scope.ujhazhozszallitas=null
        $scope.ujferohely=null;
        $rootScope.felvesz=1;
        
    }
    $scope.etterem=function($id){
        // adatok lekérdezése
        $rootScope.felvesz2=1;
        $scope.etteremad=0;
        $scope.ujnevetel=null;
        $scope.ujar=null;
        $scope.ujleirasetel=null;
        $rootScope.selectedetteremID=$id;
        $scope.etlap=[{id:1,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska egy tálon"},
       
        {id:3,nev:"Hal rudacska",ar:1250,leiras:"4 nagy halrudacska két tálon "}];

       $location.url('/admin/etlap/'+$id);
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