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
        .constant('moment', moment)
        .constant('URL', 'http://177.153.20.138:8080/todoQuest/webservices');
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
    'ngCookies',
    'ngResource',
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
;(function() {
  'use strict';

  /* angularRating.js */
  /**
  * @desc diretiva de Rating(Start) com angularjs
  * @example <div angular-rating></div>
  */
  angular.module('directive.angularRating', [])
  .directive('angularRating', angularRating);

  function angularRating() {
    var directive = {
      restrict: 'EA',
      template: '<ul class="rating">' +
      '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
      '\u2605' +
      '</li>' +
      '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        onRatingSelected: '&'
      },
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {

      var updateStars = function () {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
      };

      scope.toggle = function (index) {
        scope.ratingValue = index + 1;
        scope.onRatingSelected({
          rating: index + 1
        });
      };

      scope.$watch('ratingValue', function (oldVal, newVal) {
        if (newVal) {
          updateStars();
        }
      });
    }
  }
})();
;(function() {
  'use strict';

  /* dropdownSelect.js */
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
    ctrl.rating = new Rating();

    ctrl.avatar = new Avatar();
    ctrl.quest = new Quest();
    ctrl.tag = new Tag();

    ctrl.quests = [];
    ctrl.tags = [];
    ctrl.itens = [];
    ctrl.colorsTag = homeService.tagColorOptions();

    /*INIT*/
    ctrl.init = init;
    ctrl.goToModal = util.goToModal;

    /*MISSION*/
    ctrl.startMission = startMission;
    ctrl.stopMission = stopMission;
    ctrl.restartMission = restartMission;

    /*AVATAR*/
    ctrl.getAvatar = getAvatar;
    ctrl.getXpBarWidth = getXpBarWidth;

    /*QUEST*/
    ctrl.addQuest = addQuest;
    ctrl.getSelectedRating = getSelectedRating;


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

  function Rating(){
    this.current = 1;
    this.max = 8;
  }

  function getSelectedRating(rating) {
    console.log(rating);
  }

  function getXpBarWidth(){
    var nextLevelXp = ctrl.avatar.lvl * 10;
    var avatarXpPercent = ((avatarXp / nextLevelXp) * 100);
    return avatarXpPercent + "%";
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
      tagColorOptions : tagColorOptions
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

    function tagColorOptions(){
      return [
        "#F44336","#E91E63","#9C27B0","#673AB7", "#3F51B5","#2196F3","#03A9F4",
        "#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107",
        "#FF9800","#FF5722","#795548","#9E9E9E","#607D8B","#000000"
      ]
    }
  }
})();
;function Avatar(){
  this.lvl = "1";
  this.coins = "0";
  this.quantMissions = "0";
  this.xp = "0";
  this.mana = "0";
  this.avatarType = "default";
  this.sex = "default";
  this.selectedItems = [];
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
;function SystemUser(){
  this.login = "";
  this.password = "";
  this.firstName = "";
  this.lastName = "";
  this.nickname = "";
  this.linkedin = "";
  this.twitter = "";
  this.clientIdGoogle = "";
  this.tags = [];
  this.items = [];
  this.avatar = {};
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
    containsEmpty : containsEmpty,
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
  * @namespace containsEmpty
  * @desc Verifica se um array contem alguma variavel vazia
  * @returns {Boolean}
  * @param {String} value : valor que sera verificado
  * @param {String} msg : mensagem caso o valor seja null
  * OBS: o param msg não é obrigatorio caso não tenha o param msg a mensagem
  * não será exibida
  */
  function containsEmpty(array, msg){
    for (var i = 0; i < array.length; i++) {
      if(typeof array[i] === ""){
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
