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
        var addUserPic = function addUserPic(opt) {
            console.log('image select');
            if (!opt.id) {
                return opt.text;
            }
            var optimage = $(opt.element).data('image');
            if (!optimage) {
                return opt.text;
            } else {
                var $opt = $('<span class="sorting-icon sorting-icon--' + optimage + '">' + $(opt.element).text() + '</span>');
                return $opt;
            }
        };

        $('.js-select').select2({
            placeholder: $(this).data('placeholder')
        });

        $('.js-select.select-with-icon').select2({
            templateResult: addUserPic,
            minimumResultsForSearch: -1
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
        footer.find('.footer-item__title').addClass('accordeon__title');
        footer.find('.footer-item__content').addClass('accordeon__content');
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

    $(document).on('click', '.js-color-item', function (e) {
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
    } else {
        $('.js-catalog-filter-item').find('.catalog-filter__content').getNiceScroll().resize();
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

    //Sticky Block https://github.com/abouolia/sticky-sidebar
    if ($('.js-stiky').length > 0 && $(window).width() > 768) {
        var sidebar = new StickySidebar('.js-stiky', {
            topSpacing: 85,
            bottomSpacing: 20,
            containerSelector: '.stiky-content',
            innerWrapperSelector: '.stiky-inner'
        });
    }

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
        var accorderon = $('.js-accordeon');

        accorderon.find('.accordeon__item').not(':first').find('.accordeon__content').slideUp();
        accorderon.find('.accordeon__item:first').addClass('is-open').find('.accordeon__content').slideDown();

        accorderon.find('.accordeon__title').on('click', function () {
            if ($(this).parent().hasClass('is-open')) {
                $(this).parent().removeClass('is-open').find('.accordeon__content').slideUp();
            } else {
                $(this).parent().addClass('is-open').find('.accordeon__content').slideDown();
            }
        });
        if (accorderon.hasClass('lk__accordeon')) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJjbGljayIsImVsZW1lbnRDbGljayIsImF0dHIiLCJkZXN0aW5hdGlvbiIsIm9mZnNldCIsInRvcCIsInNjcm9sbCIsImhlaWdodCIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJibG9jayIsImluc2VydEFmdGVyIiwicmVtb3ZlIiwic2VhcmNoIiwic2VhcmNoQnRuU2hvdyIsInZhbCIsImhlYWRlck1haW4iLCJoZWFkZXJNYWluQ2xvbmUiLCJoaWRlIiwic2hvdyIsIm5leHQiLCJwYXJlbnQiLCJwcmV2Iiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhcnJvd3MiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiYXV0b3BsYXkiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInZhcmlhYmxlV2lkdGgiLCJmYWRlIiwiYXNOYXZGb3IiLCJmb2N1c09uU2VsZWN0IiwiY2VudGVyTW9kZSIsIml0ZW0iLCJjb2xvciIsImltZyIsImVhY2giLCJjb2xvckJveCIsInNsaWRlciIsImdldEVsZW1lbnRCeUlkIiwiYWxsUHJpY2VTdGFydCIsImFsbFByaWNlRW5kIiwic3BhbnMiLCJzdGFydFByaWNlIiwiZW5kUHJpY2UiLCJwYXJzZUludCIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsImNvbm5lY3QiLCJyYW5nZSIsIm1pbiIsIm1heCIsInZhbHVlcyIsImhhbmRsZSIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwidGFicyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsIm5vdCIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImluaXQiLCJteU1hcCIsInltYXBzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsImJlaGF2aW9ycyIsImRpc2FibGUiLCJjb250cm9scyIsIm15UGluIiwiR2VvT2JqZWN0Q29sbGVjdGlvbiIsImljb25MYXlvdXQiLCJpY29uSW1hZ2VIcmVmIiwiaWNvbkltYWdlU2l6ZSIsImljb25JbWFnZU9mZnNldCIsIm15UGxhY2VtYXJrIiwiUGxhY2VtYXJrIiwiYmFsbG9vbkNvbnRlbnRIZWFkZXIiLCJiYWxsb29uQ29udGVudEJvZHkiLCJnZW9PYmplY3RzIiwiYWNjb3JkZXJvbiIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJpcyIsInB1c2hVcCIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsImFwcGVuZFRvIiwicmFmIiwic2V0VGltZW91dCIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVztBQUN6QkYsTUFBRUcsTUFBRixFQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFXO0FBQzVCSixVQUFFLE1BQUYsRUFBVUssV0FBVixDQUFzQixTQUF0Qjs7QUFFQTtBQUNBLFlBQUlDLFlBQVlOLEVBQUUsWUFBRixDQUFoQjtBQUNBLFlBQUlNLFVBQVVDLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEJELHNCQUFVRSxVQUFWLENBQXFCO0FBQ2pCQyw2QkFBYSxTQURJO0FBRWpCQyxrQ0FBa0IsS0FGRDtBQUdqQjtBQUNBQyx5QkFBUyxLQUpRO0FBS2pCQyx1QkFBTyxHQUxVO0FBTWpCQyw2QkFBYSxLQU5JO0FBT2pCQyw4QkFBYyxNQVBHO0FBUWpCQyxvQ0FBb0I7QUFSSCxhQUFyQjtBQVVBVCxzQkFBVVUsU0FBVixDQUFvQixZQUFXO0FBQzNCaEIsa0JBQUUsSUFBRixFQUNLaUIsYUFETCxHQUVLQyxNQUZMO0FBR0gsYUFKRDtBQUtIO0FBQ0osS0F0QkQ7O0FBd0JBO0FBQ0EsUUFBSWxCLEVBQUUsWUFBRixFQUFnQk8sTUFBaEIsR0FBeUIsQ0FBN0Is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YzFHLE1BQWQ7QUFDSCxTQUZELEVBRUcsR0FGSDtBQUdILEtBTEQ7QUFNSDs7QUFFRDtBQUNBLFNBQVM2RyxHQUFULENBQWFFLEVBQWIsRUFBaUI7QUFDYnRMLFdBQU91TCxxQkFBUCxDQUE2QixZQUFXO0FBQ3BDdkwsZUFBT3VMLHFCQUFQLENBQTZCLFlBQVc7QUFDcENEO0FBQ0gsU0FGRDtBQUdILEtBSkQ7QUFLSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuXG4gICAgICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2VsZWN0LnNlbGVjdC13aXRoLWljb24nKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljLFxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbWFnZSBzZWxlY3QnKTtcbiAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcbiAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwic29ydGluZy1pY29uIHNvcnRpbmctaWNvbi0tJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDAgfHwgJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJzk5LTk5LTk5OTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XG4gICAgICAgICQoJy5tYWluJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcbiAgICB9XG4gICAgbWFpbk9mZnNldCgpO1xuICAgICQod2luZG93KS5yZXNpemUobWFpbk9mZnNldCk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDgwMCk7XG4gICAgfSk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnIH0sIDMwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuY3NzKCdib3R0b20nLCA3MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvL0Zvb3RlciBtZWRpYSA8PSA0ODAgdHJhbnNmb3JtIGFjY29yZGVvblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgbGV0IGZvb3RlciA9ICQoJy5qcy1mb290ZXInKTtcbiAgICAgICAgZm9vdGVyXG4gICAgICAgICAgICAuZmluZCgnLmZvb3Rlci1pdGVtJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgICAgIC53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50Jyk7XG4gICAgfVxuXG4gICAgLy9IYW1idXJnZXIgYnRuXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID1cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PT0gJycgPyAnaGlkZGVuJyA6ICcnO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgLy9XaGVuIGNsaWNrIG91dHNpZGVcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXG4gICAgICAgICAgICAgICAgJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93J1xuICAgICAgICAgICAgKS5sZW5ndGhcbiAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkKCcuanMtaGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgLy9Nb2JpbGUgTmF2XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnByZXBlbmRUbygnLndyYXBwZXIgJyk7XG4gICAgICAgICQoJy5qcy1tYWluLW5hdi1saW5rLS1mb3J3YXJkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IG5hdkl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93bjIgPSBuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBtYWluRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9fZHJvcGRvd24nKTtcblxuICAgICAgICAgICAgbGV0IHRpdGxlID0gJCh0aGlzKS50ZXh0KCk7XG4gICAgICAgICAgICBsZXQgYmxvY2sgPSAkKFxuICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJuYXYtZHJvcGRvd25fX3RpdGxlIG5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXBcIj4nXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSlcbiAgICAgICAgICAgICAgICAgICAgLnRleHQodGl0bGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICFuYXZJdGVtRHJvcGRvd24uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgIShcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXAnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaFxuICAgICAgICB2YXIgc2VhcmNoID0gJCgnLmpzLXNlYXJjaCcpO1xuICAgICAgICB2YXIgc2VhcmNoQnRuU2hvdyA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jyk7XG5cbiAgICAgICAgc2VhcmNoQnRuU2hvdy5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlYXJjaC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93LCAuanMtc2VhcmNoJylcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBoZWFkZXJNYWluID0gJCgnLmhlYWRlci1tYWluJyk7XG4gICAgICAgIGxldCBoZWFkZXJNYWluQ2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLW1haW4tLWNsb25lXCI+JylcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIDg1KVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCcuaGVhZGVyLW1haW4nKVxuICAgICAgICAgICAgLmhpZGUoKTtcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49ICQoJy5oZWFkZXJfX3RvcC1saW5lJykub3V0ZXJIZWlnaHQoKSkge1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW4uYWRkQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLnJlbW92ZUNsYXNzKCdoZWFkZXItLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9TaG93IFBhc3N3b3JkXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLm5leHQoKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgIH0pO1xuICAgIC8vSGlkZSBQYXNzd29yZFxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wcmV2KClcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICB9KTtcblxuICAgIC8vYnRuIGZhdm9yaXRlXG4gICAgJCgnLmpzLWJ1dHRvbi1pY29uLS1mYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLypcbiAgICAqIFNsaWRlci5qc1xuICAgICovXG5cbiAgICAvLyAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xuICAgIC8vU2xpZGVyIE5ld1xuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLW5ldycpLnNsaWNrKHtcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzMjEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vU2xpZGVyIENhcmRcbiAgICBpZiAoXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5sZW5ndGggPiAwICYmXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JykubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykuc2xpY2soe1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNyxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vU2xpZGVyIFByb21vXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy9TbGlkZXIgUmVsYXRlZFxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqIENhdGFsb2cuanNcbiAgICAqL1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jb2xvci1pdGVtJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXByb2R1Y3QtaXRlbScpO1xuICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XG4gICAgICAgIGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XG4gICAgXG4gICAgICAgIGltZy5hdHRyKCdzcmMnLCBjb2xvcik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0NoYW5nZXJcbiAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX3Jlc2V0JylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5jaGFuZ2VyX19pdGVtJyk7XG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJylcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29sb3InKTtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2ZpbHRlci1jb2xvcicpO1xuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcbiAgICAgICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcbiAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcbiAgICAgICAgICAgIC5yZXNpemUoKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtLXByaWNlJykubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpO1xuICAgICAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnZW5kJyk7XG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xuICAgICAgICB2YXIgc3RhcnRQcmljZTtcbiAgICAgICAgdmFyIGVuZFByaWNlO1xuICAgIFxuICAgICAgICBpZiAoc3BhbnNbMF0udGV4dCgpID09ICcnKSB7XG4gICAgICAgICAgICBzdGFydFByaWNlID0gYWxsUHJpY2VTdGFydDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBwYXJzZUludChzcGFuc1swXS50ZXh0KCkpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcbiAgICAgICAgICAgIGVuZFByaWNlID0gYWxsUHJpY2VFbmQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXG4gICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgIG1pbjogYWxsUHJpY2VTdGFydCxcbiAgICAgICAgICAgICAgICBtYXg6IGFsbFByaWNlRW5kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIHNwYW5zW2hhbmRsZV0udGV4dCh2YWx1ZXNbaGFuZGxlXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvL0NhdGFsb2cgRmlsdGVyIEFjdGlvblxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB9KTtcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XG4gICAgfSk7XG4gICAgXG4gICAgLy9TdGlja3kgQmxvY2sgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXG4gICAgaWYgKCQoJy5qcy1zdGlreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5Jywge1xuICAgICAgICAgICAgdG9wU3BhY2luZzogODUsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAyMCxcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktaW5uZXInXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDYXJkLmpzXG4gICAgKi9cblxuICAgIC8vY2FyZCB0YWJzXG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKS50YWJzKCk7XG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKVxuICAgICAgICAuZmluZCgnLnRhYl9fdGl0bGUnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpXG4gICAgICAgICAgICAgICAgLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICBpZiAoJCgnLmpzLXRhYicpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGFicyk7XG4gICAgfVxuICAgIFxuICAgICQoJyNwcmV2aWV3Jykub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykucmVzaXplKCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy/QotCw0LHRi1xuICAgIGZ1bmN0aW9uIHRhYnMoZSkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAndGFiX190aXRsZScpIHtcbiAgICAgICAgICAgIHZhciBkYXRhVGFiID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcbiAgICAgICAgICAgIHZhciB0YWJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fY29udGVudCcpO1xuICAgICAgICAgICAgdmFyIHRhYlRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fdGl0bGUnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhVGFiID09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xuICAgIFxuICAgICAgICAkKCcuanMtdGFiJylcbiAgICAgICAgICAgIC51bndyYXAoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb24gYWNjb3JkZW9uLS1vdGhlciBqcy1hY2NvcmRlb24nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlcycpO1xuICAgICAgICB0YWIuZmluZCgnLnRhYl9fdGl0bGUnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX190aXRsZSBpcy1hY3RpdmUnKVxuICAgICAgICAgICAgLndyYXAoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb25fX2l0ZW1cIj4nKTtcbiAgICBcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMFwiXScpXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIwXCJdJylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xuICAgIFxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fY29udGVudCB0YWJfX2NvbnRlbnQtLXByb2R1Y3QnKTtcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnRlcycpLnJlbW92ZSgpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoJCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAgICAgLm5vdCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLXBsdXMnKVxuICAgICAgICAgICAgLm5vdCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLW1pbnVzJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlQ29sb3IoKSB7XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2hhbmdlQ29sb3IoKTtcbiAgICBcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JylcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcbiAgICBcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwodGV4dCk7XG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX2NvbG9yJylcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJywgY29sb3IpO1xuICAgICAgICAgICAgICAgIGNoYW5nZUNvbG9yKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdC5oYXNDbGFzcygnaXRlbS1zZWxlY3QtLWNvdW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0X19pdGVtLS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CS0YvQsdGA0LDRgtGMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDb250YWN0cy5qc1xuICAgICovXG5cbiAgICAvL0NhcmQgQWRyZXNzIE1hcFxuICAgIGlmICgkKCcjY29udGFjdHMtbWFwJykubGVuZ3RoID4gMCkge1xuICAgICAgICB5bWFwcy5yZWFkeShpbml0KTtcbiAgICAgICAgdmFyIG15TWFwLCBteVBsYWNlbWFyaywgbXlQaW47XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ2NvbnRhY3RzLW1hcCcsIHtcbiAgICAgICAgICAgICAgICBjZW50ZXI6IFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sXG4gICAgICAgICAgICAgICAgem9vbTogMTZcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoWydzY3JvbGxab29tJ10pO1xuICAgIFxuICAgICAgICAgICAgbXlNYXAuY29udHJvbHNcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCdzZWFyY2hDb250cm9sJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCd0eXBlU2VsZWN0b3InKVxuICAgICAgICAgICAgICAgIC5hZGQoJ3JvdXRlRWRpdG9yJyk7XG4gICAgXG4gICAgICAgICAgICBteVBpbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxuICAgICAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL2dlbmVyYWwvbWFwLXBpbi5zdmcnLFxuICAgICAgICAgICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbMzAsIDQyXSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIFxuICAgICAgICAgICAgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sIHtcbiAgICAgICAgICAgICAgICBiYWxsb29uQ29udGVudEhlYWRlcjpcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLXBpbl9fdGl0bGVcIj5CQVpBQVItVEVYPC9zcGFuPicsXG4gICAgICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnRCb2R5OlxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtYXAtcGluX19wbGFjZVwiPtGD0LsuINCR0L7Qu9GM0YjQsNGPINCf0L7Qu9GP0L3QutCwLCA1MdCQLzksINCc0L7RgdC60L7QstGB0LrQuNC5INGALdC9PC9zcGFuPidcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcbiAgICAgICAgICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGluKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDb21wb25lbnRzLmpzXG4gICAgKi9cblxuICAgIC8vQWNjb3JkZW9uXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBhY2NvcmRlcm9uID0gJCgnLmpzLWFjY29yZGVvbicpO1xuICAgIFxuICAgICAgICBhY2NvcmRlcm9uXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnNsaWRlVXAoKTtcbiAgICAgICAgYWNjb3JkZXJvblxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW06Zmlyc3QnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5zbGlkZURvd24oKTtcbiAgICBcbiAgICAgICAgYWNjb3JkZXJvbi5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGFjY29yZGVyb24uaGFzQ2xhc3MoJ2xrX19hY2NvcmRlb24nKSkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0YHQutGA0YvRgtGMJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0L/QvtC00YDQvtCx0L3QtdC1Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL2NoZWNrYm94XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2NoZWNrYm94LS1wc2V1ZG9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9kcm9wZG93blxuICAgIGlmICgkKCcuanMtZHJvcGRvd24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZHJvcGRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICpMay5qc1xuICAgICovXG5cbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcbiAgICBpZiAoJCgnLmpzLXN0aWt5LWJsb2NrJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3ktYmxvY2snLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiAxMzUsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktYmxvY2tfX2lubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59KTtcblxuLypcbiAgICAqIEZ1bmN0aW9ucy5qc1xuICAgICovXG5cbi8vUHVzaFVwXG5mdW5jdGlvbiBwdXNoVXAodGV4dCkge1xuICAgIHZhciB0ZXh0ID0gdGV4dCB8fCAn0KLQvtCy0LDRgCDQtNC+0LHQsNCy0LvQtdC9INCyINC60L7RgNC30LjQvdGDJztcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2J6LXB1c2hVcCcpO1xuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxuICAgICAgICAnYnotcHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xuICAgICk7XG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcbiAgICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcblxuICAgIHJhZihmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9LCAzNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH0pO1xufVxuXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxuZnVuY3Rpb24gcmFmKGZuKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4iXX0=
