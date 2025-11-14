<?php
include_once("../../../conexao.php");

$sql_query = "SELECT 
        A.id_atendimento,
        A.data_atendimento,
        A.motivo_consul,
        A.anamnese_inicial,
        A.status_fila,
        
        P.id_paciente AS id_pac,
        P.nome AS nome_pac,
        P.cpf AS cpf_pac
    FROM 
        atendimento A
    INNER JOIN 
        pacientes P ON A.paciente_id = P.id_paciente
    ORDER BY 
        A.data_atendimento DESC
";

$stmt = $conexao->prepare($sql_query);
$stmt->execute();
$resultado = $stmt->get_result();

$tabela = [];

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
echo json_encode($retorno, JSON_UNESCAPED_UNICODE);
?>