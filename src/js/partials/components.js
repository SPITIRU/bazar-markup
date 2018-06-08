//Accordeon
if ($('.js-accordeon').length > 0) {
	$('.js-accordeon').find('.accordeon__item').find('.accordeon__title').on('click', function(){
	    if($(this).parent().hasClass('is-open')){
	        $(this).parent().removeClass('is-open').find('.accordeon__content').css('display', 'none');
	    }else{
	        $(this).parent().addClass('is-open').find('.accordeon__content').removeAttr('style');
	    }   
	});
}