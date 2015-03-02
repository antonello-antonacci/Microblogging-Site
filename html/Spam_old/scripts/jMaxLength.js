/*
 * jQuery jMaxLength Plugin
 * author: Carlo Gherarducci
 * version: 1.0.1 (11/01/2011)
 * @requires jQuery v1.2.6 or later
 *
 * Examples and documentation (in italian) at: http://www.mynamespace.it/
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Plugin pattern inspired by this blog post of Hector Virgen:
 * http://www.virgentech.com/blog/2009/10/building-object-oriented-jquery-plugin.html
 */
 
(function($){
	var MaxLength = function(element, options)
	{
		var el = $(element);
		var maxLength;
		var counter;
		
		var settings = $.extend({
			maxLengthDataKey: 'maxlength',	// chiave che verrà utilizzata nella funzione $.data() per ottenere la lunghezza massima
			showMaxLength: true,		// mostra o meno il numero massimo di caratteri
			showCurrentLength: true,	// mostra o meno il numero corrente di caratteri
			truncate: true,		 // taglia il testo inserito al numero massimo di caratteri, altrimenti visualizza un numero negativo
			showRemaining: false,	 // se impostato, viene visualizzato il numero rimanente di caratteri anziché quelli digitati
			showTrunksCount: false,	 // se impostato, visualizza il numero di "blocchi" di maxLength caratteri e non taglia
			counterTag: 'span',	 // tag dell'elemento contenente i vari contatori
			counterClass: 'counter', // classe del tag suddetto
			counterSeparator: '/'	// separatore dei vari elementi del contatore
		}, options || {});

		// metodo pubblico
		this.init = function()
		{
			maxLength = settings.maxLength || el.attr('maxlength') || el.data(settings.dataMaxLengthKey);
			if(!maxLength) {
				$.error("jMaxLength: E' obbligatorio specificare la lunghezza massima del campo.");
			}
			return el.each(function(){
				counter = $('<' + settings.counterTag + ' class="' + settings.counterClass + '"></' + settings.counterTag + '>')
					.insertAfter(el)
					.html(el.val().length + '/' + settings.maxLength);
				
				updateCounter(el.val().length);
				el.bind('keyup.maxLength change.maxLength', checkCount);
			});
		};

		// metodi privati
		var checkCount = function(evt)
		{
			var length = el.val().length;
			if(length > maxLength && !settings.showTrunksCount) {
				if(settings.truncate) {
					el.val(el.val().substring(0, maxLength));
					length = maxLength;
				}
			}
			updateCounter(length);
		};
		
		var updateCounter = function(length) {
			if(!counter) return;
			
			if(settings.showRemaining) {
				counter.html(maxLength - length);
			} else {
				counter.html(
					(settings.showCurrentLength ? length : '') +
					(settings.showCurrentLength && settings.showMaxLength ? ' ' + settings.counterSeparator + ' ' : '') +
					(settings.showMaxLength ? maxLength : '')
				);
			}
			
			if(settings.showTrunksCount) {
				counter.html(counter.html() + ' ' + settings.counterSeparator + ' ' + Math.ceil(length / maxLength));
			}
		};
	};

	$.fn.jMaxLength = function(options)
	{
		return this.each(function()
		{
			var element = $(this);
			if(!element.is('input[type=text]') && !element.is('input[type=password]') && !element.is('textarea')) {
				$.error("jMaxLength: Questo plugin è applicabile soltanto a campi di testo.");
			}
			if (element.data('jMaxLength')) return;
			var maxLength = new MaxLength(this, options);
			maxLength.init();
			element.data('jMaxLength', maxLength);
		});
	};
})(jQuery);


