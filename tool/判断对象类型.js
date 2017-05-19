var is = {
	types : ['Number', 'String', 'Array', 'Undefined', 'Null', 'Window', 'HTMLDocument', 'Date', 'RegExp']
}
//用Object.prototype.toString()来判断对象类型是最准确的，即使跨框架也没事
//typeof只能区别原始类型和对象，除非它和constructor配合
for(var i = 0, type; type = is.types[i++]; ){
	is[type] = (function(type){
		return function(object){
			console.log(Object.prototype.toString.call(object) )
			return Object.prototype.toString.call(object) === '[object '+ type + ']';
		}
	})(type);
}
//判断数组方法:
function isArray(arr){
	if(typeof arr === 'object' && arr.constructor === Array){
		return true;
	}
	return false;
}