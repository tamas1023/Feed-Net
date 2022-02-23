var app= new angular.module('Feed-Net',['ngAnimate']);

app.run(function($rootScope){
    $rootScope.title="Étterem";
    $rootScope.felvesz=1;
  
});
app.controller('htmlCtrl',function($scope,$rootScope){
    $scope.ettermek=[];
    $scope.title="Étterem";
    $scope.teszt1="teszt1";
    $scope.ettermek=[
        {id:1,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799462",parkolo:1,bankkartlya:0,glutenmentes:0,terasz:0,berelheto:1,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria hosszabb leírás hogy nézzük mit csinál ha sokkal több a szöveg ebben a box ban"},
        {id:2,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799463",parkolo:1,bankkartlya:0,glutenmentes:0,terasz:1,berelheto:1,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:3,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799464",parkolo:1,bankkartlya:0,glutenmentes:0,terasz:0,berelheto:0,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:4,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799465",parkolo:1,bankkartlya:0,glutenmentes:0,terasz:0,berelheto:1,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:5,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799466",parkolo:1,bankkartlya:0,glutenmentes:0,terasz:0,berelheto:0,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"},
        {id:6,nev:"Bajai Tomato",email:"bajatomato@gmail.com",telefon:"06 70 3799467",parkolo:1,bankkartlya:0,glutenmentes:0,terasz:1,berelheto:0,cim:"6500 Baja Jónai utca 12",leiras:"Egy kicsi de konfortos pizzéria"}
    ];
    $scope.selectRow=function($id){
       $scope.ujID=$scope.ettermek[$id-1].id;
        $scope.ujnev=$scope.ettermek[$id-1].nev;
        $scope.ujemail=$scope.ettermek[$id-1].email;
        $scope.ujtelefon=$scope.ettermek[$id-1].telefon;
        $scope.ujcim=$scope.ettermek[$id-1].cim;
        $scope.ujleiras=$scope.ettermek[$id-1].leiras;
        
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

        $rootScope.felvesz=1;
        console.log($rootScope.felvesz);
    }
    $scope.etterem=function($id){
        //lekérés azt az étlapot ahol az id = étterem id dispalay none al legyen a váltás ha rákapcsol (másik tábla lesz de ugyan azon a helyen e miatt)
    }
});