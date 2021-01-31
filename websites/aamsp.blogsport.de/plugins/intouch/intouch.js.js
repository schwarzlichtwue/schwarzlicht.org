		
		// remote scripting library
		// (c) copyright 2005 modernmethod, inc
		var sajax_debug_mode = false;
		var sajax_request_type = "GET";
		
		function sajax_debug(text) {
			if (sajax_debug_mode && typeof console != 'undefined')
				console.log("RSD: " + text)
		}
 		function sajax_init_object() {
 			sajax_debug("sajax_init_object() called..")
 			
 			var A;
			try {
				A=new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					A=new ActiveXObject("Microsoft.XMLHTTP");
				} catch (oc) {
					A=null;
				}
			}
			if(!A && typeof XMLHttpRequest != "undefined")
				A = new XMLHttpRequest();
			if (!A)
				sajax_debug("Could not create connection object.");
			return A;
		}
		function sajax_do_call(func_name, args) {
			var i, x, n;
			var uri;
			var post_data;
			
			uri = "../index.html";
			if (sajax_request_type == "GET") {
				if (uri.indexOf("?") == -1) 
					uri = uri + "?rs=" + escape(func_name);
				else
					uri = uri + "&rs=" + escape(func_name);
				for (i = 0; i < args.length-1; i++) 
					uri = uri + "&rsargs[]=" + escape(args[i]);
				uri = uri + "&rsrnd=" + new Date().getTime();
				post_data = null;
			} else {
				post_data = "rs=" + escape(func_name);
				for (i = 0; i < args.length-1; i++) 
					post_data = post_data + "&rsargs[]=" + escape(args[i]);
			}
			
			x = sajax_init_object();
			x.open(sajax_request_type, uri, true);
			if (sajax_request_type == "POST") {
				x.setRequestHeader("Method", "POST " + uri + " HTTP/1.1");
				x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			x.onreadystatechange = function() {
				if (x.readyState != 4) 
					return;
				sajax_debug("received " + x.responseText);
				
				var status;
				var data;
				status = x.responseText.charAt(0);
				data = x.responseText.substring(2);
				if (status == "-") 
					alert("Error: " + data);
				else  
					args[args.length-1](data);
			}
			x.send(post_data);
			sajax_debug(func_name + " uri = " + uri + "/post = " + post_data);
			sajax_debug(func_name + " waiting..");
			delete x;
		}
		
				
		// wrapper for intouch_submitcomment		
		function x_intouch_submitcomment() {
			sajax_do_call("intouch_submitcomment",
				x_intouch_submitcomment.arguments);
		}
		
		
function intouch_submitcomment() {
	var regexp = new RegExp('[$][#][$]', ['g']);

	 
			
	var var_1 = document.getElementById('field_1').value.replace(regexp, '$');
		
		 
			
	var var_2 = document.getElementById('field_2').value.replace(regexp, '$');
		
		 
			
	var var_3 = document.getElementById('field_3').value.replace(regexp, '$');
		
		 
			
	var var_4 = document.getElementById('field_4').value.replace(regexp, '$');
		
			
	x_intouch_submitcomment('' + var_1 + '$#$' + var_2 + '$#$' + var_3 + '$#$' + var_4 + '', intouch_setsuccessmessage);
}
	
function intouch_setsuccessmessage(message) {
	document.getElementById('intouchform').reset();
	doInnerXHTML('usermessage', message);
}

function intouch_validate() {
	if(doInnerXHTML('usermessage', 'Please wait...')) {
		var all_valid = true;
		
		if(document.getElementById('field_1').value == '') {
			document.getElementById('field_1').className = "error";
			all_valid = false;
		}
		else {
			document.getElementById('field_1').className = "default";
		}
		
		var regexp = new RegExp('^[\\w-_\.]+@[\\w-_]+[\.][\\w-_\.]+$');
						
		if(document.getElementById('field_2').value == '' || ! document.getElementById('field_2').value.match(regexp)) {
			document.getElementById('field_2').className = "error";
			all_valid = false;
		}
		else {
			document.getElementById('field_2').className = "default";
		}
		
				
		if(document.getElementById('field_4').value == '') {
			document.getElementById('field_4').className = "error";
			all_valid = false;
		}
		else {
			document.getElementById('field_4').className = "default";
		}
		
				
		if(all_valid) {
			intouch_submitcomment();
		}
		else {
			doInnerXHTML('usermessage', 'Bitte alle Felder ausfüllen!');
		}
		
		return false;
	}
	else {
		return true;
	}
}

// fallback if DOMParser and innerHTML are not working
function doInnerXHTML(elementId, stringXHTML) {
	try {
		var elem = document.getElementById(elementId);
		var children =  elem.childNodes;
	
		for (var i = 0; i < children.length; i++) {
			elem.removeChild(children[i]);
		}
	
		var nodes = new DOMParser().parseFromString('<span>' + stringXHTML + '</span>', 'text/xml');
		var range = document.createRange();
		range.selectNodeContents(document.getElementById(elementId));
		range.deleteContents();
		
		for (var i = 0; i < nodes.childNodes.length; i++) {
			document.getElementById(elementId).appendChild(nodes.childNodes[i]);
		}
		return true;
	} catch (e) {
		try {
			document.getElementById(elementId).innerHTML = stringXHTML;
			return true;
		}
		catch(ee) {
			return false;
		}
	}
}
