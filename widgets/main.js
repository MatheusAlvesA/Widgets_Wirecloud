/*
 * tela_cadastro_empresa
 * https://github.com/fiware/tela_cadastro_empresa
 *
 * Copyright (c) 2017 Tela_cadastro
 * Licensed under the MIT license.
 */

/* globals TelaCadastroEmpresa, MashupPlatform */

window.onload = function () {
    "use strict";
    new TelaCadastroEmpresa();
};


function consultar() {
	var CNPJ = document.getElementById('inputCNPJ').value;
	var r = get_empresa(CNPJ);

	if(r === null)
		MSGerro();

	var nome = r.contextResponses[0].contextElement.attributes[0].value;
	var cnpj = CNPJ;
	var cede = r.contextResponses[0].contextElement.attributes[1].value;

	document.getElementById('nome').value = nome;
	document.getElementById('cnpj').value = CNPJ;
	document.getElementById('cede').value = cede;

	msgSUCESSO();

	return true;
}

function get_empresa(cnpj) {
	var resposta = '';

	MashupPlatform.http.makeRequest('http://45.77.114.212:1026/v1/queryContext', {
	    method: "POST",
	    postBody: JSON.stringify(bind_query(cnpj, 'empresa')),
	    contentType: "application/json",
	    onSuccess: function (response) {
	    	resposta = response;
	    },
	    onFailure: function (response) {
	    	resposta = null;
	    }
	});

	return resposta;
}

function bind_query(id, tipo) {
	return {
		    "entities": [
		        {
		            "type": tipo,
		            "isPattern": "false",
		            "id": id
		        }
		    ]
		};
}

function MSGerro() {
	document.getElementById('msgERRO').style.display = "block";
	setTimeout(function(){document.getElementById('msgERRO').style.display = "none";}, 3000);
}

function MSGsucesso() {
	document.getElementById('msgSUCESSO').style.display = "block";
	setTimeout(function(){document.getElementById('msgSUCESSO').style.display = "none";}, 3000);
}