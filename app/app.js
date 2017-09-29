'use strict';

var interceptor = function ($q, $location) {
  return {
    request: function (config) {//req
    return config;
  },

  response: function (result) {//res
    console.log('Repos:');
    console.log(result);
    return result;
  },

  responseError: function (rejection) {//error
    console.log('Failed with', rejection.status, 'status');
      if (rejection.status == 403) {
          $location.url('/login');
      }

      return $q.reject(rejection);
}}};

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'cesiLib',
  'myApp.dashboard',
  'myApp.dashboards',
  'myApp.nodes',
  'myApp.groups',
  'myApp.version',
  'myApp.navbar'
]).config(['$routeProvider' , '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
   $locationProvider.hashPrefix('!');
   $httpProvider.interceptors.push(interceptor);
   $routeProvider.otherwise({redirectTo: '/dashboard'});
 }]);

/*
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'cesiLib',
  'myApp.dashboard',
  'myApp.nodes',
  'myApp.groups',
  'myApp.version',
  'myApp.navbar'
]).
config(['$locationProvider', '$routeProvider','$httpProvider', function($httpProvider, $locationProvider, $routeProvider) {
  $locationProvider.hashPrefix("!");
  $httpProvider.interceptors.push(interceptor);
  $routeProvider.otherwise({redirectTo: '/home'});
}]); */
