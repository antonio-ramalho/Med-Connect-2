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
    $nome_medicamento = $_POST['nome_medicamento'];
    $unidade_medida = $_POST['unidade_medida'];
    $dosagem_padrao = $_POST['dosagem_padrao'];
    $num_anvisa = $_POST['num_anvisa'];
    $validade_medicamento = $_POST['validade_medicamento'];
    $id_medicamento = $_GET['id'];

    // Preparar a query via statement para enviar ao banco
    $stmt = $conexao->prepare("UPDATE medicamentos SET nome_medicamento = ?, unidade_medida = ?, dosagem_padrao = ?, num_anvisa = ?, validade_medicamento = ?  WHERE id_medicamento = ?");
    $stmt->bind_param("sssssi",$nome_medicamento,$unidade_medida,$dosagem_padrao,$num_anvisa, $validade_medicamento, $id_medicamento);
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