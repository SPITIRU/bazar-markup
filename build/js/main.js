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
    * Components.js
    */

    //Accordeon
    if ($('.js-accordeon').length > 0) {
        var accorderon = $('.js-accordeon');

        accorderon.find('.accordeon__item').not(':first').find('.accordeon__content').slideUp();
        accorderon.find('.accordeon__item:first').addClass('is-open').find('.accordeon__content').slideDown();

        $(document).on('click', '.accordeon__title', function () {
            if ($(this).parent().hasClass('is-open')) {
                $(this).parent().removeClass('is-open').find('.accordeon__content').slideUp();
            } else {
                $(this).parent().addClass('is-open').find('.accordeon__content').slideDown();
            }
        });
        if (accorderon.hasClass('lk__accordeon')) {
            $(this).find('.accordeon__item').filter(':first').removeClass('is-open').find('.accordeon__content').slideUp();
            $(this).find('.accordeon__title').on('click', function () {
                if ($(this).parent().hasClass('is-open')) {
                    $(this).find('.user-order__info').text('подробнее');
                } else {
                    $(this).find('.user-order__info').text('скрыть');
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
* Slider.js
*/

$(document).ready(function () {
    //Slick Slider https://kenwheeler.github.io/slick/

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

    if ($('.js-bz-slider--card-modal').length > 0 && $('.js-bz-slider--card-nav-modal').length > 0) {
        modalSlider();
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
    if ($('.js-bz-slider--related-modal').length > 0) {
        sliderRelatedModal();
    }
});

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

function modalSlider() {
    $('.js-bz-slider--card-modal').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.js-bz-slider--card-nav-modal',
        responsive: [{
            breakpoint: 481,
            settings: {
                dots: true,
                fade: false
            }
        }]
    });
    $('.js-bz-slider--card-nav-modal').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        asNavFor: '.js-bz-slider--card-modal',
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

function sliderRelatedModal() {
    $('.js-bz-slider--related-modal').slick({
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
* Card.js
*/

$(document).ready(function () {
    //card properties tabs
    $('.js-card-tab-related, .js-card-tab-related--modal').tabs();

    $(document).on('click', '.js-related-tab', function () {
        $(this).closest('.js-card-tab-related--modal').find('.js-bz-slider--related-modal').slick('setPosition');
        $(this).closest('.js-card-tab-related').find('.js-bz-slider--related').slick('setPosition');
    });

    if ($(window).width() > 480) {
        $(document).on('click', '.js-tab', tabs);
        $(document).on('click', '.js-tab-modal', tabs);
    }

    $('#preview').on('shown.bs.modal', function (e) {
        $('.js-bz-slider--card-modal').resize();
        $('.js-bz-slider--related-modal').resize();

        if ($(window).width() <= 480) {
            tabTransform();
        }
    });

    //tabs ---> accordeon
    function tabTransform() {
        var tab = $('.js-tab--transform');

        $('.js-tab, .js-tab-modal').unwrap().addClass('accordeon accordeon--other js-accordeon').removeClass('tab__titles');
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
});

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

//Tabs
function tabs(e) {
    var target = e.target;
    if (target.className == 'tab__title') {
        var dataTab = target.getAttribute('data-tab');
        var tabContent = $(this).parent().find('.tab__content');
        var tabTitle = $(this).parent().find('.tab__title');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJvbiIsInJlbW92ZUNsYXNzIiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsIm1haW5PZmZzZXQiLCJjc3MiLCJvdXRlckhlaWdodCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJjbGljayIsImVsZW1lbnRDbGljayIsImF0dHIiLCJkZXN0aW5hdGlvbiIsIm9mZnNldCIsInRvcCIsInNjcm9sbCIsImhlaWdodCIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsImZpbmQiLCJ3cmFwQWxsIiwidG9nZ2xlQ2xhc3MiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIm92ZXJmbG93IiwidGFyZ2V0IiwiY2xvc2VzdCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXBlbmRUbyIsIm5hdkl0ZW0iLCJuYXZJdGVtRHJvcGRvd24iLCJuYXZJdGVtRHJvcGRvd24yIiwibWFpbkRyb3Bkb3duIiwidGl0bGUiLCJibG9jayIsImluc2VydEFmdGVyIiwicmVtb3ZlIiwic2VhcmNoIiwic2VhcmNoQnRuU2hvdyIsInZhbCIsImhlYWRlck1haW4iLCJoZWFkZXJNYWluQ2xvbmUiLCJoaWRlIiwic2hvdyIsIm5leHQiLCJwYXJlbnQiLCJwcmV2IiwiaXRlbSIsImNvbG9yIiwiaW1nIiwiZWFjaCIsImNvbG9yQm94Iiwic2lkZWJhciIsIlN0aWNreVNpZGViYXIiLCJ0b3BTcGFjaW5nIiwiYm90dG9tU3BhY2luZyIsImNvbnRhaW5lclNlbGVjdG9yIiwiaW5uZXJXcmFwcGVyU2VsZWN0b3IiLCJhY2NvcmRlcm9uIiwibm90Iiwic2xpZGVVcCIsInNsaWRlRG93biIsImZpbHRlciIsImlzIiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhcnJvd3MiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiYXV0b3BsYXkiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInZhcmlhYmxlV2lkdGgiLCJjYXJkU2xpZGVyIiwibW9kYWxTbGlkZXIiLCJzbGlkZXJSZWxhdGVkIiwic2xpZGVyUmVsYXRlZE1vZGFsIiwiZmFkZSIsImFzTmF2Rm9yIiwiZm9jdXNPblNlbGVjdCIsImNlbnRlck1vZGUiLCJ0YWJzIiwidGFiVHJhbnNmb3JtIiwidGFiIiwidW53cmFwIiwid3JhcCIsImNoYW5nZUNvbG9yIiwic2VsZWN0IiwidmFsdWUiLCJpbnB1dCIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJ0YWJUaXRsZSIsImkiLCJjbGFzc0xpc3QiLCJhZGQiLCJkaXNwbGF5IiwicHVzaFVwIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwiYXBwZW5kVG8iLCJyYWYiLCJzZXRUaW1lb3V0IiwiZm4iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZ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QVlDLFFBQVosQ0FBcUJGLGFBQXJCOztBQUVBRyxRQUFJLFlBQVc7QUFDWEgsc0JBQWM5RixRQUFkLENBQXVCLFdBQXZCO0FBQ0gsS0FGRDs7QUFJQWtHLGVBQVcsWUFBVztBQUNsQkosc0JBQWM1SSxXQUFkLENBQTBCLFdBQTFCO0FBQ0gsS0FGRCxFQUVHLElBRkg7O0FBSUFnSixlQUFXLFlBQVc7QUFDbEJKLHNCQUFjdkUsTUFBZDtBQUNILEtBRkQsRUFFRyxJQUZIOztBQUlBMUUsTUFBRUMsUUFBRixFQUFZRyxFQUFaLENBQWUsT0FBZixFQUF3QixtQkFBeEIsRUFBNkMsWUFBVztBQUNwRDZJLHNCQUFjNUksV0FBZCxDQUEwQixXQUExQjtBQUNBZ0osbUJBQVcsWUFBVztBQUNsQkosMEJBQWN2RSxNQUFkO0FBQ0gsU0FGRCxFQUVHLEdBRkg7QUFHSCxLQUxEO0FBTUg7O0FBRUQ7QUFDQSxTQUFTMEUsR0FBVCxDQUFhRSxFQUFiLEVBQWlCO0FBQ2JuSixXQUFPb0oscUJBQVAsQ0FBNkIsWUFBVztBQUNwQ3BKLGVBQU9vSixxQkFBUCxDQUE2QixZQUFXO0FBQ3BDRDtBQUNILFNBRkQ7QUFHSCxLQUpEO0FBS0giLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgICAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzJjMmIyYicsXG4gICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzY3JvbGxCYXIubW91c2VvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLXNlbGVjdC5zZWxlY3Qtd2l0aC1pY29uJykuc2VsZWN0Mih7XG4gICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpYyxcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFVzZXJQaWMob3B0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW1hZ2Ugc2VsZWN0Jyk7XG4gICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XG4gICAgICAgICAgICBpZiAoIW9wdGltYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgJG9wdCA9ICQoXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInNvcnRpbmctaWNvbiBzb3J0aW5nLWljb24tLScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1hZ2UgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwIHx8ICQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICc5OS05OS05OTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XG4gICAgfVxuICAgIG1haW5PZmZzZXQoKTtcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA4MDApO1xuICAgIH0pO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4JyB9LCAzMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIGlmICgkKCcubWFpbicpLmhhc0NsYXNzKCdjYXRhbG9nJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL1N0b3AgZHJhZ1xuICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XG4gICAgICAgIGZvb3RlclxuICAgICAgICAgICAgLmZpbmQoJy5mb290ZXItaXRlbScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpO1xuICAgIH1cblxuICAgIC8vSGFtYnVyZ2VyIGJ0blxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT09ICcnID8gJ2hpZGRlbicgOiAnJztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxuICAgICAgICAgICAgICAgICcuanMtaGFtYnVyZ2VyLCAuanMtbmF2LW1haW4sIC5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdydcbiAgICAgICAgICAgICkubGVuZ3RoXG4gICAgICAgIClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgIC8vTW9iaWxlIE5hdlxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xuICAgICAgICAkKCcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XG5cbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgbGV0IGJsb2NrID0gJChcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibmF2LWRyb3Bkb3duX190aXRsZSBuYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wXCI+J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KHRpdGxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL01vYmlsZSBTZWFyY2hcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xuXG4gICAgICAgIHNlYXJjaEJ0blNob3cub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaGVhZGVyTWFpbiA9ICQoJy5oZWFkZXItbWFpbicpO1xuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCA4NSlcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJylcbiAgICAgICAgICAgIC5oaWRlKCk7XG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2hvdyBQYXNzd29yZFxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5uZXh0KClcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICB9KTtcbiAgICAvL0hpZGUgUGFzc3dvcmRcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgfSk7XG5cbiAgICAvL2J0biBmYXZvcml0ZVxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgKiBDYXRhbG9nLmpzXG4gICAgKi9cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY29sb3ItaXRlbScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcbiAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xuICAgICAgICBsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xuICAgIFxuICAgICAgICBpbWcuYXR0cignc3JjJywgY29sb3IpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9DaGFuZ2VyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xuICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcbiAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fc3ViaXRlbScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdmaWx0ZXItY29sb3InKTtcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXG4gICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAucmVzaXplKCk7XG4gICAgfVxuICAgIFxuICAgIC8vQ2F0YWxvZyBGaWx0ZXIgQWN0aW9uXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH0pO1xuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcbiAgICB9KTtcbiAgICBcbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcbiAgICBpZiAoJCgnLmpzLXN0aWt5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3knLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiA4NSxcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDIwLFxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuc3Rpa3ktY29udGVudCcsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5zdGlreS1pbm5lcidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqIENvbXBvbmVudHMuanNcbiAgICAqL1xuXG4gICAgLy9BY2NvcmRlb25cbiAgICBpZiAoJCgnLmpzLWFjY29yZGVvbicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IGFjY29yZGVyb24gPSAkKCcuanMtYWNjb3JkZW9uJyk7XG4gICAgXG4gICAgICAgIGFjY29yZGVyb25cbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgICAgIC5ub3QoJzpmaXJzdCcpXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICBhY2NvcmRlcm9uXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbTpmaXJzdCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuICAgIFxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFjY29yZGVvbl9fdGl0bGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhY2NvcmRlcm9uLmhhc0NsYXNzKCdsa19fYWNjb3JkZW9uJykpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAgICAgLmZpbHRlcignOmZpcnN0JylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0L/QvtC00YDQvtCx0L3QtdC1Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0YHQutGA0YvRgtGMJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL2NoZWNrYm94XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2NoZWNrYm94LS1wc2V1ZG9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9kcm9wZG93blxuICAgIGlmICgkKCcuanMtZHJvcGRvd24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZHJvcGRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICpMay5qc1xuICAgICovXG5cbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcbiAgICBpZiAoJCgnLmpzLXN0aWt5LWJsb2NrJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3ktYmxvY2snLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiAxMzUsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktYmxvY2tfX2lubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59KTtcblxuLypcbiogU2xpZGVyLmpzXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xuXG4gICAgLy9TbGlkZXIgTmV3XG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL1NsaWRlciBDYXJkXG4gICAgaWYgKFxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykubGVuZ3RoID4gMCAmJlxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgICAgY2FyZFNsaWRlcigpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnKS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICAgIG1vZGFsU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgLy9TbGlkZXIgUHJvbW9cbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXByb21vJykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2xpZGVyUmVsYXRlZCgpO1xuICAgIH1cbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2xpZGVyUmVsYXRlZE1vZGFsKCk7XG4gICAgfVxufSk7XG5cbi8vQ2FyZFNsaWRlckZ1bmN0aW9uXG5mdW5jdGlvbiBjYXJkU2xpZGVyKCkge1xuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogNyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZCcsXG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vZGFsU2xpZGVyKCkge1xuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogNyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcsXG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cbi8vc2xpZGVyUmVsYXRlZFxuZnVuY3Rpb24gc2xpZGVyUmVsYXRlZCgpIHtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzbGlkZXJSZWxhdGVkTW9kYWwoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLnNsaWNrKHtcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuXG4vKlxuKiBDYXJkLmpzXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL2NhcmQgcHJvcGVydGllcyB0YWJzXG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQsIC5qcy1jYXJkLXRhYi1yZWxhdGVkLS1tb2RhbCcpLnRhYnMoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcmVsYXRlZC10YWInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkLS1tb2RhbCcpXG4gICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpXG4gICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpXG4gICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpXG4gICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy10YWInLCB0YWJzKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy10YWItbW9kYWwnLCB0YWJzKTtcbiAgICB9XG5cbiAgICAkKCcjcHJldmlldycpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLnJlc2l6ZSgpO1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykucmVzaXplKCk7XG5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAgICAgdGFiVHJhbnNmb3JtKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xuXG4gICAgICAgICQoJy5qcy10YWIsIC5qcy10YWItbW9kYWwnKVxuICAgICAgICAgICAgLnVud3JhcCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbiBhY2NvcmRlb24tLW90aGVyIGpzLWFjY29yZGVvbicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpXG4gICAgICAgICAgICAud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xuXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKVxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJylcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcblxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fY29udGVudCB0YWJfX2NvbnRlbnQtLXByb2R1Y3QnKTtcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnRlcycpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgLy9DYXJkIEl0ZW0gU2VsZWN0XG4gICAgY2hhbmdlQ29sb3IoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaXRlbS1zZWxlY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1pdGVtLXNlbGVjdC1pdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xuICAgICAgICBsZXQgdGV4dCA9ICQodGhpcylcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgIC50ZXh0KCk7XG4gICAgICAgIGxldCBjb2xvciA9ICQodGhpcylcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJylcbiAgICAgICAgICAgIC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xuICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xuXG4gICAgICAgIGlucHV0LnZhbCh0ZXh0KTtcbiAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicsIGNvbG9yKTtcblxuICAgICAgICBjaGFuZ2VDb2xvcigpO1xuXG4gICAgICAgIGlmIChzZWxlY3QuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0LS1jb3VudCcpKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXRlbS1zZWxlY3RfX2l0ZW0tLWhlYWRlcicpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CS0YvQsdGA0LDRgtGMJyk7XG4gICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4vL1NlbGVjdCBJdGVtIGNoYW5nZUNvbG9yXG5mdW5jdGlvbiBjaGFuZ2VDb2xvcigpIHtcbiAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICB9KTtcbn1cblxuLy9UYWJzXG5mdW5jdGlvbiB0YWJzKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT0gJ3RhYl9fdGl0bGUnKSB7XG4gICAgICAgIHZhciBkYXRhVGFiID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcbiAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcudGFiX19jb250ZW50Jyk7XG4gICAgICAgIHZhciB0YWJUaXRsZSA9ICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJy50YWJfX3RpdGxlJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRhYlRpdGxlW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSBpKSB7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qXG4qIEZ1bmN0aW9ucy5qc1xuKi9cblxuLy9QdXNoVXBcbmZ1bmN0aW9uIHB1c2hVcCh0ZXh0KSB7XG4gICAgdmFyIHRleHQgPSB0ZXh0IHx8ICfQotC+0LLQsNGAINC00L7QsdCw0LLQu9C10L0g0LIg0LrQvtGA0LfQuNC90YMnO1xuICAgIHZhciBwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygncHVzaFVwJyk7XG4gICAgdmFyIHB1c2hVcENsb3NlID0gJCgnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXNcIj48L2k+JykuYWRkQ2xhc3MoXG4gICAgICAgICdwdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXG4gICAgKTtcbiAgICBwdXNoQ29udGFpbmVyLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gICAgcHVzaENvbnRhaW5lci50ZXh0KHRleHQpO1xuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xuXG4gICAgcmFmKGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0sIDM1MDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9LCA0MDAwKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG59XG5cbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5mdW5jdGlvbiByYWYoZm4pIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbiJdfQ==
