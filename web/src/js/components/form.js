// import Animation from './animation.js';
// import {status, json} from './utilities';
import Inputmask from 'inputmask';

export default class Form {
	constructor(form) {
		this.$form = $(form);
		this.$formWrap = this.$form.parents('.form_wrapper');
		this.$submitButton = this.$form.find('button[type="submit"]');
		this.$policy = this.$form.find('[name="policy"]');

		this.to = (this.$form.attr('action') == undefined || this.$form.attr('action') == '') ? this.to : this.$form.attr('action');
		
		let im_phone = new Inputmask('+7 (999) 999-99-99', { clearIncomplete: false });
		im_phone.mask($(this.$form).find('[name="phone"]'));

		this.bind();
	}

	bind() {
		this.$form.find('[data-required]').each((i, el) => {
			$(el).on('blur', (e) => {
				this.checkField($(e.currentTarget));
			});
			$(el).on('input', (e) => {
				this.cleanErrorInput($(e.currentTarget))
			});
		});

		this.$form.on('submit', (e) => {
			this.sendIfValid(e);
		});

		this.$policy.on('click',(e) => {
			var $el = $(e.currentTarget);
			if ($el.prop('checked'))
				$el.removeClass('_invalid');
			else
				$el.addClass('_invalid');
		});		

		this.$formWrap.find('[data-success] [data-success-close]').on('click', (e) => {
			this.$formWrap.find('[data-success]').removeClass('_active');			
			this.$form.removeClass('_hide');
		});

		if (this.$form.data('type') === 'MaxForm') {
			let $currentCuty = this.$form.find('.form_inpyt_city_hide').val();
			this.searchCurrentElem('.options_element_city', $currentCuty, '_current');
			let $currentGuest = this.$form.find('.form_inpyt_guest_hide').val();
			this.searchCurrentElem('.options_element_guest', $currentGuest, '_current');
		}
		
		this.$form.on('click', (e) => {
			let $elForm = $(e.currentTarget);
			if ($(e.target).hasClass('form_inpyt_city') || $(e.target).hasClass('form_inpyt_city_check')) {
				$elForm.find('.form_inpyt_city_options').toggleClass('_hide');
				$elForm.find('.form_inpyt_city_check').toggleClass('_hide');
				$elForm.find('.form_inpyt_guest_options').addClass('_hide');
				$elForm.find('.form_inpyt_guest_check').removeClass('_hide');
				return
			}
			if ($(e.target).hasClass('options_element_city')) {
				$elForm.find('.form_inpyt_city_hide').val($(e.target).text());
				$elForm.find('.form_inpyt_city').text($(e.target).text());
				this.searchCurrentElem('.options_element_city', $(e.target).text(), '_current');
				$elForm.find('.form_inpyt_city_options').toggleClass('_hide');
				$elForm.find('.form_inpyt_city_check').toggleClass('_hide');
				return
			}
			if ($(e.target).hasClass('form_inpyt_guest') || $(e.target).hasClass('form_inpyt_guest_check')) {
				$elForm.find('.form_inpyt_guest_options').toggleClass('_hide');
				$elForm.find('.form_inpyt_guest_check').toggleClass('_hide');
				$elForm.find('.form_inpyt_city_options').addClass('_hide');
				$elForm.find('.form_inpyt_city_check').removeClass('_hide');
				return
			}
			if ($(e.target).hasClass('options_element_guest')) {
				$elForm.find('.form_inpyt_guest_hide').val($(e.target).text());
				$elForm.find('.form_inpyt_guest').text($(e.target).text());
				this.searchCurrentElem('.options_element_guest', $(e.target).text(), '_current');
				$elForm.find('.form_inpyt_guest_options').toggleClass('_hide');
				$elForm.find('.form_inpyt_guest_check').toggleClass('_hide');
				return
			}
			$elForm.find('.form_inpyt_city_options').addClass('_hide');
			$elForm.find('.form_inpyt_city_check').removeClass('_hide');
			$elForm.find('.form_inpyt_guest_options').addClass('_hide');
			$elForm.find('.form_inpyt_guest_check').removeClass('_hide');
		});
	}

	searchCurrentElem(selectorElem, currentName, classCurselectorElemrent) {
		this.$form.find(selectorElem).each((index, element) => {
			if ($(element).text() === currentName) {
				$(element).addClass(selectorElem);
			} else {
				$(element).removeClass(selectorElem);
			}
		});
	}

	cleanErrorInput($field) {
		$field.removeClass('_invalid');
		$field.parent().find('.form_input_error').html('');
	}

	checkField($field) {
			var valid = true;
			var name = $field.attr('name');
			// var pattern_email = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

			if ($field.val() == '') {
				valid = false;
				if (name === 'name') { var custom_error = 'Пожалуйста, укажите имя'; }
			} else {
				if (name === 'phone' && $field.val().indexOf('_') >= 0) {
					valid = false;
					var custom_error = 'Неверный формат телефона';
				}
		        // if (name === 'email' && !(pattern_email.test($field.val()))) {
				// 	valid = false;
				// 	var custom_error = 'Неверный формат электронной почты';
				// }
			}

			if (valid) {
				$field.removeClass('_invalid');
				$field.parent().find('.form_input_error').html('');
			} else {
				$field.addClass('_invalid');
				var error_message = custom_error || 'Заполните поле';
				$field.siblings('.form_input_error').html(error_message);
			}
	}

	checkFields() {
		var valid = true;

    	this.$form.find('[data-required]').each((i, el) => {
			this.checkField($(el));
			if ($(el).hasClass('_invalid'))
				valid = false;
		});

		if (this.$policy.hasClass('_invalid')) valid = false;		

		if (!valid) { this.$form.find('._invalid')[0].focus(); }

		return valid;
	}
	
	success(data, formType) {
		switch(formType) {
			case 'RequestCall':
			break;

		  	case 'ReservationHall':
		    //ym(64598434,'reachGoal','form_main');
		    //gtag('event', 'form');
		    break;

		  	case 'MaxForm':
		    //ym(64598434,'reachGoal','form_room');
		    //gtag('event', 'form');
		    break;
		}
	
		this.$formWrap.find('[data-success] [data-success-name]').text(data.name);
		this.$formWrap.find('[data-success]').addClass('_active');
		this.$form.addClass('_hide');
		this.$form[0].reset();
	}

	error() { /* обрабатываем ошибку */ }

	sendIfValid(e) {
		var self = this;
	    e.preventDefault();
	    if (!this.checkFields()) return;
	    if (this.disabled) return;

	    var formData = new FormData(this.$form[0]);
	    var formType = this.$form.data('type');
	    formData.append('type', formType);
	    var formUrl = window.location.href;
	    formData.append('url', formUrl);

	    for (var pair of formData.entries()) {
		    console.log(pair[0]+ ', ' + pair[1]);
		}

	    $.ajax({
            beforeSend: function() { self.disabled = true; },
            type: "POST",
            url: self.to,
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
				self.disabled = false;
            	self.success(response, formType);
            },
            error: function(response) {
				self.disabled = false;
                self.error(response, formType);
            }
        });
	}
}
