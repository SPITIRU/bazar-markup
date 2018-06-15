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

    /*
    * Card.js
    */

    $('.js-bz-slider--card').slick({

        slidesToShow: 1,

        slidesToScroll: 1,

        arrows: false,

        fade: true,

        asNavFor: '.js-bz-slider--card-nav'

    });

    $('.js-bz-slider--card-nav').slick({

        slidesToShow: 6,

        slidesToScroll: 1,

        asNavFor: '.js-bz-slider--card',

        dots: true,

        centerMode: true,

        focusOnSelect: true

    });

    //card tabs

    $('.js-card-tab-info').tabs();

    $('.js-card-tab-related').tabs();
});

/*
* Functions.js
*/
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJ0ZXh0IiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJwYXJzZUludCIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsImNvbm5lY3QiLCJyYW5nZSIsInZhbHVlcyIsImhhbmRsZSIsImZhZGUiLCJhc05hdkZvciIsImNlbnRlck1vZGUiLCJmb2N1c09uU2VsZWN0IiwidGFicyJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVk7O0FBRTFCRixNQUFFRyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVk7QUFDN0JKLFVBQUUsTUFBRixFQUFVSyxXQUFWLENBQXNCLFNBQXRCO0FBQ0E7QUFDQSxZQUFJQyxZQUFZTixFQUFFLFlBQUYsQ0FBaEI7QUFDQSxZQUFJTSxVQUFVQyxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3RCRCxzQkFBVUUsVUFBVixDQUFxQjtBQUNqQkMsNkJBQWEsU0FESTtBQUVqQkMsa0NBQWtCLEtBRkQ7QUFHakI7QUFDQUMseUJBQVMsS0FKUTtBQUtqQkMsdUJBQU8sR0FMVTtBQU1qQkMsNkJBQWEsS0FOSTtBQU9qQkMsOEJBQWMsTUFQRztBQVFqQkMsb0NBQW9CO0FBUkgsYUFBckI7QUFVQVQsc0JBQVVVLFNBQVYsQ0FBb0IsWUFBWTtBQUM1QmhCLGtCQUFFLElBQUYsRUFBUWlCLGFBQVIsR0FBd0JDLE1BQXhCO0FBQ0gsYUFGRDtBQUdIO0FBQ0osS0FuQkQ7O0FB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QWMsQ0FGaUI7O0FBSS9CQyx3QkFBZ0IsQ0FKZTs7QUFNL0JnQyxrQkFBVSxxQkFOcUI7O0FBUS9CNUIsY0FBTSxJQVJ5Qjs7QUFVL0I2QixvQkFBWSxJQVZtQjs7QUFZL0JDLHVCQUFlOztBQVpnQixLQUFuQzs7QUFrQkE7O0FBRUFoSCxNQUFFLG1CQUFGLEVBQXVCaUgsSUFBdkI7O0FBRUFqSCxNQUFFLHNCQUFGLEVBQTBCaUgsSUFBMUI7QUFFSCxDQWhrQkQ7O0FBa2tCSSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyMyYzJiMmInLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm1vdXNlb3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcbiAgICAvLyBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XHJcbiAgICAvLyAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgLy8gICAgICAgICBtYXNrOiBcIis3ICg5OTkpIDk5OS05OS05OVwiLFxyXG4gICAgLy8gICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XHJcbiAgICAgICAgJCgnLm1haW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgfW1haW5PZmZzZXQoKTtcclxuICAgICQod2luZG93KS5yZXNpemUobWFpbk9mZnNldCk7XHJcbiAgICBcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcclxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgODAwKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7ICAgIFxyXG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5jc3MoJ2JvdHRvbScsIDcwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZiAgICBcclxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCd9LCAzMDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vU3RvcCBkcmFnXHJcbiAgICAkKFwiaW1nXCIpLm9uKFwiZHJhZ3N0YXJ0XCIsIGZ1bmN0aW9uIChldmVudCkge2V2ZW50LnByZXZlbnREZWZhdWx0KCl9KTtcclxuXHJcbiAgICAvL0Zvb3RlciBtZWRpYSA8PSA0ODAgdHJhbnNmb3JtIGFjY29yZGVvblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgbGV0IGZvb3RlciA9ICQoJy5qcy1mb290ZXInKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb24ganMtYWNjb3JkZW9uXCI+Jyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fY29udGVudCcpLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0hhbWJ1cmdlciBidG5cclxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID09PSAnJyA/ICdoaWRkZW4nIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAgLy9XaGVuIGNsaWNrIG91dHNpZGVcclxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWhhbWJ1cmdlciwgLmpzLW5hdi1tYWluLCAuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKCcuanMtaGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgLy9Nb2JpbGUgTmF2XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucHJlcGVuZFRvKCcud3JhcHBlciAnKTtcclxuICAgICAgICAkKCcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93bjIgPSBuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gJCh0aGlzKS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrLmluc2VydEFmdGVyKG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkudGV4dCh0aXRsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgIW5hdkl0ZW1Ecm9wZG93bi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgIFxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9KTsgICAgIFxyXG5cclxuICAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXHJcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcclxuICAgICAgICB2YXIgc2VhcmNoQnRuU2hvdyA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHNlYXJjaC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93LCAuanMtc2VhcmNoJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTsgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbiA9ICQoJy5oZWFkZXItbWFpbicpO1xyXG4gICAgICAgIGxldCBoZWFkZXJNYWluQ2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLW1haW4tLWNsb25lXCI+JykuY3NzKCdoZWlnaHQnLCA4NSkuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXItbWFpbicpLmhpZGUoKTtcclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW4uYWRkQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLnJlbW92ZUNsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9TaG93IFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpLm5leHQoKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgfSk7XHJcbiAgICAvL0hpZGUgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcykucHJldigpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2J0biBmYXZvcml0ZVxyXG4gICAgJCgnLmpzLWJ1dHRvbi1pY29uLS1mYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpICAgICAgO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICogU2xpZGVyLmpzXHJcbiAgICAqL1xyXG5cclxuICAgIC8vIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXHJcblxyXG4gICAgLy9TbGlkZXIgTmV3XHJcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG5cclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW3tcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzIxLFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH1dXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL1NsaWRlciBQcm9tb1xyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tbmV4dCcsXHJcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tcHJldicsXHJcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWVcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAqIENvbXBvbmVudHMuanNcclxuICAgICovXHJcblxyXG4gICAgLy9BY2NvcmRlb25cclxuXHJcbiAgICBpZiAoJCgnLmpzLWFjY29yZGVvbicpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICBcdCQoJy5qcy1hY2NvcmRlb24nKS5maW5kKCcuYWNjb3JkZW9uX19pdGVtJykuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cclxuICAgIFx0ICAgIGlmKCQodGhpcykucGFyZW50KCkuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XHJcblxyXG4gICAgXHQgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICBcdCAgICB9ZWxzZXtcclxuXHJcbiAgICBcdCAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnaXMtb3BlbicpLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgIFx0ICAgIH0gICBcclxuXHJcbiAgICBcdH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgKiBDYXRhbG9nLmpzXHJcbiAgICAqL1xyXG5cclxuICAgICQoJy5qcy1wcm9kdWN0LWl0ZW0nKS5maW5kKCcuY29sb3JfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgXHRsZXQgaXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXByb2R1Y3QtaXRlbScpO1xyXG5cclxuICAgIFx0bGV0IGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xyXG5cclxuICAgIFx0bGV0IGltZyA9IGl0ZW0uZmluZCgnLnByb2R1Y3QtaXRlbV9faW1hZ2UnKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICBcdGltZy5hdHRyKCdzcmMnLCBjb2xvcik7XHJcblxyXG4gICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9DaGFuZ2VyXHJcblxyXG4gICAgJCgnLmpzLWNoYW5nZXInKS5maW5kKCcuY2hhbmdlcl9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgIFx0XHRyZXR1cm47XHJcblxyXG4gICAgXHR9IGVsc2Uge1xyXG5cclxuICAgIFx0XHQkKCcuanMtY2hhbmdlcicpLmZpbmQoJy5jaGFuZ2VyX19pdGVtJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICBcdFx0JCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIFx0XHRyZXR1cm47XHJcblxyXG4gICAgXHR9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgJCgnLmpzLWNoYW5nZXInKS5maW5kKCcuY2hhbmdlcl9fcmVzZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgXHRsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xyXG5cclxuICAgIFx0aWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSl7XHJcblxyXG4gICAgXHRcdGl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICBcdH1cclxuXHJcbiAgICBcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX3N1Yml0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIFx0dmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XHJcblxyXG4gICAgXHR2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdmaWx0ZXItY29sb3InKTtcclxuXHJcbiAgICBcdGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuXHJcbiAgICBcdCQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2pzLXNjcm9sbCcpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBpZiAoJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0tcHJpY2UnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIHZhciBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIHZhciBhbGxQcmljZVN0YXJ0ID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ3N0YXJ0Jyk7XHJcblxyXG4gICAgICAgIHZhciBhbGxQcmljZUVuZCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdlbmQnKTtcclxuXHJcbiAgICAgICAgdmFyIHNwYW5zID0gWyQoJyNqc1ByaWNlU3RhcnQnKSwgJCgnI2pzUHJpY2VFbmQnKV07XHJcblxyXG4gICAgICAgIHZhciBzdGFydFByaWNlO1xyXG5cclxuICAgICAgICB2YXIgZW5kUHJpY2U7XHJcblxyXG4gICAgICAgIHZhciBhcnJQYXJhbXM7XHJcblxyXG4gICAgICAgIHZhciBzVXJsO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICBpZiAoc3BhbnNbMF0udGV4dCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICBzdGFydFByaWNlID0gYWxsUHJpY2VTdGFydDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBwYXJzZUludChzcGFuc1swXS50ZXh0KCkpXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgaWYgKHNwYW5zWzFdLnRleHQoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgZW5kUHJpY2UgPSBhbGxQcmljZUVuZDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGVuZFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMV0udGV4dCgpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0OiBbc3RhcnRQcmljZSwgZW5kUHJpY2VdLFxyXG5cclxuICAgICAgICAgICAgY29ubmVjdDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgJ21pbic6IGFsbFByaWNlU3RhcnQsXHJcblxyXG4gICAgICAgICAgICAgICAgJ21heCc6IGFsbFByaWNlRW5kXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24gKHZhbHVlcywgaGFuZGxlKSB7XHJcblxyXG4gICAgICAgICAgICBzcGFuc1toYW5kbGVdLnRleHQoKHZhbHVlc1toYW5kbGVdKSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL0NhdGFsb2cgRmlsdGVyIEFjdGlvblxyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1x0XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgIFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHRcclxuXHJcbiAgICBcdCQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgXHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgKiBDYXJkLmpzXHJcbiAgICAqL1xyXG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5zbGljayh7XHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgIGFycm93czogZmFsc2UsXHJcblxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5zbGljayh7XHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNixcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZCcsXHJcblxyXG4gICAgICAgIGRvdHM6IHRydWUsXHJcblxyXG4gICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcblxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWVcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL2NhcmQgdGFic1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1pbmZvJykudGFicygpO1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykudGFicygpO1xyXG5cclxufSk7XHJcblxyXG4gICAgLypcclxuICAgICogRnVuY3Rpb25zLmpzXHJcbiAgICAqL1xyXG5cclxuICAgICJdfQ==
