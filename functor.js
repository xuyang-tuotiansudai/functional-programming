/*
	Functor
	用一个容器(e.g. 数组，类)包装一个数据类型，形成一个结构体，这个结构体提供一个map方法，map接收一个函数（e.g. foo）当参数，用此参数(foo函数)处理容器内的数据，然后返回一个新的结构体。
*/

var num = 2;
[2].map(function(x) {
	return x + 3;
});

var Functor = function(num) {
	this.num = num;
	this.map = function(fn) {
		return new Functor(fn(num));
	}
};

new Functor(2).map(function(x) {
	return x + 5;
});

// Functors必须保存组合特性。
[1, 2, 3, 4].map(function(x) {
	return x + 1;
}).map(function(y) {
	return y + 2;
});

var _ = require('underscore');
[1, 2, 3, 4].map(_.compose(function(y) {
	return y + 2;
}, function(x) {
	return x + 1;
}));


/*
	Pointed Functor
	实现了of方法的Functor，of会将任何单值转化为一个Functor
*/
[].of(1) // [1]
Functor.of = function(x) {
	return new Functor(x);
}
