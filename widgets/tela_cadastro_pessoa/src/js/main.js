/*
 * tela_cadastro_pessoa
 * 
 *
 * Copyright (c) 2017 Cadastro Usuário
 * Licensed under the MIT license.
 */

/* globals TelaCadastroPessoa, MashupPlatform */

window.onload = function () {
    "use strict";
    new TelaCadastroPessoa();
};


function cadastrar() {
	var nome = document.getElementById('nome').value;
	var cpf = document.getElementById('cpf').value;
	var pass = document.getElementById('pass').value;
	var pais = document.getElementById('pais').value;
	var estado = document.getElementById('estado').value;
	var cidade = document.getElementById('cidade').value;
	if(nome == '' || cpf == '' || pass == '' || pais == '' || estado == '' || cidade == '') return false;

	insert_pessoa(cpf, nome, pass, 1, pais, estado, cidade);

	document.getElementById('nome').value = '';
	document.getElementById('cpf').value = '';
	document.getElementById('pass').value = '';
	document.getElementById('pais').value = '';
	document.getElementById('estado').value = '';
	document.getElementById('cidade').value = '';

	return true;
}

function insert_pessoa(id, nome, pass, tipo, pais, estado, cidade) {
	MashupPlatform.http.makeRequest('http://45.77.114.212:1026/v1/updateContext', {
	    method: "POST",
	    postBody: JSON.stringify(bind_usuario(id, nome, pass, tipo, pais, estado, cidade)),
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

function bind_usuario(id, nome, pass, tipo, pais, estado, cidade) {
	return  {
		    "contextElements": [
		        {
		            "type": "Usuário",
		            "isPattern": "false",
		            "id": id,
		            "attributes": [
		                {
		                    "name": "User_name",
		                    "type": "string",
		                    "value": nome
		                },
		                {
		                    "name": "Senha",
		                    "type": "String",
		                    "value": pass
		                },
		                {
		                    "name": "Tipo",
		                    "type": "inteiro",
		                    "value": tipo
		                },
		                {
		                    "name": "Endereço",
		                    "type": "vetor",
		                    "value": [
		                        {
		                            "name": "País",
		                            "value": pais
		                        },
		                        {
		                            "name": "Estado",
		                            "value": estado
		                        },
		                        {
		                            "name": "Cidade",
		                            "value": cidade
		                        }
		                    ]
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
