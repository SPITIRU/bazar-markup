'use strict';

$(document).ready(function () {

    $(window).on("load", function () {
        $('body').removeClass('loading');
    });

    // //Custom Select https://select2.org/
    if ($('.js-select').length > 0) {
        $('.js-select').select2({
            placeholder: $(this).data('placeholder')
        });

        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });
    }

    // //Masked inputmask https://github.com/RobinHerbots/Inputmask
    // if ($('.js-phone-mask').length > 0) {
    //     $('.js-phone-mask').inputmask({
    //         mask: "+7 (999) 999-99-99",
    //         clearIncomplete: true
    //     })
    // }

    function mainOffset() {
        $('.main').css('padding-top', $('.header').outerHeight());
    }mainOffset();
    $(window).resize(mainOffset);

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination - 90 + 'px' }, 300);
        return false;
    });

    //Stop drag
    $("img").on("dragstart", function (event) {
        event.preventDefault();
    });

    //Footer media transform accordeon
    if ($(window).width() <= 480) {
        var footer = $('.js-footer');
        footer.find('.footer-item').addClass('accordeon__item').wrapAll('<div class="accordeon js-accordeon">');
        footer.find('.footer-item__content').addClass('accordeon__content').css('display', 'none');
        footer.find('.footer-item__title').addClass('accordeon__title');
    }

    //Hamburger btn
    $('.js-hamburger').on('click', function () {
        $(this).toggleClass('on');
        $('.js-nav-main').toggleClass('is-open');
        $('.js-overlay').toggleClass('is-active');
        return false;
    });
    //Mobile Search when click outside
    $(document).click(function (event) {
        if ($(event.target).closest('.js-hamburger, .js-nav-main').length) return;
        $('.js-hamburger').removeClass('on');
        $('.js-nav-main').removeClass('is-open');
        $('.js-overlay').removeClass('is-active');
        event.stopPropagation();
    });

    if ($(window).width() <= 480) {
        //Mobile Nav
        $('.js-nav-main').prependTo('.wrapper ');
        $('.js-main-nav-link--forward').on('click', function (e) {
            e.preventDefault();
            var navItem = $(this).closest('.nav-main__item');
            var navItemDropdown = $(this).closest('.nav-dropdown__item');
            var navItemDropdown2 = navItem.find('.nav-dropdown__item');
            var mainDropdown = $(this).closest('.nav-main__dropdown');

            var title = $(this).text();
            var block = $('<li class="nav-dropdown__title nav-dropdown__title--temp">');

            if (!navItem.hasClass('is-active') && !$(this).hasClass('nav-dropdown__title--link')) {
                navItem.addClass('is-active');
                block.insertAfter(navItem.find('.nav-dropdown__title--link')).text(title);
            } else if (navItem.hasClass('is-active') && !navItemDropdown.hasClass('is-active') && !$(this).hasClass('nav-dropdown__title--link')) {
                navItemDropdown.addClass('is-active');
                mainDropdown.css('overflow', 'hidden');
            } else if (navItem.hasClass('is-active') && !navItemDropdown2.hasClass('is-active') && $(this).hasClass('nav-dropdown__title--link')) {
                navItem.removeClass('is-active');
                navItemDropdown.find('.nav-dropdown__title--temp').remove();
            } else if (navItem.hasClass('is-active') && navItemDropdown2.hasClass('is-active') && $(this).hasClass('nav-dropdown__title--link')) {
                navItemDropdown2.removeClass('is-active');
                mainDropdown.removeAttr('style');
            }
        });

        //Mobile Search
        var search = $('.js-search');
        var searchBtnShow = $('.js-mobile-search--show');

        $('.js-mobile-search--show').on('click', function () {
            if (search.hasClass('is-visible')) {
                search.removeClass('is-visible');
            } else {
                search.addClass('is-visible');
            }
        });

        //Mobile Search when click outside
        $(document).click(function (event) {
            if ($(event.target).closest('.js-mobile-search--show, .js-search').length) return;
            search.removeClass('is-visible');
            event.stopPropagation();
        });
    } else {
        var headerMain = $('.header-main');
        var headerMainClone = $('<div class="header-main--clone">').css('height', 85).insertAfter('.header-main').hide();
        $(window).scroll(function () {
            if ($(this).scrollTop() >= $('.header__top-line').outerHeight()) {
                headerMain.addClass('header--fixed');
                headerMainClone.show();
            } else {
                headerMain.removeClass('header--fixed');
                headerMainClone.hide();
            }
        });
    }

    //Show Password
    $('.js-input-password--show').on('click', function () {
        $(this).css('display', 'none');
        $(this).next().css('display', 'block');
        $(this).parent().find('input[type="password"]').attr('type', 'text');
    });
    //Hide Password
    $('.js-input-password--hide').on('click', function () {
        $(this).css('display', 'none');
        $(this).prev().css('display', 'block');
        $(this).parent().find('input[type="text"]').attr('type', 'password');
    });

    //btn favorite
    $('.js-button-icon--fav').on('click', function (e) {
        if (!$(this).hasClass('is-checked')) {
            $(this).addClass('is-checked');
        } else {
            $(this).removeClass('is-checked');
        }
        e.preventDefault();
    });

    /*
    * Slider.js
    */

    // //Slick Slider https://kenwheeler.github.io/slick/

    //Slider New

    if ($('.js-bz-slider--new').length > 0) {

        $('.js-bz-slider--new').slick({

            nextArrow: '.bz-slider__arrow--next',

            prevArrow: '.bz-slider__arrow--prev',

            arrows: true,

            infinite: true,

            slidesToShow: 5,

            slidesToScroll: 1,

            speed: 1000,

            autoplaySpeed: 5000,

            autoplay: true,

            dots: false,

            // variableWidth: true,

            responsive: [{

                breakpoint: 1025,

                settings: {

                    slidesToShow: 4

                }

            }, {

                breakpoint: 769,

                settings: {

                    slidesToShow: 3

                }

            }, {

                breakpoint: 426,

                settings: {

                    slidesToShow: 2,

                    autoplay: false,

                    variableWidth: false,

                    arrows: false

                }

            }, {

                breakpoint: 376,

                settings: {

                    slidesToShow: 2

                }

            }, {

                breakpoint: 321,

                settings: {

                    slidesToShow: 1

                }

            }]

        });
    }

    //Slider Promo

    if ($('.js-bz-slider--promo').length > 0) {

        $('.js-bz-slider--promo').slick({

            nextArrow: '.bz-slider-promo__arrow--next',

            prevArrow: '.bz-slider-promo__arrow--prev',

            arrows: true,

            infinite: true,

            slidesToShow: 1,

            slidesToScroll: 1,

            speed: 500,

            autoplaySpeed: 5000,

            autoplay: true,

            dots: true

        });
    }

    /*
    * Components.js
    */

    //Accordeon

    if ($('.js-accordeon').length > 0) {

        $('.js-accordeon').find('.accordeon__item').find('.accordeon__title').on('click', function () {

            if ($(this).parent().hasClass('is-open')) {

                $(this).parent().removeClass('is-open').find('.accordeon__content').css('display', 'none');
            } else {

                $(this).parent().addClass('is-open').find('.accordeon__content').removeAttr('style');
            }
        });
    }

    /*
    * Catalog.js
    */

    $('.js-product-item').find('.color__item').on('click', function (e) {

        var item = $(this).closest('.js-product-item');

        var color = $(this).data('color');

        var img = item.find('.product-item__image');

        img.attr('src', color);

        e.preventDefault();
    });

    //Changer

    $('.js-changer').find('.changer__item').on('click', function () {

        if ($(this).hasClass('is-checked')) {

            return;
        } else {

            $('.js-changer').find('.changer__item').removeClass('is-checked');

            $(this).addClass('is-checked');

            return;
        }
    });

    $('.js-changer').find('.changer__reset').on('click', function (e) {

        var item = $(this).parent('.changer__item');

        if (item.hasClass('is-checked')) {

            item.removeClass('is-checked');
        }

        e.stopPropagation();
    });

    // document.querySelector('.js-changer').addEventListener('click', cahnger);

    // function cahnger(e) {

    // 	console.log('click');

    // 	var target = e.target;

    // 	if (target.className == 'changer__item') {

    // 		console.log('test');

    // 	}	

    // }
});

