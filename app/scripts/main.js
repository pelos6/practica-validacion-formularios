//console.log('\'Hola \'Hola! javier');
'use strict';

// cargamos las provincias
$('#provincia').load("php/provincias.php");
// cargamos los paises
$("#pais").load("php/paises.php");

$("#formulario").validate({
    // oculta y muestra el campo no valido ... pero es un tanto molesto ;)
    /*  highlight: function(element, errorClass) {
          $(element).fadeOut(function() {
              $(element).fadeIn();
          });
      },*/
    // util para probar el final ...
    //ignore: ".form-control",
    debug: true,
    rules: {
        nombre: {
            required: true
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
            nifES: function() {
                // El identificador es nif para personas....
                if ($("#particular").is(":checked")) {
                    return 'nifES';
                }
            },
            cifES: function() {
                // ...y dif para empresas
                if ($("#empresa").is(":checked")) {
                    return 'cifES';
                }
            },
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
            minlength: 5,
            maxlength: 5
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
            required: true,
            iban: iban
        },
        pago: {
            required: true
        },
        usuario: {
            required: true,
            minlength: 4
        },
        contraseña: {
            required: true
        },
        contraseña2: {
            required: true,
            equalTo: "#contraseña"
        },
    },
    // unos cuantos mensajes personalizados
    messages: {
        nombre: "Por favor introduce tu nombre",
        apellidos: "Por favor introduce tus apellidos",
        telefono: {
            required: "Por favor introduce un número de teléfono",
            minlength: "El número de teléfono debe tener al menos {0} digitos", // {0} es el valor del primer parametro 
            maxlength: "El número de teléfono debe tener como mucho {0} digitos"
        },
        email: {
            required: "Por favor introduce una dirección de correo electrónico",
        },
        email2: {
            required: "Por favor confirma la dirección de correo electrónico",
            equalTo: "Las direcciones de correo no son iguales"
        },
        contraseña: {
            required: "La contraseña es obligatoria",
        },
        contraseña2: {
            required: "Por favor confirma la contraseña",
            equalTo: "Las contraseñas no son iguales"
        },
        codigo_postal: {
            required: "El código postal es obligatoria",
            minlength: "El código postal debe tener al menos {0} digitos", // {0} es el valor del primer parametro 
            maxlength: "El código postal debe tener como mucho {0} digitos"
        },
        cif_nif: {
            required: "La información de este campo es importante."
        },
        direccion: {
            required: "La dirección es obligatoria."
        },
        usuario: {
            required: "El usuario es obligatorio."
        },
        contraseña: {
            required: "La contraseña es obligatoria."
        },
        contraseña2: {
            required: "La confirmación de la contraseña es obligatoria."
        },
        nombre_empresa: {
            required: "La información de este campo es importante."
        }

    },
    //
    submitHandler: function(form) {
        var usuario = $("#usuario").val();
        var precio = $("input[name='pago']:checked").val();
         var resp = confirm("Se va a dar de alta al usuario " + usuario + " con una cuota de: " + precio +
             " Euros. \nPor favor confirme la operación");
        if (resp) {
            alert("Confirmada el alta del usuario " + usuario + " .");
            var dataString = 'usuario=' + $('#usuario').val() + '&contrasena=' + $('#contrasena').val() + '&nombre=' + $('#nombre').val() + '&apellidos=' + $('#apellidos').val() + '&email=' + $('#email').val() + '&cif_nif=' + $('#cif_nif').val();
            $.ajax({
                type: "POST", // tipo de la llamada ajax
                url: "php/graba.php", // que archivo procesa la llamada
                data: dataString, //los datos que van con la llamada tipo usuario=javier&contrasena=undefined&nombre=javier&apellidos=iranzo&email=javieriranzo@hotmail.com&cif_nif=1770301v
                success: function(data) {
                    $("#ok").html(data);
                    $("#ok").show();
                    $("#formid").hide();
                }
            });
        } else {
             alert("Cancelada el alta del usuario " + usuario + " .");
        }

        /*  var dataString = 'usuario=' + $('#usuario').val() + '&contrasena=' + $('#contrasena').val() + '&nombre=' + $('#nombre').val() + '&apellidos=' + $('#apellidos').val() + '&email=' + $('#email').val() + '&cif_nif=' + $('#cif_nif').val();
          $.ajax({
              type: "POST", // tipo de la llamada ajax
              url: "php/graba.php", // que archivo recive la llamada
              data: dataString, //los datos que van con la llamada tipo usuario=javier&contrasena=undefined&nombre=javier&apellidos=iranzo&email=javieriranzo@hotmail.com&cif_nif=1770301v
              success: function(data) {
                  $("#ok").html(data);
                  $("#ok").show();
                  $("#formid").hide();
              }
          });*/
    }
});


