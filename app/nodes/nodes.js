'use strict';

angular.module('myApp.nodes', ['ngRoute', 'cesiLib',"ngTable"])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes', {
    templateUrl: 'nodes/nodes.html',
    controller:  'NodesCtrl'
  });
}])

.controller('NodesCtrl', ['$scope','cesiService','NgTableParams', function($scope, cesiService, NgTableParams){
    $scope.nodelist=[];
    $scope.nodes=[];
    $scope.mainflag;
    $scope.flag = [];
    $scope.tableParams=[];


    /*Function that calculate uptime of process by using Data.now() function and start time of process*/

    $scope.uptime= function (start) {
        var years=0;
        var months=0;
        var seconds =(Date.now()/1000)-start;
        var days = Math.floor(seconds/86400);

        var hours = Math.floor((seconds % 86400) / 3600);
        var mins = Math.floor(((seconds % 86400) % 3600) / 60);
        var secs = Math.floor((seconds % 86400) % 3600) % 60;
        var uptime = new Date(years,months,days,hours,mins,secs);
        //var uptime=days.toString()+':'+hours.toString()+':'+mins.toString()+':'+secs.toString();
        return uptime;
        //return seconds;*/

    };


    /*Function that reloads node status to ng-table*/
    $scope.reload= function (index) {

        cesiService.reload($scope.nodelist[index]).then(function (data) {

            $scope.nodes[index]=[];
            $scope.nodes[index]= data.process_info;
           // console.log($scope.nodes[index]);
            $scope.tableParams[index]= new NgTableParams({},{dataset: $scope.nodes[index]});
            //console.log($scope.tableParams[index]);

            //console.log($scope.tableParams);
            //console.log($scope.nodes[index]);

        });

    };

    /*Function that loads all the nodes and processes by calling reload for each node used by refresh button and first load of page*/
    $scope.load = function () {
       $scope.mainflag=true;
       cesiService.load().then(function (data) {
          $scope.nodelist = data.node_name_list;
           angular.forEach($scope.nodelist,function (value,key) {
                //console.log(key);
               $scope.reload(key);

           });
           $scope.mainflag=false;

       });

    };
    $scope.load(); //First load off page when it has opened




    /*Function that restarts a process of node by using inputs given by ng-table*/
    $scope.restart= function(index,node,process){
        $scope.flag[index]=true;
        cesiService.restart(node,process).then(function () {
            $scope.reload(index);
            $scope.flag[index] =false;
        });
    };
    /*Function that starts a process of node which is currently stopped by using inputs given by ng-table*/
    $scope.start = function (index,node,process) {
        $scope.flag[index]=true;
        cesiService.start(node,process).then(function () {
            $scope.reload(index);
            $scope.flag[index]=false;
        });
    };
    /*Function that stops a process of a node which is currently running by using inputs given by ng-table*/
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




