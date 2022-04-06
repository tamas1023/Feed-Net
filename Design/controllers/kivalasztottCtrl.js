app.controller('kivalasztottCtrl',function($rootScope,$routeParams,$scope,dbfactory,$route){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $rootScope.feltetel="";
    $rootScope.ertekeles="";
    $rootScope.alapfeltetel="1";
    $rootScope.etterem=[];
    $rootScope.kepek=[];
    $id=$routeParams.id;
    $rootScope.csillag=0;
    $rootScope.feltetelek=[];
    $rootScope.TorlesID=0;
    $rootScope.TorlesFelhaszID=0;    
    $rootScope.ModositID=0;
    $rootScope.ModositFelhaszID=0;  
    $rootScope.ModositPontszam=0;  

    $scope.uzenet={};
    $scope.foglalas={};
    $scope.hiba=false;
    $scope.hiba2=false;
    $scope.osszferohely=0;
   
    $scope.jelentes="";
    /*

    Carousel jobbra balra gombok javítása, hogy jobban látszódjanak,
    a lenti sor ami mutatja hogy hány kép van, azt is láthatóbbá tenni

    A főoldalon a linkekre ha rávisszük az egeret pointer legyen a kulzor


    Előre megjeleníteni a  felhasználó kommentjeit




     */

    
    
    $rootScope.sidebar=false;
    $rootScope.felszereltseg=[];
    $rootScope.alapfeltetel=" ID="+$id;
    $rootScope.feltetel=" Etterem_ID="+$id;


    //neve és a egyéb adatai
    dbfactory.selectCustom("ettermek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.etterem=res.data;  
            $rootScope.felszereltseg=res.data;
            $scope.osszferohely=$rootScope.etterem[0].Ferohely;
            Felszerelesek();
        } 
        else{
            console.log(res.data);
        }
    });
    //képek lekérése
    
    dbfactory.selectCustom("kepek",$rootScope.feltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.kepek=res.data;  
            
        } 
        else{
            console.log(res.data);
        }
    });

    Felszerelesek=function () {
        $rootScope.feltetelek=[];
        //console.log($rootScope.felszereltseg[0]);
        if ($rootScope.felszereltseg[0].Bankkartya==1) {
            //$rootScope.feltetelek+="Bankkártya elfogadó hely, ";
            $rootScope.feltetelek.push({"felt":"Bankkártya elfogadó hely"});
            
        }   
        if ($rootScope.felszereltseg[0].Parkolo==1) {
            //$rootScope.feltetelek+="Parkolás, ";
            $rootScope.feltetelek.push({"felt":"Parkolás"});
        }
        if ($rootScope.felszereltseg[0].Glutenmentes==1) {
            //$rootScope.feltetelek+="Gluténmentes, ";
            $rootScope.feltetelek.push({"felt":"Gluténmentes"});
        }
        if ($rootScope.felszereltseg[0].Hazhozszallitas==1) {
            //$rootScope.feltetelek+="Házhozszállítás, ";
            $rootScope.feltetelek.push({"felt":"Házhozszállítás"});
        }
        if ($rootScope.felszereltseg[0].Terasz==1) {
            //$rootScope.feltetelek+="Terasz, ";
            $rootScope.feltetelek.push({"felt":"Terasz"});
        }
        if ($rootScope.felszereltseg[0].Wifi) {
            //$rootScope.feltetelek+="Wifi, ";
            $rootScope.feltetelek.push({"felt":"Wifi"});
        }
        $scope.felszerelt=" ";
        
         for (let i = 0; i < $rootScope.feltetelek.length; i++) {
            
            if (i==$scope.feltetelek.length-1) {
                $scope.felszerelt+=" "+$rootScope.feltetelek[i].felt+" ";
            }
            else{
                $scope.felszerelt+=" "+$rootScope.feltetelek[i].felt+", ";
            }
        }
            
    }
    //Foglalás  
    //Current timestamp hoz +12 óra ha sok akkor át kell váltani
    //és ha még így is több a megadott idő akkor tudjuk elfogadni

    //lekérni hogy hány férőhelyes az étterem, és hogy abból van e már foglalás a megadott időre

    $scope.Foglalas=function () {
        $scope.helyfoglalasok=[];
        $scope.maradekferohely=$scope.osszferohely;
        //ha a szám undefined amit megadott azt jelenti hogy több mint 100 főre akar foglani
        if ($scope.foglalas.fo ==null ||$scope.foglalas.datum==null ) {
            alert("Nem adtál meg minden adatot.");
        }
        else{
            /*
            console.log($scope.foglalas.fo);
            console.log($scope.foglalas.datum);
            console.log($scope.osszferohely);
            */
            dbfactory.selectCustom("helyfoglalas"," Etterem_ID="+$id).then(function(res) {
                if (res.data.length > 0) { 
                    $scope.helyfoglalasok=res.data;
                   for (let i = 0; i < $scope.helyfoglalasok.length; i++) {
                    $scope.maradekferohely-=$scope.helyfoglalasok[i].Fo;
                    $scope.helyfoglalasok[i].Kezdes=moment($scope.helyfoglalasok[i].Kezdes).format('YYYY MM.DD. HH:mm',true);
                   }
                   //console.log($scope.maradekferohely);
                   //console.log($scope.foglalas.datum);
                   /*
                   $scope.foglalas.datum=moment($scope.foglalas.datum).format('YYYY-MM-DD HH:mm',true);
                   console.log($scope.foglalas.datum);
                   
                   */
                   
                   $scope.datum=new Date($scope.foglalas.datum);
                   $scope.datum=moment($scope.datum).format('YYYY-MM-DD HH:mm',true);
                   
                   let datum=new Date($scope.datum);
                   datum.setHours(datum.getHours()+12);
                   let ev=datum.getFullYear();
                   let honap=datum.getMonth()+1;
                   let nap=datum.getDate();
                   let ora=datum.getHours();
                
                   console.log("kivalasztott: ");
                   console.log(ev,honap,nap,ora);

                   let most=new Date();
                   let mostev=most.getFullYear();
                   let mosthonap=most.getMonth()+1;
                   let mostnap=most.getDate();
                   let mostora=most.getHours();
                   let mostperc=most.getMinutes();
                   console.log("Most: ")
                   console.log(mostev,mosthonap,mostnap,mostora);

                   // meg kell nézni hogy a +12 órában még nyitva van e az étterem
                   //0 vasárnap ... 6 szombat
                   let hetmelyiknap=datum.getDay();
                   let melyiknapszo="";
                   console.log(hetmelyiknap);

                if (hetmelyiknap==0 ) {
                    melyiknapszo="Vasárnap";
                    
                }
                if (hetmelyiknap==1 ) {
                    melyiknapszo="Hétfő";
                    
                }
                if (hetmelyiknap==2 ) {
                    melyiknapszo="Kedd";
                    
                }
                if (hetmelyiknap==3 ) {
                    melyiknapszo="Szerda";
                    
                }
                if (hetmelyiknap==4 ) {
                    melyiknapszo="Csütörtök";
                    
                }
                if (hetmelyiknap==5 ) {
                    melyiknapszo="Péntek";
                    
                }
                if (hetmelyiknap==6 ) {
                    melyiknapszo="Szombat";
                    
                }
                console.log(melyiknapszo);

                   //eltelt a 12 óra
                   if (most<=datum) {
                       console.log("Elvileg megvan a 12 óra");
                   }
                   
                   else{
                    console.log("Elvileg nem tud rendelni");
                   }


                   
                   
                   //console.log($scope.helyfoglalasok);

                   
                   
                } 
               
            });
        }
        
    }


    //Kedvencek lekérdezés
    dbfactory.selectCustom("kedvenc"," Etterem_ID="+$id+" AND Felhasznalo_ID="+$rootScope.loggedInUserID).then(function(res) {
        if (res.data.length > 0) { 
           //bár bele van téve a kedvencek közé
           $scope.kedvencfelirat="Kedvenced";
           
        } 
        else{
            //még nincs benne a kedvenceibe
            $scope.kedvencfelirat="Kedvencekhez";
        }
    });

    //Kedvencekhez adás
    //Kedvenced
    //Kedvencekhez
    $scope.kedvencfelirat="";
    $scope.Kedvencek=function () {
        if ($rootScope.loggedIn==true) {
            dbfactory.selectCustom("kedvenc"," Etterem_ID="+$id+" AND Felhasznalo_ID="+$rootScope.loggedInUserID).then(function(res) {
                if (res.data.length > 0) { 
                   //már bele van téve a kedvencek közé
                   //törlés a kedvencekből
                   dbfactory.FavoriteDelete("kedvenc",$id,$rootScope.loggedInUserID).then(function(res) {
                    
    
                        $scope.kedvencfelirat="Kedvencekhez";
                    });
                } 
                else{
                    //még nincs benne a kedvenceibe
                    //hozzáadás a kedvencekhez
                    dbfactory.FavoriteAdd("kedvenc",$id,$rootScope.loggedInUserID).then(function(res) {
                    
    
                        $scope.kedvencfelirat="Kedvenced";
                    });
                    
                }
            });
        } else {
            alert("Jelentkezz be a kedvencekhez adáshoz");
        }

        
    }

   //értékelések lekérdezése
   $scope.ertekelesek=[];
   dbfactory.selectCustom("ertekelesek",$rootScope.feltetel).then(function(res) {
    if (res.data.length > 0) { 
        $scope.ertekelesek=res.data;
        //console.log($scope.ertekelesek);
        
        for (let i = 0; i < $scope.ertekelesek.length; i++) {
            
            //vagy amikor lekérjük akkor már csak a dátumját kérjük le pl
            //vagy átírni a nézettáblát hogy csak az év hónap és napot mutassa
            $scope.ertekelesek[i].Datum=moment($scope.ertekelesek[i].Datum).format('YYYY MM.DD.');
        }
        
    } 
    else{
        console.log(res.data);
    }
    });
    //nyitvatartás
    //megnézni, mert ha nincs adat a nyitás zárásnál: akkor Zárva van az étterem
    $scope.nyitvatartas=[];
    $scope.nap=-1;
    $scope.aktualisnap=[];
    dbfactory.getDate().then(function(res) {
                        
        if (res.data.length > 0) { 

           $scope.nap=res.data[0].Nap; 
           dbfactory.selectCustom("nyitvatartas",$rootScope.feltetel).then(function(res) {
            if (res.data.length > 0) { 
    
                $scope.nyitvatartas=res.data;
                for (let i = 0; i < res.data.length; i++) {
                    //Beolvasás Ha Vasárnap==1 Hétfő ==2 ,, és ez alapján ki tudom írni az aktuális dátumot
                    
                    if ($scope.nap==1 && res.data[i].Nap=="Vasárnap") {
                        $scope.aktualisnap=res.data[i];
                        
                    }
                    if ($scope.nap==2 && res.data[i].Nap=="Hétfő") {
                        $scope.aktualisnap=res.data[i];
                        
                    }
                    if ($scope.nap==3 && res.data[i].Nap=="Kedd") {
                        $scope.aktualisnap=res.data[i];
                        
                    }
                    if ($scope.nap==4 && res.data[i].Nap=="Szerda") {
                        $scope.aktualisnap=res.data[i];
                        
                    }
                    if ($scope.nap==5 && res.data[i].Nap=="Csütörtök") {
                        $scope.aktualisnap=res.data[i];
                        
                    }
                    if ($scope.nap==6 && res.data[i].Nap=="Péntek") {
                        $scope.aktualisnap=res.data[i];
                        
                    }
                    if ($scope.nap==7 && res.data[i].Nap=="Szombat") {
                        $scope.aktualisnap=res.data[i];
                        
                    }
                    
                    $scope.aktualisnap.Nyitas=moment('12-25-1995 '+$scope.aktualisnap.Nyitas).format('HH:mm',true);
                    $scope.aktualisnap.Zaras=moment('12-25-1995 '+$scope.aktualisnap.Zaras).format('HH:mm',true);

                    $scope.nyitvatartas[i].Nyitas=moment('12-25-1995 '+$scope.nyitvatartas[i].Nyitas).format('HH:mm',true);
                    $scope.nyitvatartas[i].Zaras=moment('12-25-1995 '+$scope.nyitvatartas[i].Zaras).format('HH:mm',true);
                }
                 
             }        
            
            
        });
        } 
        else{
            //console.log(res.data);
        }
    });
    
    
    
    $scope.etlap=[];
    dbfactory.selectCustom("etlap",$rootScope.feltetel).then(function(res) {
                        
        if (res.data.length > 0) { 
           $scope.etlap=res.data;
           $scope.etlapvane=true;
            
        } 
        else{
            $scope.etlapvane=false;
            //console.log(res.data);
        }
    });

    //probléma jelentés
    $scope.Problema=function ($problema) {
        $scope.jelentes=$problema;
    }
    $scope.Problemae=function ($problema) {
        if ($scope.jelentes==$problema) {
            return ".problema";
        } else {
            return "";
        }
    }
    $scope.ProblemaJelentes=function () {
        if ($rootScope.loggedIn==true) {
            if ($scope.jelentes=="") {
            
                $scope.hiba2=true;
            } else {
                $scope.hiba2=false;
                //probléma elküldése
                dbfactory.insertProblem("hibajelentes",$rootScope.loggedInUserID,$id,$scope.jelentes,$scope.uzenet.message3).then(function(res){
                    alert("A hibajelentését elküldtük");
                });
                
            }
            
        }
        else{
            alert("Jelentkezz be a probléma jelentéséhez");
        }
        
       
    }
    

    $scope.Csillag=function (id) {
        $rootScope.ertekeles=" Ertekeles >="+id+" ";
        $rootScope.csillag=id;
        
    }
    $scope.checkValue1 = function(id,pontszam) {
        
        if (id<=pontszam) {
            
            return  " .red";
        }
        else{
            return "";
        }
    }
    $scope.checkID = function($felhasznaloID) {
        
        if ($felhasznaloID==$rootScope.loggedInUserID) {
            
            return  " .show";
        }
        
    }
    
    $scope.ertekel=function () {
        //több értékelést is lehessen adni hogy lássuk hogy a felhasználó hogyan javoltű/rosszult
        //az érétkelése ha többször is volt ott
        
        if ($rootScope.csillag=="") {
            //Csillagok megadása kötelező!ű
            $scope.hiba=true;
        }
        else{
            if ($rootScope.loggedIn==true) {
            
                dbfactory.ratingInsert($id,$rootScope.loggedInUserID,$rootScope.csillag,$scope.uzenet.message).then(function (res) {
                    
                    
                    dbfactory.selectCustom("ertekelesek",$rootScope.feltetel).then(function(res) {
                        
                        if (res.data.length > 0) { 
                            $scope.ertekelesek=res.data;
                            $scope.hiba=false;
                            for (let i = 0; i < $scope.ertekelesek.length; i++) {
                                $scope.ertekelesek[i].Datum=moment($scope.ertekelesek[i].Datum).format('YYYY MM.DD.');
                            }
                            
                        } 
                        else{
                            console.log(res.data);
                        }
                    });
                });
            }
            else{
                alert("Jelentkezz be az értékeléshez.");
            }
        }
    
    }
    $scope.TorolID = function($ertekelesID,$FelhasznaloID) {
        $rootScope.TorlesID=$ertekelesID;
        $rootScope.TorlesFelhaszID=$FelhasznaloID;
    }
    $scope.ModositID = function($ertekelesID,$FelhasznaloID,$Pontszam,$Uzenet) {
        //betölteni hogy hány csillagos volt az értékelés
        //ng-checked
        $rootScope.ModositID=$ertekelesID;
        $rootScope.ModositFelhaszID=$FelhasznaloID;
        
        $rootScope.ModositPontszam=$Pontszam;
        $rootScope.csillag=$Pontszam;
        $scope.uzenet.message2=$Uzenet;
    }
    
    $scope.Torles=function () {
        if ($rootScope.TorlesFelhaszID==$rootScope.loggedInUserID) {
            
            dbfactory.ratingDelete($rootScope.TorlesID).then(function(res){
                dbfactory.selectCustom("ertekelesek",$rootScope.feltetel).then(function(res) {
                        
                    if (res.data.length > 0) { 
                        $scope.ertekelesek=res.data;
                        $scope.hiba=false;
                        for (let i = 0; i < $scope.ertekelesek.length; i++) {
                            $scope.ertekelesek[i].Datum=moment($scope.ertekelesek[i].Datum).format('YYYY MM.DD.');
                        }
                        
                    } 
                    else{
                        console.log(res.data);
                    }
                });
            });
        } else {
            alert("Nincsen jogod ezt az értékelést törölni");
        }
    } 
    //módosítás  
    $scope.Check=function ($id) {
        
        if ($id<=$rootScope.ModositPontszam) {
            
            return true;
        }
        else{
            
            return false;
        }
        
    }
    
    $scope.Modositas=function () {
        if ($rootScope.ModositFelhaszID==$rootScope.loggedInUserID) {
            /*
            console.log($scope.uzenet.message2);
            console.log($rootScope.csillag);
            console.log($rootScope.ModositID);
            */
            if ($rootScope.csillag=="") {
                //Csillagok megadása kötelező!
                $scope.hiba=true;
            }
            else{
                $scope.hiba=false;
            }
            //módosításnál current date-et frissíteni

            $scope.hol="ID= "+$rootScope.ModositID;
            $scope.mitmire="Pontszam= "+$rootScope.csillag+", Ertekeles='"+$scope.uzenet.message2+"'";
            //"ertekeles","mit mire","hol frissítés"
            
            dbfactory.updateRating("ertekeles",$scope.mitmire,$scope.hol).then(function(res){
                dbfactory.selectCustom("ertekelesek",$rootScope.feltetel).then(function(res) {
                        
                    if (res.data.length > 0) { 
                        $scope.ertekelesek=res.data;
                        $scope.hiba=false;
                        for (let i = 0; i < $scope.ertekelesek.length; i++) {
                            $scope.ertekelesek[i].Datum=moment($scope.ertekelesek[i].Datum).format('YYYY MM.DD.');
                        }
                        
                    } 
                    else{
                        console.log(res.data);
                    }
                });
            });
            

        } else {
            alert("Nincsen jogod ezt az értékelést módosítani");
        }
    }
});

