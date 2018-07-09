$(document).ready(function () {
    if ($('.js-profile-form-edit__main').length > 0) {

        var obj = [];
        obj['name'] = $('.js-profile__name');
        obj['genderClass'] = $('.js-profile__gender');
        obj['genderEntity'] = $('input[class="js-profile__gender"]:checked');
        obj['genderBlock'] = $('.js-profile-gender__block');
        obj['phone'] = $('.js-profile__phone');
        obj['email'] = $('.js-profile__email');
        obj['workPlace'] = $('.js-profile__workPalace');

        /*
        *-----------------------
        * Change NAME field
        * ----------------------
         */
        $(obj['name']).on('input', function () {
            $(this).parent().removeClass('is-invalid');

            return false;
        });

        /*
        *-----------------------
        * Change GENDER field
        * ----------------------
         */
        $(obj['genderClass']).on('change', function () {
            obj['genderEntity'] = $(this);
            $(this).parent().parent().removeClass('is-invalid');

            return false;
        });

        /*
        *-----------------------
        * Change WORK_PLACE field
        * ----------------------
         */
        $(obj['workPlace']).on('change', function () {
            obj['workPlace'] = $(this);
            $(this).parent().parent().removeClass('is-invalid');

            return false;
        });

        /*
        *-----------------------
        * Change EMAIL field
        * ----------------------
         */
        $(obj['email']).on('input', function () {
            $(this).parent().removeClass('is-invalid');

            return false;
        });

        /*
        *-----------------------
        * Click on submit button
        * ----------------------
         */
        $('.js-profile-form-submit__main').on('click', function () {
            submitMainProfileForm(obj);

            return false;
        });

        $('.js-cabinet-phone-confirm').on('click', function(){
            var entity = $(this);
            var phone = $('.js-profile__phone').val();

            $.ajax({
                method: 'POST',
                url: '/ajaxSendSms',
                data: {
                    phone: phone,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    entity.css('display', 'none').closest('.js-confirm').find('.confirm__timer, .confirm__field').removeAttr('style');
                    phoneConfirmTimer();
                }
            });

            return false;
        });

        $('.js-cabinet-phone-confirm__button').on('click', function () {
            var confirmValue = $('#js-cabinet-phone-confirm__input').val();
            var error = $('#js-cabinet-phone-confirm__error');
            var errorBlock = $('#js-cabinet-phone-confirm__error-block');

            if (confirmValue === '') {
                errorBlock. addClass('is-invalid');
                error.text('Введите код из SMS сообщения');

                return false;
            }

            $.ajax({
                method: 'POST',
                url: '/ajaxConfirmSms',
                data: {
                    confirmValue: confirmValue,
                    updateUser: true,
                    redirect: true,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    //window.location.href = response.redirect;
                    $('.js-profile-editor__attention-success').removeClass('is-hidden');
                    $('.js-profile-editor__attention-error').remove();
                    $('#js-cabinet-phone-confirm__error-block').remove();
                    $('.js-profile-editor__input-phone').removeClass('is-error').addClass('is-confirm');
                } else {
                    errorBlock. addClass('is-invalid');
                    error.text('Не верный код');
                }
            });

            return false;
        });
    }

    if ($('.js-profile-form-edit__contact').length > 0) {

        // $('.js-profile-contact__country').on('change', function () {
        //     var countryID = $(this).val();
        //
        //     $.ajax({
        //         method: 'POST',
        //         url: '/ajaxGetRegionsByCountryID',
        //         data: {
        //             countryID: countryID,
        //             _token: token
        //         }
        //     }).done(function (response) {
        //         if (response.success === true) {
        //             var select = $('.js-profile-contact__region');
        //             var data = JSON.parse(response.html);
        //             var arrData = [{'id': 0, 'text': 'Не выбран'}];
        //
        //             $.each(data, function (key, name) {
        //                 arrData.push({'id': key, 'text': name});
        //             });
        //             select.html('').select2({data: arrData});
        //         }
        //     });
        //
        //     return false;
        // });

        $('.js-profile-contact__region').on('change', function () {
            var regionID = $(this).val();

            $.ajax({
                method: 'POST',
                url: '/ajaxGetCitiesByRegionID',
                data: {
                    regionID: regionID,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    var select = $('.js-profile-contact__city');
                    var data = JSON.parse(response.html);
                    var arrData = [{'id': 0, 'text': 'Не выбран'}];

                    $.each(data, function (key, name) {
                        arrData.push({'id': key, 'text': name});
                    });
                    select.html('').select2({data: arrData});
                }
            });

            return false;
        });



        /*
        *-----------------------
        * Click on submit button
        * ----------------------
         */
        $('.js-profile-form-submit__contact').on('click', function () {
            $('.js-profile__success').addClass('is-active');
            setTimeout(function () {
                $('.js-profile-form-edit__contact').submit();
            }, 2000);

            return false;
        });
    }

    if ($('.js-profile-form-edit__security').length > 0) {
        var passwordNew = $('.js-profile__password-new');
        var passwordConfirm = $('.js-profile__password-confirm');

        passwordNew.on('input', function () {
            $(this).parent().removeClass('is-invalid');

            return false;
        });

        passwordConfirm.on('input', function () {
            $(this).parent().removeClass('is-invalid');

            return false;
        });

        $('.js-profile-form-submit__security').on('click', function () {
            submitSecurityProfileForm(passwordNew, passwordConfirm);

            return false;
        });
    }

    if ($('.js-raise-the-profile').length > 0) {
        $('.js-raise-the-profile').on('click', function () {
            $.ajax({
                method: 'POST',
                url: '/ajaxRaiseTheProfile',
                data: {
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    var itemPosition = response.itemPosition;
                    $('.js-update-number').text(itemPosition + ' - я');
                }
            });

            return false;
        });
    }

    if ($('.js-upload-avatar').length > 0) {

        var cropParams = {};
        cropParams['x'] = 0;
        cropParams['y'] = 0;
        cropParams['width'] = 0;
        cropParams['height'] = 0;

        $('.js-upload-avatar__button').on('change', function () {

            var files = this.files;
            var data = new FormData();

            event.stopPropagation();
            event.preventDefault();

            if (typeof files === 'undefined') {
                return false;
            }

            $.each(files, function (key, value) {
                data.append(key, value);
            });

            data.append('_token', token);

            $.ajax({
                method: 'POST',
                url: '/ajaxPrepareAvatar',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function(response){
                    if (response.success === true) {
                        var img = $('.js-upload-avatar__cropper');

                        $('.js-upload-avatar__block').show();
                        img.attr('src', response.src);
                        img.attr('data-name', response.fileName);

                        $('#js-upload-avatar').cropper({
                            aspectRatio: 1,
                            crop: function(e) {
                                cropParams['x'] = e.x;
                                cropParams['y'] = e.y;
                                cropParams['width'] = e.width;
                                cropParams['height'] = e.height;
                            }
                        });
                    }
                }
            });

            return false;
        });



        $('.js-upload-avatar__save').on('click', function () {
            var avatarPath = $('.js-upload-avatar__cropper').data('name');
            var currentUserID = $('.js-upload-avatar__img-block').data('id');

            cropParams['avatarPath'] = avatarPath;
            cropParams['currentUserID'] = currentUserID;

            $.ajax({
                method: 'POST',
                url: '/ajaxCropAndSaveAvatar',
                data: {
                    cropParams: JSON.stringify(cropParams),
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    var leftImg = $('.js-upload-avatar__left-img');
                    var topImg = $('.js-upload-avatar__left-top');

                    leftImg.attr('src', response.avatar);
                    topImg.attr('src', response.avatar);

                    updateImage(leftImg);
                    updateImage(topImg);

                    $('.js-upload-avatar__save').remove();
                    $.fancybox.close();
                }
            });
        });

    }

    if ($('.js-cat-services-select__block').length > 0) {
        var block = $('.js-cat-services__div');
        var arrCategories = [];

        block.each(function () {
            if ($(this).hasClass('is-checked')) {
                arrCategories.push($(this).data('id'));
            }
        });

        block.on('click', function () {
            var categoryID = $(this).data('id');

            var index = arrCategories.indexOf(categoryID);

            if (index === -1) {
                arrCategories.push(categoryID);
            }

            if ($(this).hasClass('is-checked') && !$(this).hasClass('js-disable-category')) {
                $(this).removeClass('is-checked');

                arrCategories.splice(index, 1);

            } else if ($(this).hasClass('is-checked') && $(this).hasClass('js-disable-category')) {
                $('.js-cat-services-button__remove').attr('data-id', categoryID);
                var title = $(this).data('title');
                $.fancybox.open({
                    src  : '#disable-category',
                    type : 'inline'
                });
                $('.disable-category__data-title').text(title);
            } else {
                $(this).addClass('is-checked');
            }
        });

        $(document).on('click', '.js-cat-services-button__remove', function () {
            var categoryID = $(this).attr('data-id');
            var index = arrCategories.indexOf(parseInt(categoryID));
            if (index !== -1) {
                arrCategories.splice(index, 1);
            }
            $.fancybox.close();

            $('.js-cat-item-' + categoryID).removeClass('is-checked').removeClass('js-disable-category');
        });

        $('.js-cat-services-select__button').on('click', function () {
            $.ajax({
                method: 'POST',
                url: '/ajaxAddCategoriesToUser',
                data: {
                    userID: $(this).data('id'),
                    categoryIDs: JSON.stringify(arrCategories),
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    window.location.href = response.redirect;
                }
            });

            return false;
        });
    }

    if ($('.js-services-select__block').length > 0) {
        $('.js-service-check__div').on('click', function () {
            var _this = $(this);
            var serviceID = $(this).data('id');
            var priceBlock = $('.js-service-input-block__price-' + serviceID);
            var timeBlock = $('.js-service-input-block__time-' + serviceID);

            if (!_this.hasClass('is-checked')) {
                _this.addClass('is-checked');
                priceBlock.removeAttr('disabled');
                timeBlock.removeAttr('disabled');

                if (priceBlock.val() === '') {
                    priceBlock.parent().addClass('is-invalid');
                }
                if (timeBlock.val() === '') {
                    timeBlock.parent().addClass('is-invalid');
                }

                updateService(serviceID, 1);
            } else {
                _this.removeClass('is-checked');
                priceBlock.attr('disabled', '');
                timeBlock.attr('disabled', '');

                priceBlock.parent().removeClass('is-invalid');
                timeBlock.parent().removeClass('is-invalid');

                updateService(serviceID, 0);
            }
        });

        $('.service-item__field').on('click', function () {
            var _this = $(this);
            if (_this.find('.js-service-input').attr('disabled')) {
                _this.parent('.service-item').children('.js-service-check__div').addClass('is-checked');
                _this.find('.js-service-input').removeAttr('disabled', '');
            }
        });

        var inputElement = $('.js-service-input');
        inputElement.on('input', function () {
            $(this).parent().removeClass('is-invalid');
            if ($(this).val() === '') {
                $(this).parent().addClass('is-invalid');
            }
        });
        inputElement.on('change', function () {
            var send = false;
            var _this = $(this);
            var price;
            var time;
            if (_this.hasClass('js-i-time')) {
                if (_this.val() !== '' && _this.parent().prev().children('.js-i-price').val() !== '') {
                    send = true;
                    price = _this.parent().prev().children('.js-i-price').val();
                    time = _this.val();
                }
            }

            if (_this.hasClass('js-i-price')) {
                if (_this.val() !== '' && _this.parent().next().children('.js-i-time').val() !== '') {
                    send = true;
                    price = _this.val();
                    time = _this.parent().next().children('.js-i-time').val();
                }
            }

            if (send === true) {
                var serviceID = $(this).data('id');
                $.ajax({
                    method: 'POST',
                    url: '/ajaxMasterService',
                    data: {
                        serviceID: $(this).data('id'),
                        price: price,
                        time: time,
                        _token: token
                    }
                }).done(function (response) {
                    if (response.success === true) {
                        var savedBlock = $('.js-service-item__save-' + serviceID);
                        savedBlock.fadeIn();
                        setTimeout(function () {
                            savedBlock.fadeOut();
                        }, 1000);
                    }
                });
            }
        });
    }

    if ($('.js-lk-works__block').length > 0) {
        $('.js-lk-popup-categories__select').on('change', function () {
            $(this).parent().removeClass('is-invalid');
            var categoryID = $(this).val();
            if (categoryID !== 0) {
                $.ajax({
                    method: 'POST',
                    url: '/ajaxSelectServicesByCategoryID',
                    data: {
                        categoryID: categoryID,
                        _token: token
                    }
                }).done(function (response) {
                    if (response.success === true) {
                        var select = $('.js-lk-popup-services__select');
                        var data = JSON.parse(response.html);
                        var arrData = [{'id': 0, 'text': 'Не выбран'}];

                        $.each(data, function (key, name) {
                            arrData.push({'id': key, 'text': name});
                        });
                        select.html('').select2({data: arrData});
                    }
                });
            }
        });

        $('.js-lk-popup-create-album__button').on('click', function () {
            var categoryID = $('.js-lk-popup-categories__select');
            var serviceID = $('.js-lk-popup-services__select');
            var albumDescription = $('.js-lk-popup-album__description');
            var errors = 0;

            if (categoryID.val() === '0') {
                errors ++;
                categoryID.parent().addClass('is-invalid')
            } else {
                categoryID.parent().removeClass('is-invalid');
            }

            if (serviceID.val() === '0') {
                errors ++;
                serviceID.parent().addClass('is-invalid')
            } else {
                serviceID.parent().removeClass('is-invalid');
            }

            if (errors !== 0) {
                return false;
            }

            $.ajax({
                method: 'POST',
                url: '/ajaxAddNewAlbum',
                data: {
                    categoryID: categoryID.val(),
                    serviceID: serviceID.val(),
                    albumDescription: albumDescription.val(),
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    window.location.href = response.redirect;
                }
            });
        });

        $('.js-lk-popup-services__select').on('change', function () {
            $(this).parent().removeClass('is-invalid');
        });

        $('.js-lk-popup-album__name').on('input', function () {
            $(this).parent().removeClass('is-invalid');
        });
    }

    var removeAlbumIcon = $('.js-delete-album__icon');
    if (removeAlbumIcon.length > 0) {
        removeAlbumIcon.on('click', function () {
            $('.js-delete-album__button').attr('data-album', $(this).data('id'));
        });
    }

    var removeAlbumButton = $('.js-delete-album__button');
    if (removeAlbumButton.length > 0) {
        removeAlbumButton.on('click', function () {
            var albumID = $(this).attr('data-album');
            $.ajax({
                method: 'POST',
                url: '/ajaxRemoveAlbumFromList',
                data: {
                    albumID: albumID,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    $.fancybox.close();
                    $('.js-album__block-' + albumID).remove();
                }
            });
        });
    }

    // Map
    if ($('.js-cabinet__map').length > 0) {
        ymaps.ready(initCabinetMap);
    }

    var rotateFileRight = $('.js-rotate-file__right');
    if (rotateFileRight.length > 0) {
        // rotateFileRight.on('click', function () {
        //     var albumID = $(this).attr('data-album');
        //     $.ajax({
        //         method: 'POST',
        //         url: '/ajaxRemoveAlbumFromList',
        //         data: {
        //             albumID: albumID,
        //             _token: token
        //         }
        //     }).done(function (response) {
        //         if (response.success === true) {
        //             $.fancybox.close();
        //             $('.js-album__block-' + albumID).remove();
        //         }
        //     });
        // });
    }

    if ($('.js-workingEmpty').length > 0) {
        $('.js-workingEmpty').on('click', function () {
          var workingEmpty = $('.js-workingEmpty').children().val();
            if (workingEmpty == 0) {
                $('.js-workingEmpty').children().val('1');
            } else {
                $('.js-workingEmpty').children().val('0');
            }

        });
    }

    var showMasterInCatalog = $('.js-show-master-in-catalog');
    if (showMasterInCatalog.length > 0) {
        showMasterInCatalog.on('click', function () {
            var active;
            if ($(this).is(':checked')) {
                active = 1;
            } else {
                active = 0;
            }

            $.ajax({
                method: 'POST',
                url: '/ajaxShowMasterInCatalog',
                data: {
                    userActive: active,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                }
            });
        });
    }

    var deleteAddAddress = $('.js-delete-add-address');
    if (deleteAddAddress.length > 0) {
        deleteAddAddress.on('click', function () {
            var _this = $(this);
            $.ajax({
                method: 'POST',
                url: '/ajaxDeleteAddAddress',
                data: {
                    addressID: _this.data('address'),
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    _this.parent().remove();
                }
            });

            return false;
        });
    }

    var stepOneSubmitButton = $('.js-step-one-phone-confirm');
    if (stepOneSubmitButton.length > 0) {
        var stepOneInput = $('.js-step__first-input');
        var stepOneConfirm = $('.js-step-one__confirm');

        stepOneSubmitButton.on('click', function () {
            entity = $(this);
            if (stepOneInput.val() === '') {
                stepOneInput.parent().addClass('is-invalid');

                return false;
            }

            $.ajax({
                method: 'POST',
                url: '/ajaxSendSms',
                data: {
                    phone: stepOneInput.val(),
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    entity.css('display', 'none').closest('.js-confirm').find('.confirm__timer, .confirm__field').removeAttr('style');
                    phoneConfirmTimer();
                }
            });
        });

        stepOneInput.on('input', function () {
            $(this).parent().removeClass('is-invalid');
        });

        stepOneConfirm.on('click', function () {
            var confirmValue = $('#js-step-one-phone-confirm__input').val();
            var error = $('#js-step-one-phone-confirm__error');
            var errorBlock = $('#js-step-one-phone-confirm__error-block');

            if (confirmValue === '') {
                errorBlock. addClass('is-invalid');
                error.text('Введите код из SMS сообщения');

                return false;
            }
            // cabinet
            $.ajax({
                method: 'POST',
                url: '/ajaxConfirmSms',
                data: {
                    confirmValue: confirmValue,
                    updateUser: true,
                    redirect: true,
                    phone: stepOneInput.val(),
                    steps: true,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    window.location.href = response.steps;
                } else {
                    errorBlock. addClass('is-invalid');
                    error.text('Не верный код');
                }
            });

            return false;
        });

    }


});

