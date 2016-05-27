(function() {
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
