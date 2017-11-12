/*
 * buscar_empresas
 * http://45.77.114.212
 *
 * Copyright (c) 2017 Buscar Empresa
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    MashupPlatform.prefs.registerCallback(function (new_preferences) {

    }.bind(this));

    /* test-code */

    /* end-test-code */

})();

MashupPlatform.wiring.registerCallback('nome', function(entity) {
	var r = get_empresas();
	if(r == null) return false;

	MashupPlatform.wiring.pushEvent('empresas', JSON.stringify(r));
});

function get_empresas() {
	var respostas = null;

	var url = MashupPlatform.http.buildProxyURL('http://45.77.114.212:1026/v1/queryContext');
	$.ajax({
	    method: "POST",
	    url: url,
	    contentType: "application/json",
	    cache: false,
	    async: false,
	    data: JSON.stringify(make_query())
	})
	.done(function(response) {
	    if(response.errorCode === undefined){
	    	for(var x = 0; x < response.contextResponses.length; x++) {
	    		respostas[x] = response.contextResponses[x].contextElement;
	    	}
	    } else alert('falha na busca');
	})
	.fail(function(response) {
	    // vazio
	  })
	.always(function(response) {
	   // vazio
	});

	return respostas;
}

function make_query() {
	return {
		    "entities": [
		        {
		            "type": "Empresa",
		            "isPattern": "true",
		            "id": ".*"
		        }
		    ]
		};
}