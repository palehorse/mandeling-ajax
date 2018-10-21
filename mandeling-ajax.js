var MandelingAJAX = (function(factory) {
	if (typeof require === 'function') {
		module.exports = factory();
	} else {
		return new factory();
	}
})(function() {
	var _asynchronous = true,
		_data = {},_promise,_url,_http_method,_success,_fail,
	    _objXMLhttpRequest = new XMLHttpRequest()
	    _objMethod = {},
	    _headers = {},
	    _build_data = function(data) {
	    	var params = [];
	    	for (var key in data) {
	    		params.push(key + "=" + data[key]);
	    	}

	    	if (params.length > 0) {
	    		return params.join("&");
	    	}
	    	return "";
	    },
	    _send = function() {
	    	_promise = (function() {
	    		return new Promise(function(resolve, reject) {
	    			var ObjReturn = {};
	    			_objMethod[_http_method].apply();

	    			for (var name in _headers) {
	    				_objXMLhttpRequest.setRequestHeader(name, _headers[name]);
	    			}

	    			_objXMLhttpRequest.send(_build_data(_data));
	    			_objXMLhttpRequest.onreadystatechange = function() {
	    				if (this.readyState == 4) {
	    					ObjReturn.status = this.status;
	    					ObjReturn.response = this.responseText;
	    					if (this.status == 200) {
	    						ObjReturn.response = JSON.parse(ObjReturn.response) ? JSON.parse(ObjReturn.response) : ObjReturn.response;
					    		resolve(ObjReturn);
					    		return true;
					    	}
	    					
	    					if (/^5\d{2}$/.test(this.status)) {
	    						if (!ObjReturn.response) {
	    							ObjReturn.response = "Server error";
	    						}
	    					}

	    					if (/^4\d{2}$/.test(this.status)) {
	    						if (!ObjReturn.response) {
	    							ObjReturn.response = "Denied";
	    						}
	    					}

	    					if (/^3\d{2}$/.test(this.status)) {
	    						if (!ObjReturn.response) {
	    							ObjReturn.response = "Redirect";
	    						}
	    					}

	    					ObjReturn.response = JSON.parse(ObjReturn.response) ? JSON.parse(ObjReturn.response) : ObjReturn.response;
	    					reject(ObjReturn);
	    					return false;
	    				}
	    			}
	    		});
	    	})()
	    	.then(function(res) {
	    		if (typeof _success === 'function') {
	    			return _success.call(null, res.response, res.status);
	    		}
	    	})
	    	.catch(function(res) {
	    		if (typeof _fail === 'function') {
	    			return _fail.call(null, res.response, res.status);
	    		}
	    	});
	    };

	    _objMethod.get = function() {
	    	_url = _url + '?' + _build_data(_data);
	    	_data = {};
	    	_objXMLhttpRequest.open(_http_method, _url, _asynchronous);
	    };

	    _objMethod.post = function() {
	    	_objXMLhttpRequest.open(_http_method, _url, _asynchronous);
	    	_objXMLhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    };

	return {
		setUrl: function(url) {
			_url = url;
			return this;
		},
		setMethod: function(http_method) {
			_http_method = http_method;
			return this;
		},
		setData: function(data) {
			_data = data;
			return this;
		},
		setHeaders: function(name, value) {
			_headers[name] = value;
			return this;
		},
		send: function() {
			_send();
			return this;
		},
		get: function(url, data) {
			if (typeof url == 'string') {
				this.setUrl(url);
			}

			if (typeof data == 'object') {
				this.setData(data);
			}

			return this.setMethod('get')
					   .send();
		},
		post: function(url, data) {
			if (typeof url == 'string') {
				this.setUrl(url);
			}

			if (typeof data == 'object') {
				this.setData(data);
			}

			return this.setMethod('post')
					   .send();
		},
		success: function(callback) {
			if (typeof callback === 'function') {
				_success = callback;
			}
			return this;
		},
		fail: function(callback) {
			if (typeof callback === 'function') {
				_fail = callback;
			}
			return this;
		}

	};
});