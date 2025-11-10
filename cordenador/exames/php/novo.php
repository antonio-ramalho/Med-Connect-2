<?php
include_once("../../../conexao.php");

// Inicialização do array
$retorno = [
    "status"   => "",
    "mensagem" => "",
    "data"     => []
];

// Atribuição
$exame       = $_POST['exame'];
$tipo_exam    = $_POST['tipo_exam'];

// Preparar a query via statement para enviar ao banco
$stmt = $conexao->prepare("INSERT INTO exames(nome_exam,tipo_exam) VALUES(?,?)");
$stmt->bind_param("ss",$exame,$tipo_exam);
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