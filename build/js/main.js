'use strict';

$(document).ready(function () {

    $(window).on("load", function () {
        $('body').removeClass('loading');
    });

    // //Custom Select https://select2.org/
    // if ($('.js-select').length > 0) {
    //     $('.js-select').select2({
    //         placeholder: $(this).data('placeholder')
    //     });

    //     $('.js-select--multiple').select2({
    //         tags: true,
    //         placeholder: $(this).data('placeholder')
    //     });

    //     $('.js-select--metro').select2({
    //         placeholder: $(this).data('placeholder'),
    //         templateResult: addUserPic
    //     });
    //     $('.js-select.no-search').select2({
    //         minimumResultsForSearch: -1
    //     });

    //     function addUserPic(opt) {
    //         if (!opt.id) {
    //             return opt.text;
    //         }
    //         var optimage = $(opt.element).data('image');
    //         if (!optimage) {
    //             return opt.text;
    //         } else {
    //             var $opt = $(
    //                 '<span class="metro-icon metro-icon--' + optimage + '">' + $(opt.element).text() + '</span>'
    //                 );
    //             return $opt;
    //         }
    //     };
    //     $(document).click(function (event) {
    //         if ($(event.target).closest('.select2-dropdown, .select2-container').length) return;
    //         $('.js-select').select2('close');
    //         event.stopPropagation();
    //     });
    //     $(document).on("focus", '.select2-search__field', function (e) {
    //         e.stopPropagation();
    //     });
    // }

    // //Masked inputmask https://github.com/RobinHerbots/Inputmask
    // if ($('.js-phone-mask').length > 0) {
    //     $('.js-phone-mask').inputmask({
    //         mask: "+7 (999) 999-99-99",
    //         clearIncomplete: true
    //     })
    // }

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
});

