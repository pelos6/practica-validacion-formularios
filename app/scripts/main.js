//console.log('\'Hola \'Hola!');
'use strict';

// cargamos las provincias
$('#provincia').load("http://javieriranzo.infenlaces.com/2014_2015/DAW_DAWEC/practicaValidacionFormularios/dist/php/provincias.php");
// cargamos los paises
$("#pais").load("http://javieriranzo.infenlaces.com/2014_2015/DAW_DAWEC/practicaValidacionFormularios/dist/php/paises.php");

$("#formulario").validate({
    // oculta y muestra el campo no valido ... pero es un tanto molesto ;)
    /*  highlight: function(element, errorClass) {
          $(element).fadeOut(function() {
              $(element).fadeIn();
          });
      },*/
    // util para probar el final ...
    // ignore: ".form-control",
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
            remote: "http://javieriranzo.infenlaces.com/2014_2015/DAW_DAWEC/practicaValidacionFormularios/dist/php/comprueba_email.php"
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
                // ...y cif para empresas
                if ($("#empresa").is(":checked")) {
                    return 'cifES';
                }
            },
            //remote: "php/comprueba_cif_nif.php"
            remote: "http://javieriranzo.infenlaces.com/2014_2015/DAW_DAWEC/practicaValidacionFormularios/dist/php/comprueba_cif_nif.php" // usa el programa indicado
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
            iban: true
        },
        pago: {
            required: true
        },
        usuario: {
            required: true,
            minlength: 4
        },
        contrasena: {
            required: true,
            complexPass:true,
        },
        contrasena2: {
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
        localidad: {
            required: "Por favor introduce una localidad"
        },
        iban: {
            required: "Por favor introduce un código de IBAN"
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
        contrasena: {
            required: "La contraseña es obligatoria."
        },
        contrasena2: {
            required: "La confirmación de la contraseña es obligatoria.",
            equalTo: "Las contraseñas no son iguales"
        },
        nombre_empresa: {
            required: "La información de este campo es importante."
        }

    },
    //
    submitHandler: function(form) {
        var usuario = $("#usuario").val();
        var precio = $("input[name='pago']:checked").val();
        $.confirm({
            title: 'Confirmación del alta!',
            confirmButton: 'Aceptar la operacion',
            cancelButton: 'Cancelar la operación',
            backgroundDismiss: false,
            content: 'Se va a dar de alta al usuario ' + usuario + ' con una cuota de: ' + precio + ' Euros. Por favor confirme la operación',
            confirm: function() {
                $.alert({
                    title: 'Confirmación correcta',
                    confirmButton: 'Aceptar',
                    backgroundDismiss: false,
                    content: 'Confirmada el alta del usuario ' + usuario + ' .',
                });
            },
            cancel: function() {
                $.alert({
                    title: 'Cancelación de la operación!',
                    confirmButton: 'Aceptar',
                    backgroundDismiss: false,
                    content: 'Cancelada el alta del usuario ' + usuario + ' .',
                });
            }
        });
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
$("#contrasena").focusin(function() {
    $("#contrasena").complexify({}, function(valid, complexity) {
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

// Si el Código Postal tiene menos de 5 dígitos se agregan 0 a la izquierda.
// CP tendrán que ser 5 digitos. Si son menos se completará con 0 a la izquierda.
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
    $("#provincia option[value=" + cod + "]").attr("selected", true);
    if (cod > 0 && cod < 53) {
        $("#pais").val('ES');
        $("#localidad").val($('#provincia option[value='+cod+']').text());
    } else {
        $("#pais").val('');
        $("#localidad").val('');
        $("#provincia").val('');
    }
/*
    if (cod === 50) {
        $("#localidad").val('Zaragoza');
    } else {
        $("#localidad").val('');
    }
    */

});

// Comprobando la complejidad de la contraseña .
jQuery.validator.addMethod('complexPass', function(value, element) {
    var level = $('#BarraPass').attr('value');
    if(level>=50){
        return true;
    }
    else{
        return false;
    }
}, 'Por favor introduce una contraseña más segura.');


// meto estos metodos de additional.methods para no tener que cargar el archivo completo
/**
 * IBAN is the international bank account number.
 * It has a country - specific format, that is checked here too
 */
$.validator.addMethod("iban", function(value, element) {
    // some quick simple tests to prevent needless work
    if (this.optional(element)) {
        return true;
    }

    // remove spaces and to upper case
    var iban = value.replace(/ /g, "").toUpperCase(),
        ibancheckdigits = "",
        leadingZeroes = true,
        cRest = "",
        cOperator = "",
        countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

    if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
        return false;
    }

    // check the country code and find the country specific format
    countrycode = iban.substring(0, 2);
    bbancountrypatterns = {
        "AL": "\\d{8}[\\dA-Z]{16}",
        "AD": "\\d{8}[\\dA-Z]{12}",
        "AT": "\\d{16}",
        "AZ": "[\\dA-Z]{4}\\d{20}",
        "BE": "\\d{12}",
        "BH": "[A-Z]{4}[\\dA-Z]{14}",
        "BA": "\\d{16}",
        "BR": "\\d{23}[A-Z][\\dA-Z]",
        "BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
        "CR": "\\d{17}",
        "HR": "\\d{17}",
        "CY": "\\d{8}[\\dA-Z]{16}",
        "CZ": "\\d{20}",
        "DK": "\\d{14}",
        "DO": "[A-Z]{4}\\d{20}",
        "EE": "\\d{16}",
        "FO": "\\d{14}",
        "FI": "\\d{14}",
        "FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
        "GE": "[\\dA-Z]{2}\\d{16}",
        "DE": "\\d{18}",
        "GI": "[A-Z]{4}[\\dA-Z]{15}",
        "GR": "\\d{7}[\\dA-Z]{16}",
        "GL": "\\d{14}",
        "GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
        "HU": "\\d{24}",
        "IS": "\\d{22}",
        "IE": "[\\dA-Z]{4}\\d{14}",
        "IL": "\\d{19}",
        "IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
        "KZ": "\\d{3}[\\dA-Z]{13}",
        "KW": "[A-Z]{4}[\\dA-Z]{22}",
        "LV": "[A-Z]{4}[\\dA-Z]{13}",
        "LB": "\\d{4}[\\dA-Z]{20}",
        "LI": "\\d{5}[\\dA-Z]{12}",
        "LT": "\\d{16}",
        "LU": "\\d{3}[\\dA-Z]{13}",
        "MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
        "MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
        "MR": "\\d{23}",
        "MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
        "MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
        "MD": "[\\dA-Z]{2}\\d{18}",
        "ME": "\\d{18}",
        "NL": "[A-Z]{4}\\d{10}",
        "NO": "\\d{11}",
        "PK": "[\\dA-Z]{4}\\d{16}",
        "PS": "[\\dA-Z]{4}\\d{21}",
        "PL": "\\d{24}",
        "PT": "\\d{21}",
        "RO": "[A-Z]{4}[\\dA-Z]{16}",
        "SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
        "SA": "\\d{2}[\\dA-Z]{18}",
        "RS": "\\d{18}",
        "SK": "\\d{20}",
        "SI": "\\d{15}",
        "ES": "\\d{20}",
        "SE": "\\d{20}",
        "CH": "\\d{5}[\\dA-Z]{12}",
        "TN": "\\d{20}",
        "TR": "\\d{5}[\\dA-Z]{17}",
        "AE": "\\d{3}\\d{16}",
        "GB": "[A-Z]{4}\\d{14}",
        "VG": "[\\dA-Z]{4}\\d{16}"
    };

    bbanpattern = bbancountrypatterns[countrycode];
    // As new countries will start using IBAN in the
    // future, we only check if the countrycode is known.
    // This prevents false negatives, while almost all
    // false positives introduced by this, will be caught
    // by the checksum validation below anyway.
    // Strict checking should return FALSE for unknown
    // countries.
    if (typeof bbanpattern !== "undefined") {
        ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
        if (!(ibanregexp.test(iban))) {
            return false; // invalid country specific format
        }
    }

    // now check the checksum, first convert to digits
    ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
    for (i = 0; i < ibancheck.length; i++) {
        charAt = ibancheck.charAt(i);
        if (charAt !== "0") {
            leadingZeroes = false;
        }
        if (!leadingZeroes) {
            ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
        }
    }

    // calculate the result of: ibancheckdigits % 97
    for (p = 0; p < ibancheckdigits.length; p++) {
        cChar = ibancheckdigits.charAt(p);
        cOperator = "" + cRest + "" + cChar;
        cRest = cOperator % 97;
    }
    return cRest === 1;
}, "Por favor, introduzca un IBAN válido");

/*
 * Código de identificación fiscal ( CIF ) is the tax identification code for Spanish legal entities
 * Further rules can be found in Spanish on http://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal
 */
$.validator.addMethod("cifES", function(value) {
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

}, "Por favor, escribe un CIF válido.");

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
}, "Por favor, escribe un NIF válido.");
//});

$("button.boton").mousedown(function() {
    $(this).animate({
        'top': '5px',
        'boxShadowY': '0'
    }, 100);
}).mouseup(function() {
    $(this).animate({
        'top': '0',
        'boxShadowY': '5px'
    }, 100);
});
