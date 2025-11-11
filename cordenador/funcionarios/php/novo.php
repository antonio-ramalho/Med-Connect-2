<?php
include_once("../../../conexao.php");

// Inicialização do array
$retorno = [
    "status"   => "",
    "mensagem" => "",
    "data"     => []
];

// Atribuição
$nome       = $_POST['nome'];
$usuario    = $_POST['usuario'];
$senha      = $_POST['senha'];
$cpf        = $_POST['cpf'];
$telefone   = $_POST['telefone'];
$email      = $_POST['email'];
$cargo      = $_POST['cargo'];

// Preparar a query via statement para enviar ao banco
$stmt = $conexao->prepare("INSERT INTO funcionarios(nome,usuario,senha,cpf,telefone,email,cargo) VALUES(?,?,?,?,?,?,?)");
$stmt->bind_param("sssssss",$nome, $usuario, $senha, $cpf, $telefone, $email, $cargo);
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