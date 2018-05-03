
function find_user_movies(users_ids, num_movies, num_neighbours){
    /*
    Dado una lista de identificadores de usuarios, devolvemos los ids
    de las peliculas mejor puntuadas (rating > 4.0) de dichos usuarios hasta 
    llegar a tener 'num_movies' y sin repetir peliculas
    */
    var movies_found = 0;
    var res_movies = Array.apply(null, Array(num_movies)).map(Number.prototype.valueOf,0);
    var res_ratings = Array.apply(null, Array(num_movies)).map(Number.prototype.valueOf,0);
    var added = 0;
    
    for(var i=0, n = users_ids.length; i < n; i=i++) {
        var current_user_movies = BEST_RATINGS[users_ids[i]];
        for(var p=0, m = current_user_movies.length; p<m; p=p+2){
            if(!is_in(res_movies, current_user_movies[p])){
                res_movies[added] = current_user_movies[p];
                res_ratings[added] = current_user_movies[p+1];
                added++;
                if(added==num_movies){ return [res_movies,res_ratings];}
            }
        }
    }

    return [res_movies,res_ratings];
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
    esta dentro de una lista 'x'
    */
    for(var i=0, n = x.length; i < n; i++) {
        if(x[i]==element){
            return true;
        }
    }
    return false;
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