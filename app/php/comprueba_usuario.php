<?php
//$cif_nif = trim(strtolower($_REQUEST['cif_nif']));
$cif_nif = trim($_REQUEST['cif_nif']);
function conectarMysqli() {
    //$host = 'localhost';
    $host = '127.0.0.1';
    $user = "root";
    $pass = "javier";   
    $bd   = "dawc";
  /*  $pass = "javier"; 
  $user = "dwec"; 
    $bd = 'dwes';*/
    // echo "intentando conectar con ".$host." ".$user." ".$pas." ".$bd;    
    // usamos mysqli (improved)
    $conexion = new mysqli($host, $user, $pass, $bd);
    return $conexion;
}
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
                $consulta->prepare("SELECT usuario FROM usuariosTarea WHERE cif_nif = ?");
                // Usamos bind_param para pasar los parámetros
                $consulta->bind_param("s", $cif_nif);
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
                    // El cif_nif no existe en la tabla
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
        //echo '"el usuario con cif_nif "'.$cif_nif. '"  ya existe"';
        echo '"el usuario con cif_nif ya existe"';//.$cif_nif.$traza;
       } else {
        //  echo '"el usuario con cif_nif "'.$cif_nif. '" no existe"';
        echo '"el usuario con cif_nif NO  existe"';//.$cif_nif.$traza;
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