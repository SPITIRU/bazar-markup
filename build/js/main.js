'use strict';

$(window).on('load', function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    } else {
        $('body').addClass('web');
    }
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

$(document).ready(function () {
    //Bootsstrap lightbox gallary
    $(document).on('click', '[data-toggle="lightbox"]', function (e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });

    //Custom Select https://select2.org/
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

        ;
    }

    // Native select
    var $selectNative = $('.js-select-native');
    if ($selectNative.length) {
        if ($selectNative) {
            if ($(window).width() >= 768) {
                $selectNative.select2({
                    minimumResultsForSearch: -1
                });
            } else {
                $selectNative.each(function () {
                    $(this).wrap('<label class="bz-select bz-select--native">');
                });
            }
        }
    }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
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

    //Change form title
    $(document).on('click', '.js-form-title', function () {
        var text = $(this).data('title');

        $('.js-form-title').removeClass('is-active');
        $(this).addClass('is-active');
        $(this).closest('.form').find('.form__btn').text(text);
    });

    function mainOffset() {
        $('.main').css('padding-top', $('.header').outerHeight());
    }
    mainOffset();
    $(window).resize(mainOffset);

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function () {
        var elementClick = $(this).attr('href');
        var destination = $(elementClick).offset().top;
        $('html, body').animate({
            scrollTop: destination - 90 + 'px'
        }, 300);
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
        $(document).on('click', '.js-main-nav-link--forward', function (e) {
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

    // Initialize/Destroy EasyZoom

    $('.js-easy-zoom').on('click', function (e) {

        var $easyzoom = $(this).easyZoom(),
            api = $easyzoom.data('easyZoom');

        e.preventDefault();

        if (!$(this).hasClass('is-ready')) {

            api._init();

            api.show();
        } else {

            api.teardown();
        };
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzY3JvbGxCYXIiLCJsZW5ndGgiLCJuaWNlU2Nyb2xsIiwiY3Vyc29yY29sb3IiLCJob3JpenJhaWxlbmFibGVkIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJtb3VzZW92ZXIiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwiZG9jdW1lbnQiLCJyZWFkeSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImVra29MaWdodGJveCIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiJHNlbGVjdE5hdGl2ZSIsIndpZHRoIiwiZWFjaCIsIndyYXAiLCJpbnB1dG1hc2siLCJtYXNrIiwiY2xlYXJJbmNvbXBsZXRlIiwiY2xvc2VzdCIsImZpbmQiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJoYXNDbGFzcyIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsIndyYXBBbGwiLCJ0b2dnbGVDbGFzcyIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwib3ZlcmZsb3ciLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsIml0ZW0iLCJjb2xvciIsImltZyIsImNvbG9yQm94Iiwic2lkZWJhciIsIlN0aWNreVNpZGViYXIiLCJ0b3BTcGFjaW5nIiwiYm90dG9tU3BhY2luZyIsImNvbnRhaW5lclNlbGVjdG9yIiwiaW5uZXJXcmFwcGVyU2VsZWN0b3IiLCJhY2NvcmRlcm9uIiwibm90Iiwic2xpZGVVcCIsInNsaWRlRG93biIsImZpbHRlciIsImlzIiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhcnJvd3MiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiYXV0b3BsYXkiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInZhcmlhYmxlV2lkdGgiLCJjYXJkU2xpZGVyIiwibW9kYWxTbGlkZXIiLCJzbGlkZXJSZWxhdGVkIiwic2xpZGVyUmVsYXRlZE1vZGFsIiwiZmFkZSIsImFzTmF2Rm9yIiwiZm9jdXNPblNlbGVjdCIsImNlbnRlck1vZGUiLCJ0YWJzIiwidGFiVHJhbnNmb3JtIiwidGFiIiwidW53cmFwIiwiY2hhbmdlQ29sb3IiLCJzZWxlY3QiLCJ2YWx1ZSIsImlucHV0IiwiY2hpbGRyZW4iLCIkZWFzeXpvb20iLCJlYXN5Wm9vbSIsImFwaSIsIl9pbml0IiwidGVhcmRvd24iLCJjbGFzc05hbWUiLCJkYXRhVGFiIiwiZ2V0QXR0cmlidXRlIiwidGFiQ29udGVudCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJwdXNoVXAiLCJwdXNoQ29udGFpbmVyIiwicHVzaFVwQ2xvc2Ui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OztBQUlBRyxRQUFJLFlBQVc7O0FBRVhILHNCQUFjckosUUFBZCxDQUF1QixXQUF2QjtBQUVILEtBSkQ7O0FBUUF5SixlQUFXLFlBQVc7O0FBRWxCSixzQkFBY3BKLFdBQWQsQ0FBMEIsV0FBMUI7QUFFSCxLQUpELEVBSUcsSUFKSDs7QUFRQXdKLGVBQVcsWUFBVzs7QUFFbEJKLHNCQUFjMUUsTUFBZDtBQUVILEtBSkQsRUFJRyxJQUpIOztBQVFBakYsTUFBRXFCLFFBQUYsRUFBWW5CLEVBQVosQ0FBZSxPQUFmLEVBQXdCLG1CQUF4QixFQUE2QyxZQUFXOztBQUVwRHlKLHNCQUFjcEosV0FBZCxDQUEwQixXQUExQjs7QUFFQXdKLG1CQUFXLFlBQVc7O0FBRWxCSiwwQkFBYzFFLE1BQWQ7QUFFSCxTQUpELEVBSUcsR0FKSDtBQU1ILEtBVkQ7QUFZSDs7QUFJRDs7QUFFQSxTQUFTNkUsR0FBVCxDQUFhRSxFQUFiLEVBQWlCOztBQUViL0osV0FBT2dLLHFCQUFQLENBQTZCLFlBQVc7O0FBRXBDaEssZUFBT2dLLHFCQUFQLENBQTZCLFlBQVc7O0FBRXBDRDtBQUVILFNBSkQ7QUFNSCxLQVJEO0FBVUgiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChcclxuICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXHJcbiAgICApIHtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2lvcycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlYicpO1xyXG4gICAgfVxyXG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcblxyXG4gICAgLy9HZXROaWNlU2Nyb2xsIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnV5YWtzYS9qcXVlcnkubmljZXNjcm9sbFxyXG4gICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcclxuICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcclxuICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG4gICAgICAgICAgICB2ZXJnZTogNTAwLFxyXG4gICAgICAgICAgICBjdXJzb3J3aWR0aDogJzRweCcsXHJcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXHJcbiAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgLy9Cb290c3N0cmFwIGxpZ2h0Ym94IGdhbGxhcnlcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS10b2dnbGU9XCJsaWdodGJveFwiXScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQodGhpcykuZWtrb0xpZ2h0Ym94KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuanMtc2VsZWN0LnNlbGVjdC13aXRoLWljb24nKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGFkZFVzZXJQaWMsXHJcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltYWdlIHNlbGVjdCcpO1xyXG4gICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJzb3J0aW5nLWljb24gc29ydGluZy1pY29uLS0nICtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXHJcbiAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICQob3B0LmVsZW1lbnQpLnRleHQoKSArXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE5hdGl2ZSBzZWxlY3RcclxuICAgIGxldCAkc2VsZWN0TmF0aXZlID0gJCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuICAgIGlmICgkc2VsZWN0TmF0aXZlLmxlbmd0aCkge1xyXG4gICAgICAgIGlmICgkc2VsZWN0TmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAud3JhcCgnPGxhYmVsIGNsYXNzPVwiYnotc2VsZWN0IGJ6LXNlbGVjdC0tbmF0aXZlXCI+Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDAgfHwgJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxyXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgbWFzazogJzk5LTk5LTk5OTknLFxyXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL0NoYW5nZSBmb3JtIHRpdGxlXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWZvcm0tdGl0bGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1mb3JtLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5mb3JtJylcclxuICAgICAgICAgICAgLmZpbmQoJy5mb3JtX19idG4nKVxyXG4gICAgICAgICAgICAudGV4dCh0ZXh0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XHJcbiAgICAgICAgJCgnLm1haW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgfVxyXG4gICAgbWFpbk9mZnNldCgpO1xyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShtYWluT2Zmc2V0KTtcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcclxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgIH0sIDgwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxyXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnXHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5jc3MoJ2JvdHRvbScsIDcwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1N0b3AgZHJhZ1xyXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0Zvb3RlciBtZWRpYSA8PSA0ODAgdHJhbnNmb3JtIGFjY29yZGVvblxyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XHJcbiAgICAgICAgZm9vdGVyXHJcbiAgICAgICAgICAgIC5maW5kKCcuZm9vdGVyLWl0ZW0nKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpXHJcbiAgICAgICAgICAgIC53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKTtcclxuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID1cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID09PSAnJyA/ICdoaWRkZW4nIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAvL1doZW4gY2xpY2sgb3V0c2lkZVxyXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcbiAgICAgICAgICAgICAgICAnLmpzLWhhbWJ1cmdlciwgLmpzLW5hdi1tYWluLCAuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnXHJcbiAgICAgICAgICAgICkubGVuZ3RoXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAvL01vYmlsZSBOYXZcclxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBtYWluRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtbWFpbl9fZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAgICAgICBsZXQgYmxvY2sgPSAkKFxyXG4gICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPidcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgISQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgYmxvY2tcclxuICAgICAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIobmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKVxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KHRpdGxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgIShcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkRyb3Bkb3duLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcclxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL01vYmlsZSBTZWFyY2hcclxuICAgICAgICB2YXIgc2VhcmNoID0gJCgnLmpzLXNlYXJjaCcpO1xyXG4gICAgICAgIHZhciBzZWFyY2hCdG5TaG93ID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKTtcclxuXHJcbiAgICAgICAgc2VhcmNoQnRuU2hvdy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpXHJcbiAgICAgICAgICAgICAgICAubGVuZ3RoXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgc2VhcmNoLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcclxuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGhlYWRlck1haW4gPSAkKCcuaGVhZGVyLW1haW4nKTtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpXHJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIDg1KVxyXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXItbWFpbicpXHJcbiAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49ICQoJy5oZWFkZXJfX3RvcC1saW5lJykub3V0ZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW4ucmVtb3ZlQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1Nob3cgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAubmV4dCgpXHJcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcclxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgfSk7XHJcbiAgICAvL0hpZGUgUGFzc3dvcmRcclxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxyXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9idG4gZmF2b3JpdGVcclxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICogQ2F0YWxvZy5qc1xyXG4gICAgICovXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jb2xvci1pdGVtJywgZnVuY3Rpb24oZSkge1xuXHJcbiAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcblxyXG4gICAgICAgIGxldCBjb2xvciA9ICQodGhpcykuZGF0YSgnY29sb3InKTtcblxyXG4gICAgICAgIGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XG5cclxuICAgIFxuXHJcbiAgICAgICAgaW1nLmF0dHIoJ3NyYycsIGNvbG9yKTtcblxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxyXG4gICAgfSk7XG5cclxuICAgIFxuXHJcbiAgICAvL0NoYW5nZXJcblxyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuXHJcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcblxyXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2hhbmdlcicpXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICBcblxyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuXHJcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpXG5cclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5jaGFuZ2VyX19pdGVtJyk7XG5cclxuICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuXHJcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cclxuICAgICAgICB9KTtcblxyXG4gICAgXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcblxyXG4gICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX3N1Yml0ZW0nKVxuXHJcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnZmlsdGVyLWNvbG9yJyk7XG5cclxuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIFxuXHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG5cclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXG5cclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcblxyXG4gICAgfSBlbHNlIHtcblxyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcblxyXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG5cclxuICAgICAgICAgICAgLnJlc2l6ZSgpO1xuXHJcbiAgICB9XG5cclxuICAgIFxuXHJcbiAgICAvL0NhdGFsb2cgRmlsdGVyIEFjdGlvblxuXHJcbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG5cclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxyXG4gICAgfSk7XG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcblxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xuXHJcbiAgICB9KTtcblxyXG4gICAgXG5cclxuICAgIC8vU3RpY2t5IEJsb2NrIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxuXHJcbiAgICBpZiAoJCgnLmpzLXN0aWt5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuXHJcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5Jywge1xuXHJcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDg1LFxuXHJcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDIwLFxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuXHJcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWlubmVyJ1xuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIH1cblxyXG4gICAgXHJcblxyXG4gICAgLypcclxuICAgICAqIENvbXBvbmVudHMuanNcclxuICAgICAqL1xyXG5cclxuICAgIC8vQWNjb3JkZW9uXG5cclxuICAgIGlmICgkKCcuanMtYWNjb3JkZW9uJykubGVuZ3RoID4gMCkge1xuXHJcbiAgICAgICAgbGV0IGFjY29yZGVyb24gPSAkKCcuanMtYWNjb3JkZW9uJyk7XG5cclxuICAgIFxuXHJcbiAgICAgICAgYWNjb3JkZXJvblxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtJylcblxyXG4gICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAuc2xpZGVVcCgpO1xuXHJcbiAgICAgICAgYWNjb3JkZXJvblxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtOmZpcnN0JylcblxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAuc2xpZGVEb3duKCk7XG5cclxuICAgIFxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5hY2NvcmRlb25fX3RpdGxlJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgaWYgKFxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcblxyXG4gICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG5cclxuICAgICAgICAgICAgKSB7XG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICAgICAgaWYgKGFjY29yZGVyb24uaGFzQ2xhc3MoJ2xrX19hY2NvcmRlb24nKSkge1xuXHJcbiAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKVxuXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCc6Zmlyc3QnKVxuXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG5cclxuICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XG5cclxuICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKVxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9C/0L7QtNGA0L7QsdC90LXQtScpO1xuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfRgdC60YDRi9GC0YwnKTtcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfSk7XG5cclxuICAgICAgICB9XG5cclxuICAgIH1cblxyXG4gICAgXG5cclxuICAgIC8vY2hlY2tib3hcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgaWYgKFxuXHJcbiAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcblxyXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXG5cclxuICAgICAgICApIHtcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICB9IGVsc2Uge1xuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcblxyXG4gICAgICAgIH1cblxyXG4gICAgfSk7XG5cclxuICAgIFxuXHJcbiAgICAvL2NoZWNrYm94LS1wc2V1ZG9cblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuXHJcbiAgICAgICAgfSBlbHNlIHtcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICB9XG5cclxuICAgIH0pO1xuXHJcbiAgICBcblxyXG4gICAgLy9kcm9wZG93blxuXHJcbiAgICBpZiAoJCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoID4gMCkge1xuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1kcm9wZG93bicsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHJcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcblxyXG4gICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICB9XG5cclxuICAgIFxyXG5cclxuICAgIC8qXHJcbiAgICAgKkxrLmpzXHJcbiAgICAgKi9cclxuXHJcbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcblxyXG4gICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcblxyXG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreS1ibG9jaycsIHtcblxyXG4gICAgICAgICAgICB0b3BTcGFjaW5nOiAxMzUsXG5cclxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG5cclxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuc3Rpa3ktY29udGVudCcsXG5cclxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktYmxvY2tfX2lubmVyJ1xuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIH1cblxyXG4gICAgXHJcbn0pO1xyXG5cclxuLypcclxuICogU2xpZGVyLmpzXHJcbiAqL1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cclxuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG5cclxuXG5cclxuICAgIC8vU2xpZGVyIE5ld1xuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tbmV3JykubGVuZ3RoID4gMCkge1xuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1uZXh0JyxcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tcHJldicsXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgICAgICBzcGVlZDogMTAwMCxcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuXHJcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuXHJcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXG5cclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuXHJcbiAgICAgICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDRcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzIxLFxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIF1cblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICB9XG5cclxuXG5cclxuICAgIC8vU2xpZGVyIENhcmRcblxyXG4gICAgaWYgKFxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLmxlbmd0aCA+IDAgJiZcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JykubGVuZ3RoID4gMFxuXHJcbiAgICApIHtcblxyXG4gICAgICAgIGNhcmRTbGlkZXIoKTtcblxyXG4gICAgfVxuXHJcblxuXHJcbiAgICBpZiAoXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJykubGVuZ3RoID4gMCAmJlxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnKS5sZW5ndGggPiAwXG5cclxuICAgICkge1xuXHJcbiAgICAgICAgbW9kYWxTbGlkZXIoKTtcblxyXG4gICAgfVxuXHJcblxuXHJcbiAgICAvL1NsaWRlciBQcm9tb1xuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5sZW5ndGggPiAwKSB7XG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLnNsaWNrKHtcblxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tbmV4dCcsXG5cclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLXByZXYnLFxuXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcblxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG5cclxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcblxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWVcblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICB9XG5cclxuXG5cclxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5sZW5ndGggPiAwKSB7XG5cclxuICAgICAgICBzbGlkZXJSZWxhdGVkKCk7XG5cclxuICAgIH1cblxyXG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQtbW9kYWwnKS5sZW5ndGggPiAwKSB7XG5cclxuICAgICAgICBzbGlkZXJSZWxhdGVkTW9kYWwoKTtcblxyXG4gICAgfVxuXHJcbn0pO1xuXHJcblxuXHJcbi8vQ2FyZFNsaWRlckZ1bmN0aW9uXG5cclxuZnVuY3Rpb24gY2FyZFNsaWRlcigpIHtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcblxyXG4gICAgICAgIGZhZGU6IHRydWUsXG5cclxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JyxcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG5cclxuICAgICAgICAgICAgICAgICAgICBmYWRlOiBmYWxzZVxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgXVxuXHJcbiAgICB9KTtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5zbGljayh7XG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDcsXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZCcsXG5cclxuICAgICAgICBkb3RzOiB0cnVlLFxuXHJcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcblxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiAndW5zbGljaydcblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICBdXG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cblxyXG5mdW5jdGlvbiBtb2RhbFNsaWRlcigpIHtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLnNsaWNrKHtcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcblxyXG4gICAgICAgIGZhZGU6IHRydWUsXG5cclxuICAgICAgICBhc05hdkZvcjogJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2LW1vZGFsJyxcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG5cclxuICAgICAgICAgICAgICAgICAgICBmYWRlOiBmYWxzZVxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgXVxuXHJcbiAgICB9KTtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnKS5zbGljayh7XG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDcsXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcsXG5cclxuICAgICAgICBkb3RzOiB0cnVlLFxuXHJcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcblxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiAndW5zbGljaydcblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICBdXG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cblxyXG4vL3NsaWRlclJlbGF0ZWRcblxyXG5mdW5jdGlvbiBzbGlkZXJSZWxhdGVkKCkge1xuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xuXHJcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuXHJcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgIHNwZWVkOiA1MDAsXG5cclxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuXHJcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG5cclxuICAgICAgICBkb3RzOiBmYWxzZSxcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIF1cblxyXG4gICAgfSk7XG5cclxufVxuXHJcblxuXHJcbmZ1bmN0aW9uIHNsaWRlclJlbGF0ZWRNb2RhbCgpIHtcblxyXG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLnNsaWNrKHtcblxyXG4gICAgICAgIGFycm93czogdHJ1ZSxcblxyXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG5cclxuICAgICAgICBzcGVlZDogNTAwLFxuXHJcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcblxyXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuXHJcbiAgICAgICAgZG90czogZmFsc2UsXG5cclxuICAgICAgICByZXNwb25zaXZlOiBbXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICBdXG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cclxuXHJcbi8qXHJcbiAqIENhcmQuanNcclxuICovXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy9jYXJkIHByb3BlcnRpZXMgdGFic1xyXG5cclxuICAgICQoJy5qcy1jYXJkLXRhYi1yZWxhdGVkLCAuanMtY2FyZC10YWItcmVsYXRlZC0tbW9kYWwnKS50YWJzKCk7XHJcblxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXJlbGF0ZWQtdGFiJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQtLW1vZGFsJylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJylcclxuXHJcbiAgICAgICAgICAgIC5zbGljaygnc2V0UG9zaXRpb24nKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkJylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJylcclxuXHJcbiAgICAgICAgICAgIC5zbGljaygnc2V0UG9zaXRpb24nKTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXRhYicsIHRhYnMpO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXRhYi1tb2RhbCcsIHRhYnMpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgICQoJyNwcmV2aWV3Jykub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLnJlc2l6ZSgpO1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykucmVzaXplKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgdGFiVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxyXG5cclxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcclxuXHJcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoJy5qcy10YWIsIC5qcy10YWItbW9kYWwnKVxyXG5cclxuICAgICAgICAgICAgLnVud3JhcCgpXHJcblxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbiBhY2NvcmRlb24tLW90aGVyIGpzLWFjY29yZGVvbicpXHJcblxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpXHJcblxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKVxyXG5cclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKVxyXG5cclxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpXHJcblxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJylcclxuXHJcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXHJcblxyXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fY29udGVudCB0YWJfX2NvbnRlbnQtLXByb2R1Y3QnKTtcclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnRlcycpLnJlbW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuXHJcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy9DYXJkIEl0ZW0gU2VsZWN0XHJcblxyXG4gICAgY2hhbmdlQ29sb3IoKTtcclxuXHJcblxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaXRlbS1zZWxlY3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWl0ZW0tc2VsZWN0LWl0ZW0nLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICBsZXQgdGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcclxuXHJcbiAgICAgICAgICAgIC50ZXh0KCk7XHJcblxyXG4gICAgICAgIGxldCBjb2xvciA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJylcclxuXHJcbiAgICAgICAgICAgIC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlucHV0LnZhbCh0ZXh0KTtcclxuXHJcbiAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicsIGNvbG9yKTtcclxuXHJcblxyXG5cclxuICAgICAgICBjaGFuZ2VDb2xvcigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmIChzZWxlY3QuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0LS1jb3VudCcpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXRlbS1zZWxlY3RfX2l0ZW0tLWhlYWRlcicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CS0YvQsdGA0LDRgtGMJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIC8vIEluaXRpYWxpemUvRGVzdHJveSBFYXN5Wm9vbVxyXG5cclxuICAgICQoJy5qcy1lYXN5LXpvb20nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICB2YXIgJGVhc3l6b29tID0gJCh0aGlzKS5lYXN5Wm9vbSgpLFxyXG5cclxuICAgICAgICAgICAgYXBpID0gJGVhc3l6b29tLmRhdGEoJ2Vhc3lab29tJyk7XHJcblxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLXJlYWR5JykpIHtcclxuXHJcbiAgICAgICAgICAgIGFwaS5faW5pdCgpO1xyXG5cclxuICAgICAgICAgICAgYXBpLnNob3coKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGFwaS50ZWFyZG93bigpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcbi8vU2VsZWN0IEl0ZW0gY2hhbmdlQ29sb3JcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUNvbG9yKCkge1xyXG5cclxuICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpXHJcblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXHJcblxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8vVGFic1xyXG5cclxuZnVuY3Rpb24gdGFicyhlKSB7XHJcblxyXG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09ICd0YWJfX3RpdGxlJykge1xyXG5cclxuICAgICAgICB2YXIgZGF0YVRhYiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XHJcblxyXG4gICAgICAgIHZhciB0YWJDb250ZW50ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLnRhYl9fY29udGVudCcpO1xyXG5cclxuICAgICAgICB2YXIgdGFiVGl0bGUgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcudGFiX190aXRsZScpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuLypcclxuICogRnVuY3Rpb25zLmpzXHJcbiAqL1xyXG5cclxuLy9QdXNoVXBcblxyXG5mdW5jdGlvbiBwdXNoVXAodGV4dCkge1xuXHJcbiAgICB2YXIgdGV4dCA9IHRleHQgfHwgJ9Ci0L7QstCw0YAg0LTQvtCx0LDQstC70LXQvSDQsiDQutC+0YDQt9C40L3Rgyc7XG5cclxuICAgIHZhciBwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygncHVzaFVwJyk7XG5cclxuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxuXHJcbiAgICAgICAgJ3B1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcblxyXG4gICAgKTtcblxyXG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xuXHJcbiAgICBwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XG5cclxuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xuXHJcblxuXHJcbiAgICByYWYoZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgfSk7XG5cclxuXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgfSwgMzUwMCk7XG5cclxuXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuXHJcbiAgICB9LCA0MDAwKTtcblxyXG5cblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoVXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcblxyXG4gICAgICAgIH0sIDMwMCk7XG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cblxyXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxuXHJcbmZ1bmN0aW9uIHJhZihmbikge1xuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICAgICBmbigpO1xuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIH0pO1xuXHJcbn1cblxyXG5cclxuIl19
