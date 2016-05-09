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
    'directive.dropdownSelect'
  ]);

})();
;/**
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
;/**
* Constants
* @namespace app.constants
* @desc Este modulo contem todas as contants do sistema, inclusive URLs de
* acesso ao servidor.
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
;(function() {
  'use strict';

  /* recomendado */
  /* calendarRange.directive.js */
  /**
  * @desc diretiva de dropdown select do flat Ui
  * @example <div dropdown-select></div>
  */
  angular.module('directive.dropdownSelect', [])
  .directive('dropdownSelect', dropdownSelect);

  function dropdownSelect() {
    var directive = {
      link: link,
      restrict: 'EA'
    };
    return directive;
    function link(scope, element, attrs) {
      $(element).select2({dropdownCssClass: 'dropdown-inverse'});
    }
  }
})();
;(function() {
  'use strict';

  angular.module('data.service', [])
  .factory('dataService', dataService);
  dataService.$inject = ['toastr', 'util', '$http'];

  function dataService(toastr, util, $http) {
    return {
      getAvatar : getAvatar
    };

    function getAvatar() {
      return $http.get('/mock/getAvatar.json')
      .then(getAvatarComplete)
      .catch(getAvatarFailed);

      function getAvatarComplete(response) {
        return response.data.result;
      }

      function getAvatarFailed(error) {
        toastr.error('XHR Failed for getgetAvatar.' + error.data);
      }
    }
  }
})();
;/**
* Home Controller
* @namespace Module
* @desc Controller da Home/Dashboard
* @listens home.html
*/

(function() {
  'use strict';

  angular
  .module('home.controller', [])
  .controller('homeController', homeController);

  homeController.$inject = ['toastr', 'util', 'moment', 'homeService', 'dataService'];

  /**
  * @namespace homeController
  * @desc Controller do home, contem as logicas base de controller das
  * QUESTS, MISSIONS, POMODORO, TAGS, AVATAR
  */
  function homeController(toastr, util, moment, homeService, dataService){
    var ctrl = this;
    ctrl.inMission = false;
    ctrl.timer = null;
    ctrl.avatar = new Avatar();
    ctrl.quest = new Quest();
    ctrl.quests = [];

    /*INIT*/
    ctrl.init = init;

    /*MISSION*/
    ctrl.startMission = startMission;
    ctrl.stopMission = stopMission;
    ctrl.restartMission = restartMission;

    /*AVATAR*/
    ctrl.getAvatar = getAvatar;

    /*QUEST*/
    ctrl.addQuest = addQuest;


    init();

    function init(){
      getAvatar();
    }

    function startMission(){
      ctrl.inMission = true;
      ctrl.timer = homeService.mission().getTimer();
    }

    function stopMission(){
      ctrl.inMission = false;
      homeService.mission().stop(ctrl.timer);
    }

    function restartMission(){
      homeService.mission().stop(ctrl.timer);
      startMission();
    }

    function getAvatar(){
      dataService.getAvatar().then(function(response){
        console.log(response);
        ctrl.avatar = response;
      });
    }

    function addQuest(){
      util.goToModal('questModal');
    }
  }

})();
;(function() {
  'use strict';

  angular.module('home.service', [])
  .factory('homeService', homeService);
  homeService.$inject = ['toastr', 'util', 'moment', '$interval'];

  function homeService(toastr, util, moment, $interval) {
    return {
      mission : mission,
    };

    function mission(){
      var time = moment.duration(1500000, 'milliseconds');
      var duration = time;
      var interval = 1000;
      var timer = null;

      return {
        getTimer : getTimer,
        stop : stop
      }

      function getTimer(){
        timer =  $interval(function (){
          duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
          var percent = ((((duration.asMilliseconds() - interval) * 100) / 1500000) - 100) * (-1);
          $('.timerMission').text(moment(duration.asMilliseconds()).format('mm:ss'));
          $('#pomodoroProgress').width(percent+"%");
        }, interval);
        return timer;
      }

      function stop(timer){
        $interval.cancel(timer);
      }
    }
  }
})();
;function Avatar(){
  var userId;
  var level;
  var coins;
  var quantMissions;
  var xp;
  var mana;
  var avatarType;
  var sex;
  var helmet;
  var armour;
  var sword;
  var shield;
  var magic;
  var pet;
}
;function Item(){
  var userID;
  var name;
  var desc;
  var urlImg;
  var price;
}
;function Mission(){
  var userId;
  var type;
  var dateTime;
  var questsList = [quest];
}
;function Quest (){
  var userId;
  var title;
  var description;
  var tags = [Tag];
  var dateTime;
  var difficulty;
  var isCompleted;
  var droppedCoins;
}
;function Tag(){
  var userId;
  var title;
  var points;
  var color;
}
;function User(){
  var login;
  var password;
  var firstName;
  var lastName;
  var nickname;
  var linkedin;
  var twitter;
  var clientIdGoogle;
}
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
    redirectToByFrame : redirectToByFrame,
    goToModal : goToModal
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
  };

  /**
  * @namespace redirectTo
  * @desc Redireciona para uma url ou rota dentro do sistema ou externa
  * @param {String} url : URL de destino
  */
  function redirectTo(url){
    window.location.replace(url);
  };

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
  };


  /**
  * @namespace goToModal
  * @desc Mostra modais do bootstrap, escondendo qualquer outra modal visivel
  * @param {String} id : id da modal a ser mostrada
  */
  function goToModal(id){
    $(".modal").modal('hide');
    setTimeout(function () {
      $("#"+id).modal('show');
    }, 100);
  };

}
