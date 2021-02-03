jQuery(document).ready(function() {
	if ( jQuery('#commentform').length ) {
		jQuery('#commentform').submit(function(){
			jQuery.ajax({
				url: K2.ajaxCommentsURL,
				data: jQuery('#commentform').serialize(),
				type: 'POST',

				beforeSend: function() {
					jQuery('#commenterror').hide();
					jQuery('#commentload').show();
				},

				error: function(request) {
					jQuery('#commentload').hide();
					jQuery('#commenterror').show().html(request.responseText);
				},

				success: function(data) {
			        jQuery('input,select,textarea', '#commentform').each(function(){
				        var t = this.type, tag = this.tagName.toLowerCase();
				        if (t == 'password' || tag == 'textarea')	// modified by gigi
				            this.value = '';
				        else if (t == 'checkbox' || t == 'radio')
				            this.checked = false;
				        else if (tag == 'select')
				            this.selectedIndex = -1;
					});

					jQuery('#commenterror').hide().html();

					if ( jQuery('#leavecomment').length ) {
						jQuery('#leavecomment').remove();
					}

					jQuery('#comnum').html(parseInt(jQuery('#comnum').html()) + 1);

					if ( !jQuery('#commentlist').length ) {
						jQuery('#pinglist').before('<ol id="commentlist"></ol>');
					}

					jQuery('#commentlist').append(data);
					jQuery('#commentform :input').attr('disabled', true);
					jQuery('#commentformbox').slideUp();

					jQuery('#commentload').hide();

					setTimeout(function() {
						jQuery('#commentform :input').removeAttr('disabled');
						jQuery('#commentformbox').slideDown();
					}, 15000);
				}
			});

			return false;
		});
	}
});
