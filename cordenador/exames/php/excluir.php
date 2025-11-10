<?php
include_once("../../../conexao.php");

// prepara a query para ser executada
if(isset($_GET['id'])){
    $id = $_GET['id'];
    $stmt = $conexao->prepare("DELETE FROM exames WHERE id = ?");
    $stmt->bind_param("i",$id);
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
}else{
    $retorno = [
    "status"   => "nok",
    "mensagem" => "Necessário informar um ID para a exclusão!",
    "data"     => []
    ];
}
$conexao->close();

header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);