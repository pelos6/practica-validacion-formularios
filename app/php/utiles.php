<?php
function conectarMysqli() {
    // para desarrollo en casa 
    $host = '127.0.0.1';
    $user = "root";
    $pass = "javier";   
    $bd   = "dawc";
    // echo "intentando conectar con ".$host." ".$user." ".$pas." ".$bd;    
    // usamos mysqli (improved)
    $conexion = new mysqli($host, $user, $pass, $bd);
    return $conexion;
}
?>