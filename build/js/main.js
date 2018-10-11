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

    var $selectNative = $('.js-select-native');
    if ($selectNative.length) {
        if ($selectNative) {
            if ($(window).width() >= 768) {
                $selectNative.select2({
                    minimumResultsForSearch: -1
                });
            } else {
                $selectNative.each(function () {
                    $(this).wrap('<label class="bb-select">');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzY3JvbGxCYXIiLCJsZW5ndGgiLCJuaWNlU2Nyb2xsIiwiY3Vyc29yY29sb3IiLCJob3JpenJhaWxlbmFibGVkIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJtb3VzZW92ZXIiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwiZG9jdW1lbnQiLCJyZWFkeSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImVra29MaWdodGJveCIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiJHNlbGVjdE5hdGl2ZSIsIndpZHRoIiwiZWFjaCIsIndyYXAiLCJpbnB1dG1hc2siLCJtYXNrIiwiY2xlYXJJbmNvbXBsZXRlIiwiY2xvc2VzdCIsImZpbmQiLCJtYWluT2Zmc2V0IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiY2xpY2siLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJoYXNDbGFzcyIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsIndyYXBBbGwiLCJ0b2dnbGVDbGFzcyIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwib3ZlcmZsb3ciLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsIml0ZW0iLCJjb2xvciIsImltZyIsImNvbG9yQm94Iiwic2lkZWJhciIsIlN0aWNreVNpZGViYXIiLCJ0b3BTcGFjaW5nIiwiYm90dG9tU3BhY2luZyIsImNvbnRhaW5lclNlbGVjdG9yIiwiaW5uZXJXcmFwcGVyU2VsZWN0b3IiLCJhY2NvcmRlcm9uIiwibm90Iiwic2xpZGVVcCIsInNsaWRlRG93biIsImZpbHRlciIsImlzIiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhcnJvd3MiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiYXV0b3BsYXkiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInZhcmlhYmxlV2lkdGgiLCJjYXJkU2xpZGVyIiwibW9kYWxTbGlkZXIiLCJzbGlkZXJSZWxhdGVkIiwic2xpZGVyUmVsYXRlZE1vZGFsIiwiZmFkZSIsImFzTmF2Rm9yIiwiZm9jdXNPblNlbGVjdCIsImNlbnRlck1vZGUiLCJ0YWJzIiwidGFiVHJhbnNmb3JtIiwidGFiIiwidW53cmFwIiwiY2hhbmdlQ29sb3IiLCJzZWxlY3QiLCJ2YWx1ZSIsImlucHV0IiwiY2hpbGRyZW4iLCIkZWFzeXpvb20iLCJlYXN5Wm9vbSIsImFwaSIsIl9pbml0IiwidGVhcmRvd24iLCJjbGFzc05hbWUiLCJkYXRhVGFiIiwiZ2V0QXR0cmlidXRlIiwidGFiQ29udGVudCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJwdXNoVXAiLCJwdXNoQ29udGFpbmVyIiwicHVzaFVwQ2xvc2Ui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RUFBYixFQUFpQjtBQUNiL0osV0FBT2dLLHFCQUFQLENBQTZCLFlBQVc7QUFDcENoSyxlQUFPZ0sscUJBQVAsQ0FBNkIsWUFBVztBQUNwQ0Q7QUFDSCxTQUZEO0FBR0gsS0FKRDtBQUtIIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFxuICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgKSB7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaW9zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCd3ZWInKTtcbiAgICB9XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAvL0dldE5pY2VTY3JvbGwgaHR0cHM6Ly9naXRodWIuY29tL2ludXlha3NhL2pxdWVyeS5uaWNlc2Nyb2xsXG4gICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcbiAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xuICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcbiAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcbiAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxuICAgICAgICAgICAgdmVyZ2U6IDUwMCxcbiAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMCdcbiAgICAgICAgfSk7XG4gICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcbiAgICAgICAgICAgICAgICAucmVzaXplKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgLy9Cb290c3N0cmFwIGxpZ2h0Ym94IGdhbGxhcnlcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtdG9nZ2xlPVwibGlnaHRib3hcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQodGhpcykuZWtrb0xpZ2h0Ym94KCk7XG4gICAgfSk7XG5cbiAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2VsZWN0LnNlbGVjdC13aXRoLWljb24nKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljLFxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbWFnZSBzZWxlY3QnKTtcbiAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcbiAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwic29ydGluZy1pY29uIHNvcnRpbmctaWNvbi0tJyArXG4gICAgICAgICAgICAgICAgICAgIG9wdGltYWdlICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xuICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAkb3B0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGxldCAkc2VsZWN0TmF0aXZlID0gJCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcbiAgICBpZiAoJHNlbGVjdE5hdGl2ZS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCRzZWxlY3ROYXRpdmUpIHtcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcbiAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLnNlbGVjdDIoe1xuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLndyYXAoJzxsYWJlbCBjbGFzcz1cImJiLXNlbGVjdFwiPicpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCB8fCAkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnOTktOTktOTk5OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9DaGFuZ2UgZm9ybSB0aXRsZVxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZm9ybS10aXRsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XG5cbiAgICAgICAgJCgnLmpzLWZvcm0tdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmZvcm0nKVxuICAgICAgICAgICAgLmZpbmQoJy5mb3JtX19idG4nKVxuICAgICAgICAgICAgLnRleHQodGV4dCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XG4gICAgfVxuICAgIG1haW5PZmZzZXQoKTtcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0sIDgwMCk7XG4gICAgfSk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuY3NzKCdib3R0b20nLCA3MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XG4gICAgICAgIGZvb3RlclxuICAgICAgICAgICAgLmZpbmQoJy5mb290ZXItaXRlbScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpO1xuICAgIH1cblxuICAgIC8vSGFtYnVyZ2VyIGJ0blxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5qcy1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPVxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID09PSAnJyA/ICdoaWRkZW4nIDogJyc7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAvL1doZW4gY2xpY2sgb3V0c2lkZVxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXG4gICAgICAgICAgICAgICAgJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93J1xuICAgICAgICAgICAgKS5sZW5ndGhcbiAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkKCcuanMtaGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgLy9Nb2JpbGUgTmF2XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnByZXBlbmRUbygnLndyYXBwZXIgJyk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbmF2SXRlbURyb3Bkb3duMiA9IG5hdkl0ZW0uZmluZCgnLm5hdi1kcm9wZG93bl9faXRlbScpO1xuICAgICAgICAgICAgbGV0IG1haW5Ecm9wZG93biA9ICQodGhpcykuY2xvc2VzdCgnLm5hdi1tYWluX19kcm9wZG93bicpO1xuXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgIGxldCBibG9jayA9ICQoXG4gICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm5hdi1kcm9wZG93bl9fdGl0bGUgbmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcFwiPidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIobmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpKVxuICAgICAgICAgICAgICAgICAgICAudGV4dCh0aXRsZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgIW5hdkl0ZW1Ecm9wZG93bi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhKFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24uY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bi5maW5kKCcubmF2LWRyb3Bkb3duX190aXRsZS0tdGVtcCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgKCQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24yLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBtYWluRHJvcGRvd24ucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgICAgIHZhciBzZWFyY2ggPSAkKCcuanMtc2VhcmNoJyk7XG4gICAgICAgIHZhciBzZWFyY2hCdG5TaG93ID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtLXNob3cnKTtcblxuICAgICAgICBzZWFyY2hCdG5TaG93Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzZWFyY2guaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLnNlYXJjaF9faGludCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlYXJjaC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggd2hlbiBjbGljayBvdXRzaWRlXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmxlbmd0aFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHNlYXJjaC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5qcy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBoZWFkZXJNYWluID0gJCgnLmhlYWRlci1tYWluJyk7XG4gICAgICAgIGxldCBoZWFkZXJNYWluQ2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLW1haW4tLWNsb25lXCI+JylcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIDg1KVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCcuaGVhZGVyLW1haW4nKVxuICAgICAgICAgICAgLmhpZGUoKTtcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2hvdyBQYXNzd29yZFxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgfSk7XG4gICAgLy9IaWRlIFBhc3N3b3JkXG4gICAgJCgnLmpzLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wcmV2KClcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICB9KTtcblxuICAgIC8vYnRuIGZhdm9yaXRlXG4gICAgJCgnLmpzLWJ1dHRvbi1pY29uLS1mYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgICogQ2F0YWxvZy5qc1xuICAgICAqL1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jb2xvci1pdGVtJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXByb2R1Y3QtaXRlbScpO1xuICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XG4gICAgICAgIGxldCBpbWcgPSBpdGVtLmZpbmQoJy5wcm9kdWN0LWl0ZW1fX2ltYWdlJyk7XG4gICAgXG4gICAgICAgIGltZy5hdHRyKCdzcmMnLCBjb2xvcik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0NoYW5nZXJcbiAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19pdGVtJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX3Jlc2V0JylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5jaGFuZ2VyX19pdGVtJyk7XG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19zdWJpdGVtJylcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29sb3InKTtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2ZpbHRlci1jb2xvcicpO1xuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcbiAgICAgICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdqcy1zY3JvbGwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcbiAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcbiAgICAgICAgICAgIC5yZXNpemUoKTtcbiAgICB9XG4gICAgXG4gICAgLy9DYXRhbG9nIEZpbHRlciBBY3Rpb25cbiAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfSk7XG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSA9ICcnO1xuICAgIH0pO1xuICAgIFxuICAgIC8vU3RpY2t5IEJsb2NrIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxuICAgIGlmICgkKCcuanMtc3Rpa3knKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDg1LFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMjAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5zdGlreS1jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLnN0aWt5LWlubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICAqIENvbXBvbmVudHMuanNcbiAgICAgKi9cblxuICAgIC8vQWNjb3JkZW9uXG4gICAgaWYgKCQoJy5qcy1hY2NvcmRlb24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBhY2NvcmRlcm9uID0gJCgnLmpzLWFjY29yZGVvbicpO1xuICAgIFxuICAgICAgICBhY2NvcmRlcm9uXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnNsaWRlVXAoKTtcbiAgICAgICAgYWNjb3JkZXJvblxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW06Zmlyc3QnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgIC5zbGlkZURvd24oKTtcbiAgICBcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5hY2NvcmRlb25fX3RpdGxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYWNjb3JkZXJvbi5oYXNDbGFzcygnbGtfX2FjY29yZGVvbicpKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2l0ZW0nKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoJzpmaXJzdCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9C/0L7QtNGA0L7QsdC90LXQtScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1vcmRlcl9faW5mbycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9GB0LrRgNGL0YLRjCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy9jaGVja2JveFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXG4gICAgICAgICkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9jaGVja2JveC0tcHNldWRvXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vZHJvcGRvd25cbiAgICBpZiAoJCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWRyb3Bkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAgKkxrLmpzXG4gICAgICovXG5cbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcbiAgICBpZiAoJCgnLmpzLXN0aWt5LWJsb2NrJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3ktYmxvY2snLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiAxMzUsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktYmxvY2tfX2lubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59KTtcblxuLypcbiAqIFNsaWRlci5qc1xuICovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG5cbiAgICAvL1NsaWRlciBOZXdcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tbmV3JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1uZXcnKS5zbGljayh7XG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzIxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2xpZGVyIENhcmRcbiAgICBpZiAoXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5sZW5ndGggPiAwICYmXG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbmF2JykubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgICBjYXJkU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJykubGVuZ3RoID4gMCAmJlxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdi1tb2RhbCcpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgICAgbW9kYWxTbGlkZXIoKTtcbiAgICB9XG5cbiAgICAvL1NsaWRlciBQcm9tb1xuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1wcm9tbycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5zbGljayh7XG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuYnotc2xpZGVyLXByb21vX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9TbGlkZXIgUmVsYXRlZFxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykubGVuZ3RoID4gMCkge1xuICAgICAgICBzbGlkZXJSZWxhdGVkKCk7XG4gICAgfVxuICAgIGlmICgkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykubGVuZ3RoID4gMCkge1xuICAgICAgICBzbGlkZXJSZWxhdGVkTW9kYWwoKTtcbiAgICB9XG59KTtcblxuLy9DYXJkU2xpZGVyRnVuY3Rpb25cbmZ1bmN0aW9uIGNhcmRTbGlkZXIoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkJyxcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogJ3Vuc2xpY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbW9kYWxTbGlkZXIoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW5hdi1tb2RhbCcsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdi1tb2RhbCcpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgYXNOYXZGb3I6ICcuanMtYnotc2xpZGVyLS1jYXJkLW1vZGFsJyxcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogJ3Vuc2xpY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuLy9zbGlkZXJSZWxhdGVkXG5mdW5jdGlvbiBzbGlkZXJSZWxhdGVkKCkge1xuICAgICQoJy5qcy1iei1zbGlkZXItLXJlbGF0ZWQnKS5zbGljayh7XG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogOCxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAzNzYsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNsaWRlclJlbGF0ZWRNb2RhbCgpIHtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykuc2xpY2soe1xuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xufVxuXG5cbi8qXG4gKiBDYXJkLmpzXG4gKi9cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIC8vY2FyZCBwcm9wZXJ0aWVzIHRhYnNcbiAgICAkKCcuanMtY2FyZC10YWItcmVsYXRlZCwgLmpzLWNhcmQtdGFiLXJlbGF0ZWQtLW1vZGFsJykudGFicygpO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1yZWxhdGVkLXRhYicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkLS1tb2RhbCcpXG4gICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpXG4gICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpXG4gICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpXG4gICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy10YWInLCB0YWJzKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy10YWItbW9kYWwnLCB0YWJzKTtcbiAgICB9XG5cbiAgICAkKCcjcHJldmlldycpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnKS5yZXNpemUoKTtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLnJlc2l6ZSgpO1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgICAgIHRhYlRyYW5zZm9ybSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL3RhYnMgLS0tPiBhY2NvcmRlb25cbiAgICBmdW5jdGlvbiB0YWJUcmFuc2Zvcm0oKSB7XG4gICAgICAgIHZhciB0YWIgPSAkKCcuanMtdGFiLS10cmFuc2Zvcm0nKTtcblxuICAgICAgICAkKCcuanMtdGFiLCAuanMtdGFiLW1vZGFsJylcbiAgICAgICAgICAgIC51bndyYXAoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb24gYWNjb3JkZW9uLS1vdGhlciBqcy1hY2NvcmRlb24nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlcycpO1xuICAgICAgICB0YWIuZmluZCgnLnRhYl9fdGl0bGUnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygndGFiX190aXRsZSBpcy1hY3RpdmUnKVxuICAgICAgICAgICAgLndyYXAoJzxkaXYgY2xhc3M9XCJhY2NvcmRlb25fX2l0ZW1cIj4nKTtcblxuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJylcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjBcIl0nKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMVwiXScpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxuICAgICAgICAgICAgLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIxXCJdJyk7XG5cbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX2NvbnRlbnQgdGFiX19jb250ZW50LS1wcm9kdWN0Jyk7XG4gICAgICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8vQ2FyZCBJdGVtIFNlbGVjdFxuICAgIGNoYW5nZUNvbG9yKCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWl0ZW0tc2VsZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1pdGVtLXNlbGVjdC1pdGVtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKTtcbiAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpXG4gICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAudGV4dCgpO1xuICAgICAgICBsZXQgY29sb3IgPSAkKHRoaXMpXG4gICAgICAgICAgICAuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpXG4gICAgICAgICAgICAuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9fdmFsdWUnKTtcbiAgICAgICAgbGV0IGlucHV0ID0gc2VsZWN0LmZpbmQoJy5pdGVtLXNlbGVjdF9faW5wdXQnKTtcblxuICAgICAgICBpbnB1dC52YWwodGV4dCk7XG4gICAgICAgIHZhbHVlLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX2NvbG9yJykuZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InLCBjb2xvcik7XG5cbiAgICAgICAgY2hhbmdlQ29sb3IoKTtcblxuICAgICAgICBpZiAoc2VsZWN0Lmhhc0NsYXNzKCdpdGVtLXNlbGVjdC0tY291bnQnKSkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0X19pdGVtLS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQktGL0LHRgNCw0YLRjCcpO1xuICAgICAgICAgICAgICAgIGlucHV0LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fdGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBJbml0aWFsaXplL0Rlc3Ryb3kgRWFzeVpvb21cbiAgICAkKCcuanMtZWFzeS16b29tJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyICRlYXN5em9vbSA9ICQodGhpcykuZWFzeVpvb20oKSxcbiAgICAgICAgICAgIGFwaSA9ICRlYXN5em9vbS5kYXRhKCdlYXN5Wm9vbScpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdpcy1yZWFkeScpKSB7XG4gICAgICAgICAgICBhcGkuX2luaXQoKTtcbiAgICAgICAgICAgIGFwaS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcGkudGVhcmRvd24oKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn0pO1xuXG4vL1NlbGVjdCBJdGVtIGNoYW5nZUNvbG9yXG5mdW5jdGlvbiBjaGFuZ2VDb2xvcigpIHtcbiAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgIH0pXG4gICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2l0ZW0nKVxuICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY29sb3JCb3ggPSAkKHRoaXMpLmZpbmQoJy5pdGVtLXNlbGVjdF9fY29sb3InKTtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGNvbG9yQm94LmRhdGEoJ2l0ZW0tc2VsZWN0LWNvbG9yJyk7XG4gICAgICAgICAgICBjb2xvckJveC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgICAgIH0pO1xufVxuXG4vL1RhYnNcbmZ1bmN0aW9uIHRhYnMoZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAndGFiX190aXRsZScpIHtcbiAgICAgICAgdmFyIGRhdGFUYWIgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xuICAgICAgICB2YXIgdGFiQ29udGVudCA9ICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJy50YWJfX2NvbnRlbnQnKTtcbiAgICAgICAgdmFyIHRhYlRpdGxlID0gJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnLnRhYl9fdGl0bGUnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJUaXRsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhVGFiID09IGkpIHtcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLypcbiAqIEZ1bmN0aW9ucy5qc1xuICovXG5cbi8vUHVzaFVwXG5mdW5jdGlvbiBwdXNoVXAodGV4dCkge1xuICAgIHZhciB0ZXh0ID0gdGV4dCB8fCAn0KLQvtCy0LDRgCDQtNC+0LHQsNCy0LvQtdC9INCyINC60L7RgNC30LjQvdGDJztcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3B1c2hVcCcpO1xuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxuICAgICAgICAncHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xuICAgICk7XG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcbiAgICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcblxuICAgIHJhZihmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9LCAzNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH0pO1xufVxuXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxuZnVuY3Rpb24gcmFmKGZuKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4iXX0=
