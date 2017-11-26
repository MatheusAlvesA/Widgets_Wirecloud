/*
 * tela_ver_critica
 * http://45.77.114.212
 *
 * Copyright (c) 2017 Ver Critica
 * Licensed under the MIT license.
 */

/* globals TelaVerCritica */

window.onload = function () {
    "use strict";
    new TelaVerCritica();
};

MashupPlatform.wiring.registerCallback('critica', function(entity) {
        var recebido = JSON.parse(entity);
        consultar(recebido);
});

function consultar(r) {
	if(r.attributes === null || r.attributes === undefined) {
		MSGerro();
		return false;
	}

	var nome = busca(r.attributes, 'Crítico');
	var cnpj = busca(r.attributes, 'Alvo');
	var nota = busca(r.attributes, 'nota');
	var texto = busca(r.attributes, 'Texto');

	document.getElementById('nome').innerText = nome;
	document.getElementById('cnpj').innerText = cnpj;
	document.getElementById('nota').innerText = nota;
	document.getElementById('texto').innerText = texto;

	return true;
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