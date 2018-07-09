$(document).ready(function () {
    var uploadFileEntity = $('.js-upload-file');

    // Searching for file upload widget is exist
    if (uploadFileEntity.length > 0) {

        var removedFiles = [];

        // Change the upload input field
        uploadFileEntity.on('change', function (event) {

            var files = this.files;
            var data = new FormData();
            var randValue = $(this).data('rand');
            var cropParams = $(this).data('crop');
            var modelID = $(this).data('user');
            var table = $(this).data('table');
            var addModelID = $(this).data('addmodel');
            var htmlBlock = $('.bb-upload__list');

            event.stopPropagation();
            event.preventDefault();

            if (typeof files === 'undefined') {
                return false;
            }

            $.each(files, function (key, value) {
                data.append(key, value);
            });

            data.append('randValue', randValue);
            data.append('cropParams', cropParams);
            data.append('modelID', modelID);
            data.append('addModelID', addModelID);
            data.append('table', table);
            data.append('_token', token);

            $.ajax({
                method: 'POST',
                url: '/ajaxIndexAddImage',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function(response){
                    if (response.success === true) {
                        var arrImagesBlocks = response.arrImagesBlocks;
                        htmlBlock.append(arrImagesBlocks);
                        $('.js-lk-empty').hide();
                    } else {
                        if (response.error) {
                            alert(response.error);
                        }
                    }
                }
            });

            return false;
        });

        // Delete file
        $(document).on('click', '.js-delete-file', function (event) {

            event.stopPropagation();
            event.preventDefault();

            var i = 0;
            var block = $(this);
            var fileName = block.parent().prev().children().data('name');
            var randValue = uploadFileEntity.data('rand');

            removedFiles.push(fileName);

            $.ajax({
                method: 'POST',
                url: '/ajaxRemoveImage',
                data: {
                    fileName: fileName,
                    randValue: randValue,
                    _token: token
                }
            }).done(function (response) {
                if (response.success == true) {
                    block.parent().parent().remove();
                    $('.bb-upload__item').each(function () {
                        i ++;
                    });
                    if (i == 0) {
                        $('.js-lk-empty').show();
                    }
                }
            });
        });
    }
});