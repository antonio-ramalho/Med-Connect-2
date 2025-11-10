<?php
include_once("../../../conexao.php");

// Inicialização do array
$retorno = [
    "status"   => "",
    "mensagem" => "",
    "data"     => []
];

// Atribuição
$nome_medicamento = $_POST['nome_medicamento'];
$unidade_medida   = $_POST['unidade'];
$dosagem_padrao   = $_POST['dosagem'];
$num_anvisa       = $_POST['num_anvisa'];
$validade_medicamento = $_POST['validade'];

// Preparar a query via statement para enviar ao banco
$stmt = $conexao->prepare("INSERT INTO medicamentos(nome_medicamento,unidade_medida,dosagem_padrao,num_anvisa,validade_medicamento) VALUES(?,?,?,?,?)");
$stmt->bind_param("sssss",$nome_medicamento,$unidade_medida,$dosagem_padrao,$num_anvisa,$validade_medicamento);
$stmt->execute();

if($stmt -> affected_rows > 0) {
        $retorno = [
            "status"   => "ok",
            "mensagem" => $stmt->affected_rows." Registros modificados.",
            "data"     => []
        ];
    } else {
        $retorno = [
            "status"   => "nok",
            "mensagem" => "0 registros modificados.",
            "data"     => []
        ];
    }

$stmt->close();

// Fechar a conexão
$conexao->close();

header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);