// propone el nombre de la empresa como la unión del nombre y apellido del usuario
// pero no se puede dar el caso
$("#nombre_empresa").focus(function() {
    var nombre = $("#nombre").val();
    var apellidos = $("#apellidos").val();
    if (nombre && apellidos && !this.value) {
        this.value = (nombre + " " + apellidos).toLowerCase();
    }
});

// Metodo que gestiona la complexidad de la contraseña.
$("#contraseña").focusin(function() {
    $("#contraseña").complexify({}, function(valid, complexity) {
        $("#BarraPass").attr("value", complexity);
    });
});

// rellenar el usuario con el correo electrónico
$("#email").focusout(function() {
    var nomUsuario = $("#email").val();
    $("#usuario").val(nomUsuario);
});
// rellenar nombre de facturacion con el nombre y el apellido
$("#nombre").focusout(function() {
    var nomape = $("#nombre").val() + " " + $("#apellidos").val();
    $("#nombre_empresa").val(nomape);
});
// rellenar nombre de facturacion con el nombre y el apellido
$("#apellidos").focusout(function() {
    var nomape = $("#nombre").val() + " " + $("#apellidos").val();
    $("#nombre_empresa").val(nomape);
});

//Para modificar la etiqueta y el placeholder de CIF y nombre
$('#empresa').change(function() {
    $('#etiqueta_cif_nif').html('CIF *');
    $('#etiqueta_nombre_empresa').html('Empresa *');
    $('#cif_nif').prop('placeholder', 'CIF');
    $('#nombre_empresa').prop('placeholder', 'Empresa');
    // el nombre de la empresa es libre
    $("#nombre_empresa").val('');
    $("#nombre_empresa").attr('disabled', false);
});

$('#particular').change(function() {
    $('#etiqueta_cif_nif').html('NIF *');
    $('#etiqueta_nombre_empresa').html('Nombre *');
    $('#cif_nif').prop('placeholder', 'NIF');
    $('#nombre_empresa').prop('placeholder', 'Nombre');
    // el nombre es la combinacion de nombre y apellido y no se puede cambiar
    var nomape = $("#nombre").val() + " " + $("#apellidos").val();
    $("#nombre_empresa").val(nomape);
    $("#nombre_empresa").attr('disabled', true);

});

// Si el Código Postal se compone de 4 dígitos, se agrega un 0 a la izquierda.
$("#codigo_postal").focusout(function() {
    var cp = $('#codigo_postal').val();
    var digitos = cp.length;
    var ceros = "";
    for (var i = 1; i <= (5 - digitos); i++) {
        ceros = '0' + ceros;
    };
    var resultado = ceros + cp;
    $('#codigo_postal').val(resultado);
    /* var caracteres = $("#codigo_postal").val();
         if (caracteres.length == 4) {
             $("#codigo_postal").val("0" + caracteres);
         }*/
    var cod = parseInt(resultado.substring(0, 2));
    if (cod === 50) {
        $("#localidad").val('Zaragoza');
    } else {
        $("#localidad").val('');
    }
    $("#provincia option[value=" + cod + "]").attr("selected", true);
    if (cod > 0 && cod < 53) {
        $("#pais").val('España');
    } else {
        $("#pais").val('');
    }

});
// añado la validación de NIF de additional-methods.js para no tener que incluir todo el archivo 
/*
 * The Número de Identificación Fiscal ( NIF ) is the way tax identification used in Spain for individuals
 */
