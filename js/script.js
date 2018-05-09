
$( document ).ready(function() {

    // With JQuery
    $("#slider_accion").slider();
    $("#slider_accion").on("slide", function(slideEvt) {
        $("#slider_accion_input").val(slideEvt.value);
    });

    $("#slider_aventuras").slider();
    $("#slider_aventuras").on("slide", function(slideEvt) {
        $("#slider_aventuras_input").val(slideEvt.value);
    });

    $("#slider_comedia").slider();
    $("#slider_comedia").on("slide", function(slideEvt) {
        $("#slider_comedia_input").val(slideEvt.value);
    });

    $("#slider_drama").slider();
    $("#slider_drama").on("slide", function(slideEvt) {
        $("#slider_drama_input").val(slideEvt.value);
    });

    $("#slider_crimen").slider();
    $("#slider_crimen").on("slide", function(slideEvt) {
        $("#slider_crimen_input").val(slideEvt.value);
    });

    $("#slider_misterio").slider();
    $("#slider_misterio").on("slide", function(slideEvt) {
        $("#slider_misterio_input").val(slideEvt.value);
    });

    $("#slider_guerra").slider();
    $("#slider_guerra").on("slide", function(slideEvt) {
        $("#slider_guerra_input").val(slideEvt.value);
    });

    $("#slider_fantasia").slider();
    $("#slider_fantasia").on("slide", function(slideEvt) {
        $("#slider_fantasia_input").val(slideEvt.value);
    });

    $("#slider_horror").slider();
    $("#slider_horror").on("slide", function(slideEvt) {
        $("#slider_horror_input").val(slideEvt.value);
    });

    $("#slider_cinenegro").slider();
    $("#slider_cinenegro").on("slide", function(slideEvt) {
        $("#slider_cinenegro_input").val(slideEvt.value);
    });

    $("#slider_infantil").slider();
    $("#slider_infantil").on("slide", function(slideEvt) {
        $("#slider_infantil_input").val(slideEvt.value);
    });

    $("#slider_musical").slider();
    $("#slider_musical").on("slide", function(slideEvt) {
        $("#slider_musical_input").val(slideEvt.value);
    });
    
    $("#slider_vaqueros").slider();
    $("#slider_vaqueros").on("slide", function(slideEvt) {
        $("#slider_vaqueros_input").val(slideEvt.value);
    });

    $("#slider_suspense").slider();
    $("#slider_suspense").on("slide", function(slideEvt) {
        $("#slider_suspense_input").val(slideEvt.value);
    });

    $("#slider_documental").slider();
    $("#slider_documental").on("slide", function(slideEvt) {
        $("#slider_documental_input").val(slideEvt.value);
    });

    $("#slider_romantica").slider();
    $("#slider_romantica").on("slide", function(slideEvt) {
        $("#slider_romantica_input").val(slideEvt.value);
    });

    $("#slider_cienciaficcion").slider();
    $("#slider_cienciaficcion").on("slide", function(slideEvt) {
        $("#slider_cienciaficcion_input").val(slideEvt.value);
    });

    $("#slider_animacion").slider();
    $("#slider_animacion").on("slide", function(slideEvt) {
        $("#slider_animacion_input").val(slideEvt.value);
    });

    $("#slider_otros").slider();
    $("#slider_otros").on("slide", function(slideEvt) {
        $("#slider_otros_input").val(slideEvt.value);
    });

    //Para que no haya ningun input seleccionado en el inicio
    $("input").blur();
    $(".slider_pref").val(0);

    // Para detectar si el usuario a modificado los inputs
    $(".preference_input").change(function(){
        if(parseInt($(this).val())>100){
            $(this).val(100)
        }else if(parseInt($(this).val())<-100){
            $(this).val(-100)
        }
        $(this).siblings().eq(2).slider('setValue', parseInt($(this).val()));
    });

    $(".run_recommendation").click(function(){
        // Desde que le doy click se pone el loader automaticamente (main_loader.js)
        $(".preferences_container").fadeOut("slow");
        $(".selector_personalidad").fadeOut("slow");
        var curr_user_prefs = new Array(DIF_GENRES.length);

        $('.preference').each(function(i) {
            var genero = $(this).children(".preference_input").attr("data-info");
            if(typeof genero !== "undefined"){
                var puntuacion = $(this).children(".slider_pref").attr("data-value");
                update_usr_info(genero, puntuacion);
                curr_user_prefs[DIF_GENRES[genero]] = parseInt(puntuacion);
            }
        });
        
        // Normalizamos los valores de las preferencias
        curr_user_prefs_normalized = list_normalize(curr_user_prefs);
        
        var t0 = performance.now();
        var similar_users = pearsonCorrelationMatrix(USERS_PREFS, curr_user_prefs_normalized, 20);
        var movies_info = find_user_movies(similar_users, 10); // Indicamos el numero de peliculas que queremos
        var movies_ids = movies_info[0];
        var movies_ratings = movies_info[1];
        var movies_titles = ids_to_titles(movies_ids);        
        var t1 = performance.now();
        
        //Para mejorar la experiencia de usuario quiero dejar el loader un poco mas de 
        //tiempo si el calculo se realiza muy rapido (si no puede parecer que no hace nada)
        if((t1-t0)/1000<2){
            setTimeout(function(){
                // Solo esperamos para mostrar un poco mas el loader
                demo.spinner.setComplete();
                display_recomendations(movies_titles, movies_ratings, movies_ids);
            }, 2000);
        }else{
            demo.spinner.setComplete();
            display_recomendations(movies_titles, movies_ratings, movies_ids);
        }
    });

    // Boton para volver atras en la pantalla de recomendaciones finales
    $(".return_main").click(function(){
        $(".return_main").hide();
        $(".movies_recommendation").fadeOut("slow");
        $(".movies_recommendation_father").empty();
        $(".preferences_container").fadeIn("slow");
        $(".selector_personalidad").fadeIn("slow");
    });

    $(".fa-refresh").click(function(){
        $("#slider_accion_input").val(0);
        $("#slider_accion").slider('setValue', 0);

        $("#slider_aventuras_input").val(0);
        $("#slider_aventuras").slider('setValue', 0);

        $("#slider_comedia_input").val(0);
        $("#slider_comedia").slider('setValue', 0);

        $("#slider_drama_input").val(0);
        $("#slider_drama").slider('setValue', 0);

        $("#slider_crimen_input").val(0);
        $("#slider_crimen").slider('setValue', 0);

        $("#slider_misterio_input").val(0);
        $("#slider_misterio").slider('setValue', 0);

        $("#slider_guerra_input").val(0);
        $("#slider_guerra").slider('setValue', 0);

        $("#slider_fantasia_input").val(0);
        $("#slider_fantasia").slider('setValue', 0);

        $("#slider_horror_input").val(0);
        $("#slider_horror").slider('setValue', 0);

        $("#slider_cinenegro_input").val(0);
        $("#slider_cinenegro").slider('setValue', 0);

        $("#slider_infantil_input").val(0);
        $("#slider_infantil").slider('setValue', 0);

        $("#slider_musical_input").val(0);
        $("#slider_musical").slider('setValue', 0);

        $("#slider_vaqueros_input").val(0);
        $("#slider_vaqueros").slider('setValue', 0);

        $("#slider_suspense_input").val(0);
        $("#slider_suspense").slider('setValue', 0);

        $("#slider_documental_input").val(0);
        $("#slider_documental").slider('setValue', 0);

        $("#slider_romantica_input").val(0);
        $("#slider_romantica").slider('setValue', 0);

        $("#slider_cienciaficcion_input").val(0);
        $("#slider_cienciaficcion").slider('setValue', 0);

        $("#slider_animacion_input").val(0);
        $("#slider_animacion").slider('setValue', 0);

        $("#slider_otros_input").val(0);
        $("#slider_otros").slider('setValue', 0);
    });

    // Para las personalidades
    $('li').on('click', function() {
        if(typeof $(this).first().attr("data-value") !== "undefined"){
            switch(parseInt($(this).first().attr("data-value"))){
                case 1: // Piensas que el cine ya no es lo que era
                    $("#slider_accion_input").val(100);
                    $("#slider_accion").slider('setValue', 100);

                    $("#slider_cinenegro_input").val(60);
                    $("#slider_cinenegro").slider('setValue', 60);
            
                    $("#slider_musical_input").val(0);
                    $("#slider_musical").slider('setValue', 0);
            
                    $("#slider_vaqueros_input").val(100);
                    $("#slider_vaqueros").slider('setValue', 100);

                    $("#slider_documental_input").val(75);
                    $("#slider_documental").slider('setValue', 75);
            
                    $("#slider_otros_input").val(100);
                    $("#slider_otros").slider('setValue', 100);
                    break;
                case 2: // Chuck Norris conto hasta infinito – dos veces
                    $("#slider_accion_input").val(100);
                    $("#slider_accion").slider('setValue', 100);

                    $("#slider_aventuras_input").val(-100);
                    $("#slider_aventuras").slider('setValue', -100);
            
                    $("#slider_comedia_input").val(-100);
                    $("#slider_comedia").slider('setValue', -100);
            
                    $("#slider_drama_input").val(-100);
                    $("#slider_drama").slider('setValue', -100);
            
                    $("#slider_crimen_input").val(-100);
                    $("#slider_crimen").slider('setValue', -100);
            
                    $("#slider_misterio_input").val(-100);
                    $("#slider_misterio").slider('setValue', -100);
            
                    $("#slider_guerra_input").val(-100);
                    $("#slider_guerra").slider('setValue', -100);
            
                    $("#slider_fantasia_input").val(-100);
                    $("#slider_fantasia").slider('setValue', -100);
            
                    $("#slider_horror_input").val(-100);
                    $("#slider_horror").slider('setValue', -100);
            
                    $("#slider_cinenegro_input").val(-100);
                    $("#slider_cinenegro").slider('setValue', -100);
            
                    $("#slider_infantil_input").val(-100);
                    $("#slider_infantil").slider('setValue', -100);
            
                    $("#slider_musical_input").val(-100);
                    $("#slider_musical").slider('setValue', -100);
            
                    $("#slider_vaqueros_input").val(-100);
                    $("#slider_vaqueros").slider('setValue', -100);
            
                    $("#slider_suspense_input").val(-100);
                    $("#slider_suspense").slider('setValue', -100);
            
                    $("#slider_documental_input").val(-100);
                    $("#slider_documental").slider('setValue', -100);
            
                    $("#slider_romantica_input").val(-100);
                    $("#slider_romantica").slider('setValue', -100);
            
                    $("#slider_cienciaficcion_input").val(-100);
                    $("#slider_cienciaficcion").slider('setValue', -100);
            
                    $("#slider_animacion_input").val(-100);
                    $("#slider_animacion").slider('setValue', -100);
            
                    $("#slider_otros_input").val(-100);
                    $("#slider_otros").slider('setValue', -100);
                    break;
                case 3: // Crees que el VHS se volverá a poner de moda
                    $("#slider_accion_input").val(-66);
                    $("#slider_accion").slider('setValue', -66);

                    $("#slider_aventuras_input").val(66);
                    $("#slider_aventuras").slider('setValue', 66);
            
                    $("#slider_comedia_input").val(66);
                    $("#slider_comedia").slider('setValue', 66);
            
                    $("#slider_drama_input").val(-66);
                    $("#slider_drama").slider('setValue', -66);
            
                    $("#slider_crimen_input").val(-66);
                    $("#slider_crimen").slider('setValue', -66);
            
                    $("#slider_misterio_input").val(66);
                    $("#slider_misterio").slider('setValue', 66);
            
                    $("#slider_guerra_input").val(-66);
                    $("#slider_guerra").slider('setValue', -66);
            
                    $("#slider_fantasia_input").val(66);
                    $("#slider_fantasia").slider('setValue', 66);
            
                    $("#slider_horror_input").val(66);
                    $("#slider_horror").slider('setValue', 66);
            
                    $("#slider_cinenegro_input").val(-66);
                    $("#slider_cinenegro").slider('setValue', -66);
            
                    $("#slider_infantil_input").val(-66);
                    $("#slider_infantil").slider('setValue', -66);
            
                    $("#slider_musical_input").val(-66);
                    $("#slider_musical").slider('setValue', -66);
            
                    $("#slider_vaqueros_input").val(-66);
                    $("#slider_vaqueros").slider('setValue', -66);
            
                    $("#slider_suspense_input").val(66);
                    $("#slider_suspense").slider('setValue', 66);
            
                    $("#slider_documental_input").val(66);
                    $("#slider_documental").slider('setValue', 66);
            
                    $("#slider_romantica_input").val(-66);
                    $("#slider_romantica").slider('setValue', -66);
            
                    $("#slider_cienciaficcion_input").val(66);
                    $("#slider_cienciaficcion").slider('setValue', 66);
            
                    $("#slider_animacion_input").val(-66);
                    $("#slider_animacion").slider('setValue', -66);
            
                    $("#slider_otros_input").val(66);
                    $("#slider_otros").slider('setValue', 66);
                    break;
                case 4: // Eres 'rarito' - Te gustan las pelís en blanco y negro
                    $("#slider_misterio_input").val(66);
                    $("#slider_misterio").slider('setValue', 66);
            
                    $("#slider_horror_input").val(25);
                    $("#slider_horror").slider('setValue', 25);
            
                    $("#slider_cinenegro_input").val(33);
                    $("#slider_cinenegro").slider('setValue', 33);
            
                    $("#slider_vaqueros_input").val(45);
                    $("#slider_vaqueros").slider('setValue', 45);
            
                    $("#slider_suspense_input").val(66);
                    $("#slider_suspense").slider('setValue', 66);
            
                    $("#slider_documental_input").val(50);
                    $("#slider_documental").slider('setValue', 50);
            
                    $("#slider_romantica_input").val(33);
                    $("#slider_romantica").slider('setValue', 33);
            
                    $("#slider_cienciaficcion_input").val(60);
                    $("#slider_cienciaficcion").slider('setValue', 60);
            
                    $("#slider_otros_input").val(75);
                    $("#slider_otros").slider('setValue', 75);
                    break;
                case 5: // Tienes más sagas de Pokémon que amigos
                    $("#slider_aventuras_input").val(75);
                    $("#slider_aventuras").slider('setValue', 75);

                    $("#slider_misterio_input").val(74);
                    $("#slider_misterio").slider('setValue', 74);
            
                    $("#slider_fantasia_input").val(100);
                    $("#slider_fantasia").slider('setValue', 100);
            
                    $("#slider_infantil_input").val(99);
                    $("#slider_infantil").slider('setValue', 99);
            
                    $("#slider_musical_input").val(-22);
                    $("#slider_musical").slider('setValue', -22);
            
                    $("#slider_romantica_input").val(-36);
                    $("#slider_romantica").slider('setValue', -36);
            
                    $("#slider_cienciaficcion_input").val(60);
                    $("#slider_cienciaficcion").slider('setValue', 60);
            
                    $("#slider_animacion_input").val(97);
                    $("#slider_animacion").slider('setValue', 97);
            
                    $("#slider_otros_input").val(-66);
                    $("#slider_otros").slider('setValue', -66);
                    break;
                case 6: // Te gustaría estudiar en la escuela de High School Musical
                    $("#slider_infantil_input").val(65);
                    $("#slider_infantil").slider('setValue', 65);
            
                    $("#slider_musical_input").val(100);
                    $("#slider_musical").slider('setValue', 100);
            
                    $("#slider_vaqueros_input").val(-100);
                    $("#slider_vaqueros").slider('setValue', -100);
            
                    $("#slider_documental_input").val(-100);
                    $("#slider_documental").slider('setValue', -100);
            
                    break;
                case 7: // Has visto el Rey León 8912365 veces y la volverás a ver
                    $("#slider_aventuras_input").val(65);
                    $("#slider_aventuras").slider('setValue', 65);

                    $("#slider_fantasia_input").val(80);
                    $("#slider_fantasia").slider('setValue', 80);
            
                    $("#slider_infantil_input").val(100);
                    $("#slider_infantil").slider('setValue', 100);

                    $("#slider_animacion_input").val(100);
                    $("#slider_animacion").slider('setValue', 100);
                    break;
                case 8: // Crees que el diario de Noah es posible
                    $("#slider_accion_input").val(-20);
                    $("#slider_accion").slider('setValue', -20);

                    $("#slider_aventuras_input").val(55);
                    $("#slider_aventuras").slider('setValue', 55);
            
                    $("#slider_fantasia_input").val(66);
                    $("#slider_fantasia").slider('setValue', 66);

                    $("#slider_infantil_input").val(77);
                    $("#slider_infantil").slider('setValue', 77);

                    $("#slider_romantica_input").val(69);
                    $("#slider_romantica").slider('setValue', 69);

                    $("#slider_animacion_input").val(63);
                    $("#slider_animacion").slider('setValue', 63);
            
                    $("#slider_otros_input").val(-13);
                    $("#slider_otros").slider('setValue', -13);
                    break;
            }
        }
    });
    
});


