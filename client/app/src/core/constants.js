/**
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
