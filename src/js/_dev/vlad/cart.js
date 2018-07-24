$(document).ready(function () {

    // Add to cart from card
        $(document).on('click', '.js-product-add-to-cart', function (e) {
            e.preventDefault();
            var _this = $(this);
            var productID = _this.data('id');
            $.ajax({
                method: 'POST',
                url: '/ajaxAddProductToCart',
                data: {
                    productID: productID,
                    count: 1,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    $('.js-user-nav__item--cart').attr('data-count', response.productCount);
                    pushUp();
                    _this.hide();
                    _this.next().removeClass('is-hidden');
                }
            });
        });


    // Add to cart from inner card
        $(document).on('click', '.js-product-add-to-cart-more', function (e) {
            e.preventDefault();
            var _this = $(this);
            var productID = _this.data('id');
            var arrData = $('.js-arr-final-data').val();

            $.ajax({
                method: 'POST',
                url: '/ajaxAddProductToCart',
                data: {
                    productID: productID,
                    arrData: arrData,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    $('.js-user-nav__item--cart').attr('data-count', response.productCount);
                    pushUp();
                    _this.addClass('is-hidden');
                    _this.next().removeClass('is-hidden');

                    var arrData = JSON.parse(response.arrData);
                    var currentCountBlock = $('.js-cart-count');
                    var orderInfoBlock = $('.js-card__order-info');
                    var priceInfoBlock = $('.js-card__price');
                    var typeProduct = _this.parent().parent().prev().find('.js-type-product').val();
                    var priceInfoBlock = $('.js-card__price');
                    var allPrice = arrData.count * arrData.price;


                    if(typeProduct == 1 || typeProduct == 2 || typeProduct ==3 || typeProduct == 5 || typeProduct ==7){
                        var orderText = "В корзине <span>" + arrData.count + "</span> метров — <span>" + number_format(allPrice, 2, '.', ' ') + "</span> руб.";
                        currentCountBlock.show().val(arrData.count + ' м');
                        var priceText = number_format(arrData.price, 2, '.', ' ') + " <span>руб/м</span>";
                    }else{
                        var orderText = "В корзине <span>" + arrData.count + "</span> шт — <span>" + number_format(allPrice, 2, '.', ' ') + "</span> руб.";
                        currentCountBlock.show().val(arrData.count + ' шт');
                        var priceText = number_format(arrData.price, 2, '.', ' ') + " <span>руб/шт</span>";
                    }
                    if (arrData.discount) {
                        priceText = priceText + "<small>-" + arrData.discount + "%</small>";
                    }

                    priceInfoBlock.html(priceText);
                    orderInfoBlock.html(orderText);
                    currentCountBlock.prev().hide();
                }
            });
        });

    // Plus button
        $(document).on('click', '.js-cart-plus', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var _this = $(this);
            var currentValueInput = _this.parent().find('.js-cart-count');
            var currentValue = parseInt(currentValueInput.val());
            var typeProduct = _this.parent().find('.js-type-product').val();
            var prices = _this.parent().find('.js-arr-prices');
            var productID = _this.parent().find('.js-arr-prices').data('id');
            var minCount = JSON.parse(prices.val())[0]['count'];
            var cap = _this.parent().find('.item-select__title');
            var m = '';
            var newValue = 0;

            if(typeProduct == 1 || typeProduct == 2 || typeProduct ==3 || typeProduct == 5 || typeProduct ==7){
                m = ' м';
            }else{
                m = ' шт';
            }



            cap.hide();
            if (!isNaN(currentValue)) {
                if (currentValue < minCount) {
                    newValue = minCount;
                }
                if (currentValue >= minCount) {
                    newValue = currentValue + 1;
                }
            } else {
                newValue = minCount;
            }

            currentValueInput.show().val(newValue + m);

            var data = checkStep(newValue, prices);
            updateOrderInfo(newValue, prices, data, productID, _this);

        });


    // Minus button
        $(document).on('click', '.js-cart-minus', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var _this = $(this);
            var currentValueInput = _this.parent().find('.js-cart-count');
            var currentValue = parseInt(currentValueInput.val());
            var typeProduct = _this.parent().find('.js-type-product').val();
            var prices = _this.parent().find('.js-arr-prices');
            var productID = _this.parent().find('.js-arr-prices').data('id');
            var minCount = JSON.parse(prices.val())[0]['count'];
            var cap = _this.parent().find('.item-select__title');
            var m = '';
            var newValue = 0;

            if(typeProduct == 1 || typeProduct == 2 || typeProduct ==3 || typeProduct == 5 || typeProduct ==7){
                m = ' м';
            }else{
                m = ' шт';
            }

            cap.hide();
            if (!isNaN(currentValue)) {
                if (currentValue === minCount) {
                    return false;
                }
                if (currentValue > minCount) {
                    newValue = currentValue - 1;
                }
            } else {
                newValue = minCount;
            }

            currentValueInput.show().val(newValue + m);

            var data = checkStep(newValue, prices);
            updateOrderInfo(newValue, prices, data, productID, _this);
        });


    // Change count input
        $(document).on('change', '.js-cart-count', function (e) {
            e.preventDefault();
            e.stopPropagation();

            changeInput($(this));
        });


    // Click on template
        $(document).on('click', '.js-item-select__item', function (e) {
            // e.preventDefault();
            // e.stopPropagation();

            changeInput($(this).parent().prev().find('.js-cart-count'));
        });

    // Delete from cart inner card
        $(document).on('click', '.js-delete-from-cart__more', function () {

            var _this = $(this);
            var productID = $(this).data('id');

            $.ajax({
                method: 'POST',
                url: '/ajaxDeleteProductFromCart',
                data: {
                    productID: productID,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    $('.js-card__order-info').html('');
                    var currentCountBlock = $('.js-cart-count');
                    currentCountBlock.prev().show();
                    currentCountBlock.hide().val('');

                    pushUp('Товар удален из корзины');
                    _this.parent().addClass('is-hidden');
                    $('.js-product-add-to-cart-more').removeClass('is-hidden');

                    $('.js-user-nav__item--cart').attr('data-count', response.productCount);
                    $('.js-item-count-cart').text(response.productCount);
                }
            });

            return false;
        });


    // Delete from cart in order page
        $(document).on('click', '.js-delete-from-cart__order', function () {
            var _this = $(this);
            var productID = $(this).data('id');

            $.ajax({
                method: 'POST',
                url: '/ajaxDeleteProductFromCart',
                data: {
                    productID: productID,
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    pushUp('Товар удален из корзины');
                    _this.closest('.product-item').remove();
                    $('.js-user-nav__item--cart').attr('data-count', response.productCount);
                    $('.js-item-count-cart').text(response.productCount);
                    getAllProductsSum();
                }
            });

            return false;
        });

    // Send order
    var sendOrderButton = $('.js-send-order__button');
    if (sendOrderButton.length > 0) {
        sendOrderButton.on('click', function () {
            var name = $('.js-order__name');
            var lastName = $('.js-order__lastName');
            var phone = $('.js-order__phone');
            var email = $('.js-order__email');
            var city = $('.js-order__city');
            var zip = $('.js-order__zip');
            var street = $('.js-order__street');
            var house = $('.js-order__house');
            var police = $('.js-order__police');
            var allInput = $('.js-order-input');
            var errors = 0;

            // Remove errors
            allInput.on('input', function () {
                $(this).parent().removeClass('is-invalid');
            });

            // Validate name
            if (name.val() === '') {
                name.parent().addClass('is-invalid');
                errors ++;
            }

            // Validate phone
            if (phone.val() === '') {
                phone.parent().addClass('is-invalid');
                errors ++;
            }

            // Validate email
            if (email.val() === '') {
                email.parent().addClass('is-invalid');
                errors ++;
            }


            if(email.val() != '') {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if(pattern.test(email.val())){
                    email.next().css('display','none');
                    email.css({'border' : '1px solid #d9d9d9'});
                } else {
                    email.css({'border' : '1px solid #ff0000'});
                    email.next().css('display','block');
                    email.next().text('Введите правильный email');
                    errors ++;
                }
            }


            // Validate city
            if (city.val() === '') {
                city.parent().addClass('is-invalid');
                errors ++;
            }

            // Validate zip code
            if (zip.val() === '') {
                zip.parent().addClass('is-invalid');
                errors ++;
            }

            // Validate street
            if (street.val() === '') {
                street.parent().addClass('is-invalid');
                errors ++;
            }

            // Validate house
            if (house.val() === '') {
                house.parent().addClass('is-invalid');
                errors ++;
            }

            if (errors > 0) {
                return false;
            }

            $('#preloaderSend').removeClass('is-hidden');
            sendOrderButton.attr('disabled', 'disabled');


            $.ajax({
                method: 'POST',
                url: '/ajaxSendOrder',
                data: {
                    name: name.val(),
                    lastName: lastName.val(),
                    phone: phone.val(),
                    email: email.val(),
                    city: city.val(),
                    zip: zip.val(),
                    street: street.val(),
                    house: house.val(),
                    _token: token
                }
            }).done(function (response) {
                if (response.success === true) {
                    $('#preloaderSend').addClass('is-hidden');
                    sendOrderButton.removeAttr("disabled")
                    $('.js-order__form').addClass('is-success');
                    $('.js-cart-title').remove();
                    $('.js-cart-items').remove();
                    $('.js-cart-items__info').remove();
                    $('.js-user-nav__item--cart').attr('data-count', 0);
                }
            });

            return false;
        });
    }
});

