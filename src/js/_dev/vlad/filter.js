$(document).ready(function () {
    if ($('.js-catalog-filter').length > 0) {

        var countItems = 0;
        var globalParams = generateUrlArray();
        var seoElement = $('#js-seo-text-block');
        var alert = 0;
        var allCountMasters = $('.js-catalog-count-masters').data('count');

        addMastersToContent(countItems, alert, seoElement, allCountMasters);

        /*
        *************************
        * Select metro stations
        *************************
         */
        $('#js-filter-metro').on('change', function () {
            var metroID = $(this).val();
            var serviceName = $(this).next().text();
            var sUrl;
            var arrParams;


            $('.js-metro-on').append(generateHtmlBlockMetro(serviceName, metroID));

            arrParams = updateUrlArray(globalParams, 'metro', metroID, 'add');
            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.replaceState('url', '', sUrl);

            sendAjax();
        });

        /*
        *************************
        * Select district stations
        *************************
         */
        $('#js-filter-district').on('change', function () {
            var districtID = $(this).val();
            var serviceName = $(this).text();
            var sUrl;
            var arrParams;

            $('.js-district-on').append(generateHtmlBlockDistrict(serviceName, districtID));

            arrParams = updateUrlArray(globalParams, 'district', districtID, 'add');
            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.replaceState('url', '', sUrl);

            sendAjax();
        });

        /*
        *************************
        * Select services
        *************************
         */
        $(document).on('change', '.js-filter-service', function () {
            var serviceID = $(this).data('id');
            var sUrl;
            var arrParams;

            if ($(this).hasClass('is-checked')) {
                arrParams = updateUrlArray(globalParams, 'service', serviceID, 'add');
            } else {
                arrParams = updateUrlArray(globalParams, 'service', serviceID, 'delete');
            }

            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.replaceState('url', '', sUrl);

            if($(window).width() > 768) {
                sendAjax();
            }

        });

        /*
        *************************
        * Select colors
        *************************
         */
        $(document).on('change', '.js-filter-color', function () {
            var colorID = $(this).data('color');
            var sUrl;
            var arrParams;

            if ($(this).hasClass('is-checked')) {
                arrParams = updateUrlArray(globalParams, 'color', colorID, 'add');
            } else {
                arrParams = updateUrlArray(globalParams, 'color', colorID, 'delete');
            }

            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.replaceState('url', '', sUrl);

            if($(window).width() > 768) {
                sendAjax();
            }

        });

        /*
        *************************
        * Select countries
        *************************
         */
        $(document).on('change', '.js-filter-country', function () {
            var countryID = $(this).data('country');
            var sUrl;
            var arrParams;

            if ($(this).hasClass('is-checked')) {
                arrParams = updateUrlArray(globalParams, 'countries', countryID, 'add');
            } else {
                arrParams = updateUrlArray(globalParams, 'countries', countryID, 'delete');
            }

            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.replaceState('url', '', sUrl);

            if($(window).width() > 768) {
                sendAjax();
            }

        });

        /*
        *************************
        * Select cloths
        *************************
         */
        $(document).on('change', '.js-filter-cloth', function () {
            var clothID = $(this).data('cloth');
            var sUrl;
            var arrParams;

            if ($(this).hasClass('is-checked')) {
                arrParams = updateUrlArray(globalParams, 'cloth', clothID, 'add');
            } else {
                arrParams = updateUrlArray(globalParams, 'cloth', clothID, 'delete');
            }

            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.replaceState('url', '', sUrl);

            if($(window).width() > 768) {
                sendAjax();
            }

        });

        /*
        *************************
        * Select cloths
        *************************
         */
        $(document).on('change', '.js-filter-width', function () {
            var widthID = $(this).data('width');
            var sUrl;
            var arrParams;

            if ($(this).hasClass('is-checked')) {
                arrParams = updateUrlArray(globalParams, 'width', widthID, 'add');
            } else {
                arrParams = updateUrlArray(globalParams, 'width', widthID, 'delete');
            }

            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.replaceState('url', '', sUrl);

            if($(window).width() > 768) {
                sendAjax();
            }

        });

        /*
        *************************
        * Remove metro select element from filter
        *************************
         */
        $(document).on('click', '.js-metro-delete__icon', function () {
            var metroID = $(this).data('id');
            var sUrl;
            var arrParams;

            $(this).parent().remove();

            arrParams = updateUrlArray(globalParams, 'metro', metroID, 'delete');
            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.pushState('url', '', sUrl);

            sendAjax();
        });

        /*
        *************************
        * Remove district select element from filter
        *************************
         */
        $(document).on('click', '.js-district-delete__icon', function () {
            var districtID = $(this).data('id');
            var sUrl;
            var arrParams;

            $(this).parent().remove();

            arrParams = updateUrlArray(globalParams, 'district', districtID, 'delete');
            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.pushState('url', '', sUrl);

            sendAjax();
        });



        if ($('.category__list').length > 0){
            if($(window).width() < 769) {
                var category = '';
                category = getUrlVars()['category'];

                if(location.pathname.split('/')[1]){
                    category = location.pathname.split('/')[1];
                }
                $('.category__list').remove();

                if(category !== 'undefined'){
                    $.ajax({
                        method: 'POST',
                        url: '/ajaxCatFilter',
                        data: {
                            category: category,
                            _token: token
                        }
                    }).done(function (response) {
                        if (response.success === true) {
                            $('.js-category').html(response.html);

                            var checked = getUrlVars()['service'];
                            $.ajax({
                                method: 'POST',
                                url: '/ajaxServiceFilter',
                                data: {
                                    checked: checked,
                                    category: category,
                                    _token: token
                                }
                            }).done(function (response) {
                                if (response.success === true) {
                                    $('.catalog-filter__category').children('.category__dropdown').remove();
                                    $('.catalog-filter__category').append(response.html);
                                }
                            });
                        }
                    });
                } else {
                    $.ajax({
                        method: 'POST',
                        url: '/ajaxCatFilter',
                        data: {
                            _token: token
                        }
                    }).done(function (response) {
                        if (response.success === true) {
                            $('.js-category').html(response.html);
                        }
                    });
                }

            }
        }

        /*
        *************************
        * Price filter range
        *************************
         */
        if ($('.catalog-filter__item_price').length > 0) {

            var slider = document.getElementById('js-catalog-filter-slider');
            var allPriceStart = $('#js-catalog-filter-slider').data('start');
            var allPriceEnd = $('#js-catalog-filter-slider').data('end');
            var spans = [$('#jsPriceStart'), $('#jsPriceEnd')];
            var startPrice;
            var endPrice;
            var arrParams;
            var sUrl;

            if (spans[0].text() == '') {
                startPrice = allPriceStart;
            } else {
                startPrice = parseInt(spans[0].text())
            }

            if (spans[1].text() == '') {
                endPrice = allPriceEnd;
            } else {
                endPrice = parseInt(spans[1].text());
            }

            noUiSlider.create(slider, {
                start: [startPrice, endPrice],
                connect: true,
                step:10,
                range: {
                    'min': allPriceStart,
                    'max': allPriceEnd
                }
            });
            slider.noUiSlider.on('update', function (values, handle) {
                spans[handle].text(parseInt(values[handle]));
            });
            slider.noUiSlider.on('change', function (values) {
                arrParams = updateUrlArray(globalParams, 'minPrice', parseInt(values[0]), 'add', true);
                arrParams = updateUrlArray(globalParams, 'maxPrice', parseInt(values[1]), 'add', true);
                globalParams = arrParams;

                sUrl = generateStingFromArray(arrParams);
                window.history.replaceState('url', '', sUrl);

                sendAjax();
            });
        }

        /*
        *************************
        * Gender select
        *************************
         */
        $('.js-filter-gender').on('change', function () {
            var genderID = $(this).data('gender');
            var arrParams;
            var sUrl;

            arrParams = updateUrlArray(globalParams, 'gender', genderID, 'add', true);
            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.replaceState('url', '', sUrl);

            sendAjax();
        });

        /*
        *************************
        * Category select
        *************************
         */
        if($(window).width() < 769) {
            $(document).on('change', '.js-filter-category', function () {

                var genderID = $(this).data('category');
                var arrParams;
                var sUrl;


                arrParams = updateUrlArray(globalParams, 'category', genderID, 'add', true);
                delete arrParams['service'];
                delete arrParams['category'];


                sUrl = generateStingFromArray(arrParams);
                window.history.replaceState('url', '', sUrl);
                window.history.pushState('', '', genderID);

                $.ajax({
                    method: 'POST',
                    url: '/ajaxServiceFilter',
                    data: {
                        category: genderID,
                        _token: token
                    }
                }).done(function (response) {
                    if (response.success === true) {
                        $('.catalog-filter__category').children('.category__dropdown').remove();
                        $('.catalog-filter__category').append(response.html);
                    }
                });
                // sendAjax();
            });
        }

        /*
        *************************
        * Work place select
        *************************
         */
        $('.js-filter-place').on('change', function () {
            var placeID = $(this).data('place');
            var arrParams;
            var sUrl;

            // Получит параметр URL по его имени
            var byName = $.getUrlVar('place');

            if(placeID !== 0){
                arrParams = updateUrlArray(globalParams, 'place', placeID, 'add', true);
            }else{
                if(byName === undefined){
                    return false;
                }else{
                    arrParams = updateUrlArray(globalParams, 'place', byName, 'delete');
                }
            }

            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.replaceState('url', '', sUrl);

            sendAjax();
        });


        $('.jsSelectSort').on('change', function () {
            var sort = $(this).val();

            var colorID = '';

            var sUrl;
            var arrParams;
            var name = "order";

            // Получит параметр URL по его имени
            var byName = $.getUrlVar('order');

            if(sort !== null){
                if (sort === "jsPriceUp"){
                    var colorID = 'up';
                    arrParams = updateUrlArray(globalParams, name, colorID, 'add', true);
                } else if (sort === "jsPriceDown") {
                    var colorID = 'down';
                    arrParams = updateUrlArray(globalParams, name, colorID, 'add', true);
                }else if (sort === "jsNewSort") {
                    var colorID = 'new';
                    arrParams = updateUrlArray(globalParams, name, colorID, 'add', true);
                } else if (sort === "jsClearSort") {
                    arrParams = updateUrlArray(globalParams, name, byName, 'delete');
                }
            }else{
                if(byName === undefined){
                    return false;
                }else{
                    arrParams = updateUrlArray(globalParams, name, byName, 'delete');
                }
            }



            globalParams = arrParams;

            sUrl = generateStingFromArray(arrParams);
            window.history.replaceState('url', '', sUrl);

            sendAjax();
        });


// ----- Mobile version ------------------------------------------

        /*
        *************************
        * Close button
        *************************
         */
        $('.js-catalog-filter--close').on('click', function () {
            $('.catalog-filter').removeClass('is-open');
            $('html').removeAttr('style');

            return false;
        });

        /*
        *************************
        * Close button
        *************************
         */
        // $('.js-btn-pulse').on('click', function () {
        //     $('.catalog-filter').removeClass('is-open');
        //     $('html').removeAttr('style');
        //
        //     ajaxFilter();
        //
        //     return false;
        // });

        $('.js-btn-pulse').on('click', function () {
            var href = window.location.href;
            window.open(href, "_self");
        });
    }
});

