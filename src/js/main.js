$(document).ready(function () {

    $(window).on("load", function () {
        $('body').removeClass('loading');
        //GetNiceScroll https://github.com/inuyaksa/jquery.nicescroll
        let scrollBar = $('.js-scroll');
        if (scrollBar.length > 0) {
            scrollBar.niceScroll({
                cursorcolor: '#e0e0e0',
                horizrailenabled: false,
                // autohidemode: false,
                boxzoom: false,
                verge: "500",
                cursorwidth: '4px',
                cursorborder: 'none',
                cursorborderradius: '0'
            });
            scrollBar.mouseover(function () {
                $(this).getNiceScroll().resize();
            });
        }
    });
    

    //Slick Slider https://kenwheeler.github.io/slick/
    if ($('.js-bb-slider').length > 0) {
        $('.js-bb-slider').slick({
            nextArrow: '.bb-slider__arrow--next',
            prevArrow: '.bb-slider__arrow--prev',
            arrows: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 1000,
            autoplaySpeed: 5000,
            autoplay: true,
            dots: true,
            responsive: [{

                breakpoint: 1201,
                settings: {
                    slidesToShow: 3
                }

            }, {

                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }

            }, {

                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }

            }]
        });
    }

    //Modal FancyBox 3 https://fancyapps.com/fancybox/3/
    if ($('[data-fancybox]').length > 0) {
        $('[data-fancybox]').fancybox({
            baseClass: 'bb-window__wrap',
            closeClickOutside: true,
            autoFocus: false,
            modal: true,
            touch: false,
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
    }

    //Custom Select https://select2.org/
    if ($('.js-select').length > 0) {
        $('.js-select').select2({
            placeholder: $(this).data('placeholder')
        });

        $('.js-select--multiple').select2({
            tags: true,
            placeholder: $(this).data('placeholder')
        });

        $('.js-select--metro').select2({
            placeholder: $(this).data('placeholder'),
            templateResult: addUserPic
        });
        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });

        function addUserPic(opt) {
            if (!opt.id) {
                return opt.text;
            }
            var optimage = $(opt.element).data('image');
            if (!optimage) {
                return opt.text;
            } else {
                var $opt = $(
                    '<span class="metro-icon metro-icon--' + optimage + '">' + $(opt.element).text() + '</span>'
                    );
                return $opt;
            }
        };
        $(document).click(function (event) {
            if ($(event.target).closest('.select2-dropdown, .select2-container').length) return;
            $('.js-select').select2('close');
            event.stopPropagation();
        });
        $(document).on("focus", '.select2-search__field', function (e) {
            e.stopPropagation();
        });
    }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if ($('.js-phone-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: "+7 (999) 999-99-99",
            clearIncomplete: true
        })
    }

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({scrollTop: destination - 90 + 'px'}, 300);
        return false;
    });

    //Stop drag
    $("img").on("dragstart", function (event) {event.preventDefault()});

});

    /*
    * Functions.js
    */

    //=include partials/functions.js