// pop open close
function popOpen(e) {
    var data = $(e).data('openpop');
    $('[data-pop="'+ data +'"]').show();
}

function popClose(e){
    $(e).closest('.layer-pop').hide();
}

// input disabled true / false
function disChk(){
    var $disChk = $('.dischk');
    var $disChk02 = $('.dischk02');
    var $disChkOff = $('.dischk-off');
    var $dischkRadio = $('.dischk-radio');
    $disChk.on('change', function() {
        var data = $(this).data('dischk');
        if ( $(this).prop('checked') )
        {
            $('[data-disabled="'+ data +'"]').prop('disabled',false);
        } else {
            $('[data-disabled="'+ data +'"]').prop('disabled',true);
        }
    });

    $disChk02.on('change', function() {
        var data = $(this).data('dischk');
        if ( $(this).prop('checked') )
        {
            $('[data-disabled="'+ data +'"]').prop('disabled',true);
        } else {
            $('[data-disabled="'+ data +'"]').prop('disabled',false);
        }
    });

    $disChkOff.on('change', function() {
        var data = $(this).data('dischk');
        if ( $(this).prop('checked') )
        {
            $('[data-disabled="'+ data +'"]').prop('disabled',true);
        }
    });

    $dischkRadio.on('change', function() {
        var name = $(this).attr('name');
        var nameLng = $('[name="'+ name +'"]').length;
        if ( $(this).prop('checked') )
        {
            for (var i = 0; i < nameLng; i++) {
                var data =  $('[name="'+ name +'"]').eq(i).data('dischk');
                $('[data-disabled="'+ data +'"]').prop('disabled',true);
            }
            var thisData = $(this).data('dischk');
            $('[data-disabled="'+ thisData +'"]').prop('disabled',false);
        }
    });
}

// 요일별 활성화 체크
function crossChk() {
    $('[data-cross]').on('change', function(){
        var data = $(this).data('cross');
        var $crossEle = $('[data-cross="'+ data +'"]');
        var lng = $('[data-cross="'+ data +'"]').length;
        var cnt = $('[data-cross="'+ data +'"]:checked').length;
        if (cnt == lng) {
            var disData = $crossEle.data('dischk');
            $('[data-disabled="'+ disData +'"]').prop('disabled',true);
        }
    });
}

function dpchk() {
    var $dpon = $('.dp-onoff');
    $dpon.on('change', function() {
        var dataOn = $(this).data('displayon');
        var dataOff = $(this).data('displayoff');
        console.log(dataOn, dataOff);
        if ( $(this).prop('checked') )
        {
            $('[data-display="'+ dataOn +'"]').show();
            $('[data-display="'+ dataOff +'"]').hide();
        }
    });
}

// 파일첨부
var $fileBox = null;
function fileInit(){
    $fileBox = $('.inp-file');
    fileLoad();
}
function fileLoad(){
    $.each($fileBox, function(idx){
        var $this = $fileBox.eq(idx),
                    $btnUpload = $this.find('[type="file"]'),
                    $label = $this.find('.file-label');
        $btnUpload.on('change', function(){
            var $target = $(this),
            fileName = $target.get(0).files.item(0).name;
            $fileText = $target.closest('.inp-file').find('.file-name');
            $fileText.val(fileName);
        });
        $btnUpload.on('focusin focusout', function(e){
            e.type == 'focusin' ? $label.addClass('file-focus') : $label.removeClass('file-focus');
        });
    });
}

// dp select
function dpSelect() {
    var $dps = $('.dp-select');
    var $dpnone = $('.dp-trg');
    $dps.on('change', function(){
        var val = $(this).val();
        if (val == 'display') {
            $dpnone.show();
        } else {
            $dpnone.hide();
        }
    })
}

// selectbox
function dpChange() {
    var $dps = $('.dp-change');
    $dps.on('change', function(){
        var val = $(this).val();
        var data = $(this).data('scobj');
        if (val == 'etc') {
            $('[data-sctrg="'+ data +'"]').prop('disabled',false);
        } else {
            $('[data-sctrg="'+ data +'"]').prop('disabled',true);
        }
    })
}


