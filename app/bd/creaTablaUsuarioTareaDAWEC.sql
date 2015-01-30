-- Base de datos: `dwec`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariostareaDAWEC`
--

    CREATE TABLE IF NOT EXISTS `usuariosTareaDAWEC` (
      `usuario` varchar(16) NOT NULL,
      `contrasena` varchar(16) NOT NULL,
      `nombre` varchar(16) NOT NULL,
      `apellidos` varchar(32) NOT NULL,
       `telefono` varchar(9) ,
       `email` varchar(32) not null,
       `modo_contacto` varchar(32),
       `tipo_demandante` varchar(32),
       `cif_nif` varchar(32),
       `nombre_empresa` varchar(32),
       `direccion` varchar(32),
       `codigo_postal` varchar(5),
       `localidad` varchar(32),
       `provincia` varchar(32),
       `pais` varchar(32),
       `iban` varchar(32),
       `modo_pago` varchar(32)
       
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    ALTER TABLE `usuariosTareaDAWEC`
 ADD PRIMARY KEY (`usuario`);

INSERT INTO `usuariosTareaDAWEC`(`usuario`, `contrasena`, `nombre`, `apellidos`, `telefono`, `email`, `modo_contacto`, `tipo_demandante`, `cif_nif`, `nombre_empresa`, `direccion`, `codigo_postal`, `localidad`, `provincia`, `pais`, `iban`, `modo_pago`) VALUES ('juanda','juanda','juanda','burro',null,'juandacorreo@gmail.com ',null,null,'25456737S',null,null,null,null,null,null,null,null)