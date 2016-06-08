/**
 * 日历
 */

import { getPoint, BaseMethod, forEach,
					contains,
					$s, parseDOM, dateFormat,
					addEvent, removeEvent, templ } from './util.js';

const defaults = {
	templ: {
		picker: `
			<div class="datepicker">
				<div class="datepicker-heading">
					<span class="prev">&lt;</span>
					<span class="next">&gt;</span>
					<div class="datepicker-screen"></div>
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
				<tbody>{0}</tbody>
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

class DatePicker extends BaseMethod {
	// defaultDate = 'now'当前日期
	constructor(el, { fmt = 'yyyy-MM-dd', defaultDate = '' }) {
		super();
		this.el = $s(el)[0];
		this.fmt = fmt;
		this.defaultDate = defaultDate;
		this.initFn('picked');
		this.setup();
	}

	// 设置安装
	setup() {
		if (this.el) {
			if (this.defaultDate) {
				if (this.defaultDate == 'now') {
					this.selectDate = new Date;
				}
				this.outputDate();
			}
			
			// this.tempDate = this.selectDate;
			this.events();
		}
	}

	// 输出日期
	outputDate() {
		this.el.value = dateFormat(this.fmt, this.selectDate);
	}

	// 屏幕显示
	setScreen() {
		var ret;
		switch (this.type) {
			case 'year':
				let per = Math.floor(this.tempDate.getFullYear() / 10);
				ret = (per * 10 - 1) + '-' + (per * 10 + 10);
				break;
			case 'month':
				ret = dateFormat('yyyy年', this.tempDate);
				break;
			case 'day':
				ret = dateFormat('yyyy年MM月', this.tempDate);
				break;
		}
		this.screen.innerHTML = ret;
	}

	// 创建picker
	create() {
		this.picker = parseDOM(defaults.templ.picker).children[0];
		this.prev = $s('.prev', this.picker)[0];
		this.next = $s('.next', this.picker)[0];
		this.screen = $s('.datepicker-screen', this.picker)[0];
		this.body = $s('.datepicker-body', this.picker)[0];
		document.body.appendChild(this.picker);
	}

	// 渲染
	render() {

		if (!this.picker) {
			this.type = 'day';
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
				html = this.yearDom();
				break;
			case 'month':
				html = this.monthDom();
				break;
			case 'day':
				html = this.dayDom( this.tempDate.getFullYear(), this.tempDate.getMonth() );
				break;
		}

		this.body.innerHTML = html;
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
					html += `<td class="other" data-date-num="${now}">`;
					now += prevDays;
				}
				else if (now > curDays) {
					html += `<td class="other" data-date-num="${now}">`;
					now -= curDays;
				}
				else {
					if (selectNum == now) {
						html += `<td class="selected" data-date-num="${now}">`;
					}
					else {
						html += `<td data-date-num="${now}">`;
					}
				}

				html += now;

				html += '</td>';
			}
			html += '</tr>';
		}

		return templ(defaults.templ.day,
				defaults.getWeek().map((day) => `<th>${day}</th>`).join(''),
				html
			);
	}

	// 月数据
	monthDom() {
		var months = ['一月', '二月', '三月', '四月', 
									'五月', '六月', '七月', '八月',
									'九月', '十月', 
									'<small>十一月</small>', 
									'<small>十二月</small>'];

		var html = '';
		var selectNum = -1;

		if (this.selectDate.getFullYear() == this.tempDate.getFullYear()) {
			selectNum = this.tempDate.getMonth();
		}

		for (let i = 0; i < months.length; i++) {
			let m = i % 4;

			if (m == 0) html += '<tr>';
			if (selectNum == i) {
				html += `<td class="selected" data-date-num="${i}">${months[i]}</td>`;
			}
			else {
				html += `<td data-date-num="${i}">${months[i]}</td>`;
			}
			if (m == 3) html += '</tr>';
		}

		return templ(defaults.templ.month, html);
	}

	// 年数据
	yearDom() {

		var year = this.tempDate.getFullYear(),
				per = Math.floor(year / 10);

		var html = '';

		for (let i = 0; i < 12; i++) {
			let m = i % 4;
			let now = per*10 + i - 1;
			if (m == 0) html += '<tr>';
			html += `<td data-date-num="${now}">${now}</td>`;
			/*if (now == year) {
				html += `<td class="selected" data-date-num="${i}">${now}</td>`;
			}
			else {
				html += `<td data-date-num="${i}">${now}</td>`;
			}*/
			if (m == 3) html += '</tr>';
		}


		return templ(defaults.templ.year, html);
	}

	// 定位
	position() {
		var point = getPoint(this.el);
		this.picker.style.left = point.x - 1 + 'px';
		this.picker.style.top = point.y + this.el.offsetHeight + 2 + 'px';
	}

	// 初始化事件	
	events() {
		var handler = (event) => {
			let date = getDateObj(this.el.value);
			if (date.valueOf()) {
				this.selectDate = date;
			}
			this.tempDate = new Date;
			this.tempDate.setTime( this.selectDate.getTime() );
			// console.log(this.tempDate)
			this.render();
			addEvent(document, 'click', hideHandler);
		};

		var hideHandler = (event) => {
			var target = event.target;
			if (DatePicker.within(this.picker, event.target) && !DatePicker.within(this.el, event.target)) {
				this.destroy();
			}
		};

		this._offHide = () => {
			removeEvent(document, 'click', hideHandler);
		};
		this._off = () => {
			this._offHide();
			// removeEvent(this.el, 'focus', handler);
		};
		addEvent(this.el, 'focus', handler);
	}

	initPickerEvent() {

		var that = this;
		addEvent(this.body, 'click', '.datepicker-day td', function() {
			// console.log(this.getAttribute('data-date-num'));
			var num = this.getAttribute('data-date-num');
			that.setSelect('day', num);
		});

		addEvent(this.body, 'click', '.datepicker-month td', function() {
			var num = this.getAttribute('data-date-num');
			that.setSelect('month', num);
		});

		addEvent(this.body, 'click', '.datepicker-year td', function() {
			var num = this.getAttribute('data-date-num');
			that.setSelect('year', num);
		});

		addEvent(this.prev, 'click', function() {
			that.changeDate(-1);
		});
		addEvent(this.next, 'click', function() {
			that.changeDate(1);
		});
		addEvent(this.screen, 'click', function() {
			// that.type = 'month';

			switch (that.type) {
				/*case 'year':
					that.type = 'month';
					break;*/
				case 'month':
					that.type = 'year';
					break;
				case 'day':
					that.type = 'month';
					break;
			}
			that.changeDate(0);
		});
		// addEvent(this.body, 'click', )
	}

	// 设置选择
	setSelect(type, num) {
		switch (type) {
			case 'year':
				this.type = 'month';
				this.tempDate.setFullYear(num);
				this.changeDate(0);
				break;
			case 'month':
				this.type = 'day';
				this.tempDate.setMonth(num);
				// this.renderDate();
				this.changeDate(0);
				break;
			case 'day':
				this.selectDate = new Date;
				this.selectDate.setTime( this.tempDate.getTime() );
				this.selectDate.setDate(num);
				this.outputDate();
				this.hide();
				break;
		}
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

	// 改变日期
	changeDate(num) {
		switch (this.type) {
			case 'year':
				this.tempDate.setFullYear( this.tempDate.getFullYear() + num * 10 );
				break;
			case 'month':
				this.tempDate.setFullYear( this.tempDate.getFullYear() + num );
				break;
			case 'day':
				this.tempDate.setMonth( this.tempDate.getMonth() + num );
				break;
		}

		this.setScreen();
		this.renderDate();
	}

	static within(e1, e2) {
		return e1 === e2 || contains(e1, e2) || contains(document, e2);
	}
}

export { DatePicker };