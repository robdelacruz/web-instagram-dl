(function () {
	var origin_url = "http://whateverorigin.org/get?url=";
	var sample_url = "https://www.instagram.com/p/BDqKUeWMOtQ/";

	var $src_url = $("#src_url");
	var $btn_get = $("#btn_get");
	var $btn_clear = $("#btn_clear");
	var $target_img = $("#target_img");
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
		$btn_clear.prop('disabled', true);
		$target_contents.text('Processing...');

		var target_url = origin_url + encodeURIComponent(src_url_val) + "&callback=?";
		$.getJSON(target_url, function(result) {
			var image_url = extract_image_url(result.contents);
			if (image_url) {
				$target_contents.text('Image found');
				$target_img.attr('src', image_url);
			} else {
				var not_found_msg = "No image found";
				$target_contents.text(not_found_msg);
				$target_img.attr('src', '');
			}
		})
		.fail(function() {
			$target_contents.text('Error accessing url');
			$target_img.attr('src', '');
		})
		.always(function() {
			$btn_get.prop('disabled', false);
			$btn_get.val(org_btn_get_val);
			$btn_clear.prop('disabled', false);
		});
	});

	$btn_clear.click(function() {
		$src_url.val('');
		$target_contents.text('');
		$target_img.attr('src', '');
	});

	function extract_image_url(page_text) {
		var regex = /<meta property="og:image" content="(.*?)" \/>/;
		var match = regex.exec(page_text);
		if (match == null || match.length < 2) {
			// Image url not found
			return null;
		}

		var image_url = match[1];
		return image_url;
	}

	/*
	var s_test = "abcdefghi";
	var regex = /ab(c)(def\w+)/m;

	var match = regex.exec(s_test);
	for (var i=0; i < match.length; i++) {
		console.log("match[" + i.toString() + "] = " + match[i]);
	}
	*/

})();

