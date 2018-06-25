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
    if ($('.js-phone-mask').length > 0 || $('.js-born-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: "+7 (999) 999-99-99",
            clearIncomplete: true
        });
        $('.js-born-mask').inputmask({
            mask: "99-99-9999",
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

                dots: true,

                fade: false

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

    /*
    *Lk.js
    */

    //Sticky Block https://github.com/abouolia/sticky-sidebar

    if ($('.js-stiky-block').length > 0 && $(window).width() > 768) {

        var sidebar = new StickySidebar('.js-stiky-block', {

            topSpacing: 135,

            bottomSpacing: 10,

            containerSelector: '.stiky-content',

            innerWrapperSelector: '.stiky-block__inner'

        });
    }
});

/*
* Functions.js
*/

//PushUp

function pushUp(text) {

    var text = text || 'Товар добавлен в корзину';

    var pushContainer = $('<div>').addClass('bz-pushUp');

    var pushUpClose = $('<i class="fal fa-times"></i>').addClass('bz-pushUp__close js-pushUp--close');

    pushContainer.appendTo($('body'));

    pushContainer.text(text);

    pushUpClose.appendTo(pushContainer);

    raf(function () {

        pushContainer.addClass('is-active');
    });

    setTimeout(function () {

        pushContainer.removeClass('is-active');
    }, 3500);

    setTimeout(function () {

        pushContainer.remove();
    }, 4000);

    $(document).on('click', '.js-pushUp--close', function () {

        pushContainer.removeClass('is-active');

        setTimeout(function () {

            pushContainer.remove();
        }, 300);
    });
}

//RequestAnimationFrame

