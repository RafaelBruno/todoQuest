/**
* App Module
* @namespace app.module
* @desc Modulo de Inicialização do App
* @listens template.html
*/


(function() {
  'use strict';

  angular.module('app',
  [
    'app.core',
    'data.service',
    /*
    * Feature areas
    */
    'home.controller',
    'home.service',

    /*
    *Directives
    */
    'directive.dropdownSelect',
    'directive.angularRating'
  ]);

})();
