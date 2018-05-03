
function pearsonCorrelation(x, y) {
    // Referencia: https://github.com/scipy/scipy/blob/v0.14.0/scipy/stats/stats.py#L2392
    var n = x.length;
    var mx = list_mean(x);
    var my = list_mean(y);

    var xm = new Array(n);
    for (var i = 0; i < n; i++) {
        xm[i] = x[i]-mx;
    }

    var ym = new Array(n);
    for (var i = 0; i < n; i++) {
        ym[i] = y[i]-my;
    }

    var numerador = 0;
    for(var i=0; i < n; i++) {
        numerador += xm[i]*ym[i];
    }

    var denominador = Math.sqrt(ss(xm)*ss(ym));

    var r = numerador / denominador;
    return Math.max(Math.min(r, 1.0), -1.0)
}

function pearsonCorrelationMatrix(matrix, user, num_neighbours){
    /*
    Calcula los 'num_neighbours' de mayor coeficiente de correlacion
    pearson entre una base de datos de usuario 'data_matrix' y las 
    preferencias de un usuario dado 'user' y devolvemos los id de los usuarios
    con mayor coeficiente
    */
    // Recordar que los coeficientes van de -1 a +1
    var max_correlation = Array.apply(null, Array(num_neighbours)).map(Number.prototype.valueOf, -2);
    var user_indx = Array.apply(null, Array(num_neighbours)).map(Number.prototype.valueOf, -1);
    var cont_user = 0;

    for (var i = 0, n=matrix.length; i < n; i++) {
        var curr_pearson = pearsonCorrelation(matrix[i], user)
        if(curr_pearson > max_correlation[0]){
            max_correlation[0] = curr_pearson;
            user_indx[0] = i;
            // Ordenamos los array en funcion de los valores de correlacion
            // para que siempre quitemos la correlacion de menor valor
        }
    }

    return user_indx;
}

function list_sum(x){
    var sum, i, n;
    sum = 0;
    for (i = 0, n = x.length; i < n; i++) {
        sum += x[i];
    }
    return sum;
}

function list_mean(x){
    return list_sum(x) / x.length;
}

function list_normalize(x){
    var x_sum = list_sum(x);
    var normalized_array = new Array(x.length);
    for(var i=0, n = x.length; i < n; i++) {
        normalized_array[i] = x[i]/x_sum;
    }
    return normalized_array;
}

function ss(x){
    // Squares each element of the input array, and returns the sum(s) of that.
    var squared_array = new Array(x.length);
    for(var i=0, n = x.length; i < n; i++) {
        squared_array[i] = x[i]*x[i];
    }
    return list_sum(squared_array);
}