var balloon = {
    iconLayout: 'default#image',
    iconImageHref: '/templates/beauty/index/img/general/map-pin.svg',
    iconImageSize: [30, 42],
    iconImageOffset: [-3, -42]
};

function submitMainProfileForm(obj) {

    var oAjax = $.ajax({
        method: 'POST',
        url: '/ajaxCabinetValidate',
        data: {
            phone: obj['phone'].val(),
            email: obj['email'].val(),
            _token: token
        }});

    oAjax.done(function (response) {
        var workPlaces = 0;
        var errors = 0;


        var workPlaceItem = $('.js-profile__workPalace');
        if (workPlaceItem.length > 0) {
            workPlaceItem.each(function () {
                if ($(this).is(':checked')) {
                    workPlaces ++;
                }
            });

            if (workPlaces === 0) {
                obj['workPlace'].parent().parent().addClass('is-invalid');
                errors ++;
            }
        }

        if (response.success !== true) {
            var arrErrors = JSON.parse(response.errors);

            // if ($('.js-steps').length === 0) {
                if (arrErrors['phone']) {
                    obj['phone'].parent().addClass('is-invalid');
                    obj['phone'].next().text(arrErrors['phone']);
                }
            // }

            if (arrErrors['email']) {
                obj['email'].parent().addClass('is-invalid');
                obj['email'].next().text(arrErrors['email']);
            }

            errors ++;
        }

        if (errors === 0) {
            console.log(1);
            setTimeout(function () {
                $('.js-profile-form-edit__main').submit();
            }, 100);
        } else {
            if ($(window).width() <= 768) {
                console.log(2);
                var firstError = $('.profile-editor__input.is-invalid').offset().top;
                $('body,html').animate({
                    scrollTop: firstError - 37
                }, 400);
            }
        }


        return false;
    });
}

