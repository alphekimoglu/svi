'use strict'
angular.module('cesiLib',[])


.factory('cesiService',['$http','$q', function($http,$q) {
     var path = 'http://192.168.1.155:5000/';
     return {

        dashboard : function () {
             var deferred =$q.defer();
             $http.get(path+'dashboard')
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         changepassword : function (data) {
             //console.log($.param(data));
             var deferred =$q.defer();
             $http({
                method: 'POST',
                url: path+'change/password/' + ($rootScope.username || "") + '/handler',
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

        userInfo : function () {
             var deferred =$q.defer();
             $http.get('http://192.168.1.155:5000/userinfo')
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
             $http.get(path+'delete/user')
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
             $http.get(path+'delete/user/' + username)
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
             $http.get(path+'activitylog')
             .then(function (response) {
                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         reload : function (node) {
             var deferred =$q.defer();
             $http.get(path+'node/'+node)
             .then(function (response) {

                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },

         login : function (data) {
            //console.log($.param(data));
             var deferred =$q.defer();
             $http({
                method: 'POST',
                url: path+'login/control',
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
            //console.log($.param(data));
             var deferred =$q.defer();
             $http({
                method: 'POST',
                url: path+'add/user/handler',
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
             $http.get(path+'logout')
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
             $http.get(path+'node/name/list')
             .then(function (response) {


                 deferred.resolve(response.data);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return  deferred.promise;
         },


         restart : function (node,process) {
             var deferred =$q.defer();
             $http.get(path+'node/'+node+'/process/'+process.name+':'+process.group+'/restart')
             .then(function (response) {
                deferred.resolve(response);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return deferred.promise;
         },
         
         start : function (node,process) {
             var deferred =$q.defer();
             $http.get(path+'node/'+node+'/process/'+process.name+':'+process.group+'/start')
             .then(function (response) {
                deferred.resolve(response);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return deferred.promise;
         },

         stop : function (node,process) {
             var deferred =$q.defer();
             $http.get(path+'node/'+node+'/process/'+process.name+':'+process.group+'/stop')
             .then(function (response) {
                deferred.resolve(response);
             })
             .catch(function (response) {
                 deferred.reject(response);
             });
             return deferred.promise;

             //return $http.get('http://127.0.0.1:5000/node/srv2/process/'+process.name+':'+process.group+'/stop')
         }
     };


}])
