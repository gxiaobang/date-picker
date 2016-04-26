/**
 * 测试日历
 */

import { DatePicker } from './datePicker';

new DatePicker('#datePicker', { fmt: 'yyyy-MM-dd', defaultDate: 'now' })
	.on('picked', function() {

	});