function generateHtmlBlockMetro(name, $entityID) {

    var html = '<li class="metro-checked__item">';

    html += name;
    html += '<i class="fa fa-times js-metro-delete__icon metro-checked__icon" data-id="' + $entityID + '"></i>';
    html += '</li>';

    return html;
}

function generateHtmlBlockDistrict(name, $entityID) {

    var html = '<li class="metro-checked__item">';

    html += name;
    html += '<i class="fa fa-times js-district-delete__icon metro-checked__icon" data-id="' + $entityID + '"></i>';
    html += '</li>';

    return html;
}

function generateUrlArray() {
    var arrParams = [];
    var url = window.location.search.substring(1).split("&");

    if (url != '') {

        $.each(url, function (index, value) {
            var paramName;
            var paramValue;

            var params = value.split('=');
            paramName = params[0];
            paramValue = params[1];

            arrParams[paramName] = paramValue;
        });
    }

    return arrParams;
}

function updateUrlArray(arrParams, param, value, process, single) {
    var single = single || false;
    if (arrParams[param]) {
        var workingUrl = arrParams[param];
        workingUrl = workingUrl.toString();
        if (workingUrl != '' && workingUrl.indexOf(',') !== -1) {
            var values = arrParams[param].split(',');
            if (process === 'add') {
                var a = 0;
                $.each(values, function (index, v) {
                    if (v === value) {
                        a ++;
                    }
                });

                if (a === 0) {
                    arrParams[param] = arrParams[param] + ',' + value;
                }
            }
            if (process === 'delete') {
                $.each(values, function (index, v) {
                    if (v == value) {
                        values.splice(index, 1);
                    }
                });
                arrParams[param] = values.join(',');
            }
        }

        if (workingUrl != '' && workingUrl.indexOf(',') === -1) {
            var values = arrParams[param];

            if (process === 'add') {
                if (single) {
                    arrParams[param] = value;
                } else {
                    if (values != value) {
                        arrParams[param] = arrParams[param] + ',' + value;
                    }
                }

            }
            if (process === 'delete') {
                if (values == value) {
                    delete arrParams[param];
                }
            }
        }
    } else {
        arrParams[param] = value;
    }

    return arrParams;
}

