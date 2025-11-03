<?php
include_once("../../../conexao.php");

session_start();
session_unset();
session_destroy();

// Inicialização do array

$retorno = [
    "status"   => "ok",
    "mensagem" => "",
    "data"     => []
];

header("Content-type: application/json;charset:utf-8");
echo json_encode($retorno);