/**
* Router
* @namespace App router
* @desc Modulos referentes as rotas da aplicação
*/
(function() {
  'use strict';

  angular.module('app.router', [])
  .config(Routes);
  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function Routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
    .state('home', {
      url: "/home",
      controller: 'homeController',
      controllerAs: 'ctrl',
      title: 'avengers',
      templateUrl: "../home/home.html"
    })
  }
})();
