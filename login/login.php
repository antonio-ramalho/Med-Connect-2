<?php
include_once("../conexao.php");

// prepara a query para ser executada
$stmt = $conexao->prepare("SELECT * FROM funcionarios WHERE usuario = ? AND senha =?");
$stmt->bind_param("ss", $_POST['usuario'], $_POST['senha']);

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

if($resultado->num_rows > 0){
    while($linha = $resultado->fetch_assoc()){
        $tabela[] = $linha;
    }

    $dadosUsuario = $tabela[0];

    $retorno = [
    "status"   => "ok",
    "mensagem" => "Registro carregados com sucesso!",
    "data"     => $dadosUsuario['cargo']
    ];

    // encontrou senha e usuario

    session_start();
    $_SESSION['usuario'] = $tabela[0];

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