console.log('\'Allo \'Allo!');
$("#formulario").validate({
    debug: true,
    rules: {
        nombre: {
            required: true,
            minlength: 2,
            remote: "php/users.php"
        },
        apellidos: {
        	required : true
        },
        telefono: {
            required: true,
            digits: true,
            minlength: 9,
            maxlength: 9
        },
        email :{
        	required : true, 
            email : true
        },
        email2 : {
        	required : true
        },
        codigoPostal : {
            required : true
        },
        cif_nif :{
            required : true,
            remote: "php/comprueba_usuario.php"
        }

    }
});