/*
* Functions.js
*/
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImNsaWNrIiwiZWxlbWVudENsaWNrIiwiYXR0ciIsImRlc3RpbmF0aW9uIiwib2Zmc2V0IiwidG9wIiwiZXZlbnQiLCJ3aWR0aCIsImZvb3RlciIsImZpbmQiLCJhZGRDbGFzcyIsIndyYXBBbGwiLCJjc3MiLCJ0b2dnbGVDbGFzcyIsInRhcmdldCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwidGV4dCIsImJsb2NrIiwiaGFzQ2xhc3MiLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInJlbW92ZUF0dHIiLCJzZWFyY2giLCJzZWFyY2hCdG5TaG93IiwiaGVhZGVyTWFpbiIsImhlYWRlck1haW5DbG9uZSIsImhpZGUiLCJzY3JvbGwiLCJvdXRlckhlaWdodCIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiaXRlbSIsImNvbG9yIiwiZGF0YSIsImltZyJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVk7O0FBRTFCRixNQUFFRyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVk7QUFDN0JKLFVBQUUs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QUlBdkMsTUFBRSxrQkFBRixFQUFzQm1CLElBQXRCLENBQTJCLGNBQTNCLEVBQTJDZixFQUEzQyxDQUE4QyxPQUE5QyxFQUF1RCxVQUFTRSxDQUFULEVBQVk7O0FBRWxFLFlBQUk0RCxPQUFPbEUsRUFBRSxJQUFGLEVBQVF5QixPQUFSLENBQWdCLGtCQUFoQixDQUFYOztBQUVBLFlBQUkwQyxRQUFRbkUsRUFBRSxJQUFGLEVBQVFvRSxJQUFSLENBQWEsT0FBYixDQUFaOztBQUVBLFlBQUlDLE1BQU1ILEtBQUsvQyxJQUFMLENBQVUsc0JBQVYsQ0FBVjs7QUFJQWtELFlBQUl6RCxJQUFKLENBQVMsS0FBVCxFQUFnQnVELEtBQWhCOztBQUVBN0QsVUFBRUMsY0FBRjtBQUVBLEtBZEQ7QUFnQkgsQ0F0WEQ7O0FBd1hJIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuICAgIC8vIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xyXG4gICAgLy8gICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcclxuICAgIC8vICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vICAgICAkKCcuanMtc2VsZWN0LS1tdWx0aXBsZScpLnNlbGVjdDIoe1xyXG4gICAgLy8gICAgICAgICB0YWdzOiB0cnVlLFxyXG4gICAgLy8gICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgICQoJy5qcy1zZWxlY3QtLW1ldHJvJykuc2VsZWN0Mih7XHJcbiAgICAvLyAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJyksXHJcbiAgICAvLyAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuICAgIC8vICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgIGZ1bmN0aW9uIGFkZFVzZXJQaWMob3B0KSB7XHJcbiAgICAvLyAgICAgICAgIGlmICghb3B0LmlkKSB7XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcclxuICAgIC8vICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1ldHJvLWljb24gbWV0cm8taWNvbi0tJyArIG9wdGltYWdlICsgJ1wiPicgKyAkKG9wdC5lbGVtZW50KS50ZXh0KCkgKyAnPC9zcGFuPidcclxuICAgIC8vICAgICAgICAgICAgICAgICApO1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9O1xyXG4gICAgLy8gICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgLy8gICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5zZWxlY3QyLWRyb3Bkb3duLCAuc2VsZWN0Mi1jb250YWluZXInKS5sZW5ndGgpIHJldHVybjtcclxuICAgIC8vICAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoJ2Nsb3NlJyk7XHJcbiAgICAvLyAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICAgICQoZG9jdW1lbnQpLm9uKFwiZm9jdXNcIiwgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgLy8gICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgLy8gaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCkge1xyXG4gICAgLy8gICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgIC8vICAgICAgICAgbWFzazogXCIrNyAoOTk5KSA5OTktOTktOTlcIixcclxuICAgIC8vICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH1cclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcclxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgODAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXHJcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnfSwgMzAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1N0b3AgZHJhZ1xyXG4gICAgJChcImltZ1wiKS5vbihcImRyYWdzdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtldmVudC5wcmV2ZW50RGVmYXVsdCgpfSk7XHJcblxyXG4gICAgLy9Gb290ZXIgbWVkaWEgdHJhbnNmb3JtIGFjY29yZGVvblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgbGV0IGZvb3RlciA9ICQoJy5qcy1mb290ZXInKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb24ganMtYWNjb3JkZW9uXCI+Jyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fY29udGVudCcpLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0hhbWJ1cmdlciBidG5cclxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbicpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoJy5qcy1oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcbiAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAvL01vYmlsZSBOYXZcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xyXG4gICAgICAgICQoJy5qcy1tYWluLW5hdi1saW5rLS1mb3J3YXJkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duMiA9IG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAkKHRoaXMpLnRleHQoKTtcclxuICAgICAgICAgICAgbGV0IGJsb2NrID0gJCgnPGxpIGNsYXNzPVwibmF2LWRyb3Bkb3duX190aXRsZSBuYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wXCI+Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgYmxvY2suaW5zZXJ0QWZ0ZXIobmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKS50ZXh0KHRpdGxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgIW5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7ICAgXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXAnKS5yZW1vdmUoKTsgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0pOyAgICAgXHJcblxyXG4gICAgICAgICAvL01vYmlsZSBTZWFyY2hcclxuICAgICAgICB2YXIgc2VhcmNoID0gJCgnLmpzLXNlYXJjaCcpO1xyXG4gICAgICAgIHZhciBzZWFyY2hCdG5TaG93ID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaC5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgc2VhcmNoLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3csIC5qcy1zZWFyY2gnKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pOyAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBoZWFkZXJNYWluID0gJCgnLmhlYWRlci1tYWluJyk7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW5DbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItbWFpbi0tY2xvbmVcIj4nKS5jc3MoJ2hlaWdodCcsIDg1KS5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJykuaGlkZSgpO1xyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49ICQoJy5oZWFkZXJfX3RvcC1saW5lJykub3V0ZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW4ucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1Nob3cgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcykubmV4dCgpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcbiAgICB9KTtcclxuICAgIC8vSGlkZSBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wcmV2KCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYnRuIGZhdm9yaXRlXHJcbiAgICAkKCcuanMtYnV0dG9uLWljb24tLWZhdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCkgICAgICA7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgKiBTbGlkZXIuanNcclxuICAgICovXHJcblxyXG4gICAgLy8gLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cclxuXHJcbiAgICAvL1NsaWRlciBOZXdcclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tbmV3JykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tcHJldicsXHJcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzMjEsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfV1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIFByb21vXHJcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogdHJ1ZVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ29tcG9uZW50cy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvL0FjY29yZGVvblxyXG5cclxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIFx0JCgnLmpzLWFjY29yZGVvbicpLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKS5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgXHQgICAgaWYoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnaXMtb3BlbicpKXtcclxuXHJcbiAgICBcdCAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgIFx0ICAgIH1lbHNle1xyXG5cclxuICAgIFx0ICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdpcy1vcGVuJykuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgXHQgICAgfSAgIFxyXG5cclxuICAgIFx0fSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAqIENhdGFsb2cuanNcclxuICAgICovXHJcblxyXG4gICAgJCgnLmpzLXByb2R1Y3QtaXRlbScpLmZpbmQoJy5jb2xvcl9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBcdGxldCBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtcHJvZHVjdC1pdGVtJyk7XHJcblxyXG4gICAgXHRsZXQgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG4gICAgXHRsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgIFx0aW1nLmF0dHIoJ3NyYycsIGNvbG9yKTtcclxuXHJcbiAgICBcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIEZ1bmN0aW9ucy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAiXX0=
