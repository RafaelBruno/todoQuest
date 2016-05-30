(function() {
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