function generateStingFromArray(arrParams) {
    var url = '?';

    Object.keys(arrParams).forEach(function (key) {
        if (url == '?') {
            url = url + key + '=' + arrParams[key];
        } else {
            url = url + '&' + key + '=' + arrParams[key];
        }
    });

    return url;
}

$.extend({
    getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name){
        return $.getUrlVars()[name];
    }
});

function ajaxFilter() {

    if(location.pathname.split('/')[1]){
        nameFilter = location.pathname.split('/')[1];
        if (location.pathname.split('/')[2]) {
            nameType = location.pathname.split('/')[2];
        } else {
            nameType = '';
        }
    } else {
        nameFilter = '';
        nameType = '';
    }

    $.ajax({
        method: 'POST',
        url: '/ajaxAddContent',
        data: {
            cityID: cityID,
            cityAlias: $('.js-catalog__city-breadcrumbs').data('alias'),
            globalParams: JSON.stringify(window.location.search.substring(1).split("&")),
            categoryID: $('.js-catalog-filter__category').data('category'),
            nameFilter: nameFilter,
            nameType: nameType,
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            $('.js-product-item__wrap').html(response.html);
            $('.js-count-masters').text(response.countProducts);
            if (response.countProducts === 0) {
                $('.js-catalog-empty').removeClass('is-hidden');
            } else {
                $('.js-catalog-empty').addClass('is-hidden');
            }
                $('#nextPrev').html(response.arrNextPrev);

            // $('.js-ss-slider').simpleslider('init');

            $('html, body').animate({scrollTop: 0}, 800);
        }
    });
}

