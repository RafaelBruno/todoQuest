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
        .constant('moment', moment)
        .constant('URL', 'http://177.153.20.138:8080/todoQuest/webservices');
})();
