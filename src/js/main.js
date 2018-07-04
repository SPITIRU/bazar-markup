$(document).ready(function() {
    $(window).on('load', function() {
        $('body').removeClass('loading');

        //GetNiceScroll https://github.com/inuyaksa/jquery.nicescroll
        let scrollBar = $('.js-scroll');
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
            scrollBar.mouseover(function() {
                $(this)
                    .getNiceScroll()
                    .resize();
            });
        }
    });

    // //Custom Select https://select2.org/
    if ($('.js-select').length > 0) {
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

        function addUserPic(opt) {
            console.log('image select');
            if (!opt.id) {
                return opt.text;
            }
            var optimage = $(opt.element).data('image');
            if (!optimage) {
                return opt.text;
            } else {
                var $opt = $(
                    '<span class="sorting-icon sorting-icon--' +
                        optimage +
                        '">' +
                        $(opt.element).text() +
                        '</span>'
                );
                return $opt;
            }
        }
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
    $('.js-go-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function() {
        var elementClick = $(this).attr('href');
        var destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination - 90 + 'px' }, 300);
        return false;
    });
    $(window).scroll(function() {
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
    $('img').on('dragstart', function(event) {
        event.preventDefault();
    });

    //Footer media <= 480 transform accordeon
    if ($(window).width() <= 480) {
        let footer = $('.js-footer');
        footer
            .find('.footer-item')
            .addClass('accordeon__item')
            .wrapAll('<div class="accordeon js-accordeon">');
        footer.find('.footer-item__title').addClass('accordeon__title');
        footer.find('.footer-item__content').addClass('accordeon__content');
    }

    //Hamburger btn
    $('.js-hamburger').on('click', function() {
        $(this).toggleClass('on');
        $('.js-nav-main').toggleClass('is-open');
        $('.js-overlay').toggleClass('is-active');
        document.documentElement.style.overflow =
            document.documentElement.style.overflow === '' ? 'hidden' : '';
        return false;
    });
    //When click outside
    $(document).click(function(e) {
        if (
            $(e.target).closest(
                '.js-hamburger, .js-nav-main, .js-catalog-filter--show'
            ).length
        )
            return;
        $('.js-hamburger').removeClass('on');
        $('.js-nav-main').removeClass('is-open');
        $('.js-overlay').removeClass('is-active');
        document.documentElement.style = '';
        e.stopPropagation();
    });

    if ($(window).width() <= 768) {
        //Mobile Nav
        $('.js-nav-main').prependTo('.wrapper ');
        $('.js-main-nav-link--forward').on('click', function(e) {
            e.preventDefault();
            let navItem = $(this).closest('.nav-main__item');
            let navItemDropdown = $(this).closest('.nav-dropdown__item');
            let navItemDropdown2 = navItem.find('.nav-dropdown__item');
            let mainDropdown = $(this).closest('.nav-main__dropdown');

            let title = $(this).text();
            let block = $(
                '<li class="nav-dropdown__title nav-dropdown__title--temp">'
            );

            if (
                !navItem.hasClass('is-active') &&
                !$(this).hasClass('nav-dropdown__title--link')
            ) {
                navItem.addClass('is-active');
                block
                    .insertAfter(navItem.find('.nav-dropdown__title--link'))
                    .text(title);
            } else if (
                navItem.hasClass('is-active') &&
                !navItemDropdown.hasClass('is-active') &&
                !(
                    $(this).hasClass('nav-dropdown__title--link') ||
                    $(this).hasClass('nav-dropdown__title--back')
                )
            ) {
                navItemDropdown.addClass('is-active');
                mainDropdown.css('overflow', 'hidden');
            } else if (
                navItem.hasClass('is-active') &&
                !navItemDropdown2.hasClass('is-active') &&
                ($(this).hasClass('nav-dropdown__title--link') ||
                    $(this).hasClass('nav-dropdown__title--back'))
            ) {
                navItem.removeClass('is-active');
                navItemDropdown.find('.nav-dropdown__title--temp').remove();
            } else if (
                navItem.hasClass('is-active') &&
                navItemDropdown2.hasClass('is-active') &&
                ($(this).hasClass('nav-dropdown__title--link') ||
                    $(this).hasClass('nav-dropdown__title--back'))
            ) {
                navItemDropdown2.removeClass('is-active');
                mainDropdown.removeAttr('style');
            }
        });

        //Mobile Search
        var search = $('.js-search');
        var searchBtnShow = $('.js-mobile-search--show');

        searchBtnShow.on('click', function() {
            if (search.hasClass('is-visible')) {
                search.removeClass('is-visible');
                search.find('.js-search-input').val('');
                search.find('.search__hint').css('display', 'none');
            } else {
                search.addClass('is-visible');
            }
        });

        //Mobile Search when click outside
        $(document).click(function(event) {
            if (
                $(event.target).closest('.js-mobile-search--show, .js-search')
                    .length
            )
                return;
            search.removeClass('is-visible');
            search.find('.js-search-input').val('');
            search.find('.search__hint').css('display', 'none');
            event.stopPropagation();
        });
    } else {
        let headerMain = $('.header-main');
        let headerMainClone = $('<div class="header-main--clone">')
            .css('height', 85)
            .insertAfter('.header-main')
            .hide();
        $(window).scroll(function() {
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
    $('.js-input-password--show').on('click', function() {
        $(this).css('display', 'none');
        $(this)
            .next()
            .css('display', 'block');
        $(this)
            .parent()
            .find('input[type="password"]')
            .attr('type', 'text');
    });
    //Hide Password
    $('.js-input-password--hide').on('click', function() {
        $(this).css('display', 'none');
        $(this)
            .prev()
            .css('display', 'block');
        $(this)
            .parent()
            .find('input[type="text"]')
            .attr('type', 'password');
    });

    //btn favorite
    $('.js-button-icon--fav').on('click', function(e) {
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

    //=include partials/catalog.js

    /*
    * Components.js
    */

    //=include partials/components.js

    /*
    *Lk.js
    */

    //=include partials/lk.js
});

/*
* Slider.js
*/

//=include partials/slider.js

/*
* Card.js
*/

//=include partials/card.js

/*
* Functions.js
*/

//=include partials/functions.js