function raf(fn) {

    window.requestAnimationFrame(function () {

        window.requestAnimationFrame(function () {

            fn();
        });
    });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiZXZlbnQiLCJmb290ZXIiLCJmaW5kIiwid3JhcEFsbCIsInRvZ2dsZUNsYXNzIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJvdmVyZmxvdyIsInRhcmdldCIsImNsb3Nlc3QiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwidGV4dCIsImJsb2NrIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCJzZWFyY2giLCJzZWFyY2hCdG5TaG93IiwidmFsIiwiaGVhZGVyTWFpbiIsImhlYWRlck1haW5DbG9uZSIsImhpZGUiLCJzaG93IiwibmV4dCIsInBhcmVudCIsInByZXYiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImFycm93cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzcGVlZCIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheSIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwidmFyaWFibGVXaWR0aCIsImZhZGUiLCJhc05hdkZvciIsImNlbnRlck1vZGUiLCJmb2N1c09uU2VsZWN0IiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJwYXJzZUludCIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsImNvbm5lY3QiLCJyYW5nZSIsInZhbHVlcyIsImhhbmRsZSIsInRhYnMiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJ0YWJUcmFuc2Zvcm0iLCJ0YWIiLCJ1bndyYXAiLCJ3cmFwIiwiY2hhbmdlQ29sb3IiLCJzZWxlY3QiLCJ2YWx1ZSIsImlucHV0IiwiY2hpbGRyZW4iLCJjdXJlbnRWYWwiLCJjb3VudCIsImNoYW5nZSIsImlzIiwic2lkZWJhciIsIlN0aWNreVNpZGViYXIiLCJ0b3BTcGFjaW5nIiwiYm90dG9tU3BhY2luZyIsImNvbnRhaW5lclNlbGVjdG9yIiwiaW5uZXJXcmFwcGVyU2VsZWN0b3IiLCJwdXNoVXAiLCJwdXNoQ29udGFpbmVyIiwicHVzaFVwQ2xvc2UiLCJhcHBlbmRUbyIsInJhZiIsInNldFRpbWVvdXQiLCJmbiIsInJlcXVl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ekosZUFBT3lKLHFCQUFQLENBQTZCLFlBQVU7O0FBRW5DRDtBQUVILFNBSkQ7QUFNSCxLQVJEO0FBVUgiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKHdpbmRvdykub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcclxuICAgICAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXHJcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcclxuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcclxuICAgICAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmVyZ2U6IDUwMCxcclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCB8fCAkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgbWFzazogXCIrNyAoOTk5KSA5OTktOTktOTlcIixcclxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgbWFzazogXCI5OS05OS05OTk5XCIsXHJcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFpbk9mZnNldCgpIHtcclxuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICB9bWFpbk9mZnNldCgpO1xyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShtYWluT2Zmc2V0KTtcclxuICAgIFxyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxyXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCA4MDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWYgICAgXHJcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnfSwgMzAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXsgICAgXHJcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBpZiAoJCgnLm1haW4nKS5oYXNDbGFzcygnY2F0YWxvZycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vU3RvcCBkcmFnXHJcbiAgICAkKFwiaW1nXCIpLm9uKFwiZHJhZ3N0YXJ0XCIsIGZ1bmN0aW9uIChldmVudCkge2V2ZW50LnByZXZlbnREZWZhdWx0KCl9KTtcclxuXHJcbiAgICAvL0Zvb3RlciBtZWRpYSA8PSA0ODAgdHJhbnNmb3JtIGFjY29yZGVvblxyXG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgbGV0IGZvb3RlciA9ICQoJy5qcy1mb290ZXInKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb24ganMtYWNjb3JkZW9uXCI+Jyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fY29udGVudCcpLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0hhbWJ1cmdlciBidG5cclxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID09PSAnJyA/ICdoaWRkZW4nIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAgLy9XaGVuIGNsaWNrIG91dHNpZGVcclxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWhhbWJ1cmdlciwgLmpzLW5hdi1tYWluLCAuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKCcuanMtaGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcbiAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAvL01vYmlsZSBOYXZcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xyXG4gICAgICAgICQoJy5qcy1tYWluLW5hdi1saW5rLS1mb3J3YXJkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duMiA9IG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAkKHRoaXMpLnRleHQoKTtcclxuICAgICAgICAgICAgbGV0IGJsb2NrID0gJCgnPGxpIGNsYXNzPVwibmF2LWRyb3Bkb3duX190aXRsZSBuYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wXCI+Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgYmxvY2suaW5zZXJ0QWZ0ZXIobmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKS50ZXh0KHRpdGxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fCAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgIW5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHwgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7ICAgXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXAnKS5yZW1vdmUoKTsgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fCAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0pOyAgICAgXHJcblxyXG4gICAgICAgICAvL01vYmlsZSBTZWFyY2hcclxuICAgICAgICB2YXIgc2VhcmNoID0gJCgnLmpzLXNlYXJjaCcpO1xyXG4gICAgICAgIHZhciBzZWFyY2hCdG5TaG93ID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaC5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgc2VhcmNoLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3csIC5qcy1zZWFyY2gnKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcclxuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTsgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbiA9ICQoJy5oZWFkZXItbWFpbicpO1xyXG4gICAgICAgIGxldCBoZWFkZXJNYWluQ2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLW1haW4tLWNsb25lXCI+JykuY3NzKCdoZWlnaHQnLCA4NSkuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXItbWFpbicpLmhpZGUoKTtcclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW4uYWRkQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLnJlbW92ZUNsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9TaG93IFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpLm5leHQoKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgfSk7XHJcbiAgICAvL0hpZGUgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcykucHJldigpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2J0biBmYXZvcml0ZVxyXG4gICAgJCgnLmpzLWJ1dHRvbi1pY29uLS1mYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICogU2xpZGVyLmpzXHJcbiAgICAqL1xyXG5cclxuICAgIC8vIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXHJcblxyXG4gICAgLy9TbGlkZXIgTmV3XHJcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG5cclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW3tcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzIxLFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH1dXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL1NsaWRlciBDYXJkXHJcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgZmFkZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicsXHJcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcblxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgfV1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA2LFxyXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcclxuXHJcbiAgICAgICAgZG90czogdHJ1ZSxcclxuXHJcbiAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW3tcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcblxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIH0se1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3M6IFwidW5zbGlja1wiXHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIH1dXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TbGlkZXIgUHJvbW9cclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXByb21vJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLW5leHQnLFxyXG5cclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLXByZXYnLFxyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL1NsaWRlciBSZWxhdGVkXHJcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogOCxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW3tcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNlxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0se1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSx7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1dXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgKiBDYXRhbG9nLmpzXHJcbiAgICAqL1xyXG5cclxuICAgICQoJy5qcy1wcm9kdWN0LWl0ZW0nKS5maW5kKCcuY29sb3JfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgXHRsZXQgaXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXByb2R1Y3QtaXRlbScpO1xyXG5cclxuICAgIFx0bGV0IGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xyXG5cclxuICAgIFx0bGV0IGltZyA9IGl0ZW0uZmluZCgnLnByb2R1Y3QtaXRlbV9faW1hZ2UnKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICBcdGltZy5hdHRyKCdzcmMnLCBjb2xvcik7XHJcblxyXG4gICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9DaGFuZ2VyXHJcblxyXG4gICAgJCgnLmpzLWNoYW5nZXInKS5maW5kKCcuY2hhbmdlcl9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgIFx0XHRyZXR1cm47XHJcblxyXG4gICAgXHR9IGVsc2Uge1xyXG5cclxuICAgIFx0XHQkKCcuanMtY2hhbmdlcicpLmZpbmQoJy5jaGFuZ2VyX19pdGVtJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICBcdFx0JCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIFx0XHRyZXR1cm47XHJcblxyXG4gICAgXHR9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgJCgnLmpzLWNoYW5nZXInKS5maW5kKCcuY2hhbmdlcl9fcmVzZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgXHRsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xyXG5cclxuICAgIFx0aWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSl7XHJcblxyXG4gICAgXHRcdGl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICBcdH1cclxuXHJcbiAgICBcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX3N1Yml0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIFx0dmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XHJcblxyXG4gICAgXHR2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdmaWx0ZXItY29sb3InKTtcclxuXHJcbiAgICBcdGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuXHJcbiAgICBcdCQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJykuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2pzLXNjcm9sbCcpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBpZiAoJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0tcHJpY2UnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIHZhciBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIHZhciBhbGxQcmljZVN0YXJ0ID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ3N0YXJ0Jyk7XHJcblxyXG4gICAgICAgIHZhciBhbGxQcmljZUVuZCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdlbmQnKTtcclxuXHJcbiAgICAgICAgdmFyIHNwYW5zID0gWyQoJyNqc1ByaWNlU3RhcnQnKSwgJCgnI2pzUHJpY2VFbmQnKV07XHJcblxyXG4gICAgICAgIHZhciBzdGFydFByaWNlO1xyXG5cclxuICAgICAgICB2YXIgZW5kUHJpY2U7XHJcblxyXG4gICAgICAgIHZhciBhcnJQYXJhbXM7XHJcblxyXG4gICAgICAgIHZhciBzVXJsO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICBpZiAoc3BhbnNbMF0udGV4dCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICBzdGFydFByaWNlID0gYWxsUHJpY2VTdGFydDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBwYXJzZUludChzcGFuc1swXS50ZXh0KCkpXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgaWYgKHNwYW5zWzFdLnRleHQoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgZW5kUHJpY2UgPSBhbGxQcmljZUVuZDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGVuZFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMV0udGV4dCgpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0OiBbc3RhcnRQcmljZSwgZW5kUHJpY2VdLFxyXG5cclxuICAgICAgICAgICAgY29ubmVjdDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgJ21pbic6IGFsbFByaWNlU3RhcnQsXHJcblxyXG4gICAgICAgICAgICAgICAgJ21heCc6IGFsbFByaWNlRW5kXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24gKHZhbHVlcywgaGFuZGxlKSB7XHJcblxyXG4gICAgICAgICAgICBzcGFuc1toYW5kbGVdLnRleHQoKHZhbHVlc1toYW5kbGVdKSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL0NhdGFsb2cgRmlsdGVyIEFjdGlvblxyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1x0XHJcblxyXG4gICAgXHQkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgIFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHRcclxuXHJcbiAgICBcdCQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgXHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgKiBDYXJkLmpzXHJcbiAgICAqL1xyXG5cclxuICAgIC8vY2FyZCB0YWJzXHJcblxyXG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKS50YWJzKCk7XHJcblxyXG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKS5maW5kKCcudGFiX190aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJykuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIGlmICggJCgnLmpzLXRhYicpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGFicyk7ICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL9Ci0LDQsdGLXHJcblxyXG4gICAgZnVuY3Rpb24gdGFicyhlKSB7XHJcblxyXG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT0gJ3RhYl9fdGl0bGUnKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YVRhYiAgICA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJfX2NvbnRlbnQnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0YWJUaXRsZSAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fdGl0bGUnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhVGFiID09IGkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSAgIFxyXG5cclxuICAgIH0gXHJcblxyXG4gICAgXHJcblxyXG4gICAgLy90YWJzIC0tLT4gYWNjb3JkZW9uXHJcblxyXG4gICAgZnVuY3Rpb24gdGFiVHJhbnNmb3JtKCl7XHJcblxyXG4gICAgICAgIHZhciB0YWIgPSAkKCcuanMtdGFiLS10cmFuc2Zvcm0nKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLXRhYicpLnVud3JhcCgpLmFkZENsYXNzKCdhY2NvcmRlb24gYWNjb3JkZW9uLS1vdGhlciBqcy1hY2NvcmRlb24nKS5yZW1vdmVDbGFzcygndGFiX190aXRsZXMnKTtcclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX3RpdGxlJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKS5yZW1vdmVDbGFzcygndGFiX190aXRsZSBpcy1hY3RpdmUnKS53cmFwKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uX19pdGVtXCI+Jyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKS5yZW1vdmVBdHRyKCdzdHlsZScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIwXCJdJykucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMVwiXScpLmNzcygnZGlzcGxheScsICdub25lJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JykucmVtb3ZlQ2xhc3MoJ3RhYl9fY29udGVudCB0YWJfX2NvbnRlbnQtLXByb2R1Y3QnKTtcclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnRlcycpLnJlbW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuXHJcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGlmICgkKCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGggPiAwKXtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTsgICBcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7IFxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlQ29sb3IoKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgfSkuZmluZCgnLml0ZW0tc2VsZWN0X19pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIH0pOyAgICAgICAgXHJcblxyXG4gICAgICAgIH1jaGFuZ2VDb2xvcigpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX2lucHV0Jyk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpbnB1dC52YWwodGV4dCk7XHJcblxyXG4gICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X19jb2xvcicpLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJywgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlQ29sb3IoKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3QuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0LS1jb3VudCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0X19pdGVtLS1oZWFkZXInKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykucmVtb3ZlQXR0cignc3R5bGUnKS50ZXh0KCfQktGL0LHRgNCw0YLRjCcpOyBcclxuXHJcbiAgICAgICAgICAgICAgICAgICBpbnB1dC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTsgICAgXHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdC1jb250cm9sLS1wbHVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJlbnRWYWwgPSBwYXJzZUludChpbnB1dC52YWwoKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY291bnQgPSBwYXJzZUludChpbnB1dC52YWwoKSkgKyAxICsgJyAnICsgJ9C8JztcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJykudmFsKGNvdW50KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJlbnRWYWwgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuY2hhbmdlKCk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCgxICsgJ9C8Jyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLW1pbnVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJlbnRWYWwgPSBwYXJzZUludChpbnB1dC52YWwoKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY291bnQgPSBwYXJzZUludChpbnB1dC52YWwoKSkgLSAxICsgJyAnICsgJ9C8JztcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJlbnRWYWwgPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY291bnQgPSBjb3VudCA8IDEgPyAxIDogY291bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKGNvdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jaGFuZ2UoKTsgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LnJlbW92ZUNsYXNzKCdpcy1jbG9zZScpOyAgICAgXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgKiBDb21wb25lbnRzLmpzXHJcbiAgICAqL1xyXG5cclxuICAgIC8vQWNjb3JkZW9uXHJcblxyXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgXHQkKCcuanMtYWNjb3JkZW9uJykuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cclxuICAgIFx0ICAgIGlmKCQodGhpcykucGFyZW50KCkuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XHJcblxyXG4gICAgXHQgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICBcdCAgICB9ZWxzZXtcclxuXHJcbiAgICBcdCAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnaXMtb3BlbicpLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgIFx0ICAgIH0gICBcclxuXHJcbiAgICBcdH0pO1xyXG5cclxuICAgICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5oYXNDbGFzcygnbGtfX2FjY29yZGVvbicpKSB7XHJcblxyXG4gICAgICAgICQodGhpcykuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKCQodGhpcykucGFyZW50KCkuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcudXNlci1vcmRlcl9faW5mbycpLnRleHQoJ9GB0LrRgNGL0YLRjCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJykudGV4dCgn0L/QvtC00YDQvtCx0L3QtdC1Jyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL2NoZWNrYm94XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uICgpe1xyXG5cclxuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbnB1dCcpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uICgpe1xyXG5cclxuICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpe1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqTGsuanNcclxuICAgICovXHJcblxyXG4gICAgLy9TdGlja3kgQmxvY2sgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXHJcblxyXG4gICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5LWJsb2NrJywge1xyXG5cclxuICAgICAgICAgICAgdG9wU3BhY2luZzogMTM1LFxyXG5cclxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXHJcblxyXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcclxuXHJcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWJsb2NrX19pbm5lcidcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4gICAgLypcclxuICAgICogRnVuY3Rpb25zLmpzXHJcbiAgICAqL1xyXG5cclxuICAgIC8vUHVzaFVwXHJcblxyXG4gICAgZnVuY3Rpb24gcHVzaFVwKHRleHQpe1xyXG5cclxuICAgICAgICB2YXIgdGV4dCA9IHRleHQgfHwgJ9Ci0L7QstCw0YAg0LTQvtCx0LDQstC70LXQvSDQsiDQutC+0YDQt9C40L3Rgyc7XHJcblxyXG4gICAgICAgIHZhciBwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnYnotcHVzaFVwJyk7XHJcblxyXG4gICAgICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKCdiei1wdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnKTtcclxuXHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xyXG5cclxuICAgICAgICBwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XHJcblxyXG4gICAgICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcmFmKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICB9LCAzNTAwKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgfSwgNDAwMCk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICBcdCAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgXHQgICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgXHQgICAgfSwgMzAwKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcblxyXG4gICAgZnVuY3Rpb24gcmFmKGZuKXtcclxuXHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgIGZuKCk7XHJcblxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSJdfQ==
