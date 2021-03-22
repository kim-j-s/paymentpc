$(function(){

    //달력
    if($('.inp-date').length > 0){
        $('.inp-date').datepicker({
            closeText: '닫기',
            prevText: '이전 달',
            nextText: '다음 달',
            currentText: '오늘',          
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            dayNames: ['일','월','화','수','목','금','토'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
            dateFormat: 'yy.mm.dd',
            showMonthAfterYear: true,
            changeMonth: true,
            changeYear: true,
            yearSuffix: '년',
            beforeShow: function(i) {
                if ( $(i).attr('readonly') )
                {
                    return false;
                }
            }
        });
    }


	// input disabled true / false
	disChk();


    // auto Email
    autoEmail()


    //script
})






// input disabled true / false
function disChk(){
	var $disChk = $('.dischk');
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




// auto Email
function autoEmail() {
    var domains = [
        "직접입력",
        "konai.com",
        "naver.com",
        "nate.com",
        "gmail.com",
        "hotmail.com",
        "daum.net",
        "yahoo.co.kr"
    ];

    // Using DropDown element to suggest static list of domains
    var EmailDomainSuggester = function ($bindTo) { 
        var datalist = null;  

        var init = function () {    
            addElements();
            bindEvents();
        };
      
        var addElements = function () {
            var datalistId = 'email_options_' + $bindTo.attr('class');

            //create empty datalist
            datalist = $("<datalist />", {
                id: datalistId
            }).insertAfter($bindTo);    

            // correlate to input
            $bindTo.attr("list", datalistId);
        };
      
        var bindEvents = function () {
            $bindTo.on("keyup", testValue);
        };
      
        var testValue = function (event) {
            var el = $(this),
                value = el.val();
                
            // email has @
            if (value.indexOf("@") != -1) {
                value = value.split("@")[0];
                addDatalist(value);
            } else {
                // empty list
                emptyDatalist();
            }
        };
      
        var emptyDatalist = function () {
            datalist.empty();
        };
      
        var addDatalist = function (value) {
            var i,
                newOptionsString = '';

            // loop over all the domains in our array
            for (i=0; i<domains.length; i++) {
            newOptionsString += "<option value='" +
                            value + "@" +
                            domains[i] + 
                            "'>";
            }

            // add all the <option>s to the datalist
            datalist.html(newOptionsString);
        };  
      
        init();
    };

    var edsEmail = new EmailDomainSuggester($('.email-auto'));
}