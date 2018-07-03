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
        cardSlider();
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
        sliderRelated();
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

    $(document).on('click', '.js-related-tab', function () {
        $(this).closest('.js-card-tab-related').find('.js-bz-slider--related').slick('setPosition');
    });

    // $('.js-card-tab-related')
    //     .find('.tab__title')
    //     .on('click', function() {
    //         $(this)
    //             .closest('.js-card-tab-related')
    //             .find('.js-bz-slider--related')
    //             .slick('setPosition');
    //     });

    if ($(window).width() > 480) {
        $(document).on('click', '.js-tab', tabs);
    }

    $('#preview').on('shown.bs.modal', function (e) {
        $('.js-bz-slider--card').resize();
    });

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

    //Card Item Select
    changeColor();

    $(document).on('click', '.js-item-select', function () {
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

    $(document).on('click', '.js-item-select-item', function () {
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

    /*
    * Contacts.js
    */

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
    var pushContainer = $('<div>').addClass('pushUp');
    var pushUpClose = $('<i class="fal fa-times"></i>').addClass('pushUp__close js-pushUp--close');
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

//CardSliderFunction
function cardSlider() {
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

//sliderRelated
function sliderRelated() {
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

//Select Item changeColor
function changeColor() {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJjbGljayIsImVsZW1lbnRDbGljayIsImF0dHIiLCJkZXN0aW5hdGlvbiIsIm9mZnNldCIsInRvcCIsInNjcm9sbCIsImhlaWdodCIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJibG9jayIsImluc2VydEFmdGVyIiwicmVtb3ZlIiwic2VhcmNoIiwic2VhcmNoQnRuU2hvdyIsInZhbCIsImhlYWRlck1haW4iLCJoZWFkZXJNYWluQ2xvbmUiLCJoaWRlIiwic2hvdyIsIm5leHQiLCJwYXJlbnQiLCJwcmV2Iiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhcnJvd3MiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiYXV0b3BsYXkiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInZhcmlhYmxlV2lkdGgiLCJjYXJkU2xpZGVyIiwic2xpZGVyUmVsYXRlZCIsIml0ZW0iLCJjb2xvciIsImltZyIsImVhY2giLCJjb2xvckJveCIsInNsaWRlciIsImdldEVsZW1lbnRCeUlkIiwiYWxsUHJpY2VTdGFydCIsImFsbFByaWNlRW5kIiwic3BhbnMiLCJzdGFydFByaWNlIiwiZW5kUHJpY2UiLCJwYXJzZUludCIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsImNvbm5lY3QiLCJyYW5nZSIsIm1pbiIsIm1heCIsInZhbHVlcyIsImhhbmRsZSIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwidGFicyIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImFjY29yZGVyb24iLCJub3QiLCJzbGlkZVVwIiwic2xpZGVEb3duIiwiaXMiLCJwdXNoVXAiLCJwdXNoQ29udGFpbmVyIiwicHVzaFVwQ2xvc2UiLCJhcHBlbmRUbyIsInJhZiIsInNldFRpbWVvdXQiLCJmbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJmYWRlIiwiYXNOYXZGb3IiLCJmb2N1c09uU2VsZWN0IiwiY2VudGVyTW9kZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekJGLE1BQUVHLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM1QkosVUFBRSxNQUFGLEVBQVVLLFdBQVYsQ0FBc0IsU0FBdEI7O0FBRUE7QUFDQSxZQUFJQyxZQUFZTixFQUFFLFlBQUYsQ0FBaEI7QUFDQSxZQUFJTSxVQUFVQyxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3RCRCxzQkFBVUUsVUFBVixDQUFxQjtBQUNqQkMsNkJBQWEsU0FESTtBQUVqQkMsa0NBQWtCLEtBRkQ7QUFHakI7QUFDQUMseUJBQVMsS0FKUTtBQUtqQkMsdUJBQU8sR0FMVTtBQU1qQkMsNkJBQWEsS0FOSTtBQU9qQkMsOEJBQWMsTUFQRztBQVFqQkMsb0NBQW9CO0FBUkgsYUFBckI7QUFVQVQsc0JBQVVVLFNBQVYsQ0FBb0IsWUFBVztBQUMzQmhCLGtCQUFFLElBQUYsRUFDS2lCLGFBREwsR0FFS0MsTUFGTDtBQUdILGFBSkQ7QUFLSDtBQUNKLEtBdEJEOztBQXdCQTtBQUNBLFFBQUlsQixFQUFFLFlBQUYsRUFBZ0JPLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQUEsWUFjbkJZLFVBZG1CLEdBYzVCLFNBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO0FBQ3JCQyxvQkFBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSxnQkFBSSxDQUFDRixJQUFJRyxFQUFULEVBQWE7QUFDVCx1QkFBT0gsSUFBSUksSUFBWDtBQUNIO0FBQ0QsZ0JBQUlDLFdBQVd6QixFQUFFb0IsSUFBSU0sT0FBTixFQUFlQyxJQUFmLENBQW9CLE9BQXBCLENBQWY7QUFDQSxnQkFBSSxDQUFDRixRQUFMLEVBQWU7QUFDWCx1QkFBT0wsSUFBSUks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XG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuXG4gICAgICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2VsZWN0LnNlbGVjdC13aXRoLWljb24nKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljLFxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbWFnZSBzZWxlY3QnKTtcbiAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcbiAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwic29ydGluZy1pY29uIHNvcnRpbmctaWNvbi0tJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDAgfHwgJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJzk5LTk5LTk5OTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XG4gICAgICAgICQoJy5tYWluJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcbiAgICB9XG4gICAgbWFpbk9mZnNldCgpO1xuICAgICQod2luZG93KS5yZXNpemUobWFpbk9mZnNldCk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDgwMCk7XG4gICAgfSk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnIH0sIDMwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuY3NzKCdib3R0b20nLCA3MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvL0Zvb3RlciBtZWRpYSA8PSA0ODAgdHJhbnNmb3JtIGFjY29yZGVvblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgbGV0IGZvb3RlciA9ICQoJy5qcy1mb290ZXInKTtcbiAgICAgICAgZm9vdGVyXG4gICAgICAgICAgICAuZmluZCgnLmZvb3Rlci1pdGVtJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgICAgIC53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50Jyk7XG4gICAgfVxuXG4gICAgLy9IYW1idXJnZXIgYnRuXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID1cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PT0gJycgPyAnaGlkZGVuJyA6ICcnO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgLy9XaGVuIGNsaWNrIG91dHNpZGVcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXG4gICAgICAgICAgICAgICAgJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93J1xuICAgICAgICAgICAgKS5sZW5ndGhcbiAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkKCcuanMtaGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgLy9Nb2JpbGUgTmF2XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnByZXBlbmRUbygnLndyYXBwZXIgJyk7XG4gICAgICAgICQoJy5qcy1tYWluLW5hdi1saW5rLS1mb3J3YXJkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IG5hdkl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93bjIgPSBuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBtYWluRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9fZHJvcGRvd24nKTtcblxuICAgICAgICAgICAgbGV0IHRpdGxlID0gJCh0aGlzKS50ZXh0KCk7XG4gICAgICAgICAgICBsZXQgYmxvY2sgPSAkKFxuICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJuYXYtZHJvcGRvd25fX3RpdGxlIG5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXBcIj4nXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSlcbiAgICAgICAgICAgICAgICAgICAgLnRleHQodGl0bGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICFuYXZJdGVtRHJvcGRvd24uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgIShcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXAnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaFxuICAgICAgICB2YXIgc2VhcmNoID0gJCgnLmpzLXNlYXJjaCcpO1xuICAgICAgICB2YXIgc2VhcmNoQnRuU2hvdyA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93Jyk7XG5cbiAgICAgICAgc2VhcmNoQnRuU2hvdy5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlYXJjaC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93LCAuanMtc2VhcmNoJylcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBoZWFkZXJNYWluID0gJCgnLmhlYWRlci1tYWluJyk7XG4gICAgICAgIGxldCBoZWFkZXJNYWluQ2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLW1haW4tLWNsb25lXCI+JylcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIDg1KVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCcuaGVhZGVyLW1haW4nKVxuICAgICAgICAgICAgLmhpZGUoKTtcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49ICQoJy5oZWFkZXJfX3RvcC1saW5lJykub3V0ZXJIZWlnaHQoKSkge1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW4uYWRkQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLnJlbW92ZUNsYXNzKCdoZWFkZXItLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9TaG93IFBhc3N3b3JkXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLm5leHQoKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgIH0pO1xuICAgIC8vSGlkZSBQYXNzd29yZFxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wcmV2KClcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICB9KTtcblxuICAgIC8vYnRuIGZhdm9yaXRlXG4gICAgJCgnLmpzLWJ1dHRvbi1pY29uLS1mYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLypcbiAgICAqIFNsaWRlci5qc1xuICAgICovXG5cbiAgICAvLyAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xuICAgIC8vU2xpZGVyIE5ld1xuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLW5ldycpLnNsaWNrKHtcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzMjEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vU2xpZGVyIENhcmRcbiAgICBpZiAoXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5sZW5ndGggPiAwICYmXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JykubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgICBjYXJkU2xpZGVyKCk7XG4gICAgfVxuICAgIFxuICAgIC8vU2xpZGVyIFByb21vXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXByb21vJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy9TbGlkZXIgUmVsYXRlZFxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xuICAgICAgICBzbGlkZXJSZWxhdGVkKCk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqIENhdGFsb2cuanNcbiAgICAqL1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jb2xvci1pdGVtJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXByb2R1Y3QtaXRlbScpO1xuICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XG4gICAgICAgIGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XG4gICAgXG4gICAgICAgIGltZy5hdHRyKCdzcmMnLCBjb2xvcik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0NoYW5nZXJcbiAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX3Jlc2V0JylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5jaGFuZ2VyX19pdGVtJyk7XG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJylcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29sb3InKTtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2ZpbHRlci1jb2xvcicpO1xuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcbiAgICAgICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcbiAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcbiAgICAgICAgICAgIC5yZXNpemUoKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtLXByaWNlJykubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpO1xuICAgICAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnZW5kJyk7XG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xuICAgICAgICB2YXIgc3RhcnRQcmljZTtcbiAgICAgICAgdmFyIGVuZFByaWNlO1xuICAgIFxuICAgICAgICBpZiAoc3BhbnNbMF0udGV4dCgpID09ICcnKSB7XG4gICAgICAgICAgICBzdGFydFByaWNlID0gYWxsUHJpY2VTdGFydDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBwYXJzZUludChzcGFuc1swXS50ZXh0KCkpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcbiAgICAgICAgICAgIGVuZFByaWNlID0gYWxsUHJpY2VFbmQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXG4gICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgIG1pbjogYWxsUHJpY2VTdGFydCxcbiAgICAgICAgICAgICAgICBtYXg6IGFsbFByaWNlRW5kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIHNwYW5zW2hhbmRsZV0udGV4dCh2YWx1ZXNbaGFuZGxlXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvL0NhdGFsb2cgRmlsdGVyIEFjdGlvblxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB9KTtcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XG4gICAgfSk7XG4gICAgXG4gICAgLy9TdGlja3kgQmxvY2sgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXG4gICAgaWYgKCQoJy5qcy1zdGlreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5Jywge1xuICAgICAgICAgICAgdG9wU3BhY2luZzogODUsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAyMCxcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktaW5uZXInXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiBDYXJkLmpzXG4gICAgKi9cblxuICAgIC8vY2FyZCB0YWJzXG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKS50YWJzKCk7XG4gICAgXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1yZWxhdGVkLXRhYicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKVxuICAgICAgICAgICAgLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKVxuICAgICAgICAgICAgLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJylcbiAgICAvLyAgICAgLmZpbmQoJy50YWJfX3RpdGxlJylcbiAgICAvLyAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgJCh0aGlzKVxuICAgIC8vICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpXG4gICAgLy8gICAgICAgICAgICAgLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKVxuICAgIC8vICAgICAgICAgICAgIC5zbGljaygnc2V0UG9zaXRpb24nKTtcbiAgICAvLyAgICAgfSk7XG4gICAgXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdGFiJywgdGFicyk7XG4gICAgfVxuICAgIFxuICAgICQoJyNwcmV2aWV3Jykub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykucmVzaXplKCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy90YWJzIC0tLT4gYWNjb3JkZW9uXG4gICAgZnVuY3Rpb24gdGFiVHJhbnNmb3JtKCkge1xuICAgICAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XG4gICAgXG4gICAgICAgICQoJy5qcy10YWInKVxuICAgICAgICAgICAgLnVud3JhcCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbiBhY2NvcmRlb24tLW90aGVyIGpzLWFjY29yZGVvbicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpXG4gICAgICAgICAgICAud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xuICAgIFxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJylcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjBcIl0nKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMVwiXScpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIxXCJdJyk7XG4gICAgXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX19jb250ZW50IHRhYl9fY29udGVudC0tcHJvZHVjdCcpO1xuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XG4gICAgfVxuICAgIFxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XG4gICAgfVxuICAgIFxuICAgIC8vQ2FyZCBJdGVtIFNlbGVjdFxuICAgIGNoYW5nZUNvbG9yKCk7XG4gICAgXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1pdGVtLXNlbGVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICAgIFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaXRlbS1zZWxlY3QtaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcbiAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpXG4gICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAudGV4dCgpO1xuICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpXG4gICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpXG4gICAgICAgICAgICAuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcbiAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcbiAgICBcbiAgICAgICAgaW5wdXQudmFsKHRleHQpO1xuICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X19jb2xvcicpLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJywgY29sb3IpO1xuICAgIFxuICAgICAgICBjaGFuZ2VDb2xvcigpO1xuICAgIFxuICAgICAgICBpZiAoc2VsZWN0Lmhhc0NsYXNzKCdpdGVtLXNlbGVjdC0tY291bnQnKSkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0X19pdGVtLS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQktGL0LHRgNCw0YLRjCcpO1xuICAgICAgICAgICAgICAgIGlucHV0LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG5cbiAgICAvKlxuICAgICogQ29udGFjdHMuanNcbiAgICAqL1xuXG4gICAgXG5cbiAgICAvKlxuICAgICogQ29tcG9uZW50cy5qc1xuICAgICovXG5cbiAgICAvL0FjY29yZGVvblxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgYWNjb3JkZXJvbiA9ICQoJy5qcy1hY2NvcmRlb24nKTtcbiAgICBcbiAgICAgICAgYWNjb3JkZXJvblxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKVxuICAgICAgICAgICAgLm5vdCgnOmZpcnN0JylcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5zbGlkZVVwKCk7XG4gICAgICAgIGFjY29yZGVyb25cbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtOmZpcnN0JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAuc2xpZGVEb3duKCk7XG4gICAgXG4gICAgICAgIGFjY29yZGVyb24uZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhY2NvcmRlcm9uLmhhc0NsYXNzKCdsa19fYWNjb3JkZW9uJykpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9GB0LrRgNGL0YLRjCcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9C/0L7QtNGA0L7QsdC90LXQtScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy9jaGVja2JveFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXG4gICAgICAgICkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9jaGVja2JveC0tcHNldWRvXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vZHJvcGRvd25cbiAgICBpZiAoJCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWRyb3Bkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqTGsuanNcbiAgICAqL1xuXG4gICAgLy9TdGlja3kgQmxvY2sgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXG4gICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5LWJsb2NrJywge1xuICAgICAgICAgICAgdG9wU3BhY2luZzogMTM1LFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWJsb2NrX19pbm5lcidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufSk7XG5cbi8qXG4gICAgKiBGdW5jdGlvbnMuanNcbiAgICAqL1xuXG4vL1B1c2hVcFxuZnVuY3Rpb24gcHVzaFVwKHRleHQpIHtcbiAgICB2YXIgdGV4dCA9IHRleHQgfHwgJ9Ci0L7QstCw0YAg0LTQvtCx0LDQstC70LXQvSDQsiDQutC+0YDQt9C40L3Rgyc7XG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdwdXNoVXAnKTtcbiAgICB2YXIgcHVzaFVwQ2xvc2UgPSAkKCc8aSBjbGFzcz1cImZhbCBmYS10aW1lc1wiPjwvaT4nKS5hZGRDbGFzcyhcbiAgICAgICAgJ3B1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcbiAgICApO1xuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcbiAgICBwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XG4gICAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XG5cbiAgICByYWYoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSwgMzUwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH0sIDQwMDApO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoVXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9KTtcbn1cblxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbmZ1bmN0aW9uIHJhZihmbikge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmbigpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy/QotCw0LHRi1xuZnVuY3Rpb24gdGFicyhlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09ICd0YWJfX3RpdGxlJykge1xuICAgICAgICB2YXIgZGF0YVRhYiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XG4gICAgICAgIHZhciB0YWJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fY29udGVudCcpO1xuICAgICAgICB2YXIgdGFiVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX190aXRsZScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy9DYXJkU2xpZGVyRnVuY3Rpb25cbmZ1bmN0aW9uIGNhcmRTbGlkZXIoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogJ3Vuc2xpY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuLy9zbGlkZXJSZWxhdGVkXG5mdW5jdGlvbiBzbGlkZXJSZWxhdGVkKCkge1xuICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljayh7XG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogOCxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cbi8vU2VsZWN0IEl0ZW0gY2hhbmdlQ29sb3JcbmZ1bmN0aW9uIGNoYW5nZUNvbG9yKCkge1xuICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICB9KVxuICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19pdGVtJylcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgIH0pO1xufVxuXG4iXX0=
