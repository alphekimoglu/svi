'use strict'
angular.module('cesiLib',[])


.factory('cesiService',['$http', '$q', '$rootScope', function($http,$q,$rootScope) {

     return {
         list : function () {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/node/name/list')
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         dashboard : function () {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/dashboard')
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         changepassword : function (data) {
             console.log($.param(data));
             var deferred =$q.defer();
             $http({
                method: 'POST',
                url: 'http://192.168.1.155:5000/change/password/' + ($rootScope.username || "") + '/handler',
                data: $.param(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             })
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         getusers : function () {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/delete/user')
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

        deleteuser : function (username) {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/delete/user/' + username)
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         log : function () {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/activitylog')
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         load : function () {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/node/srv2')
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         login : function (data) {
            console.log($.param(data));
             var deferred =$q.defer();
             $http({
                method: 'POST',
                url: 'http://192.168.1.155:5000/login/control',
                data: $.param(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             })
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         add : function (data) {
            console.log($.param(data));
             var deferred =$q.defer();
             $http({
                method: 'POST',
                url: 'http://192.168.1.155:5000/add/user/handler',
                data: $.param(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             })
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         logout : function () {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/logout')
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         restart : function (process) {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/node/srv2/process/'+process.name+':'+process.group+'/restart')
             .then(function (response) {
                deferred.resolve(response);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return deferred.promise;
         },
         
         start : function (process) {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/node/srv2/process/'+process.name+':'+process.group+'/start')
             .then(function (response) {
                deferred.resolve(response);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return deferred.promise;
         },

         stop : function (process) {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/node/srv2/process/'+process.name+':'+process.group+'/stop')
             .then(function (response) {
                deferred.resolve(response);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return deferred.promise;

             /*return $http.get('http://192.168.1.155:5000/node/srv2/process/'+process.name+':'+process.group+'/stop')*/
         }
     };


}])
