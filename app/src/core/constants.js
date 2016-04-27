/**
* Constants
* @namespace app.constants
* @desc Modulos referentes ao core da aplicação, todas os modulos default
* da aplicação devem ser declarados neste modulo.
*/
(function() {
    'use strict';
    angular
        .module('app.constants', [])
        .constant('toastr', toastr)
        .constant('moment', moment);
})();
