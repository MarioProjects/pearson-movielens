var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var usr_firebase_mail = "";


$('#login').click(function() {
    $email = $("#email").val();
    $pass = $("#password").val();
    if(!$email.match(re)) {
        //alert('invalid email');
        $("#email").css("border-color","#E74C3A")
    }else{
        //alert('valid email');
        if($pass.length>0){
            login_usuario($email,$pass);
        }else{
            $("#password").css("border-color","#E74C3A")
        }
    }
});

$("#email").on('keyup', function (e) {
    // Queremos quitar el borde rojo (posible) si ha escrito mal el email
    $("#email").css("border-color","rgb(78, 184, 221)")
    if (e.keyCode == 13) { // Cuando se presiona el enter
        $('#login').click();
    }
});

$("#password").on('keyup', function (e) {
    // Queremos quitar el borde rojo (posible) si ha escrito mal el email
    $("#password").css("border-color","rgb(78, 184, 221)")
    if (e.keyCode == 13) { // Cuando se presiona el enter
        $('#login').click();
    }
});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAidb1I6PKODzFu9AFvjq3-nDrwtcH82v4",
    authDomain: "pearson-movielens.firebaseapp.com",
    databaseURL: "https://pearson-movielens.firebaseio.com",
    projectId: "pearson-movielens",
    storageBucket: "pearson-movielens.appspot.com",
    messagingSenderId: "807314337784"
};
firebase.initializeApp(config);


function login_usuario(email, password){
    console.log("Voy a tratar de loguear al usuario!");
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
            // Success 
            console.log("Login con exito");
            var db_usr = email.split('.').join("");;
            db_usr = db_usr.replace('@','');
            recupera_usr_info(db_usr);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // Si no se ha podido hacer login seguramente es porque no estaba creado!
            crea_usuario(email, password);
        });
}

function crea_usuario(email, password){
    console.log("El usuario no estaba creado y voy a ello!");
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
            // Success 
            console.log("Creado usuario con exito");
            var db_usr = email.split('.').join("");;
            db_usr = db_usr.replace('@','');
            crea_usr_info(db_usr);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Contraseña incorrecta!");
            // ...
        });
}


function crea_usr_info(db_usr){
    // Acabo de registrar al usuario y debo meterlo en la base de datos
    firebase.database().ref(db_usr).set({
        "Action": 0,
        "Adventure": 0,
        "Comedy": 0,
        "Drama": 0,
        "Crime": 0,
        "Mystery": 0,
        "War": 0,
        "Fantasy": 0,
        "Horror": 0,
        "Film-Noir": 0,
        "Children": 0,
        "Musical": 0,
        "Western": 0,
        "Thriller": 0,
        "Documentary": 0,
        "Romance": 0,
        "Sci-Fi": 0,
        "Animation": 0,
        "(no genres listed)": 0
    });
    recupera_usr_info(db_usr);
}

function recupera_usr_info(db_usr){
    usr_firebase_mail = db_usr;
    var user_info = firebase.database().ref().child('/'+db_usr);
    user_info.once('value', function(datos) {
        datos_info = datos.val();
        
        $("#slider_accion_input").val(parseInt(datos_info["Action"]));
        $("#slider_accion").slider('setValue', parseInt(datos_info["Action"]));

        $("#slider_aventuras_input").val(parseInt(datos_info["Adventure"]));
        $("#slider_aventuras").slider('setValue', parseInt(datos_info["Adventure"]));

        $("#slider_comedia_input").val(parseInt(datos_info["Comedy"]));
        $("#slider_comedia").slider('setValue', parseInt(datos_info["Comedy"]));

        $("#slider_drama_input").val(parseInt(datos_info["Drama"]));
        $("#slider_drama").slider('setValue', parseInt(datos_info["Drama"]));

        $("#slider_crimen_input").val(parseInt(datos_info["Crime"]));
        $("#slider_crimen").slider('setValue', parseInt(datos_info["Crime"]));

        $("#slider_misterio_input").val(parseInt(datos_info["Mystery"]));
        $("#slider_misterio").slider('setValue', parseInt(datos_info["Mystery"]));

        $("#slider_guerra_input").val(parseInt(datos_info["War"]));
        $("#slider_guerra").slider('setValue', parseInt(datos_info["War"]));

        $("#slider_fantasia_input").val(parseInt(datos_info["Fantasy"]));
        $("#slider_fantasia").slider('setValue', parseInt(datos_info["Fantasy"]));

        $("#slider_horror_input").val(parseInt(datos_info["Horror"]));
        $("#slider_horror").slider('setValue', parseInt(datos_info["Horror"]));

        $("#slider_cinenegro_input").val(parseInt(datos_info["Film-Noir"]));
        $("#slider_cinenegro").slider('setValue', parseInt(datos_info["Film-Noir"]));

        $("#slider_infantil_input").val(parseInt(datos_info["Children"]));
        $("#slider_infantil").slider('setValue', parseInt(datos_info["Children"]));

        $("#slider_musical_input").val(parseInt(datos_info["Musical"]));
        $("#slider_musical").slider('setValue', parseInt(datos_info["Musical"]));

        $("#slider_vaqueros_input").val(parseInt(datos_info["Western"]));
        $("#slider_vaqueros").slider('setValue', parseInt(datos_info["Western"]));

        $("#slider_suspense_input").val(parseInt(datos_info["Thriller"]));
        $("#slider_suspense").slider('setValue', parseInt(datos_info["Thriller"]));

        $("#slider_documental_input").val(parseInt(datos_info["Documentary"]));
        $("#slider_documental").slider('setValue', parseInt(datos_info["Documentary"]));

        $("#slider_romantica_input").val(parseInt(datos_info["Romance"]));
        $("#slider_romantica").slider('setValue', parseInt(datos_info["Romance"]));

        $("#slider_cienciaficcion_input").val(parseInt(datos_info["Sci-Fi"]));
        $("#slider_cienciaficcion").slider('setValue', parseInt(datos_info["Sci-Fi"]));

        $("#slider_animacion_input").val(parseInt(datos_info["Animation"]));
        $("#slider_animacion").slider('setValue', parseInt(datos_info["Animation"]));

        $("#slider_otros_input").val(parseInt(datos_info["(no genres listed)"]));
        $("#slider_otros").slider('setValue', parseInt(datos_info["(no genres listed)"]));


        $(".initial_login").fadeOut();
        load_body();
    });
}

function update_usr_info(genero, valor){
    //usr_firebase_mail
    firebase.database().ref().child('/'+usr_firebase_mail+'/'+genero).set(parseInt(valor));
}