// slide
function slide() {
    $('.slide-act').on('click', function(){
        var data = $(this).data('slide');
        var $trg = $("[data-slidecont='" + data + "']");

        if ( $trg.css('display') == 'block' ){
            $(this).addClass('on');
            $trg.stop().slideUp(500);
        } else {
            $(this).removeClass('on');
            $trg.stop().slideDown(500);
        }
    })
}

// auto Email
function autoEmail() {
    var $autoCont = $('.mail-list-cont');
    var $autoEmail = $('.email-auto');
    var $autoDomain = $('.mail-list a');
    var etcWord = '직접선택';
    var domains = [
        "konai.com",
        "naver.com",
        "nate.com",
        "gmail.com",
        "hotmail.com",
        "daum.net",
        "yahoo.co.kr"
    ];
    $autoEmail.on('keyup', function(){
        value = $(this).val();
        if (value.indexOf("@") != -1) {
            value = value.split("@")[0];            
            var mailList = '';
            var typing = "<li><a href='#'>" + etcWord + "</a></li>";
            for (i = 0; i < domains.length; i++) {
                mailList += "<li><a href='#'>" + value + "@" + domains[i] + "</a></li>";
            }
            listhtml = "<div class='mail-list-cont on'><ul class='mail-list'>" + typing + mailList + "</ul></div>";
            $(this).closest('.email-wrap').find('.mail-list-cont').remove();
            $(listhtml).appendTo($(this).closest('.email-wrap'));
            $autoEmail.addClass('on');
        } else {
            $(this).closest('.email-wrap').find('.mail-list-cont').remove();
            $('.mail-list-cont').removeClass('dp-none');
            displayList();
        }
    });

    $(document).on('click', '.mail-list li a', function(e){
        e.preventDefault();
        var value = $(this).html();
        if ( value == etcWord ) {
            $('.mail-list-cont').addClass('dp-none');
            $(this).closest('.input-text').find('input').focus();
        } else {
            $(this).closest('.input-text').find('input').val(value);
            displayList();
        }
    });

    emailDisplay();

    function displayList() {
        $autoEmail.removeClass('on');
        $('.mail-list-cont').removeClass('on');
    }

    function emailDisplay(){
        $(document).on('mouseenter focus', '.mail-list a', function(){
            $autoEmail.addClass('on');
            $('.mail-list-cont').addClass('on');
        });
        
        $(document).on('blur', '.mail-list > li a:last, .mail-list > li', function(){
            displayList();
        });

        $autoEmail.on('blur', function(){
            setTimeout(function(){
                if ( !$('.mail-list a').is(':focus') ){
                    displayList();
                }
            }, 100);    
        });
    }
}

// 매장 사진 등록
function imgUpload() {
    $(document).on('change', '.img-upload > input', function(){
        var $this = $(this);
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            var btn = '<button type="button" class="underline-btn photo-remove">삭제</button>';
            var name = $this.get(0).files.item(0).name;
            var name = '<em>' + name + '</em>';
            var filesize = $this.get(0).files.item(0).size;
            var fs = filesize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var fs = '<em>(' + fs + 'KB)</em>';
            reader.onload = function (e) {
                src = e.target.result;
                img = '<img src="' + src + '" alt="">';
                $this.closest('.photo-items').find('label').hide();
                $(img).appendTo($this.closest('.photo-items'));
                $(name).appendTo($this.closest('.photo-items'));
                $(fs).appendTo($this.closest('.photo-items'));
                $(btn).appendTo($this.closest('.photo-items'));
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
}

// 매장 사진 삭제
function photoRemove() {
    $(document).on('click', '.photo-remove', function(){
        $(this).closest('.photo-items').find('label').show();
        $(this).closest('.photo-items').find('img').remove();
        $(this).closest('.photo-items').find('em').remove();
        $(this).remove();
        //$(this).closest('.photo-items').find('label').show();
    });
}

$(window).on('resize', function(){
    jQuery('.scrollbar-outer').scrollbar();
});


$(function(){

    // scrollbar
    jQuery('.scrollbar-outer').scrollbar();

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

    // display checked on off
    dpchk();

    // 파일첨부
    fileInit();

    // dp select
    dpSelect();

    // select change
    dpChange();

    // slide
    slide();

    // auto Email
    autoEmail();

    // 매장 사진 등록
    imgUpload();

    // 매장 사진 삭제
    photoRemove();

    // 요일별 활성화 체크
    crossChk();

    //script
})



