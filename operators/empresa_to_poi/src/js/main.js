/*
 * empresa_to_poi
 * http://45.77.114.212
 *
 * Copyright (c) 2017 Empresa2PoI
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    MashupPlatform.prefs.registerCallback(function (new_preferences) {

    }.bind(this));

    /* test-code */

    /* end-test-code */

})();

MashupPlatform.wiring.registerCallback('empresa', function(entity) {
        var recebido = JSON.parse(entity);
        var poi = JSON.stringify( converter(recebido.id, busca( recebido.attributes, 'Nome' ),  busca( recebido.attributes, 'position' ) ) );
        MashupPlatform.wiring.pushEvent('point', poi);
});

function converter(cnpj, nome,  position) {
	var p = position.split(', ');
	return {
            id: cnpj,
            tooltip: nome,
            currentLocation: {
				                system: "WGS84",
				                lat: parseFloat(p[0]),
				                lng: parseFloat(p[1])
				            },
			infoWindow: '<div><span style="font-size:12px;"><b>Nome: </b> '+nome+'</span></div>'
		};
}

/*
	Essa função recebe um vetor e busca por um elemento que contenha {name: "chave"}
*/
function busca(vetor, chave) {
	for(var x = 0; x < vetor.length; x++) {
		if(vetor[x].name == chave)
			return vetor[x].value;
	}
	return null;
}