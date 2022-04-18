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
    $scope.etteremertekeles=0;
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


    //étterem értékelésének lekérdezése
    dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            $scope.etteremertekeles=res.data[0].Ertekeles;
            
        } 
        
    });

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
            if ($rootScope.loggedIn==true) {
                dbfactory.selectCustom("helyfoglalas"," Etterem_ID="+$id).then(function(res) {


                    //TODO: ha nincs rendelés akkor simán fel tudjuk venni, ha akkor nyitva lesz az étterem
                    
    
                    $scope.datum=new Date($scope.foglalas.datum);
                    $scope.datum=moment($scope.datum).format('YYYY-MM-DD HH:mm:ss',true);
                    let datum=new Date($scope.datum);

                    //datum.setHours(datum.getHours()+12);
                    let ev=datum.getFullYear();
                    let honap=datum.getMonth()+1;
                    let nap=datum.getDate();
                    let ora=datum.getHours();
                    let perc=datum.getMinutes();


                    let most=new Date();
                    most.setHours(most.getHours()+12);
                    let mostev=most.getFullYear();
                    let mosthonap=most.getMonth()+1;
                    let mostnap=most.getDate();
                    let mostora=most.getHours();
                    let mostperc=most.getMinutes();

                    //ha van rendelés az étterem ID re
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
                       //console.log($scope.foglalas.datum);
                       
                       //console.log($scope.datum);
                    
                       //console.log("kivalasztott: ");
                       //console.log(ev,honap,nap,ora,perc);
    
                       
                       //console.log("Most tól 12 óra mulva: ")
                      // console.log(mostev,mosthonap,mostnap,mostora);
    
                       // meg kell nézni hogy a +12 órában még nyitva van e az étterem
                       //eltelt a 12 óra
                       if (most<=datum) {
                            //console.log("Elvileg megvan a 12 óra");
    
                            let hetmelyiknap=datum.getDay();
                            let melyiknapszo="";
                            //0 vasárnap ... 6 szombat
                            //console.log(hetmelyiknap);
    
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
                            //console.log(melyiknapszo);
                            let nyitasora;
                            let nyitasperc;
    
                            
    
                            let zarasora;
                            let zarasperc;
    
                            
    
                            for (let i = 0; i < $scope.nyitvatartas.length; i++) {
                                if ( $scope.nyitvatartas[i].Nap==melyiknapszo) {
                                //console.log("megfelelonap");
                                
                                let nyitas=new Date(moment('12-25-1995 '+$scope.nyitvatartas[i].Nyitas).format('YYYY-MM-DD HH:mm',true));
                                //console.log(nyitas);
                                nyitasora=nyitas.getHours();
                                nyitasperc=nyitas.getMinutes();
                                let zaras=new Date(moment('12-25-1995 '+$scope.nyitvatartas[i].Zaras).format('YYYY-MM-DD HH:mm',true));
                                zarasora=zaras.getHours();
                                zarasperc=zaras.getMinutes();
                                //console.log(moment('12-25-1995 '+$scope.nyitvatartas[i].Zaras).format('HH:mm',true));
                                }
                        
                            }
                        
                            //console.log("Nyitás: "+nyitasora +"-"+nyitasperc+" Zárás: "+zarasora+"-"+zarasperc);
                            //console.log("Megadott idő:"+ora+"-"+perc);
    
                            //külön kell megnézni, hogy a nyitási időnél  (óra perc) nagyobb
                            // és zárási időnél kisebb (óra, perc)
    
                            //ha több az óra mint a nyitás óra akkor át kell engedni akkor is ha a perc kisebb
    
                            let nyitas=false;
                            let zaras=false;
                            if (ora>nyitasora) {
                                //console.log("Nyitási idő után jönnének");
                                nyitas=true;
                            } else {
                                if (ora==nyitasora) {
                                    if (perc>=nyitasperc) {
                                        //console.log("Nyitási idő után jönnének");
                                        nyitas=true;
                                        } else {
                                        //console.log("Nyitás előtt perc");
                                        nyitas=false;
                                    }
                                }
                                else{
                                    nyitas=false;
                                    //console.log("Nyitás előtt óra");
                                }
                                
                            
                            //console.log("Nyitás előtt óra");
                            //console.log("NEM lehet rendelni");
                            }
                            if (ora<zarasora) {
                                //console.log("Zárási idő előtt jönnének");
                                zaras=true;
                            }
                            else{
                                if (ora==zarasora) {
                                    if (perc<=zarasperc) {
                                        //console.log("Zárási előtt után jönnének");
                                        zaras=true;
                                    }
                                    else
                                    {
                                        //console.log("Zárás után perc");
                                        zaras=false;
                                    }
                                }
                                else{
                                    //console.log("Zárás után óra");
                                    zaras=false;
                                }
    
                                //console.log("Zárás után óra");
                            }
                            //ha mind 2 igaz akkor benne van időben
                            $scope.foglalasokszam=0;
                            
                            //SELECT * FROM `helyfoglalas` WHERE `Kezdes`>='ev-honap-nap-ora-perc-mp' AND Kezdes <='ev-honap-nap+1-ora-perc-mp'
                            let lekerdezesdatum=new Date($scope.datum);

                            lekerdezesdatum.setHours(datum.getHours()-6);
                            let lekerdezesev=lekerdezesdatum.getFullYear();
                            let lekerdezeshonap=lekerdezesdatum.getMonth()+1;
                            let lekerdezesnap=lekerdezesdatum.getDate();
                            let lekerdezesora=lekerdezesdatum.getHours();
                            let lekerdezesperc=lekerdezesdatum.getMinutes();

                            $scope.szabadhely=$scope.osszferohely;
                            $scope.feltetel="Kezdes <='"+ev+"-"+honap+"-"+nap+"-"+ora+"-"+perc+"-00' AND Kezdes >='"+lekerdezesev+"-"+lekerdezeshonap+"-"+lekerdezesnap+"-"+lekerdezesora+"-"+lekerdezesperc+"-00' ";
                            //console.log($scope.feltetel);
                            if (nyitas && zaras) {
                                dbfactory.selectCustom("helyfoglalas",$scope.feltetel).then(function(res) {
                                    if (res.data.length > 0) { 
                                        for (let i = 0; i < res.data.length; i++) {
                                            $scope.szabadhely-=res.data[i].Fo;
                                            // A folgalasokszamot ki kell vonni az összesből, és ha marad még hely , és belefér a megadott főbe amit akar foglani
                                            //Akkor fel lehet venni
                                            
                                        }
                                        if ($scope.foglalas.fo<=$scope.szabadhely) {
                                            
                                            dbfactory.reservationInsert($id,$rootScope.loggedInUserID,$scope.datum,$scope.foglalas.fo).then(function(res) {
                                                alert("A foglalását sikeresen elmentettük.");
                                            });
                                
                                        } else {
                                            alert("Nem sikerült elmenteni a foglalást.Nem volt elég hely a foglalás időpontjában.");
                                        }
                                        
                                    } 
                                    else{
                                        //ha a megadott időpontokban nincsen még felvéve semmi
                                        dbfactory.reservationInsert($id,$rootScope.loggedInUserID,$scope.datum,$scope.foglalas.fo).then(function(res) {
                                            alert("A foglalását sikeresen elmentettük.");
                                        });

                                        //console.log(res.data);
                                    }
                                });

                                    

                                
                                //SELECT * FROM `helyfoglalas` WHERE Kezdes >="2022.04.10" AND Kezdes <= "2022.04.11"
                                /*
                                dbfactory.reservationInsert($id,$rootScope.loggedInUserID,$scope.datum,$scope.foglalas.fo).then(function(res) {
                                    
                                });
                                */
    
    
                               
                            }
                            else{
                                alert("Nem sikerült elmenteni a foglalást. Zárva van az étterem a megadott időben.");
                            }
    
                        }
                    
                        else{
                        alert("A mostani idő és a rendelési idő között nem telt et 12 óra");
                        }
                    }
                    else{

                        //ha NINCS rendelés az étterem ID re

                        if (most<=datum) {
                            //console.log("Elvileg megvan a 12 óra");
    
                            let hetmelyiknap=datum.getDay();
                            let melyiknapszo="";
                            //0 vasárnap ... 6 szombat
                            //console.log(hetmelyiknap);
    
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
                            let nyitasora;
                            let nyitasperc;
                            let zarasora;
                            let zarasperc;
                            for (let i = 0; i < $scope.nyitvatartas.length; i++) {
                                if ( $scope.nyitvatartas[i].Nap==melyiknapszo) {
                                let nyitas=new Date(moment('12-25-1995 '+$scope.nyitvatartas[i].Nyitas).format('YYYY-MM-DD HH:mm',true));
                                nyitasora=nyitas.getHours();
                                nyitasperc=nyitas.getMinutes();
                                let zaras=new Date(moment('12-25-1995 '+$scope.nyitvatartas[i].Zaras).format('YYYY-MM-DD HH:mm',true));
                                zarasora=zaras.getHours();
                                zarasperc=zaras.getMinutes();
                                }
                        
                            }
                            let nyitas=false;
                            let zaras=false;
                            if (ora>nyitasora) {
                                nyitas=true;
                            } else {
                                if (ora==nyitasora) {
                                    if (perc>=nyitasperc) {
                                        nyitas=true;
                                        } else {
                                        nyitas=false;
                                    }
                                }
                                else{
                                    nyitas=false;
                                }
                            }
                            if (ora<zarasora) {
                                zaras=true;
                            }
                            else{
                                if (ora==zarasora) {
                                    if (perc<=zarasperc) {
                                        zaras=true;
                                    }
                                    else
                                    {
                                        zaras=false;
                                    }
                                }
                                else{
                                    zaras=false;
                                }
                            }
                            $scope.foglalasokszam=0;
                            let lekerdezesdatum=new Date($scope.datum);

                            lekerdezesdatum.setHours(datum.getHours()+6);
                            
                            
                            if (nyitas && zaras) {
                                
                                dbfactory.reservationInsert($id,$rootScope.loggedInUserID,$scope.datum,$scope.foglalas.fo).then(function(res) {
                                    alert("A foglalását sikeresen elmentettük.");
                                });
                                //console.log("Nem jött adat a helyfoglalásból");
                            }
                            else{
                                alert("Nem sikerült elmenteni a foglalást. Zárva van az étterem a megadott időben.");
                            }
    
                        }
                    
                        else{
                        console.log("A mostani idő és a rendelési idő között nem telt et 12 óra");
                        }

                    } 
                   
                });
            }
            else
            {
                alert("Jelentkezz be a foglaláshoz");
            }
            /*
            console.log($scope.foglalas.fo);
            console.log($scope.foglalas.datum);
            console.log($scope.osszferohely);
            */
            
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
        for (let i = 0; i < res.data.length; i++) {
            if ($scope.loggedInUserID==res.data[i].Felhasznalo_ID) {
                $scope.ertekelesek.push(res.data[i]);
                
            }
        }
        for (let i = 0; i < res.data.length; i++) {
            if ($scope.loggedInUserID!=res.data[i].Felhasznalo_ID) {
                $scope.ertekelesek.push(res.data[i]);
                
            }
        }
        
        //$scope.ertekelesek=res.data;
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
    $scope.nyitvavane=true;
    dbfactory.getDate().then(function(res) {
                        
        if (res.data.length > 0) { 

           $scope.nap=res.data[0].Nap; 
           //console.log($scope.nap);
           dbfactory.selectCustom("nyitvatartas",$rootScope.feltetel).then(function(res) {
            if (res.data.length > 0) { 
    
                $scope.nyitvatartas=res.data;
                //console.log($scope.nyitvatartas);
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
                    /*
                    console.log("----------------");
                    console.log($scope.nyitvatartas[i].Nyitas);
                    console.log($scope.nyitvatartas[i].Zaras);
                    */
                    $scope.nyitvatartas[i].Nyitas=moment('12-25-1995 '+$scope.nyitvatartas[i].Nyitas).format('HH:mm',true);
                    $scope.nyitvatartas[i].Zaras=moment('12-25-1995 '+$scope.nyitvatartas[i].Zaras).format('HH:mm',true);
                   if ($scope.nyitvatartas[i].Nyitas=="Invalid date" || $scope.nyitvatartas[i].Zaras=="Invalid date") {
                    
                    $scope.nyitvatartas[i].Nyitas="Zárva";
                    $scope.nyitvatartas[i].Zaras="Zárva";
                    
                    }
                    else{
                    
                    }
                   
                    
                    /*
                    console.log($scope.nyitvatartas[i].Nyitas);
                    console.log($scope.nyitvatartas[i].Zaras);
                    */
                }
                /*
                console.log($scope.aktualisnap);
                console.log($scope.aktualisnap.Nyitas);
                console.log($scope.aktualisnap.Zaras);
                */
                    //console.log($scope.aktualisnap);
                    $scope.aktualisnap.Nyitas=moment('12-25-1995 '+$scope.aktualisnap.Nyitas).format('HH:mm',true);
                    $scope.aktualisnap.Zaras=moment('12-25-1995 '+$scope.aktualisnap.Zaras).format('HH:mm',true);
                    if ($scope.aktualisnap.Nyitas=="Invalid date") {
                        
                        $scope.aktualisnap.Nyitas="Zárva";
                        $scope.aktualisnap.Zaras="";
                        $scope.nyitvavane=false;
                    }
                    else{
                        $scope.nyitvavane=true;
                    }
                    
                    

                /*
                $scope.aktualisnap.Nyitas=moment('12-25-1995 '+$scope.aktualisnap.Nyitas).format('HH:mm',true);
                $scope.aktualisnap.Zaras=moment('12-25-1995 '+$scope.aktualisnap.Zaras).format('HH:mm',true);
                */
                 
             }        
            
            
        });
        } 
        else{
            //console.log(res.data);
        }
    });
    
    
    //étlap kiírás
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

