//Funcion que permite  la muestra iterativa de los cuadros en el header
(function() {

    var id = 4;
    var displayInterval = setInterval(function() {
        $('.user_bar-color-' + id).addClass('animated fadeInRight').css('display', 'block');
        id = id - 1;
        if (id === 0) {
            console.log('entre aqui');

            setTimeout(function() {

                $('.user_bar-color-1').html('<i class="fa fa-home animated fadeInUp" aria-hidden="true"></i>');
                $('.user_bar-color-4').html('<i class="fa fa-sign-out-alt animated fadeInUp" aria-hidden="true"></i>');
            }, 500);

            clearInterval(displayInterval);

        };
    }, 250);

})();