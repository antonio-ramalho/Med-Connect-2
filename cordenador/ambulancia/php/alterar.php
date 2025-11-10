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
    $num_ambu       = $_POST['num_ambu'];
    $num_placa      = $_POST['num_placa'];
    $id             = $_GET['id'];

    // Preparar a query via statement para enviar ao banco
    $stmt = $conexao->prepare("UPDATE ambulancia SET num_ambulancia = ?, placa_ambu = ? WHERE id = ?");
    $stmt->bind_param("ssi",$num_ambu,$num_placa,$id);
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