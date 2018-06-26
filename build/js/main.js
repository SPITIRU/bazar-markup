'use strict';

$(document).ready(function () {
    $(window).on('load', function () {
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
            mask: '+7 (999) 999-99-99',
            clearIncomplete: true
        });
        $('.js-born-mask').inputmask({
            mask: '99-99-9999',
            clearIncomplete: true
        });
    }

    function mainOffset() {
        $('.main').css('padding-top', $('.header').outerHeight());
    }
    mainOffset();
    $(window).resize(mainOffset);

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function () {
        var elementClick = $(this).attr('href');
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
    $('img').on('dragstart', function (event) {
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

        searchBtnShow.on('click', function () {
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

    if ($('.js-bz-slider--card').length > 0 && $('.js-bz-slider--card-nav').length > 0) {

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

                settings: 'unslick'

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

                min: allPriceStart,

                max: allPriceEnd

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

        if (target.className === 'tab__title') {

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiZXZlbnQiLCJmb290ZXIiLCJmaW5kIiwid3JhcEFsbCIsInRvZ2dsZUNsYXNzIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJvdmVyZmxvdyIsInRhcmdldCIsImNsb3Nlc3QiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwidGV4dCIsImJsb2NrIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCJzZWFyY2giLCJzZWFyY2hCdG5TaG93IiwidmFsIiwiaGVhZGVyTWFpbiIsImhlYWRlck1haW5DbG9uZSIsImhpZGUiLCJzaG93IiwibmV4dCIsInBhcmVudCIsInByZXYiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImFycm93cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzcGVlZCIsImF1dG9wbGF5U3BlZWQiLCJhdXRvcGxheSIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwidmFyaWFibGVXaWR0aCIsImZhZGUiLCJhc05hdkZvciIsImNlbnRlck1vZGUiLCJmb2N1c09uU2VsZWN0IiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwidGFicyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImN1cmVudFZhbCIsImNvdW50IiwiY2hhbmdlIiwiaXMiLCJzaWRlYmFyIiwiU3RpY2t5U2lkZWJhciIsInRvcFNwYWNpbmciLCJib3R0b21TcGFjaW5nIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpbm5lcldyYXBwZXJTZWxlY3RvciIsInB1c2hVcCIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsImFwcGVuZFRvIiwicmFmIiwic2V0VGltZW91dCIsImZuIiwicmVxdWVzdEFuaW1h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QXNCOztBQUVwQixRQUFJQSxPQUFPQSxRQUFRLDBCQUFuQjs7QUFFQSxRQUFJd0YsZ0JBQWdCdEosRUFBRSxPQUFGLEVBQVd5QyxRQUFYLENBQW9CLFdBQXBCLENBQXBCOztBQUVBLFFBQUk4RyxjQUFjdkosRUFBRSw4QkFBRixFQUFrQ3lDLFFBQWxDLENBRWhCLG1DQUZnQixDQUFsQjs7QUFNQTZHLGtCQUFjRSxRQUFkLENBQXVCeEosRUFBRSxNQUFGLENBQXZCOztBQUVBc0osa0JBQWN4RixJQUFkLENBQW1CQSxJQUFuQjs7QUFFQXlGLGdCQUFZQyxRQUFaLENBQXFCRixhQUFyQjs7QUFJQUcsUUFBSSxZQUFXOztBQUViSCxzQkFBYzdHLFFBQWQsQ0FBdUIsV0FBdkI7QUFFRCxLQUpEOztBQVFBaUgsZUFBVyxZQUFXOztBQUVwQkosc0JBQWNqSixXQUFkLENBQTBCLFdBQTFCO0FBRUQsS0FKRCxFQUlHLElBSkg7O0FBUUFxSixlQUFXLFlBQVc7O0FBRXBCSixzQkFBY3JGLE1BQWQ7QUFFRCxLQUpELEVBSUcsSUFKSDs7QUFRQWpFLE1BQUVDLFFBQUYsRUFBWUcsRUFBWixDQUFlLE9BQWYsRUFBd0IsbUJBQXhCLEVBQTZDLFlBQVc7O0FBRXREa0osc0JBQWNqSixXQUFkLENBQTBCLFdBQTFCOztBQUVBcUosbUJBQVcsWUFBVzs7QUFFcEJKLDBCQUFjckYsTUFBZDtBQUVELFNBSkQsRUFJRyxHQUpIO0FBTUQsS0FWRDtBQVlEOztBQUlEOztBQUVBLFNBQVN3RixHQUFULENBQWFFLEVBQWIsRUFBaUI7O0FBRWZ4SixXQUFPeUoscUJBQVAsQ0FBNkIsWUFBVzs7QUFFdEN6SixlQUFPeUoscUJBQVAsQ0FBNkIsWUFBVzs7QUFFdENEO0FBRUQsU0FKRDtBQU1ELEtBUkQ7QUFVRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcclxuXHJcbiAgICAgICAgLy9HZXROaWNlU2Nyb2xsIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnV5YWtzYS9qcXVlcnkubmljZXNjcm9sbFxyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzJjMmIyYicsXHJcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aDogJzRweCcsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIubW91c2VvdmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCB8fCAkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXHJcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICBtYXNrOiAnOTktOTktOTk5OScsXHJcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XHJcbiAgICAgICAgJCgnLm1haW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgfVxyXG4gICAgbWFpbk9mZnNldCgpO1xyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShtYWluT2Zmc2V0KTtcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcclxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDgwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxyXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCcgfSwgMzAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBpZiAoJCgnLm1haW4nKS5oYXNDbGFzcygnY2F0YWxvZycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vU3RvcCBkcmFnXHJcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICBsZXQgZm9vdGVyID0gJCgnLmpzLWZvb3RlcicpO1xyXG4gICAgICAgIGZvb3RlclxyXG4gICAgICAgICAgICAuZmluZCgnLmZvb3Rlci1pdGVtJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX2l0ZW0nKVxyXG4gICAgICAgICAgICAud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcclxuICAgICAgICBmb290ZXJcclxuICAgICAgICAgICAgLmZpbmQoJy5mb290ZXItaXRlbV9fY29udGVudCcpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPVxyXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT09ICcnID8gJ2hpZGRlbicgOiAnJztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxyXG4gICAgICAgICAgICAgICAgJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93J1xyXG4gICAgICAgICAgICApLmxlbmd0aFxyXG4gICAgICAgIClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICQoJy5qcy1oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAvL01vYmlsZSBOYXZcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xyXG4gICAgICAgICQoJy5qcy1tYWluLW5hdi1saW5rLS1mb3J3YXJkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duMiA9IG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAkKHRoaXMpLnRleHQoKTtcclxuICAgICAgICAgICAgbGV0IGJsb2NrID0gJChcclxuICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJuYXYtZHJvcGRvd25fX3RpdGxlIG5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXBcIj4nXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAhbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcclxuICAgICAgICAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBibG9ja1xyXG4gICAgICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQodGl0bGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcclxuICAgICAgICAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICEoXHJcbiAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxyXG4gICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxyXG4gICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxyXG4gICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXHJcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcclxuICAgICAgICB2YXIgc2VhcmNoQnRuU2hvdyA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jyk7XHJcblxyXG4gICAgICAgIHNlYXJjaEJ0blNob3cub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcclxuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpXHJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIDg1KVxyXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXItbWFpbicpXHJcbiAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gJCgnLmhlYWRlcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vU2hvdyBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuICAgIH0pO1xyXG4gICAgLy9IaWRlIFBhc3N3b3JkXHJcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxyXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9idG4gZmF2b3JpdGVcclxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIFNsaWRlci5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvLyAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xyXG5cclxuICAgIC8vU2xpZGVyIE5ld1xyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLW5ldycpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzMjEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIENhcmRcclxuXHJcbiAgICBpZiAoXHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5sZW5ndGggPiAwICYmXHJcblxyXG4gICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLmxlbmd0aCA+IDBcclxuXHJcbiAgICApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIGZhZGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JyxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWRlOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDYsXHJcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZCcsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcblxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiAndW5zbGljaydcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBdXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL1NsaWRlciBQcm9tb1xyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tbmV4dCcsXHJcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tcHJldicsXHJcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWVcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBdXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvKlxyXG4gICAgKiBDYXRhbG9nLmpzXHJcbiAgICAqL1xyXG5cclxuICAgICQoJy5qcy1wcm9kdWN0LWl0ZW0nKVxyXG5cclxuICAgICAgICAuZmluZCgnLmNvbG9yX19pdGVtJylcclxuXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtcHJvZHVjdC1pdGVtJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaW1nLmF0dHIoJ3NyYycsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9DaGFuZ2VyXHJcblxyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxyXG5cclxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxyXG5cclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2hhbmdlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jaGFuZ2VyJylcclxuXHJcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpXHJcblxyXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcclxuXHJcbiAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fc3ViaXRlbScpXHJcblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdmaWx0ZXItY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG5cclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGlmICgkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbS1wcmljZScpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgdmFyIGFsbFByaWNlU3RhcnQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnc3RhcnQnKTtcclxuXHJcbiAgICAgICAgdmFyIGFsbFByaWNlRW5kID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xyXG5cclxuICAgICAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0UHJpY2U7XHJcblxyXG4gICAgICAgIHZhciBlbmRQcmljZTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICBpZiAoc3BhbnNbMV0udGV4dCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZW5kUHJpY2UgPSBwYXJzZUludChzcGFuc1sxXS50ZXh0KCkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xyXG5cclxuICAgICAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW46IGFsbFByaWNlU3RhcnQsXHJcblxyXG4gICAgICAgICAgICAgICAgbWF4OiBhbGxQcmljZUVuZFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XHJcblxyXG4gICAgICAgICAgICBzcGFuc1toYW5kbGVdLnRleHQodmFsdWVzW2hhbmRsZV0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cclxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8qXHJcbiAgICAqIENhcmQuanNcclxuICAgICovXHJcblxyXG4gICAgLy9jYXJkIHRhYnNcclxuXHJcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpLnRhYnMoKTtcclxuXHJcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpXHJcblxyXG4gICAgICAgIC5maW5kKCcudGFiX190aXRsZScpXHJcblxyXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIGlmICgkKCcuanMtdGFiJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFiJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0YWJzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy/QotCw0LHRi1xyXG5cclxuICAgIGZ1bmN0aW9uIHRhYnMoZSkge1xyXG5cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAndGFiX190aXRsZScpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhVGFiID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0YWJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fY29udGVudCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhYlRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fdGl0bGUnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhVGFiID09IGkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxyXG5cclxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcclxuXHJcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtdGFiJylcclxuXHJcbiAgICAgICAgICAgIC51bndyYXAoKVxyXG5cclxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb24gYWNjb3JkZW9uLS1vdGhlciBqcy1hY2NvcmRlb24nKVxyXG5cclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlcycpO1xyXG5cclxuICAgICAgICB0YWJcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcudGFiX190aXRsZScpXHJcblxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKVxyXG5cclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB0YWJcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKVxyXG5cclxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpXHJcblxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICB0YWJcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKVxyXG5cclxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJylcclxuXHJcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB0YWJcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcudGFiX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX19jb250ZW50IHRhYl9fY29udGVudC0tcHJvZHVjdCcpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuXHJcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGlmICgkKCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlQ29sb3IoKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhbmdlQ29sb3IoKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKVxyXG5cclxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwodGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VDb2xvcigpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3QuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0LS1jb3VudCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpdGVtLXNlbGVjdF9faXRlbS0taGVhZGVyJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQktGL0LHRgNCw0YLRjCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLXBsdXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cmVudFZhbCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKSArIDEgKyAnICcgKyAn0LwnO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKS52YWwoY291bnQpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKGN1cmVudFZhbCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKDEgKyAn0LwnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tbWludXMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VyZW50VmFsID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpIC0gMSArICcgJyArICfQvCc7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoY3VyZW50VmFsID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvdW50ID0gY291bnQgPCAxID8gMSA6IGNvdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbChjb3VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuY2hhbmdlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LnJlbW92ZUNsYXNzKCdpcy1jbG9zZScpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3QucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLypcclxuICAgICogQ29tcG9uZW50cy5qc1xyXG4gICAgKi9cclxuXHJcbiAgICAvL0FjY29yZGVvblxyXG5cclxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYWNjb3JkZW9uJylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXHJcblxyXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoJCgnLmpzLWFjY29yZGVvbicpLmhhc0NsYXNzKCdsa19fYWNjb3JkZW9uJykpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9GB0LrRgNGL0YLRjCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9C/0L7QtNGA0L7QsdC90LXQtScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9jaGVja2JveFxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcblxyXG4gICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8qXHJcbiAgICAqTGsuanNcclxuICAgICovXHJcblxyXG4gICAgLy9TdGlja3kgQmxvY2sgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXHJcblxyXG4gICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreS1ibG9jaycsIHtcclxuXHJcbiAgICAgICAgdG9wU3BhY2luZzogMTM1LFxyXG5cclxuICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcclxuXHJcbiAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuc3Rpa3ktY29udGVudCcsXHJcblxyXG4gICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWJsb2NrX19pbm5lcidcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxufSk7XHJcblxyXG4vKlxyXG4gICAgKiBGdW5jdGlvbnMuanNcclxuICAgICovXHJcblxyXG4vL1B1c2hVcFxyXG5cclxuZnVuY3Rpb24gcHVzaFVwKHRleHQpIHtcclxuXHJcbiAgdmFyIHRleHQgPSB0ZXh0IHx8ICfQotC+0LLQsNGAINC00L7QsdCw0LLQu9C10L0g0LIg0LrQvtGA0LfQuNC90YMnO1xyXG5cclxuICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2J6LXB1c2hVcCcpO1xyXG5cclxuICB2YXIgcHVzaFVwQ2xvc2UgPSAkKCc8aSBjbGFzcz1cImZhbCBmYS10aW1lc1wiPjwvaT4nKS5hZGRDbGFzcyhcclxuXHJcbiAgICAnYnotcHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xyXG5cclxuICApO1xyXG5cclxuICBwdXNoQ29udGFpbmVyLmFwcGVuZFRvKCQoJ2JvZHknKSk7XHJcblxyXG4gIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuXHJcbiAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XHJcblxyXG5cclxuXHJcbiAgcmFmKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICB9KTtcclxuXHJcblxyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICB9LCAzNTAwKTtcclxuXHJcblxyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcblxyXG4gIH0sIDQwMDApO1xyXG5cclxuXHJcblxyXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG5cclxuICAgIH0sIDMwMCk7XHJcblxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxyXG5cclxuZnVuY3Rpb24gcmFmKGZuKSB7XHJcblxyXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGZuKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuXHJcbiJdfQ==
