'use strict';

$(document).ready(function () {

    $(window).on("load", function () {
        $('body').removeClass('loading');
        //GetNiceScroll https://github.com/inuyaksa/jquery.nicescroll
        var scrollBar = $('.js-scroll');
        if (scrollBar.length > 0) {
            scrollBar.niceScroll({
                cursorcolor: '#2c2b2b',
                horizrailenabled: false,
                // autohidemode: false,
                boxzoom: false,
                verge: 500,
                cursorwidth: '4px',
                cursorborder: 'none',
                cursorborderradius: '0'
            });
            scrollBar.mouseover(function () {
                $(this).getNiceScroll().resize();
            });
        }
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

    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.js-go-top').addClass('is-visible');
            if ($('.main').hasClass('catalog') && $(window).width() <= 768) {
                $('.js-go-top').css('bottom', 70);
            } else {
                return false;
            }
        } else {
            $('.js-go-top').removeClass('is-visible');
            $('.js-go-top').removeAttr('style');
        }
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

    //Footer media <= 480 transform accordeon
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
        document.documentElement.style.overflow = document.documentElement.style.overflow === '' ? 'hidden' : '';
        return false;
    });
    //When click outside
    $(document).click(function (e) {
        if ($(e.target).closest('.js-hamburger, .js-nav-main, .js-catalog-filter--show').length) return;
        $('.js-hamburger').removeClass('on');
        $('.js-nav-main').removeClass('is-open');
        $('.js-overlay').removeClass('is-active');
        document.documentElement.style = '';
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

    $('.js-catalog-filter-item').find('.catalog-filter__subitem').each(function () {

        var colorBox = $(this).find('.catalog-filter__color');

        var color = colorBox.data('filter-color');

        colorBox.css('background-color', color);
    });

    if ($(window).width() <= 480) {

        $('.js-catalog-filter-item').find('.catalog-filter__content').removeClass('js-scroll');
    }

    if ($('.js-catalog-filter-item-price').length > 0) {

        var slider = document.getElementById('js-catalog-filter-slider');

        var allPriceStart = $('#js-catalog-filter-slider').data('start');

        var allPriceEnd = $('#js-catalog-filter-slider').data('end');

        var spans = [$('#jsPriceStart'), $('#jsPriceEnd')];

        var startPrice;

        var endPrice;

        var arrParams;

        var sUrl;

        if (spans[0].text() == '') {

            startPrice = allPriceStart;
        } else {

            startPrice = parseInt(spans[0].text());
        }

        if (spans[1].text() == '') {

            endPrice = allPriceEnd;
        } else {

            endPrice = parseInt(spans[1].text());
        }

        noUiSlider.create(slider, {

            start: [startPrice, endPrice],

            connect: true,

            range: {

                'min': allPriceStart,

                'max': allPriceEnd

            }

        });

        slider.noUiSlider.on('update', function (values, handle) {

            spans[handle].text(values[handle]);
        });
    }

    //Catalog Filter Action

    $('.js-catalog-filter--show').on('click', function () {

        $('.js-catalog-filter').addClass('is-visible');

        document.documentElement.style.overflow = 'hidden';
    });

    $('.js-catalog-filter--hide').on('click', function () {

        $('.js-catalog-filter').removeClass('is-visible');

        document.documentElement.style = '';
    });
});

/*
* Functions.js
*/
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJ0ZXh0IiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJwYXJzZUludCIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsImNvbm5lY3QiLCJyYW5nZSIsInZhbHVlcyIsImhhbmRsZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVk7O0FBRTFCRixNQUFFRyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVk7QUFDN0JKLFVBQUUsTUFBRixFQUFVSyxXQUFWLENBQXNCLFNBQXRCO0FBQ0E7QUFDQSxZQUFJQyxZQUFZTixFQUFFLFlBQUYsQ0FBaEI7QUFDQSxZQUFJTSxVQUFVQyxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3RCRCxzQkFBVUUsVUFBVixDQUFxQjtBQUNqQkMsNkJBQWEsU0FESTtBQUVqQkMsa0NBQWtCLEtBRkQ7QUFHakI7QUFDQUMseUJBQVMsS0FKUTtBQUtqQkMsdUJBQU8sR0FMVTtBQU1qQkMsNkJBQWEsS0FOSTtBQU9qQkMsOEJBQWMsTUFQRztBQVFqQkMsb0NBQW9CO0FBUkgsYUFBckI7QUFVQVQsc0JBQVVVLFNBQVYsQ0FBb0IsWUFBWTtBQUM1QmhCLGtCQUFFLElBQUYsRUFBUWlCLGFBQVIsR0FBd0JDLE1BQXhCO0FBQ0gsYUFGRDtBQUdIO0FBQ0osS0FuQkQ7O0FBcUJBO0FBQ0EsUUFBSWxCLEVBQUUsWUFBRixFQUFnQk8sTUFBaEIsR0FBeUIsQ0FBN0IsRUFB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QU1EMkMsbUJBQVdDLE1BQVgsQ0FBa0JYLE1BQWxCLEVBQTBCOztBQUV0QlksbUJBQU8sQ0FBQ1AsVUFBRCxFQUFhQyxRQUFiLENBRmU7O0FBSXRCTyxxQkFBUyxJQUphOztBQU10QkMsbUJBQU87O0FBRUgsdUJBQU9aLGFBRko7O0FBSUgsdUJBQU9DOztBQUpKOztBQU5lLFNBQTFCOztBQWdCQUgsZUFBT1UsVUFBUCxDQUFrQmxHLEVBQWxCLENBQXFCLFFBQXJCLEVBQStCLFVBQVV1RyxNQUFWLEVBQWtCQyxNQUFsQixFQUEwQjs7QUFFckRaLGtCQUFNWSxNQUFOLEVBQWNqRCxJQUFkLENBQW9CZ0QsT0FBT0MsTUFBUCxDQUFwQjtBQUVILFNBSkQ7QUFNSDs7QUFJRDs7QUFFQTVHLE1BQUUsMEJBQUYsRUFBOEJJLEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFlBQVc7O0FBRXBESixVQUFFLG9CQUFGLEVBQXdCZ0MsUUFBeEIsQ0FBaUMsWUFBakM7O0FBRUEvQixpQkFBUzhDLGVBQVQsQ0FBeUJDLEtBQXpCLENBQStCQyxRQUEvQixHQUEwQyxRQUExQztBQUVBLEtBTkQ7O0FBUUFqRCxNQUFFLDBCQUFGLEVBQThCSSxFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxZQUFXOztBQUVwREosVUFBRSxvQkFBRixFQUF3QkssV0FBeEIsQ0FBb0MsWUFBcEM7O0FBRUFKLGlCQUFTOEMsZUFBVCxDQUF5QkMsS0FBekIsR0FBaUMsRUFBakM7QUFFQSxLQU5EO0FBUUgsQ0F0aEJEOztBQXdoQkkiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKHdpbmRvdykub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcclxuICAgICAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXHJcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcclxuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcclxuICAgICAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmVyZ2U6IDUwMCxcclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgLy8gaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCkge1xyXG4gICAgLy8gICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgIC8vICAgICAgICAgbWFzazogXCIrNyAoOTk5KSA5OTktOTktOTlcIixcclxuICAgIC8vICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xyXG4gICAgICAgICQoJy5tYWluJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcclxuICAgIH1tYWluT2Zmc2V0KCk7XHJcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xyXG4gICAgXHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXHJcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDgwMCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpeyAgICBcclxuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIGlmICgkKCcubWFpbicpLmhhc0NsYXNzKCdjYXRhbG9nJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuY3NzKCdib3R0b20nLCA3MCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWYgICAgXHJcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnfSwgMzAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1N0b3AgZHJhZ1xyXG4gICAgJChcImltZ1wiKS5vbihcImRyYWdzdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtldmVudC5wcmV2ZW50RGVmYXVsdCgpfSk7XHJcblxyXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbScpLmFkZENsYXNzKCdhY2NvcmRlb25fX2l0ZW0nKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9IYW1idXJnZXIgYnRuXHJcbiAgICAkKCcuanMtaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PT0gJycgPyAnaGlkZGVuJyA6ICcnO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93JykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIC8vTW9iaWxlIE5hdlxyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnByZXBlbmRUbygnLndyYXBwZXIgJyk7XHJcbiAgICAgICAgJCgnLmpzLW1haW4tbmF2LWxpbmstLWZvcndhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBtYWluRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9fZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAgICAgICBsZXQgYmxvY2sgPSAkKCc8bGkgY2xhc3M9XCJuYXYtZHJvcGRvd25fX3RpdGxlIG5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXBcIj4nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBibG9jay5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpLnRleHQodGl0bGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICFuYXZJdGVtRHJvcGRvd24uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTsgICBcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcCcpLnJlbW92ZSgpOyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiBuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLnJlbW92ZUF0dHIoJ3N0eWxlJyk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7ICAgICBcclxuXHJcbiAgICAgICAgIC8vTW9iaWxlIFNlYXJjaFxyXG4gICAgICAgIHZhciBzZWFyY2ggPSAkKCcuanMtc2VhcmNoJyk7XHJcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xyXG5cclxuICAgICAgICAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7ICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpLmNzcygnaGVpZ2h0JywgODUpLmluc2VydEFmdGVyKCcuaGVhZGVyLW1haW4nKS5oaWRlKCk7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gJCgnLmhlYWRlcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vU2hvdyBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuICAgIH0pO1xyXG4gICAgLy9IaWRlIFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpLnByZXYoKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9idG4gZmF2b3JpdGVcclxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKSAgICAgIDtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIFNsaWRlci5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvLyAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xyXG5cclxuICAgIC8vU2xpZGVyIE5ld1xyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLW5ldycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TbGlkZXIgUHJvbW9cclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXByb21vJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLW5leHQnLFxyXG5cclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLXByZXYnLFxyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgKiBDb21wb25lbnRzLmpzXHJcbiAgICAqL1xyXG5cclxuICAgIC8vQWNjb3JkZW9uXHJcblxyXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgXHQkKCcuanMtYWNjb3JkZW9uJykuZmluZCgnLmFjY29yZGVvbl9faXRlbScpLmZpbmQoJy5hY2NvcmRlb25fX3RpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBcdCAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdpcy1vcGVuJykpe1xyXG5cclxuICAgIFx0ICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgXHQgICAgfWVsc2V7XHJcblxyXG4gICAgXHQgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICBcdCAgICB9ICAgXHJcblxyXG4gICAgXHR9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ2F0YWxvZy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAkKCcuanMtcHJvZHVjdC1pdGVtJykuZmluZCgnLmNvbG9yX19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcclxuXHJcbiAgICBcdGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcclxuXHJcbiAgICBcdGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgXHRpbWcuYXR0cignc3JjJywgY29sb3IpO1xyXG5cclxuICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8vQ2hhbmdlclxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICBcdFx0cmV0dXJuO1xyXG5cclxuICAgIFx0fSBlbHNlIHtcclxuXHJcbiAgICBcdFx0JCgnLmpzLWNoYW5nZXInKS5maW5kKCcuY2hhbmdlcl9faXRlbScpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICBcdFx0cmV0dXJuO1xyXG5cclxuICAgIFx0fVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX3Jlc2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmNoYW5nZXJfX2l0ZW0nKTtcclxuXHJcbiAgICBcdGlmIChpdGVtLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpe1xyXG5cclxuICAgIFx0XHRpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHR9XHJcblxyXG4gICAgXHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICBcdHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb2xvcicpO1xyXG5cclxuICAgIFx0dmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XHJcblxyXG4gICAgXHRjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYgKCQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtLXByaWNlJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnZW5kJyk7XHJcblxyXG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnRQcmljZTtcclxuXHJcbiAgICAgICAgdmFyIGVuZFByaWNlO1xyXG5cclxuICAgICAgICB2YXIgYXJyUGFyYW1zO1xyXG5cclxuICAgICAgICB2YXIgc1VybDtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgIGVuZFByaWNlID0gYWxsUHJpY2VFbmQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XHJcblxyXG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcblxyXG4gICAgICAgICAgICByYW5nZToge1xyXG5cclxuICAgICAgICAgICAgICAgICdtaW4nOiBhbGxQcmljZVN0YXJ0LFxyXG5cclxuICAgICAgICAgICAgICAgICdtYXgnOiBhbGxQcmljZUVuZFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICh2YWx1ZXMsIGhhbmRsZSkge1xyXG5cclxuICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KCh2YWx1ZXNbaGFuZGxlXSkpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cclxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcdFxyXG5cclxuICAgIFx0JCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICBcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1x0XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgIFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbiAgICAvKlxyXG4gICAgKiBGdW5jdGlvbnMuanNcclxuICAgICovXHJcblxyXG4gICAgIl19
