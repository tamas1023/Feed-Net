app.factory('dbfactory', function($http, $q) {
    let url = 'http://localhost:8080';
    return {
        //email átadás
        email:function() {
            let deferred = $q.defer();
            $http.get(url + '/email').then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //session lekérés
        session:function() {
            let deferred = $q.defer();
            $http.post(url + '/session').then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        logincheck: function( email, pass) {
            let deferred = $q.defer();
            let data = {
                Email: email,
                passwd: pass
            }
            $http.post(url + '/login', data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //kilépés
        logout:function(){
            let deferred = $q.defer();
            $http.get(url+"/logout").then(
                function(res)
                {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //registration
        reg:function(email,name, pass){
            let deferred = $q.defer();
            let data = {
                Email: email,
                Name:name,
                passwd: pass
            }
            $http.post(url+"/reg",data).then(
                function(res)
                {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //email check
        emailcheck: function(table,email) {
            let deferred = $q.defer();
            let data = {
                Table:table,
                Email: email,
            }
            $http.post(url + '/emailcheck', data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        // kiválasztom amit én szeretnék játni
        selectCustom: function(tablename,select) {
            let deferred = $q.defer();
            let data = {
                Tablename: tablename,
                Select: select
            }
            $http.post(url + '/selectCustom',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //Kedvencekhez adás
        FavoriteAdd: function(tablename,etterem_ID,felhasznalo_ID) {
            let deferred = $q.defer();
            let data = {
                Tablename: tablename,
                Etterem_ID: etterem_ID,
                Felhasznalo_ID: felhasznalo_ID,
            }
            $http.post(url + '/FavoriteAdd',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //Kedvencek törlés
        FavoriteDelete: function(tablename,etterem_ID,felhasznalo_ID) {
            let deferred = $q.defer();
            let data = {
                Tablename: tablename,
                Etterem_ID: etterem_ID,
                Felhasznalo_ID: felhasznalo_ID,
            }
            $http.post(url + '/FavoriteDelete',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //ertekeles beillesztes
        
        ratingInsert:function(id,loggedInUserID,csillag,ertekeles) {
            let deferred = $q.defer();
            let data = {
                Etterem_ID:id,
                Felhasznalo_ID:loggedInUserID,
                Pontszam:csillag,
                Ertekeles:ertekeles
            }
            $http.post(url + '/ratingInsert',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //helyfoglalás beillesztése
        reservationInsert:function(id,loggedInUserID,datum,fo) {
            let deferred = $q.defer();
            let data = {
                Etterem_ID:id,
                Felhasznalo_ID:loggedInUserID,
                Datum:datum,
                Fo:fo
            }
            $http.post(url + '/reservationInsert',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //Milyen nap van ma
        getDate:function() {
            let deferred = $q.defer();
            $http.post(url + '/getDate').then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //értékelés törlése
        ratingDeleteuser:function(id) {

            let data = {
                ID:id
            }
            let deferred = $q.defer();
            $http.post(url + '/ratingDeleteuser',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //értékelés frissítése
        updateRating:function(tablename,mitmire,hol) {
            let deferred = $q.defer();
            let data = {
                Tablename: tablename,
                Mitmire:mitmire,
                Hol: hol,
                
            }
            $http.post(url + '/updateRating',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //probléma jelentés
        insertProblem:function(tablename,felhasznaloid,etteremid,tipus,leiras) {
            let deferred = $q.defer();
            let data = {
                Tablename: tablename,
                Felhasznalo_ID:felhasznaloid,
                Etterem_ID: etteremid,
                Tipus:tipus,
                Leiras: leiras,
            }
            $http.post(url + '/insertProblem',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //admin Étterem
        
        //admin Étterem select

        admindingingselect:function() {
            let deferred = $q.defer();
            $http.get(url + '/admindiningselect').then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //admin Étterem update

        admindiningupdate:function(id,nev,email,telefon,cim,ferohely,leiras,parkolo,bankkartya,glutenmentes,terasz,berelheto,hazhozszallitas,statusz,webodal,facebook,tipus,wifi) {
            let deferred = $q.defer();
            let data = {
                ID:id,
                Nev:nev,
                Email: email,
                Telefon:telefon,
                Cim:cim,
                Ferohely:ferohely,
                Leiras:leiras,
                Parkolo:parkolo,
                Bankkartya:bankkartya,
                Glutenmentes:glutenmentes,
                Terasz:terasz,
                Berelheto:berelheto,
                Hazhozszallitas:hazhozszallitas,
                Statusz:statusz,
                Weboldal:webodal,
                Facebook:facebook,
                Tipus:tipus,
                Wifi:wifi
            }
            $http.post(url + '/admindiningupdate',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

         //admin Étterem insert
         admindininginsert:function(id,nev,email,telefon,cim,ferohely,leiras,parkolo,bankkartya,glutenmentes,terasz,berelheto,hazhozszallitas,statusz,webodal,facebook,tipus,wifi) {
            let deferred = $q.defer();
            let data = {
                ID:id,
                Nev:nev,
                Email: email,
                Telefon:telefon,
                Cim:cim,
                Ferohely:ferohely,
                Leiras:leiras,
                Parkolo:parkolo,
                Bankkartya:bankkartya,
                Glutenmentes:glutenmentes,
                Terasz:terasz,
                Berelheto:berelheto,
                Hazhozszallitas:hazhozszallitas,
                Statusz:statusz,
                Weboldal:webodal,
                Facebook:facebook,
                Tipus:tipus,
                Wifi:wifi,
            }
            $http.post(url + '/admindininginsert',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        //admin étlap select
        
        adminfoodselect:function(ID) {
            let deferred = $q.defer();
            let data = {
                id:ID
            }
            $http.post(url + '/adminfoodselect',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        
         //admin étlap insert
        
         adminfoodinsert:function(etteremID,nev,ar,leiras) {
            let deferred = $q.defer();
            let data = {
                EtteremID:etteremID,
                Nev:nev,
                Ar:ar,
                Leiras:leiras
            }
            $http.post(url + '/adminfoodinsert',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //admin étlap delete

        adminfooddelete:function(ID) {
            let deferred = $q.defer();
            let data = {
                id:ID
            }
            $http.post(url + '/adminfooddelete',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //admin étlap update

        adminfoodupdate:function(id,etteremid,nev,ar,leiras) {
            let deferred = $q.defer();
            let data = {
                ID:id,
                EtteremID:etteremid,
                Nev:nev,
                Ar:ar,
                Leiras:leiras
            }
            $http.post(url + '/adminfoodupdate',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },


        //felhasználók

        //felhasználók kilistázása

        userselect:function() {
            let deferred = $q.defer();
            $http.get(url + '/userselect').then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //felhasználók insert

        userinsert:function(id,email,nev,telefon,pass,jog,statusz) {
            let deferred = $q.defer();
            let data = {
                ID:id,
                Email:email,
                Name:nev,
                Telefon:telefon,
                passwd:pass,
                Jog:jog,
                Statusz:statusz
            }
            $http.post(url + '/userinsert',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //felhasználó update

        userupdate:function(id,email,nev,telefon,pass,jog,statusz) {
            let deferred = $q.defer();
            let data = {
                ID:id,
                Email:email,
                Name:nev,
                Telefon:telefon,
                passwd:pass,
                Jog:jog,
                Statusz:statusz
            }
            $http.post(url + '/userupdate',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //felhasználók delete

        userdelete:function(id) {
            let deferred = $q.defer();
            let data = {
                ID:id
            }
            $http.post(url + '/userdelete',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //hibajelentések select

        errorselect:function() {
            let deferred = $q.defer();
            $http.get(url + '/errorselect').then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //hibajelentés delete

        errordelete:function(id) {
            let data = {
                ID:id
            }
            let deferred = $q.defer();
            $http.post(url + '/errordelete',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //értékelések select


        ratingselect:function() {
            let deferred = $q.defer();
            $http.get(url + '/ratingselect').then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // értékelés delete

        ratingdelete:function(id) {
            let data = {
                ID:id
            }
            let deferred = $q.defer();
            $http.post(url + '/ratingdelete',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // étterem id meghatározása email cím alapján
        etteremid:function(email) {
            let data = {
                Email:email
            }
            let deferred = $q.defer();
            $http.post(url + '/etteremid',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // étterem helyfoglalás select

        etteremselect:function(id,felt) {
            let data = {
                EtteremID:id,
                Feltetel:felt
            }
            let deferred = $q.defer();
            $http.post(url + '/etteremselect',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // étterem helyfoglalás delete

        etteremdelete:function(id) {
            let data = {
                ID:id
            }
            let deferred = $q.defer();
            $http.post(url + '/etteremdelete',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },


        //profil select

        profilselect:function(id) {
            let data = {
                ID:id
            }
            let deferred = $q.defer();
            $http.post(url + '/profilselect',data).then( function(res) {
                deferred.resolve(res);
            },
            function(err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
    },
        // étterem nyitvatartás select 

        open:function(id) {
            let data = {
                EtteremID:id,
            }
            let deferred = $q.defer();
            $http.post(url + '/open',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //profil módosítás
        
        profilmod:function(id,email,nev,passwd,telefon) {
            let data = {
                ID:id,
                Email:email,
                Nev:nev,
                Passwd:passwd,
                Telefon:telefon,
            }
            let deferred = $q.defer();
            $http.post(url + '/profilmod',data).then(function(res) {
                deferred.resolve(res);
            },
            function(err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
    },
    
        //étterem nyitvatartás update

        openupdate:function(id,nyitas,zaras,napid,nap) {
            let data = {
                ID:id,
                Nyitas:nyitas,
                Zaras:zaras,
                Napid:napid,
                Nap:nap
            }
            let deferred = $q.defer();
            $http.post(url + '/openupdate',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },
        
        //étterem nyitvatartás delete

        opendelete:function(id) {
            let data = {
                ID:id
            }
            let deferred = $q.defer();
            $http.post(url + '/opendelete',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },


            //étterem nyitvatartás insert

        openinsert:function(id,nap,nyitas,zaras,napid) {
            let data = {
                ID:id,
                Nap:nap,
                Nyitas:nyitas,
                Zaras:zaras,
                Napid:napid
            }
            let deferred = $q.defer();
            $http.post(url + '/openinsert',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //helyfoglalás select
        
        reservationSelect:function(id,feltetel) {
            let data = {
                ID:id,
                Feltetel:feltetel
            }
            let deferred = $q.defer();
            $http.post(url + '/reservationSelect',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //helyfoglalás update
        
        reservationUpdate:function(id,kezdes,fo) {
            let data = {
                ID:id,
                Kezdes:kezdes,
                Fo:fo
            }
            let deferred = $q.defer();
            $http.post(url + '/reservationUpdate',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //helyfoglalás törlés
  
        reservationDelete:function(id) {
            let data = {
                ID:id
            }
            let deferred = $q.defer();
            $http.post(url + '/reservationDelete',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //kép select

        imageselect:function(id) {
            let data = {
                ID:id
            }
            let deferred = $q.defer();
            $http.post(url + '/imageselect',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //képek delete

        imagedelete:function(id) {
            let data = {
                ID:id
            }
            let deferred = $q.defer();
            $http.post(url + '/imagedelete',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //képek update

        imageupdate:function(id,img) {
            let data = {
                ID:id,
                IMG:img
            }
            let deferred = $q.defer();
            $http.post(url + '/imageupdate',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //képek insert

        imageinsert:function(id,img) {
            let data = {
                EtteremID:id,
                IMG:img
            }
            let deferred = $q.defer();
            $http.post(url + '/imageinsert',data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        //idő kekérdezésse
        
        time:function() {
            let deferred = $q.defer();
            $http.get(url + '/time').then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        }
    }
});