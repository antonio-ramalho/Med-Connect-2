<?php
include_once("../../../conexao.php");

// prepara a query para ser executada
if(isset($_GET['id_func'])){
    $id_func = $_GET['id_func'];
    $stmt = $conexao->prepare("DELETE FROM funcionarios WHERE id_func = ?");
    $stmt->bind_param("i",$id_func);
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