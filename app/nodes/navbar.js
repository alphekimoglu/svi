'use strict';

function notify(type, message) {
  $.notify({
    // options
    message: message,
  },{
    // settings
    type: type
  });
};

function findType (type) {
  switch (type) {
    case '0', 0:
      return "Admin"
      break;
    case '1', 1:
      return "Standart User"
      break;
    case '2', 2:
      return "Only Log"
      break;
    case '3', 3:
      return "Read Only"
      break;
    default:
      return "Unknown"
      break;
  }
}

var navbar = angular.module('myApp.navbar', ['ngRoute', 'cesiLib']);

navbar.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/addUser', {
    templateUrl: 'nodes/addUser.html',
    controller: 'AddUserCtrl'
  })
  .when('/changePassword', {
    templateUrl: 'nodes/changePassword.html',
    controller: 'ChangePaswordCtrl'
  })
  .when('/deleteUser', {
    templateUrl: 'nodes/deleteUser.html',
    controller: 'DeleteUserCtrl'
  })
  .when('/logout', {
    template: '',
    controller: 'LogoutCtrl'
  });
}]);

navbar.controller('NavbarCtrl', ['$scope','cesiService', '$rootScope', function ($scope, cesiService, $rootScope) {
  cesiService.userInfo().then(function (data) {
      $rootScope.username = data['username'];
      $rootScope.usertype = findType(data['usertypecode']);
      document.getElementById('show-account').innerHTML = data['username'] + " (" + $rootScope.usertype + ")";
      document.getElementById('username').innerHTML = data['username'];
  });
}]);

navbar.controller('AddUserCtrl', ['$scope','cesiService', function ($scope, cesiService) {
  $scope.submit = function () {
        cesiService.add($scope.form).then(function (data) {
            document.getElementById('add-user-button').disabled = false;
            document.getElementById('add-user-button').value = "Save";

            switch (data.status) {
              case "success":
                notify("success", data.message);
                break;
              case "warning":
                notify("warning", data.message);
                break;
              case "error":
                notify("danger", data.message);
                break;
              default:
                notify("danger", "Error!");
                break;
            }

            document.getElementById("add-user-form").reset();
        });

        document.getElementById('add-user-button').disabled = true;
        document.getElementById('add-user-button').value = "Adding User";
    };
}]);

navbar.controller('ChangePaswordCtrl', ['$scope','cesiService', function ($scope, cesiService) {
  $scope.submit = function () {
        cesiService.changepassword($scope.form).then(function (data) {
            document.getElementById('change-password-button').disabled = false;
            document.getElementById('change-password-button').value = "Change Password";

            switch (data.status) {
              case "success":
                notify("success", "Password Has Been changed");
                break;
              case "error":
                notify("danger", data.message);
                break;
              default:
                notify("danger", "Error!");
                break;
            }

            document.getElementById("change-password-form").reset();
        });

        document.getElementById('change-password-button').disabled = true;
        document.getElementById('change-password-button').value = "Changing Password";
    };
}]);

navbar.controller('DeleteUserCtrl', ['$scope','cesiService', function ($scope, cesiService) {
  $scope.users = [];

  $scope.refresh = function () {
    cesiService.getusers().then(function (data) {
        $scope.users = [];
      for (var i = 0; i < data['names'].length; i++) {

        if (data['names'][i] === "admin") {continue;}
        $scope.users.push({name:data['names'][i], type:findType(data['types'][i])})
      }

      console.log($scope.users);
    });   
  };

  $scope.deleteUser = function (arg) {
        cesiService.deleteuser(arg).then(function (data) {
            switch (data.status) {
              case "success":
                notify("success", "User is Deleted");
                break;
              case "error":
                notify("danger", data.message);
                break;
              default:
                notify("danger", "Error!");
                break;
            }
        });
        $scope.refresh();
    };

    $scope.refresh();
}]);

navbar.controller('LogoutCtrl', ['cesiService', function(cesiService) {
    cesiService.logout().then(function (data) {
      window.location.replace('/login');
    });
}]);