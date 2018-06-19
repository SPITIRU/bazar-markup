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
        e.stopPropagation();
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

    //Slider Card

    $('.js-bz-slider--card').slick({

        slidesToShow: 1,

        slidesToScroll: 1,

        arrows: false,

        fade: true,

        asNavFor: '.js-bz-slider--card-nav',

        responsive: [{

            breakpoint: 481,

            settings: {

                dots: true

            }

        }]

    });

    $('.js-bz-slider--card-nav').slick({

        slidesToShow: 6,

        slidesToScroll: 1,

        asNavFor: '.js-bz-slider--card',

        dots: true,

        centerMode: true,

        focusOnSelect: true,

        responsive: [{

            breakpoint: 1025,

            settings: {

                centerMode: false

            }

        }, {

            breakpoint: 481,

            settings: "unslick"

        }]

    });

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

    //Slider Related

    if ($('.js-bz-slider--related').length > 0) {

        $('.js-bz-slider--related').slick({

            // nextArrow: '.bz-slider-related__arrow--next',

            // prevArrow: '.bz-slider-related__arrow--prev',

            arrows: true,

            infinite: true,

            slidesToShow: 8,

            slidesToScroll: 1,

            speed: 500,

            autoplaySpeed: 5000,

            autoplay: true,

            dots: false,

            responsive: [{

                breakpoint: 1025,

                settings: {

                    slidesToShow: 6

                }

            }, {

                breakpoint: 769,

                settings: {

                    slidesToShow: 5

                }

            }, {

                breakpoint: 481,

                settings: {

                    slidesToShow: 3

                }

            }, {

                breakpoint: 376,

                settings: {

                    slidesToShow: 2

                }

            }]

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

    //card tabs

    $('.js-card-tab-related').tabs();

    $('.js-card-tab-related').find('.tab__title').on('click', function () {

        $(this).closest('.js-card-tab-related').find('.js-bz-slider--related').slick('setPosition');
    });

    if ($('.js-tab').length > 0 && $(window).width() > 480) {

        document.querySelector('.js-tab').addEventListener('click', tabs);
    }

    //Табы

    function tabs(e) {

        var target = e.target;

        if (target.className == 'tab__title') {

            var dataTab = target.getAttribute('data-tab');

            var tabContent = document.querySelectorAll('.tab__content');

            var tabTitle = document.querySelectorAll('.tab__title');

            for (var i = 0; i < tabTitle.length; i++) {

                tabTitle[i].classList.remove('is-active');
            }

            target.classList.add('is-active');

            for (var i = 0; i < tabContent.length; i++) {

                if (dataTab == i) {

                    tabContent[i].style.display = 'block';
                } else {

                    tabContent[i].style.display = 'none';
                }
            }
        }
    }

    //tabs ---> accordeon

    function tabTransform() {

        var tab = $('.js-tab--transform');

        $('.js-tab').unwrap().addClass('accordeon accordeon--other js-accordeon').removeClass('tab__titles');

        tab.find('.tab__title').addClass('accordeon__title').removeClass('tab__title is-active').wrap('<div class="accordeon__item">');

        tab.find('[data-tab-content="0"]').removeAttr('style').insertAfter('[data-tab="0"]').parent().addClass('is-open');

        tab.find('[data-tab-content="1"]').css('display', 'none').insertAfter('[data-tab="1"]');

        tab.find('.tab__content').addClass('accordeon__content').removeClass('tab__content tab__content--product');

        tab.find('.tab__contentes').remove();
    }

    if ($(window).width() <= 480) {

        tabTransform();
    }

    if ($('.js-item-select').length > 0) {

        $('.js-item-select').each(function () {

            var colorBox = $(this).find('.item-select__color');

            var color = colorBox.data('item-select-color');

            colorBox.css('background-color', color);
        }).find('.item-select__item').each(function () {

            var colorBox = $(this).find('.item-select__color');

            var color = colorBox.data('item-select-color');

            colorBox.css('background-color', color);
        });
    }

    /*
    * Components.js
    */

    //Accordeon

    if ($('.js-accordeon').length > 0) {

        $('.js-accordeon').find('.accordeon__title').on('click', function () {

            if ($(this).parent().hasClass('is-open')) {

                $(this).parent().removeClass('is-open').find('.accordeon__content').css('display', 'none');
            } else {

                $(this).parent().addClass('is-open').find('.accordeon__content').removeAttr('style');
            }
        });
    }

    //checkbox

    $(document).on('click', '.js-checkbox', function () {

        if ($(this).find('input').is(':checked')) {

            $(this).addClass('is-checked');
        } else {

            $(this).removeClass('is-checked');
        }
    });

    $(document).on('click', '.js-checkbox--pseudo', function () {

        if ($(this).hasClass('is-checked')) {

            $(this).removeClass('is-checked');
        } else {

            $(this).addClass('is-checked');
        }
    });
});

/*
* Functions.js
*/
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJ0ZXh0IiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiZmFkZSIsImFzTmF2Rm9yIiwiY2VudGVyTW9kZSIsImZvY3VzT25TZWxlY3QiLCJpdGVtIiwiY29sb3IiLCJpbWciLCJlYWNoIiwiY29sb3JCb3giLCJzbGlkZXIiLCJnZXRFbGVtZW50QnlJZCIsImFsbFByaWNlU3RhcnQiLCJhbGxQcmljZUVuZCIsInNwYW5zIiwic3RhcnRQcmljZSIsImVuZFByaWNlIiwiYXJyUGFyYW1zIiwic1VybCIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwidmFsdWVzIiwiaGFuZGxlIiwidGFicyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJpcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVk7O0FBRTFCRixNQUFFRyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVk7QUFDN0JKLFVBQUUsTUFBRixFQUFVSyxXQUFWLENBQXNCLFNBQXRCO0FBQ0E7QUFDQSxZQUFJQyxZQUFZTixFQUFFLFlBQUYsQ0FBaEI7QUFDQSxZQUFJTSxVQUFVQyxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3RCRCxzQkFBVUUsVUFBVixDQUFxQjtBQUNqQkMsNkJBQWEsU0FESTtBQUVqQkMsa0NBQWtCLEtBRkQ7QUFHakI7QUFDQUMseUJB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QUVILEtBWkQ7O0FBZ0JBTCxNQUFFQyxRQUFGLEVBQVlHLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHNCQUF4QixFQUFnRCxZQUFXOztBQUV2RCxZQUFHSixFQUFFLElBQUYsRUFBUWlDLFFBQVIsQ0FBaUIsWUFBakIsQ0FBSCxFQUFrQzs7QUFFOUJqQyxjQUFFLElBQUYsRUFBUUssV0FBUixDQUFvQixZQUFwQjtBQUVILFNBSkQsTUFJSzs7QUFFREwsY0FBRSxJQUFGLEVBQVFnQyxRQUFSLENBQWlCLFlBQWpCO0FBRUg7QUFFSixLQVpEO0FBY0gsQ0FwMUJEOztBQXMxQkkiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKHdpbmRvdykub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcclxuICAgICAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXHJcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcclxuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcclxuICAgICAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmVyZ2U6IDUwMCxcclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgLy8gaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCkge1xyXG4gICAgLy8gICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgIC8vICAgICAgICAgbWFzazogXCIrNyAoOTk5KSA5OTktOTktOTlcIixcclxuICAgIC8vICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xyXG4gICAgICAgICQoJy5tYWluJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcclxuICAgIH1tYWluT2Zmc2V0KCk7XHJcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xyXG4gICAgXHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXHJcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDgwMCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpeyAgICBcclxuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIGlmICgkKCcubWFpbicpLmhhc0NsYXNzKCdjYXRhbG9nJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuY3NzKCdib3R0b20nLCA3MCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWYgICAgXHJcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnfSwgMzAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1N0b3AgZHJhZ1xyXG4gICAgJChcImltZ1wiKS5vbihcImRyYWdzdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtldmVudC5wcmV2ZW50RGVmYXVsdCgpfSk7XHJcblxyXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbScpLmFkZENsYXNzKCdhY2NvcmRlb25fX2l0ZW0nKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9IYW1idXJnZXIgYnRuXHJcbiAgICAkKCcuanMtaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PT0gJycgPyAnaGlkZGVuJyA6ICcnO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93JykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgLy9Nb2JpbGUgTmF2XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucHJlcGVuZFRvKCcud3JhcHBlciAnKTtcclxuICAgICAgICAkKCcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93bjIgPSBuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gJCh0aGlzKS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrLmluc2VydEFmdGVyKG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkudGV4dCh0aXRsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgIW5hdkl0ZW1Ecm9wZG93bi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgIFxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9KTsgICAgIFxyXG5cclxuICAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXHJcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcclxuICAgICAgICB2YXIgc2VhcmNoQnRuU2hvdyA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHNlYXJjaC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93LCAuanMtc2VhcmNoJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTsgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbiA9ICQoJy5oZWFkZXItbWFpbicpO1xyXG4gICAgICAgIGxldCBoZWFkZXJNYWluQ2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLW1haW4tLWNsb25lXCI+JykuY3NzKCdoZWlnaHQnLCA4NSkuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXItbWFpbicpLmhpZGUoKTtcclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW4uYWRkQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLnJlbW92ZUNsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9TaG93IFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpLm5leHQoKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgfSk7XHJcbiAgICAvL0hpZGUgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcykucHJldigpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2J0biBmYXZvcml0ZVxyXG4gICAgJCgnLmpzLWJ1dHRvbi1pY29uLS1mYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpICAgICAgO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICogU2xpZGVyLmpzXHJcbiAgICAqL1xyXG5cclxuICAgIC8vIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXHJcblxyXG4gICAgLy9TbGlkZXIgTmV3XHJcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG5cclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW3tcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzIxLFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH1dXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL1NsaWRlciBDYXJkXHJcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgZmFkZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicsXHJcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcblxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgIGRvdHM6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgfV1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA2LFxyXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcclxuXHJcbiAgICAgICAgZG90czogdHJ1ZSxcclxuXHJcbiAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW3tcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcblxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIH0se1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3M6IFwidW5zbGlja1wiXHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIH1dXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TbGlkZXIgUHJvbW9cclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXByb21vJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLW5leHQnLFxyXG5cclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLXByZXYnLFxyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL1NsaWRlciBSZWxhdGVkXHJcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICAvLyBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXJlbGF0ZWRfX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIC8vIHByZXZBcnJvdzogJy5iei1zbGlkZXItcmVsYXRlZF9fYXJyb3ctLXByZXYnLFxyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSx7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0se1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ2F0YWxvZy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAkKCcuanMtcHJvZHVjdC1pdGVtJykuZmluZCgnLmNvbG9yX19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcclxuXHJcbiAgICBcdGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcclxuXHJcbiAgICBcdGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgXHRpbWcuYXR0cignc3JjJywgY29sb3IpO1xyXG5cclxuICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8vQ2hhbmdlclxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICBcdFx0cmV0dXJuO1xyXG5cclxuICAgIFx0fSBlbHNlIHtcclxuXHJcbiAgICBcdFx0JCgnLmpzLWNoYW5nZXInKS5maW5kKCcuY2hhbmdlcl9faXRlbScpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICBcdFx0cmV0dXJuO1xyXG5cclxuICAgIFx0fVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX3Jlc2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmNoYW5nZXJfX2l0ZW0nKTtcclxuXHJcbiAgICBcdGlmIChpdGVtLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpe1xyXG5cclxuICAgIFx0XHRpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHR9XHJcblxyXG4gICAgXHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICBcdHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb2xvcicpO1xyXG5cclxuICAgIFx0dmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XHJcblxyXG4gICAgXHRjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYgKCQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtLXByaWNlJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnZW5kJyk7XHJcblxyXG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnRQcmljZTtcclxuXHJcbiAgICAgICAgdmFyIGVuZFByaWNlO1xyXG5cclxuICAgICAgICB2YXIgYXJyUGFyYW1zO1xyXG5cclxuICAgICAgICB2YXIgc1VybDtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgIGVuZFByaWNlID0gYWxsUHJpY2VFbmQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XHJcblxyXG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcblxyXG4gICAgICAgICAgICByYW5nZToge1xyXG5cclxuICAgICAgICAgICAgICAgICdtaW4nOiBhbGxQcmljZVN0YXJ0LFxyXG5cclxuICAgICAgICAgICAgICAgICdtYXgnOiBhbGxQcmljZUVuZFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICh2YWx1ZXMsIGhhbmRsZSkge1xyXG5cclxuICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KCh2YWx1ZXNbaGFuZGxlXSkpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cclxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcdFxyXG5cclxuICAgIFx0JCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICBcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1x0XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgIFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICogQ2FyZC5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvL2NhcmQgdGFic1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykudGFicygpO1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykuZmluZCgnLnRhYl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljaygnc2V0UG9zaXRpb24nKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICBpZiAoICQoJy5qcy10YWInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YWInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhYnMpOyAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy/QotCw0LHRi1xyXG5cclxuICAgIGZ1bmN0aW9uIHRhYnMoZSkge1xyXG5cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09ICd0YWJfX3RpdGxlJykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFUYWIgICAgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiVGl0bGUgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJfX3RpdGxlJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSBpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICB9IFxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxyXG5cclxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpe1xyXG5cclxuICAgICAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy10YWInKS51bndyYXAoKS5hZGRDbGFzcygnYWNjb3JkZW9uIGFjY29yZGVvbi0tb3RoZXIganMtYWNjb3JkZW9uJykucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJykucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGUgaXMtYWN0aXZlJykud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJykucmVtb3ZlQXR0cignc3R5bGUnKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpLnBhcmVudCgpLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIxXCJdJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCd0YWJfX2NvbnRlbnQgdGFiX19jb250ZW50LS1wcm9kdWN0Jyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBpZiAoJCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoID4gMCl7XHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgIH0pLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgIH0pOyAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ29tcG9uZW50cy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvL0FjY29yZGVvblxyXG5cclxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIFx0JCgnLmpzLWFjY29yZGVvbicpLmZpbmQoJy5hY2NvcmRlb25fX3RpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBcdCAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdpcy1vcGVuJykpe1xyXG5cclxuICAgIFx0ICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgXHQgICAgfWVsc2V7XHJcblxyXG4gICAgXHQgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICBcdCAgICB9ICAgXHJcblxyXG4gICAgXHR9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9jaGVja2JveFxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gnLCBmdW5jdGlvbiAoKXtcclxuXHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbiAoKXtcclxuXHJcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKXtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIEZ1bmN0aW9ucy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAiXX0=
