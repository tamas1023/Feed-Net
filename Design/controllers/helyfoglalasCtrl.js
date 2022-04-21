app.controller('helyfoglalasCtrl',function($scope,$rootScope,dbfactory,Notify){
    $rootScope.sidebar=false;
    $scope.helyfoglalas=[];
    $scope.nyitvatartas=[];
    $scope.modID=0;
    $scope.serverido=new Date();
    $scope.regidatum=new Date();
    $scope.regiadat=0;
    $scope.maxfo=0;
    $scope.EtteremID=0;
    $scope.feltetel=" AND CURRENT_TIMESTAMP<Kezdes";
    dbfactory.getDate().then(function(res) {               
        if (res.data.length > 0) { 
           $scope.nap=res.data[0].Nap; 
           dbfactory.selectCustom("nyitvatartas",'1').then(function(res) {
            if (res.data.length > 0) { 
                $scope.nyitvatartas=res.data;
                for (let i = 0; i < res.data.length; i++) {
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
                    $scope.nyitvatartas[i].Nyitas=moment('12-25-1995 '+$scope.nyitvatartas[i].Nyitas).format('HH:mm',true);
                    $scope.nyitvatartas[i].Zaras=moment('12-25-1995 '+$scope.nyitvatartas[i].Zaras).format('HH:mm',true);
                   if ($scope.nyitvatartas[i].Nyitas=="Invalid date" || $scope.nyitvatartas[i].Zaras=="Invalid date") {
                    
                    $scope.nyitvatartas[i].Nyitas="Zárva";
                    $scope.nyitvatartas[i].Zaras="Zárva";
                    
                    }
                }
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
             }         
        });
        } 
    });
    dbfactory.time().then(function(res){
        $scope.serverido=new Date(moment.parseZone(res.data[0].Ido).format('YYYY MM DD HH:mm:ss'));
        $scope.serverido.setHours($scope.serverido.getHours()+12);
    })
    $scope.helyfoglalasSelect=function()
{
    dbfactory.reservationSelect($rootScope.loggedInUserID, $scope.feltetel).then(function(res){
        if(res.data.length>0)
        {
            $scope.helyfoglalas=res.data;
        }
        for(let i=0;i<$scope.helyfoglalas.length;i++)
        {
            $scope.helyfoglalas[i].Kezdes=moment($scope.helyfoglalas[i].Kezdes).format('YYYY MM DD HH:mm:ss');
        }
        
    })
}
$scope.helyfoglalasSelect();
    $scope.select=function(index,id)
        {
            $scope.modID=id;
            $scope.EtteremID=$scope.helyfoglalas[index].Etterem_ID;
           $scope.ujfo=$scope.helyfoglalas[index].Fo;
           $scope.ujdatum=new Date(moment.parseZone($scope.helyfoglalas[index].Kezdes).format('YYYY MM DD HH:mm:ss'));
           $scope.regidatum=new Date(moment.parseZone($scope.helyfoglalas[index].Kezdes).format('YYYY MM DD HH:mm:ss'));
        }
        $scope.delete=function()
        {
            if($scope.regidatum>$scope.serverido)
            {
              
                    dbfactory.reservationDelete($scope.modID).then(function(r){
                        $scope.helyfoglalasSelect();
                })
               
            }
            else
            {
                
                Notify.addMessage('Nem módosítható', "danger");
            }
           
        }
        $scope.update=function()
        {

            //kellenek a feltételek

            if($scope.ujdatum>$scope.serverido&&$scope.regidatum>$scope.serverido)
            {
                let feltetel=`ID=${$scope.EtteremID}`;
                dbfactory.selectCustom('ettermek',feltetel).then(function(res){
                    $scope.maxfo=res.data[0].Ferohely;
                    $scope.datum=new Date($scope.ujdatum);
                    $scope.datum=moment($scope.datum).format('YYYY-MM-DD HH:mm:ss',true);
                    let datum=new Date($scope.datum);
                    let ev=datum.getFullYear();
                    let honap=datum.getMonth()+1;
                    let nap=datum.getDate();
                    let ora=datum.getHours();
                    let perc=datum.getMinutes();


                    let most=new Date();
                    dbfactory.time().then(function(results){
                        most=new Date(moment.parseZone(results.data[0].Ido).format('YYYY MM DD HH:mm:ss'));
                        most.setHours(most.getHours()+12);
                        if (most<=datum) 
                        {
    
                            let hetmelyiknap=datum.getDay();
                            let melyiknapszo="";
                            //0 vasárnap ... 6 szombat
    
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
                            //ha mind 2 igaz akkor benne van időben
                            $scope.foglalasokszam=0;
                            
                            
                            let lekerdezesdatum=new Date($scope.datum);

                            lekerdezesdatum.setHours(datum.getHours()-6);
                            let lekerdezesev=lekerdezesdatum.getFullYear();
                            let lekerdezeshonap=lekerdezesdatum.getMonth()+1;
                            let lekerdezesnap=lekerdezesdatum.getDate();
                            let lekerdezesora=lekerdezesdatum.getHours();
                            let lekerdezesperc=lekerdezesdatum.getMinutes();

                            $scope.szabadhely=$scope.maxfo;
                            let feltetel2="Kezdes <='"+ev+"-"+honap+"-"+nap+"-"+ora+"-"+perc+"-00' AND Kezdes >='"+lekerdezesev+"-"+lekerdezeshonap+"-"+lekerdezesnap+"-"+lekerdezesora+"-"+lekerdezesperc+"-00' AND ID<>"+$scope.modID;
                            if (nyitas && zaras) {
                                dbfactory.selectCustom("helyfoglalas",feltetel2).then(function(res) {
                                    if (res.data.length > 0) { 
                                        for (let i = 0; i < res.data.length; i++) {
                                            $scope.szabadhely-=res.data[i].Fo;
                                        }
                                        if ($scope.foglalas.fo<=$scope.szabadhely) {
                                            dbfactory.reservationUpdate($scope.modID,$scope.ujdatum,$scope.ujfo).then(function(re) {
                                                
                                                Notify.addMessage('A foglalását sikeresen elmentettük', "success");
                                                $scope.helyfoglalasSelect();
                                            });
                                
                                        } else {
                                            
                                            Notify.addMessage('Nem sikerült elmenteni a foglalást.Nem volt elég hely a foglalás időpontjában.', "danger");
                                        }
                                        
                                    } 
                                    else{
                                        //ha a megadott időpontokban nincsen még felvéve semmi

                                        dbfactory.reservationUpdate($scope.modID,$scope.ujdatum,$scope.ujfo).then(function(result) {
                                            
                                            Notify.addMessage('A foglalását sikeresen elmentettük', "success");
                                            $scope.helyfoglalasSelect();
                                        });
                                    }
                                });
                            }
                            else{
                                
                                Notify.addMessage('Nem sikerült elmenteni a foglalást. Zárva van az étterem a megadott időben.', "danger");
                            }
    
                        }
                        else
                        {
                        
                        Notify.addMessage('A mostani idő és a rendelési idő között nem telt et 12 óra', "danger");
                        }
                    
                    })
                  
                })
               
            }
            else
            {
                
                Notify.addMessage('Nem módosítható', "danger");
            }
        }
        $scope.regiadatok=function()
        {
            $scope.regiadat=($scope.regiadat)? true : false;
            if($scope.regiadat)
            {
                $scope.feltetel=" AND CURRENT_TIMESTAMP<Kezdes";
                $scope.helyfoglalasSelect();
            }
            else
            {
                $scope.feltetel=" ";
                $scope.helyfoglalasSelect();
            }
        }
})