<?php
echo 'Gracias '.$_POST['email'].' '.$_POST['cif_nif'].'. La información ha sido enviada correctamente!';
// una libreria de proposito general
require_once("utiles.php");
$usuario = trim($_POST['usuario']);
$contrasena = trim($_POST['contrasena']);
$nombre = trim($_POST['nombre']);
$apellidos = trim($_POST['apellidos']);
$email = trim($_POST['email']);
$cif_nif = trim($_POST['cif_nif']);

//$error = $usuario_existe = FALSE;
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
               // $consulta->prepare("insert into usuariosTareaDAWEC WHERE cif_nif = ?");
                $consulta->prepare("INSERT INTO usuariosTareaDAWEC (`usuario`, `contrasena`, `nombre`, `apellidos`,  `email`, `cif_nif`) VALUES (?,?,?,?,?,?)");
                // Usamos bind_param para pasar los parámetros
                $consulta->bind_param("ssssss",$usuario, $contrasena, $nombre, $apellidos,  $email, $cif_nif);
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
       // echo '"el usuario con cif_nif ya existe"';//.$cif_nif.$traza;
         echo ' "el usuario con cif_nif '.$cif_nif.' YA  existe" ';
       } else {
        //echo '"el usuario con cif_nif No existe"';//.$cif_nif.$traza;
        echo ' "el usuario con cif_nif '.$cif_nif.'NO  existe" ';
       }   
} else {
        $traza =$traza.  "4";
        echo $aplicacionErr;   
        } 
?>
