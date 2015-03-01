<?php  
 header("Access-Control-Allow-Origin: *"); 
// Datos sacados de ...
//http://www.bufa.es/mysql-tabla-paises/
// una libreria php de proposito general ...
require_once("utiles.php");
    $conexion = conectarMysqli();
    $errorbd = $conexion -> connect_errno;
    // si la conexión con la base de datos NO da error
    if ($errorbd==null) {  

        //inicializamos el cliente en utf-8:
        $conexion->set_charset("utf8");

        //creamos la consulta sobre la tabla usuarios_serv
        $sql = "SELECT iso, nombre FROM paises";
        $resultado = $conexion->query($sql);
        // obtenemos los datos 
        $datos="<option value='0'>Elige el pais...</option>";
        while ($row = $resultado->fetch_assoc()) {
            $datos .="<option value='".$row['iso']."'>".$row['nombre']."</option>";
        } 
    }
    else {     // si la conexión da error
        print "Imposible conectar con la base de datos para los paises";
    }  
   $conexion->close();
   echo $datos;
   unset($conexion);
?>