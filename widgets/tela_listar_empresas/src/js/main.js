/*
 * tela_listar_empresa
 * 
 *
 * Copyright (c) 2017 Ver_Empresa
 * Licensed under the MIT license.
 */

/* globals TelaListarEmpresas, MashupPlatform */

empresas = [];
MashupPlatform.wiring.registerCallback('empresas', function(entity) {
        empresas = JSON.parse(entity);
        $("#table_body").html('');
        for(var x = 0; x < empresas.length; x++) {
        	inserir_empresa(busca(empresas[x].attributes, 'Nome'), empresas[x].id);
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

function inserir_empresa(nome, cnpj) {
    var newRow = $("<tr>");
    var cols = "";		
    cols += '<td>'+nome+'</td>';
    cols += '<td>';
    cols += '<button onclick="usar(\''+cnpj+'\')" class="btn btn-primary">Usar</button>';
    cols += '</td>';		
    newRow.append(cols);
    $("#tabela").append(newRow);	
 }

 function usar(cnpj) {
 	    for(var x = 0; x < empresas.length; x++) {
        	if(empresas[x].id == cnpj) {
        		MashupPlatform.wiring.pushEvent('empresa', JSON.stringify(empresas[x]));
                return true;
        	}
        }
        console.log('Falha ao usar a empresa');
        return false;
 }