<?php
 header("Access-Control-Allow-Origin: *"); 
// una libreria de proposito general
require_once("utiles.php");
$email = trim($_REQUEST['email']);
$error = $usuario_existe = FALSE;
$conexion = conectarMysqli();
$errorConexion = $conexion->connect_errno;
// si ha fallado la conexión ...
if ($errorConexion != null) {
    $aplicacionErr = "Conexión fallida: $conexion->connect_error";
    $error = TRUE;
}
if (!$error) {
    // Conexión correcta, haremos la consulta
    // Vamos a hacer una consulta preparada
    $consulta = $conexion->stmt_init();
    // vemos si esta el usuario como activo
    $consulta->prepare("SELECT usuario FROM usuariosTareaDAWEC WHERE email = ?");
    // Usamos bind_param para pasar los parámetros
    $consulta->bind_param("s", $email);
    // Ejecutamos la consulta
    if (!$consulta->execute()) {
        $aplicacionErr = "Error ejecutando la consulta: $consulta->errno," . " $consulta->error";
        $error = TRUE;
    }
}
if (!$error) {
    // la consulta se ha ejecutado bien, veamos los resultados !
    // Obtenemos el resultado con get_result para coger un array
    $consulta->bind_result($usuarioBD);
    if ($consulta->fetch() == null) {
        // El email no existe en la tabla
        $usuario_existe = FALSE;
        // $aplicacionErr = "Usuario o contraseña incorrectos";
    } else {
        $usuario_existe = TRUE;
    }
    // hemos acabado con esta consulta
    $consulta->close(); // Cerramos la consulta preparada; 
    $conexion->close(); // Cerramos la conexión
}

//$valid = '"Este usuario ya está en uso"';
if (!$error) {
    if ($usuario_existe) {
        $salida='"El usuario con email '.$email.' ya está en uso"';
    } else {
        $salida = 'true'; // el campo se ha validado
    }
} else {
    $salida = $aplicacionErr;
}

echo $salida;