function updateOrderInfo(newValue, prices, data, productID, _this) {

    var curPrice = data.price;
    var allPrice = curPrice * newValue;

    if ($('.js-order-cart-page').length > 0) {
        var orderInfoBlock = _this.parent().parent().next();
        var priceInfoBlock = _this.parent().parent().prev();
        var dataFinalBlock = _this.parent().find('.js-arr-final-data');
        var typeProduct = _this.parent().find('.js-type-product').val();
        var currentPriceInput = _this.parent().find('.js-current-price-int');
        var orderText = number_format(allPrice, 2, '.', ' ') + "<span>  руб.</span>";

        orderInfoBlock.html(orderText);
        currentPriceInput.val(allPrice);

        getAllProductsSum();
    } else {
        var orderInfoBlock = $('.js-card__order-info');
        var priceInfoBlock = $('.js-card__price');
        var dataFinalBlock = $('.js-arr-final-data');
        var minCount = JSON.parse(prices.val())[0]['count'];
        var typeProduct = $('.js-type-product').val();

        if(typeProduct == 1 || typeProduct == 2 || typeProduct ==3 || typeProduct == 5 || typeProduct ==7){
            if (newValue >= minCount) {
                var orderText = "В корзине <span>" + newValue + "</span> метров — <span>" + number_format(allPrice, 2, '.', ' ') + "</span> руб.";
                orderInfoBlock.html(orderText);
            }
        }else{
            if (newValue >= minCount) {
                var orderText = "В корзине <span>" + newValue + "</span> шт — <span>" + number_format(allPrice, 2, '.', ' ') + "</span> руб.";
                orderInfoBlock.html(orderText);
            }
        }


    }
    if(typeProduct == 1 || typeProduct == 2 || typeProduct ==3 || typeProduct == 5 || typeProduct ==7){
        // Update price info
        var priceText = number_format(curPrice, 2, '.', ' ') + " <span>руб/м</span>";
    }else{
        // Update price info
        var priceText = number_format(curPrice, 2, '.', ' ') + " <span>руб/шт</span>";
    }


    // Update data
    data.count = newValue;
    dataFinalBlock.val(JSON.stringify(data));

    if (data.discount) {
        priceText = priceText + "<small>-" + data.discount + "%</small>";
    } else {
        data.discount = null;
    }
    priceInfoBlock.html(priceText);


    // Update data in cart
    $.ajax({
        method: 'POST',
        url: '/ajaxAddProductToCart',
        data: {
            productID: productID,
            arrData: JSON.stringify(data),
            onlyData: true,
            _token: token
        }
    });
}

