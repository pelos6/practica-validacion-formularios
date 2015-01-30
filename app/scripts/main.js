console.log('\'Allo para javier \'Allo!');
$("#formulario").validate({
    debug: true,
   /* rules: {
        nombre: {
            required: true,
            minlength: 2, // tamaño mínimo
            // remote: "php/comprueba_.php"
        },
        apellidos: {
            required: true
        },
        telefono: {
            required: true,
            digits: true, // solo numeros pero no cifras (-12) no es válido
            minlength: 9,
            maxlength: 9
        },
        email: {
            required: true,
            email: true, // que parezca un e-mail
            remote: "php/comprueba_email.php"
        },
        email2: {
            required: true,
            email: true,
            equalTo: "#email" // con que tiene que ser igual este valor
        },
        forma_encuentro: {
            required: true
        },
        tipo_demandante: {
            required: true
        },
        cif_nif: {
            required: true,
            remote: "php/comprueba_cif_nif.php" // usa el programa indicado
        },
        nombre_empresa: {
            required: true
        },
        direccion: {
            required: true
        },
        codigo_postal: {
            required: true,
            minlength: 5
        },
        localidad: {
            required: true
        },
        provincia: {
            required: true
        },
        pais: {
            required: true
        },
        iban: {
            required: true
        },
        forma_pago: {
            required: true
        },
        usuario: {
            required: true
        },
        contraseña: {
            required: true
        },
        contraseña2: {
            required: true,
            equalTo: "#contraseña"
        },
    },
    // unos cuantos mensajer personalizados
    messages: {
        nombre: "Por favor intruduce tu nombre",
        apellidos: "Por favor introduce tus apellidos",
        telefono: {
            required: "Por favor intruduce un número de teléfono",
            minlength: "El número de teléfono debe tener al menos {0} digitos", // {0} es el valor del primer parametro 
            maxlength: "El número de teléfono debe tener como mucho {0} digitos"
        },
        email2: {
            required: "Por favor confirma la dirección de correo electrónico",
            equalTo: "Las direcciones de correo no son iguales"
        },
        contraseña2: {
            required: "Por favor confirma la contraseña",
            equalTo: "Las contraseñas no son iguales"
        }

    },*/
    //
     submitHandler: function(form) {
                var dataString = 'usuario=' + $('#usuario').val() + '&contrasena=' + $('#contrasena').val() + '&nombre=' + $('#nombre').val() + '&apellidos=' + $('#apellidos').val() + '&email=' + $('#email').val() + '&cif_nif=' + $('#cif_nif').val();
                $.ajax({
                    type: "POST", // tipo de la llamada ajax
                    url: "php/graba.php", // que archivo recive la llamada
                    data: dataString, //los datos que van con la llamada tipo usuario=javier&contrasena=undefined&nombre=javier&apellidos=iranzo&email=javieriranzo@hotmail.com&cif_nif=1770301v
                    success: function(data) {
                        $("#ok").html(data);
                        $("#ok").show();
                        $("#formid").hide();
                    }
                });
            }
});
// propone el nombre de la empresa como la unión del nombre y apellido del usuario
$("#nombre_empresa").focus(function() {
    var nombre = $("#nombre").val();
    var apellidos = $("#apellidos").val();
    if (nombre && apellidos && !this.value) {
        this.value = (nombre + "." + apellidos).toLowerCase();
    }
});
