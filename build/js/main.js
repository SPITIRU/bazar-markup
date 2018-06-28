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
        footer.find('.footer-item').first().addClass('is-open');
        footer.find('.footer-item__content').addClass('accordeon__content').css('display', 'none');
        footer.find('.accordeon__content').first().removeAttr('style');
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
            slidesToShow: 7,
            slidesToScroll: 1,
            asNavFor: '.js-bz-slider--card',
            dots: true,
            // centerMode: true,
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

    $('#preview').on('shown.bs.modal', function (e) {
        $('.js-bz-slider--card').resize();
    });

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

        $('.js-item-select').not('.js-item-select-control--plus').not('.js-item-select-control--minus').on('click', function () {
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
    }

    /*
    * Contacts.js
    */

    //Card Adress Map
    if ($('#contacts-map').length > 0) {
        var init = function init() {
            myMap = new ymaps.Map('contacts-map', {
                center: [55.73226853, 37.6209191],
                zoom: 16
            });

            myMap.behaviors.disable(['scrollZoom']);

            myMap.controls.remove('searchControl').remove('typeSelector').add('routeEditor');

            myPin = new ymaps.GeoObjectCollection({}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/general/map-pin.svg',
                iconImageSize: [30, 42],
                iconImageOffset: [-3, -42]
            });

            myPlacemark = new ymaps.Placemark([55.73226853, 37.6209191], {
                balloonContentHeader: '<span class="map-pin__title">BAZAAR-TEX</span>',
                balloonContentBody: '<span class="map-pin__place">ул. Большая Полянка, 51А/9, Московский р-н</span>'
            });

            myPin.add(myPlacemark);
            myMap.geoObjects.add(myPin);
        };

        ymaps.ready(init);
        var myMap, myPlacemark, myPin;
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

    //checkbox--pseudo
    $(document).on('click', '.js-checkbox--pseudo', function () {
        if ($(this).hasClass('is-checked')) {
            $(this).removeClass('is-checked');
        } else {
            $(this).addClass('is-checked');
        }
    });

    //dropdown
    if ($('.js-dropdown').length > 0) {
        $(document).on('click', '.js-dropdown', function () {
            if ($(this).hasClass('is-active')) {
                $(this).removeClass('is-active');
            } else {
                $('.js-dropdown').removeClass('is-active');
                $(this).addClass('is-active');
            }
        });
        $(document).on('click', function (e) {
            if ($(e.target).closest('.js-dropdown').length) return;
            $('.js-dropdown').removeClass('is-active');
            e.stopPropagation();
        });
    }

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwid2lkdGgiLCJyZW1vdmVBdHRyIiwiZXZlbnQiLCJmb290ZXIiLCJmaW5kIiwid3JhcEFsbCIsImZpcnN0IiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJ0ZXh0IiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiZmFkZSIsImFzTmF2Rm9yIiwiZm9jdXNPblNlbGVjdCIsImNlbnRlck1vZGUiLCJpdGVtIiwiY29sb3IiLCJpbWciLCJlYWNoIiwiY29sb3JCb3giLCJzbGlkZXIiLCJnZXRFbGVtZW50QnlJZCIsImFsbFByaWNlU3RhcnQiLCJhbGxQcmljZUVuZCIsInNwYW5zIiwic3RhcnRQcmljZSIsImVuZFByaWNlIiwicGFyc2VJbnQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJjb25uZWN0IiwicmFuZ2UiLCJtaW4iLCJtYXgiLCJ2YWx1ZXMiLCJoYW5kbGUiLCJ0YWJzIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc05hbWUiLCJkYXRhVGFiIiwiZ2V0QXR0cmlidXRlIiwidGFiQ29udGVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YWJUaXRsZSIsImkiLCJjbGFzc0xpc3QiLCJhZGQiLCJkaXNwbGF5IiwidGFiVHJhbnNmb3JtIiwidGFiIiwidW53cmFwIiwid3JhcCIsImNoYW5nZUNvbG9yIiwibm90Iiwic2VsZWN0IiwidmFsdWUiLCJpbnB1dCIsImNoaWxkcmVuIiwiaW5pdCIsIm15TWFwIiwieW1hcHMiLCJNYXAiLCJjZW50ZXIiLCJ6b29tIiwiYmVoYXZpb3JzIiwiZGlzYWJsZSIsImNvbnRyb2xzIiwibXlQaW4iLCJHZW9PYmplY3RDb2xsZWN0aW9uIiwiaWNvbkxheW91dCIsImljb25JbWFnZUhyZWYiLCJpY29uSW1hZ2VTaXplIiwiaWNvbkltYWdlT2Zmc2V0IiwibXlQbGFjZW1hcmsiLCJQbGFjZW1hcmsiLCJiYWxsb29uQ29udGVudEhlYWRlciIsImJhbGxvb25Db250ZW50Qm9keSIsImdlb09iamVjdHMiLCJpcyIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwicHVzaFVwIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwiYXBwZW5kVG8iLCJyYWYiLCJzZXRUaW1lb3V0IiwiZm4iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCRixNQUFFRyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVc7QUFDNUJKLFVBQUUsTUFBRixFQUFVSyxXQUFWLENBQXNCLFNBQXRCOztBQUVBO0FBQ0EsWUFBSUMsWUFBWU4sRUFBRSxZQUFGLENBQWhCO0FBQ0EsWUFBSU0sVUFBVUMsTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN0QkQsc0JBQVVFLFVBQVYsQ0FBcUI7QUFDakJDLDZCQUFhLFNBREk7QUFFakJDLGtDQUFrQixLQUZEO0FBR2pCO0FBQ0FDLHlCQUFTLEtBSlE7QUFLakJDLHVCQUFPLEdBTFU7QUFNakJDLDZCQUFhLEtBTkk7QUFPakJDLDhCQUFjLE1BUEc7QUFRakJDLG9DQUFvQjtBQVJILGFBQXJCO0FBVUFULHNCQUFVVSxTQUFWLENBQW9CLFlBQVc7QUFDM0JoQixrQkFBRSxJQUFGLEVBQ0tpQixhQURMLEdBRUtDLE1BRkw7QUFHSCxhQUpEO0FBS0g7QUFDSixLQXRCRDs7QUF3QkE7QUFDQSxRQUFJbEIsRUFBRSxZQUFGLEVBQWdCTyxNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUM1QlAsVUFBRSxZQUFGLEVBQWdCbUIsT0FBaEIsQ0FBd0I7QUFDcEJDLHlCQUFhcEIsRUFBRSxJQUFGLEVBQVFxQixJQUFSLENBQWEsYUFBYjtBQURPLFNBQXhCOztBQUlBckIsVUFB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S0FMRDtBQU1EOztBQUVEO0FBQ0EsU0FBUzBHLEdBQVQsQ0FBYUUsRUFBYixFQUFpQjtBQUNmM0ssV0FBTzRLLHFCQUFQLENBQTZCLFlBQVc7QUFDdEM1SyxlQUFPNEsscUJBQVAsQ0FBNkIsWUFBVztBQUN0Q0Q7QUFDRCxTQUZEO0FBR0QsS0FKRDtBQUtEIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgLy9HZXROaWNlU2Nyb2xsIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnV5YWtzYS9qcXVlcnkubmljZXNjcm9sbFxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcbiAgICAgICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyMyYzJiMmInLFxuICAgICAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmVyZ2U6IDUwMCxcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aDogJzRweCcsXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2Nyb2xsQmFyLm1vdXNlb3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCB8fCAkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnOTktOTktOTk5OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbk9mZnNldCgpIHtcbiAgICAgICAgJCgnLm1haW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkpO1xuICAgIH1cbiAgICBtYWluT2Zmc2V0KCk7XG4gICAgJCh3aW5kb3cpLnJlc2l6ZShtYWluT2Zmc2V0KTtcblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgODAwKTtcbiAgICB9KTtcblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCcgfSwgMzAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICBpZiAoJCgnLm1haW4nKS5oYXNDbGFzcygnY2F0YWxvZycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5jc3MoJ2JvdHRvbScsIDcwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8vRm9vdGVyIG1lZGlhIDw9IDQ4MCB0cmFuc2Zvcm0gYWNjb3JkZW9uXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICBsZXQgZm9vdGVyID0gJCgnLmpzLWZvb3RlcicpO1xuICAgICAgICBmb290ZXJcbiAgICAgICAgICAgIC5maW5kKCcuZm9vdGVyLWl0ZW0nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX2l0ZW0nKVxuICAgICAgICAgICAgLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb24ganMtYWNjb3JkZW9uXCI+Jyk7XG4gICAgICAgIGZvb3RlclxuICAgICAgICAgICAgLmZpbmQoJy5mb290ZXItaXRlbScpXG4gICAgICAgICAgICAuZmlyc3QoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgIGZvb3RlclxuICAgICAgICAgICAgLmZpbmQoJy5mb290ZXItaXRlbV9fY29udGVudCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgZm9vdGVyXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAuZmlyc3QoKVxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKTtcbiAgICB9XG5cbiAgICAvL0hhbWJ1cmdlciBidG5cbiAgICAkKCcuanMtaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5qcy1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPVxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID09PSAnJyA/ICdoaWRkZW4nIDogJyc7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAvL1doZW4gY2xpY2sgb3V0c2lkZVxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcbiAgICAgICAgICAgICAgICAnLmpzLWhhbWJ1cmdlciwgLmpzLW5hdi1tYWluLCAuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnXG4gICAgICAgICAgICApLmxlbmd0aFxuICAgICAgICApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICQoJy5qcy1oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgICAgICAvL01vYmlsZSBOYXZcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucHJlcGVuZFRvKCcud3JhcHBlciAnKTtcbiAgICAgICAgJCgnLmpzLW1haW4tbmF2LWxpbmstLWZvcndhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duMiA9IG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xuXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoXG4gICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIobmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKVxuICAgICAgICAgICAgICAgICAgICAudGV4dCh0aXRsZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhKFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgICAgIHZhciBzZWFyY2ggPSAkKCcuanMtc2VhcmNoJyk7XG4gICAgICAgIHZhciBzZWFyY2hCdG5TaG93ID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKTtcblxuICAgICAgICBzZWFyY2hCdG5TaG93Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHNlYXJjaC5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3csIC5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgICAgICAubGVuZ3RoXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcbiAgICAgICAgbGV0IGhlYWRlck1haW5DbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItbWFpbi0tY2xvbmVcIj4nKVxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgODUpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXItbWFpbicpXG4gICAgICAgICAgICAuaGlkZSgpO1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gJCgnLmhlYWRlcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCgpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW4ucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL1Nob3cgUGFzc3dvcmRcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgfSk7XG4gICAgLy9IaWRlIFBhc3N3b3JkXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnByZXYoKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgIH0pO1xuXG4gICAgLy9idG4gZmF2b3JpdGVcbiAgICAkKCcuanMtYnV0dG9uLWljb24tLWZhdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICogU2xpZGVyLmpzXG4gICAgKi9cblxuICAgIC8vIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG4gICAgLy9TbGlkZXIgTmV3XG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy9TbGlkZXIgQ2FyZFxuICAgIGlmIChcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLmxlbmd0aCA+IDAgJiZcbiAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JykubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykuc2xpY2soe1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNyxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vU2xpZGVyIFByb21vXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy9TbGlkZXIgUmVsYXRlZFxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqIENhdGFsb2cuanNcbiAgICAqL1xuXG4gICAgJCgnLmpzLXByb2R1Y3QtaXRlbScpXHJcbiAgICAgICAgLmZpbmQoJy5jb2xvcl9faXRlbScpXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xyXG4gICAgICAgICAgICBsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGltZy5hdHRyKCdzcmMnLCBjb2xvcik7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgLy9DaGFuZ2VyXHJcbiAgICAkKCcuanMtY2hhbmdlcicpXHJcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jaGFuZ2VyJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICQoJy5qcy1jaGFuZ2VyJylcclxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX3Jlc2V0JylcclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxyXG4gICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX3N1Yml0ZW0nKVxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29sb3InKTtcclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XHJcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcclxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICgkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbS1wcmljZScpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpO1xyXG4gICAgICAgIHZhciBhbGxQcmljZVN0YXJ0ID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgdmFyIGFsbFByaWNlRW5kID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xyXG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xyXG4gICAgICAgIHZhciBzdGFydFByaWNlO1xyXG4gICAgICAgIHZhciBlbmRQcmljZTtcclxuICAgIFxyXG4gICAgICAgIGlmIChzcGFuc1swXS50ZXh0KCkgPT0gJycpIHtcclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzBdLnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKHNwYW5zWzFdLnRleHQoKSA9PSAnJykge1xyXG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVuZFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMV0udGV4dCgpKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICBtaW46IGFsbFByaWNlU3RhcnQsXHJcbiAgICAgICAgICAgICAgICBtYXg6IGFsbFByaWNlRW5kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcclxuICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KHZhbHVlc1toYW5kbGVdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICB9KTtcclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcbiAgICB9KTtcclxuICAgIFxuXG4gICAgLypcbiAgICAqIENhcmQuanNcbiAgICAqL1xuXG4gICAgLy9jYXJkIHRhYnNcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpLnRhYnMoKTtcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpXG4gICAgICAgIC5maW5kKCcudGFiX190aXRsZScpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJylcbiAgICAgICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgIGlmICgkKCcuanMtdGFiJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFiJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0YWJzKTtcbiAgICB9XG4gICAgXG4gICAgJCgnI3ByZXZpZXcnKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5yZXNpemUoKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL9Ci0LDQsdGLXG4gICAgZnVuY3Rpb24gdGFicyhlKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICd0YWJfX3RpdGxlJykge1xuICAgICAgICAgICAgdmFyIGRhdGFUYWIgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xuICAgICAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XG4gICAgICAgICAgICB2YXIgdGFiVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX190aXRsZScpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJUaXRsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRhYlRpdGxlW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xuICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy90YWJzIC0tLT4gYWNjb3JkZW9uXG4gICAgZnVuY3Rpb24gdGFiVHJhbnNmb3JtKCkge1xuICAgICAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XG4gICAgXG4gICAgICAgICQoJy5qcy10YWInKVxuICAgICAgICAgICAgLnVud3JhcCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbiBhY2NvcmRlb24tLW90aGVyIGpzLWFjY29yZGVvbicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpXG4gICAgICAgICAgICAud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xuICAgIFxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJylcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjBcIl0nKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMVwiXScpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIxXCJdJyk7XG4gICAgXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX19jb250ZW50IHRhYl9fY29udGVudC0tcHJvZHVjdCcpO1xuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XG4gICAgfVxuICAgIFxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XG4gICAgfVxuICAgIFxuICAgIGlmICgkKCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpXG4gICAgICAgICAgICAubm90KCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tcGx1cycpXG4gICAgICAgICAgICAubm90KCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tbWludXMnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VDb2xvcigpIHtcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19pdGVtJylcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjaGFuZ2VDb2xvcigpO1xuICAgIFxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoKTtcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJylcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCh0ZXh0KTtcbiAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKVxuICAgICAgICAgICAgICAgICAgICAuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InLCBjb2xvcik7XG4gICAgICAgICAgICAgICAgY2hhbmdlQ29sb3IoKTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0Lmhhc0NsYXNzKCdpdGVtLXNlbGVjdC0tY291bnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXRlbS1zZWxlY3RfX2l0ZW0tLWhlYWRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0JLRi9Cx0YDQsNGC0YwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqIENvbnRhY3RzLmpzXG4gICAgKi9cblxuICAgIC8vQ2FyZCBBZHJlc3MgTWFwXG4gICAgaWYgKCQoJyNjb250YWN0cy1tYXAnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHltYXBzLnJlYWR5KGluaXQpO1xuICAgICAgICB2YXIgbXlNYXAsIG15UGxhY2VtYXJrLCBteVBpbjtcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIG15TWFwID0gbmV3IHltYXBzLk1hcCgnY29udGFjdHMtbWFwJywge1xuICAgICAgICAgICAgICAgIGNlbnRlcjogWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSxcbiAgICAgICAgICAgICAgICB6b29tOiAxNlxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZShbJ3Njcm9sbFpvb20nXSk7XG4gICAgXG4gICAgICAgICAgICBteU1hcC5jb250cm9sc1xuICAgICAgICAgICAgICAgIC5yZW1vdmUoJ3NlYXJjaENvbnRyb2wnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoJ3R5cGVTZWxlY3RvcicpXG4gICAgICAgICAgICAgICAgLmFkZCgncm91dGVFZGl0b3InKTtcbiAgICBcbiAgICAgICAgICAgIG15UGluID0gbmV3IHltYXBzLkdlb09iamVjdENvbGxlY3Rpb24oXG4gICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXG4gICAgICAgICAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpbWcvZ2VuZXJhbC9tYXAtcGluLnN2ZycsXG4gICAgICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFszMCwgNDJdLFxuICAgICAgICAgICAgICAgICAgICBpY29uSW1hZ2VPZmZzZXQ6IFstMywgLTQyXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgXG4gICAgICAgICAgICBteVBsYWNlbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSwge1xuICAgICAgICAgICAgICAgIGJhbGxvb25Db250ZW50SGVhZGVyOlxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtYXAtcGluX190aXRsZVwiPkJBWkFBUi1URVg8L3NwYW4+JyxcbiAgICAgICAgICAgICAgICBiYWxsb29uQ29udGVudEJvZHk6XG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1hcC1waW5fX3BsYWNlXCI+0YPQuy4g0JHQvtC70YzRiNCw0Y8g0J/QvtC70Y/QvdC60LAsIDUx0JAvOSwg0JzQvtGB0LrQvtCy0YHQutC40Lkg0YAt0L08L3NwYW4+J1xuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICBteVBpbi5hZGQobXlQbGFjZW1hcmspO1xuICAgICAgICAgICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQaW4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqIENvbXBvbmVudHMuanNcbiAgICAqL1xuXG4gICAgLy9BY2NvcmRlb25cbiAgICBpZiAoJCgnLmpzLWFjY29yZGVvbicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWFjY29yZGVvbicpXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5oYXNDbGFzcygnbGtfX2FjY29yZGVvbicpKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX3RpdGxlJylcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXItb3JkZXJfX2luZm8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfRgdC60YDRi9GC0YwnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXItb3JkZXJfX2luZm8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQv9C+0LTRgNC+0LHQvdC10LUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vY2hlY2tib3hcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKVxuICAgICAgICApIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vY2hlY2tib3gtLXBzZXVkb1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2Ryb3Bkb3duXG4gICAgaWYgKCQoJy5qcy1kcm9wZG93bicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1kcm9wZG93bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKkxrLmpzXG4gICAgKi9cblxuICAgIC8vU3RpY2t5IEJsb2NrIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxyXG4gICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5LWJsb2NrJywge1xyXG4gICAgICAgIHRvcFNwYWNpbmc6IDEzNSxcclxuICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcclxuICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcclxuICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5zdGlreS1ibG9ja19faW5uZXInXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXG59KTtcblxuLypcbiAgICAqIEZ1bmN0aW9ucy5qc1xuICAgICovXG5cbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcCh0ZXh0KSB7XHJcbiAgdmFyIHRleHQgPSB0ZXh0IHx8ICfQotC+0LLQsNGAINC00L7QsdCw0LLQu9C10L0g0LIg0LrQvtGA0LfQuNC90YMnO1xyXG4gIHZhciBwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnYnotcHVzaFVwJyk7XHJcbiAgdmFyIHB1c2hVcENsb3NlID0gJCgnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXNcIj48L2k+JykuYWRkQ2xhc3MoXHJcbiAgICAnYnotcHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xyXG4gICk7XHJcbiAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcclxuXHJcbiAgcmFmKGZ1bmN0aW9uKCkge1xyXG4gICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgfSk7XHJcblxyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICB9LCAzNTAwKTtcclxuXHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgfSwgNDAwMCk7XHJcblxyXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgfSwgMzAwKTtcclxuICB9KTtcclxufVxyXG5cclxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuZnVuY3Rpb24gcmFmKGZuKSB7XHJcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGZuKCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cbiJdfQ==
