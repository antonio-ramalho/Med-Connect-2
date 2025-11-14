<?php
include_once("../../../conexao.php");

// Inicialização do array
$retorno = [
    "status"   => "",
    "mensagem" => "",
    "data"     => []
];

// Atribuição
$motivo_consul    = $_POST['motivo_consul'];
$anamnese_rec     = $_POST['anamnese_rec'];
$id_paciente      = $_GET['id'];
$status_fila      = 1;

// Preparar a query via statement para enviar ao banco
$stmt = $conexao->prepare("INSERT INTO atendimento(paciente_id, motivo_consul, anamnese_inicial, status_fila, data_atendimento) VALUES(?,?,?,?, NOW())");
$stmt->bind_param("issi",$id_paciente,$motivo_consul,$anamnese_rec, $status_fila);
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