/**
* Util Service
* @namespace app.util
* @desc Contem funções uteis para o desenvolvimento da aplicação
*/


angular.module('app.util', [])
.factory('util', util);
util.$inject = ['$q', 'toastr' , '$location'];

function util($q, toastr, $location) {

  var service = {
    isUndefined : isUndefined,
    containsUndefined : containsUndefined,
    redirectTo : redirectTo,
    redirectToByFrame : redirectToByFrame,
    goToModal : goToModal
  };

  return service;

  /////////////////////

  /**
  * @namespace isUndefined
  * @desc Verifica se uma variavel esta undefined
  * @returns {Boolean}
  * @param {String} value : valor que sera verificado
  * @param {String} msg : mensagem caso o valor seja null
  * OBS: o param msg não é obrigatorio caso não tenha o param msg a mensagem
  * não será exibida
  */
  function isUndefined(value, msg) {
    if(typeof value === "undefined" || typeof value == "undefined"){
      if(msg){
        toastr.warning(msg);
      }
      return true;
    }
    return;
  };


  /**
  * @namespace containsUndefined
  * @desc Verifica se um array contem alguma variavel undefined
  * @returns {Boolean}
  * @param {String} value : valor que sera verificado
  * @param {String} msg : mensagem caso o valor seja null
  * OBS: o param msg não é obrigatorio caso não tenha o param msg a mensagem
  * não será exibida
  */
  function containsUndefined(array, msg){
    for (var i = 0; i < array.length; i++) {
      if(typeof array[i] === "undefined" || typeof array[i] == "undefined"){
        if(msg){
          toastr.warning(msg);
        }
        return true;
      }
    }
    return;
  };

  /**
  * @namespace redirectTo
  * @desc Redireciona para uma url ou rota dentro do sistema ou externa
  * @param {String} url : URL de destino
  */
  function redirectTo(url){
    window.location.replace(url);
  };

  /**
  * @namespace redirectToByFrame
  * @desc Redireciona para uma rota para sistemas que estão rodando dentro de
  * um iframe. ***OBS*** O iframe deve estar com o ID: frameApp, caso contrario
  * o browser não vai guardar o historico de navegação dentro do frame e não
  * fará o redirecionamento corretamente
  * @param {String} url : URL de destino
  */
  function redirectToByFrame(url){
    $('#frameApp').get(0).contentWindow.location.replace(url);
  };


  /**
  * @namespace goToModal
  * @desc Mostra modais do bootstrap, escondendo qualquer outra modal visivel
  * @param {String} id : id da modal a ser mostrada
  */
  function goToModal(id){
    $(".modal").modal('hide');
    setTimeout(function () {
      $("#"+id).modal('show');
    }, 100);
  };

}