jQuery.validator.addMethod("nifES", function(value, element) {
    if (/^([0-9]{8})*[a-zA-Z]+$/.test(value)) {
        var dni = value.substr(0, value.length - 1);
        var l = value.charAt(value.length - 1);
        var pos = dni % 23;
        var letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.toUpperCase();
        letra = letra.substring(pos, pos + 1);
        if (letra == l.toUpperCase()) {
            return true;
        } else {
            return false;
        }
    }
});

// añado la validación de IBAN de additional-methods.js para no tener que incluir todo el archivo
/**
 * IBAN is the international bank account number.
 * It has a country - specific format, that is checked here too
 */
jQuery.validator.addMethod("iban", function(value, element) {
    // some quick simple tests to prevent needless work
    if (this.optional(element)) {
        return true;
    }
    if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(value))) {
        return false;
    }

    // check the country code and find the country specific format
    var iban = value.replace(/ /g, '').toUpperCase(); // remove spaces and to upper case
    var countrycode = iban.substring(0, 2);
    var bbancountrypatterns = {
        'AL': "\\d{8}[\\dA-Z]{16}",
        'AD': "\\d{8}[\\dA-Z]{12}",
        'AT': "\\d{16}",
        'AZ': "[\\dA-Z]{4}\\d{20}",
        'BE': "\\d{12}",
        'BH': "[A-Z]{4}[\\dA-Z]{14}",
        'BA': "\\d{16}",
        'BR': "\\d{23}[A-Z][\\dA-Z]",
        'BG': "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
        'CR': "\\d{17}",
        'HR': "\\d{17}",
        'CY': "\\d{8}[\\dA-Z]{16}",
        'CZ': "\\d{20}",
        'DK': "\\d{14}",
        'DO': "[A-Z]{4}\\d{20}",
        'EE': "\\d{16}",
        'FO': "\\d{14}",
        'FI': "\\d{14}",
        'FR': "\\d{10}[\\dA-Z]{11}\\d{2}",
        'GE': "[\\dA-Z]{2}\\d{16}",
        'DE': "\\d{18}",
        'GI': "[A-Z]{4}[\\dA-Z]{15}",
        'GR': "\\d{7}[\\dA-Z]{16}",
        'GL': "\\d{14}",
        'GT': "[\\dA-Z]{4}[\\dA-Z]{20}",
        'HU': "\\d{24}",
        'IS': "\\d{22}",
        'IE': "[\\dA-Z]{4}\\d{14}",
        'IL': "\\d{19}",
        'IT': "[A-Z]\\d{10}[\\dA-Z]{12}",
        'KZ': "\\d{3}[\\dA-Z]{13}",
        'KW': "[A-Z]{4}[\\dA-Z]{22}",
        'LV': "[A-Z]{4}[\\dA-Z]{13}",
        'LB': "\\d{4}[\\dA-Z]{20}",
        'LI': "\\d{5}[\\dA-Z]{12}",
        'LT': "\\d{16}",
        'LU': "\\d{3}[\\dA-Z]{13}",
        'MK': "\\d{3}[\\dA-Z]{10}\\d{2}",
        'MT': "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
        'MR': "\\d{23}",
        'MU': "[A-Z]{4}\\d{19}[A-Z]{3}",
        'MC': "\\d{10}[\\dA-Z]{11}\\d{2}",
        'MD': "[\\dA-Z]{2}\\d{18}",
        'ME': "\\d{18}",
        'NL': "[A-Z]{4}\\d{10}",
        'NO': "\\d{11}",
        'PK': "[\\dA-Z]{4}\\d{16}",
        'PS': "[\\dA-Z]{4}\\d{21}",
        'PL': "\\d{24}",
        'PT': "\\d{21}",
        'RO': "[A-Z]{4}[\\dA-Z]{16}",
        'SM': "[A-Z]\\d{10}[\\dA-Z]{12}",
        'SA': "\\d{2}[\\dA-Z]{18}",
        'RS': "\\d{18}",
        'SK': "\\d{20}",
        'SI': "\\d{15}",
        'ES': "\\d{20}",
        'SE': "\\d{20}",
        'CH': "\\d{5}[\\dA-Z]{12}",
        'TN': "\\d{20}",
        'TR': "\\d{5}[\\dA-Z]{17}",
        'AE': "\\d{3}\\d{16}",
        'GB': "[A-Z]{4}\\d{14}",
        'VG': "[\\dA-Z]{4}\\d{16}"
    };
    var bbanpattern = bbancountrypatterns[countrycode];
    // As new countries will start using IBAN in the
    // future, we only check if the countrycode is known.
    // This prevents false negatives, while almost all
    // false positives introduced by this, will be caught
    // by the checksum validation below anyway.
    // Strict checking should return FALSE for unknown
    // countries.
    if (typeof bbanpattern !== 'undefined') {
        var ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
        if (!(ibanregexp.test(iban))) {
            return false; // invalid country specific format
        }
    }

    // now check the checksum, first convert to digits
    var ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
    var ibancheckdigits = "";
    var leadingZeroes = true;
    var charAt;
    for (var i = 0; i < ibancheck.length; i++) {
        charAt = ibancheck.charAt(i);
        if (charAt !== "0") {
            leadingZeroes = false;
        }
        if (!leadingZeroes) {
            ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
        }
    }

    // calculate the result of: ibancheckdigits % 97
    var cRest = '';
    var cOperator = '';
    for (var p = 0; p < ibancheckdigits.length; p++) {
        var cChar = ibancheckdigits.charAt(p);
        cOperator = '' + cRest + '' + cChar;
        cRest = cOperator % 97;
    }
    return cRest === 1;
}, "Por favor introduce un IBAN válido");


