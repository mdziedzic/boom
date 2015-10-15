$(document).ready(function () {

    'use strict';

    $('body').fadeIn(750);



   // -------------------------------------------------------  footer icons

    $('footer img').hover(
        function() {
            $(this).fadeTo(250, 1);
        },
        function () {
            $(this).fadeTo(250, 0.5);
        }
    );

});
