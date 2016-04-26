/**
 * 日历
 */

import { getPoint, BaseMethod, forEach, isTarget,
					getDOM, parseDOM, dateFormat,
					addEvent, removeEvent, templ } from './util.js';

const defaults = {
	templ: {
		picker: `
			<div class="datepicker">
				<div class="datepicker-heading">
					<a href="javascript:;" class="datepicker-prev">&lt;</a>
					<span class="datepicker-screen"></span>
					<a href="javascript:;" class="datepicker-next">&gt;</a>
				</div>
				<div class="datepicker-body"></div>
			</div>
		`,
		year: `
			<table class="datepicker-year">
				<tbody>{0}</tbody>
			</table>
		`,
		month: `
			<table class="datepicker-month">
				<tbody>
					<tr>
						<td>一月</td>
						<td>二月</td>
						<td>三月</td>
						<td>四月</td>
					</tr>
					<tr>
						<td>五月</td>
						<td>六月</td>
						<td>七月</td>
						<td>八月</td>
					</tr>
					<tr>
						<td>九月</td>
						<td>十月</td>
						<td>十一月</td>
						<td>十二月</td>
					</tr>
				</tbody>
			</table>
		`,
		day: `
			<table class="datepicker-day">
				<thead>
					<tr>{0}</tr>
				</thead>
				<tbody>
					{1}
				</tbody>
			</table>
		`
	},
	lang: 'zh-cn',
	getWeek() {
		return this.lang == 'zh-cn' ? 
			['日', '一', '二', '三', '四', '五', '六'] :
			['Sun', 'Mon', 'Tur'];
	}
};


// 计算一个月的总天数
function getMonthDays( year, month ) {

	month = Number(month) + 1;

	if (month < 1) {
		month = 12;
		year = year - 1;
	} 
	else if (month > 12) {
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
			days = (year % 4 == 0 && (year % 400 == 0 || year % 100 != 0)) ? 29 : 28;
			break;
		// 小月
		default:
			days = 30;
	}

	return days;
}

// 获取日期对象
function getDateObj(time) {
	var date = new Date;
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
	return date;
}

class DatePicker extends BaseMethod {
	// defaultDate = 'now'当前日期
	constructor(el, { fmt = 'yyyy-MM-dd', defaultDate = '' }) {
		super();
		this.el = getDOM(el)[0];
		this.fmt = fmt;
		this.defaultDate = defaultDate;
		this.initFn('picked');
		this.setup();
	}

	// 设置安装
	setup() {
		if (this.el) {
			this.selectDate = getDateObj(this.defaultDate);
			// this.tempDate = this.selectDate;
			this.type = 'day';
			this.outputDate();
			this.events();
		}
	}

	// 输出日期
	outputDate() {
		this.el.value = dateFormat(this.fmt, this.selectDate);
	}

	// 屏幕显示
	setScreen() {
		this.screen.innerHTML = dateFormat('yyyy年MM月', this.selectDate);
	}

	// 创建picker
	create() {
		this.picker = parseDOM(defaults.templ.picker).children[0];
		this.prev = getDOM('.datepicker-prev', this.picker)[0];
		this.next = getDOM('.datepicker-next', this.picker)[0];
		this.screen = getDOM('.datepicker-screen', this.picker)[0];
		this.body = getDOM('.datepicker-body', this.picker)[0];
		document.body.appendChild(this.picker);
	}

	// 渲染
	render() {

		if (!this.picker) {
			this.create();
			this.renderDate();
			this.setScreen();
			this.position();
			this.initPickerEvent();
		}
		else {
			this.picker.style.display = 'block';
		}

		/*this.renderDate();
		this.position();*/
	}


	renderDate() {
		// this.body.innerHTML = this[ this.type ]();
		var html;
		switch (this.type) {
			case 'year':
				break;
			case 'month':
				break;
			case 'day':
				html = this.dayDom( this.tempDate.getFullYear(), this.tempDate.getMonth() );
				break;
		}

		this.body.innerHTML = html;
	}

	// 月数据
	monthDom() {
		return defaults.templ.month;
	}

	// 日数据
	dayDom(year, month) {

		var html = '',
				r = 6,
				c = 7,
				curDays = getMonthDays( year, month ),
				prevDays = getMonthDays( year, month - 1),
				now;

		this.tempDate.setYear(year);
		this.tempDate.setMonth(month);
		// 设置成每月第一天
		this.tempDate.setDate(1);


		var start = this.tempDate.getDay();

		if (start == 0) start = 7;

		for (var i = 1; i <= r; i++) {
			html += '<tr>';
			for (var j = 1; j <= c; j++) {
				

				now = r * (i - 1) + j + i - 1 - start;

				if (now < 1) {
					html += `<td class="datepicker-day-other" data-date-num="${now}">`;
					now += prevDays;
				}
				else if (now > curDays) {
					html += `<td class="datepicker-day-other" data-date-num="${now}">`;
					now -= curDays;
				}
				else {
					html += `<td data-date-num="${now}">`;
				}

				html += now;

				html += '</td>';
			}
			html += '</tr>';
		}

		return templ(defaults.templ.day,
				defaults.getWeek().map((day) => `<td>${day}</td>`).join(''),
				html
			);
	}

	// 年数据
	yearDom() {
		return 
	}

	// 定位
	position() {
		var point = getPoint(this.picker);
		this.picker.style.left = point.x + 'px';
		this.picker.style.top = point.y/* + this.el.offsetHeight */+ 'px';
	}

	// 初始化事件	
	events() {
		var handler = (event) => {
			this.tempDate = new Date;
			this.tempDate.setTime( this.selectDate.getTime() );
			// console.log(this.tempDate)
			this.render();
			addEvent(document, 'click', hideHandler);
		};

		var hideHandler = (event) => {
			if (!isTarget(event, this.el) && !isTarget(event, this.picker)) {
				this.hide();
				// this.destroy();
			}
		};

		this._offHide = () => {
			removeEvent(document, 'click', hideHandler);
		};
		this._off = () => {
			this._offHide();
			removeEvent(this.el, 'focus', handler);
		};
		addEvent(this.el, 'focus', handler);
	}

	initPickerEvent() {

		var that = this;
		addEvent(this.body, 'click', '.datepicker-day tbody td', function() {
			// console.log(this.getAttribute('data-date-num'));

			that.setSelect('day', this.getAttribute('data-date-num'));
		});
		// addEvent(this.body, 'click', )
	}

	// 设置选择
	setSelect(type, num) {
		switch (type) {
			case 'day':
				this.selectDate = new Date;
				this.selectDate.setTime( this.tempDate.getTime() );
				this.selectDate.setDate(num);
				this.outputDate();
				break;
		}

		this.hide();
	}

	// 销毁
	destroy() {
		this._off && this._off();
		this.remove();
	}

	hide() {
		this._offHide() && this._offHide();
		// this.picker.style.display = 'none';
		this.remove();
	}

	remove() {
		if (this.picker) {
			this.picker.parentNode.removeChild(this.picker);
			this.picker = null;
		}
	}
}

export { DatePicker };