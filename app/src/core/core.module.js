/**
* Core Modules
* @namespace App Core
* @desc Modulos referentes ao core da aplicação, todas os modulos default
* da aplicação devem ser declarados neste modulo.
*/
(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngRoute',
        'ngSanitize',
        /*
         * Core modules
         */
        'app.util',
        'app.constants',
        'app.routes',
    ]);
})();
