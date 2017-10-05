'use strict';

angular.module('myApp.nodes', ['ngRoute', 'cesiLib'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes', {
    templateUrl: 'nodes/nodes.html',
    controller:  'NodesCtrl'
  });
}])

.controller('NodesCtrl', ['$scope','cesiService', function($scope, cesiService){
    $scope.nodelist=[];
    $scope.nodes=[];
    $scope.flag = [];


    $scope.reload= function (index) {
        cesiService.reload($scope.nodelist[index]).then(function (data) {
            $scope.nodes[index]=[];
            $scope.nodes[index]= data.process_info;
        });
    };


    $scope.load = function () {

       cesiService.load().then(function (data) {
          $scope.nodelist = data.node_name_list;
           angular.forEach($scope.nodelist,function (value,key) {

               $scope.reload(key);
           });

       });

    };
    $scope.load();

    
    $scope.startAll = function () {
      cesiService.startAll().then($scope.load());
    }

    $scope.stopAll = function () {
      cesiService.stopAll().then($scope.load());
    }

    $scope.restartAll = function () {
      cesiService.restartAll().then($scope.load());
    }

    $scope.restart= function(index,node,process){
        $scope.flag[index]=true;
        cesiService.restart(node,process).then(function () {
            $scope.reload(index);
            $scope.flag[index] =false;
        });
    };

    $scope.start = function (index,node,process) {
        $scope.flag[index]=true;
        cesiService.start(node,process).then(function () {
            $scope.reload(index);
            $scope.flag[index]=false;
        });
    };

    $scope.stop = function (index,node,process) {
        $scope.flag[index]=true;
        cesiService.stop(node,process).then(function () {
            $scope.reload(index);
            $scope.flag[index]=false;
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




