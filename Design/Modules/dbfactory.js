app.factory('dbfactory', function($http, $q) {
    let url = 'http://localhost:8080';
    return {
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

        admindiningupdate:function(id,nev,email,telefon,cim,ferohely,leiras,parkolo,bankkartya,glutenmentes,terasz,berelheto,hazhozszallitas,statusz) {
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
                Statusz:statusz
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
         admindininginsert:function(id,nev,email,telefon,cim,ferohely,leiras,parkolo,bankkartya,glutenmentes,terasz,berelheto,hazhozszallitas,statusz) {
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
                Statusz:statusz
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
        // SELECT WHAT I WANT
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

        // SELECT ALL
        selectAll: function(tablename) {
            let deferred = $q.defer();

            $http.get(url + '/' + tablename).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // SELECT ONE RECORD
        select: function(tablename, id) {
            let deferred = $q.defer();

            $http.get(url + '/' + tablename + '/' + id).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // INSERT ONE RECORD
        insert: function(tablename, values) {
            let deferred = $q.defer();

            $http.post(url + '/' + tablename, values).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // UPDATE ONE RECORDS
        update: function(tablename, id, values) {
            let deferred = $q.defer();

            $http.patch(url + '/' + tablename + '/' + id, values).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // DELETE ONE RECORDS
        delete: function(tablename, id) {
            let deferred = $q.defer();

            $http.delete(url + '/' + tablename + '/' + id).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // DELETE ALL RECORDS
        deleteAll: function(tablename) {
            let deferred = $q.defer();
            $http.delete(url + '/' + tablename).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        }
       /* logged:function(){
        let deferred=q.defer();
        $http.get(url+"/logged").then(
            function(res) {
                deferred.resolve(res.data);
            },
            function(err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
        }*/
    }
});