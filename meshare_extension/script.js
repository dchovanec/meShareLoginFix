
    var form1 = $('#form1');
	var onSuccess = function(data) {
			var result = data.result;
			if('ok' == result){
				location.href = 'https://user.meshare.com/device/list';
			}else {
				//alert(data.error);
				var v = $('input[name=username]');
				if(form1.is(':hidden')) {
					v = $('input[name=phone_num]');
				}
				v.focus();
				$.bubble({tg: v, text: data.error});
			}
		}
  var my_form1Opt = {
			beforeSubmit: function(s, f) {
				var item = f.find('[name=username]');
				if(!$.trim(item.val()).length) {
					item.focus();
					$.bubble({tg: item, text: 'Please enter email'});
					return false;
				}
				var reg = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-|_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
				if(!reg.test(item.val())) {
					item.focus();
					$.bubble({tg: item, text: 'Please enter valid email'});
					return false;
				}

				item = f.find('.pwd');
				if(!$.trim(item.val()).length) {
					item.focus();
					$.bubble({tg: item, text: 'Please enter password'});
					return false;
				}
			}, 
			success: onSuccess
		};
	form1.submit(function() {
			$('.md5pwd').val(md5(form1.find('.pwd').val()));
		}).ajaxForm(my_form1Opt);
