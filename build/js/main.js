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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNlbGVjdDIiLCJwbGFjZWhvbGRlciIsImRhdGEiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJjbGljayIsImVsZW1lbnRDbGljayIsImF0dHIiLCJkZXN0aW5hdGlvbiIsIm9mZnNldCIsInRvcCIsInNjcm9sbCIsImhlaWdodCIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJ0ZXh0IiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiZmFkZSIsImFzTmF2Rm9yIiwiY2VudGVyTW9kZSIsImZvY3VzT25TZWxlY3QiLCJpdGVtIiwiY29sb3IiLCJpbWciLCJlYWNoIiwiY29sb3JCb3giLCJzbGlkZXIiLCJnZXRFbGVtZW50QnlJZCIsImFsbFByaWNlU3RhcnQiLCJhbGxQcmljZUVuZCIsInNwYW5zIiwic3RhcnRQcmljZSIsImVuZFByaWNlIiwiYXJyUGFyYW1zIiwic1VybCIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwidmFsdWVzIiwiaGFuZGxlIiwidGFicyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImN1cmVudFZhbCIsImNvdW50IiwiY2hhbmdlIiwiaXMiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFZOztBQUUxQkYsTUFBRUcsTUFBRixFQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFZO0FBQzdCSixVQUFFLE1BQUYsRUFBVUssV0FBVixDQUFzQixTQUF0QjtBQUNBO0FBQ0EsWUFBSUMsWUFBWU4sRUFBRSxZQUFGLENBQWhCO0FBQ0EsWUFBSU0sVUFBVUMsTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN0QkQsc0JBQVVFLFVBQVYsQ0FBcUI7QUFDakJDLDZCQUFhLFNBREk7QUFFakJDLGtDQUFrQixLQUZEO0FBR2pCO0FBQ0FDLHlCQUFTLEtBSlE7QUFLakJDLHVCQUFPLEdBTFU7QUFNakJDLDZCQUFhLEtBTkk7QUFPakJDLDhCQUFjLE1BUEc7QUFRakJDLG9DQUFvQjtBQVJILGFBQXJCO0FBVUFULHNCQUFVVSxTQUFWLENBQW9CLFlBQVk7QUFDNUJoQixrQkFBRSxJQUFGLEVBQVFpQixhQUFSLEdBQXdCQyxNQUF4QjtBQUNILGFBRkQ7QUFHSDtBQUNKLEtBbkJEOztBQXFCQTtBQUNBLFFBQUlsQixFQUFFLFlBQUYsRUFBZ0JPLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQzVCUCxVQUFFLFlBQUYsRUFBZ0JtQixPQUFoQixDQUF3QjtBQUNwQkMseUJBQWFwQixFQUFFLElBQUYsRUFBUXFCLElBQVIsQ0FBYSxhQUFiO0FBRE8sU0FBeEI7O0FBSUFyQixVQUFFLHNCQUFGLEVBQTBCbUIsT0FBMUIsQ0FBa0M7QUFDOUJHLHFDQUF5QixDQUFDO0FBREksU0FBbEM7QUFHSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFTQyxVQUFULEdBQXNCO0FBQ2xCdkIsVUFBRSxPQUFGLEVBQVd3QixHQUFYLENBQWUsYUFBZixFQUE4QnhCLEVBQUUsU0FBRixFQUFheUIsV0FBYixFQUE5QjtBQUNIO0FBQ0R6QixNQUFFRyxNQUFGLEVBQVVlLE1BQVYsQ0FBaUJLLFVBQWpCOztBQUdBO0FBQ0F2QixNQUFFLFlBQUYsRUFBZ0JJLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFVBQVVzQixDQUFWLEVBQWE7QUFDckNBLFVBQUVDLGNBQUY7QUFDQTNCLFVBQUUsWUFBRixFQUFnQjRCLE9BQWhCLENBQXdCLEVBQUNDLFdBQVcsQ0FBWixFQUF4QixFQUF3QyxHQUF4QztBQUNILEtBSEQ7O0FBS0E7QUFDQTdCLE1BQUUsVUFBRixFQUFjOEIsS0FBZCxDQUFvQixZQUFZO0FBQzVCLFlBQUlDLGVBQWUvQixFQUFFLElBQUYsRUFBUWdDLElBQVIsQ0FBYSxNQUFiLENBQW5CO0FBQ0EsWUFBSUMsY0FBY2pDLEVBQUUrQixZQUFGLEVBQWdCRyxNQUFoQixHQUF5QkMsR0FBM0M7QUFDQW5DLFVBQUUsWUFBRixFQUFnQjRCLE9BQWhCLENBQXdCLEVBQUNDLFdBQVdJLGNBQWMsRUFBZCxHQUFtQixJQUEvQixFQUF4QixFQUE4RCxHQUE5RDtBQUNBLGVBQU8sS0FBUDtBQUNILEtBTEQ7QUFNQWpDLE1BQUVHLE1BQUYsRUFBVWlDLE1BQVYsQ0FBaUIsWUFBVTtBQUN2QixZQUFJcEMsRUFBRSxJQUFGLEVBQVE2QixTQUFSLEtBQXNCN0IsRUFBRSxJQUFGLEVBQVFxQyxNQUFSLEVBQTFCLEVBQTRDO0FBQ3hDckMsY0FBRSxZQUFGLEVBQWdCc0MsUUFBaEIsQ0FBeUIsWUFBekI7QUFDQSxnQkFBSXRDLEVBQUUsT0FBRixFQUFXdUMsUUFBWCxDQUFvQixTQUFwQixLQUFrQ3ZDLEVBQUVHLE1BQUYsRUFBVXFDLEtBQVYsTUFBcUIsR0FBM0QsRUFBZ0U7QUFDNUR4QyxrQkFBRSxZQUFGLEVBQWdCd0IsR0FBaEIsQ0FBb0IsUUFBcEIsRUFBOEIsRUFBOUI7QUFDSCxhQUZELE1BRU87QUFDSCx1QkFBTyxLQUFQO0FBQ0g7QUFDSixTQVBELE1BT087QUFDSHhCLGNBQUUsWUFBRixFQUFnQkssV0FBaEIsQ0FBNEIsWUFBNUI7QUFDQUwsY0FBRSxZQUFGLEVBQWdCeUMsVUFBaEIsQ0FBMkIsT0FBM0I7QUFDSDtBQUNKLEtBWkQ7O0FBY0E7QUFDQXpDLE1BQUUsS0FBRixFQUFTSSxFQUFULENBQVksV0FBWixFQUF5QixVQUFVc0MsS0FBVixFQUFpQjtBQUFDQSxjQUFNZixjQUFOO0FBQXVCLEtBQWxFOztBQUVBO0FBQ0EsUUFBRzNCLEVBQUVHLE1BQUYsRUFBVXFDLEtBQVYsTUFBcUIsR0FBeEIsRUFBNkI7QUFDekIsWUFBSUcsU0FBUzNDLEVBQUUsWUFBRixDQUFiO0FBQ0EyQyxlQUFPQyxJQUFQLENBQVksY0FBWixFQUE0Qk4sUUFBNUIsQ0FBcUMsaUJBQXJDLEVBQXdETyxPQUF4RCxDQUFnRSxzQ0FBaEU7QUFDQUYsZUFBT0MsSUFBUCxDQUFZLHVCQUFaLEVBQXFDTixRQUFyQyxDQUE4QyxvQkFBOUMsRUFBb0VkLEdBQXBFLENBQXdFLFNBQXhFLEVBQW1GLE1BQW5GO0FBQ0FtQixlQUFPQyxJQUFQLENBQVkscUJBQVosRUFBbUNOLFFBQW5DLENBQTRDLGtCQUE1QztBQUNIOztBQUVEO0FBQ0F0QyxNQUFFLGVBQUYsRUFBbUJJLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFlBQVc7QUFDdENKLFVBQUUsSUFBRixFQUFROEMsV0FBUixDQUFvQixJQUFwQjtBQUNBOUMsVUFBRSxjQUFGLEVBQWtCOEMsV0FBbEIsQ0FBOEIsU0FBOUI7QUFDQTlDLFVBQUUsYUFBRixFQUFpQjhDLFdBQWpCLENBQTZCLFdBQTdCO0FBQ0E3QyxpQkFBUzhDLGVBQVQsQ0FBeUJDLEtBQXpCLENBQStCQyxRQUEvQixHQUEwQ2hELFNBQVM4QyxlQUFULENBQXlCQyxLQUF6QixDQUErQkMsUUFBL0IsS0FBNEMsRUFBNUMsR0FBaUQsUUFBakQsR0FBNEQsRUFBdEc7QUFDQSxlQUFPLEtBQVA7QUFDSCxLQU5EO0FBT0M7QUFDRGpELE1BQUVDLFFBQUYsRUFBWTZCLEtBQVosQ0FBa0IsVUFBU0osQ0FBVCxFQUFZO0FBQzFCLFlBQUkxQixFQUFFMEIsRUFBRXdCLE1BQUosRUFBWUMsT0FBWixDQUFvQix1REFBcEIsRUFBNkU1QyxNQUFqRixFQUF5RjtBQUN6RlAsVUFBRSxlQUFGLEVBQW1CSyxXQUFuQixDQUErQixJQUEvQjtBQUNBTCxVQUFFLGNBQUYsRUFBa0JLLFdBQWxCLENBQThCLFNBQTlCO0FBQ0FMLFVBQUUsYUFBRixFQUFpQkssV0FBakIsQ0FBNkIsV0FBN0I7QUFDQUosaUJBQVM4QyxlQUFULENBQXlCQyxLQUF6QixHQUFpQyxFQUFqQztBQUNBdEIsVUFBRTBCLGVBQUY7QUFDSCxLQVBEOztBQVVBLFFBQUdwRCxFQUFFRyxNQUFGLEVBQVVxQyxLQUFWLE1BQXFCLEdBQXhCLEVBQTZCO0FBQ3pCO0FBQ0F4QyxVQUFFLGNBQUYsRUFBa0JxRCxTQUFsQixDQUE0QixXQUE1QjtBQUNBckQsVUFBRSw0QkFBRixFQUFnQ0ksRUFBaEMsQ0FBbUMsT0FBbkMsRUFBNEMsVUFBU3NCLENBQVQsRUFBWTtBQUNwREEsY0FBRUMsY0FBRjtBQUNBLGdCQUFJMkIsVUFBVXRELEVBQUUsSUFBRixFQUFRbUQsT0FBUixDQUFnQixpQkFBaEIsQ0FBZDtBQUNBLGdCQUFJSSxrQkFBa0J2RCxFQUFFLElBQUYsRUFBUW1ELE9BQVIsQ0FBZ0IscUJBQWhCLENBQXRCO0FBQ0EsZ0JBQUlLLG1CQUFtQkYsUUFBUVYsSUFBUixDQUFhLHFCQUFiLENBQXZCO0FBQ0EsZ0JBQUlhLGVBQWV6RCxFQUFFLElBQUYsRUFBUW1ELE9BQVIsQ0FBZ0IscUJBQWhCLENBQW5COztBQUVBLGdCQUFJTyxRQUFRMUQsRUFBRSxJQUFGLEVBQVEyRCxJQUFSLEVBQVo7QUFDQSxnQkFBSUMsUUFBUTVELEVBQUUsNERBQUYsQ0FBWjs7QUFFQSxnQkFBSSxDQUFDc0QsUUFBUWYsUUFBUixDQUFpQixXQUFqQixDQUFELElBQWtDLENBQUN2QyxFQUFFLElBQUYsRUFBUXVDLFFBQVIsQ0FBaUIsMkJBQWpCLENBQXZDLEVBQXNGO0FBQ2xGZSx3QkFBUWhCLFFBQVIsQ0FBaUIsV0FBakI7QUFDQXNCLHNCQUFNQyxXQUFOLENBQWtCUCxRQUFRVixJQUFSLENBQWEsNEJBQWIsQ0FBbEIsRUFBOERlLElBQTlELENBQW1FRCxLQUFuRTtBQUNILGFBSEQsTUFHTyxJQUFJSixRQUFRZixRQUFSLENBQWlCLFdBQWpCLEtBQWlDLENBQUNnQixnQkFBZ0JoQixRQUFoQixDQUF5QixXQUF6QixDQUFsQyxJQUEyRSxDQUFDdkMsRUFBRSxJQUFGLEVBQVF1QyxRQUFSLENBQWlCLDJCQUFqQixDQUFoRixFQUErSDtBQUNsSWdCLGdDQUFnQmpCLFFBQWhCLENBQXlCLFdBQXpCO0FBQ0FtQiw2QkFBYWpDLEdBQWIsQ0FBaUIsVUFBakIsRUFBNkIsUUFBN0I7QUFDSCxhQUhNLE1BR0EsSUFBSThCLFFBQVFmLFFBQVIsQ0FBaUIsV0FBakIsS0FBaUMsQ0FBQ2lCLGlCQUFpQmpCLFFBQWpCLENBQTBCLFdBQTFCLENBQWxDLElBQTRFdkMsRUFBRSxJQUFGLEVBQVF1QyxRQUFSLENBQWlCLDJCQUFqQixDQUFoRixFQUErSDtBQUNsSWUsd0JBQVFqRCxXQUFSLENBQW9CLFdBQXBCO0FBQ0FrRCxnQ0FBZ0JYLElBQWhCLENBQXFCLDRCQUFyQixFQUFtRGtCLE1BQW5EO0FBQ0gsYUFITSxNQUdBLElBQUlSLFFBQVFmLFFBQVIsQ0FBaUIsV0FBakIsS0FBaUNpQixpQkFBaUJqQixRQUFqQixDQUEwQixXQUExQixDQUFqQyxJQUEyRXZDLEVBQUUsSUFBRixFQUFRdUMsUUFBUixDQUFpQiwyQkFBakIsQ0FBL0UsRUFBOEg7QUFDaklpQixpQ0FBaUJuRCxXQUFqQixDQUE2QixXQUE3QjtBQUNBb0QsNkJBQWFoQixVQUFiLENBQXdCLE9BQXhCO0FBQ0g7QUFDSixTQXZCRDs7QUF5QkM7QUFDRCxZQUFJc0IsU0FBUy9ELEVBQUUsWUFBRixDQUFiO0FBQ0EsWUFBSWdFLGdCQUFnQmhFLEVBQUUseUJBQUYsQ0FBcEI7O0FBRUFBLFVBQUUseUJBQUYsRUFBNkJJLEVBQTdCLENBQWdDLE9BQWhDLEVBQXlDLFlBQVc7QUFDaEQsZ0JBQUkyRCxPQUFPeEIsUUFBUCxDQUFnQixZQUFoQixDQUFKLEVBQW1DO0FBQy9Cd0IsdUJBQU8xRCxXQUFQLENBQW1CLFlBQW5CO0FBQ0EwRCx1QkFBT25CLElBQVAsQ0FBWSxrQkFBWixFQUFnQ3FCLEdBQWhDLENBQW9DLEVBQXBDO0FBQ0FGLHVCQUFPbkIsSUFBUCxDQUFZLGVBQVosRUFBNkJwQixHQUE3QixDQUFpQyxTQUFqQyxFQUE0QyxNQUE1QztBQUNILGFBSkQsTUFJTztBQUNKdUMsdUJBQU96QixRQUFQLENBQWdCLFlBQWhCO0FBQ0Y7QUFDSixTQVJEOztBQVVDO0FBQ0R0QyxVQUFFQyxRQUFGLEVBQVk2QixLQUFaLENBQWtCLFVBQVNZLEtBQVQsRUFBZ0I7QUFDOUIsZ0JBQUkxQyxFQUFFMEMsTUFBTVEsTUFBUixFQUFnQkMsT0FBaEIsQ0FBd0IscUNBQXhCLEVBQStENUMsTUFBbkUsRUFBMkU7QUFDM0V3RCxtQkFBTzFELFdBQVAsQ0FBbUIsWUFBbkI7QUFDQTBELG1CQUFPbkIsSUFBUCxDQUFZLGtCQUFaLEVBQWdDcUIsR0FBaEMsQ0FBb0MsRUFBcEM7QUFDQUYsbUJBQU9uQixJQUFQLENBQVksZUFBWixFQUE2QnBCLEdBQTdCLENBQWlDLFNBQWpDLEVBQTRDLE1BQTVDO0FBQ0FrQixrQkFBTVUsZUFBTjtBQUNILFNBTkQ7QUFPSCxLQWxERCxNQWtETztBQUNILFlBQUljLGFBQWFsRSxFQUFFLGNBQUYsQ0FBakI7QUFDQSxZQUFJbUUsa0JBQWtCbkUsRUFBRSxrQ0FBRixFQUFzQ3dCLEdBQXRDLENBQTBDLFFBQTFDLEVBQW9ELEVBQXBELEVBQXdEcUMsV0FBeEQsQ0FBb0UsY0FBcEUsRUFBb0ZPLElBQXBGLEVBQXRCO0FBQ0FwRSxVQUFFRyxNQUFGLEVBQVVpQyxNQUFWLENBQWlCLFlBQVc7QUFDeEIsZ0JBQUlwQyxFQUFFLElBQUYsRUFBUTZCLFNBQVIsTUFBdUI3QixFQUFFLG1CQUFGLEVBQXVCeUIsV0FBdkIsRUFBM0IsRUFBaUU7QUFDN0R5QywyQkFBVzVCLFFBQVgsQ0FBb0IsZUFBcEI7QUFDQTZCLGdDQUFnQkUsSUFBaEI7QUFDSCxhQUhELE1BR087QUFDSEgsMkJBQVc3RCxXQUFYLENBQXVCLGVBQXZCO0FBQ0E4RCxnQ0FBZ0JDLElBQWhCO0FBQ0g7QUFDSixTQVJEO0FBU0g7O0FBRUQ7QUFDQXBFLE1BQUUsMEJBQUYsRUFBOEJJLEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFlBQVU7QUFDaERKLFVBQUUsSUFBRixFQUFRd0IsR0FBUixDQUFZLFNBQVosRUFBdUIsTUFBdkI7QUFDQXhCLFVBQUUsSUFBRixFQUFRc0UsSUFBUixHQUFlOUMsR0FBZixDQUFtQixTQUFuQixFQUE4QixPQUE5QjtBQUNBeEIsVUFBRSxJQUFGLEVBQVF1RSxNQUFSLEdBQWlCM0IsSUFBakIsQ0FBc0Isd0JBQXRCLEVBQWdEWixJQUFoRCxDQUFxRCxNQUFyRCxFQUE2RCxNQUE3RDtBQUNILEtBSkQ7QUFLQTtBQUNBaEMsTUFBRSwwQkFBRixFQUE4QkksRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVTtBQUNoREosVUFBRSxJQUFGLEVBQVF3QixHQUFSLENBQVksU0FBWixFQUF1QixNQUF2QjtBQUNBeEIsVUFBRSxJQUFGLEVBQVF3RSxJQUFSLEdBQWVoRCxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE9BQTlCO0FBQ0F4QixVQUFFLElBQUYsRUFBUXVFLE1BQVIsR0FBaUIzQixJQUFqQixDQUFzQixvQkFBdEIsRUFBNENaLElBQTVDLENBQWlELE1BQWpELEVBQXlELFVBQXpEO0FBQ0gsS0FKRDs7QUFNQTtBQUNBaEMsTUFBRSxzQkFBRixFQUEwQkksRUFBMUIsQ0FBNkIsT0FBN0IsRUFBc0MsVUFBU3NCLENBQVQsRUFBWTtBQUM5QyxZQUFJLENBQUMxQixFQUFFLElBQUYsRUFBUXVDLFFBQVIsQ0FBaUIsWUFBakIsQ0FBTCxFQUFxQztBQUNsQ3ZDLGNBQUUsSUFBRixFQUFRc0MsUUFBUixDQUFpQixZQUFqQjtBQUNGLFNBRkQsTUFFTztBQUNIdEMsY0FBRSxJQUFGLEVBQVFLLFdBQVIsQ0FBb0IsWUFBcEI7QUFDSDtBQUNEcUIsVUFBRUMsY0FBRjtBQUNILEtBUEQ7O0FBU0E7Ozs7QUFJQTs7QUFFQTs7QUFFQSxRQUFJM0IsRUFBRSxvQkFBRixFQUF3Qk8sTUFBeEIsR0FBaUMsQ0FBckMsRUFBd0M7O0FBRXBDUCxVQUFFLG9CQUFGLEVBQXdCeUUsS0FBeEIsQ0FBOEI7O0FBRTFCQyx1QkFBVyx5QkFGZTs7QUFJMUJDLHVCQUFXLHlCQUplOztBQU0xQkMsb0JBQVEsSUFOa0I7O0FBUTFCQyxzQkFBVSxJQVJnQjs7QUFVMUJDLDBCQUFjLENBVlk7O0FBWTFCQyw0QkFBZ0IsQ0FaVTs7QUFjMUJDLG1CQUFPLElBZG1COztBQWdCMUJDLDJCQUFlLElBaEJXOztBQWtCMUJDLHNCQUFVLElBbEJnQjs7QUFvQjFCQyxrQkFBTSxLQXBCb0I7O0FBc0IxQjs7QUFFQUMsd0JBQVksQ0FBQzs7QUFJVEMsNEJBQVksSUFKSDs7QUFNVEMsMEJBQVU7O0FBRU5SLGtDQUFjOztBQUZSOztBQU5ELGFBQUQsRUFjVDs7QUFJQ08sNEJBQVksR0FKYjs7QUFNQ0MsMEJBQVU7O0FBRU5SLGtDQUFjOztBQUZSOztBQU5YLGFBZFMsRUE0QlQ7O0FBSUNPLDRCQUFZLEdBSmI7O0FBTUNDLDBCQUFVOztBQUVOUixrQ0FBYyxDQUZSOztBQUlOSSw4QkFBVSxLQUpKOztBQU1OSyxtQ0FBZSxLQU5UOztBQVFOWCw0QkFBUTs7QUFSRjs7QUFOWCxhQTVCUyxFQWdEVDs7QUFJQ1MsNEJBQVksR0FKYjs7QUFNQ0MsMEJBQVU7O0FBRU5SLGtDQUFjOztBQUZSOztBQU5YLGFBaERTLEVBOERUOztBQUlDTyw0QkFBWSxHQUpiOztBQU1DQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTlgsYUE5RFM7O0FBeEJjLFNBQTlCO0FBd0dIOztBQUlEOztBQUVBOUUsTUFBRSxxQkFBRixFQUF5QnlFLEtBQXpCLENBQStCOztBQUUzQkssc0JBQWMsQ0FGYTs7QUFJM0JDLHdCQUFnQixDQUpXOztBQU0zQkgsZ0JBQVEsS0FObUI7O0FBUTNCWSxjQUFNLElBUnFCOztBQVUzQkMsa0JBQVUseUJBVmlCOztBQVkzQkwsb0JBQVksQ0FBQzs7QUFJVEMsd0JBQVksR0FKSDs7QUFNVEMsc0JBQVU7O0FBRU5ILHNCQUFNOztBQUZBOztBQU5ELFNBQUQ7O0FBWmUsS0FBL0I7O0FBOEJBbkYsTUFBRSx5QkFBRixFQUE2QnlFLEtBQTdCLENBQW1DOztBQUUvQkssc0JBQWMsQ0FGaUI7O0FBSS9CQyx3QkFBZ0IsQ0FKZTs7QUFNL0JVLGtCQUFVLHFCQU5xQjs7QUFRL0JOLGNBQU0sSUFSeUI7O0FBVS9CTyxvQkFBWSxJQVZtQjs7QUFZL0JDLHVCQUFlLElBWmdCOztBQWMvQlAsb0JBQVksQ0FBQzs7QUFJVEMsd0JBQVksSUFKSDs7QUFNVEMsc0JBQVU7O0FBRU5JLDRCQUFZOztBQUZOOztBQU5ELFNBQUQsRUFjVjs7QUFJRUwsd0JBQVksR0FKZDs7QUFNRUMsc0JBQVU7O0FBTlosU0FkVTs7QUFkbUIsS0FBbkM7O0FBNENBOztBQUVBLFFBQUl0RixFQUFFLHNCQUFGLEVBQTBCTyxNQUExQixHQUFtQyxDQUF2QyxFQUEwQzs7QUFFdENQLFVBQUUsc0JBQUYsRUFBMEJ5RSxLQUExQixDQUFnQzs7QUFFNUJDLHVCQUFXLCtCQUZpQjs7QUFJNUJDLHVCQUFXLCtCQUppQjs7QUFNNUJDLG9CQUFRLElBTm9COztBQVE1QkMsc0JBQVUsSUFSa0I7O0FBVTVCQywwQkFBYyxDQVZjOztBQVk1QkMsNEJBQWdCLENBWlk7O0FBYzVCQyxtQkFBTyxHQWRxQjs7QUFnQjVCQywyQkFBZSxJQWhCYTs7QUFrQjVCQyxzQkFBVSxJQWxCa0I7O0FBb0I1QkMsa0JBQU07O0FBcEJzQixTQUFoQztBQXdCSDs7QUFJRDs7QUFFQSxRQUFJbkYsRUFBRSx3QkFBRixFQUE0Qk8sTUFBNUIsR0FBcUMsQ0FBekMsRUFBNEM7O0FBRXhDUCxVQUFFLHdCQUFGLEVBQTRCeUUsS0FBNUIsQ0FBa0M7O0FBRTlCRyxvQkFBUSxJQUZzQjs7QUFJOUJDLHNCQUFVLElBSm9COztBQU05QkMsMEJBQWMsQ0FOZ0I7O0FBUTlCQyw0QkFBZ0IsQ0FSYzs7QUFVOUJDLG1CQUFPLEdBVnVCOztBQVk5QkMsMkJBQWUsSUFaZTs7QUFjOUJDLHNCQUFVLElBZG9COztBQWdCOUJDLGtCQUFNLEtBaEJ3Qjs7QUFrQjlCQyx3QkFBWSxDQUFDOztBQUlUQyw0QkFBWSxJQUpIOztBQU1UQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTkQsYUFBRCxFQWNWOztBQUlFTyw0QkFBWSxHQUpkOztBQU1FQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTlosYUFkVSxFQTBCVjs7QUFJRU8sNEJBQVksR0FKZDs7QUFNRUMsMEJBQVU7O0FBRU5SLGtDQUFjOztBQUZSOztBQU5aLGFBMUJVLEVBc0NWOztBQUlFTyw0QkFBWSxHQUpkOztBQU1FQywwQkFBVTs7QUFFTlIsa0NBQWM7O0FBRlI7O0FBTlosYUF0Q1U7O0FBbEJrQixTQUFsQztBQXdFSDs7QUFFRDs7OztBQUlBOUUsTUFBRSxrQkFBRixFQUFzQjRDLElBQXRCLENBQTJCLGNBQTNCLEVBQTJDeEMsRUFBM0MsQ0FBOEMsT0FBOUMsRUFBdUQsVUFBU3NCLENBQVQsRUFBWTs7QUFFbEUsWUFBSWtFLE9BQU81RixFQUFFLElBQUYsRUFBUW1ELE9BQVIsQ0FBZ0Isa0JBQWhCLENBQVg7O0FBRUEsWUFBSTBDLFFBQVE3RixFQUFFLElBQUYsRUFBUXFCLElBQVIsQ0FBYSxPQUFiLENBQVo7O0FBRUEsWUFBSXlFLE1BQU1GLEtBQUtoRCxJQUFMLENBQVUsc0JBQVYsQ0FBVjs7QUFJQWtELFlBQUk5RCxJQUFKLENBQVMsS0FBVCxFQUFnQjZELEtBQWhCOztBQUVBbkUsVUFBRUMsY0FBRjtBQUVBLEtBZEQ7O0FBa0JBOztBQUVBM0IsTUFBRSxhQUFGLEVBQWlCNEMsSUFBakIsQ0FBc0IsZ0JBQXRCLEVBQXdDeEMsRUFBeEMsQ0FBMkMsT0FBM0MsRUFBb0QsWUFBVzs7QUFFOUQsWUFBSUosRUFBRSxJQUFGLEVBQVF1QyxRQUFSLENBQWlCLFlBQWpCLENBQUosRUFBb0M7O0FBRW5DO0FBRUEsU0FKRCxNQUlPOztBQUVOdkMsY0FBRSxhQUFGLEVBQWlCNEMsSUFBakIsQ0FBc0IsZ0JBQXRCLEVBQXdDdkMsV0FBeEMsQ0FBb0QsWUFBcEQ7O0FBRUFMLGNBQUUsSUFBRixFQUFRc0MsUUFBUixDQUFpQixZQUFqQjs7QUFFQTtBQUVBO0FBRUQsS0FoQkQ7O0FBb0JBdEMsTUFBRSxhQUFGLEVBQWlCNEMsSUFBakIsQ0FBc0IsaUJBQXRCLEVBQXlDeEMsRUFBekMsQ0FBNEMsT0FBNUMsRUFBcUQsVUFBU3NCLENBQVQsRUFBWTs7QUFFaEUsWUFBSWtFLE9BQU81RixFQUFFLElBQUYsRUFBUXVFLE1BQVIsQ0FBZSxnQkFBZixDQUFYOztBQUVBLFlBQUlxQixLQUFLckQsUUFBTCxDQUFjLFlBQWQsQ0FBSixFQUFnQzs7QUFFL0JxRCxpQkFBS3ZGLFdBQUwsQ0FBaUIsWUFBakI7QUFFQTs7QUFFRHFCLFVBQUUwQixlQUFGO0FBRUEsS0FaRDs7QUFnQkFwRCxNQUFFLHlCQUFGLEVBQTZCNEMsSUFBN0IsQ0FBa0MsMEJBQWxDLEVBQThEbUQsSUFBOUQsQ0FBbUUsWUFBVzs7QUFFN0UsWUFBSUMsV0FBV2hHLEVBQUUsSUFBRixFQUFRNEMsSUFBUixDQUFhLHdCQUFiLENBQWY7O0FBRUEsWUFBSWlELFFBQVFHLFNBQVMzRSxJQUFULENBQWMsY0FBZCxDQUFaOztBQUVBMkUsaUJBQVN4RSxHQUFULENBQWEsa0JBQWIsRUFBaUNxRSxLQUFqQztBQUVBLEtBUkQ7O0FBWUEsUUFBRzdGLEVBQUVHLE1BQUYsRUFBVXFDLEtBQVYsTUFBcUIsR0FBeEIsRUFBNkI7O0FBRTVCeEMsVUFBRSx5QkFBRixFQUE2QjRDLElBQTdCLENBQWtDLDBCQUFsQyxFQUE4RHZDLFdBQTlELENBQTBFLFdBQTFFO0FBRUE7O0FBSUQsUUFBSUwsRUFBRSwrQkFBRixFQUFtQ08sTUFBbkMsR0FBNEMsQ0FBaEQsRUFBbUQ7O0FBSS9DLFlBQUkwRixTQUFTaEcsU0FBU2lHLGNBQVQsQ0FBd0IsMEJBQXhCLENBQWI7O0FBRUEsWUFBSUMsZ0JBQWdCbkcsRUFBRSwyQkFBRixFQUErQnFCLElBQS9CLENBQW9DLE9BQXBDLENBQXBCOztBQUVBLFlBQUkrRSxjQUFjcEcsRUFBRSwyQkFBRixFQUErQnFCLElBQS9CLENBQW9DLEtBQXBDLENBQWxCOztBQUVBLFlBQUlnRixRQUFRLENBQUNyRyxFQUFFLGVBQUYsQ0FBRCxFQUFxQkEsRUFBRSxhQUFGLENBQXJCLENBQVo7O0FBRUEsWUFBSXNHLFVBQUo7O0FBRUEsWUFBSUMsUUFBSjs7QUFFQSxZQUFJQyxTQUFKOztBQUVBLFlBQUlDLElBQUo7O0FBSUEsWUFBSUosTUFBTSxDQUFOLEVBQVMxQyxJQUFULE1BQW1CLEVBQXZCLEVBQTJCOztBQUV2QjJDLHlCQUFhSCxhQUFiO0FBRUgsU0FKRCxNQUlPOztBQUVIRyx5QkFBYUksU0FBU0wsTUFBTSxDQUFOLEVBQVMxQyxJQUFULEVBQVQsQ0FBYjtBQUVIOztBQUlELFlBQUkwQyxNQUFNLENBQU4sRUFBUzFDLElBQVQsTUFBbUIsRUFBdkIsRUFBMkI7O0FBRXZCNEMsdUJBQVdILFdBQVg7QUFFSCxTQUpELE1BSU87O0FBRUhHLHVCQUFXRyxTQUFTTCxNQUFNLENBQU4sRUFBUzFDLElBQVQsRUFBVCxDQUFYO0FBRUg7O0FBTURnRCxtQkFBV0MsTUFBWCxDQUFrQlgsTUFBbEIsRUFBMEI7O0FBRXRCWSxtQkFBTyxDQUFDUCxVQUFELEVBQWFDLFFBQWIsQ0FGZTs7QUFJdEJPLHFCQUFTLElBSmE7O0FBTXRCQyxtQkFBTzs7QUFFSCx1QkFBT1osYUFGSjs7QUFJSCx1QkFBT0M7O0FBSko7O0FBTmUsU0FBMUI7O0FBZ0JBSCxlQUFPVSxVQUFQLENBQWtCdkcsRUFBbEIsQ0FBcUIsUUFBckIsRUFBK0IsVUFBVTRHLE1BQVYsRUFBa0JDLE1BQWxCLEVBQTBCOztBQUVyRFosa0JBQU1ZLE1BQU4sRUFBY3RELElBQWQsQ0FBb0JxRCxPQUFPQyxNQUFQLENBQXBCO0FBRUgsU0FKRDtBQU1IOztBQUlEOztBQUVBakgsTUFBRSwwQkFBRixFQUE4QkksRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVzs7QUFFcERKLFVBQUUsb0JBQUYsRUFBd0JzQyxRQUF4QixDQUFpQyxZQUFqQzs7QUFFQXJDLGlCQUFTOEMsZUFBVCxDQUF5QkMsS0FBekIsQ0FBK0JDLFFBQS9CLEdBQTBDLFFBQTFDO0FBRUEsS0FORDs7QUFRQWpELE1BQUUsMEJBQUYsRUFBOEJJLEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFlBQVc7O0FBRXBESixVQUFFLG9CQUFGLEVBQXdCSyxXQUF4QixDQUFvQyxZQUFwQzs7QUFFQUosaUJBQVM4QyxlQUFULENBQXlCQyxLQUF6QixHQUFpQyxFQUFqQztBQUVBLEtBTkQ7O0FBUUE7Ozs7QUFJQTs7QUFFQWhELE1BQUUsc0JBQUYsRUFBMEJrSCxJQUExQjs7QUFFQWxILE1BQUUsc0JBQUYsRUFBMEI0QyxJQUExQixDQUErQixhQUEvQixFQUE4Q3hDLEVBQTlDLENBQWlELE9BQWpELEVBQTBELFlBQVc7O0FBRWpFSixVQUFFLElBQUYsRUFBUW1ELE9BQVIsQ0FBZ0Isc0JBQWhCLEVBQXdDUCxJQUF4QyxDQUE2Qyx3QkFBN0MsRUFBdUU2QixLQUF2RSxDQUE2RSxhQUE3RTtBQUVILEtBSkQ7O0FBUUEsUUFBS3pFLEVBQUUsU0FBRixFQUFhTyxNQUFiLEdBQXNCLENBQXRCLElBQTJCUCxFQUFFRyxNQUFGLEVBQVVxQyxLQUFWLEtBQW9CLEdBQXBELEVBQXlEOztBQUVyRHZDLGlCQUFTa0gsYUFBVCxDQUF1QixTQUF2QixFQUFrQ0MsZ0JBQWxDLENBQW1ELE9BQW5ELEVBQTRERixJQUE1RDtBQUVIOztBQUlEOztBQUVBLGFBQVNBLElBQVQsQ0FBY3hGLENBQWQsRUFBaUI7O0FBRWIsWUFBSXdCLFNBQVN4QixFQUFFd0IsTUFBZjs7QUFFQSxZQUFJQSxPQUFPbUUsU0FBUCxJQUFvQixZQUF4QixFQUFzQzs7QUFFbEMsZ0JBQUlDLFVBQWFwRSxPQUFPcUUsWUFBUCxDQUFvQixVQUFwQixDQUFqQjs7QUFFQSxnQkFBSUMsYUFBYXZILFNBQVN3SCxnQkFBVCxDQUEwQixlQUExQixDQUFqQjs7QUFFQSxnQkFBSUMsV0FBYXpILFNBQVN3SCxnQkFBVCxDQUEwQixhQUExQixDQUFqQjs7QUFFQSxpQkFBSyxJQUFJRSxJQUFJLENBQWIsRUFBZ0JBLElBQUlELFNBQVNuSCxNQUE3QixFQUFxQ29ILEdBQXJDLEVBQTBDOztBQUV0Q0QseUJBQVNDLENBQVQsRUFBWUMsU0FBWixDQUFzQjlELE1BQXRCLENBQTZCLFdBQTdCO0FBRUg7O0FBRURaLG1CQUFPMEUsU0FBUCxDQUFpQkMsR0FBakIsQ0FBcUIsV0FBckI7O0FBRUEsaUJBQUssSUFBSUYsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxXQUFXakgsTUFBL0IsRUFBdUNvSCxHQUF2QyxFQUE0Qzs7QUFFeEMsb0JBQUlMLFdBQVdLLENBQWYsRUFBa0I7O0FBRWRILCtCQUFXRyxDQUFYLEVBQWMzRSxLQUFkLENBQW9COEUsT0FBcEIsR0FBOEIsT0FBOUI7QUFFSCxpQkFKRCxNQUlLOztBQUVETiwrQkFBV0csQ0FBWCxFQUFjM0UsS0FBZCxDQUFvQjhFLE9BQXBCLEdBQThCLE1BQTlCO0FBRUg7QUFFSjtBQUVKO0FBRUo7O0FBSUQ7O0FBRUEsYUFBU0MsWUFBVCxHQUF1Qjs7QUFFbkIsWUFBSUMsTUFBTWhJLEVBQUUsb0JBQUYsQ0FBVjs7QUFJQUEsVUFBRSxTQUFGLEVBQWFpSSxNQUFiLEdBQXNCM0YsUUFBdEIsQ0FBK0IseUNBQS9CLEVBQTBFakMsV0FBMUUsQ0FBc0YsYUFBdEY7O0FBRUEySCxZQUFJcEYsSUFBSixDQUFTLGFBQVQsRUFBd0JOLFFBQXhCLENBQWlDLGtCQUFqQyxFQUFxRGpDLFdBQXJELENBQWlFLHNCQUFqRSxFQUF5RjZILElBQXpGLENBQThGLCtCQUE5Rjs7QUFJQUYsWUFBSXBGLElBQUosQ0FBUyx3QkFBVCxFQUFtQ0gsVUFBbkMsQ0FBOEMsT0FBOUMsRUFBdURvQixXQUF2RCxDQUFtRSxnQkFBbkUsRUFBcUZVLE1BQXJGLEdBQThGakMsUUFBOUYsQ0FBdUcsU0FBdkc7O0FBRUEwRixZQUFJcEYsSUFBSixDQUFTLHdCQUFULEVBQW1DcEIsR0FBbkMsQ0FBdUMsU0FBdkMsRUFBa0QsTUFBbEQsRUFBMERxQyxXQUExRCxDQUFzRSxnQkFBdEU7O0FBSUFtRSxZQUFJcEYsSUFBSixDQUFTLGVBQVQsRUFBMEJOLFFBQTFCLENBQW1DLG9CQUFuQyxFQUF5RGpDLFdBQXpELENBQXFFLG9DQUFyRTs7QUFFQTJILFlBQUlwRixJQUFKLENBQVMsaUJBQVQsRUFBNEJrQixNQUE1QjtBQUVIOztBQUlELFFBQUc5RCxFQUFFRyxNQUFGLEVBQVVxQyxLQUFWLE1BQXFCLEdBQXhCLEVBQTZCOztBQUV6QnVGO0FBRUg7O0FBSUQsUUFBSS9ILEVBQUUsaUJBQUYsRUFBcUJPLE1BQXJCLEdBQThCLENBQWxDLEVBQW9DO0FBQUEsWUFvQ3ZCNEgsV0FwQ3VCLEdBb0NoQyxTQUFTQSxXQUFULEdBQXVCOztBQUVuQm5JLGNBQUUsaUJBQUYsRUFBcUIrRixJQUFyQixDQUEwQixZQUFXOztBQUVqQyxvQkFBSUMsV0FBV2hHLEVBQUUsSUFBRixFQUFRNEMsSUFBUixDQUFhLHFCQUFiLENBQWY7O0FBRUEsb0JBQUlpRCxRQUFRRyxTQUFTM0UsSUFBVCxDQUFjLG1CQUFkLENBQVo7O0FBRUEyRSx5QkFBU3hFLEdBQVQsQ0FBYSxrQkFBYixFQUFpQ3FFLEtBQWpDO0FBRUgsYUFSRCxFQVFHakQsSUFSSCxDQVFRLG9CQVJSLEVBUThCbUQsSUFSOUIsQ0FRbUMsWUFBVzs7QUFFMUMsb0JBQUlDLFdBQVdoRyxFQUFFLElBQUYsRUFBUTRDLElBQVIsQ0FBYSxxQkFBYixDQUFmOztBQUVBLG9CQUFJaUQsUUFBUUcsU0FBUzNFLElBQVQsQ0FBYyxtQkFBZCxDQUFaOztBQUVBMkUseUJBQVN4RSxHQUFULENBQWEsa0JBQWIsRUFBaUNxRSxLQUFqQztBQUVILGFBaEJEO0FBa0JILFNBeEQrQjs7QUFJaEM3RixVQUFFLGlCQUFGLEVBQXFCSSxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxZQUFXOztBQUV4QyxnQkFBSUosRUFBRSxJQUFGLEVBQVF1QyxRQUFSLENBQWlCLFdBQWpCLENBQUosRUFBbUM7O0FBRS9CdkMsa0JBQUUsaUJBQUYsRUFBcUJLLFdBQXJCLENBQWlDLFdBQWpDOztBQUVBTCxrQkFBRSxJQUFGLEVBQVFLLFdBQVIsQ0FBb0IsV0FBcEI7QUFFSCxhQU5ELE1BTU87O0FBRUhMLGtCQUFFLGlCQUFGLEVBQXFCSyxXQUFyQixDQUFpQyxXQUFqQzs7QUFFQUwsa0JBQUUsSUFBRixFQUFRc0MsUUFBUixDQUFpQixXQUFqQjtBQUVIO0FBRUosU0FoQkQ7O0FBb0JBdEMsVUFBRUMsUUFBRixFQUFZRyxFQUFaLENBQWUsT0FBZixFQUF3QixVQUFTc0IsQ0FBVCxFQUFZOztBQUVoQyxnQkFBSTFCLEVBQUUwQixFQUFFd0IsTUFBSixFQUFZQyxPQUFaLENBQW9CLGlCQUFwQixFQUF1QzVDLE1BQTNDLEVBQW1EOztBQUVuRFAsY0FBRSxpQkFBRixFQUFxQkssV0FBckIsQ0FBaUMsV0FBakM7O0FBRUFxQixjQUFFMEIsZUFBRjtBQUVILFNBUkQ7O0FBZ0NDK0U7O0FBSURuSSxVQUFFLGlCQUFGLEVBQXFCNEMsSUFBckIsQ0FBMEIsb0JBQTFCLEVBQWdEeEMsRUFBaEQsQ0FBbUQsT0FBbkQsRUFBNEQsWUFBVzs7QUFFbkUsZ0JBQUlnSSxTQUFTcEksRUFBRSxJQUFGLEVBQVFtRCxPQUFSLENBQWdCLGlCQUFoQixDQUFiOztBQUVBLGdCQUFJUSxPQUFPM0QsRUFBRSxJQUFGLEVBQVE0QyxJQUFSLENBQWEscUJBQWIsRUFBb0NlLElBQXBDLEVBQVg7O0FBRUEsZ0JBQUlrQyxRQUFRN0YsRUFBRSxJQUFGLEVBQVE0QyxJQUFSLENBQWEscUJBQWIsRUFBb0N2QixJQUFwQyxDQUF5QyxtQkFBekMsQ0FBWjs7QUFFQSxnQkFBSWdILFFBQVFELE9BQU94RixJQUFQLENBQVkscUJBQVosQ0FBWjs7QUFFQSxnQkFBSTBGLFFBQVFGLE9BQU94RixJQUFQLENBQVkscUJBQVosQ0FBWjs7QUFJQTBGLGtCQUFNckUsR0FBTixDQUFVTixJQUFWOztBQUVBMEUsa0JBQU1FLFFBQU4sQ0FBZSxxQkFBZixFQUFzQ2xILElBQXRDLENBQTJDLG1CQUEzQyxFQUFnRXdFLEtBQWhFOztBQUVBc0M7O0FBSUEsZ0JBQUlDLE9BQU83RixRQUFQLENBQWdCLG9CQUFoQixDQUFKLEVBQTJDOztBQUV2QyxvQkFBSXZDLEVBQUUsSUFBRixFQUFRdUMsUUFBUixDQUFpQiwyQkFBakIsQ0FBSixFQUFtRDs7QUFFaEQ4RiwwQkFBTUUsUUFBTixDQUFlLHFCQUFmLEVBQXNDOUYsVUFBdEMsQ0FBaUQsT0FBakQsRUFBMERrQixJQUExRCxDQUErRCxTQUEvRDs7QUFFQTJFLDBCQUFNOUcsR0FBTixDQUFVLFNBQVYsRUFBcUIsTUFBckI7QUFFSCxpQkFOQSxNQU1NOztBQUVMOEcsMEJBQU03RixVQUFOLENBQWlCLE9BQWpCOztBQUVBNEYsMEJBQU1FLFFBQU4sQ0FBZSxxQkFBZixFQUFzQy9HLEdBQXRDLENBQTBDLFNBQTFDLEVBQXFELE1BQXJEO0FBRUQ7QUFFSDtBQUVKLFNBeENEOztBQTRDQXhCLFVBQUUsK0JBQUYsRUFBbUNJLEVBQW5DLENBQXNDLE9BQXRDLEVBQStDLFVBQVNzQixDQUFULEVBQVk7O0FBRXZELGdCQUFJMEcsU0FBU3BJLEVBQUUsSUFBRixFQUFRbUQsT0FBUixDQUFnQixpQkFBaEIsQ0FBYjs7QUFFQSxnQkFBSW1GLFFBQVFGLE9BQU94RixJQUFQLENBQVkscUJBQVosQ0FBWjs7QUFFQSxnQkFBSXlGLFFBQVFELE9BQU94RixJQUFQLENBQVkscUJBQVosQ0FBWjs7QUFFQSxnQkFBSTRGLFlBQVk5QixTQUFTNEIsTUFBTXJFLEdBQU4sRUFBVCxDQUFoQjs7QUFFQSxnQkFBSXdFLFFBQVEvQixTQUFTNEIsTUFBTXJFLEdBQU4sRUFBVCxJQUF3QixDQUF4QixHQUE0QixHQUE1QixHQUFrQyxHQUE5Qzs7QUFJQXFFLGtCQUFNN0YsVUFBTixDQUFpQixPQUFqQixFQUEwQndCLEdBQTFCLENBQThCd0UsS0FBOUI7O0FBSUEsZ0JBQUlELFlBQVksQ0FBaEIsRUFBbUI7O0FBRWZGLHNCQUFNSSxNQUFOO0FBRUgsYUFKRCxNQUlPOztBQUVISixzQkFBTXJFLEdBQU4sQ0FBVSxJQUFJLEdBQWQ7QUFFSDs7QUFJRG9FLGtCQUFNRSxRQUFOLENBQWUscUJBQWYsRUFBc0MvRyxHQUF0QyxDQUEwQyxTQUExQyxFQUFxRCxNQUFyRDs7QUFFQUUsY0FBRTBCLGVBQUY7QUFFSCxTQWxDRDs7QUFzQ0FwRCxVQUFFLGdDQUFGLEVBQW9DSSxFQUFwQyxDQUF1QyxPQUF2QyxFQUFnRCxZQUFZOztBQUV4RCxnQkFBSWdJLFNBQVNwSSxFQUFFLElBQUYsRUFBUW1ELE9BQVIsQ0FBZ0IsaUJBQWhCLENBQWI7O0FBRUEsZ0JBQUltRixRQUFRRixPQUFPeEYsSUFBUCxDQUFZLHFCQUFaLENBQVo7O0FBRUEsZ0JBQUl5RixRQUFRRCxPQUFPeEYsSUFBUCxDQUFZLHFCQUFaLENBQVo7O0FBRUEsZ0JBQUk0RixZQUFZOUIsU0FBUzRCLE1BQU1yRSxHQUFOLEVBQVQsQ0FBaEI7O0FBRUEsZ0JBQUl3RSxRQUFRL0IsU0FBUzRCLE1BQU1yRSxHQUFOLEVBQVQsSUFBd0IsQ0FBeEIsR0FBNEIsR0FBNUIsR0FBa0MsR0FBOUM7O0FBSUEsZ0JBQUl1RSxZQUFZLENBQWhCLEVBQW1COztBQUVmQyx3QkFBUUEsUUFBUSxDQUFSLEdBQVksQ0FBWixHQUFnQkEsS0FBeEI7O0FBRUFILHNCQUFNckUsR0FBTixDQUFVd0UsS0FBVjs7QUFFQUgsc0JBQU1JLE1BQU47O0FBRUFOLHVCQUFPL0gsV0FBUCxDQUFtQixVQUFuQjtBQUVILGFBVkQsTUFVTzs7QUFFSGdJLHNCQUFNRSxRQUFOLENBQWUscUJBQWYsRUFBc0M5RixVQUF0QyxDQUFpRCxPQUFqRDs7QUFFQTZGLHNCQUFNOUcsR0FBTixDQUFVLFNBQVYsRUFBcUIsTUFBckI7O0FBRUE0Ryx1QkFBTy9ILFdBQVAsQ0FBbUIsV0FBbkI7QUFFSDs7QUFFRCxtQkFBTyxLQUFQO0FBRUgsU0FwQ0Q7QUFzQ0g7O0FBRUQ7Ozs7QUFJQTs7QUFFQSxRQUFJTCxFQUFFLGVBQUYsRUFBbUJPLE1BQW5CLEdBQTRCLENBQWhDLEVBQW1DOztBQUVsQ1AsVUFBRSxlQUFGLEVBQW1CNEMsSUFBbkIsQ0FBd0IsbUJBQXhCLEVBQTZDeEMsRUFBN0MsQ0FBZ0QsT0FBaEQsRUFBeUQsWUFBVTs7QUFFL0QsZ0JBQUdKLEVBQUUsSUFBRixFQUFRdUUsTUFBUixHQUFpQmhDLFFBQWpCLENBQTBCLFNBQTFCLENBQUgsRUFBd0M7O0FBRXBDdkMsa0JBQUUsSUFBRixFQUFRdUUsTUFBUixHQUFpQmxFLFdBQWpCLENBQTZCLFNBQTdCLEVBQXdDdUMsSUFBeEMsQ0FBNkMscUJBQTdDLEVBQW9FcEIsR0FBcEUsQ0FBd0UsU0FBeEUsRUFBbUYsTUFBbkY7QUFFSCxhQUpELE1BSUs7O0FBRUR4QixrQkFBRSxJQUFGLEVBQVF1RSxNQUFSLEdBQWlCakMsUUFBakIsQ0FBMEIsU0FBMUIsRUFBcUNNLElBQXJDLENBQTBDLHFCQUExQyxFQUFpRUgsVUFBakUsQ0FBNEUsT0FBNUU7QUFFSDtBQUVKLFNBWkQ7QUFjQTs7QUFJRDs7QUFFQXpDLE1BQUVDLFFBQUYsRUFBWUcsRUFBWixDQUFlLE9BQWYsRUFBd0IsY0FBeEIsRUFBd0MsWUFBVzs7QUFFL0MsWUFBSUosRUFBRSxJQUFGLEVBQVE0QyxJQUFSLENBQWEsT0FBYixFQUFzQitGLEVBQXRCLENBQXlCLFVBQXpCLENBQUosRUFBMEM7O0FBRXZDM0ksY0FBRSxJQUFGLEVBQVFzQyxRQUFSLENBQWlCLFlBQWpCO0FBRUgsU0FKQSxNQUlNOztBQUVIdEMsY0FBRSxJQUFGLEVBQVFLLFdBQVIsQ0FBb0IsWUFBcEI7QUFFSDtBQUVILEtBWkQ7O0FBZ0JBTCxNQUFFQyxRQUFGLEVBQVlHLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHNCQUF4QixFQUFnRCxZQUFXOztBQUV2RCxZQUFHSixFQUFFLElBQUYsRUFBUXVDLFFBQVIsQ0FBaUIsWUFBakIsQ0FBSCxFQUFrQzs7QUFFOUJ2QyxjQUFFLElBQUYsRUFBUUssV0FBUixDQUFvQixZQUFwQjtBQUVILFNBSkQsTUFJSzs7QUFFREwsY0FBRSxJQUFGLEVBQVFzQyxRQUFSLENBQWlCLFlBQWpCO0FBRUg7QUFFSixLQVpEO0FBY0gsQ0FsL0JEOztBQW8vQkkiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKHdpbmRvdykub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcclxuICAgICAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXHJcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcclxuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcclxuICAgICAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmVyZ2U6IDUwMCxcclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgLy8gaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCkge1xyXG4gICAgLy8gICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgIC8vICAgICAgICAgbWFzazogXCIrNyAoOTk5KSA5OTktOTktOTlcIixcclxuICAgIC8vICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xyXG4gICAgICAgICQoJy5tYWluJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcclxuICAgIH1tYWluT2Zmc2V0KCk7XHJcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xyXG4gICAgXHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXHJcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDgwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZiAgICBcclxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCd9LCAzMDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpeyAgICBcclxuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIGlmICgkKCcubWFpbicpLmhhc0NsYXNzKCdjYXRhbG9nJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuY3NzKCdib3R0b20nLCA3MCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9TdG9wIGRyYWdcclxuICAgICQoXCJpbWdcIikub24oXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7ZXZlbnQucHJldmVudERlZmF1bHQoKX0pO1xyXG5cclxuICAgIC8vRm9vdGVyIG1lZGlhIDw9IDQ4MCB0cmFuc2Zvcm0gYWNjb3JkZW9uXHJcbiAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICBsZXQgZm9vdGVyID0gJCgnLmpzLWZvb3RlcicpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW0nKS5hZGRDbGFzcygnYWNjb3JkZW9uX19pdGVtJykud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT09ICcnID8gJ2hpZGRlbicgOiAnJztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICAvL1doZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaGFtYnVyZ2VyLCAuanMtbmF2LW1haW4sIC5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoJy5qcy1oYW1idXJnZXInKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIC8vTW9iaWxlIE5hdlxyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnByZXBlbmRUbygnLndyYXBwZXIgJyk7XHJcbiAgICAgICAgJCgnLmpzLW1haW4tbmF2LWxpbmstLWZvcndhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBtYWluRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9fZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAgICAgICBsZXQgYmxvY2sgPSAkKCc8bGkgY2xhc3M9XCJuYXYtZHJvcGRvd25fX3RpdGxlIG5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXBcIj4nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBibG9jay5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpLnRleHQodGl0bGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICFuYXZJdGVtRHJvcGRvd24uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAhbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTsgICBcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcCcpLnJlbW92ZSgpOyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiBuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLnJlbW92ZUF0dHIoJ3N0eWxlJyk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7ICAgICBcclxuXHJcbiAgICAgICAgIC8vTW9iaWxlIFNlYXJjaFxyXG4gICAgICAgIHZhciBzZWFyY2ggPSAkKCcuanMtc2VhcmNoJyk7XHJcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xyXG5cclxuICAgICAgICAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xyXG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pOyAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBoZWFkZXJNYWluID0gJCgnLmhlYWRlci1tYWluJyk7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW5DbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItbWFpbi0tY2xvbmVcIj4nKS5jc3MoJ2hlaWdodCcsIDg1KS5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJykuaGlkZSgpO1xyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49ICQoJy5oZWFkZXJfX3RvcC1saW5lJykub3V0ZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW4ucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1Nob3cgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcykubmV4dCgpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJykuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcbiAgICB9KTtcclxuICAgIC8vSGlkZSBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wcmV2KCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYnRuIGZhdm9yaXRlXHJcbiAgICAkKCcuanMtYnV0dG9uLWljb24tLWZhdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgKiBTbGlkZXIuanNcclxuICAgICovXHJcblxyXG4gICAgLy8gLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cclxuXHJcbiAgICAvL1NsaWRlciBOZXdcclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tbmV3JykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tcHJldicsXHJcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSwge1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICB9LCB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIH0sIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzMjEsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfV1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIENhcmRcclxuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykuc2xpY2soe1xyXG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG5cclxuICAgICAgICBmYWRlOiB0cnVlLFxyXG5cclxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JyxcclxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW3tcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgZG90czogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB9XVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2Jykuc2xpY2soe1xyXG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDYsXHJcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQnLFxyXG5cclxuICAgICAgICBkb3RzOiB0cnVlLFxyXG5cclxuICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG5cclxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxyXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgfSx7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcblxyXG4gICAgICAgICAgICBzZXR0aW5nczogXCJ1bnNsaWNrXCJcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgfV1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL1NsaWRlciBQcm9tb1xyXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tbmV4dCcsXHJcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tcHJldicsXHJcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcblxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWVcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcclxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxyXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxyXG5cclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgfSx7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0se1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfV1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAqIENhdGFsb2cuanNcclxuICAgICovXHJcblxyXG4gICAgJCgnLmpzLXByb2R1Y3QtaXRlbScpLmZpbmQoJy5jb2xvcl9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBcdGxldCBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtcHJvZHVjdC1pdGVtJyk7XHJcblxyXG4gICAgXHRsZXQgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG4gICAgXHRsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgIFx0aW1nLmF0dHIoJ3NyYycsIGNvbG9yKTtcclxuXHJcbiAgICBcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL0NoYW5nZXJcclxuXHJcbiAgICAkKCcuanMtY2hhbmdlcicpLmZpbmQoJy5jaGFuZ2VyX19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgXHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgXHRcdHJldHVybjtcclxuXHJcbiAgICBcdH0gZWxzZSB7XHJcblxyXG4gICAgXHRcdCQoJy5qcy1jaGFuZ2VyJykuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIFx0XHQkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgXHRcdHJldHVybjtcclxuXHJcbiAgICBcdH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAkKCcuanMtY2hhbmdlcicpLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBcdGxldCBpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5jaGFuZ2VyX19pdGVtJyk7XHJcblxyXG4gICAgXHRpZiAoaXRlbS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKXtcclxuXHJcbiAgICBcdFx0aXRlbS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIFx0fVxyXG5cclxuICAgIFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fc3ViaXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgXHR2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29sb3InKTtcclxuXHJcbiAgICBcdHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2ZpbHRlci1jb2xvcicpO1xyXG5cclxuICAgIFx0Y29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG5cclxuICAgIFx0JCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKS5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGlmICgkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbS1wcmljZScpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgdmFyIGFsbFByaWNlU3RhcnQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnc3RhcnQnKTtcclxuXHJcbiAgICAgICAgdmFyIGFsbFByaWNlRW5kID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xyXG5cclxuICAgICAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0UHJpY2U7XHJcblxyXG4gICAgICAgIHZhciBlbmRQcmljZTtcclxuXHJcbiAgICAgICAgdmFyIGFyclBhcmFtcztcclxuXHJcbiAgICAgICAgdmFyIHNVcmw7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIGlmIChzcGFuc1swXS50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBhbGxQcmljZVN0YXJ0O1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzBdLnRleHQoKSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICAgICBpZiAoc3BhbnNbMV0udGV4dCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZW5kUHJpY2UgPSBwYXJzZUludChzcGFuc1sxXS50ZXh0KCkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xyXG5cclxuICAgICAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAnbWluJzogYWxsUHJpY2VTdGFydCxcclxuXHJcbiAgICAgICAgICAgICAgICAnbWF4JzogYWxsUHJpY2VFbmRcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNsaWRlci5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAodmFsdWVzLCBoYW5kbGUpIHtcclxuXHJcbiAgICAgICAgICAgIHNwYW5zW2hhbmRsZV0udGV4dCgodmFsdWVzW2hhbmRsZV0pKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vQ2F0YWxvZyBGaWx0ZXIgQWN0aW9uXHJcblxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHRcclxuXHJcbiAgICBcdCQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgXHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcdFxyXG5cclxuICAgIFx0JCgnLmpzLWNhdGFsb2ctZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICBcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAqIENhcmQuanNcclxuICAgICovXHJcblxyXG4gICAgLy9jYXJkIHRhYnNcclxuXHJcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpLnRhYnMoKTtcclxuXHJcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCcpLmZpbmQoJy50YWJfX3RpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKS5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soJ3NldFBvc2l0aW9uJyk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYgKCAkKCcuanMtdGFiJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFiJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0YWJzKTsgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8v0KLQsNCx0YtcclxuXHJcbiAgICBmdW5jdGlvbiB0YWJzKGUpIHtcclxuXHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAndGFiX190aXRsZScpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhVGFiICAgID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0YWJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fY29udGVudCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhYlRpdGxlICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX190aXRsZScpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJUaXRsZS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIHRhYlRpdGxlW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ICAgXHJcblxyXG4gICAgfSBcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL3RhYnMgLS0tPiBhY2NvcmRlb25cclxuXHJcbiAgICBmdW5jdGlvbiB0YWJUcmFuc2Zvcm0oKXtcclxuXHJcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtdGFiJykudW53cmFwKCkuYWRkQ2xhc3MoJ2FjY29yZGVvbiBhY2NvcmRlb24tLW90aGVyIGpzLWFjY29yZGVvbicpLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlcycpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpLndyYXAoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb25fX2l0ZW1cIj4nKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMFwiXScpLnJlbW92ZUF0dHIoJ3N0eWxlJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjBcIl0nKS5wYXJlbnQoKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKS5yZW1vdmVDbGFzcygndGFiX19jb250ZW50IHRhYl9fY29udGVudC0tcHJvZHVjdCcpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGlmKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG5cclxuICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgaWYgKCQoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCA+IDApe1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTsgXHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VDb2xvcigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICB9KS5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgfSk7ICAgICAgICBcclxuXHJcbiAgICAgICAgfWNoYW5nZUNvbG9yKCk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpLnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb2xvciA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIGlucHV0LnZhbCh0ZXh0KTtcclxuXHJcbiAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX2NvbG9yJykuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InLCBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VDb2xvcigpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdC5oYXNDbGFzcygnaXRlbS1zZWxlY3QtLWNvdW50JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXRlbS1zZWxlY3RfX2l0ZW0tLWhlYWRlcicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5yZW1vdmVBdHRyKCdzdHlsZScpLnRleHQoJ9CS0YvQsdGA0LDRgtGMJyk7IFxyXG5cclxuICAgICAgICAgICAgICAgICAgIGlucHV0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pOyAgICBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0LWNvbnRyb2wtLXBsdXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cmVudFZhbCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKSArIDEgKyAnICcgKyAn0LwnO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKS52YWwoY291bnQpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKGN1cmVudFZhbCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jaGFuZ2UoKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKDEgKyAn0LwnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QtY29udHJvbC0tbWludXMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cmVudFZhbCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKSAtIDEgKyAnICcgKyAn0LwnO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKGN1cmVudFZhbCA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IGNvdW50IDwgMSA/IDEgOiBjb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwoY291bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LmNoYW5nZSgpOyAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3QucmVtb3ZlQ2xhc3MoJ2lzLWNsb3NlJyk7ICAgICBcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAqIENvbXBvbmVudHMuanNcclxuICAgICovXHJcblxyXG4gICAgLy9BY2NvcmRlb25cclxuXHJcbiAgICBpZiAoJCgnLmpzLWFjY29yZGVvbicpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICBcdCQoJy5qcy1hY2NvcmRlb24nKS5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgXHQgICAgaWYoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnaXMtb3BlbicpKXtcclxuXHJcbiAgICBcdCAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgIFx0ICAgIH1lbHNle1xyXG5cclxuICAgIFx0ICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdpcy1vcGVuJykuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgXHQgICAgfSAgIFxyXG5cclxuICAgIFx0fSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vY2hlY2tib3hcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94JywgZnVuY3Rpb24gKCl7XHJcblxyXG4gICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2lucHV0JykuaXMoJzpjaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24gKCl7XHJcblxyXG4gICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSl7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbiAgICAvKlxyXG4gICAgKiBGdW5jdGlvbnMuanNcclxuICAgICovXHJcblxyXG4gICAgIl19
