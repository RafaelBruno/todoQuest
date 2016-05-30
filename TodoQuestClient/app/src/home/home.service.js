(function() {
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
