<?php
include_once("../../../conexao.php");

//Inicialização do array
$retorno = [
    "status"   => "",
    "mensagem" => "",
    "data"     => []
];

if(isset($_GET['id'])) {
    // Atribuição
    $nome       = $_POST['nome'];
    $usuario    = $_POST['usuario'];
    $senha      = $_POST['senha'];
    $id         = $_GET['id'];

    // Preparar a query via statement para enviar ao banco
    $stmt = $conexao->prepare("UPDATE funcionarios SET nome = ?, usuario = ?, senha = ? WHERE id = ?");
    $stmt->bind_param("sssi",$nome,$usuario,$senha,$id);
    $stmt->execute();

    if($stmt-> affected_rows > 0){
        $retorno = [
        "status"   => "ok",
        "mensagem" => $stmt -> affected_rows."Registros alterados com sucesso.",
        "data"     => []
        ];
    }else{
        $retorno = [
        "status"   => "nok",
        "mensagem" => "0 registros inseridos",
        "data"     => []
        ];
    }

    $stmt->close();
} else {
    $retorno = [
    "status"   => "nok",
    "mensagem" => "É necessário informar um ID",
    "data"     => []
    ];
}

// Fechar a conexão
$conexao->close();

header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);