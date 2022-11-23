window.addEventListener('load', function (event) {
	// console.log('datepicker-load')
	window.vendorLoader({
		name: 'datepicker',
		path: 'js/vendor/datepicker2.js',
		event: {
			mouseover: {
				trigger: '.js-form-control--datepicker'
			},
			click: {
				trigger: '.js-form-control--datepicker'
			},
		},
		callback: function () {


			$.datepicker.regional['ru'] = {
				closeText: 'Закрыть',
				prevText: 'Предыдущий',
				nextText: 'Следующий',
				currentText: 'Сегодня',
				monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
				monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
				dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
				dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
				dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
				weekHeader: 'Не',
				dateFormat: 'dd.mm.yy',
				firstDay: 1,
				isRTL: false,
				showMonthAfterYear: false,
				yearSuffix: ''
			};
			$.datepicker.setDefaults($.datepicker.regional['ru']);

			window.reinit.reinitDatepicker();
		}
	});
	window.reinit.reinitDatepicker = function () {
		// console.log('datepicker-init')
		$('.js-form-control--datepicker').each(function () {

			const minDate = () => {
				let date = $(this).attr('date-min');
				if (date) {
					date = date.split('.').reverse().join(',');
					return new Date(date)
				}
				return null;
			}

			function noSundays(date) {
				return [date.getDay() != 0, ''];
			}

			setTimeout(() => {
				const _this = $(this);
				$(this).datepicker({
					minDate: minDate(),
					clearButton: true,
					defaultDate: new Date(),
					dateFormat: 'dd.mm.yy',
					autoClose: true,
					beforeShowDay: noSundays,
					onSelect: function (a, b, c) {
						$('body').trigger('datapicker-onselect', $(this));
						let $form = _this.closest('.bv-form');
						$form.data('bootstrapValidator').revalidateField($(this));
					}
				})
			}, 500)


		});

		$('.datepicker-input-wrap').click(function () { $(this).find('.form-control--datepicker').focus() })
	}
});