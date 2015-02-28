<?php  
// Datos sacados de ...
//https://github.com/alombarte/utilities/blob/master/sql/spain_provincias.sql
// una libreria php de proposito general ...
require_once("utiles.php");
    $conexion = conectarMysqli();
    $errorbd = $conexion -> connect_errno;
    // si la conexión con la base de datos NO da error
    if ($errorbd==null) {  

        //inicializamos el cliente en utf-8:
        $conexion->set_charset("utf8");

        //creamos la consulta sobre la tabla usuarios_serv
        $sql = "SELECT id_provincia, provincia FROM provincias";
        $resultado = $conexion->query($sql);
        // obtenemos los datos 
        $datos="<option value='0'>Elige la provincia...</option>";
        while ($row = $resultado->fetch_assoc()) {
            $datos .="<option value='".$row['id_provincia']."'>".$row['provincia']."</option>";
        } 
    }
    else {     // si la conexión da error
        print "Imposible conectar con la bbdd de provincias";
    }  
   $conexion->close();
   echo $datos;
   unset($conexion);
?>