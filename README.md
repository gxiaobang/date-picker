# 日历组件

## 语法
`new DatePicker(el, options)`
## 参数
options      |type          |default    |descript
-------------|--------------|-----------|-----------
fmt          |String        |yyyy-MM-dd |输出日期格式
defaultDate  |Date          |new Date() |默认日期
picked       |Function      |null       |日期选取事件 


## 示例
```javascript
new DatePicker('#datePicker', { fmt: 'yyyy-MM-dd' })
```

## 通过事件监听，触发回调
```javascript
new DatePicker('#datePicker', { fmt: 'yyyy-MM-dd' })
  .on('picked', () => {
    // 内部逻辑
    console.log('picked事件触发');
  })
```