function checkStep(newValue, prices) {
    var data = {};
    $.each(JSON.parse(prices.val()), function (k, m) {
        if (m.count !== null && newValue >= m.count) {
            if (m.discount !== null) {
                data.discount = m.discount;
            }
            data.price = m.price;
        }
    });

    return data;
}

function changeInput(entity) {
    var _this = entity;
    var currentValueInput = _this;
    var currentValue = parseInt(currentValueInput.val());
    var typeProduct = _this.parent().find('.js-type-product').val();
    var prices = _this.parent().find('.js-arr-prices');
    var productID = _this.parent().find('.js-arr-prices').data('id');
    var minCount = JSON.parse(prices.val())[0]['count'];
    var cap = _this.parent().find('.item-select__title');
    var m = '';
    var newValue = 0;

    if(typeProduct == 1 || typeProduct == 2 || typeProduct ==3 || typeProduct == 5 || typeProduct ==7){
        m = ' м';
    }else{
        m = ' шт';
    }

    cap.hide();
    if (!isNaN(currentValue)) {
        if (currentValue < minCount) {
            newValue = minCount;
        } else {
            newValue = currentValue
        }
    } else {
        newValue = minCount;
    }

    currentValueInput.show().val(newValue + m);

    var data = checkStep(newValue, prices);
    updateOrderInfo(newValue, prices, data, productID, _this);
}

function getAllProductsSum() {
    var sum = 0;
    $('.js-current-price-int').each(function () {
        var _this = $(this);
        var value = parseFloat(_this.val());

        sum = sum + value;
    });

    $('.js-cart__sum_current').text(number_format(sum, 2, '.', ' '));
}
