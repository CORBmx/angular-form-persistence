(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("angular-form-persistence", [], factory);
	else if(typeof exports === 'object')
		exports["angular-form-persistence"] = factory();
	else
		root["angular-form-persistence"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./src/formPersistence.js */1);
	__webpack_require__(/*! ./src/formPersistence.provider.js */2);
	module.exports = __webpack_require__(/*! ./src/formPersistence.directive.js */4);


/***/ },
/* 1 */
/*!********************************!*\
  !*** ./src/formPersistence.js ***!
  \********************************/
/***/ function(module, exports) {

	'use strict';
	
	// Create module
	var formPersistence = angular.module('formPersistence', []);
	
	module.exports = formPersistence.name;

/***/ },
/* 2 */
/*!*****************************************!*\
  !*** ./src/formPersistence.provider.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(/*! store */ 3);
	
	var _store2 = _interopRequireDefault(_store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	angular.module('formPersistence').provider('formPersistence', formPersistence);
	
	function formPersistence() {
	    var _this = this;
	
	    this.prefix = 'fp';
	
	    /**
	     * Prefix setter
	     * @author Andrés Ávila <andres.avila@corb.mx>
	     * @version 0.0.1
	     * @since   0.0.1
	     * @param   {string} prefix  prefix attached to all the keys
	     * @return  {object}         provider reference
	     */
	    this.setPrefix = function (prefix) {
	        _this.prefix = prefix;
	
	        return _this;
	    };
	
	    this.$get = function () {
	        var self = _this;
	
	        return {
	            save: saveData,
	            load: loadData,
	            clear: clearKey,
	            clearAll: clearAll
	        };
	
	        /**
	         * Key prefixer
	         * @author Andrés Ávila <andres.avila@corb.mx>
	         * @version 0.0.1
	         * @since   0.0.1
	         * @param   {string} key  raw key
	         * @return  {string}      prefixed key
	         */
	        function prefixKey(key) {
	            return self.prefix + '.' + key;
	        }
	
	        /**
	         * Save data manually in local storage
	         * @author Andrés Ávila <andres.avila@corb.mx>
	         * @version 0.0.1
	         * @since   0.0.1
	         * @param   {string}   key     Data key
	         * @param   {object}   data    Data to be stored
	         * @param   {function} onSave  Optional function to handle the data before is stored
	         */
	        function saveData(key, data, onSave) {
	            var key_name = prefixKey(key);
	
	            data = onSave(data) || data;
	
	            if (Object.getOwnPropertyNames(data).length) {
	                _store2.default.set(key_name, data);
	            }
	        }
	
	        /**
	         * Load data from local storage
	         * @author Andrés Ávila <andres.avila@corb.mx>
	         * @version 0.0.1
	         * @since   0.0.1
	         * @param   {string}   key     Data key
	         * @param   {function} onLoad  Optional function to handle the data before is loaded
	         * @return  Data stored or onLoad results
	         */
	        function loadData(key, onLoad) {
	            var data = void 0;
	            var key_name = prefixKey(key);
	
	            data = _store2.default.get(key_name);
	
	            return onLoad(data) || data;
	        }
	
	        /**
	         * Remove data stored with the given key
	         * @author Andrés Ávila <andres.avila@corb.mx>
	         * @version 0.0.1
	         * @since   0.0.1
	         * @param   {string} key  Data key
	         */
	        function clearKey(key) {
	            _store2.default.remove(prefixKey(key));
	        }
	
	        /**
	         * Remove all stored data and keys
	         * @author Andrés Ávila <andres.avila@corb.mx>
	         * @version 0.0.1
	         * @since   0.0.1
	         */
	        function clearAll() {
	            _store2.default.clear();
	        }
	    };
	}

/***/ },
/* 3 */
/*!**************************!*\
  !*** ./~/store/store.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {"use strict"
	// Module export pattern from
	// https://github.com/umdjs/umd/blob/master/returnExports.js
	;(function (root, factory) {
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like environments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.store = factory();
	  }
	}(this, function () {
		
		// Store.js
		var store = {},
			win = (typeof window != 'undefined' ? window : global),
			doc = win.document,
			localStorageName = 'localStorage',
			scriptTag = 'script',
			storage
	
		store.disabled = false
		store.version = '1.3.20'
		store.set = function(key, value) {}
		store.get = function(key, defaultVal) {}
		store.has = function(key) { return store.get(key) !== undefined }
		store.remove = function(key) {}
		store.clear = function() {}
		store.transact = function(key, defaultVal, transactionFn) {
			if (transactionFn == null) {
				transactionFn = defaultVal
				defaultVal = null
			}
			if (defaultVal == null) {
				defaultVal = {}
			}
			var val = store.get(key, defaultVal)
			transactionFn(val)
			store.set(key, val)
		}
		store.getAll = function() {}
		store.forEach = function() {}
	
		store.serialize = function(value) {
			return JSON.stringify(value)
		}
		store.deserialize = function(value) {
			if (typeof value != 'string') { return undefined }
			try { return JSON.parse(value) }
			catch(e) { return value || undefined }
		}
	
		// Functions to encapsulate questionable FireFox 3.6.13 behavior
		// when about.config::dom.storage.enabled === false
		// See https://github.com/marcuswestin/store.js/issues#issue/13
		function isLocalStorageNameSupported() {
			try { return (localStorageName in win && win[localStorageName]) }
			catch(err) { return false }
		}
	
		if (isLocalStorageNameSupported()) {
			storage = win[localStorageName]
			store.set = function(key, val) {
				if (val === undefined) { return store.remove(key) }
				storage.setItem(key, store.serialize(val))
				return val
			}
			store.get = function(key, defaultVal) {
				var val = store.deserialize(storage.getItem(key))
				return (val === undefined ? defaultVal : val)
			}
			store.remove = function(key) { storage.removeItem(key) }
			store.clear = function() { storage.clear() }
			store.getAll = function() {
				var ret = {}
				store.forEach(function(key, val) {
					ret[key] = val
				})
				return ret
			}
			store.forEach = function(callback) {
				for (var i=0; i<storage.length; i++) {
					var key = storage.key(i)
					callback(key, store.get(key))
				}
			}
		} else if (doc && doc.documentElement.addBehavior) {
			var storageOwner,
				storageContainer
			// Since #userData storage applies only to specific paths, we need to
			// somehow link our data to a specific path.  We choose /favicon.ico
			// as a pretty safe option, since all browsers already make a request to
			// this URL anyway and being a 404 will not hurt us here.  We wrap an
			// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
			// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
			// since the iframe access rules appear to allow direct access and
			// manipulation of the document element, even for a 404 page.  This
			// document can be used instead of the current document (which would
			// have been limited to the current path) to perform #userData storage.
			try {
				storageContainer = new ActiveXObject('htmlfile')
				storageContainer.open()
				storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
				storageContainer.close()
				storageOwner = storageContainer.w.frames[0].document
				storage = storageOwner.createElement('div')
			} catch(e) {
				// somehow ActiveXObject instantiation failed (perhaps some special
				// security settings or otherwse), fall back to per-path storage
				storage = doc.createElement('div')
				storageOwner = doc.body
			}
			var withIEStorage = function(storeFunction) {
				return function() {
					var args = Array.prototype.slice.call(arguments, 0)
					args.unshift(storage)
					// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
					// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
					storageOwner.appendChild(storage)
					storage.addBehavior('#default#userData')
					storage.load(localStorageName)
					var result = storeFunction.apply(store, args)
					storageOwner.removeChild(storage)
					return result
				}
			}
	
			// In IE7, keys cannot start with a digit or contain certain chars.
			// See https://github.com/marcuswestin/store.js/issues/40
			// See https://github.com/marcuswestin/store.js/issues/83
			var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
			var ieKeyFix = function(key) {
				return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
			}
			store.set = withIEStorage(function(storage, key, val) {
				key = ieKeyFix(key)
				if (val === undefined) { return store.remove(key) }
				storage.setAttribute(key, store.serialize(val))
				storage.save(localStorageName)
				return val
			})
			store.get = withIEStorage(function(storage, key, defaultVal) {
				key = ieKeyFix(key)
				var val = store.deserialize(storage.getAttribute(key))
				return (val === undefined ? defaultVal : val)
			})
			store.remove = withIEStorage(function(storage, key) {
				key = ieKeyFix(key)
				storage.removeAttribute(key)
				storage.save(localStorageName)
			})
			store.clear = withIEStorage(function(storage) {
				var attributes = storage.XMLDocument.documentElement.attributes
				storage.load(localStorageName)
				for (var i=attributes.length-1; i>=0; i--) {
					storage.removeAttribute(attributes[i].name)
				}
				storage.save(localStorageName)
			})
			store.getAll = function(storage) {
				var ret = {}
				store.forEach(function(key, val) {
					ret[key] = val
				})
				return ret
			}
			store.forEach = withIEStorage(function(storage, callback) {
				var attributes = storage.XMLDocument.documentElement.attributes
				for (var i=0, attr; attr=attributes[i]; ++i) {
					callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
				}
			})
		}
	
		try {
			var testKey = '__storejs__'
			store.set(testKey, testKey)
			if (store.get(testKey) != testKey) { store.disabled = true }
			store.remove(testKey)
		} catch(e) {
			store.disabled = true
		}
		store.enabled = !store.disabled
		
		return store
	}));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/*!******************************************!*\
  !*** ./src/formPersistence.directive.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';
	
	formPersistence.$inject = ["$timeout", "formPersistence"];
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	angular.module('formPersistence').directive('formPersistence', formPersistence);
	
	var DEBOUND_DELAY = 400;
	
	/**
	 * formPersistence directive
	 * @author Andrés Ávila <andres.avila@corb.mx>
	 * @version 0.0.1
	 * @since   0.0.1
	 * @param   {object} $timeout               Timeout service
	 * @param   {object} formPersistence        formPersistence service
	 * @return  {object}                        Directive instance
	 */
	function formPersistence($timeout, formPersistence) {
	    'ngInject';
	
	    return {
	        restrict: 'A',
	        scope: {
	            key: '@formPersistence',
	            data: '=saveData',
	            onSave: '&?beforeSave',
	            onLoad: '&?beforeLoad'
	        },
	        link: function link(scope) {
	            var debound = void 0;
	
	            scope.data = formPersistence.load(scope.key, scope.onLoad);
	
	            scope.$watch(function () {
	                return scope.data;
	            }, handleModelChange, true);
	
	            /**
	             * Changes handler
	             * @author Andrés Ávila <andres.avila@corb.mx>
	             * @version 0.0.1
	             * @since   0.0.1
	             */
	            function handleModelChange() {
	                var data = void 0;
	                var key = void 0;
	
	                key = scope.key;
	
	                if (angular.isObject()) {
	                    // copy object
	                    data = _extends({}, scope.data);
	                }
	
	                if (debound) {
	                    $timeout.cancel(debound);
	                }
	
	                debound = $timeout(function () {
	                    formPersistence.save(key, data, scope.onSave);
	                }, DEBOUND_DELAY);
	            }
	        }
	    };
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-form-persistence.js.map