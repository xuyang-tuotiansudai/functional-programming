## javascript函数式编程

函数式编程（functional programming）是一种编程范式。常见的编程范式还有“命令式编程(Imperative programming)”。面向对象编程属于命令式编程。

## 简单描述函数式编程：
#### 1.函数是"第一等公民"
函数与其他数据类型一样，处于平等地位，可以赋值给其他变量，也可以作为参数，传入另一个函数，或者作为别的函数的返回值。
#### 2.只用"表达式"，不用"语句"
例如：用forEach，map代替for
```javascript
arr.forEach(function() {});
arr.map(function() {});
```

#### 3.“纯”函数
什么是“纯”函数呢？

>* 函数要保持独立，所有功能就是返回一个新的值，没有其他行为，尤其是不得修改外部变量的值。
* 函数的运行不依赖于外部变量或"状态"，只依赖于输入的参数，任何时候只要参数相同，引用函数所得到的返回值总是相同的。

```javascript
var arr = [1, 2, 3, 4, 5];

// 纯
arr.slice(0, 3); // [1, 2, 3]
arr // [1, 2, 3, 4, 5]
// 不纯
arr.splice(0, 3); // [1, 2, 3]
arr // [4, 5]

// 纯
var obj = {a: 1};
var getProp = function(obj, key) {
    return obj[key];
};
getProp(obj, a);
// 不纯
var obj = {a: 1};
var getProp = function(key) {
    return obj[key];
};
getProp(a);
```
#### 4.自下往上的思考
面向对象编程是需要自上往下的思考。新需求拿到后一般会先定义出需要的抽象类，接口等，然后在补充具体的实现。
而函数试编程则需要先考虑底层的函数，把低价函数拼凑成高阶函数，把高阶函数拼凑成模块，模块再拼凑成应用。
如果把面向对象编程比作盖房子的话，函数式编程就像是搭积木。

## 特性
面向对象编程有三大特性：封装，继承，多态。
javascript里的函数式编程当然也有特性：

#### 1.高阶函数(higher order function)

不用一听“高阶”两个字就感觉是很牛x的东西。其实在JS里，高阶函数无处不在。例如：
```javascript
domElement.addEventListener('click', function() {});
```
上面这段熟悉的代码，我们给一个dom对象添加了一个click事件监听，```addEventListener```这个函数的第二个参数接收的是一个函数作为参数所以它就是一个高阶函数。

再来个例子：
```javascript
var countFn = function() {
    var x = 0;
    return function() {
        return ++x;
    }
}();

countFn() // 1
countFn() // 2
countFn() // 3
```
这是一个闭包，countFn这个函数的返回值是一个函数，所以他也是一个高阶函数。

所以**高阶函数只是将函数作为参数或返回值的函数**。

#### 2.柯里化(curry)
>柯里化，是把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

看文字描述不太容易理解，直接上代码：
```javascript
var add = function(x, y) {
    return x + y;
};

var add1 = add.bind(null, 1);
add1(1) // 2
add1(2) // 3
add1(3) // 4

var add2 = add.bind(null, 2);
add2(1) // 3
add2(2) // 4
add2(3) // 5
```

[Function.prototype.bind详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
原生JS里Function.prototype上的bind方法为我们做函数柯里化提供了很大的便捷。
underscore中有封装好的 [\_.partial](http://underscorejs.org/#partial)

柯里化可以帮助我们更好的简化代码：
```javascript
var _ =  require('underscore');

// 非柯里化写法
var url = '/api/userInfo';
$.get(url, { name: "Tom"}, function(data){
    console.log(data)    
});
$.get(url, { name: "jerry"}, function(data){
    console.log(data)    
});

// 柯里化写法
var fetchUserInfo = _.partial($.get, '/api/userInfo');

fetchUserInfo({ name: "Tom"}, function(data){
    console.log(data)    
});
fetchUserInfo({ name: "jerry"}, function(data){
    console.log(data)    
});

```

#### 3. 组合(compose)
直接上代码：
```
var compose = function(fn1, fn2) {
  return function(x) {
    return fn1(fn2(x));
  };
};
```
OK! 明白了吧，这就是组合。（underscore中有封装好的：[\_.compose](http://underscorejs.org/#compose)）

用途：
```
// 需求：把一个字符串去掉首尾空格后转换为数字然后提交给服务器。
var $ = require('jquery');
var _ = require('underscore');

var str = '  123 ';

// 非compose写法
$.post('/api/post', parseInt($.trim(str)));

// compose写法
var postData = _.partial($.post, '/api/post');
_.compose(postData, parseInt, $.trim)(str);

```
