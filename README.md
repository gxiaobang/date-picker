# datePicker
日历组件

## 参数配置
new DatePicker(el, options);
+ el 元素
+ options.fmt 日期格式
+ options.defaultDate 默认日期，now为当前日期

在html引入文件`datePicker.js`和`datePicker.css`
### html部分
```html
<input type="text" id="datePicker">
```

### js部分：传入input的id并设置日期格式
```javascript
new DatePicker('#datePicker', { fmt: 'yyyy-MM-dd' })
```

### 事件监听，在选择日期生效后，触发`picked`事件
```javascript
new DatePicker('#datePicker', { fmt: 'yyyy-MM-dd' })
	.on('picked', () => {
		// 内部逻辑
		console.log('picked事件触发');
	})
```