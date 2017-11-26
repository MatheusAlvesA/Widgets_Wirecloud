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

criticas = [];
MashupPlatform.wiring.registerCallback('cnpj', function(entity) {
        let cnpj = JSON.parse(entity);
        $("#table_body").html('');
        let criticas_bruto = get_criticas();
        for(var x = 0; x < criticas_bruto.length; x++) {
        	if( busca(criticas_bruto[x].attributes, 'Alvo') == cnpj) {
        		let critica = criticas_bruto[x];
        		inserir_critica(busca(critica.attributes, 'nota'), busca(critica.attributes, 'Alvo'), critica.id);
        		criticas.push(critica);
        	}
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

 function get_criticas() {
	var resposta = [];

	url = MashupPlatform.http.buildProxyURL('http://45.77.114.212:1026/v1/queryContext');
	$.ajax({
	    method: "POST",
	    url: url,
	    contentType: "application/json",
	    cache: false,
	    async: false,
	    data: JSON.stringify(make_busca())
	})
	.done(function(response) {
	    if(response.errorCode === undefined) {
	    	for(let x = 0; x < response.contextResponses.length; x++) {
    			resposta[x] = response.contextResponses[x].contextElement;
    		}
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

function make_busca() {
	return {
		    "entities": [
		        {
		            "type": "Crítica",
		            "isPattern": "true",
		            "id": '.*'
		        }
		    ]
		};
}