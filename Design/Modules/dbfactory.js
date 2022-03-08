app.factory('dbfactory', function($http, $q) {
    let url = 'http://localhost:8080';
    return {
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
        emailcheck: function(email) {
            let deferred = $q.defer();
            let data = {
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

        //admin Selects
        
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