(function() {
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
