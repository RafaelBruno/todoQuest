(function() {
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
