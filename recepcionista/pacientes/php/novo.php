<?php
include_once("../../../conexao.php");

// Inicialização do array
$retorno = [
    "status"   => "",
    "mensagem" => "",
    "data"     => []
];

// Atribuição
$nome           = $_POST['nome'];
$cpf            = $_POST['cpf'];
$telefone       = $_POST['telefone'];
$data_nasc      = $_POST['data_nasc'];
$idade          = $_POST['idade'];
$sexo           = $_POST['sexo'];
$email          = $_POST['email'];
$logradouro     = $_POST['logradouro'];
$numero_ende    = $_POST['numero_ende'];
$cep            = $_POST['cep'];
$cidade         = $_POST['cidade'];
$estado         = $_POST['estado'];
$complemento    = $_POST['complemento'];
$bairo          = $_POST['bairro'];

// Preparar a query via statement para enviar ao banco
$stmt = $conexao->prepare("INSERT INTO pacientes(nome,cpf,telefone,data_nasc,idade,sexo,email,logradouro,numero_ende,cep,cidade,estado,complemento,bairro) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
$stmt->bind_param("ssssisssisssss",$nome,$cpf,$telefone,$data_nasc,$idade,$sexo,$email,$logradouro,$numero_ende,$cep,$cidade,$estado,$complemento,$bairo);
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