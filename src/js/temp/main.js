'use strict';

$(window).on('load', function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    } else {
        $('body').addClass('web');
    }
    $('body').removeClass('loading');
});

$(document).ready(function () {
    $(window).on('load', function () {
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

    zoom();

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

//Zoom
function zoom() {
    if ($(window).width() > 480) {
        $('.js-zoom').okzoom({
            width: 200,
            height: 200,
            round: true,
            background: '#fff',
            // backgroundRepeat: 'repeat',
            scaleWidth: 700,
            shadow: '0 0 5px #000',
            border: '1px solid black'
        });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkb2N1bWVudCIsInJlYWR5Iiwic2Nyb2xsQmFyIiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiaG9yaXpyYWlsZW5hYmxlZCIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwibW91c2VvdmVyIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsImNsb3Nlc3QiLCJmaW5kIiwibWFpbk9mZnNldCIsImNzcyIsIm91dGVySGVpZ2h0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImNsaWNrIiwiZWxlbWVudENsaWNrIiwiYXR0ciIsImRlc3RpbmF0aW9uIiwib2Zmc2V0IiwidG9wIiwic2Nyb2xsIiwiaGVpZ2h0IiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsIndyYXBBbGwiLCJ0b2dnbGVDbGFzcyIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwib3ZlcmZsb3ciLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsIml0ZW0iLCJjb2xvciIsImltZyIsImVhY2giLCJjb2xvckJveCIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiYWNjb3JkZXJvbiIsIm5vdCIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJmaWx0ZXIiLCJpcyIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiY2FyZFNsaWRlciIsIm1vZGFsU2xpZGVyIiwic2xpZGVyUmVsYXRlZCIsInNsaWRlclJlbGF0ZWRNb2RhbCIsImZhZGUiLCJhc05hdkZvciIsImZvY3VzT25TZWxlY3QiLCJjZW50ZXJNb2RlIiwidGFicyIsInpvb20iLCJ0YWJUcmFuc2Zvcm0iLCJ0YWIiLCJ1bndyYXAiLCJ3cmFwIiwiY2hhbmdlQ29sb3IiLCJzZWxlY3QiLCJ2YWx1ZSIsImlucHV0IiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJkYXRhVGFiIiwiZ2V0QXR0cmlidXRlIiwidGFiQ29udGVudCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImRpc3BsYXkiLCJva3pvb20iLCJyb3VuZCIsImJhY2tncm91bmQiLCJzY2FsZVdpZHRoIiwic2hhZG93IiwiYm9yZGVyIiwicHVzaFVwIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwiYXBwZW5kVG8i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QUksWUFBVztBQUNYSCxzQkFBY3JKLFFBQWQsQ0FBdUIsV0FBdkI7QUFDSCxLQUZEOztBQUlBeUosZUFBVyxZQUFXO0FBQ2xCSixzQkFBY3BKLFdBQWQsQ0FBMEIsV0FBMUI7QUFDSCxLQUZELEVBRUcsSUFGSDs7QUFJQXdKLGVBQVcsWUFBVztBQUNsQkosc0JBQWM5RSxNQUFkO0FBQ0gsS0FGRCxFQUVHLElBRkg7O0FBSUE3RSxNQUFFUSxRQUFGLEVBQVlOLEVBQVosQ0FBZSxPQUFmLEVBQXdCLG1CQUF4QixFQUE2QyxZQUFXO0FBQ3BEeUosc0JBQWNwSixXQUFkLENBQTBCLFdBQTFCO0FBQ0F3SixtQkFBVyxZQUFXO0FBQ2xCSiwwQkFBYzlFLE1BQWQ7QUFDSCxTQUZELEVBRUcsR0FGSDtBQUdILEtBTEQ7QUFNSDs7QUFFRDtBQUNBLFNBQVNpRixHQUFULENBQWFFLEVBQWIsRUFBaUI7QUFDYi9KLFdBQU9nSyxxQkFBUCxDQUE2QixZQUFXO0FBQ3BDaEssZUFBT2dLLHFCQUFQLENBQTZCLFlBQVc7QUFDcENEO0FBQ0gsU0FGRDtBQUdILEtBSkQ7QUFLSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKFxuICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgKSB7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaW9zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCd3ZWInKTtcbiAgICB9XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG59KTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjMmMyYjJiJyxcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzAnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjcm9sbEJhci5tb3VzZW92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuanMtc2VsZWN0LnNlbGVjdC13aXRoLWljb24nKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljLFxuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbWFnZSBzZWxlY3QnKTtcbiAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcbiAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwic29ydGluZy1pY29uIHNvcnRpbmctaWNvbi0tJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDAgfHwgJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJzk5LTk5LTk5OTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2hhbmdlIGZvcm0gdGl0bGVcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWZvcm0tdGl0bGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XG5cbiAgICAgICAgJCgnLmpzLWZvcm0tdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmZvcm0nKVxuICAgICAgICAgICAgLmZpbmQoJy5mb3JtX19idG4nKVxuICAgICAgICAgICAgLnRleHQodGV4dCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtYWluT2Zmc2V0KCkge1xuICAgICAgICAkKCcubWFpbicpLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XG4gICAgfVxuICAgIG1haW5PZmZzZXQoKTtcbiAgICAkKHdpbmRvdykucmVzaXplKG1haW5PZmZzZXQpO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA4MDApO1xuICAgIH0pO1xuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4JyB9LCAzMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIGlmICgkKCcubWFpbicpLmhhc0NsYXNzKCdjYXRhbG9nJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmNzcygnYm90dG9tJywgNzApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL1N0b3AgZHJhZ1xuICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLy9Gb290ZXIgbWVkaWEgPD0gNDgwIHRyYW5zZm9ybSBhY2NvcmRlb25cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIGxldCBmb290ZXIgPSAkKCcuanMtZm9vdGVyJyk7XG4gICAgICAgIGZvb3RlclxuICAgICAgICAgICAgLmZpbmQoJy5mb290ZXItaXRlbScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAud3JhcEFsbCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbiBqcy1hY2NvcmRlb25cIj4nKTtcbiAgICAgICAgZm9vdGVyLmZpbmQoJy5mb290ZXItaXRlbV9fdGl0bGUnKS5hZGRDbGFzcygnYWNjb3JkZW9uX190aXRsZScpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX19jb250ZW50JykuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpO1xuICAgIH1cblxuICAgIC8vSGFtYnVyZ2VyIGJ0blxuICAgICQoJy5qcy1oYW1idXJnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcbiAgICAgICAgJCgnLmpzLW5hdi1tYWluJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnLmpzLW92ZXJsYXknKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPT09ICcnID8gJ2hpZGRlbicgOiAnJztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIC8vV2hlbiBjbGljayBvdXRzaWRlXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxuICAgICAgICAgICAgICAgICcuanMtaGFtYnVyZ2VyLCAuanMtbmF2LW1haW4sIC5qcy1jYXRhbG9nLWZpbHRlci0tc2hvdydcbiAgICAgICAgICAgICkubGVuZ3RoXG4gICAgICAgIClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWhhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlID0gJyc7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgIC8vTW9iaWxlIE5hdlxuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS5wcmVwZW5kVG8oJy53cmFwcGVyICcpO1xuICAgICAgICAkKCcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XG5cbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgbGV0IGJsb2NrID0gJChcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibmF2LWRyb3Bkb3duX190aXRsZSBuYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wXCI+J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KHRpdGxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL01vYmlsZSBTZWFyY2hcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xuXG4gICAgICAgIHNlYXJjaEJ0blNob3cub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaGVhZGVyTWFpbiA9ICQoJy5oZWFkZXItbWFpbicpO1xuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCA4NSlcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJylcbiAgICAgICAgICAgIC5oaWRlKCk7XG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2hvdyBQYXNzd29yZFxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5uZXh0KClcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICB9KTtcbiAgICAvL0hpZGUgUGFzc3dvcmRcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgfSk7XG5cbiAgICAvL2J0biBmYXZvcml0ZVxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgKiBDYXRhbG9nLmpzXG4gICAgKi9cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY29sb3ItaXRlbScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcbiAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xuICAgICAgICBsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xuICAgIFxuICAgICAgICBpbWcuYXR0cignc3JjJywgY29sb3IpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9DaGFuZ2VyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xuICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcbiAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fc3ViaXRlbScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdmaWx0ZXItY29sb3InKTtcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXG4gICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAucmVzaXplKCk7XG4gICAgfVxuICAgIFxuICAgIC8vQ2F0YWxvZyBGaWx0ZXIgQWN0aW9uXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH0pO1xuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcbiAgICB9KTtcbiAgICBcbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcbiAgICBpZiAoJCgnLmpzLXN0aWt5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3knLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiA4NSxcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDIwLFxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuc3Rpa3ktY29udGVudCcsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5zdGlreS1pbm5lcidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqIENvbXBvbmVudHMuanNcbiAgICAqL1xuXG4gICAgLy9BY2NvcmRlb25cbiAgICBpZiAoJCgnLmpzLWFjY29yZGVvbicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IGFjY29yZGVyb24gPSAkKCcuanMtYWNjb3JkZW9uJyk7XG4gICAgXG4gICAgICAgIGFjY29yZGVyb25cbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgICAgIC5ub3QoJzpmaXJzdCcpXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICBhY2NvcmRlcm9uXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbTpmaXJzdCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuICAgIFxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFjY29yZGVvbl9fdGl0bGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhY2NvcmRlcm9uLmhhc0NsYXNzKCdsa19fYWNjb3JkZW9uJykpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAgICAgLmZpbHRlcignOmZpcnN0JylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0L/QvtC00YDQvtCx0L3QtdC1Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0YHQutGA0YvRgtGMJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL2NoZWNrYm94XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2NoZWNrYm94LS1wc2V1ZG9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9kcm9wZG93blxuICAgIGlmICgkKCcuanMtZHJvcGRvd24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZHJvcGRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICpMay5qc1xuICAgICovXG5cbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcbiAgICBpZiAoJCgnLmpzLXN0aWt5LWJsb2NrJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3ktYmxvY2snLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiAxMzUsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktYmxvY2tfX2lubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59KTtcblxuLypcbiogU2xpZGVyLmpzXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xuXG4gICAgLy9TbGlkZXIgTmV3XG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL1NsaWRlciBDYXJkXG4gICAgaWYgKFxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykubGVuZ3RoID4gMCAmJlxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgICAgY2FyZFNsaWRlcigpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnKS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICAgIG1vZGFsU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgLy9TbGlkZXIgUHJvbW9cbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXByb21vJykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2xpZGVyUmVsYXRlZCgpO1xuICAgIH1cbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2xpZGVyUmVsYXRlZE1vZGFsKCk7XG4gICAgfVxufSk7XG5cbi8vQ2FyZFNsaWRlckZ1bmN0aW9uXG5mdW5jdGlvbiBjYXJkU2xpZGVyKCkge1xuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogNyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZCcsXG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vZGFsU2xpZGVyKCkge1xuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogNyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcsXG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cbi8vc2xpZGVyUmVsYXRlZFxuZnVuY3Rpb24gc2xpZGVyUmVsYXRlZCgpIHtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzbGlkZXJSZWxhdGVkTW9kYWwoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLnNsaWNrKHtcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuXG4vKlxuKiBDYXJkLmpzXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL2NhcmQgcHJvcGVydGllcyB0YWJzXG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQsIC5qcy1jYXJkLXRhYi1yZWxhdGVkLS1tb2RhbCcpLnRhYnMoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcmVsYXRlZC10YWInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkLS1tb2RhbCcpXG4gICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpXG4gICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpXG4gICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpXG4gICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy10YWInLCB0YWJzKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy10YWItbW9kYWwnLCB0YWJzKTtcbiAgICB9XG5cbiAgICB6b29tKCk7XG5cbiAgICAkKCcjcHJldmlldycpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLnJlc2l6ZSgpO1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykucmVzaXplKCk7XG5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAgICAgdGFiVHJhbnNmb3JtKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xuXG4gICAgICAgICQoJy5qcy10YWIsIC5qcy10YWItbW9kYWwnKVxuICAgICAgICAgICAgLnVud3JhcCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbiBhY2NvcmRlb24tLW90aGVyIGpzLWFjY29yZGVvbicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpXG4gICAgICAgICAgICAud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xuXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKVxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJylcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcblxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fY29udGVudCB0YWJfX2NvbnRlbnQtLXByb2R1Y3QnKTtcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnRlcycpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgLy9DYXJkIEl0ZW0gU2VsZWN0XG4gICAgY2hhbmdlQ29sb3IoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaXRlbS1zZWxlY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1pdGVtLXNlbGVjdC1pdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xuICAgICAgICBsZXQgdGV4dCA9ICQodGhpcylcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgIC50ZXh0KCk7XG4gICAgICAgIGxldCBjb2xvciA9ICQodGhpcylcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJylcbiAgICAgICAgICAgIC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xuICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xuXG4gICAgICAgIGlucHV0LnZhbCh0ZXh0KTtcbiAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicsIGNvbG9yKTtcblxuICAgICAgICBjaGFuZ2VDb2xvcigpO1xuXG4gICAgICAgIGlmIChzZWxlY3QuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0LS1jb3VudCcpKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXRlbS1zZWxlY3RfX2l0ZW0tLWhlYWRlcicpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CS0YvQsdGA0LDRgtGMJyk7XG4gICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4vL1NlbGVjdCBJdGVtIGNoYW5nZUNvbG9yXG5mdW5jdGlvbiBjaGFuZ2VDb2xvcigpIHtcbiAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICB9KTtcbn1cblxuLy9UYWJzXG5mdW5jdGlvbiB0YWJzKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT0gJ3RhYl9fdGl0bGUnKSB7XG4gICAgICAgIHZhciBkYXRhVGFiID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcbiAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcudGFiX19jb250ZW50Jyk7XG4gICAgICAgIHZhciB0YWJUaXRsZSA9ICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJy50YWJfX3RpdGxlJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRhYlRpdGxlW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSBpKSB7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vL1pvb21cbmZ1bmN0aW9uIHpvb20oKSB7XG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XG4gICAgICAgICQoJy5qcy16b29tJykub2t6b29tKHtcbiAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgIHJvdW5kOiB0cnVlLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmYnLFxuICAgICAgICAgICAgLy8gYmFja2dyb3VuZFJlcGVhdDogJ3JlcGVhdCcsXG4gICAgICAgICAgICBzY2FsZVdpZHRoOiA3MDAsXG4gICAgICAgICAgICBzaGFkb3c6ICcwIDAgNXB4ICMwMDAnLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJ1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLypcbiogRnVuY3Rpb25zLmpzXG4qL1xuXG4vL1B1c2hVcFxuZnVuY3Rpb24gcHVzaFVwKHRleHQpIHtcbiAgICB2YXIgdGV4dCA9IHRleHQgfHwgJ9Ci0L7QstCw0YAg0LTQvtCx0LDQstC70LXQvSDQsiDQutC+0YDQt9C40L3Rgyc7XG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdwdXNoVXAnKTtcbiAgICB2YXIgcHVzaFVwQ2xvc2UgPSAkKCc8aSBjbGFzcz1cImZhbCBmYS10aW1lc1wiPjwvaT4nKS5hZGRDbGFzcyhcbiAgICAgICAgJ3B1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcbiAgICApO1xuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcbiAgICBwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XG4gICAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XG5cbiAgICByYWYoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSwgMzUwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH0sIDQwMDApO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoVXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9KTtcbn1cblxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbmZ1bmN0aW9uIHJhZihmbikge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmbigpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuIl19
