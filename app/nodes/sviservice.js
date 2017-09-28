'use strict'
angular.module('cesiLib',[])


.factory('cesiService',['$http', '$q', function($http,$q) {

     return {
         list : function () {
             var deferred =$q.defer();
             $http.get('http://127.0.0.1:5000/node/name/list')
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
             $http.get('http://127.0.0.1:5000/node/srv2')
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
             $http.get('http://127.0.0.1:5000/node/srv2/process/'+process.name+':'+process.group+'/restart')
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
             $http.get('http://127.0.0.1:5000/node/srv2/process/'+process.name+':'+process.group+'/start')
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
             $http.get('http://127.0.0.1:5000/node/srv2/process/'+process.name+':'+process.group+'/stop')
             .then(function (response) {
                deferred.resolve(response);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return deferred.promise;

             return $http.get('http://127.0.0.1:5000/node/srv2/process/'+process.name+':'+process.group+'/stop')
         }
     };


}])
