/*
 * tela_ver_empresa
 * 
 *
 * Copyright (c) 2017 Ver_Empresa
 * Licensed under the MIT license.
 */

/* globals TelaVerEmpresa, MashupPlatform */

window.onload = function () {
    "use strict";
    new TelaVerEmpresa();
};

function consultar() {
	var CNPJ = document.getElementById('inputCNPJ').value;
	var r = get_empresa(CNPJ);

	if(r === null) {
		MSGerro();
		return false;
	}

	var nome = r.attributes[2].value;
	var cnpj = CNPJ;
	var cede = r.attributes[0].value;

	document.getElementById('nome').innerText = nome;
	document.getElementById('cnpj').innerText = CNPJ;
	document.getElementById('cede').innerText = cede;

	MSGsucesso();

	return true;
}

function get_empresa(cnpj) {
	var resposta = null;

	url = MashupPlatform.http.buildProxyURL('http://45.77.114.212:1026/v1/queryContext');
	$.ajax({
	    method: "POST",
	    url: url,
	    contentType: "application/json",
	    cache: false,
	    async: false,
	    data: JSON.stringify(bind_query(cnpj, 'Empresa'))
	})
	.done(function(response) {
	    if(response.errorCode === undefined)
	    	resposta = response.contextResponses[0].contextElement;
	})
	.fail(function(response) {
	    // vazio
	  })
	.always(function(response) {
	   // vazio
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