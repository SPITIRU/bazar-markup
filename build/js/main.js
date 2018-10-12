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

        if ($(window).width() >= 768) {

            var $easyzoom = $(this).easyZoom(),
                api = $easyzoom.data('easyZoom');

            e.preventDefault();

            if (!$(this).hasClass('is-ready')) {

                api._init();

                api.show();
            } else {

                api.teardown();
            };
        };
    }).find('a').on('click', function (e) {

        e.preventDefault();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzY3JvbGxCYXIiLCJsZW5ndGgiLCJuaWNlU2Nyb2xsIiwiY3Vyc29yY29sb3IiLCJob3JpenJhaWxlbmFibGVkIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJtb3VzZW92ZXIiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwiZG9jdW1lbnQiLCJyZWFkeSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImVra29MaWdodGJveCIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiJHNlbGVjdE5hdGl2ZSIsIndpZHRoIiwiZWFjaCIsIndyYXAiLCJpbnB1dG1hc2siLCJtYXNrIiwiY2xlYXJJbmNvbXBsZXRlIiwiY2xvc2VzdCIsImZpbmQiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJoYXNDbGFzcyIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsIndyYXBBbGwiLCJ0b2dnbGVDbGFzcyIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwib3ZlcmZsb3ciLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsIml0ZW0iLCJjb2xvciIsImltZyIsImNvbG9yQm94Iiwic2lkZWJhciIsIlN0aWNreVNpZGViYXIiLCJ0b3BTcGFjaW5nIiwiYm90dG9tU3BhY2luZyIsImNvbnRhaW5lclNlbGVjdG9yIiwiaW5uZXJXcmFwcGVyU2VsZWN0b3IiLCJhY2NvcmRlcm9uIiwibm90Iiwic2xpZGVVcCIsInNsaWRlRG93biIsImZpbHRlciIsImlzIiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhcnJvd3MiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiYXV0b3BsYXkiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInZhcmlhYmxlV2lkdGgiLCJjYXJkU2xpZGVyIiwibW9kYWxTbGlkZXIiLCJzbGlkZXJSZWxhdGVkIiwic2xpZGVyUmVsYXRlZE1vZGFsIiwiZmFkZSIsImFzTmF2Rm9yIiwiZm9jdXNPblNlbGVjdCIsImNlbnRlck1vZGUiLCJ0YWJzIiwidGFiVHJhbnNmb3JtIiwidGFiIiwidW53cmFwIiwiY2hhbmdlQ29sb3IiLCJzZWxlY3QiLCJ2YWx1ZSIsImlucHV0IiwiY2hpbGRyZW4iLCIkZWFzeXpvb20iLCJlYXN5Wm9vbSIsImFwaSIsIl9pbml0IiwidGVhcmRvd24iLCJjbGFzc05hbWUiLCJkYXRhVGFiIiwiZ2V0QXR0cmlidXRlIiwidGFiQ29udGVudCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJwdXNoVXAiLCJwdXNoQ29udGFpbmVyIiwicHVzaFVwQ2xvc2Ui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Qjs7QUFFQSxRQUFJc0osY0FBYzVKLEVBQUUsOEJBQUYsRUFBa0NNLFFBQWxDLENBRWQsZ0NBRmMsQ0FBbEI7O0FBTUFxSixrQkFBY0UsUUFBZCxDQUF1QjdKLEVBQUUsTUFBRixDQUF2Qjs7QUFFQTJKLGtCQUFjNUgsSUFBZCxDQUFtQkEsSUFBbkI7O0FBRUE2SCxnQkFBWUMsUUFBWixDQUFxQkYsYUFBckI7O0FBSUFHLFFBQUksWUFBVzs7QUFFWEgsc0JBQWNySixRQUFkLENBQXVCLFdBQXZCO0FBRUgsS0FKRDs7QUFRQXlKLGVBQVcsWUFBVzs7QUFFbEJKLHNCQUFjcEosV0FBZCxDQUEwQixXQUExQjtBQUVILEtBSkQsRUFJRyxJQUpIOztBQVFBd0osZUFBVyxZQUFXOztBQUVsQkosc0JBQWMxRSxNQUFkO0FBRUgsS0FKRCxFQUlHLElBSkg7O0FBUUFqRixNQUFFcUIsUUFBRixFQUFZbkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsbUJBQXhCLEVBQTZDLFlBQVc7O0FBRXBEeUosc0JBQWNwSixXQUFkLENBQTBCLFdBQTFCOztBQUVBd0osbUJBQVcsWUFBVzs7QUFFbEJKLDBCQUFjMUUsTUFBZDtBQUVILFNBSkQsRUFJRyxHQUpIO0FBTUgsS0FWRDtBQVlIOztBQUlEOztBQUVBLFNBQVM2RSxHQUFULENBQWFFLEVBQWIsRUFBaUI7O0FBRWIvSixXQUFPZ0sscUJBQVAsQ0FBNkIsWUFBVzs7QUFFcENoSyxlQUFPZ0sscUJBQVAsQ0FBNkIsWUFBVzs7QUFFcENEO0FBRUgsU0FKRDtBQU1ILEtBUkQ7QUFVSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcclxuICAgICkge1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaW9zJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnd2ViJyk7XHJcbiAgICB9XHJcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcclxuXHJcbiAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXHJcbiAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG4gICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG4gICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyMyYzJiMmInLFxyXG4gICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcbiAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcclxuICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXHJcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2Nyb2xsQmFyLm1vdXNlb3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAvL0Jvb3Rzc3RyYXAgbGlnaHRib3ggZ2FsbGFyeVxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLXRvZ2dsZT1cImxpZ2h0Ym94XCJdJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCh0aGlzKS5la2tvTGlnaHRib3goKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5qcy1zZWxlY3Quc2VsZWN0LXdpdGgtaWNvbicpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpYyxcclxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW1hZ2Ugc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcclxuICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInNvcnRpbmctaWNvbiBzb3J0aW5nLWljb24tLScgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGltYWdlICtcclxuICAgICAgICAgICAgICAgICAgICAnXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTmF0aXZlIHNlbGVjdFxyXG4gICAgbGV0ICRzZWxlY3ROYXRpdmUgPSAkKCcuanMtc2VsZWN0LW5hdGl2ZScpO1xyXG4gICAgaWYgKCRzZWxlY3ROYXRpdmUubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKCRzZWxlY3ROYXRpdmUpIHtcclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC53cmFwKCc8bGFiZWwgY2xhc3M9XCJiei1zZWxlY3QgYnotc2VsZWN0LS1uYXRpdmVcIj4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCB8fCAkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXHJcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICBtYXNrOiAnOTktOTktOTk5OScsXHJcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQ2hhbmdlIGZvcm0gdGl0bGVcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZm9ybS10aXRsZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGl0bGUnKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLWZvcm0tdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmZvcm0nKVxyXG4gICAgICAgICAgICAuZmluZCgnLmZvcm1fX2J0bicpXHJcbiAgICAgICAgICAgIC50ZXh0KHRleHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFpbk9mZnNldCgpIHtcclxuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICB9XHJcbiAgICBtYWluT2Zmc2V0KCk7XHJcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxyXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgfSwgODAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXHJcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBpZiAoJCgnLm1haW4nKS5oYXNDbGFzcygnY2F0YWxvZycpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vU3RvcCBkcmFnXHJcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vRm9vdGVyIG1lZGlhIDw9IDQ4MCB0cmFuc2Zvcm0gYWNjb3JkZW9uXHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgbGV0IGZvb3RlciA9ICQoJy5qcy1mb290ZXInKTtcclxuICAgICAgICBmb290ZXJcclxuICAgICAgICAgICAgLmZpbmQoJy5mb290ZXItaXRlbScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19pdGVtJylcclxuICAgICAgICAgICAgLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb24ganMtYWNjb3JkZW9uXCI+Jyk7XHJcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xyXG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9IYW1idXJnZXIgYnRuXHJcbiAgICAkKCcuanMtaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPVxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT09ICcnID8gJ2hpZGRlbicgOiAnJztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXHJcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuICAgICAgICAgICAgICAgICcuanMtaGFtYnVyZ2VyLCAuanMtbmF2LW1haW4sIC5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdydcclxuICAgICAgICAgICAgKS5sZW5ndGhcclxuICAgICAgICApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAkKCcuanMtaGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgIC8vTW9iaWxlIE5hdlxyXG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnByZXBlbmRUbygnLndyYXBwZXIgJyk7XHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1tYWluLW5hdi1saW5rLS1mb3J3YXJkJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG5hdkl0ZW1Ecm9wZG93bjIgPSBuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcclxuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gJCh0aGlzKS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoXHJcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibmF2LWRyb3Bkb3duX190aXRsZSBuYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wXCI+J1xyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgICAgICAgICAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBibG9ja1xyXG4gICAgICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQodGl0bGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcclxuICAgICAgICAgICAgICAgICFuYXZJdGVtRHJvcGRvd24uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgICAgICAgICAhKFxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcclxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uZmluZCgnLm5hdi1kcm9wZG93bl9fdGl0bGUtLXRlbXAnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxyXG4gICAgICAgICAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaFxyXG4gICAgICAgIHZhciBzZWFyY2ggPSAkKCcuanMtc2VhcmNoJyk7XHJcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xyXG5cclxuICAgICAgICBzZWFyY2hCdG5TaG93Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaC5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCB3aGVuIGNsaWNrIG91dHNpZGVcclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VhcmNoLS1zaG93LCAuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5sZW5ndGhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xyXG4gICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaGVhZGVyTWFpbiA9ICQoJy5oZWFkZXItbWFpbicpO1xyXG4gICAgICAgIGxldCBoZWFkZXJNYWluQ2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLW1haW4tLWNsb25lXCI+JylcclxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgODUpXHJcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJylcclxuICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gJCgnLmhlYWRlcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluQ2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vU2hvdyBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKVxyXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcbiAgICB9KTtcclxuICAgIC8vSGlkZSBQYXNzd29yZFxyXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5wcmV2KClcclxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2J0biBmYXZvcml0ZVxyXG4gICAgJCgnLmpzLWJ1dHRvbi1pY29uLS1mYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiBDYXRhbG9nLmpzXHJcbiAgICAgKi9cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNvbG9yLWl0ZW0nLCBmdW5jdGlvbihlKSB7XG5cclxuICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXByb2R1Y3QtaXRlbScpO1xuXHJcbiAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xuXHJcbiAgICAgICAgbGV0IGltZyA9IGl0ZW0uZmluZCgnLnByb2R1Y3QtaXRlbV9faW1hZ2UnKTtcblxyXG4gICAgXG5cclxuICAgICAgICBpbWcuYXR0cignc3JjJywgY29sb3IpO1xuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHJcbiAgICB9KTtcblxyXG4gICAgXG5cclxuICAgIC8vQ2hhbmdlclxuXHJcbiAgICAkKCcuanMtY2hhbmdlcicpXG5cclxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxuXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jaGFuZ2VyJylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIFxuXHJcbiAgICAkKCcuanMtY2hhbmdlcicpXG5cclxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX3Jlc2V0JylcblxyXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmNoYW5nZXJfX2l0ZW0nKTtcblxyXG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG5cclxuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxyXG4gICAgICAgIH0pO1xuXHJcbiAgICBcblxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuXHJcbiAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fc3ViaXRlbScpXG5cclxuICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29sb3InKTtcblxyXG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdmaWx0ZXItY29sb3InKTtcblxyXG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG5cclxuICAgICAgICB9KTtcblxyXG4gICAgXG5cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcblxyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcblxyXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2pzLXNjcm9sbCcpO1xuXHJcbiAgICB9IGVsc2Uge1xuXHJcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKVxuXHJcbiAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcblxyXG4gICAgICAgICAgICAucmVzaXplKCk7XG5cclxuICAgIH1cblxyXG4gICAgXG5cclxuICAgIC8vQ2F0YWxvZyBGaWx0ZXIgQWN0aW9uXG5cclxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcblxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXHJcbiAgICB9KTtcblxyXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XG5cclxuICAgIH0pO1xuXHJcbiAgICBcblxyXG4gICAgLy9TdGlja3kgQmxvY2sgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXG5cclxuICAgIGlmICgkKCcuanMtc3Rpa3knKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG5cclxuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3knLCB7XG5cclxuICAgICAgICAgICAgdG9wU3BhY2luZzogODUsXG5cclxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMjAsXG5cclxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuc3Rpa3ktY29udGVudCcsXG5cclxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktaW5uZXInXG5cclxuICAgICAgICB9KTtcblxyXG4gICAgfVxuXHJcbiAgICBcclxuXHJcbiAgICAvKlxyXG4gICAgICogQ29tcG9uZW50cy5qc1xyXG4gICAgICovXHJcblxyXG4gICAgLy9BY2NvcmRlb25cblxyXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XG5cclxuICAgICAgICBsZXQgYWNjb3JkZXJvbiA9ICQoJy5qcy1hY2NvcmRlb24nKTtcblxyXG4gICAgXG5cclxuICAgICAgICBhY2NvcmRlcm9uXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKVxuXHJcbiAgICAgICAgICAgIC5ub3QoJzpmaXJzdCcpXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuXHJcbiAgICAgICAgICAgIC5zbGlkZVVwKCk7XG5cclxuICAgICAgICBhY2NvcmRlcm9uXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW06Zmlyc3QnKVxuXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuXHJcbiAgICAgICAgICAgIC5zbGlkZURvd24oKTtcblxyXG4gICAgXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFjY29yZGVvbl9fdGl0bGUnLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICAgICBpZiAoXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcblxyXG4gICAgICAgICAgICApIHtcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG5cclxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgfSk7XG5cclxuICAgICAgICBpZiAoYWNjb3JkZXJvbi5oYXNDbGFzcygnbGtfX2FjY29yZGVvbicpKSB7XG5cclxuICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbScpXG5cclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoJzpmaXJzdCcpXG5cclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcblxyXG4gICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcblxyXG4gICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXG5cclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXItb3JkZXJfX2luZm8nKVxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0L/QvtC00YDQvtCx0L3QtdC1Jyk7XG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9GB0LrRgNGL0YLRjCcpO1xuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgICAgICB9KTtcblxyXG4gICAgICAgIH1cblxyXG4gICAgfVxuXHJcbiAgICBcblxyXG4gICAgLy9jaGVja2JveFxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94JywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICBpZiAoXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxuXHJcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcblxyXG4gICAgICAgICkge1xuXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcblxyXG4gICAgICAgIH0gZWxzZSB7XG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuXHJcbiAgICAgICAgfVxuXHJcbiAgICB9KTtcblxyXG4gICAgXG5cclxuICAgIC8vY2hlY2tib3gtLXBzZXVkb1xuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG5cclxuICAgICAgICB9IGVsc2Uge1xuXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcblxyXG4gICAgICAgIH1cblxyXG4gICAgfSk7XG5cclxuICAgIFxuXHJcbiAgICAvL2Ryb3Bkb3duXG5cclxuICAgIGlmICgkKCcuanMtZHJvcGRvd24nKS5sZW5ndGggPiAwKSB7XG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWRyb3Bkb3duJywgZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgfSk7XG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cclxuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xuXHJcbiAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIH1cblxyXG4gICAgXHJcblxyXG4gICAgLypcclxuICAgICAqTGsuanNcclxuICAgICAqL1xyXG5cclxuICAgIC8vU3RpY2t5IEJsb2NrIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxuXHJcbiAgICBpZiAoJCgnLmpzLXN0aWt5LWJsb2NrJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuXHJcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5LWJsb2NrJywge1xuXHJcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDEzNSxcblxyXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcblxyXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcblxyXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5zdGlreS1ibG9ja19faW5uZXInXG5cclxuICAgICAgICB9KTtcblxyXG4gICAgfVxuXHJcbiAgICBcclxufSk7XHJcblxyXG4vKlxyXG4gKiBTbGlkZXIuanNcclxuICovXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxyXG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cblxyXG5cblxyXG4gICAgLy9TbGlkZXIgTmV3XG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5sZW5ndGggPiAwKSB7XG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5zbGljayh7XG5cclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5iei1zbGlkZXJfX2Fycm93LS1wcmV2JyxcblxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG5cclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG5cclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG5cclxuICAgICAgICAgICAgZG90czogZmFsc2UsXG5cclxuICAgICAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcblxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG5cclxuICAgICAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgICAgICB9LFxuXHJcbiAgICAgICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzMjEsXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgXVxuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIH1cblxyXG5cblxyXG4gICAgLy9TbGlkZXIgQ2FyZFxuXHJcbiAgICBpZiAoXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykubGVuZ3RoID4gMCAmJlxuXHJcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5sZW5ndGggPiAwXG5cclxuICAgICkge1xuXHJcbiAgICAgICAgY2FyZFNsaWRlcigpO1xuXHJcbiAgICB9XG5cclxuXG5cclxuICAgIGlmIChcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnKS5sZW5ndGggPiAwICYmXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdi1tb2RhbCcpLmxlbmd0aCA+IDBcblxyXG4gICAgKSB7XG5cclxuICAgICAgICBtb2RhbFNsaWRlcigpO1xuXHJcbiAgICB9XG5cclxuXG5cclxuICAgIC8vU2xpZGVyIFByb21vXG5cclxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLmxlbmd0aCA+IDApIHtcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXByb21vJykuc2xpY2soe1xuXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5iei1zbGlkZXItcHJvbW9fX2Fycm93LS1uZXh0JyxcblxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tcHJldicsXG5cclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcblxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgICAgICBzcGVlZDogNTAwLFxuXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG5cclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG5cclxuICAgICAgICAgICAgZG90czogdHJ1ZVxuXHJcbiAgICAgICAgfSk7XG5cclxuICAgIH1cblxyXG5cblxyXG4gICAgLy9TbGlkZXIgUmVsYXRlZFxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLmxlbmd0aCA+IDApIHtcblxyXG4gICAgICAgIHNsaWRlclJlbGF0ZWQoKTtcblxyXG4gICAgfVxuXHJcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLmxlbmd0aCA+IDApIHtcblxyXG4gICAgICAgIHNsaWRlclJlbGF0ZWRNb2RhbCgpO1xuXHJcbiAgICB9XG5cclxufSk7XG5cclxuXG5cclxuLy9DYXJkU2xpZGVyRnVuY3Rpb25cblxyXG5mdW5jdGlvbiBjYXJkU2xpZGVyKCkge1xuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykuc2xpY2soe1xuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG5cclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuXHJcbiAgICAgICAgZmFkZTogdHJ1ZSxcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnLFxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcblxyXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICBdXG5cclxuICAgIH0pO1xuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNyxcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHJcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcblxyXG4gICAgICAgIGRvdHM6IHRydWUsXG5cclxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuXHJcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIF1cblxyXG4gICAgfSk7XG5cclxufVxuXHJcblxuXHJcbmZ1bmN0aW9uIG1vZGFsU2xpZGVyKCkge1xuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJykuc2xpY2soe1xuXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG5cclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuXHJcbiAgICAgICAgZmFkZTogdHJ1ZSxcblxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnLFxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuXHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcblxyXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG5cclxuICAgICAgICAgICAgICAgIH1cblxyXG4gICAgICAgICAgICB9XG5cclxuICAgICAgICBdXG5cclxuICAgIH0pO1xuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdi1tb2RhbCcpLnNsaWNrKHtcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNyxcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHJcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJyxcblxyXG4gICAgICAgIGRvdHM6IHRydWUsXG5cclxuICAgICAgICAvLyBjZW50ZXJNb2RlOiB0cnVlLFxuXHJcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZVxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIF1cblxyXG4gICAgfSk7XG5cclxufVxuXHJcblxuXHJcbi8vc2xpZGVyUmVsYXRlZFxuXHJcbmZ1bmN0aW9uIHNsaWRlclJlbGF0ZWQoKSB7XG5cclxuICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljayh7XG5cclxuICAgICAgICBhcnJvd3M6IHRydWUsXG5cclxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcblxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogOCxcblxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHJcbiAgICAgICAgc3BlZWQ6IDUwMCxcblxyXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG5cclxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcblxyXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuXHJcbiAgICAgICAgICAgIHtcblxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNlxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNVxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfSxcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuXHJcbiAgICAgICAgICAgICAgICB9XG5cclxuICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgXVxuXHJcbiAgICB9KTtcblxyXG59XG5cclxuXG5cclxuZnVuY3Rpb24gc2xpZGVyUmVsYXRlZE1vZGFsKCkge1xuXHJcbiAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykuc2xpY2soe1xuXHJcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuXHJcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG5cclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG5cclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcblxyXG4gICAgICAgIHNwZWVkOiA1MDAsXG5cclxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuXHJcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG5cclxuICAgICAgICBkb3RzOiBmYWxzZSxcblxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcblxyXG4gICAgICAgICAgICB7XG5cclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH0sXG5cclxuICAgICAgICAgICAge1xuXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcblxyXG4gICAgICAgICAgICAgICAgfVxuXHJcbiAgICAgICAgICAgIH1cblxyXG4gICAgICAgIF1cblxyXG4gICAgfSk7XG5cclxufVxuXHJcblxyXG5cclxuLypcclxuICogQ2FyZC5qc1xyXG4gKi9cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvL2NhcmQgcHJvcGVydGllcyB0YWJzXHJcblxyXG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQsIC5qcy1jYXJkLXRhYi1yZWxhdGVkLS1tb2RhbCcpLnRhYnMoKTtcclxuXHJcblxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcmVsYXRlZC10YWInLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZC0tbW9kYWwnKVxyXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQtbW9kYWwnKVxyXG5cclxuICAgICAgICAgICAgLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xyXG5cclxuICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQnKVxyXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKVxyXG5cclxuICAgICAgICAgICAgLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdGFiJywgdGFicyk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdGFiLW1vZGFsJywgdGFicyk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgJCgnI3ByZXZpZXcnKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJykucmVzaXplKCk7XHJcblxyXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQtbW9kYWwnKS5yZXNpemUoKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgLy90YWJzIC0tLT4gYWNjb3JkZW9uXHJcblxyXG4gICAgZnVuY3Rpb24gdGFiVHJhbnNmb3JtKCkge1xyXG5cclxuICAgICAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJCgnLmpzLXRhYiwgLmpzLXRhYi1tb2RhbCcpXHJcblxyXG4gICAgICAgICAgICAudW53cmFwKClcclxuXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uIGFjY29yZGVvbi0tb3RoZXIganMtYWNjb3JkZW9uJylcclxuXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX190aXRsZXMnKTtcclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX3RpdGxlJylcclxuXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpXHJcblxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGUgaXMtYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgIC53cmFwKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uX19pdGVtXCI+Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMFwiXScpXHJcblxyXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG5cclxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIwXCJdJylcclxuXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKVxyXG5cclxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJylcclxuXHJcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX19jb250ZW50IHRhYl9fY29udGVudC0tcHJvZHVjdCcpO1xyXG5cclxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG5cclxuICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL0NhcmQgSXRlbSBTZWxlY3RcclxuXHJcbiAgICBjaGFuZ2VDb2xvcigpO1xyXG5cclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1pdGVtLXNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0JykubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaXRlbS1zZWxlY3QtaXRlbScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWl0ZW0tc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9fdGl0bGUnKVxyXG5cclxuICAgICAgICAgICAgLnRleHQoKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKVxyXG5cclxuICAgICAgICAgICAgLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX3ZhbHVlJyk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dCA9IHNlbGVjdC5maW5kKCcuaXRlbS1zZWxlY3RfX2lucHV0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaW5wdXQudmFsKHRleHQpO1xyXG5cclxuICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X19jb2xvcicpLmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJywgY29sb3IpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGNoYW5nZUNvbG9yKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdC5oYXNDbGFzcygnaXRlbS1zZWxlY3QtLWNvdW50JykpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpdGVtLXNlbGVjdF9faXRlbS0taGVhZGVyJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAudGV4dCgn0JLRi9Cx0YDQsNGC0YwnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZS9EZXN0cm95IEVhc3lab29tXHJcblxyXG5cclxuXHJcbiAgICAkKCcuanMtZWFzeS16b29tJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgdmFyICRlYXN5em9vbSA9ICQodGhpcykuZWFzeVpvb20oKSxcclxuXHJcbiAgICAgICAgICAgICAgICBhcGkgPSAkZWFzeXpvb20uZGF0YSgnZWFzeVpvb20nKTtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1yZWFkeScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgYXBpLl9pbml0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXBpLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgYXBpLnRlYXJkb3duKCk7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH0pLmZpbmQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuLy9TZWxlY3QgSXRlbSBjaGFuZ2VDb2xvclxyXG5cclxuZnVuY3Rpb24gY2hhbmdlQ29sb3IoKSB7XHJcblxyXG4gICAgJCgnLmpzLWl0ZW0tc2VsZWN0JylcclxuXHJcbiAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19pdGVtJylcclxuXHJcbiAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLy9UYWJzXHJcblxyXG5mdW5jdGlvbiB0YWJzKGUpIHtcclxuXHJcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT0gJ3RhYl9fdGl0bGUnKSB7XHJcblxyXG4gICAgICAgIHZhciBkYXRhVGFiID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcclxuXHJcbiAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcudGFiX19jb250ZW50Jyk7XHJcblxyXG4gICAgICAgIHZhciB0YWJUaXRsZSA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgLmZpbmQoJy50YWJfX3RpdGxlJyk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIHRhYlRpdGxlW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSBpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG4vKlxyXG4gKiBGdW5jdGlvbnMuanNcclxuICovXHJcblxyXG4vL1B1c2hVcFxuXHJcbmZ1bmN0aW9uIHB1c2hVcCh0ZXh0KSB7XG5cclxuICAgIHZhciB0ZXh0ID0gdGV4dCB8fCAn0KLQvtCy0LDRgCDQtNC+0LHQsNCy0LvQtdC9INCyINC60L7RgNC30LjQvdGDJztcblxyXG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdwdXNoVXAnKTtcblxyXG4gICAgdmFyIHB1c2hVcENsb3NlID0gJCgnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXNcIj48L2k+JykuYWRkQ2xhc3MoXG5cclxuICAgICAgICAncHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xuXHJcbiAgICApO1xuXHJcbiAgICBwdXNoQ29udGFpbmVyLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG5cclxuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcblxyXG4gICAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XG5cclxuXG5cclxuICAgIHJhZihmdW5jdGlvbigpIHtcblxyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHJcbiAgICB9KTtcblxyXG5cblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHJcbiAgICB9LCAzNTAwKTtcblxyXG5cblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XG5cclxuICAgIH0sIDQwMDApO1xuXHJcblxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcblxyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxyXG4gICAgICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuXHJcbiAgICAgICAgfSwgMzAwKTtcblxyXG4gICAgfSk7XG5cclxufVxuXHJcblxuXHJcbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cclxuZnVuY3Rpb24gcmFmKGZuKSB7XG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG5cclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuXHJcbiAgICAgICAgICAgIGZuKCk7XG5cclxuICAgICAgICB9KTtcblxyXG4gICAgfSk7XG5cclxufVxuXHJcblxyXG4iXX0=
