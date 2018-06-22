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
    if ($('.js-phone-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: "+7 (999) 999-99-99",
            clearIncomplete: true
        });
    }

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

    if ($(window).width() <= 768) {
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
            } else if (navItem.hasClass('is-active') && !navItemDropdown.hasClass('is-active') && !($(this).hasClass('nav-dropdown__title--link') || $(this).hasClass('nav-dropdown__title--back'))) {
                navItemDropdown.addClass('is-active');
                mainDropdown.css('overflow', 'hidden');
            } else if (navItem.hasClass('is-active') && !navItemDropdown2.hasClass('is-active') && ($(this).hasClass('nav-dropdown__title--link') || $(this).hasClass('nav-dropdown__title--back'))) {
                navItem.removeClass('is-active');
                navItemDropdown.find('.nav-dropdown__title--temp').remove();
            } else if (navItem.hasClass('is-active') && navItemDropdown2.hasClass('is-active') && ($(this).hasClass('nav-dropdown__title--link') || $(this).hasClass('nav-dropdown__title--back'))) {
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
                search.find('.js-search-input').val('');
                search.find('.search__hint').css('display', 'none');
            } else {
                search.addClass('is-visible');
            }
        });

        //Mobile Search when click outside
        $(document).click(function (event) {
            if ($(event.target).closest('.js-mobile-search--show, .js-search').length) return;
            search.removeClass('is-visible');
            search.find('.js-search-input').val('');
            search.find('.search__hint').css('display', 'none');
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
        var changeColor = function changeColor() {

            $('.js-item-select').each(function () {

                var colorBox = $(this).find('.item-select__color');

                var color = colorBox.data('item-select-color');

                colorBox.css('background-color', color);
            }).find('.item-select__item').each(function () {

                var colorBox = $(this).find('.item-select__color');

                var color = colorBox.data('item-select-color');

                colorBox.css('background-color', color);
            });
        };

        $('.js-item-select').on('click', function () {

            if ($(this).hasClass('is-active')) {

                $('.js-item-select').removeClass('is-active');

                $(this).removeClass('is-active');
            } else {

                $('.js-item-select').removeClass('is-active');

                $(this).addClass('is-active');
            }
        });

        $(document).on('click', function (e) {

            if ($(e.target).closest('.js-item-select').length) return;

            $('.js-item-select').removeClass('is-active');

            e.stopPropagation();
        });

        changeColor();

        $('.js-item-select').find('.item-select__item').on('click', function () {

            var select = $(this).closest('.js-item-select');

            var text = $(this).find('.item-select__title').text();

            var color = $(this).find('.item-select__color').data('item-select-color');

            var value = select.find('.item-select__value');

            var input = select.find('.item-select__input');

            input.val(text);

            value.children('.item-select__color').data('item-select-color', color);

            changeColor();

            if (select.hasClass('item-select--count')) {

                if ($(this).hasClass('item-select__item--header')) {

                    value.children('.item-select__title').removeAttr('style').text('Выбрать');

                    input.css('display', 'none');
                } else {

                    input.removeAttr('style');

                    value.children('.item-select__title').css('display', 'none');
                }
            }
        });

        $('.js-item-select-control--plus').on('click', function (e) {

            var select = $(this).closest('.js-item-select');

            var input = select.find('.item-select__input');

            var value = select.find('.item-select__value');

            var curentVal = parseInt(input.val());

            var count = parseInt(input.val()) + 1 + ' ' + 'м';

            input.removeAttr('style').val(count);

            if (curentVal > 0) {

                input.change();
            } else {

                input.val(1 + 'м');
            }

            value.children('.item-select__title').css('display', 'none');

            e.stopPropagation();
        });

        $('.js-item-select-control--minus').on('click', function () {

            var select = $(this).closest('.js-item-select');

            var input = select.find('.item-select__input');

            var value = select.find('.item-select__value');

            var curentVal = parseInt(input.val());

            var count = parseInt(input.val()) - 1 + ' ' + 'м';

            if (curentVal > 1) {

                count = count < 1 ? 1 : count;

                input.val(count);

                input.change();

                select.removeClass('is-close');
            } else {

                value.children('.item-select__title').removeAttr('style');

                input.css('display', 'none');

                select.removeClass('is-active');
            }

            return false;
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

        if ($('.js-accordeon').hasClass('lk__accordeon')) {

            $(this).find('.accordeon__title').on('click', function () {

                if ($(this).parent().hasClass('is-open')) {

                    $(this).find('.user-order__info').text('скрыть');
                } else {

                    $(this).find('.user-order__info').text('подробнее');
                }
            });
        }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiZXZlbnQiLCJmb290ZXIiLCJmaW5kIiwid3JhcEFsbCIsInRvZ2dsZUNsYXNzIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJvdmVyZmxvdyIsInRhcmdldCIsImNsb3Nlc3QiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwidGV4dCIsImJsb2NrIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCJzZWFyY2giLCJzZWFyY2hCdG5TaG93IiwidmFsIiwiaGVhZGVyTWFpbiIsImhlYWRlck1haW5DbG9uZSIsImhpZGUiLCJzaG93IiwibmV4dCIsInBhcmVudCIsInByZXYiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImFycm93cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzcGVlZCIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheSIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwidmFyaWFibGVXaWR0aCIsImZhZGUiLCJhc05hdkZvciIsImNlbnRlck1vZGUiLCJmb2N1c09uU2VsZWN0IiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJwYXJzZUludCIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsImNvbm5lY3QiLCJyYW5nZSIsInZhbHVlcyIsImhhbmRsZSIsInRhYnMiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJ0YWJUcmFuc2Zvcm0iLCJ0YWIiLCJ1bndyYXAiLCJ3cmFwIiwiY2hhbmdlQ29sb3IiLCJzZWxlY3QiLCJ2YWx1ZSIsImlucHV0IiwiY2hpbGRyZW4iLCJjdXJlbnRWYWwiLCJjb3VudCIsImNoYW5nZSIsImlzIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBWTs7QUFFMUJGLE1BQUVHLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBWTtBQUM3QkosVUFBRSxNQUFGLEVBQVVLLFdBQVYsQ0FBc0IsU0FBdEI7QUFDQTtBQUNBLFlBQUlDLFlBQVlOLEVBQUUsWUFBRixD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QUUvQyxZQUFJSixFQUFFLElBQUYsRUFBUStDLElBQVIsQ0FBYSxPQUFiLEVBQXNCK0YsRUFBdEIsQ0FBeUIsVUFBekIsQ0FBSixFQUEwQzs7QUFFdkM5SSxjQUFFLElBQUYsRUFBUXlDLFFBQVIsQ0FBaUIsWUFBakI7QUFFSCxTQUpBLE1BSU07O0FBRUh6QyxjQUFFLElBQUYsRUFBUUssV0FBUixDQUFvQixZQUFwQjtBQUVIO0FBRUgsS0FaRDs7QUFnQkFMLE1BQUVDLFFBQUYsRUFBWUcsRUFBWixDQUFlLE9BQWYsRUFBd0Isc0JBQXhCLEVBQWdELFlBQVc7O0FBRXZELFlBQUdKLEVBQUUsSUFBRixFQUFRMEMsUUFBUixDQUFpQixZQUFqQixDQUFILEVBQWtDOztBQUU5QjFDLGNBQUUsSUFBRixFQUFRSyxXQUFSLENBQW9CLFlBQXBCO0FBRUgsU0FKRCxNQUlLOztBQUVETCxjQUFFLElBQUYsRUFBUXlDLFFBQVIsQ0FBaUIsWUFBakI7QUFFSDtBQUVKLEtBWkQ7QUFjSCxDQXBnQ0Q7O0FBc2dDSSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyMyYzJiMmInLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm1vdXNlb3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICBtYXNrOiBcIis3ICg5OTkpIDk5OS05OS05OVwiLFxyXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XHJcbiAgICAgICAgJCgnLm1haW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgfW1haW5PZmZzZXQoKTtcclxuICAgICQod2luZG93KS5yZXNpemUobWFpbk9mZnNldCk7XHJcbiAgICBcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcclxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgODAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmICAgIFxyXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J30sIDMwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7ICAgIFxyXG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5jc3MoJ2JvdHRvbScsIDcwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1N0b3AgZHJhZ1xyXG4gICAgJChcImltZ1wiKS5vbihcImRyYWdzdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtldmVudC5wcmV2ZW50RGVmYXVsdCgpfSk7XHJcblxyXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbScpLmFkZENsYXNzKCdhY2NvcmRlb25fX2l0ZW0nKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9IYW1idXJnZXIgYnRuXHJcbiAgICAkKCcuanMtaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PT0gJycgPyAnaGlkZGVuJyA6ICcnO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93JykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgLy9Nb2JpbGUgTmF2XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucHJlcGVuZFRvKCcud3JhcHBlciAnKTtcclxuICAgICAgICAkKCcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93bjIgPSBuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gJCh0aGlzKS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrLmluc2VydEFmdGVyKG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkudGV4dCh0aXRsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgIW5hdkl0ZW1Ecm9wZG93bi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgISgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHwgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8ICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSkpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgIFxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHwgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9KTsgICAgIFxyXG5cclxuICAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXHJcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcclxuICAgICAgICB2YXIgc2VhcmNoQnRuU2hvdyA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHNlYXJjaC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93LCAuanMtc2VhcmNoJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7ICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpLmNzcygnaGVpZ2h0JywgODUpLmluc2VydEFmdGVyKCcuaGVhZGVyLW1haW4nKS5oaWRlKCk7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gJCgnLmhlYWRlcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vU2hvdyBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuICAgIH0pO1xyXG4gICAgLy9IaWRlIFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpLnByZXYoKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9idG4gZmF2b3JpdGVcclxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIFNsaWRlci5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvLyAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xyXG5cclxuICAgIC8vU2xpZGVyIE5ld1xyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLW5ldycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TbGlkZXIgQ2FyZFxyXG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5zbGljayh7XHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgIGFycm93czogZmFsc2UsXHJcblxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnLFxyXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBkb3RzOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIH1dXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5zbGljayh7XHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNixcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZCcsXHJcblxyXG4gICAgICAgIGRvdHM6IHRydWUsXHJcblxyXG4gICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcblxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB9LHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiBcInVuc2xpY2tcIlxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB9XVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIFByb21vXHJcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogdHJ1ZVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TbGlkZXIgUmVsYXRlZFxyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSx7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0se1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ2F0YWxvZy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAkKCcuanMtcHJvZHVjdC1pdGVtJykuZmluZCgnLmNvbG9yX19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcclxuXHJcbiAgICBcdGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcclxuXHJcbiAgICBcdGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgXHRpbWcuYXR0cignc3JjJywgY29sb3IpO1xyXG5cclxuICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8vQ2hhbmdlclxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICBcdFx0cmV0dXJuO1xyXG5cclxuICAgIFx0fSBlbHNlIHtcclxuXHJcbiAgICBcdFx0JCgnLmpzLWNoYW5nZXInKS5maW5kKCcuY2hhbmdlcl9faXRlbScpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICBcdFx0cmV0dXJuO1xyXG5cclxuICAgIFx0fVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX3Jlc2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIFx0bGV0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmNoYW5nZXJfX2l0ZW0nKTtcclxuXHJcbiAgICBcdGlmIChpdGVtLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpe1xyXG5cclxuICAgIFx0XHRpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHR9XHJcblxyXG4gICAgXHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICBcdHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb2xvcicpO1xyXG5cclxuICAgIFx0dmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XHJcblxyXG4gICAgXHRjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYgKCQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtLXByaWNlJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xyXG5cclxuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnZW5kJyk7XHJcblxyXG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnRQcmljZTtcclxuXHJcbiAgICAgICAgdmFyIGVuZFByaWNlO1xyXG5cclxuICAgICAgICB2YXIgYXJyUGFyYW1zO1xyXG5cclxuICAgICAgICB2YXIgc1VybDtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgIGVuZFByaWNlID0gYWxsUHJpY2VFbmQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XHJcblxyXG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcblxyXG4gICAgICAgICAgICByYW5nZToge1xyXG5cclxuICAgICAgICAgICAgICAgICdtaW4nOiBhbGxQcmljZVN0YXJ0LFxyXG5cclxuICAgICAgICAgICAgICAgICdtYXgnOiBhbGxQcmljZUVuZFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICh2YWx1ZXMsIGhhbmRsZSkge1xyXG5cclxuICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KCh2YWx1ZXNbaGFuZGxlXSkpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cclxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcdFxyXG5cclxuICAgIFx0JCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICBcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1x0XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgIFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICogQ2FyZC5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvL2NhcmQgdGFic1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykudGFicygpO1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykuZmluZCgnLnRhYl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljaygnc2V0UG9zaXRpb24nKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICBpZiAoICQoJy5qcy10YWInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YWInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhYnMpOyAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy/QotCw0LHRi1xyXG5cclxuICAgIGZ1bmN0aW9uIHRhYnMoZSkge1xyXG5cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09ICd0YWJfX3RpdGxlJykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFUYWIgICAgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiVGl0bGUgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJfX3RpdGxlJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSBpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICB9IFxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxyXG5cclxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpe1xyXG5cclxuICAgICAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy10YWInKS51bndyYXAoKS5hZGRDbGFzcygnYWNjb3JkZW9uIGFjY29yZGVvbi0tb3RoZXIganMtYWNjb3JkZW9uJykucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJykucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGUgaXMtYWN0aXZlJykud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJykucmVtb3ZlQXR0cignc3R5bGUnKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpLnBhcmVudCgpLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIxXCJdJyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCd0YWJfX2NvbnRlbnQgdGFiX19jb250ZW50LS1wcm9kdWN0Jyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBpZiAoJCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoID4gMCl7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7ICAgXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pOyBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZUNvbG9yKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIH0pLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICB9KTsgICAgICAgIFxyXG5cclxuICAgICAgICB9Y2hhbmdlQ29sb3IoKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykuZmluZCgnLml0ZW0tc2VsZWN0X19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJykuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaW5wdXQudmFsKHRleHQpO1xyXG5cclxuICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGNoYW5nZUNvbG9yKCk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0Lmhhc0NsYXNzKCdpdGVtLXNlbGVjdC0tY291bnQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpdGVtLXNlbGVjdF9faXRlbS0taGVhZGVyJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLnJlbW92ZUF0dHIoJ3N0eWxlJykudGV4dCgn0JLRi9Cx0YDQsNGC0YwnKTsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7ICAgIFxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tcGx1cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VyZW50VmFsID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpICsgMSArICcgJyArICfQvCc7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKCdzdHlsZScpLnZhbChjb3VudCk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoY3VyZW50VmFsID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LmNoYW5nZSgpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwoMSArICfQvCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdC1jb250cm9sLS1taW51cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VyZW50VmFsID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpIC0gMSArICcgJyArICfQvCc7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoY3VyZW50VmFsID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvdW50ID0gY291bnQgPCAxID8gMSA6IGNvdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbChjb3VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuY2hhbmdlKCk7ICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdC5yZW1vdmVDbGFzcygnaXMtY2xvc2UnKTsgICAgIFxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3QucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICogQ29tcG9uZW50cy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvL0FjY29yZGVvblxyXG5cclxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIFx0JCgnLmpzLWFjY29yZGVvbicpLmZpbmQoJy5hY2NvcmRlb25fX3RpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBcdCAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdpcy1vcGVuJykpe1xyXG5cclxuICAgIFx0ICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgXHQgICAgfWVsc2V7XHJcblxyXG4gICAgXHQgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICBcdCAgICB9ICAgXHJcblxyXG4gICAgXHR9KTtcclxuXHJcbiAgICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykuaGFzQ2xhc3MoJ2xrX19hY2NvcmRlb24nKSkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5hY2NvcmRlb25fX3RpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdpcy1vcGVuJykpe1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLnVzZXItb3JkZXJfX2luZm8nKS50ZXh0KCfRgdC60YDRi9GC0YwnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcudXNlci1vcmRlcl9faW5mbycpLnRleHQoJ9C/0L7QtNGA0L7QsdC90LXQtScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9jaGVja2JveFxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gnLCBmdW5jdGlvbiAoKXtcclxuXHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbiAoKXtcclxuXHJcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKXtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIEZ1bmN0aW9ucy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAiXX0=
