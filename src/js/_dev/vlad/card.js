$(document).ready(function () {
    if ($('.card__content_inner').length > 0) {

        var selectedServices = [];
        var orderData = {};
        var orderMainBlock = $('.js-order-main-block');
        var orderStorage = {};

        var date = $('#js-order-date-input');
        // console.log(date);
        var timeFrom = $('#js-order-timeFrom-select');
        // var timeTo = $('#js-order-timeTo-select');
        var phone = $('#js-order-phone-input');

        // Add or remove service
        $('.js-card-services-item').on('click', function (e) {

            if ($(e.target).closest('.card-services-item__middle').length ||
                $(e.target).closest('.card-services-item__info-block').length) {
                return;
            }else{
                if (orderMainBlock.hasClass('is-disabled')) {
                    return false;
                }
                if (!orderMainBlock.hasClass('is-booked')) {
                    orderMainBlock.addClass('is-booked');
                }

                var _this = $(this);
                var add = _this.find('.card-services-item__action_add');
                var done = _this.find('.card-services-item__action_done');

                var htmlBlock = $('.js-categories-block');

                var serviceID = _this.data('id');
                var name = _this.data('name');
                var price = _this.data('price');

                selectedServices = countServicesIDs(serviceID, selectedServices);

                if (_this.hasClass('is-booked')) {

                    $('.js-category-item-' + serviceID).remove();

                    _this.removeClass('is-booked');
                    add.removeAttr('style');
                    done.removeAttr('style');
                    countServices();
                } else {
                    $('.js-empty-services-count').addClass('is-hidden');
                    htmlBlock.append(generateHtmlCategory(serviceID, name, price));

                    _this.addClass('is-booked');
                    fbq('track', 'InitiateCheckout');
                    fbq('trackCustom', 'Добавление услуги', {"Название" : name});
                    add.css('display', 'none');
                    done.css('display', 'block');
                    countServices();
                }
            }

        });

        // Remove service from top
        $(document).on('click', '.js-category--reset', function () {
            if (orderMainBlock.hasClass('is-disabled')) {
                return false;
            }
            var serviceID = $(this).data('id');
            var serviceBlock = $('.js-card-service-block-' + serviceID);
            var add = serviceBlock.find('.card-services-item__action_add');
            var done = serviceBlock.find('.card-services-item__action_done');

            selectedServices = countServicesIDs(serviceID, selectedServices);

            serviceBlock.removeClass('is-booked');
            add.removeAttr('style');
            done.removeAttr('style');
            countServices();

            $(this).parent().remove();
        });

        // Click on green button
        $('.js-card-request--show').on('click', function () {
            if (!orderMainBlock.hasClass('is-booked')) {
                orderMainBlock.addClass('is-booked');
            } else {
                var errors = 0;

                date.parent().removeClass('is-invalid');
                phone.parent().removeClass('is-invalid');

                if ($(window).width() <= 768) {
                    $(this).addClass('is-attention');
                    //errors ++;
                } else {
                    if (selectedServices.length === 0) {
                        $('.js-empty-services-count').removeClass('is-hidden');
                        errors ++;
                    }
                }

                if (date.val() === '') {
                    date.parent().addClass('is-invalid');
                    errors ++;
                }
                if (phone.val() === '') {
                    phone.parent().addClass('is-invalid');
                    errors ++;
                }
                if (errors > 0) {
                    return false;
                }

                orderMainBlock.addClass('is-disabled');

                // переворачиваем дату в нужный формат для сохранения в БД "ГГ.ММ.ДД"
                var dataValid = date.val();
                dataValid = dataValid.split('.');
                dataValid = dataValid[2] + '.' + dataValid[1] + '.' + dataValid[0];

                orderData['phone'] = phone.val();
                orderData['date'] = dataValid;
                orderData['timeFrom'] = timeFrom.val();
                // orderData['timeTo'] = timeTo.val();
                orderData['masterID'] = $('#js-card-user__name').data('id');

                orderStorage['data'] = orderData;
                orderStorage['services'] = selectedServices;

                localStorage.setItem('orderToMaster', JSON.stringify(orderStorage));

                $.ajax({
                    method: 'POST',
                    url: '/ajaxCheckUserForConfirm',
                    data: {
                        phone: phone.val(),
                        _token: token
                    }
                }).done(function (response) {
                    if (response.success === false && response.authForm === true) {
                        // создаем переменную, чтобы не было редиректа в ЛК после отправки заявки
                        localStorage.setItem('cardRoute', 'true');
                        $.fancybox.open($('.header-action__login'));

                        return false;
                    }

                    if (response.success === false && response.confirmPhoneBlock === true) {
                        $('.js-order-main-form').addClass('is-confirm');

                        return false;
                    }

                    if (response.success === false && response.phoneError === true) {
                        phone.parent().addClass('is-invalid');
                        phone.next().text('Пользователь с таким номером уже существут');
                        orderMainBlock.removeClass('is-disabled');

                        return false;
                    }

                    if (response.success === true) {
                        sendOrder();

                        return false;
                    }
                });
            }

            return false;
        });

        // Confirm sms button
        $('.js-sms-confirm-button__order').on('click', function () {
            var confirmValue = $('#js-sms-confirm-input__order').val();
            var errorBlock = $('#js-sms-confirm-error__order');

            if (confirmValue == '') {
                errorBlock.show().text('Введите код из SMS сообщения');

                return false;
            }

            $.ajax({
                method: 'POST',
                url: '/ajaxConfirmSms',
                data: {
                    confirmValue: confirmValue,
                    updateUser: true,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    sendOrder();
                } else {
                    errorBlock.show().text('Не верный код');
                }
            });

            return false;
        });

        if ($('.js-card__map').length > 0) {
            ymaps.ready(initCardMap);
        }
    }
});

function generateHtmlCategory(serviceID, name, price) {
    html = '<li class="js-category-item-' + serviceID + ' category__item"> <a class="category__link" href="#">';
    html += name;
    html += '<span class="category__price">' + number_format(price, 0, ' ', ' ') + ' <i class="fa fa-rub"></i></span>';
    html += '</a><span class="category__icon js-category--reset" data-id="' + serviceID + '"></span>';
    html += '</li>';

    return html;
}

function countServices() {
    var itemCount = $('.js-service-count');
    var itemPrice = $('.js-service-price');
    var count = 0;
    var price = 0;

    $('.card-services-item.is-booked').each(function () {
        price = price + parseInt($(this).data('price'));
        count = count + 1;
    });

    itemCount.attr('data-count', count);
    itemPrice.html(number_format(price, 0, ' ', ' ') + ' <i class="fa fa-rub"></i>');
}

function countServicesIDs(serviceID , selectedServices) {
    var itemIndex = selectedServices.indexOf(serviceID);

    if (itemIndex > -1) {
        selectedServices.splice(itemIndex, 1);
    } else {
        selectedServices.push(serviceID);
    }

    return selectedServices;
}

function sendOrder() {
 var fullPrice = $('.js-service-price').text();
    $.ajax({
        method: 'POST',
        url: '/submitNewRequest',
        data: {
            order: localStorage.getItem('orderToMaster'),
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            $('.js-order-main-form').addClass('is-success');

            fbq('track', 'AddToCart', {
                "content_name" : "Заявка",
                "value": fullPrice,
                "currency": "RUB"
            });
        }
    });
}

function initCardMap() {
    var myMap;
    var myPlaceMark;
    var mapBlock = $('.js-card__map');
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

    myMap.controls.add('typeSelector');
    myMap.geoObjects.add(myPlaceMark);

}