function submitSecurityProfileForm(passwordNew, passwordConfirm) {
    var errors = 0;

    if (passwordNew.val() === '' || passwordNew.val().length < 6) {
        passwordNew.parent().addClass('is-invalid');
        passwordNew.next().next().next().text('Пароль короче 6 символов');

        errors ++;
    }

    if (passwordConfirm.val() === '') {
        passwordConfirm.parent().addClass('is-invalid');
        passwordConfirm.next().next().next().text('Повторите новый пароль');

        errors ++;
    }

    if (passwordNew.val() !== passwordConfirm.val()) {
        passwordConfirm.parent().addClass('is-invalid');
        passwordConfirm.next().next().next().text('Пароли не совпадают');

        errors ++;
    }

    if (errors > 0) {
        return false;
    }

    $('.js-profile__success').addClass('is-active');
    setTimeout(function () {
        $('.js-profile-form-edit__security').submit();
    }, 2000);

    return false;
}

function updateImage(image) {
    image.attr('src', image.attr('src').split("?")[0] + "?" + new Date().getTime());
}

function updateService(serviceID, status) {
    $.ajax({
        method: 'POST',
        url: '/ajaxMasterServiceUpdate',
        data: {
            serviceID: serviceID,
            status: status,
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            var savedBlock = $('.js-service-item__save-' + serviceID);
            savedBlock.fadeIn();
            setTimeout(function () {
                savedBlock.fadeOut();
            }, 1000);
        }
    });
}

