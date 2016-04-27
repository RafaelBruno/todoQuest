/**
* Login Controller
* @namespace Module
* @desc Controller do Login
* @listens index.html
*/

(function() {
  'use strict';

  angular
  .module('login.controller', [])
  .controller('loginController', loginController);

  loginController.$inject = ['toastr', 'util'];

  /**
  * @namespace loginController
  * @desc Controller do login, contem a logica de login do sistema
  */
  function loginController(toastr, util){
    var ctrl = this;
    ctrl.validate = validate;

    function validate(user, password){
      var msg = "Insert your login and password!";
      if(!util.containsUndefined([user, password], msg)){
        util.redirectTo('../app/src/layout/app.html');
      }
    }
  }

})();
;/**
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
