/*
 * Listar Empresas
 * 
 *
 * Copyright (c) 2017 Listar geograficamente
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    MashupPlatform.prefs.registerCallback(function (new_preferences) {

    }.bind(this));

    /* test-code */

    /* end-test-code */

})();

MashupPlatform.wiring.registerCallback('location', function(entity) {
        var recebido = JSON.parse(entity);
        geo_busca_empresa(recebido.position);
});

/*
    Essa função realiza uma busca por empresas próximas ao ponto passado
    Ela retorna através da saida do operator
*/
function geo_busca_empresa(ponto) {
    var resposta = null;
    url = MashupPlatform.http.buildProxyURL('http://45.77.114.212:1026/v1/queryContext');

    $.ajax({
        method: "POST",
        url: url,
        contentType: "application/json",
        cache: false,
        async: false,
        data: JSON.stringify(make_geo_busca(ponto))
    })
    .done(function(response) {
        if(response.errorCode === undefined) {
            alert('sucesso');
            for(var x = 0; x < response.contextResponses.lenght; x++)
                resposta[x] = response.contextResponses[x].contextElement;
        }
        else alert('Falha, entidade não encontrada'); //debug
    })
    .fail(function(response) {
        // vazio
      })
    .always(function(response) {
       // vazio
    });

    return resposta;
}

/*
	Essa função recebem uma geolocalização e retorna uma query pronta para ser realizadas no Orion
*/
function make_geo_busca(p) {
	var ponto = p.split(', ');
	return {
    "entities": [
        {
            "type": "Empresa",
            "isPattern": "true",
            "id": ".*"
        }
    ],
    "restriction": {
        "scopes": [
            {
                "type": "FIWARE::Location",
                "value": {
                    "circle": {
                        "centerLatitude": "40.418889",
                        "centerLongitude": "-3.691944",
                        "radius": "13000"
                    }
                }
            }
        ]
    }
};
}