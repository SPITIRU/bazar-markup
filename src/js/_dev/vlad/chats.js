$(document).ready(function () {
    if ($('.js-lk-request__chat-form').length > 0) {

        var socket = io.connect(':5001');
        socket.on('chat:message', function (data) {
            $('.js-lk-request__message-box').append(data);
        });

        var message = $('.js-lk-request__chat-message');
        var requestID = $('.js-lk-request__requestID');
        var userID = $('.js-lk-request__userID');
        var isMaster = $('.js-lk-request__isMaster');
        var isClient = $('.js-lk-request__isClient');
        var textarea = document.querySelector('.js-textarea');

        textarea.addEventListener('keydown', autosize);

        textarea.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
                textarea.value += "\r\n";
            } else if (e.keyCode === 13 || e.keyCode === 10) {
                sendData(message, requestID, userID, isMaster, isClient);
                e.preventDefault();
            }
        });

        $('.js-lk-request__chat-submit-button').on('click', function () {

            sendData(message, requestID, userID, isMaster, isClient);

            return false;
        });

        $('.js-lk-request__confirm').on('click', function () {

            sendConfirm(requestID, userID, isMaster, isClient);

            return false;
        });

        $('.js-lk-request__reject').on('click', function () {

            sendReject(requestID, userID, isMaster, isClient);

            return false;
        });
    }
});

function sendData(message, requestID, userID, isMaster, isClient) {
    var obj = {};
    obj['message'] = message.val();
    obj['requestID'] = requestID.val();
    obj['userID'] = userID.val();
    obj['isMaster'] = isMaster.val();
    obj['isClient'] = isClient.val();

    $.ajax({
        method: 'POST',
        url: '/ajaxParseSocketMessage',
        data: {
            arrData: JSON.stringify(obj),
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            $('.js-lk-request__message-empty').remove();
            $('.js-lk-request__chat-message').val('');
        }
    });
}

function sendConfirm(requestID, userID, isMaster, isClient) {
    var obj = {};
    obj['message'] = 'Заявка принята';
    obj['requestID'] = requestID.val();
    obj['userID'] = userID.val();
    obj['isMaster'] = isMaster.val();
    obj['isClient'] = isClient.val();
    obj['confirmed'] = 1;

    $.ajax({
        method: 'POST',
        url: '/ajaxConfirmRequest',
        data: {
            arrData: JSON.stringify(obj),
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            $('.js-lk-request__button-box').remove();
        }
    });
}

function sendReject(requestID, userID, isMaster, isClient) {
    var obj = {};
    obj['message'] = 'Заявка отклонена';
    obj['requestID'] = requestID.val();
    obj['userID'] = userID.val();
    obj['isMaster'] = isMaster.val();
    obj['isClient'] = isClient.val();
    obj['rejected'] = 1;

    $.ajax({
        method: 'POST',
        url: '/ajaxRejectRequest',
        data: {
            arrData: JSON.stringify(obj),
            _token: token
        }
    }).done(function (response) {
        if (response.success === true) {
            $('.js-lk-request__button-box').remove();
        }
    });
}

function autosize() {
    var el = this;
    var buttons = $('.lk-request-item__buttons');
    setTimeout(function () {
        el.style.cssText = 'height:37px';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
        buttons.css({
            bottom: 52 + el.scrollHeight + 'px'
        });
        if (el.scrollHeight >= 123) {
            el.style.overflow = 'auto';
            buttons.css({
                bottom: 160 + 'px'
            });
        }
    }, 0);
}