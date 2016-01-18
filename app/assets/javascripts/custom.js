jQuery(document).ready(function ($) {
    "use strict";

    // file input store file name
    $('.inputfile').each(function () {
        var $input = $(this),
            $label = $input.next('label'),
            labelVal = $label.html();

        $input.on('change', function (e) {
            var fileName = '';

            if (this.files && this.files.length > 1)
                fileName = ( this.getAttribute('data-multiple-caption') || '' ).replace('{count}', this.files.length);
            else if (e.target.value)
                fileName = e.target.value.split('\\').pop();

            if (fileName)
                $label.find('span').html(fileName);
            else
                $label.html(labelVal);
        });

        // Firefox bug fix
        $input
            .on('focus', function () {
                $input.addClass('has-focus');
            })
            .on('blur', function () {
                $input.removeClass('has-focus');
            });
    });

    /*
     * Replace all SVG images with inline SVG
     */
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });


    // add class active on restaurant buttons
/*    $('.restaurant-button').on('click', function () {
        $('.restaurant-button').removeClass('active');
        $(this).addClass('active');
    });*/

    <!-- initialize the calendar on ready -->
    $("#calendar").zabuto_calendar({
        today: true
    });

    // hide footer on input focus
    $('input, textarea').blur(function () {
            $('.footer-nav').removeClass("focus");
        })
        .focus(function () {
            $('.footer-nav').addClass("focus")
        });

    // update image on click
    $('.edit-image img, .edit-image a').on('click', function () {
        $('.image-upload').click();
    });

});
