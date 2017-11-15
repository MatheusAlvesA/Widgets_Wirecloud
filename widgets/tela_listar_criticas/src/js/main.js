/*
 * tela_listar_criticas
 * http://45.77.114.212/
 *
 * Copyright (c) 2017 Ver Críticas
 * Licensed under the MIT license.
 */

/* globals TelaListarCriticas */

window.onload = function () {
    "use strict";
    new TelaListarCriticas();
};

critica = [];
MashupPlatform.wiring.registerCallback('criticas', function(entity) {
        criticas = JSON.parse(entity);
        $("#table_body").html('');
        for(var x = 0; x < criticas.length; x++) {
        	var critica = get_critica(criticas[x]);
        	inserir_critica(busca(critica.attributes, 'nota'), busca(critica.attributes, 'Alvo'), critica.id);
        }
});

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

function inserir_critica(nota, empresa, id) {
    var newRow = $("<tr>");
    var cols = "";		
    cols += '<td>'+nota+'</td>';
    cols += '<td>'+empresa+'</td>';
    cols += '<td>';
    cols += '<button onclick="usar('+id+')" class="btn btn-primary">Usar</button>';
    cols += '</td>';		
    newRow.append(cols);
    $("#tabela").append(newRow);	
 }

 function usar(id) {
 	    for(var x = 0; x < criticas.length; x++) {
        	if(criticas[x].id == id) {
        		MashupPlatform.wiring.pushEvent('critica', JSON.stringify(criticas[x]));
                return true;
        	}
        }
        console.log('Falha ao usar a critica');
        return false;
 }

 function get_critica(id) {
	var resposta = null;

	url = MashupPlatform.http.buildProxyURL('http://45.77.114.212:1026/v1/queryContext');
	$.ajax({
	    method: "POST",
	    url: url,
	    contentType: "application/json",
	    cache: false,
	    async: false,
	    data: JSON.stringify(make_busca(id))
	})
	.done(function(response) {
	    if(response.errorCode === undefined) {
    		resposta = response.contextResponses[0].contextElement;
	    }
	})
	.fail(function(response) {
	    // vazio
	  })
	.always(function(response) {
	   // vazio
	});

	return resposta;
}

function make_busca(id) {
	return {
		    "entities": [
		        {
		            "type": "Crítica",
		            "isPattern": "false",
		            "id": id
		        }
		    ]
		};
}