function display_recomendations(titles, ratings, movies_ids){
    for(var i=0, n = titles.length; i < n; i++) {
        $(".movies_recommendation_father").append('<div class="preference col-sm-6 movie_recommended">\
                                                    <p class="movie_title">'+titles[i]+'</p>\
                                                    <select class="movie_rating" id="movie'+i+'">\
                                                        <option value="1">1</option>\
                                                        <option value="2">2</option>\
                                                        <option value="3">3</option>\
                                                        <option value="4">4</option>\
                                                        <option value="5">5</option>\
                                                    </select>\
                                                    <p class="movie_link">\
                                                        <a href="https://www.imdb.com/title/tt'+MOVIEID_TO_IMDBID[movies_ids[i]]+'/" target="_blank">\
                                                            <i class="fa fa-film" aria-hidden="true"></i>\
                                                        </a>\
                                                    </p>\
                                                </div>');
        $('#movie'+i).barrating({
            theme: 'fontawesome-stars-o',
            initialRating: Math.round(ratings[i]*2)/2,
            readonly: true
        });
    }
    
    $(".movies_recommendation").show();
    $(".return_main").show();
}

/*
function load_body(){
    $(".preferences_container").fadeIn();
    $(".selector_personalidad").fadeIn();
}
*/
var user_prefs;
function load_body(){
    $('#loadModel_modal').modal('show');
    $("#modalLoad_body").html("Cargando preferencias de usuarios...");
    
    $.ajax({
        //url: 'js/user_ratings.js',
        url: 'https://www.dropbox.com/s/rqk3h030rsprdtw/user_ratings.js?raw=1',
        dataType: 'script',
        cache: true, // or get new, fresh copy on every page load
        success: function() {
            $.ajax({
                url: 'js/user_prefs.min.js',
                dataType: 'script',
                cache: true, // or get new, fresh copy on every page load
                success: function() {
                    $("#modalLoad_body").html("Hecho! <i class='fa fa-smile-o' aria-hidden='true'></i>");
                    setTimeout(function() {
                        $('#loadModel_modal').modal('hide');
                        $(".preferences_container").fadeIn();
                        $(".selector_personalidad").fadeIn();
                    }, 1250);
                },
                error: function(){
                    alert("Error: user_prefs");
                }
              });
        },
        error: function(){
            alert("Error: user_ratings");
        }
      });
}