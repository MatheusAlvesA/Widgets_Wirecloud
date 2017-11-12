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


var servicos_exemplo = [bind_servico('Exemplo', 'Um Exemplo de Tipo', 'Um Exemplo de subTipo')];

function cadastrar() {
	var nome = document.getElementById('nome').value;
	var cnpj = document.getElementById('cnpj').value;
	var cede = document.getElementById('cede').value;
	if(nome == '' || cnpj == '' || cede == '') return false;

	insert_empresa(cnpj, nome, cede, servicos_exemplo);

	document.getElementById('nome').value = '';
	document.getElementById('cnpj').value = '';
	document.getElementById('cede').value = '';

	return true;
}

function insert_empresa(cnpj, nome, cede, servicos) {
	MashupPlatform.http.makeRequest('http://45.77.114.212:1026/v1/updateContext', {
	    method: "POST",
	    postBody: JSON.stringify(bind_empresa(cnpj, nome, cede, servicos)),
	    contentType: "application/json",
	    onSuccess: function (response) {
	        document.getElementById('msgSUCESSO').style.display = "block";
	        setTimeout(function(){document.getElementById('msgSUCESSO').style.display = "none";}, 3000);
	    },
	    onFailure: function (response) {
	        document.getElementById('msgFALHA').style.display = "block";
	        setTimeout(function(){document.getElementById('msgFALHA').style.display = "none";}, 3000);
	    }
	});
}

function bind_empresa(cnpj, nome, cede, servicos) {
	return  {
		    "contextElements": [
		        {
		            "type": "Empresa",
		            "isPattern": "false",
		            "id": cnpj,
		            "attributes": [
		                {
		                    "name": "Nome",
		                    "type": "string",
		                    "value": nome
		                },
		                {
		                    "name": "position",
		                    "type": "geo:point",
		                    "value": cede
		                },
		                {
		                    "name": "Serviços",
		                    "type": "vetor_serviços",
		                    "value": servicos
		                },
		                {
		                    "name": "Criticas",
		                    "type": "vetor_de_inteiros",
		                    "value": []
		                }
		            ]
		        }
		    ],
		    "updateAction": "APPEND"
		};
}

function bind_servico(nome, tipo, subtipo) {
	return {
		        "name": nome,
		        "type": tipo,
		        "sub_type": subtipo
		    };
}