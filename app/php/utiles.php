<?php
function conectarMysqli() {
    // para infenlaces
    /*$host = 'localhost';
    $user = "javieriranzo_dwe"; 
    $pass = "javier"; 
    $bd = 'javieriranzo_dwes';*/
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