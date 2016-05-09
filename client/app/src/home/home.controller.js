/**
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
