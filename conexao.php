<?php

// Declaração das variáveis do Servidor
$servidor = "localhost:3307";
$usuario  = "root";
$senha    = "";
$nome_banco = "med_connect";

$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);

if($conexao->connect_error){
    echo $conexao->connect_error;
} 