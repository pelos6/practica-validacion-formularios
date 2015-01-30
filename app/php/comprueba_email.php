<?php
// una libreria de proposito general
require_once("utiles.php");
$email = trim($_REQUEST['email']);
 $error = $usuario_existe = FALSE;
 $conexion = conectarMysqli();
 $errorConexion = $conexion->connect_errno;
 $traza = "-->";
 // si ha fallado la conexión ...
if ($errorConexion != null) {
                     $aplicacionErr = "Conexión fallida: $conexion->connect_error";
   $error = TRUE;
    $traza = $traza. "1";
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
                  $traza =$traza.  "2";
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
                  $traza =$traza.  "3";
}

//$valid = '"Este usuario ya está en uso"';
if (!$error){
        $traza = $traza. "5";
       if ($usuario_existe){
        //echo '"el usuario con email "'.$email. '"  ya existe"';
       // echo '"el usuario con email ya existe"';//.$email.$traza;
         echo ' "el usuario con email '.$email.' YA  existe" ';
       } else {
        //echo '"el usuario con email No existe"';//.$email.$traza;
        echo ' "el usuario con email '.$email.'NO  existe" ';
       }   
} else {
        $traza =$traza.  "4";
        echo $aplicacionErr;    
}
/*
?>
<?php
$valid = '"Este usuario ya está en uso"';
echo $valid;
?>
*/