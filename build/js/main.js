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

            if (curentVal > 0) {

                // count = count < 1 ? 1 : count;

                input.removeAttr('style').val(count);

                input.change();
            } else {

                input.val(5 + 'м');
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

            if (curentVal > 6) {

                count = count < 1 ? 1 : count;

                input.val(count);

                input.change();

                select.removeClass('is-close');
            } else if (curentVal == 5) {

                select.addClass('is-close');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJ0ZXh0IiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiZmFkZSIsImFzTmF2Rm9yIiwiY2VudGVyTW9kZSIsImZvY3VzT25TZWxlY3QiLCJpdGVtIiwiY29sb3IiLCJpbWciLCJlYWNoIiwiY29sb3JCb3giLCJzbGlkZXIiLCJnZXRFbGVtZW50QnlJZCIsImFsbFByaWNlU3RhcnQiLCJhbGxQcmljZUVuZCIsInNwYW5zIiwic3RhcnRQcmljZSIsImVuZFByaWNlIiwiYXJyUGFyYW1zIiwic1VybCIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwidmFsdWVzIiwiaGFuZGxlIiwidGFicyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImN1cmVudFZhbCIsImNvdW50IiwiY2hhbmdlIiwiaXMiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFZOztBQUUxQkYsTUFBRUcsTUFBRixFQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFZO0FBQzdCSixVQUFFLE1BQUYsRUFBVUssV0FBVixDQUFzQixTQUF0QjtBQUNBO0FBQ0EsWUFBSUMsWUFBWU4sRUFBRSxZQUFGLENBQWhCO0FBQ0EsWUFBSU0sVUFBVUMsTUFBVixHQUFtQixDQUF2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QVIsR0FBaUJsRSxXQUFqQixDQUE2QixTQUE3QixFQUF3Q3VDLElBQXhDLENBQTZDLHFCQUE3QyxFQUFvRXBCLEdBQXBFLENBQXdFLFNBQXhFLEVBQW1GLE1BQW5GO0FBRUgsYUFKRCxNQUlLOztBQUVEeEIsa0JBQUUsSUFBRixFQUFRdUUsTUFBUixHQUFpQnZDLFFBQWpCLENBQTBCLFNBQTFCLEVBQXFDWSxJQUFyQyxDQUEwQyxxQkFBMUMsRUFBaUVULFVBQWpFLENBQTRFLE9BQTVFO0FBRUg7QUFFSixTQVpEO0FBY0E7O0FBSUQ7O0FBRUFuQyxNQUFFQyxRQUFGLEVBQVlHLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGNBQXhCLEVBQXdDLFlBQVc7O0FBRS9DLFlBQUlKLEVBQUUsSUFBRixFQUFRNEMsSUFBUixDQUFhLE9BQWIsRUFBc0IrRixFQUF0QixDQUF5QixVQUF6QixDQUFKLEVBQTBDOztBQUV2QzNJLGNBQUUsSUFBRixFQUFRZ0MsUUFBUixDQUFpQixZQUFqQjtBQUVILFNBSkEsTUFJTTs7QUFFSGhDLGNBQUUsSUFBRixFQUFRSyxXQUFSLENBQW9CLFlBQXBCO0FBRUg7QUFFSCxLQVpEOztBQWdCQUwsTUFBRUMsUUFBRixFQUFZRyxFQUFaLENBQWUsT0FBZixFQUF3QixzQkFBeEIsRUFBZ0QsWUFBVzs7QUFFdkQsWUFBR0osRUFBRSxJQUFGLEVBQVFpQyxRQUFSLENBQWlCLFlBQWpCLENBQUgsRUFBa0M7O0FBRTlCakMsY0FBRSxJQUFGLEVBQVFLLFdBQVIsQ0FBb0IsWUFBcEI7QUFFSCxTQUpELE1BSUs7O0FBRURMLGNBQUUsSUFBRixFQUFRZ0MsUUFBUixDQUFpQixZQUFqQjtBQUVIO0FBRUosS0FaRDtBQWNILENBeC9CRDs7QUEwL0JJIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgLy9HZXROaWNlU2Nyb2xsIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnV5YWtzYS9qcXVlcnkubmljZXNjcm9sbFxyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzJjMmIyYicsXHJcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aDogJzRweCcsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIubW91c2VvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuICAgIC8vIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDApIHtcclxuICAgIC8vICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAvLyAgICAgICAgIG1hc2s6IFwiKzcgKDk5OSkgOTk5LTk5LTk5XCIsXHJcbiAgICAvLyAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFpbk9mZnNldCgpIHtcclxuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICB9bWFpbk9mZnNldCgpO1xyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShtYWluT2Zmc2V0KTtcclxuICAgIFxyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxyXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCA4MDApO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXsgICAgXHJcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBpZiAoJCgnLm1haW4nKS5oYXNDbGFzcygnY2F0YWxvZycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmICAgIFxyXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J30sIDMwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9TdG9wIGRyYWdcclxuICAgICQoXCJpbWdcIikub24oXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7ZXZlbnQucHJldmVudERlZmF1bHQoKX0pO1xyXG5cclxuICAgIC8vRm9vdGVyIG1lZGlhIDw9IDQ4MCB0cmFuc2Zvcm0gYWNjb3JkZW9uXHJcbiAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICBsZXQgZm9vdGVyID0gJCgnLmpzLWZvb3RlcicpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW0nKS5hZGRDbGFzcygnYWNjb3JkZW9uX19pdGVtJykud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT09ICcnID8gJ2hpZGRlbicgOiAnJztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICAvL1doZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaGFtYnVyZ2VyLCAuanMtbmF2LW1haW4sIC5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoJy5qcy1oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIC8vTW9iaWxlIE5hdlxyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnByZXBlbmRUbygnLndyYXBwZXIgJyk7XHJcbiAgICAgICAgJCgnLmpzLW1haW4tbmF2LWxpbmstLWZvcndhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBtYWluRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9fZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAgICAgICBsZXQgYmxvY2sgPSAkKCc8bGkgY2xhc3M9XCJuYXYtZHJvcGRvd25fX3RpdGxlIG5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXBcIj4nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBibG9jay5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpLnRleHQodGl0bGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICFuYXZJdGVtRHJvcGRvd24uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTsgICBcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcCcpLnJlbW92ZSgpOyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiBuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLnJlbW92ZUF0dHIoJ3N0eWxlJyk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7ICAgICBcclxuXHJcbiAgICAgICAgIC8vTW9iaWxlIFNlYXJjaFxyXG4gICAgICAgIHZhciBzZWFyY2ggPSAkKCcuanMtc2VhcmNoJyk7XHJcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xyXG5cclxuICAgICAgICAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xyXG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pOyAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBoZWFkZXJNYWluID0gJCgnLmhlYWRlci1tYWluJyk7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW5DbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItbWFpbi0tY2xvbmVcIj4nKS5jc3MoJ2hlaWdodCcsIDg1KS5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJykuaGlkZSgpO1xyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49ICQoJy5oZWFkZXJfX3RvcC1saW5lJykub3V0ZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW4ucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1Nob3cgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcykubmV4dCgpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcbiAgICB9KTtcclxuICAgIC8vSGlkZSBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wcmV2KCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYnRuIGZhdm9yaXRlXHJcbiAgICAkKCcuanMtYnV0dG9uLWljb24tLWZhdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgKiBTbGlkZXIuanNcclxuICAgICovXHJcblxyXG4gICAgLy8gLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cclxuXHJcbiAgICAvL1NsaWRlciBOZXdcclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tbmV3JykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tcHJldicsXHJcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzMjEsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfV1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIENhcmRcclxuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykuc2xpY2soe1xyXG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG5cclxuICAgICAgICBmYWRlOiB0cnVlLFxyXG5cclxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JyxcclxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW3tcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgZG90czogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB9XVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2Jykuc2xpY2soe1xyXG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDYsXHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQnLFxyXG5cclxuICAgICAgICBkb3RzOiB0cnVlLFxyXG5cclxuICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG5cclxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxyXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgfSx7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcblxyXG4gICAgICAgICAgICBzZXR0aW5nczogXCJ1bnNsaWNrXCJcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgfV1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL1NsaWRlciBQcm9tb1xyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tbmV4dCcsXHJcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tcHJldicsXHJcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWVcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSx7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0se1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfV1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAqIENhdGFsb2cuanNcclxuICAgICovXHJcblxyXG4gICAgJCgnLmpzLXByb2R1Y3QtaXRlbScpLmZpbmQoJy5jb2xvcl9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBcdGxldCBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtcHJvZHVjdC1pdGVtJyk7XHJcblxyXG4gICAgXHRsZXQgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG4gICAgXHRsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgIFx0aW1nLmF0dHIoJ3NyYycsIGNvbG9yKTtcclxuXHJcbiAgICBcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL0NoYW5nZXJcclxuXHJcbiAgICAkKCcuanMtY2hhbmdlcicpLmZpbmQoJy5jaGFuZ2VyX19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgXHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgXHRcdHJldHVybjtcclxuXHJcbiAgICBcdH0gZWxzZSB7XHJcblxyXG4gICAgXHRcdCQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIFx0XHQkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHRcdHJldHVybjtcclxuXHJcbiAgICBcdH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAkKCcuanMtY2hhbmdlcicpLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBcdGxldCBpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5jaGFuZ2VyX19pdGVtJyk7XHJcblxyXG4gICAgXHRpZiAoaXRlbS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKXtcclxuXHJcbiAgICBcdFx0aXRlbS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIFx0fVxyXG5cclxuICAgIFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fc3ViaXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgXHR2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29sb3InKTtcclxuXHJcbiAgICBcdHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2ZpbHRlci1jb2xvcicpO1xyXG5cclxuICAgIFx0Y29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG5cclxuICAgIFx0JCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKS5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGlmICgkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbS1wcmljZScpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgdmFyIGFsbFByaWNlU3RhcnQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnc3RhcnQnKTtcclxuXHJcbiAgICAgICAgdmFyIGFsbFByaWNlRW5kID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xyXG5cclxuICAgICAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0UHJpY2U7XHJcblxyXG4gICAgICAgIHZhciBlbmRQcmljZTtcclxuXHJcbiAgICAgICAgdmFyIGFyclBhcmFtcztcclxuXHJcbiAgICAgICAgdmFyIHNVcmw7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIGlmIChzcGFuc1swXS50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBhbGxQcmljZVN0YXJ0O1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzBdLnRleHQoKSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICBpZiAoc3BhbnNbMV0udGV4dCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZW5kUHJpY2UgPSBwYXJzZUludChzcGFuc1sxXS50ZXh0KCkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xyXG5cclxuICAgICAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAnbWluJzogYWxsUHJpY2VTdGFydCxcclxuXHJcbiAgICAgICAgICAgICAgICAnbWF4JzogYWxsUHJpY2VFbmRcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNsaWRlci5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAodmFsdWVzLCBoYW5kbGUpIHtcclxuXHJcbiAgICAgICAgICAgIHNwYW5zW2hhbmRsZV0udGV4dCgodmFsdWVzW2hhbmRsZV0pKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vQ2F0YWxvZyBGaWx0ZXIgQWN0aW9uXHJcblxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHRcclxuXHJcbiAgICBcdCQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgXHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcdFxyXG5cclxuICAgIFx0JCgnLmpzLWNhdGFsb2ctZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICBcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIENhcmQuanNcclxuICAgICovXHJcblxyXG4gICAgLy9jYXJkIHRhYnNcclxuXHJcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpLnRhYnMoKTtcclxuXHJcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpLmZpbmQoJy50YWJfX3RpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKS5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soJ3NldFBvc2l0aW9uJyk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYgKCAkKCcuanMtdGFiJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFiJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0YWJzKTsgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8v0KLQsNCx0YtcclxuXHJcbiAgICBmdW5jdGlvbiB0YWJzKGUpIHtcclxuXHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAndGFiX190aXRsZScpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhVGFiICAgID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0YWJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fY29udGVudCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhYlRpdGxlICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX190aXRsZScpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJUaXRsZS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIHRhYlRpdGxlW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ICAgXHJcblxyXG4gICAgfSBcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL3RhYnMgLS0tPiBhY2NvcmRlb25cclxuXHJcbiAgICBmdW5jdGlvbiB0YWJUcmFuc2Zvcm0oKXtcclxuXHJcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtdGFiJykudW53cmFwKCkuYWRkQ2xhc3MoJ2FjY29yZGVvbiBhY2NvcmRlb24tLW90aGVyIGpzLWFjY29yZGVvbicpLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlcycpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpLndyYXAoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb25fX2l0ZW1cIj4nKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMFwiXScpLnJlbW92ZUF0dHIoJ3N0eWxlJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjBcIl0nKS5wYXJlbnQoKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKS5yZW1vdmVDbGFzcygndGFiX19jb250ZW50IHRhYl9fY29udGVudC0tcHJvZHVjdCcpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG5cclxuICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYgKCQoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCA+IDApe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTsgXHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VDb2xvcigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICB9KS5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgfSk7ICAgICAgICBcclxuXHJcbiAgICAgICAgfWNoYW5nZUNvbG9yKCk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpLnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb2xvciA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGlucHV0LnZhbCh0ZXh0KTtcclxuXHJcbiAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX2NvbG9yJykuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VDb2xvcigpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdC5oYXNDbGFzcygnaXRlbS1zZWxlY3QtLWNvdW50JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXRlbS1zZWxlY3RfX2l0ZW0tLWhlYWRlcicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5yZW1vdmVBdHRyKCdzdHlsZScpLnRleHQoJ9CS0YvQsdGA0LDRgtGMJyk7IFxyXG5cclxuICAgICAgICAgICAgICAgICAgIGlucHV0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pOyAgICBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLXBsdXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cmVudFZhbCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKSArIDEgKyAnICcgKyAn0LwnO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKGN1cmVudFZhbCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb3VudCA9IGNvdW50IDwgMSA/IDEgOiBjb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKCdzdHlsZScpLnZhbChjb3VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuY2hhbmdlKCk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCg1ICsgJ9C8Jyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLW1pbnVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJlbnRWYWwgPSBwYXJzZUludChpbnB1dC52YWwoKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY291bnQgPSBwYXJzZUludChpbnB1dC52YWwoKSkgLSAxICsgJyAnICsgJ9C8JztcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJlbnRWYWwgPiA2KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY291bnQgPSBjb3VudCA8IDEgPyAxIDogY291bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKGNvdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jaGFuZ2UoKTsgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LnJlbW92ZUNsYXNzKCdpcy1jbG9zZScpOyAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoY3VyZW50VmFsID09IDUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3QuYWRkQ2xhc3MoJ2lzLWNsb3NlJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgKiBDb21wb25lbnRzLmpzXHJcbiAgICAqL1xyXG5cclxuICAgIC8vQWNjb3JkZW9uXHJcblxyXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgXHQkKCcuanMtYWNjb3JkZW9uJykuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cclxuICAgIFx0ICAgIGlmKCQodGhpcykucGFyZW50KCkuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XHJcblxyXG4gICAgXHQgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICBcdCAgICB9ZWxzZXtcclxuXHJcbiAgICBcdCAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnaXMtb3BlbicpLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgIFx0ICAgIH0gICBcclxuXHJcbiAgICBcdH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL2NoZWNrYm94XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uICgpe1xyXG5cclxuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbnB1dCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uICgpe1xyXG5cclxuICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpe1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4gICAgLypcclxuICAgICogRnVuY3Rpb25zLmpzXHJcbiAgICAqL1xyXG5cclxuICAgICJdfQ==
