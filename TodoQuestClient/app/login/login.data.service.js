/**
* Data Service Login
* @namespace Data Service
* @desc Data services of Login and Create New User
* @listens index.html
*/

(function() {
  'use strict';

  angular.module('login.data.service', [])
  .factory('loginDataService', loginDataService);
  loginDataService.$inject = ['toastr', 'util', 'URL', '$http', '$q'];

  function loginDataService(toastr, util, URL, $http, $q) {

    var service = {
      login : login,
      subscribe : subscribe
    };

    return service;

    /////////////////////


    /**
    * @namespace login
    * @desc DESC
    */
    function login(login, pass) {
      return $http.get(URL + '/acesso/login/' + login + "&" + pass)
      .then(function (res) {
        return res.data;
      }, function (res) {
        toastr.error("ERRO : dataService : login");
        console.error(res);
      });
    };

    /**
    * @namespace subscribe
    * @desc DESC
    */
    function subscribe(systemUser) {
      return $http.post(URL + '/user/subscribe/', systemUser)
      .then(function (res) {
        return res.data;
      }, function (res) {
        toastr.error("ERRO : dataService : subscribe");
        console.warn(res);
        return res.data;
      });
    };

  }
})();
