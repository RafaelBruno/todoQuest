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
    'app.core'
    /*
    * Feature areas
    */

  ]);

})();
;config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "partials/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});
;/**
* Constants
* @namespace app.constants
* @desc Modulos referentes ao core da aplicação, todas os modulos default
* da aplicação devem ser declarados neste modulo.
*/
(function() {
    'use strict';
    angular
        .module('app.constants', [])
        .constant('toastr', toastr)
        .constant('moment', moment);
})();
;/**
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
        'ngRoute',
        'ngSanitize',
        /*
         * Core modules
         */
        'app.util',
        'app.constants',
        'app.routes',
    ]);
})();
;/**
* Util Service
* @namespace app.util
* @desc Contem funções uteis para o desenvolvimento da aplicação
*/


angular.module('app.util', [])
.factory('util', util);
util.$inject = ['$q', 'toastr' , '$location'];

function util($q, toastr, $location) {

  var service = {
    isUndefined : isUndefined,
    containsUndefined : containsUndefined,
    redirectTo : redirectTo,
    redirectToByFrame : redirectToByFrame
  };

  return service;

  /////////////////////

  /**
  * @namespace isUndefined
  * @desc Verifica se uma variavel esta undefined
  * @returns {Boolean}
  * @param {String} value : valor que sera verificado
  * @param {String} msg : mensagem caso o valor seja null
  * OBS: o param msg não é obrigatorio caso não tenha o param msg a mensagem
  * não será exibida
  */
  function isUndefined(value, msg) {
    if(typeof value === "undefined" || typeof value == "undefined"){
      if(msg){
        toastr.warning(msg);
      }
      return true;
    }
    return;
  };


  /**
  * @namespace containsUndefined
  * @desc Verifica se um array contem alguma variavel undefined
  * @returns {Boolean}
  * @param {String} value : valor que sera verificado
  * @param {String} msg : mensagem caso o valor seja null
  * OBS: o param msg não é obrigatorio caso não tenha o param msg a mensagem
  * não será exibida
  */
  function containsUndefined(array, msg){
    for (var i = 0; i < array.length; i++) {
      if(typeof array[i] === "undefined" || typeof array[i] == "undefined"){
        if(msg){
          toastr.warning(msg);
        }
        return true;
      }
    }
    return;
  }

  /**
  * @namespace redirectTo
  * @desc Redireciona para uma url ou rota dentro do sistema ou externa
  * @param {String} url : URL de destino
  */
  function redirectTo(url){
    window.location.replace(url);
  }

  /**
  * @namespace redirectToByFrame
  * @desc Redireciona para uma rota para sistemas que estão rodando dentro de
  * um iframe. ***OBS*** O iframe deve estar com o ID: frameApp, caso contrario
  * o browser não vai guardar o historico de navegação dentro do frame e não
  * fará o redirecionamento corretamente
  * @param {String} url : URL de destino
  */
  function redirectToByFrame(url){
    $('#frameApp').get(0).contentWindow.location.replace(url);
  }

}
