/*
 * tela_cadastro_critica
 * http://45.77.114.212
 *
 * Copyright (c) 2017 Cadastrar Critica
 * Licensed under the MIT license.
 */

/* globals TelaCadastroCritica, MashupPlatform */

window.onload = function () {
    "use strict";
    new TelaCadastroCritica();
};

//globais
var empresa_cnpj = '';

MashupPlatform.wiring.registerCallback('empresa', function(entity) {
        var recebido = JSON.parse(entity);
        preparar(recebido);
});

function preparar(r) {
	if(r.attributes === null || r.attributes === undefined) {
		MSGerro();
		return false;
	}

	var nome = busca(r.attributes, 'Nome');
	var empresa_cnpj = r.id;

	document.getElementById('textNome').innerText = nome;

	$("#bnt_criticar").prop("disabled", false);

	return true;
}

function criticar() {
	//todo
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

function make_critica(empresa, user, nota, texto) {
	return  {
    "contextElements": [
        {
            "type": "Crítica",
            "isPattern": "false",
            "id": md5(texto),
            "attributes": [
                {
                    "name": "Texto",
                    "type": "string",
                    "value": texto
                },
                {
                    "name": "nota",
                    "type": "Inteiro 0-10",
                    "value": nota
                },
                {
                    "name": "Crítico",
                    "type": "Usuário",
                    "value": user
                },
                {
                    "name": "Alvo",
                    "type": "Empresa",
                    "value": empresa
                }
            ]
        }
    ],
    "updateAction": "APPEND"
};
}