function initCabinetMap() {
    var myMap;
    var myPlaceMark;
    var coordXInput = $('#coordX');
    var coordYInput = $('#coordY');
    var coordX;
    var coordY;


    if (coordXInput.val() === '' && coordYInput.val() === '') {
        coordX = 55.742909;
        coordY = 37.6275;
    } else {
        coordX = coordXInput.val();
        coordY = coordYInput.val();
    }

    myMap = new ymaps.Map('card-map', {
        center: [coordX, coordY],
        zoom: 17
    });

    myPlaceMark = new ymaps.Placemark([coordX, coordY], {}, balloon);

    myMap.events.add('click', function (e) {

        var coords = e.get('coords');

        coordXInput.val(coords[0]);
        coordYInput.val(coords[1]);

        myMap.geoObjects.remove(myPlaceMark);
        myPlaceMark = new ymaps.Placemark([coords[0], coords[1]], {}, balloon);
        myMap.geoObjects.add(myPlaceMark);
    });

    // myMap.behaviors.disable(['scrollZoom']);
    myMap.controls.remove('typeSelector');
    myMap.geoObjects.add(myPlaceMark);

    $('.js-profile-contact__city').on('change', function () {
        var cityID = $(this).val();

        $.ajax({
            method: 'POST',
            url: '/ajaxGetMetroOrDistrict',
            data: {
                cityID: cityID,
                _token: token
            }
        }).done(function (response) {
            if (response.success === true) {

                // myMap.setCenter([response.coordY, response.coordX], 13);

                var type = response.type;
                var metroBlock = $('.js-profile-contact__metro-block');
                var districtBlock = $('.js-profile-contact__district-block');
                var select;

                if (type === 'metro') {
                    metroBlock.removeClass('is-hidden');
                    districtBlock.addClass('is-hidden');

                    select = $('.js-profile-contact__metro');
                }

                if (type === 'district') {
                    districtBlock.removeClass('is-hidden');
                    metroBlock.addClass('is-hidden');

                    select = $('.js-profile-contact__district');
                }

                if (type === '') {
                    districtBlock.addClass('is-hidden');
                    metroBlock.addClass('is-hidden');
                } else {
                    var data = JSON.parse(response.html);
                    var arrData = [{'id': 0, 'text': 'Не выбран'}];

                    $.each(data, function (key, name) {
                        arrData.push({'id': key, 'text': name});
                    });
                    select.html('').select2({data: arrData});
                }

                var street = $('.js-profile-contact__home').val();
                var number = $('.js-profile-contact__number').val();

                if(street === ""){
                    street =  null;
                }
                if(number === ""){
                    number = null;
                }
                geoMap(response.cityName, street, number);

            }
        });

        return false;
    });

    $(document).on('keyup', '.js-profile-contact__home', function () {
        var city = $('.js-profile-contact__city').find("option:selected").text();
        var number = $('.js-profile-contact__number').val();
        if(number === ""){
            number = null;
        }
        geoMap(city, $(this).val(), number);
    });

    $(document).on('keyup', '.js-profile-contact__number', function () {
        var city = $('.js-profile-contact__city').find("option:selected").text();
        var street = $('.js-profile-contact__home').val();
        if(street === ""){
            street = null;
        }

        geoMap(city, street, $(this).val());
    });
}

