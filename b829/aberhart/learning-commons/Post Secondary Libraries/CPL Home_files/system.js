function confirmDelete(s) { return confirm("Are you sure you want to delete " + s + "?"); }

function watermarkFocus(obj, db) {
	var t = document.getElementById(obj);
	t.style.zIndex = 1;
	t.focus();
	document.getElementById(db).removeAttribute('disabled');
}

function watermarkBlur(obj, db) {
	var t = document.getElementById(obj);
	if (t.value == '') {
		t.style.zIndex = -1;
	}
	document.getElementById(db).setAttribute('disabled', 'disabled');
}

var cbDone = false;

function positionwindow() {
	if (cbDone) {
		var vpHeight = window.innerHeight ? window.innerHeight : $(window).height(),
			cbheight = $('#colorbox').height(), cbTop = vpHeight / 2 - cbheight / 2 - 32,
			vpWidth = window.innerWidth ? window.innerWidth : $(window).width(),
			cbwidth = $('#colorbox').width(),
			cbLeft = vpWidth / 2 - cbwidth / 2 - 32;
		if (cbTop < 0) { cbTop = 0 };
		if (cbLeft < 0) { cbLeft = 0 };
		$('#colorbox').css('position', 'fixed');
		$('#colorbox').css('top', cbTop + 'px');
		$('#colorbox').css('left', cbLeft + 'px');
	}
};

function checkCover(img, isbn, size) {
	if (isbn != '') {
		function setCover() {
			img.onload = undefined;
			if (pic.height > 1) {
				img.src = pic.src;
				img.className = 'bc';
			};
		};
		if (!size) size = "S";
		var pic = new Image();
		pic.onload = setCover;
		if (size == "X") {
			pic.src = isbn;
		} else {
			pic.src = 'https://secure.syndetics.com/index.aspx?isbn=' + isbn + '/' + size + 'C.GIF&client=calgp&type=xw12&upc=&oclc=&';
		}
		//		// if is a large image wait 2 seconds to see if the image was loaded/exists and if not try to load a medium image
		//		if (size == "L") {
		//			setTimeout(function () {
		//				// img.onload undefined means that the function set cover was already called
		//				if (img.onload != undefined) {
		//					pic.src = 'https://secure.syndetics.com/index.aspx?isbn=' + isbn + '/MC.GIF&client=calgp&type=xw12&upc=&oclc=&';
		//				}
		//			}, 2000)
		//		}
	}
}

(function SetMobileButtons() {
	$(document).ready(function () {
		$('.mobile #LoginInfo a').addClass("st-link-as-button").wrapInner("<span><span></span><span class='icon'></span></span>");
		if (document.title == 'CPL: mobile') { $('.mobile #LoginInfo #HomeButton').addClass("disabled").click(function () { return false; }) };
		$('.mobile #LoginInfo #BackButton').click(function () { window.history.go(-1); setTimeout(function () { $('.mobile #LoginInfo #BackButton').addClass("disabled"); }, 500); return false; });
		$('.mobile #PageFooter a').addClass("st-link-as-button").wrapInner("<span><span></span><span></span></span>");
	});
})();

function CheckCheckoutItems() {
	var HasItem = false;
	var Checked = true;
	var h = 0;
	$('.check input').each(function () {
		if (this.checked) { HasItem = true };
		if (!this.checked) { Checked = false };
	});
	if (HasItem) {
		$('.renew-button').css('display', 'block');
		h = $('.renew-button').outerHeight();
	} else {
		$('.renew-button').css('display', 'none');
	};
	$('.message').css('display', 'none');
	$('div.all input:checkbox').attr('checked', Checked);
	$('.FooterContent .st-clear').height(h);
};

function CheckUncheckCheckoutItems(x) {
	$('div.list input:checkbox').each(function () {
		$(this).attr('checked', x.checked);
	});
	CheckCheckoutItems();
}

function ConfirmRenew(wait) {
	var HasItem = false;
	var s = "";
	$('.check input').each(function () {
		if (this.checked) { if (HasItem) s = "s"; HasItem = true; };
	});
	if (HasItem) {
		if (confirm("Are you sure you want to renew the selected item" + s + "?")) {
			$('#' + wait).addClass('Wait');
			return true;
		} else {
			return false;
		}
	} else {
		alert("You need to select at least one item from the list.");
		return false;
	}
};

function CheckHoldItems() {
	var HasItem = false;
	var Checked = true;
	var h = 0;
	$('.check input').each(function () {
		if (this.checked) { HasItem = true };
		if (!this.checked) { Checked = false };
	});
	if (HasItem) {
		$('.hold-action').css('display', 'block');
		h = $('.hold-action').outerHeight();
	} else {
		$('.hold-action').css('display', 'none');
	};
	$('.message').css('display', 'none');
	$('div.all input:checkbox').attr('checked', Checked);
	$('.FooterContent .st-clear').height(h);
};

function CheckUncheckHoldItems(x) {
	$('div.list input:checkbox').each(function () {
		$(this).attr('checked', x.checked);
	});
	CheckHoldItems();
}

function ConfirmEditRemoveHold(wait, type) {
	var HasItem = false;
	var s = "";
	$('.check input').each(function () {
		if (this.checked) { if (HasItem) s = "s"; HasItem = true; };
	});
	if (HasItem) {
		if (type == 1 && $('.mobile-select select').val() == '') {
			alert("Please select a pickup location.");
			return false;
		} else {
			var msg
			if (type == 1) {
				msg = "Are you sure you want to change the pickup location for the selected hold"
			} else {
				msg = "Are you sure you want to cancel the selected hold"
			}
			if (confirm(msg + s + "?")) {
				$('#' + wait).addClass('Wait');
				return true;
			} else {
				return false;
			}
		}
	} else {
		alert("You need to select at least one hold from the list.");
		return false;
	}
};

function ConfirmAddRemoveHold(wait, type) {
	if (type == 1) {
		if ($('.mobile-select select').val() == '') {
			alert("Please select a pickup location.");
			return false;
		} else {
			$('#' + wait).addClass('Wait');
			return true;
		}
	} else {
		if (confirm("Are you sure you want to cancel this hold?")) {
			$('#' + wait).addClass('Wait');
			return true;
		} else {
			return false;
		}
	}
};
