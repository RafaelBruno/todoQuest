/**
* Core Modules
* @namespace App Core
* @desc Modulos referentes ao core da aplicação, todas os modulos default
* da aplicação devem ser declarados neste modulo.
*/
(function() {
  'use strict';

  angular.module('app.core', [
    /*
    * Angular modules
    */
    'ngSanitize',
    'ui.router',
    /*
    * Core modules
    */
    'app.util',
    'app.constants',
    'app.router'
  ])
})();
