/******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DatePicker = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 日历
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var defaults = {
		templ: {
			picker: '\n\t\t\t<div class="datepicker">\n\t\t\t\t<div class="datepicker-heading">\n\t\t\t\t\t<span class="prev">&lt;</span>\n\t\t\t\t\t<span class="next">&gt;</span>\n\t\t\t\t\t<div class="datepicker-screen"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="datepicker-body"></div>\n\t\t\t</div>\n\t\t',
			year: '\n\t\t\t<table class="datepicker-year">\n\t\t\t\t<tbody>{0}</tbody>\n\t\t\t</table>\n\t\t',
			month: '\n\t\t\t<table class="datepicker-month">\n\t\t\t\t<tbody>{0}</tbody>\n\t\t\t</table>\n\t\t',
			day: '\n\t\t\t<table class="datepicker-day">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>{0}</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t{1}\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t'
		},
		lang: 'zh-cn',
		getWeek: function getWeek() {
			return this.lang == 'zh-cn' ? ['日', '一', '二', '三', '四', '五', '六'] : ['Sun', 'Mon', 'Tur'];
		}
	};
	
	// 计算一个月的总天数
	function getMonthDays(year, month) {
	
		month = Number(month) + 1;
	
		if (month < 1) {
			month = 12;
			year = year - 1;
		} else if (month > 12) {
			month = 1;
			year = Number(year) + 1;
		}
	
		var days;
		switch (month) {
			// 大月
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				days = 31;
				break;
			// 闰月、平月
			case 2:
				days = year % 4 == 0 && (year % 400 == 0 || year % 100 != 0) ? 29 : 28;
				break;
			// 小月
			default:
				days = 30;
		}
	
		return days;
	}
	
	// 获取日期对象
	function getDateObj(str) {
		// var date = new Date;
		/*var arr = time.split(' '),
	 		arr2;
	 for (let i = 0; i < arr.length; i++) {
	 	arr2 = arr[ i ].split('-');
	 
	 	for (let j = 0; j < arr2.length; j++) {
	 		switch (arr2[j]) {
	 			case 0:
	 				date.setYear(arr2[j]);
	 				break;
	 			case 1:
	 				date.setMonth(arr2[j] + 1);
	 				break;
	 			case 2:
	 				date.setDate(arr2[j]);
	 				break;
	 		}
	 	}
	 
	 	arr2 = arr[ i ].split(':');
	 
	 	for (let j = 0; j < arr2.length; j++) {
	 		switch (arr2[j]) {
	 			case 0:
	 				date.setHours(arr2[j]);
	 				break;
	 			case 1:
	 				date.setMinutes(arr2[j] + 1);
	 				break;
	 			case 2:
	 				date.setSeconds(arr2[j]);
	 				break;
	 		}
	 	}
	 }*/
	
		return new Date(str);
	}
	
	var DatePicker = function (_BaseMethod) {
		_inherits(DatePicker, _BaseMethod);
	
		// defaultDate = 'now'当前日期
	
		function DatePicker(el, _ref) {
			var _ref$fmt = _ref.fmt;
			var fmt = _ref$fmt === undefined ? 'yyyy-MM-dd' : _ref$fmt;
			var _ref$defaultDate = _ref.defaultDate;
			var defaultDate = _ref$defaultDate === undefined ? '' : _ref$defaultDate;
	
			_classCallCheck(this, DatePicker);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).call(this));
	
			_this.el = (0, _util.getDOM)(el)[0];
			_this.fmt = fmt;
			_this.defaultDate = defaultDate;
			_this.initFn('picked');
			_this.setup();
			return _this;
		}
	
		// 设置安装
	
	
		_createClass(DatePicker, [{
			key: 'setup',
			value: function setup() {
				if (this.el) {
					if (this.defaultDate) {
						if (this.defaultDate == 'now') {
							this.selectDate = new Date();
						}
						this.outputDate();
					}
	
					// this.tempDate = this.selectDate;
					this.events();
				}
			}
	
			// 输出日期
	
		}, {
			key: 'outputDate',
			value: function outputDate() {
				this.el.value = (0, _util.dateFormat)(this.fmt, this.selectDate);
			}
	
			// 屏幕显示
	
		}, {
			key: 'setScreen',
			value: function setScreen() {
				var fmt;
				switch (this.type) {
					case 'year':
						break;
					case 'month':
						fmt = 'yyyy年';
						break;
					case 'day':
						fmt = 'yyyy年MM月';
						break;
				}
				this.screen.innerHTML = (0, _util.dateFormat)(fmt, this.tempDate);
			}
	
			// 创建picker
	
		}, {
			key: 'create',
			value: function create() {
				this.picker = (0, _util.parseDOM)(defaults.templ.picker).children[0];
				this.prev = (0, _util.getDOM)('.prev', this.picker)[0];
				this.next = (0, _util.getDOM)('.next', this.picker)[0];
				this.screen = (0, _util.getDOM)('.datepicker-screen', this.picker)[0];
				this.body = (0, _util.getDOM)('.datepicker-body', this.picker)[0];
				document.body.appendChild(this.picker);
			}
	
			// 渲染
	
		}, {
			key: 'render',
			value: function render() {
	
				if (!this.picker) {
					this.type = 'day';
					this.create();
					this.renderDate();
					this.setScreen();
					this.position();
					this.initPickerEvent();
				} else {
					this.picker.style.display = 'block';
				}
	
				/*this.renderDate();
	   this.position();*/
			}
		}, {
			key: 'renderDate',
			value: function renderDate() {
				// this.body.innerHTML = this[ this.type ]();
				var html;
				switch (this.type) {
					case 'year':
						break;
					case 'month':
						html = this.monthDom();
						break;
					case 'day':
						html = this.dayDom(this.tempDate.getFullYear(), this.tempDate.getMonth());
						break;
				}
	
				this.body.innerHTML = html;
			}
	
			// 日数据
	
		}, {
			key: 'dayDom',
			value: function dayDom(year, month) {
	
				var html = '',
				    r = 6,
				    c = 7,
				    curDays = getMonthDays(year, month),
				    prevDays = getMonthDays(year, month - 1),
				    now;
	
				this.tempDate.setYear(year);
				this.tempDate.setMonth(month);
				// 设置成每月第一天
				this.tempDate.setDate(1);
	
				var start = this.tempDate.getDay();
	
				if (start == 0) start = 7;
	
				// 选中天数
				var selectNum = -1;
	
				if (this.selectDate.getFullYear() == year && this.selectDate.getMonth() == month) {
					selectNum = this.selectDate.getDate();
				}
	
				for (var i = 1; i <= r; i++) {
					html += '<tr>';
					for (var j = 1; j <= c; j++) {
	
						now = r * (i - 1) + j + i - 1 - start;
	
						if (now < 1) {
							html += '<td class="other" data-date-num="' + now + '">';
							now += prevDays;
						} else if (now > curDays) {
							html += '<td class="other" data-date-num="' + now + '">';
							now -= curDays;
						} else {
							if (selectNum == now) {
								html += '<td class="selected" data-date-num="' + now + '">';
							} else {
								html += '<td data-date-num="' + now + '">';
							}
						}
	
						html += now;
	
						html += '</td>';
					}
					html += '</tr>';
				}
	
				return (0, _util.templ)(defaults.templ.day, defaults.getWeek().map(function (day) {
					return '<td>' + day + '</td>';
				}).join(''), html);
			}
	
			// 月数据
	
		}, {
			key: 'monthDom',
			value: function monthDom() {
				var months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '<small>十一月</small>', '<small>十二月</small>'];
	
				var html = '';
				var selectNum = -1;
	
				if (this.selectDate.getFullYear() == this.tempDate.getFullYear()) {
					selectNum = this.tempDate.getMonth();
				}
	
				for (var i = 0; i < months.length; i++) {
					var m = i % 4;
	
					if (m == 0) html += '<tr>';
					if (selectNum == i) {
						html += '<td class="selected" data-date-num="' + i + '">' + months[i] + '</td>';
					} else {
						html += '<td data-date-num="' + i + '">' + months[i] + '</td>';
					}
					if (m == 3) html += '</tr>';
				}
	
				return (0, _util.templ)(defaults.templ.month, html);
			}
	
			// 年数据
	
		}, {
			key: 'yearDom',
			value: function yearDom() {
				return (0, _util.templ)(defaults.templ.year, defaults.getWeek().map(function (day) {
					return '<td>' + day + '</td>';
				}).join(''), html);
			}
	
			// 定位
	
		}, {
			key: 'position',
			value: function position() {
				var point = (0, _util.getPoint)(this.el);
				this.picker.style.left = point.x - 1 + 'px';
				this.picker.style.top = point.y + this.el.offsetHeight + 2 + 'px';
			}
	
			// 初始化事件	
	
		}, {
			key: 'events',
			value: function events() {
				var _this2 = this;
	
				var handler = function handler(event) {
					var date = getDateObj(_this2.el.value);
					if (date.valueOf()) {
						_this2.selectDate = date;
					}
					_this2.tempDate = new Date();
					_this2.tempDate.setTime(_this2.selectDate.getTime());
					// console.log(this.tempDate)
					_this2.render();
					(0, _util.addEvent)(document, 'click', hideHandler);
				};
	
				var hideHandler = function hideHandler(event) {
					if (document.contains(event.target) && !(0, _util.isTarget)(event, _this2.el) && !(0, _util.isTarget)(event, _this2.picker)) {
						_this2.hide();
						// this.destroy();
					}
				};
	
				this._offHide = function () {
					(0, _util.removeEvent)(document, 'click', hideHandler);
				};
				this._off = function () {
					_this2._offHide();
					(0, _util.removeEvent)(_this2.el, 'focus', handler);
				};
				(0, _util.addEvent)(this.el, 'focus', handler);
			}
		}, {
			key: 'initPickerEvent',
			value: function initPickerEvent() {
	
				var that = this;
				(0, _util.addEvent)(this.body, 'click', '.datepicker-day tbody td', function () {
					// console.log(this.getAttribute('data-date-num'));
					var num = this.getAttribute('data-date-num');
					that.setSelect('day', num);
				});
	
				(0, _util.addEvent)(this.body, 'click', '.datepicker-month tbody td', function () {
					// console.log(this.getAttribute('data-date-num'));
					var num = this.getAttribute('data-date-num');
					that.setSelect('month', num);
				});
	
				(0, _util.addEvent)(this.prev, 'click', function () {
					that.changeDate(-1);
				});
				(0, _util.addEvent)(this.next, 'click', function () {
					that.changeDate(1);
				});
				(0, _util.addEvent)(this.screen, 'click', function () {
					that.type = 'month';
					that.changeDate(0);
				});
				// addEvent(this.body, 'click', )
			}
	
			// 设置选择
	
		}, {
			key: 'setSelect',
			value: function setSelect(type, num) {
				switch (type) {
					case 'month':
						this.type = 'day';
						this.tempDate.setMonth(num);
						// this.renderDate();
						this.changeDate(0);
						break;
					case 'day':
						this.selectDate = new Date();
						this.selectDate.setTime(this.tempDate.getTime());
						this.selectDate.setDate(num);
						this.outputDate();
						this.hide();
						break;
				}
			}
	
			// 销毁
	
		}, {
			key: 'destroy',
			value: function destroy() {
				this._off && this._off();
				this.remove();
			}
		}, {
			key: 'hide',
			value: function hide() {
				this._offHide() && this._offHide();
				// this.picker.style.display = 'none';
				this.remove();
			}
		}, {
			key: 'remove',
			value: function remove() {
				if (this.picker) {
					this.picker.parentNode.removeChild(this.picker);
					this.picker = null;
				}
			}
	
			// 改变日期
	
		}, {
			key: 'changeDate',
			value: function changeDate(num) {
				switch (this.type) {
					case 'year':
						break;
					case 'month':
						this.tempDate.setFullYear(this.tempDate.getFullYear() + num);
						break;
					case 'day':
						this.tempDate.setMonth(this.tempDate.getMonth() + num);
						break;
				}
	
				this.setScreen();
				this.renderDate();
			}
		}]);
	
		return DatePicker;
	}(_util.BaseMethod);
	
	exports.DatePicker = DatePicker;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * util.js
	 * 工具类
	 * by bang
	 */
	
	// 无操作
	function noop() {}
	
	// 基于class
	
	var BaseMethod = function () {
		function BaseMethod() {
			_classCallCheck(this, BaseMethod);
	
			this.fn = {};
		}
	
		// 初始化监听事件
	
	
		_createClass(BaseMethod, [{
			key: 'initFn',
			value: function initFn() {
				var _this = this;
	
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				forEach(args, function (name) {
					_this.fn[name] = [];
				});
			}
	
			// 安装事件
	
		}, {
			key: 'on',
			value: function on(type, fn) {
				if (isArray(this.fn[type])) {
					this.fn[type].push(fn);
				}
				return this;
			}
			// 卸载事件
	
		}, {
			key: 'un',
			value: function un(type, fn) {
				if (isArray(this.fn[type])) {
					if (fn) {
						for (var i = 0, f; f = this.fn[type][i]; i++) {
							if (f === fn) {
								this.fn[type].splice(i, 1);
								i--;
							}
						}
					} else {
						this.fn[type].length = 0;
					}
				}
				return this;
			}
	
			// 修改设置属性
	
		}, {
			key: 'set',
			value: function set(prop, value) {
				this[prop] = value;
			}
			// 修改添加属性
	
		}, {
			key: 'add',
			value: function add(prop, value) {
				if (isArray(this[prop])) {
					this[prop].push(value);
				}
			}
	
			// 触发事件
	
		}, {
			key: 'trigger',
			value: function trigger(fn, obj) {
				for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
					args[_key2 - 2] = arguments[_key2];
				}
	
				var result;
				if (isFunction(fn)) {
					result = fn.call.apply(fn, [obj].concat(args));
				} else if (isArray(fn)) {
					fn.forEach(function (f) {
						result = f.call.apply(f, [obj].concat(args));
						return result;
					});
				}
	
				return result !== false;
			}
		}]);
	
		return BaseMethod;
	}();
	
	// 类型判断
	
	
	var obt = Object.prototype.toString;
	function isType(type) {
		return function (obj) {
			return obt.call(obj) === '[object ' + type + ']';
		};
	}
	
	var isObject = isType('Object'),
	    isArray = isType('Array'),
	    isNumber = isType('Number'),
	    isString = isType('String'),
	    isFunction = isType('Function');
	
	// 驼峰命名
	function named(name) {
		return name.replace(/[-]\w/g, function (a) {
			return a.charAt(1).toUpperCase();
		});
	}
	
	// 获取dom节点
	function getDOM(expr) {
		var root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	
		if (isString(expr)) {
			return root.querySelectorAll(expr);
		} else if (expr) {
			return isNumber(expr.length) ? expr : [expr];
		} else {
			return [];
		}
	}
	
	// 获取索引
	function getIndex(source) {
		var arr = arguments.length <= 1 || arguments[1] === undefined ? source.parentNode.children : arguments[1];
	
		return [].indexOf.call(arr, source);
	}
	
	// 获取range
	function getRange() {
		var range = document.createRange();
		range.selectNodeContents(document.body);
	
		getRange = function getRange() {
			return range;
		};
		return getRange();
	}
	
	// 解析html
	function parseDOM(html) {
		var range = getRange();
	
		if (range.createContextualFragment) {
			return range.createContextualFragment(html);
		} else {
			var fragment = document.createDocumentFragment();
			var div = document.createElement('div');
			div.innerHTML = html;
			while (div.firstChild) {
				fragment.appendChild(div.firstChild);
			}
			return fragment;
		}
	}
	
	// 设置样式
	function getStyle(el, name) {
		// 标准
		if (window.getComputedStyle) {
			return window.getComputedStyle(el, '')[name] || null;
		}
		// IE8-
		else {
				// 透明度
				if (name == 'opacity') {
					return (el.filters.alpha || el.filters['DXImageTransform.Microsoft.Alpha'] || 100) / 100;
				} else {
					return el.currentStyle[name] || null;
				}
			}
	}
	
	// 获取样式
	function setStyle(el, name, value) {
	
		if (isString(el)) {
			el = getDOM(el)[0];
		} else if (isArray(el)) {
			forEach(el, function (elem) {
				return setStyle(elem, name, value);
			});
		}
	
		var props = {};
		if (arguments.length == 3 && typeof name == 'string') {
			props[name] = value;
		} else {
			props = name;
		}
	
		for (var _name in props) {
			if (_name == 'opacity') {
				el.style.opacity = props[_name];
				el.style.filter = 'alpha(filter=' + props[_name] / 100 + ')';
			} else if (isNaN(props[_name])) {
				el.style[_name] = props[_name];
			} else {
				el.style[_name] = props[_name] + 'px';
			}
		}
	}
	
	// 兼容事件
	function fixEvent(event) {
		event = event || window.event;
	
		if (!event.target) {
			event.target = event.srcElement;
		}
	
		if (!event.stopPropagation) {
			event.stopPropagation = function () {
				event.cancelBubble = true;
			};
		}
	
		if (!event.preventDefault) {
			event.preventDefault = function () {
				event.returnValue = false;
			};
		}
	
		return event;
	}
	
	// 是否为事件目标，或在目标内部
	function isTarget(event, el) {
		var target = event.target;
	
		while (target !== document.documentElement) {
			if (target === el) {
				return true;
			}
			target = target.parentNode;
		}
		return false;
	}
	
	// 事件绑定
	function addEvent(el, type, expr, fn) {
		// el.addEventListener(type, fn, false);
	
		if (isString(el)) {
			el = getDOM(el);
		}
	
		if (el.length) {
			forEach(el, function (elem) {
				addEvent(elem, type, expr, fn);
			});
		} else {
			if (isFunction(expr)) {
				fn = expr;
	
				/*let handler = (event) => fn.call(el, fixEvent(event));
	   handler.fn = fn;*/
				if (suports.is('addEventListener')) {
					el.addEventListener(type, fn, false);
				} else {
					el.attachEvent('on' + type, fn);
				}
			} else {
				delegate(el, type, expr, fn);
			}
		}
	}
	
	// 事件解绑
	function removeEvent(el, type, fn) {
		if (suports.is('removeEventListener')) {
			el.removeEventListener(type, fn);
		} else {
			el.detachEvent('on' + type, fn);
		}
	}
	
	// 事件委托
	function delegate(el, type, expr, fn) {
		addEvent(el, type, function (event) {
			event = fixEvent(event);
			var target = event.target;
	
			if (suports.is('matches')) {
				while (target !== el) {
					if (target.matches(expr)) {
						fn && fn.call(target, event);
						break;
					}
					target = target.parentNode;
				}
			} else {
				var els = getDOM(expr);
				els = Array.from(els);
				while (target !== el) {
					if (els.indexOf(el) > -1) {
						fn && fn.call(target, event);
						break;
					}
					target = target.parentNode;
				}
			}
		});
	}
	
	// 动画帧
	var requestAnim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
		return setTimeout(fn, 1000 / 60);
	};
	
	// 遍历类数组
	function forEach(array, func) {
		if (isFunction(func)) {
			for (var i = 0, len = array.length; i < len; i++) {
				if (func(array[i], i) === false) break;
			}
		}
	}
	
	// 混合 类似于extend
	function mixin(target) {
		for (var _len3 = arguments.length, sources = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			sources[_key3 - 1] = arguments[_key3];
		}
	
		forEach(sources, function (source) {
			for (var key in source) {
				target[key] = source[key];
			}
		});
		return target;
	}
	
	// 模板
	function templ(str) {
		for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			args[_key4 - 1] = arguments[_key4];
		}
	
		str = str.replace(/\{(\d+)\}/gm, function (m, n) {
			return args[n] || '';
		});
		return str;
	}
	
	// 日期输出格式
	function dateFormat(fmt, date) {
		date = date || new Date();
		function _pad(num) {
			if (num < 10) {
				num = '0' + num;
			}
			return num;
		}
	
		return String(fmt).replace(/yyyy|MM|dd|HH|mm|ss|D/g, function (m) {
			switch (m) {
				case 'yyyy':
					return date.getFullYear();
				case 'MM':
					return _pad(date.getMonth() + 1);
				case 'dd':
					return _pad(date.getDate());
				case 'HH':
					return _pad(date.getHours());
				case 'mm':
					return _pad(date.getMinutes());
				case 'ss':
					return _pad(date.getSeconds());
				case 'D':
					var locDays = ['日', '一', '二', '三', '四', '五', '六'];
					return _pad(locDays[date.getDay()]);
			}
		});
	}
	
	// 获取相对页面所在位置
	function getPoint(el) {
		var x = 0,
		    y = 0;
	
		while (el) {
			x += el.offsetLeft;
			y += el.offsetTop;
	
			el = el.offsetParent;
		}
	
		return {
			x: x, y: y
		};
	}
	
	// http请求
	
	var Http = function (_BaseMethod) {
		_inherits(Http, _BaseMethod);
	
		function Http(_ref) {
			var _ref$method = _ref.method;
			var method = _ref$method === undefined ? 'GET' : _ref$method;
			var _ref$url = _ref.url;
			var url = _ref$url === undefined ? '' : _ref$url;
			var _ref$param = _ref.param;
			var param = _ref$param === undefined ? null : _ref$param;
	
			_classCallCheck(this, Http);
	
			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Http).call(this));
	
			_this2.initFn('beforeSend', 'success', 'error', 'complete');
			_this2.method = method;
			_this2.url = url;
			_this2.param = param;
			_this2.setup();
			return _this2;
		}
	
		_createClass(Http, [{
			key: 'setup',
			value: function setup() {
				this.create();
				this.events();
				this.send(this.param);
			}
		}, {
			key: 'create',
			value: function create() {
				this.xhr = new XMLHttpRequest();
			}
		}, {
			key: 'send',
			value: function send(param) {
				this.beforeSend();
				switch (this.method.toUpperCase()) {
					case 'GET':
						this.xhr.open('GET', this.url, true);
						this.xhr.send();
						break;
					case 'POST':
						this.xhr.open('POST', this.url, true);
						this.xhr.send(this.param);
						break;
				}
			}
		}, {
			key: 'events',
			value: function events() {
				var _this3 = this;
	
				this.xhr.onreadystatechange = function () {
					// console.log(this.xhr.readyState);
					if (_this3.xhr.readyState == 4) {
						switch (_this3.xhr.status) {
							case 200:
							// 有缓存
							case 302:
								_this3.success();
								break;
							case 404:
							case 500:
								_this3.error();
								break;
						}
						_this3.complete();
					}
				};
			}
	
			// 请求发送前
	
		}, {
			key: 'beforeSend',
			value: function beforeSend() {
				this.trigger(this.fn.beforeSend, this.xhr);
			}
			// 成功
	
		}, {
			key: 'success',
			value: function success() {
				this.trigger(this.fn.success, this.xhr, this.xhr.responseText);
			}
			// 错误
	
		}, {
			key: 'error',
			value: function error() {
				this.trigger(this.fn.error, this.xhr, this.xhr.statusText);
			}
			// 完成
	
		}, {
			key: 'complete',
			value: function complete() {
				this.trigger(this.fn.complete, this.xhr);
			}
		}], [{
			key: 'get',
			value: function get(url, param) {
				return new Http({ method: 'GET', url: url, param: param });
			}
		}, {
			key: 'post',
			value: function post() {
				return new Http({ method: 'POST', url: url, param: param });
			}
		}]);
	
		return Http;
	}(BaseMethod);
	
	// 检测浏览器支持
	
	
	var suports = {
		_cache: {},
		is: function is(prop) {
			return true;
		},
	
		// 获取支持属性
		get: function get(prop) {
			if (this._cache[prop]) return this._cache[prop];
			return prop;
		}
	};
	
	exports.isObject = isObject;
	exports.isNumber = isNumber;
	exports.isArray = isArray;
	exports.isString = isString;
	exports.isFunction = isFunction;
	exports.forEach = forEach;
	exports.getIndex = getIndex;
	exports.getDOM = getDOM;
	exports.parseDOM = parseDOM;
	exports.getStyle = getStyle;
	exports.setStyle = setStyle;
	exports.isTarget = isTarget;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.BaseMethod = BaseMethod;
	exports.templ = templ;
	exports.dateFormat = dateFormat;
	exports.getPoint = getPoint;
	exports.mixin = mixin;
	exports.Http = Http;
	exports.requestAnim = requestAnim;
	exports.suports = suports;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _datePicker = __webpack_require__(1);
	
	new _datePicker.DatePicker('#datePicker', { fmt: 'yyyy-MM-dd', defaultDate: 'now' }).on('picked', function () {}); /**
	                                                                                                                    * 测试日历
	                                                                                                                    */

/***/ }
/******/ ]);
//# sourceMappingURL=test.bundle.js.map