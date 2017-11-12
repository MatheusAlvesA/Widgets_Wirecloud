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

MashupPlatform.wiring.registerCallback('empresa', function(entity) {
        var recebido = JSON.parse(entity);
        consultar(recebido);
});

function consultar(r) {
	if(r === null) {
		MSGerro();
		return false;
	}

	var nome = busca(r.attributes, 'Nome');
	var cnpj = r.id;
	var cede = busca(r.attributes, 'position');

	document.getElementById('nome').innerText = nome;
	document.getElementById('cnpj').innerText = cnpj;
	document.getElementById('cede').innerText = cede;

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
