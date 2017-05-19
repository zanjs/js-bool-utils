var arr = [1,2,3,[4,5,6,[7,8]]];
	// 方法一
function fn1(arr){
		arr = arr.join(',').split(',');
		return arr.map(function(value){ 
			return Number(value);
		});
	}
	// 方法二
function fn2(arr){
	var result = arguments[1] || [];
		for(var i = 0, len = arr.length; i < len; i++){
		if(Object.prototype.toString.call(arr[i]) === '[object Array]'){
			arguments.callee(arr[i], result);
		}else{
			result.push(arr[i]);
		}
	}
	return result;
}	