/*
* Functions.js
*/
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwibGVuZ3RoIiwic2VsZWN0MiIsInBsYWNlaG9sZGVyIiwiZGF0YSIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwibWFpbk9mZnNldCIsImNzcyIsIm91dGVySGVpZ2h0IiwicmVzaXplIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImNsaWNrIiwiZWxlbWVudENsaWNrIiwiYXR0ciIsImRlc3RpbmF0aW9uIiwib2Zmc2V0IiwidG9wIiwiZXZlbnQiLCJ3aWR0aCIsImZvb3RlciIsImZpbmQiLCJhZGRDbGFzcyIsIndyYXBBbGwiLCJ0b2dnbGVDbGFzcyIsInRhcmdldCIsImNsb3Nlc3QiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwidGV4dCIsImJsb2NrIiwiaGFzQ2xhc3MiLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInJlbW92ZUF0dHIiLCJzZWFyY2giLCJzZWFyY2hCdG5TaG93IiwiaGVhZGVyTWFpbiIsImhlYWRlck1haW5DbG9uZSIsImhpZGUiLCJzY3JvbGwiLCJzaG93IiwibmV4dCIsInBhcmVudCIsInByZXYiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImFycm93cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzcGVlZCIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheSIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwidmFyaWFibGVXaWR0aCIsIml0ZW0iLCJjb2xvciIsImltZyJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENB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YUFBRixFQUFpQjRCLElBQWpCLENBQXNCLGlCQUF0QixFQUF5Q3hCLEVBQXpDLENBQTRDLE9BQTVDLEVBQXFELFVBQVNXLENBQVQsRUFBWTs7QUFFaEUsWUFBSXlELE9BQU94RSxFQUFFLElBQUYsRUFBUXVELE1BQVIsQ0FBZSxnQkFBZixDQUFYOztBQUVBLFlBQUlpQixLQUFLN0IsUUFBTCxDQUFjLFlBQWQsQ0FBSixFQUFnQzs7QUFFL0I2QixpQkFBS25FLFdBQUwsQ0FBaUIsWUFBakI7QUFFQTs7QUFFRFUsVUFBRW1CLGVBQUY7QUFFQSxLQVpEOztBQWdCQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUVILENBcFpEOztBQXNaSSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcbiAgICAvLyBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XHJcbiAgICAvLyAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgLy8gICAgICAgICBtYXNrOiBcIis3ICg5OTkpIDk5OS05OS05OVwiLFxyXG4gICAgLy8gICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XHJcbiAgICAgICAgJCgnLm1haW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgfW1haW5PZmZzZXQoKTtcclxuICAgICQod2luZG93KS5yZXNpemUobWFpbk9mZnNldCk7XHJcbiAgICBcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcclxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgODAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXHJcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnfSwgMzAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1N0b3AgZHJhZ1xyXG4gICAgJChcImltZ1wiKS5vbihcImRyYWdzdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtldmVudC5wcmV2ZW50RGVmYXVsdCgpfSk7XHJcblxyXG4gICAgLy9Gb290ZXIgbWVkaWEgdHJhbnNmb3JtIGFjY29yZGVvblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgbGV0IGZvb3RlciA9ICQoJy5qcy1mb290ZXInKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb24ganMtYWNjb3JkZW9uXCI+Jyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fY29udGVudCcpLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0hhbWJ1cmdlciBidG5cclxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbicpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoJy5qcy1oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcbiAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAvL01vYmlsZSBOYXZcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xyXG4gICAgICAgICQoJy5qcy1tYWluLW5hdi1saW5rLS1mb3J3YXJkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duMiA9IG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAkKHRoaXMpLnRleHQoKTtcclxuICAgICAgICAgICAgbGV0IGJsb2NrID0gJCgnPGxpIGNsYXNzPVwibmF2LWRyb3Bkb3duX190aXRsZSBuYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wXCI+Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgYmxvY2suaW5zZXJ0QWZ0ZXIobmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKS50ZXh0KHRpdGxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgIW5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7ICAgXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXAnKS5yZW1vdmUoKTsgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0pOyAgICAgXHJcblxyXG4gICAgICAgICAvL01vYmlsZSBTZWFyY2hcclxuICAgICAgICB2YXIgc2VhcmNoID0gJCgnLmpzLXNlYXJjaCcpO1xyXG4gICAgICAgIHZhciBzZWFyY2hCdG5TaG93ID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaC5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgc2VhcmNoLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3csIC5qcy1zZWFyY2gnKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pOyAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBoZWFkZXJNYWluID0gJCgnLmhlYWRlci1tYWluJyk7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW5DbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItbWFpbi0tY2xvbmVcIj4nKS5jc3MoJ2hlaWdodCcsIDg1KS5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJykuaGlkZSgpO1xyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49ICQoJy5oZWFkZXJfX3RvcC1saW5lJykub3V0ZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW4ucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1Nob3cgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcykubmV4dCgpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcbiAgICB9KTtcclxuICAgIC8vSGlkZSBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wcmV2KCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYnRuIGZhdm9yaXRlXHJcbiAgICAkKCcuanMtYnV0dG9uLWljb24tLWZhdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCkgICAgICA7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgKiBTbGlkZXIuanNcclxuICAgICovXHJcblxyXG4gICAgLy8gLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cclxuXHJcbiAgICAvL1NsaWRlciBOZXdcclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tbmV3JykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tcHJldicsXHJcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzMjEsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfV1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIFByb21vXHJcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogdHJ1ZVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ29tcG9uZW50cy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvL0FjY29yZGVvblxyXG5cclxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIFx0JCgnLmpzLWFjY29yZGVvbicpLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKS5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgXHQgICAgaWYoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnaXMtb3BlbicpKXtcclxuXHJcbiAgICBcdCAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgIFx0ICAgIH1lbHNle1xyXG5cclxuICAgIFx0ICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdpcy1vcGVuJykuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgXHQgICAgfSAgIFxyXG5cclxuICAgIFx0fSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAqIENhdGFsb2cuanNcclxuICAgICovXHJcblxyXG4gICAgJCgnLmpzLXByb2R1Y3QtaXRlbScpLmZpbmQoJy5jb2xvcl9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBcdGxldCBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtcHJvZHVjdC1pdGVtJyk7XHJcblxyXG4gICAgXHRsZXQgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG4gICAgXHRsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgIFx0aW1nLmF0dHIoJ3NyYycsIGNvbG9yKTtcclxuXHJcbiAgICBcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL0NoYW5nZXJcclxuXHJcbiAgICAkKCcuanMtY2hhbmdlcicpLmZpbmQoJy5jaGFuZ2VyX19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgXHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgXHRcdHJldHVybjtcclxuXHJcbiAgICBcdH0gZWxzZSB7XHJcblxyXG4gICAgXHRcdCQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIFx0XHQkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHRcdHJldHVybjtcclxuXHJcbiAgICBcdH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAkKCcuanMtY2hhbmdlcicpLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBcdGxldCBpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5jaGFuZ2VyX19pdGVtJyk7XHJcblxyXG4gICAgXHRpZiAoaXRlbS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKXtcclxuXHJcbiAgICBcdFx0aXRlbS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIFx0fVxyXG5cclxuICAgIFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY2hhbmdlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2Fobmdlcik7XHJcblxyXG4gICAgLy8gZnVuY3Rpb24gY2FobmdlcihlKSB7XHJcblxyXG4gICAgLy8gXHRjb25zb2xlLmxvZygnY2xpY2snKTtcclxuXHJcbiAgICAvLyBcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgICAvLyBcdGlmICh0YXJnZXQuY2xhc3NOYW1lID09ICdjaGFuZ2VyX19pdGVtJykge1xyXG5cclxuICAgIC8vIFx0XHRjb25zb2xlLmxvZygndGVzdCcpO1xyXG5cclxuICAgIC8vIFx0fVx0XHJcblxyXG4gICAgLy8gfVxyXG5cclxufSk7XHJcblxyXG4gICAgLypcclxuICAgICogRnVuY3Rpb25zLmpzXHJcbiAgICAqL1xyXG5cclxuICAgICJdfQ==
