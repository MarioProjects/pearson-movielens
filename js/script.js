
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

    $(".run_recommendation").click(function(){
        // Desde que le doy click se pone el loader automaticamente (main_loader.js)
        $(".preferences_container").fadeOut("slow");
        var curr_user_prefs = new Array(DIF_GENRES.length);

        $('.preference').each(function(i) {
            var genero = $(this).children(".preference_input").attr("data-info");
            var puntuacion = $(this).children(".slider_pref").attr("data-value");
            curr_user_prefs[DIF_GENRES[genero]] = parseInt(puntuacion);
        });
        
        // Normalizamos los valores de las preferencias
        curr_user_prefs_normalized = list_normalize(curr_user_prefs);
        
        var t0 = performance.now();
        var similar_users = pearsonCorrelationMatrix(user_prefs, curr_user_prefs_normalized, 1);
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

    $(".return_main").click(function(){
        $(".return_main").hide();
        $(".movies_recommendation").fadeOut("slow");
        $(".movies_recommendation_father").empty();
        $(".preferences_container").fadeIn("slow");
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
            initialRating: ratings[i],
            readonly: true
        });
    }
    
    $(".movies_recommendation").show();
    $(".return_main").show();
}


var user_prefs;
var path = document.location.toString();
function load_user_prefs_github(){
    $('#loadModel_modal').modal('show');
    $("#modalLoad_body").html("Cargando preferencias de usuarios...");
    $.getJSON(`${path}user_prefs.json`)
        .done(function( json ) {
            user_prefs = json;
            $("#modalLoad_body").html("Hecho! <i class='fa fa-smile-o' aria-hidden='true'></i>");
            setTimeout(function() {
                $('#loadModel_modal').modal('hide');
                $(".preferences_container").fadeIn(350);
            }, 1250);
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            alert(err);
        });      
}

function load_user_prefs_local(){
    $('#loadModel_modal').modal('show');
    $("#modalLoad_body").html("Cargando preferencias de usuarios...");
    //$.getJSON(`${path}user_prefs.json`)
     //   .done(function( json ) {
     //       user_prefs = json;
            $("#modalLoad_body").html("Hecho! <i class='fa fa-smile-o' aria-hidden='true'></i>");
            setTimeout(function() {
                $('#loadModel_modal').modal('hide');
                $(".preferences_container").fadeIn(350);
            }, 1250);
      //  })
       // .fail(function( jqxhr, textStatus, error ) {
        //    var err = textStatus + ", " + error;
         //   alert(err);
       // });      
}
