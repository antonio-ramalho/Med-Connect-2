<?php
include_once("../../../conexao.php");

//Inicialização do array
$retorno = [
    "status"   => "",
    "mensagem" => "",
    "data"     => []
];

if(isset($_GET['id_paciente'])) {
    // Atribuição
    $nome       = $_POST['nome'];
    $cpf    = $_POST['cpf'];
    $telefone      = $_POST['telefone'];
    $data_nasc      = $_POST['data_nasc'];
    $idade      = $_POST['idade'];
    $sexo      = $_POST['sexo'];
    $email      = $_POST['email'];
    $logradouro      = $_POST['logradouro'];
    $numero_ende      = $_POST['numero_ende'];
    $cep      = $_POST['cep'];
    $cidade      = $_POST['cidade'];
    $estado      = $_POST['estado'];
    $complemento      = $_POST['complemento'];
    $bairo      = $_POST['bairro'];
    $id_paciente         = $_GET['id_paciente'];

    // Preparar a query via statement para enviar ao banco
    $stmt = $conexao->prepare("UPDATE pacientes SET nome = ?, cpf = ?, telefone = ?, data_nasc = ?, idade = ?, sexo = ?, email = ?, logradouro = ?, numero_ende = ?, cep = ?, cidade = ?, estado = ?, complemento = ?, bairro = ? WHERE id_paciente = ?");
    $stmt->bind_param("ssssisssissssi",$nome,$cpf,$telefone,$data_nasc,$idade,$sexo,$email,$logradouro,$numero_ende,$cidade,$estado,$complemento,$bairo,$id_paciente);
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