
function find_user_movies(users_ids, num_movies){
    /*
    Dado una lista de identificadores de usuarios, devolvemos los ids
    de las peliculas mejor puntuadas en promedio para todos esos usuarios,
    teniendo en cuenta no repetir las peliculas
    */
    var movies_found = 0;
    var res_movies = new Array();
    var res_ratings = new Array();
    var added = 0;
    
    // Debo recorrer todos los ususarios
    for(var i=0, n = users_ids.length; i < n; i++) {
        var current_user_movies = USER_RATINGS[users_ids[i]];
        // De los usuarios recorro todas sus peliculas
        for(var p=0, m = current_user_movies.length; p<m; p=p+2){
            // Si en mi matriz de peliculas posibles para los resultados
            // No esta la pelicula, la añado con el rating que el usuario 
            // primero en ver dicha pelicula le ha puesto
            var movie_pos_matrix = is_in(res_movies, current_user_movies[p])
            if(movie_pos_matrix==-1){
                res_movies.push(current_user_movies[p]);
                res_ratings.push(current_user_movies[p+1]);
                added++;
            }else{
                // Si ya se encontraba en nuestra matriz calculamos el nuevo valor
                // como un valor promediado del que estaba y el nuevo del usuario
                res_ratings[movie_pos_matrix] = (res_ratings[movie_pos_matrix] + current_user_movies[p+1]) / 2;
            }

        }
    }

    // Tengo todas las pelis y sus ratings y solo me falta ordenar res_ratings de mayor a menor
    // y con la misma ordenación (indices) ordenar res_movies, tomando al final 'num_movies' necesarias
    res_movies = res_movies
        .map((item, index) => [res_ratings[index], item])
        .sort(([count1], [count2]) => count2 - count1)
        .map(([, item]) => item);
    res_ratings.sort(function(a, b){return b-a});
    
    //Finalmente, con todo ordenado debo coger solo las primeras 'num_movies'
    return [res_movies.slice(0, num_movies), res_ratings.slice(0, num_movies)];
}

function ids_to_titles(ids_movies){
    /*
    Dada una lista de identificadores de peliculas vamos a devolver una lista 
    con los titulos de dichas peliculas
    */
    var res_titles = new Array();
    for(var i=0, n = ids_movies.length; i < n; i++) {
        if(ids_movies[i]!=0){
            res_titles.push(MOVIES_TITLES[ids_movies[i]]);
        }
    }
    return res_titles;
}

function is_in(x, element){
    /*
    Funcion auxiliar para saber si un 'elemento'
    esta dentro de una lista 'x'. Si esta devuelve la posicion
    del primer elemento, en caso de que no esté -1
    */
    for(var i=0, n = x.length; i < n; i++) {
        if(x[i]==element){
            return i;
        }
    }
    return -1;
}

function isOdd(num) { return num % 2;}

function getRandomMovieRating(arr, n) {
    /*
     Para tomar n elementos aleatorios de un array
     de forma moivieid,rating...
    */
    n = n*2; //Ya que vamos a tomar elementos (movieid) con su rating correspondiente
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
        n=n-2;
    }
    return result;
}