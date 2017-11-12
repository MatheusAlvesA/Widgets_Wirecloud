/*
 * tela_buscar_empresa
 * http://45.77.114.212
 *
 * Copyright (c) 2017 Buscar Empresa
 * Licensed under the MIT license.
 */

/* globals TelaBuscarEmpresa */

window.onload = function () {
    "use strict";
    new TelaBuscarEmpresa();
};

function consultar() {
	var NOME = document.getElementById('inputNOME').value;
	var r = get_empresa(NOME);

	if(r === null) {
		MSGerro();
		return false;
	}

	MSGsucesso();
	MashupPlatform.wiring.pushEvent('empresas', JSON.stringify(r));

	return true;
}

function get_empresa(nome) {
	var resposta = []; // definindo um vetor vazio

	url = MashupPlatform.http.buildProxyURL('http://45.77.114.212:1026/v1/queryContext');
	$.ajax({
	    method: "POST",
	    url: url,
	    contentType: "application/json",
	    cache: false,
	    async: false,
	    data: JSON.stringify(make_busca(nome))
	})
	.done(function(response) {
	    if(response.errorCode === undefined) {
	    	var y = 0;
	    	for(var x = 0; x < response.contextResponses.length; x++) {
	    		if(comparar(busca(response.contextResponses[x].contextElement.attributes, 'Nome'), nome)) {
	    			resposta[y] = response.contextResponses[x].contextElement;
	    			y++;
	    		}
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

function make_busca(nome) {
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

/*
	Essa função compara se duas strings são parecidas
*/
function comparar(str1, str2) {
	if(str1 == str2) return true;

	if(str1.length > str2.length) { // a primeira string é maior
		for(var x = 0; x <= str1.length-str2.length; x++) {
			if(str1.substr(x, str2.length) == str2)
				return true;
		}
	}
	if(str1.length < str2.length) { // a primeira string é menor
		for(var x = 0; x <= str2.length-str1.length; x++) {
			if(str2.substr(x, str1.length) == str1)
				return true;
		}
	}
	return false;
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

function MSGerro() {
	document.getElementById('msgERRO').style.display = "block";
	setTimeout(function(){document.getElementById('msgERRO').style.display = "none";}, 3000);
}

function MSGsucesso() {
	document.getElementById('msgSUCESSO').style.display = "block";
	setTimeout(function(){document.getElementById('msgSUCESSO').style.display = "none";}, 3000);
}
