/*
 * tela_ver_empresa
 * 
 *
 * Copyright (c) 2017 Ver_Empresa
 * Licensed under the MIT license.
 */

/* globals TelaVerEmpresa, MashupPlatform */

empresa = null; // Essa cariável global guarda a empresa lida

window.onload = function () {
    "use strict";
    new TelaVerEmpresa();
};

MashupPlatform.wiring.registerCallback('empresa', function(entity) {
        var recebido = JSON.parse(entity);
        consultar(recebido);
});

function consultar(r) {
	if(r.attributes === null || r.attributes === undefined) {
		MSGerro();
		return false;
	}

	empresa = r;

	var nome = busca(r.attributes, 'Nome');
	var cnpj = r.id;
	var cede = busca(r.attributes, 'position');
	var servico = busca(r.attributes, 'Serviços')[0];

	document.getElementById('nome').innerText = nome;
	document.getElementById('cnpj').innerText = cnpj;
	document.getElementById('cede').innerText = cede;

	document.getElementById('s_nome').innerText = servico.name;
	document.getElementById('s_tipo').innerText = servico.type;
	document.getElementById('s_detalhes').innerText = servico.sub_type;

	$("#bnt_criticas").prop("disabled", false);

	return true;
}

function push_criticas() {
	if(empresa === null) return false;
	MashupPlatform.wiring.pushEvent('criticas', JSON.stringify(busca(empresa.attributes, 'Criticas')));
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