// añado la validación de CIF de additional-methods.js para no tener que incluir todo el archivo
/*
 * Código de identificación fiscal ( CIF ) is the tax identification code for Spanish legal entities
 * Further rules can be found in Spanish on http://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal
 */
jQuery.validator.addMethod("cifES", function(value, element) {
    "use strict";

    var num = [],
        controlDigit, sum, i, count, tmp, secondDigit;
    value = value.toUpperCase();

    // Quick format test
    if (!value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)")) {
        return false;
    }
    for (i = 0; i < 9; i++) {
        num[i] = parseInt(value.charAt(i), 10);
    }
    // Algorithm for checking CIF codes
    sum = num[2] + num[4] + num[6];
    for (count = 1; count < 8; count += 2) {
        tmp = (2 * num[count]).toString();
        secondDigit = tmp.charAt(1);
        sum += parseInt(tmp.charAt(0), 10) + (secondDigit === "" ? 0 : parseInt(secondDigit, 10));
    }

    /* The first (position 1) is a letter following the following criteria:
     *  A. Corporations
     *  B. LLCs
     *  C. General partnerships
     *  D. Companies limited partnerships
     *  E. Communities of goods
     *  F. Cooperative Societies
     *  G. Associations
     *  H. Communities of homeowners in horizontal property regime
     *  J. Civil Societies
     *  K. Old format
     *  L. Old format
     *  M. Old format
     *  N. Nonresident entities
     *  P. Local authorities
     *  Q. Autonomous bodies, state or not, and the like, and congregations and religious institutions
     *  R. Congregations and religious institutions (since 2008 ORDER EHA/451/2008)
     *  S. Organs of State Administration and regions
     *  V. Agrarian Transformation
     *  W. Permanent establishments of non-resident in Spain
     */
    if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(value)) {
        sum += "";
        controlDigit = 10 - parseInt(sum.charAt(sum.length - 1), 10);
        value += controlDigit;
        return (num[8].toString() === String.fromCharCode(64 + controlDigit) || num[8].toString() === value.charAt(value.length - 1));
    }
    return false;
});
