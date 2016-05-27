/**
* Login Controller
* @namespace Module
* @desc Controller of Login and Create new Users
* @listens index.html
*/

(function() {
  'use strict';

  angular
  .module('login.controller', [])
  .controller('loginController', loginController);

  loginController.$inject = ['toastr', 'util', 'loginDataService'];

  /**
  * @namespace loginController
  * @desc Controller do login, login and create new user logic
  */
  function loginController(toastr, util, loginDataService){
    var ctrl = this;
    ctrl.validate = validate;
    ctrl.goToModal = util.goToModal;
    ctrl.newUser = new SystemUser();
    ctrl.confirmPassword = "";

    ctrl.createUser = createUser;

    function validate(user, password){
      var msg = "Insert your login and password! :)";
      if(!util.containsUndefined([user, password], msg)){
        toastr.success('Login')
      }
    }


    function createUser(systemUser){
      systemUser.avatar = new Avatar();
      if(systemUser.firstName !== "" &&  systemUser.lastName !== "" && systemUser.login !== "" && systemUser.password !== ""){
        if(systemUser.password.length >= 6){
          if(systemUser.password === ctrl.confirmPassword){
            loginDataService.subscribe(systemUser).then(function(result){
              if(result.data){
                toastr.success("Welcome "+ systemUser.firstName +"! :)")
              }
            });
          }else{
            toastr.warning('The confirmation is wrong! :)');
          }
        }else{
          toastr.warning('Password small, insert one password with more of 5 characters! :)');
        }
      }else{
        toastr.warning("Insert your all fields! :)");
      }
    }


  }

})();
