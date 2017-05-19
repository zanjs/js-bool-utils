var arr = [1,2,3,4,5,2,3];
	function fn1(arr){
		var flag = [];
		var json = {};
		for(var i = 0, len = arr.length; i < len; i++){
			if(!json[arr[i]]){
				flag.push(arr[i]);
				json[arr[i]] = 1;
			}
		}
		return flag;
	}
	console.log(fn1(arr));