function geoMap(city, street, number) {
    var myGeocoder = "";
    if (city !== null && street !== null && number !== null) {
        myGeocoder = ymaps.geocode(city+', '+street+', '+number);
    } else if (city !== null && street !== null) {
        myGeocoder = ymaps.geocode(city+', '+street);
    } else if (city !== null) {
        myGeocoder = ymaps.geocode(city);
    } else {
        myGeocoder = ymaps.geocode('Москва');
    }

    var myMap;
    var myPlaceMark;
    var coordX;
    var coordY;
    myGeocoder.then(
        function (res) {
            var coords = res.geoObjects.get(0).geometry.getCoordinates();
            myGeocoder.then(
                function (res) {
                    $('#card-map').html('');
                    coordX = coords[0];
                    coordY = coords[1];
                    myMap = new ymaps.Map('card-map', {
                        center: [coordX, coordY],
                        zoom: 17
                    });

                    $('#coordX').attr('value', coordX);
                    $('#coordY').attr('value', coordY);
                    myPlaceMark = new ymaps.Placemark([coordX, coordY], {}, balloon);
                    myMap.geoObjects.add(myPlaceMark);

                    myMap.events.add('click', function (e) {

                        var coords = e.get('coords');

                        $('#coordX').attr('value', coords[0]);
                        $('#coordY').attr('value', coords[1]);
                        myMap.geoObjects.remove(myPlaceMark);
                        myPlaceMark = new ymaps.Placemark([coords[0], coords[1]], {}, balloon);
                        myMap.geoObjects.add(myPlaceMark);
                    });
                }
            );
        }
    );
}