'use strict';

angular.module('myApp.nodes', ['ngRoute', 'cesiLib'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes', {
    templateUrl: 'nodes/nodes.html',
    controller:  'NodesCtrl'
  });
}])

.controller('NodesCtrl', ['$scope','cesiService', function($scope, cesiService){

    $scope.processes = [];
    $scope.nodes = [];
    $scope.list = function () {
       cesiService.list().then(function (data) {
          $scope.nodes = data.node_name_list;
       });
    };
    $scope.list();

    $scope.load= function () {
        cesiService.load().then(function (data) {
            $scope.processes = data.process_info;
        });
    };
    $scope.load();


    $scope.restart= function(process){
        cesiService.restart(process).then(function () {
            $scope.load();
        });
    };

    $scope.start = function (process) {
        cesiService.start(process).then(function () {
            $scope.load();
        });
    };

    $scope.stop = function (process) {
        cesiService.stop(process).then(function () {
            $scope.load();
        });
    };











 /*
  $scope.stop= function (process) {
      $http({
        method:'GET',
        url: 'http://127.0.0.1:5000/node/srv2/process/'+process.name+':'+process.group+'/stop',

      }).then(function(process){
        $scope.reload();
     });
  };
  $scope.start= function (process) {
      $http({
        method:'GET',
        url: 'http://127.0.0.1:5000/node/srv2/process/'+process.name+':'+process.group+'/start',

      }).then(function(response){
        $scope.reload();
     });
  };*/


  /*$http.post('http://127.0.0.1:5000/login/control',('admin','admin')).then(function(result) {
      if (result.data.success) {
          print("success");
      } else {
          print("fail");
      }
  });*/
}]);




