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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzY3JvbGxCYXIiLCJsZW5ndGgiLCJuaWNlU2Nyb2xsIiwiY3Vyc29yY29sb3IiLCJob3JpenJhaWxlbmFibGVkIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJtb3VzZW92ZXIiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwiZG9jdW1lbnQiLCJyZWFkeSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImVra29MaWdodGJveCIsImFkZFVzZXJQaWMiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJ0ZXh0Iiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiZGF0YSIsIiRvcHQiLCJzZWxlY3QyIiwicGxhY2Vob2xkZXIiLCJ0ZW1wbGF0ZVJlc3VsdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsImNsb3Nlc3QiLCJmaW5kIiwibWFpbk9mZnNldCIsImNzcyIsIm91dGVySGVpZ2h0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImNsaWNrIiwiZWxlbWVudENsaWNrIiwiYXR0ciIsImRlc3RpbmF0aW9uIiwib2Zmc2V0IiwidG9wIiwic2Nyb2xsIiwiaGVpZ2h0IiwiaGFzQ2xhc3MiLCJ3aWR0aCIsInJlbW92ZUF0dHIiLCJldmVudCIsImZvb3RlciIsIndyYXBBbGwiLCJ0b2dnbGVDbGFzcyIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwib3ZlcmZsb3ciLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmVwZW5kVG8iLCJuYXZJdGVtIiwibmF2SXRlbURyb3Bkb3duIiwibmF2SXRlbURyb3Bkb3duMiIsIm1haW5Ecm9wZG93biIsInRpdGxlIiwiYmxvY2siLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsInNlYXJjaCIsInNlYXJjaEJ0blNob3ciLCJ2YWwiLCJoZWFkZXJNYWluIiwiaGVhZGVyTWFpbkNsb25lIiwiaGlkZSIsInNob3ciLCJuZXh0IiwicGFyZW50IiwicHJldiIsIml0ZW0iLCJjb2xvciIsImltZyIsImVhY2giLCJjb2xvckJveCIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiYWNjb3JkZXJvbiIsIm5vdCIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJmaWx0ZXIiLCJpcyIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImF1dG9wbGF5IiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJ2YXJpYWJsZVdpZHRoIiwiY2FyZFNsaWRlciIsIm1vZGFsU2xpZGVyIiwic2xpZGVyUmVsYXRlZCIsInNsaWRlclJlbGF0ZWRNb2RhbCIsImZhZGUiLCJhc05hdkZvciIsImZvY3VzT25TZWxlY3QiLCJjZW50ZXJNb2RlIiwidGFicyIsInRhYlRyYW5zZm9ybSIsInRhYiIsInVud3JhcCIsIndyYXAiLCJjaGFuZ2VDb2xvciIsInNlbGVjdCIsInZhbHVlIiwiaW5wdXQiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlzcGxheSIsInB1c2hVcCIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsImFwcGVuZFRvIiwicmFmIiwic2V0VGltZW91dCIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIl0sIm1h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bkIsRUFBWixDQUFlLE9BQWYsRUFBd0IsbUJBQXhCLEVBQTZDLFlBQVc7QUFDcERtSixzQkFBYzlJLFdBQWQsQ0FBMEIsV0FBMUI7QUFDQWtKLG1CQUFXLFlBQVc7QUFDbEJKLDBCQUFjdkUsTUFBZDtBQUNILFNBRkQsRUFFRyxHQUZIO0FBR0gsS0FMRDtBQU1IOztBQUVEO0FBQ0EsU0FBUzBFLEdBQVQsQ0FBYUUsRUFBYixFQUFpQjtBQUNiekosV0FBTzBKLHFCQUFQLENBQTZCLFlBQVc7QUFDcEMxSixlQUFPMEoscUJBQVAsQ0FBNkIsWUFBVztBQUNwQ0Q7QUFDSCxTQUZEO0FBR0gsS0FKRDtBQUtIIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoXG4gICAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpb3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlYicpO1xuICAgIH1cbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcbiAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xuICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xuICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XG4gICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyMyYzJiMmInLFxuICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXG4gICAgICAgICAgICB2ZXJnZTogNTAwLFxuICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxuICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xuICAgICAgICB9KTtcbiAgICAgICAgc2Nyb2xsQmFyLm1vdXNlb3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy9Cb290c3N0cmFwIGxpZ2h0Ym94IGdhbGxhcnlcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtdG9nZ2xlPVwibGlnaHRib3hcIl0nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS5la2tvTGlnaHRib3goKTtcbiAgICB9KTtcblxuICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1zZWxlY3Quc2VsZWN0LXdpdGgtaWNvbicpLnNlbGVjdDIoe1xuICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGFkZFVzZXJQaWMsXG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltYWdlIHNlbGVjdCcpO1xuICAgICAgICAgICAgaWYgKCFvcHQuaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3B0aW1hZ2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdpbWFnZScpO1xuICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJzb3J0aW5nLWljb24gc29ydGluZy1pY29uLS0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGltYWdlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICQob3B0LmVsZW1lbnQpLnRleHQoKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAkb3B0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCB8fCAkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnOTktOTktOTk5OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9DaGFuZ2UgZm9ybSB0aXRsZVxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZm9ybS10aXRsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGl0bGUnKTtcblxuICAgICAgICAkKCcuanMtZm9ybS10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuZm9ybScpXG4gICAgICAgICAgICAuZmluZCgnLmZvcm1fX2J0bicpXG4gICAgICAgICAgICAudGV4dCh0ZXh0KTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG1haW5PZmZzZXQoKSB7XG4gICAgICAgICQoJy5tYWluJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcbiAgICB9XG4gICAgbWFpbk9mZnNldCgpO1xuICAgICQod2luZG93KS5yZXNpemUobWFpbk9mZnNldCk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDgwMCk7XG4gICAgfSk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnIH0sIDMwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgaWYgKCQoJy5tYWluJykuaGFzQ2xhc3MoJ2NhdGFsb2cnKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuY3NzKCdib3R0b20nLCA3MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvL0Zvb3RlciBtZWRpYSA8PSA0ODAgdHJhbnNmb3JtIGFjY29yZGVvblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgbGV0IGZvb3RlciA9ICQoJy5qcy1mb290ZXInKTtcbiAgICAgICAgZm9vdGVyXG4gICAgICAgICAgICAuZmluZCgnLmZvb3Rlci1pdGVtJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgICAgIC53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiYWNjb3JkZW9uIGpzLWFjY29yZGVvblwiPicpO1xuICAgICAgICBmb290ZXIuZmluZCgnLmZvb3Rlci1pdGVtX190aXRsZScpLmFkZENsYXNzKCdhY2NvcmRlb25fX3RpdGxlJyk7XG4gICAgICAgIGZvb3Rlci5maW5kKCcuZm9vdGVyLWl0ZW1fX2NvbnRlbnQnKS5hZGRDbGFzcygnYWNjb3JkZW9uX19jb250ZW50Jyk7XG4gICAgfVxuXG4gICAgLy9IYW1idXJnZXIgYnRuXG4gICAgJCgnLmpzLWhhbWJ1cmdlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xuICAgICAgICAkKCcuanMtbmF2LW1haW4nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuanMtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID1cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9PT0gJycgPyAnaGlkZGVuJyA6ICcnO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgLy9XaGVuIGNsaWNrIG91dHNpZGVcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXG4gICAgICAgICAgICAgICAgJy5qcy1oYW1idXJnZXIsIC5qcy1uYXYtbWFpbiwgLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93J1xuICAgICAgICAgICAgKS5sZW5ndGhcbiAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkKCcuanMtaGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5qcy1vdmVybGF5JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcbiAgICAgICAgLy9Nb2JpbGUgTmF2XG4gICAgICAgICQoJy5qcy1uYXYtbWFpbicpLnByZXBlbmRUbygnLndyYXBwZXIgJyk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtbWFpbi1uYXYtbGluay0tZm9yd2FyZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtZHJvcGRvd25fX2l0ZW0nKTtcbiAgICAgICAgICAgIGxldCBuYXZJdGVtRHJvcGRvd24yID0gbmF2SXRlbS5maW5kKCcubmF2LWRyb3Bkb3duX19pdGVtJyk7XG4gICAgICAgICAgICBsZXQgbWFpbkRyb3Bkb3duID0gJCh0aGlzKS5jbG9zZXN0KCcubmF2LW1haW5fX2Ryb3Bkb3duJyk7XG5cbiAgICAgICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgbGV0IGJsb2NrID0gJChcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibmF2LWRyb3Bkb3duX190aXRsZSBuYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wXCI+J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICEkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihuYXZJdGVtLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KHRpdGxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAhbmF2SXRlbURyb3Bkb3duLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWxpbmsnKSB8fFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1iYWNrJylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuYXZJdGVtRHJvcGRvd24uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICFuYXZJdGVtRHJvcGRvd24yLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSAmJlxuICAgICAgICAgICAgICAgICgkKHRoaXMpLmhhc0NsYXNzKCduYXYtZHJvcGRvd25fX3RpdGxlLS1saW5rJykgfHxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tYmFjaycpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbmF2SXRlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duLmZpbmQoJy5uYXYtZHJvcGRvd25fX3RpdGxlLS10ZW1wJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpICYmXG4gICAgICAgICAgICAgICAgbmF2SXRlbURyb3Bkb3duMi5oYXNDbGFzcygnaXMtYWN0aXZlJykgJiZcbiAgICAgICAgICAgICAgICAoJCh0aGlzKS5oYXNDbGFzcygnbmF2LWRyb3Bkb3duX190aXRsZS0tbGluaycpIHx8XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ25hdi1kcm9wZG93bl9fdGl0bGUtLWJhY2snKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdkl0ZW1Ecm9wZG93bjIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG1haW5Ecm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL01vYmlsZSBTZWFyY2hcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQoJy5qcy1zZWFyY2gnKTtcbiAgICAgICAgdmFyIHNlYXJjaEJ0blNob3cgPSAkKCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdycpO1xuXG4gICAgICAgIHNlYXJjaEJ0blNob3cub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2guZmluZCgnLmpzLXNlYXJjaC1pbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoLmZpbmQoJy5zZWFyY2hfX2hpbnQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWFyY2guYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIHdoZW4gY2xpY2sgb3V0c2lkZVxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtbW9iaWxlLXNlYXJjaC0tc2hvdywgLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZWFyY2gucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuanMtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgIHNlYXJjaC5maW5kKCcuc2VhcmNoX19oaW50JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaGVhZGVyTWFpbiA9ICQoJy5oZWFkZXItbWFpbicpO1xuICAgICAgICBsZXQgaGVhZGVyTWFpbkNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1tYWluLS1jbG9uZVwiPicpXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCA4NSlcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignLmhlYWRlci1tYWluJylcbiAgICAgICAgICAgIC5oaWRlKCk7XG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAkKCcuaGVhZGVyX190b3AtbGluZScpLm91dGVySGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYWluLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbkNsb25lLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyTWFpbi5yZW1vdmVDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlck1haW5DbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2hvdyBQYXNzd29yZFxuICAgICQoJy5qcy1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5uZXh0KClcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICB9KTtcbiAgICAvL0hpZGUgUGFzc3dvcmRcbiAgICAkKCcuanMtaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgfSk7XG5cbiAgICAvL2J0biBmYXZvcml0ZVxuICAgICQoJy5qcy1idXR0b24taWNvbi0tZmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgKiBDYXRhbG9nLmpzXG4gICAgKi9cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY29sb3ItaXRlbScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kdWN0LWl0ZW0nKTtcbiAgICAgICAgbGV0IGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xuICAgICAgICBsZXQgaW1nID0gaXRlbS5maW5kKCcucHJvZHVjdC1pdGVtX19pbWFnZScpO1xuICAgIFxuICAgICAgICBpbWcuYXR0cignc3JjJywgY29sb3IpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9DaGFuZ2VyXG4gICAgJCgnLmpzLWNoYW5nZXInKVxuICAgICAgICAuZmluZCgnLmNoYW5nZXJfX2l0ZW0nKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtY2hhbmdlcicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2hhbmdlcl9faXRlbScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1jaGFuZ2VyJylcbiAgICAgICAgLmZpbmQoJy5jaGFuZ2VyX19yZXNldCcpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCcuY2hhbmdlcl9faXRlbScpO1xuICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJylcbiAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fc3ViaXRlbScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbG9yJyk7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdmaWx0ZXItY29sb3InKTtcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpXG4gICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnanMtc2Nyb2xsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKVxuICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXG4gICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAucmVzaXplKCk7XG4gICAgfVxuICAgIFxuICAgIC8vQ2F0YWxvZyBGaWx0ZXIgQWN0aW9uXG4gICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlcicpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH0pO1xuICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgPSAnJztcbiAgICB9KTtcbiAgICBcbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcbiAgICBpZiAoJCgnLmpzLXN0aWt5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3knLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiA4NSxcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDIwLFxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuc3Rpa3ktY29udGVudCcsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5zdGlreS1pbm5lcidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqIENvbXBvbmVudHMuanNcbiAgICAqL1xuXG4gICAgLy9BY2NvcmRlb25cbiAgICBpZiAoJCgnLmpzLWFjY29yZGVvbicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IGFjY29yZGVyb24gPSAkKCcuanMtYWNjb3JkZW9uJyk7XG4gICAgXG4gICAgICAgIGFjY29yZGVyb25cbiAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgICAgIC5ub3QoJzpmaXJzdCcpXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICBhY2NvcmRlcm9uXG4gICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbTpmaXJzdCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuICAgIFxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFjY29yZGVvbl9fdGl0bGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhY2NvcmRlcm9uLmhhc0NsYXNzKCdsa19fYWNjb3JkZW9uJykpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmFjY29yZGVvbl9faXRlbScpXG4gICAgICAgICAgICAgICAgLmZpbHRlcignOmZpcnN0JylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuYWNjb3JkZW9uX190aXRsZScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0L/QvtC00YDQvtCx0L3QtdC1Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLW9yZGVyX19pbmZvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0YHQutGA0YvRgtGMJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL2NoZWNrYm94XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2NoZWNrYm94LS1wc2V1ZG9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9kcm9wZG93blxuICAgIGlmICgkKCcuanMtZHJvcGRvd24nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZHJvcGRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICpMay5qc1xuICAgICovXG5cbiAgICAvL1N0aWNreSBCbG9jayBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcbiAgICBpZiAoJCgnLmpzLXN0aWt5LWJsb2NrJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3ktYmxvY2snLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiAxMzUsXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLnN0aWt5LWNvbnRlbnQnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuc3Rpa3ktYmxvY2tfX2lubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59KTtcblxuLypcbiogU2xpZGVyLmpzXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xuXG4gICAgLy9TbGlkZXIgTmV3XG4gICAgaWYgKCQoJy5qcy1iei1zbGlkZXItLW5ldycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tbmV3Jykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL1NsaWRlciBDYXJkXG4gICAgaWYgKFxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkJykubGVuZ3RoID4gMCAmJlxuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1jYXJkLW5hdicpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgICAgY2FyZFNsaWRlcigpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnKS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICAgIG1vZGFsU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgLy9TbGlkZXIgUHJvbW9cbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcHJvbW8nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1iei1zbGlkZXItLXByb21vJykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmJ6LXNsaWRlci1wcm9tb19fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vU2xpZGVyIFJlbGF0ZWRcbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2xpZGVyUmVsYXRlZCgpO1xuICAgIH1cbiAgICBpZiAoJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2xpZGVyUmVsYXRlZE1vZGFsKCk7XG4gICAgfVxufSk7XG5cbi8vQ2FyZFNsaWRlckZ1bmN0aW9uXG5mdW5jdGlvbiBjYXJkU2xpZGVyKCkge1xuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogNyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZCcsXG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vZGFsU2xpZGVyKCkge1xuICAgICQoJy5qcy1iei1zbGlkZXItLWNhcmQtbW9kYWwnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1uYXYtbW9kYWwnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogNyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcsXG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIC8vIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICd1bnNsaWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cbi8vc2xpZGVyUmVsYXRlZFxuZnVuY3Rpb24gc2xpZGVyUmVsYXRlZCgpIHtcbiAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkJykuc2xpY2soe1xuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDgsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMzc2LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzbGlkZXJSZWxhdGVkTW9kYWwoKSB7XG4gICAgJCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpLnNsaWNrKHtcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiA4LFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDM3NixcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbn1cblxuXG4vKlxuKiBDYXJkLmpzXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL2NhcmQgcHJvcGVydGllcyB0YWJzXG4gICAgJCgnLmpzLWNhcmQtdGFiLXJlbGF0ZWQsIC5qcy1jYXJkLXRhYi1yZWxhdGVkLS1tb2RhbCcpLnRhYnMoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcmVsYXRlZC10YWInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXJkLXRhYi1yZWxhdGVkLS1tb2RhbCcpXG4gICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZC1tb2RhbCcpXG4gICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2FyZC10YWItcmVsYXRlZCcpXG4gICAgICAgICAgICAuZmluZCgnLmpzLWJ6LXNsaWRlci0tcmVsYXRlZCcpXG4gICAgICAgICAgICAuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy10YWInLCB0YWJzKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy10YWItbW9kYWwnLCB0YWJzKTtcbiAgICB9XG5cbiAgICAkKCcjcHJldmlldycpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnLmpzLWJ6LXNsaWRlci0tY2FyZC1tb2RhbCcpLnJlc2l6ZSgpO1xuICAgICAgICAkKCcuanMtYnotc2xpZGVyLS1yZWxhdGVkLW1vZGFsJykucmVzaXplKCk7XG5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAgICAgdGFiVHJhbnNmb3JtKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vdGFicyAtLS0+IGFjY29yZGVvblxuICAgIGZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcbiAgICAgICAgdmFyIHRhYiA9ICQoJy5qcy10YWItLXRyYW5zZm9ybScpO1xuXG4gICAgICAgICQoJy5qcy10YWIsIC5qcy10YWItbW9kYWwnKVxuICAgICAgICAgICAgLnVud3JhcCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbiBhY2NvcmRlb24tLW90aGVyIGpzLWFjY29yZGVvbicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fdGl0bGVzJyk7XG4gICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJfX3RpdGxlIGlzLWFjdGl2ZScpXG4gICAgICAgICAgICAud3JhcCgnPGRpdiBjbGFzcz1cImFjY29yZGVvbl9faXRlbVwiPicpO1xuXG4gICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKVxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJylcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXG4gICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcblxuICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYl9fY29udGVudCB0YWJfX2NvbnRlbnQtLXByb2R1Y3QnKTtcbiAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnRlcycpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgLy9DYXJkIEl0ZW0gU2VsZWN0XG4gICAgY2hhbmdlQ29sb3IoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaXRlbS1zZWxlY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAkKCcuanMtaXRlbS1zZWxlY3QnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1pdGVtLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtaXRlbS1zZWxlY3QnKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWl0ZW0tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1pdGVtLXNlbGVjdC1pdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pdGVtLXNlbGVjdCcpO1xuICAgICAgICBsZXQgdGV4dCA9ICQodGhpcylcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgIC50ZXh0KCk7XG4gICAgICAgIGxldCBjb2xvciA9ICQodGhpcylcbiAgICAgICAgICAgIC5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJylcbiAgICAgICAgICAgIC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X192YWx1ZScpO1xuICAgICAgICBsZXQgaW5wdXQgPSBzZWxlY3QuZmluZCgnLml0ZW0tc2VsZWN0X19pbnB1dCcpO1xuXG4gICAgICAgIGlucHV0LnZhbCh0ZXh0KTtcbiAgICAgICAgdmFsdWUuY2hpbGRyZW4oJy5pdGVtLXNlbGVjdF9fY29sb3InKS5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicsIGNvbG9yKTtcblxuICAgICAgICBjaGFuZ2VDb2xvcigpO1xuXG4gICAgICAgIGlmIChzZWxlY3QuaGFzQ2xhc3MoJ2l0ZW0tc2VsZWN0LS1jb3VudCcpKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXRlbS1zZWxlY3RfX2l0ZW0tLWhlYWRlcicpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuaXRlbS1zZWxlY3RfX3RpdGxlJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CS0YvQsdGA0LDRgtGMJyk7XG4gICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbignLml0ZW0tc2VsZWN0X190aXRsZScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4vL1NlbGVjdCBJdGVtIGNoYW5nZUNvbG9yXG5mdW5jdGlvbiBjaGFuZ2VDb2xvcigpIHtcbiAgICAkKCcuanMtaXRlbS1zZWxlY3QnKVxuICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb2xvckJveCA9ICQodGhpcykuZmluZCgnLml0ZW0tc2VsZWN0X19jb2xvcicpO1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JCb3guZGF0YSgnaXRlbS1zZWxlY3QtY29sb3InKTtcbiAgICAgICAgICAgIGNvbG9yQm94LmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmQoJy5pdGVtLXNlbGVjdF9faXRlbScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yQm94ID0gJCh0aGlzKS5maW5kKCcuaXRlbS1zZWxlY3RfX2NvbG9yJyk7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBjb2xvckJveC5kYXRhKCdpdGVtLXNlbGVjdC1jb2xvcicpO1xuICAgICAgICAgICAgY29sb3JCb3guY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgICAgICB9KTtcbn1cblxuLy9UYWJzXG5mdW5jdGlvbiB0YWJzKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT0gJ3RhYl9fdGl0bGUnKSB7XG4gICAgICAgIHZhciBkYXRhVGFiID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcbiAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcudGFiX19jb250ZW50Jyk7XG4gICAgICAgIHZhciB0YWJUaXRsZSA9ICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJy50YWJfX3RpdGxlJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRhYlRpdGxlW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSBpKSB7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qXG4qIEZ1bmN0aW9ucy5qc1xuKi9cblxuLy9QdXNoVXBcbmZ1bmN0aW9uIHB1c2hVcCh0ZXh0KSB7XG4gICAgdmFyIHRleHQgPSB0ZXh0IHx8ICfQotC+0LLQsNGAINC00L7QsdCw0LLQu9C10L0g0LIg0LrQvtGA0LfQuNC90YMnO1xuICAgIHZhciBwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygncHVzaFVwJyk7XG4gICAgdmFyIHB1c2hVcENsb3NlID0gJCgnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXNcIj48L2k+JykuYWRkQ2xhc3MoXG4gICAgICAgICdwdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXG4gICAgKTtcbiAgICBwdXNoQ29udGFpbmVyLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gICAgcHVzaENvbnRhaW5lci50ZXh0KHRleHQpO1xuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xuXG4gICAgcmFmKGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0sIDM1MDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9LCA0MDAwKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG59XG5cbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5mdW5jdGlvbiByYWYoZm4pIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbiJdfQ==
