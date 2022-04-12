app.controller('ettermekCtrl',function($rootScope,$scope,dbfactory,$route,$location){
    $rootScope.sidebar=true;
    $rootScope.logivagyreg=false;
    $rootScope.feltetel="";
    $rootScope.ertekeles="";
    $rootScope.alapfeltetel=" Statusz=1";
    $rootScope.ettermek=[];
    $rootScope.nincsetterem="Nem találtunk egyezést ezekre a szűrési paraméterekre.";
    dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.alapfeltetel).then(function(res) {
        if (res.data.length > 0) { 
            $rootScope.nincsetterem="";
            $rootScope.ettermek=res.data;
            
        } 
        
    });

    

    //egy gomb ami az összes szűrési feltételt reszeteli
    $scope.Szures=function () {
        $scope.etteremid=[];
        
        $scope.feltetelek=[];
        if ($scope.kartyaszures) {
            $scope.feltetelek.push({"felt":"Bankkartya=1"});
        }
        
        if ($scope.parkolo) {
            $scope.feltetelek.push({"felt":"Parkolo=1"});
        }
        if ($scope.gluten) {
            $scope.feltetelek.push({"felt":"Glutenmentes=1"});
        }
        if ($scope.szallitas) {
            $scope.feltetelek.push({"felt":"Hazhozszallitas=1"});
        }
        if ($scope.terasz) {
            $scope.feltetelek.push({"felt":"Terasz=1"});
        }
        if ($scope.wifi) {
            $scope.feltetelek.push({"felt":"Wifi=1"});
        }
        if ($scope.nyitva) {
            //lekérni a current time ot a backendről


            //utána (then be) lekérnni a napot

            // ide majd a lekérdezett n ap jön majd
            let datum=new Date();
            $scope.datumseged=new Date();
            dbfactory.time().then(function(res) {
                datum=res.data[0].Ido;
                $scope.datumseged=res.data[0].Ido;
                datum=moment(datum).format('YYYY-MM-DD HH:mm:ss',true);
                console.log(datum); 
                
            });
            let hetmelyiknap=datum.getDay();
            console.log(datum);
            console.log(hetmelyiknap);
            //console.log(hetmelyiknap);
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
            console.log(melyiknapszo);
            //lekérni minden egyes étterem nek az aznapi nyitvatartását
            //és ha a mostani órában nyitva van akkor az étterem id jét
            //letárolni, és azután az éttermek listát frissíteni
            //azokkal az elemekkel ami benne van a listában

            for (let i = 0; i < $rootScope.ettermek.length; i++) {
                //megnézni a nyitvatartását, és ha nyitva van akkor hozzáadni a 
                //listához
                dbfactory.selectCustom("nyitvatartas"," Etterem_ID="+$rootScope.ettermek[i].ID).then(function(res) {
                    if (res.data.length > 0) { 
                        //res.data a nyitvatartások
                        for (let i = 0; i < res.data.length; i++) {
                            if (melyiknapszo==res.data[i].Nap) {
                                console.log(res.data[i].Nyitas);
                                console.log(res.data[i].Zaras);
                                let nyitasetterem=new Date(moment('12-25-1995 '+res.data[i].Nyitas).format('YYYY-MM-DD HH:mm:ss',true));
                                let zarasetterem=new Date(moment('12-25-1995 '+res.data[i].Zaras).format('YYYY-MM-DD HH:mm:ss',true));

                                let datum2=new Date(moment($scope.datumseged).format('YYYY-MM-DD HH:mm',true));
                                console.log(datum2);
                                let ora=datum2.getHours();
                                let perc=datum2.getMinutes();
                                console.log(ora);
                                console.log(perc);

                                let nyitasora=nyitasetterem.getHours();
                                let nyitasperc=nyitasetterem.getMinutes();
                                console.log(nyitasora);
                                console.log(nyitasperc);

                                let zarasora=zarasetterem.getHours();
                                let zarasperc=zarasetterem.getMinutes();
                                console.log(zarasora);
                                console.log(zarasperc);

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
                                console.log(nyitas);
                                console.log(zaras);
                                
                               if (nyitas && zaras) {
                                   //nyitás után és zárás előtt vannak
                                   $scope.etteremid.push({"ID":res.data[i].Etterem_ID});
                                   console.log(res.data[i].Etterem_ID);
                               }
                                


                            }
                            
                        }
                        
                    } 
                    else{
                        $rootScope.nincsetterem="Nem találtunk egyezést ezekre a szűrési paraméterekre.";
                    }
                    
                });
        
            }
            if ($scope.etteremid!=null) {
                console.log("Belepett ide");
                $rootScope.ettermek=[];
                //ha a tömb nem üres
                $rootScope.nincsetterem="";
                //megvannak az ID-k és most már csak a listát kell frissíteni
                dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.alapfeltetel).then(function(res) {
                    if (res.data.length > 0) { 
                        for (let i = 0; i < $scope.etteremid.length; i++) {
                            if ($scope.etteremid[i].ID==res.data[i].ID) {
                                console.log(res.data[i]);
                                $rootScope.ettermek.push(res.data[i]);
                            }
                            
                        }
                        //$rootScope.ettermek=res.data;
                    
                    } 
                    
                });
            }
            

        }
        
        $rootScope.feltetel=" ";
        for (let i = 0; i < $scope.feltetelek.length; i++) {
            
            if (i==$scope.feltetelek.length-1) {
                $rootScope.feltetel+=" "+$scope.feltetelek[i].felt+" ";
            }
            else{
                $rootScope.feltetel+=" "+$scope.feltetelek[i].felt+" AND";
            }
        }
        
        if ($rootScope.feltetel==" ") {
            if ($rootScope.ertekeles!="") {
                $rootScope.feltetel+=" "+$rootScope.ertekeles;
            }
            else{
                $rootScope.feltetel=" 1";
            }
            
        }
        else{
            if ($rootScope.ertekeles!="") {
                $rootScope.feltetel+=" AND "+$rootScope.ertekeles;
            }
        } 
        
        dbfactory.selectCustom("ettermek_ertekelesek",$rootScope.feltetel+" AND Statusz=1").then(function(res) {
            if (res.data.length > 0) {
                $rootScope.nincsetterem="";
                $rootScope.ettermek=res.data;
            } else {
                $rootScope.nincsetterem="Nem találtunk egyezést ezekre a szűrési paraméterekre.";
                $rootScope.ettermek=res.data;
            }
        });

    }

    $scope.Csillag=function (id) {
        $rootScope.ertekeles=" Ertekeles >="+id+" ";
        
    }
    $scope.Valasztas=function ($id) { 
        $location.url('/kivalasztott/'+$id);
    }

});

