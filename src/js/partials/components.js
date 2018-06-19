//Accordeon
if ($('.js-accordeon').length > 0) {
	$('.js-accordeon').find('.accordeon__title').on('click', function(){
	    if($(this).parent().hasClass('is-open')){
	        $(this).parent().removeClass('is-open').find('.accordeon__content').css('display', 'none');
	    }else{
	        $(this).parent().addClass('is-open').find('.accordeon__content').removeAttr('style');
	    }   
	});
}

//checkbox
$(document).on('click', '.js-checkbox', function (){
    if ($(this).find('input').is(':checked')) {
       $(this).addClass('is-checked');
   } else {
       $(this).removeClass('is-checked');
   }
});

$(document).on('click', '.js-checkbox--pseudo', function (){
    if($(this).hasClass('is-checked')){
        $(this).removeClass('is-checked');
    }else{
        $(this).addClass('is-checked');
    }
});