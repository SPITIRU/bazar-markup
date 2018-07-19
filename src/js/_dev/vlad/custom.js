$(document).ready(function () {

    // Ajax NProgress bar
    var photoLoader = $('.bb-upload__loader');
    $(document).ajaxStart(function () {
        // NProgress.start();
        if (photoLoader.length > 0) {
            photoLoader.show();
        }
    });
    $(document).ajaxStop(function () {
        // NProgress.done();
        if (photoLoader.length > 0) {
            photoLoader.hide();
        }
    });

    if ($('.js-contact__map').length > 0) {
        ymaps.ready(initContactMap);
    }
    function initContactMap() {
        var myMap;
        var myPlaceMark;
        var mapBlock = $('.js-contact__map');
        var coordX = mapBlock.data('x');
        var coordY = mapBlock.data('y');
        var balloon;

        myMap = new ymaps.Map('card-map', {
            center: [coordX, coordY],
            zoom: 15
        });

        balloon = {
            iconLayout: 'default#image',
            iconImageHref: '/templates/bazar/index/img/general/map-pin.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
        };

        myPlaceMark = new ymaps.Placemark([coordX, coordY], {}, balloon);

        myMap.controls.remove('typeSelector');
        myMap.geoObjects.add(myPlaceMark);

    }

    localStorage.setItem('orders', 123);
    // очищаем переменную, чтобы был редирект в ЛК
    localStorage.removeItem('cardRoute');

    // Main auth form
    if ($('#js-main-auth-form').length > 0) {

        var authBlock = $('.js-main-auth-form-block');

        $('#js-login-account').on('click', function () {

            var email = $('#js-main-input-email').val();
            var password = $('#js-main-input-password').val();
            var remember = $('#js-main-input-remember').val();
            var errorBlock = $('#js-auth-error');

            // Validate data
            $.ajax({
                method: 'POST',
                url: '/ajaxValidateMainAuth',
                data: {
                    email: email,
                    password: password,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {

                    // USER IS LOGGED IN (CLOSE POPUP IN SAME PAGE)
                    if (response.userExist === true ) {
                        $('.js-header-profile-block').html(response.html);
                        $('.js-header-profile-block-favorite').html(response.favorite);
                        $('.modal__btn--close').trigger('click');

                        if(response.addFavoriteFirstAuth){
                            userID = response.user;
                            addFavorite(response.user, response.addFavoriteFirstAuth);
                        }

                        return false;
                    }

                    // CREATE NEW USER BY PHONE
                    $.ajax({
                        method: 'POST',
                        url: '/ajaxRegisterUserByEmail',
                        data: {
                            email: email,
                            password: password,
                            remember: remember,
                            _token: token
                        }
                    }).done(function (response) {
                        if (response.success === true) {
                            $('.js-header-profile-block').html(response.html);
                            $('.js-header-profile-block-favorite').html(response.favorite);
                            $('.modal__btn--close').trigger('click');
                        }
                    });
                } else {
                    errorBlock.show().html(response.text);
                }
            });

            return false;

        });

    }

    //Favorite btn
    $(document).on('click', '.js-btn-fav', function (e) {
        var btn = $(this);
        e.stopPropagation();

        if(btn.hasClass('is-checked')) {
            btn.removeClass('is-checked');
            var favorite = $(this).data('favorite');
            localStorage.setItem('favorite', favorite);

            $.ajax({
                method: 'POST',
                url: '/ajaxDeleteFavorite',
                data: {
                    favorite: favorite,
                    userID: userID,
                    _token: token
                }
            }).done(function (response) {
                if (response.success == true) {
                    console.log('Удален из избранного');
                }
            });
            return false;
        }else{
            var favorite = $(this).data('favorite');
            btn.addClass('is-checked');

            $.ajax({
                method: 'POST',
                url: '/ajaxAddFavorite',
                data: {
                    favorite: favorite,
                    userID: userID,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === false && response.authForm === true) {
                    $('#auth-form').modal();
                    return false;
                }

                if (response.success == true) {
                    console.log('Добавлен в изранное');
                }
            });
            return false;
        }
    });

    //ajaxPhoneShow
    if ($('.js-ajax-show-phone').length > 0) {
        $(document).on('click', '.js-ajax-show-phone', function () {
            $(this).addClass('js-user-phone--show');
            localStorage.setItem('cardRoute', 'true');
            $.ajax({
                method: 'POST',
                url: '/ajaxPhoneShow',
                data: {
                    _token: token
                }
            }).done(function (response) {
                if (response.success === false && response.authForm === true) {
                    $.fancybox.open($('.header-action__login'));
                    return false;
                }
            });
        });
    }
    if ($('.ajax-reviews-add').length > 0) {
        $(document).on('click', '.ajax-reviews-add', function () {
            localStorage.setItem('cardRoute', 'true');
            $.ajax({
                method: 'POST',
                url: '/ajaxReviewsAdd',
                data: {
                    _token: token
                }
            }).done(function (response) {
                if (response.success === false && response.authForm === true) {
                    $.fancybox.open($('.header-action__login'));
                    return false;
                }
                if (response.success === true) {
                    $.fancybox.open($('#review-add'));
                    return false;
                }
            });

        });
    }


    if ($('.js-search__form').length > 0) {
        var searchCityInput = $('.js-search-input__cities');
        var searchCategoryInput = $('.js-search-input__category');
        var citiesBlock = $('.js-search-group__cities');
        var categoriesBlock = $('.js-search-group__categories');
        var hintCity = $('.js-search-hint__cities');
        var hintCategory = $('.js-search-hint__category');
        var name;
        // console.log(searchCategoryInput);
        // console.log(categoriesBlock);
        // console.log(hintCategory);
        //search category service user
        searchCategoryInput.on('keyup', function (evt) {

            var itemSelect = hintCategory.find('.is-selected');

            // #Key enter
            if (evt.keyCode === 13) {
                var category = $('.js-search-category__input');
                var service = $('.js-search-service__input');

                if(itemSelect.find('.js-search-input__link-category').length > 0){
                    var itemCategory = itemSelect.find('.js-search-input__link-category');

                    name = itemCategory.data('name');
                    var alias = itemCategory.data('category');
                    category.val('');
                    service.val('');

                    searchCategoryInput.val(name);
                    category.val(alias);

                    hintCategory.hide();
                }
                else if(itemSelect.find('.js-search-input__link-service').length > 0){
                    var itemService = itemSelect.find('.js-search-input__link-service');

                    name = itemService.data('name');
                    var serviceID = itemService.data('service');

                    category.val('');
                    service.val('');

                    searchCategoryInput.val(name);
                    service.val(serviceID);

                    hintCategory.hide();
                }

                searchCategoryInput.attr('onkeydown', true);
                $('#searchCategory').trigger('click');

            }
            // #Key down
            else if (evt.keyCode === 40)
            {
                if(itemSelect.html() === itemSelect.find('li:last-child').html()){
                    itemSelect.removeClass('is-selected');
                    categoriesBlock.find('li:first-child').addClass('is-selected');
                } else {
                    itemSelect.removeClass('is-selected');
                    itemSelect.next().addClass('is-selected');
                }
            }
            // #Key up
            else if(evt.keyCode === 38)
            {
                if(itemSelect.html() === itemSelect.find('li:first-child').html()){
                    itemSelect.removeClass('is-selected');
                    categoriesBlock.find('li:last-child').addClass('is-selected');
                } else {
                    itemSelect.removeClass('is-selected');
                    itemSelect.prev().addClass('is-selected');
                }
            }else {
                // Передаем буквы ввода в поле поиск по категориям
                if ($(this).val() !== '') {
                    $.ajax({
                        method: 'POST',
                        url: '/ajaxSearchCategory',
                        data: {
                            catQuery: $(this).val(),
                            // city: cityID,
                            _token: token
                        }
                    }).done(function (response) {
                        if (response.success === true) {
                            hintCategory.show();
                            categoriesBlock.html('').prepend(response.html);
                        }
                    });
                } else {
                    hintCategory.hide();
                }
            }
        });

        //search city
        searchCityInput.on('keyup', function (evt) {

            var hintItem = hintCity.find('.is-selected');

            // #Key enter
            if (evt.keyCode === 13) {

                searchCityInput.attr('onkeydown', true);
                var alias = hintItem.find('a').data('alias');
                $('.js-search-alias__input').val(alias);
                $('#searchCity').trigger('click');

            }
            // #Key down
            else if (evt.keyCode === 40)
            {

               if(hintItem.html() === hintCity.find('li:last-child').html()){
                   hintItem.removeClass('is-selected');
                   citiesBlock.find('li:first-child').addClass('is-selected');
               } else {
                   hintItem.removeClass('is-selected');
                   hintItem.next().addClass('is-selected');
               }

            }
            // #Key up
            else if(evt.keyCode === 38)
            {
                if(hintItem.html() === hintCity.find('li:first-child').html()){
                    hintItem.removeClass('is-selected');
                    citiesBlock.find('li:last-child').addClass('is-selected');
                } else {
                    hintItem.removeClass('is-selected');
                    hintItem.prev().addClass('is-selected');
                }

            }
            else
            {
                var stringCityInput =  auto_layout_keyboard($(this).val());
                $(this).val(stringCityInput);
                var stringCity =  auto_layout_keyboard($(this).val());

                if (stringCity !== '') {
                    $.ajax({
                        method: 'POST',
                        url: '/ajaxSearchCity',
                        data: {
                            cityName: stringCity,
                            mobile: $(this).data('mobile'),
                            _token: token
                        }
                    }).done(function (response) {
                        if (response.success === true) {
                            hintCity.show();
                            citiesBlock.html('').prepend(response.html);
                            citiesBlock.find('li:first-child').addClass('is-selected');
                        }
                    });
                } else {
                    hintCity.hide();
                }
            }
        });

        $(document).on('click', '.js-search-input__link', function () {
            var cityName = $(this).data('name');
            var cityAlias = $(this).data('alias');

            searchCityInput.val(cityName);
            $('.js-search-alias__input').val(cityAlias);
            $('#searchCity').trigger('click');
            hintCity.hide();
        });

        $(document).on('click', '.js-search-input__link-category', function () {
            var category = $('.js-search-category__input');
            var service = $('.js-search-service__input');
            var city = $('.js-search-alias__input');
            var name = $(this).data('name');
            var alias = $(this).data('category');


            category.val('');
            service.val('');
            // city.val('');

            searchCategoryInput.val(name);
            category.val(alias);
            // city.val(alias);

            hintCategory.hide();

            searchCategoryInput.attr('onkeydown', true);
            $('#searchCategory').trigger('click');

            return false;
        });
        $(document).on('click', '.js-search-input__link-service', function () {
            var category = $('.js-search-category__input');
            var service = $('.js-search-service__input');
            var name = $(this).data('name');
            var serviceID = $(this).data('service');

            category.val('');
            service.val('');

            searchCategoryInput.val(name);
            service.val(serviceID);

            hintCategory.hide();

            searchCategoryInput.attr('onkeydown', true);
            $('#searchCategory').trigger('click');

            return false;
        });
    }

    //--------------- Password recover -----------------------//

    var recoverSuccessBlock = $('.js-password-recover__success-block');

    // Password recover phone
    var buttonRecoverPhone = $('.js-password-recover__phone-button');
    if (buttonRecoverPhone.length > 0) {
        var phone = $('.js-password-recover__phone-input');

        phone.on('input', function () {
            $(this).parent().removeClass('is-invalid');
        });

        buttonRecoverPhone.on('click', function () {
            var phoneErrorBlock = $('.js-password-recover__phone-input-error');
            var phoneSuccessText = $('.js-password-recover__phone-success-text');

            if (phone.val() === '') {
                phone.parent().addClass('is-invalid');
                phoneErrorBlock.text('Введите телефон');

                return false;
            }

            $.ajax({
                method: 'POST',
                url: '/ajaxResetPasswordByPhone',
                data: {
                    phone: phone.val(),
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    recoverSuccessBlock.addClass('is-success--phone');
                    phoneSuccessText.text(phone.val());
                } else {
                    phone.parent().addClass('is-invalid');
                    phoneErrorBlock.text('Неверный телефон');
                }
            });

            return false;
        });
    }

    // Password recover email
    var buttonRecoverEmail = $('.js-password-recover__email-button');
    if (buttonRecoverEmail.length > 0) {
        var email = $('.js-password-recover__email-input');

        email.on('input', function () {
            $(this).parent().removeClass('is-invalid');
        });

        buttonRecoverEmail.on('click', function () {
            var emailErrorBlock = $('.js-password-recover__email-input-error');
            var emailSuccessText = $('.js-password-recover__email-success-text');

            if (email.val() === '') {
                email.parent().addClass('is-invalid');
                emailErrorBlock.text('Введите e-mail');

                return false;
            }

            $.ajax({
                method: 'POST',
                url: '/ajaxSendPasswordResetLink',
                data: {
                    email: email.val(),
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    recoverSuccessBlock.addClass('is-success');
                    emailSuccessText.text(email.val());
                } else {
                    email.parent().addClass('is-invalid');
                    emailErrorBlock.text('Неверный e-mail адрес');
                }
            });

            return false;
        });
    }

    // Password reset email
    var buttonResetPasswords = $('.js-password-reset__passwords-button');
    if (buttonResetPasswords.length > 0) {
        var passwordErrorBlock = $('.js-password-reset__password-input-error');
        var passwordConfirmErrorBlock = $('.js-password-reset__password-confirm-input-error');
        var password = $('.js-password-reset__password-input');
        var passwordConfirm = $('.js-password-reset__password-confirm-input');
        var passwordToken = $('.js-password-recover__token');

        password.on('input', function () {
            $(this).parent().removeClass('is-invalid');
        });
        passwordConfirm.on('input', function () {
            $(this).parent().removeClass('is-invalid');
        });

        buttonResetPasswords.on('click', function () {

            if (password.val() === '') {
                password.parent().addClass('is-invalid');
                passwordErrorBlock.text('Введите новый пароль');

                return false;
            }

            if (password.val().length < 6) {
                password.parent().addClass('is-invalid');
                passwordErrorBlock.text('Пароль не должен быть короче 6 символов');

                return false;
            }

            if (passwordConfirm.val() === '') {
                passwordConfirm.parent().addClass('is-invalid');
                passwordConfirmErrorBlock.text('Повторите пароль');

                return false;
            }

            if (passwordConfirm.val() !== password.val()) {
                passwordConfirm.parent().addClass('is-invalid');
                passwordConfirmErrorBlock.text('Пароли не совпадают');

                return false;
            }

            $.ajax({
                method: 'POST',
                url: '/ajaxResetPassword',
                data: {
                    password: password.val(),
                    hiddenToken: passwordToken.val(),
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    $('.js-password-reset__success-block').addClass('is-success');
                }
            });

            return false;
        });
    }

    //--------------- Contact page -----------------------//

    var contactsForm = $('.js-contacts__form');

    if (contactsForm.length > 0) {
        var contactsName = $('.js-contacts__name');
        var contactsPhone = $('.js-contacts__phone');
        var contactsEmail = $('.js-contact__email');
        var contactsMessage = $('.js-contact__message');
        var contactSubmit = $('.js-contacts__form-submit');

        contactSubmit.on('click', function () {
            var errors = 0;

            if (contactsName.val() === '') {
                contactsName.parent().addClass('is-invalid');
                errors ++;
            }
            if (contactsPhone.val() === '') {
                contactsPhone.parent().addClass('is-invalid');
                errors ++;
            }
            if (contactsEmail.val() === '') {
                contactsEmail.parent().addClass('is-invalid');
                errors ++;
            }
            if (contactsMessage.val() === '') {
                contactsMessage.parent().addClass('is-invalid');
                errors ++;
            }

            if (errors !== 0) {
                return false;
            }

            $.ajax({
                method: 'POST',
                url: '/ajaxSendContactForm',
                data: {
                    name: contactsName.val(),
                    phone: contactsPhone.val(),
                    email: contactsEmail.val(),
                    message: contactsMessage.val(),
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    $('.js-contacts__success').addClass('is-active');
                }
            });

            return false;
        });
    }
});

function auto_layout_keyboard( str ) {
    replacer = {
        "q":"й", "w":"ц", "e":"у", "r":"к", "t":"е", "y":"н", "u":"г",
        "i":"ш", "o":"щ", "p":"з", "[":"х", "]":"ъ", "a":"ф", "s":"ы",
        "d":"в", "f":"а", "g":"п", "h":"р", "j":"о", "k":"л", "l":"д",
        ";":"ж", "'":"э", "z":"я", "x":"ч", "c":"с", "v":"м", "b":"и",
        "n":"т", "m":"ь", ",":"б", ".":"ю", "/":"."
    };

    return str.replace(/[A-z/,.;\'\]\[]/g, function ( x ){
        return x == x.toLowerCase() ? replacer[ x ] : replacer[ x.toLowerCase() ].toUpperCase();
    });
}

// Number_format
function number_format(number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function phoneConfirmTimer() {
    var timer = $('.js-timer');
    var tim = function() {setTimeout(function() {
        var t = timer.data('timer');
        timer.text(t);
        var int = setInterval(function() {
            t--;
            if(t == -1){
                clearInterval(int);
                timer.parent().css('display', 'none');
                $('.js-cabinet-phone-confirm').removeAttr('style');
            }else{
                timer.text(t);
            }
        }, 1000);
        $('.js-cabinet-phone-confirm').on('click', function(e){
            clearInterval(int);
            tim();
        });
    })};
    tim();
}

function addFavorite(userID, favoriteID) {
    $.ajax({
        method: 'POST',
        url: '/ajaxAddFavorite',
        data: {
            favorite: favoriteID,
            userID: userID,
            _token: token
        }
    }).done(function (response) {
        if (response.success == true) {
            // console.log('Добавлен в изранное');
        }
    });

}

function ajaxPhoneShow() {
    $('.js-user-phone--show').trigger('click');
}

function ajaxReviewsAdd(userName, user) {
    $.fancybox.open($('#review-add'));
    $('.review-add__title').html(userName);
    $('.reviews__header').attr('data-from',user);
}

function redirectToCabinet() {
    $.ajax({
        method: 'POST',
        url: '/ajaxRedirectToCabinet',
        data: {
            // userID: userID,
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            var route = response.route;
            location.replace(route);
        }
    });


}

function getCity() {
    // var city = $('.js-search-group__cities');
    // var selected = city.find('.is-selected');
    // var alias = selected.find('a').data('alias');
    $('.js-search-alias__input').val(cityAlias);

}