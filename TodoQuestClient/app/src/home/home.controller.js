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
