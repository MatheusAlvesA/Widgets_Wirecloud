<?php
$s = curl_init();

curl_setopt($s,CURLOPT_URL,'http://45.77.114.212:1026/v1/queryContext');
curl_setopt($s,CURLOPT_HTTPHEADER,array('Content-Type: application/json', 'Accept: application/json'));
curl_setopt($s,CURLOPT_RETURNTRANSFER,true);
curl_setopt($s,CURLOPT_FOLLOWLOCATION, true);
curl_setopt($s, CURLOPT_POST, true);
curl_setopt($s, CURLOPT_POSTFIELDS, '{"entities":[{"type":"Empresa","isPattern":"true","id":".*"}]}');

$retorno = curl_exec($s);

curl_close($s);

$bruto = json_decode($retorno)->contextResponses;
$filtrado = [];
for($x = 0; $x < count($bruto); $x++) {
	$filtrado[$x] = $bruto[$x]->contextElement;
}

$csv = '"cnpj", "nome", "servico", "tipo_servico", "detalhes_servico", "geolocalizacao",'."\n";

foreach ($filtrado as $chave => $valor) {
	$csv .= criar_linha($valor);
}

echo $csv;

function criar_linha($elemento) {
	return '"'.$elemento->id.'", "'.$elemento->attributes[1]->value.'", "'
			  .$elemento->attributes[2]->value[0]->name.'", "'
			  .$elemento->attributes[2]->value[0]->type.'", "'
			  .$elemento->attributes[2]->value[0]->sub_type.'", "'
			  .$elemento->attributes[3]->value.'",'."\n";
}
?>

{
  "contextResponses" : [
    {
      "contextElement" : {
        "type" : "Empresa",
        "isPattern" : "false",
        "id" : "02",
        "attributes" : [
          {
            "name" : "Criticas",
            "type" : "vetor_de_inteiros",
            "value" : ""
          },
          {
            "name" : "Nome",
            "type" : "string",
            "value" : "teste2"
          },
          {
            "name" : "Serviços",
            "type" : "vetor_serviços",
            "value" : [
              {
                "name" : "Exemplo",
                "type" : "Um Exemplo de Tipo",
                "sub_type" : "Um Exemplo de subTipo"
              }
            ]
          },
          {
            "name" : "position",
            "type" : "geo:point",
            "value" : "40.418889, -3.691944"
          }
        ]
      },
      "statusCode" : {
        "code" : "200",
        "reasonPhrase" : "OK"
      }
    },
    {
      "contextElement" : {
        "type" : "Empresa",
        "isPattern" : "false",
        "id" : "01",
        "attributes" : [
          {
            "name" : "Criticas",
            "type" : "vetor_de_inteiros",
            "value" : ""
          },
          {
            "name" : "Nome",
            "type" : "string",
            "value" : "Teste01"
          },
          {
            "name" : "Serviços",
            "type" : "vetor_serviços",
            "value" : [
              {
                "name" : "Exemplo",
                "type" : "Um Exemplo de Tipo",
                "sub_type" : "Um Exemplo de subTipo"
              }
            ]
          },
          {
            "name" : "position",
            "type" : "geo:point",
            "value" : "40.418889, -3.691944"
          }
        ]
      },
      "statusCode" : {
        "code" : "200",
        "reasonPhrase" : "OK"
      }
    },
    {
      "contextElement" : {
        "type" : "Empresa",
        "isPattern" : "false",
        "id" : "9999988888",
        "attributes" : [
          {
            "name" : "Criticas",
            "type" : "vetor_de_inteiros",
            "value" : ""
          },
          {
            "name" : "Nome",
            "type" : "string",
            "value" : "Nova Empresa"
          },
          {
            "name" : "Serviços",
            "type" : "vetor_serviços",
            "value" : [
              {
                "name" : "Exemplo",
                "type" : "Um Exemplo de Tipo",
                "sub_type" : "Um Exemplo de subTipo"
              }
            ]
          },
          {
            "name" : "position",
            "type" : "geo:point",
            "value" : "40.418889 ,-3.691944"
          }
        ]
      },
      "statusCode" : {
        "code" : "200",
        "reasonPhrase" : "OK"
      }
    }
  ]
}
