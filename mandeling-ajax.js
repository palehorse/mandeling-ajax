var MandelingAJAX = (function(factory) {
	if (typeof require === 'function') {
		module.exports = factory;
	} else {
		return factory;
	}
})(function() {
	var _asynchronous = true,
		_data = {},_promise,_url,_method,_http_method,_success,_fail,
	    _objMethod = {},
	    _headers = {},
	    _package = null,
	    _init = function() {
	    	_data        = {};
	    	_promise     = null;
	    	_url         = null;
	    	_method      = null;
	    	_http_method = null;
	    	_success     = null;
	    	_fail        = null;
	    	_headers     = {};
	    	_package     = null;

	    },
	    _setHeaders = function(name, value) {
	    	_headers[name] = value;
	    },
	    _send = function() {
	    	_promise = (function() {
	    		return new Promise(function(resolve, reject) {
	    			var objXMLhttpRequest = new XMLHttpRequest(),
	    				ObjReturn = {};
	    			_objMethod[_method].apply();
	    			objXMLhttpRequest.open(_http_method, _url, _asynchronous);
	    			objXMLhttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	    			for (var name in _headers) {
	    				objXMLhttpRequest.setRequestHeader(name, _headers[name]);
	    			}

	    			objXMLhttpRequest.send(_package);
	    			objXMLhttpRequest.onreadystatechange = function() {
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
	    	var params = [];
	    	for (name in _data) {
	    		params.push(name + '=' + _data[name]);
	    	}

	    	if (params.length > 0) {
	    		_url = _url + '?' + params.join('&');
	    	}
	    	_http_method = 'get';
	    };

	    _objMethod.post = function() {
	    	var params = [];
	    	for (name in _data) {
	    		params.push(name + '=' + _data[name]);
	    	}
	    	_http_method = 'post';
	    	_package = params.join('&');
	    	_setHeaders("Content-type", "application/x-www-form-urlencoded");
	    };

	    _objMethod.upload = function() {
	    	_package = new FormData();
	    	for (name in _data) {
	    		_package.append(name, _data[name]);
	    	}
	    	_http_method = 'post';
	    };

	return {
		init: function() {
			_init.apply();
		},
		setUrl: function(url) {
			_url = url;
			return this;
		},
		setMethod: function(method) {
			_method = method;
			return this;
		},
		setData: function(data) {
			_data = data;
			return this;
		},
		setHeaders: function(name, value) {
			_setHeaders(name, value);
			return this;
		},
		send: function() {
			_send();
			return this;
		},
		get: function(url, data) {
			this.init();
			if (typeof url == 'string') {
				this.setUrl(url);
			}

			if (typeof data == 'object') {
				this.setData(data);
			}

			return this.setMethod('get')
					   .send();
		},
		post: function(url, data, csrf) {
			this.init();
			if (typeof url == 'string') {
				this.setUrl(url);
			}

			if (typeof csrf == 'string') {
				this.setHeaders('X-CSRF-TOKEN', csrf);
			}

			if (typeof data == 'object') {
				this.setData(data);
			}

			return this.setMethod('post')
					   .send();
		},
		upload: function(url, data, csrf) {
			this.init();
			if (typeof url == 'string') {
				this.setUrl(url);
			}

			if (typeof csrf == 'string') {
				this.setHeaders('X-CSRF-TOKEN', csrf);
			}

			if (typeof data == 'object') {
				this.setData(data);
			}

			return this.setMethod('upload')
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