<?php
include_once("../../../conexao.php");

// prepara a query para ser executada
if(isset($_GET['id_medicamento'])){
    $id_medicamento = $_GET['id_medicamento'];
    $stmt = $conexao->prepare("SELECT * FROM medicamentos WHERE id_medicamento = ?");
    $stmt->bind_param("i",$id_medicamento);
}else{
    $stmt = $conexao->prepare("SELECT * FROM medicamentos");
}
$stmt->execute();
// pega o resultado da query executada e armazena na variável $resultado
$resultado = $stmt->get_result();

// começa a leitura do resultado
$tabela = [];

// Inicialização do array
$retorno = [
    "status"   => "",
    "mensagem" => "",
    "data"     => []
];

if($resultado-> num_rows > 0){
    while($linha = $resultado->fetch_assoc()){
        $tabela[] = $linha;
    }

    $retorno = [
    "status"   => "ok",
    "mensagem" => "Registro carregados com sucesso!",
    "data"     => $tabela
    ];
}else{
    $retorno = [
    "status"   => "erro",
    "mensagem" => "não encontrou registros",
    "data"     => []
    ];
}

$stmt->close();
$conexao->close();

header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);