/**
* Login Module
* @namespace login.module
* @desc Modulo de Inicialização do Login
* @listens index.html
*/


(function() {
  'use strict';

  angular.module('login',
  [
    'app.core',
    /*
    * Feature areas
    */
    'login.controller'
  ]);

})();