function ajaxAddContent(countItems, allCountMasters) {

    if(location.pathname.split('/')[1]){
        nameFilter = location.pathname.split('/')[1];
        if (location.pathname.split('/')[2]) {
            nameType = location.pathname.split('/')[2];
        } else {
            nameType = '';
        }
    } else {
        nameFilter = '';
        nameType = '';
    }

    $('.js-loader__scroll').removeClass('is-hidden');
    $('.product-item').each(function () {
        countItems ++;
    });

    $.ajax({
        method: 'POST',
        url: '/ajaxAddContent',
        data: {
            cityID: cityID,
            cityAlias: $('.js-catalog__city-breadcrumbs').data('alias'),
            globalParams: JSON.stringify(window.location.search.substring(1).split("&")),
            categoryID: $('.js-catalog-filter__category').data('category'),
            skip: countItems,
            nameFilter: nameFilter,
            nameType: nameType,
            allCountMasters: allCountMasters,
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            var loader = $('.js-loader__scroll');
            loader.addClass('is-hidden');
            $('.js-product-item__wrap').append(response.html);

            if (response.countProducts === 0 || response.countProducts < response.countCatalog) {
                loader.addClass('the-end');
            }
        }
    });
}

function addMastersToContent(countItems, alert, seoElement, allCountMasters) {
    $(window).scroll(function(){
        if (!checkVisibility(seoElement)) {
            alert = 0;
        }
        if (alert === 0) {
            if (checkVisibility(seoElement)) {
                alert = 1;
                if (!$('.js-loader__scroll').hasClass('the-end')) {
                    ajaxAddContent(countItems, allCountMasters);
                }
            } else {
                alert = 0;
            }
        }
    });
}

function sendAjax() {
    $('.js-loader__scroll').removeClass('the-end');
    if ($(window).width() >= 480) {
        ajaxFilter();
    }
}

function checkVisibility(el){
    var dTop = $(window).scrollTop(),
        dBot = dTop + $(window).height(),
        elTop = $(el).offset().top,
        elBot = elTop + $(el).height();
    return ((elTop <= dBot) && (elTop >= dTop));
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}