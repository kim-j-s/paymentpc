$(function(){


	// input disabled true / false
	//disChk();


    //script
})






// input disabled true / false
function disChk(){
	var $disChk = $('[.dischk');
    $disChk.on('change', function() {
        var data = $(this).data('dischk');
        if ( $(this).prop('checked') )
        {
            $('[data-disabled="'+ data +'"]').prop('disabled',false);
            
        } else {
            $('[data-disabled="'+ data +'"]').prop('disabled',true);
        }
    });
}