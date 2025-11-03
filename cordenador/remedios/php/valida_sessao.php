<?php
    session_start();

    if(isset($_SESSION['usuario'])) {
        $status = 'ok';
    } else {
        $status = 'nok';
    }

    $retorno = [
        'status' => $status,
        'mensagem' => '',
        'data' => []
    ];

   header("Content-type: application/json;charset:utf-8");
   echo json_encode($retorno);
