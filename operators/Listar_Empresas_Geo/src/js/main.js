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

    	var busca = JSON.stringfy( make_geo_busca( JSON.parse(entity).Cede ) );

    	console.log(busca);
    	//MashupPlatform.wiring.pushEvent('empresas', '' );
    });

/*
	Essa função recebem uma geolocalização e retorna uma query pronta para ser realizadas no Orion
*/
function make_geo_busca(p) {
	var ponto = p.split(' ');
	return {
    "entities": [
        {
            "type": entidade.type,
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
                        "centerLatitude": ponto[0],
                        "centerLongitude": ponto[1],
                        "radius": "500"
                    }
                }
            }
        ]
    }
};
}