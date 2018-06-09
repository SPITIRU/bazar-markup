$(document).ready(function () {

    $(window).on("load", function () {
        $('body').removeClass('loading');
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
        $('html, body').animate({scrollTop: 0}, 800);
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({scrollTop: destination - 90 + 'px'}, 300);
        return false;
    });

    //Stop drag
    $("img").on("dragstart", function (event) {event.preventDefault()});

    //Footer media transform accordeon
    if($(window).width() <= 480) {
        let footer = $('.js-footer');
        footer.find('.footer-item').addClass('accordeon__item').wrapAll('<div class="accordeon js-accordeon">');
        footer.find('.footer-item__content').addClass('accordeon__content').css('display', 'none');
        footer.find('.footer-item__title').addClass('accordeon__title');
    }

    //Hamburger btn
    $('.js-hamburger').on('click', function() {
        $(this).toggleClass('on');
        $('.js-nav-main').toggleClass('is-open');
        $('.js-overlay').toggleClass('is-active');
        return false;
    });
     //Mobile Search when click outside
    $(document).click(function(event) {
        if ($(event.target).closest('.js-hamburger, .js-nav-main').length) return;
        $('.js-hamburger').removeClass('on');
        $('.js-nav-main').removeClass('is-open');
        $('.js-overlay').removeClass('is-active');
        event.stopPropagation();
    });

    
    if($(window).width() <= 480) {
        //Mobile Nav
        $('.js-nav-main').prependTo('.wrapper ');
        $('.js-main-nav-link--forward').on('click', function(e) {
            e.preventDefault();
            let navItem = $(this).closest('.nav-main__item');
            let navItemDropdown = $(this).closest('.nav-dropdown__item');
            let navItemDropdown2 = navItem.find('.nav-dropdown__item');
            let mainDropdown = $(this).closest('.nav-main__dropdown');

            let title = $(this).text();
            let block = $('<li class="nav-dropdown__title nav-dropdown__title--temp">');

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

        $('.js-mobile-search--show').on('click', function() {
            if (search.hasClass('is-visible')) {
                search.removeClass('is-visible');
            } else {
               search.addClass('is-visible');
            }        
        });

         //Mobile Search when click outside
        $(document).click(function(event) {
            if ($(event.target).closest('.js-mobile-search--show, .js-search').length) return;
            search.removeClass('is-visible');
            event.stopPropagation();
        });  
    } else {
        let headerMain = $('.header-main');
        let headerMainClone = $('<div class="header-main--clone">').css('height', 85).insertAfter('.header-main').hide();
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
    $('.js-input-password--show').on('click', function(){
        $(this).css('display', 'none');
        $(this).next().css('display', 'block');
        $(this).parent().find('input[type="password"]').attr('type', 'text');
    });
    //Hide Password
    $('.js-input-password--hide').on('click', function(){
        $(this).css('display', 'none');
        $(this).prev().css('display', 'block');
        $(this).parent().find('input[type="text"]').attr('type', 'password');
    });

    //btn favorite
    $('.js-button-icon--fav').on('click', function(e) {
        if (!$(this).hasClass('is-checked')) {
           $(this).addClass('is-checked');
        } else {
            $(this).removeClass('is-checked');
        } 
        e.preventDefault()      ;
    });

    /*
    * Slider.js
    */

    //=include partials/slider.js

    /*
    * Components.js
    */

    //=include partials/components.js

    /*
    * Catalog.js
    */

    //=include partials/catalog.js

});

    /*
    * Functions.js
    */

    //=include partials/functions.js