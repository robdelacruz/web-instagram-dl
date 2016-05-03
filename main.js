(function () {
	var origin_url = "http://whateverorigin.org/get?url=";
	var sample_url = "https://www.instagram.com/p/BDqKUeWMOtQ/";

	var $src_url = $("#src_url");
	var $btn_get = $("#btn_get");
	var $btn_clear = $("#btn_clear");
	var $target_contents = $('#target_contents');

	$btn_get.click(function() {
		var src_url_val = $src_url.val();
		if (src_url_val == '') {
			$target_contents.text('Source url needed');
			return;
		}

		var org_btn_get_val = $btn_get.val();
		$btn_get.prop('disabled', true);
		$btn_get.val('Wait...');
		$target_contents.text('Processing...');

		var target_url = origin_url + encodeURIComponent(src_url_val) + "&callback=?";
		$.getJSON(target_url, function(result) {
			$target_contents.text(result.contents);
		})
		.error(function() {
			$target_contents.text('Error accessing url');
		})
		.complete(function() {
			$btn_get.prop('disabled', false);
			$btn_get.val(org_btn_get_val);
		});
	});

	$btn_clear.click(function() {
		$src_url.val('');
		$target_contents.text('');
	});

})();

