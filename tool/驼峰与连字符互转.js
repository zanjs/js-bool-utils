//驼峰式---->连字符式
	function fn1(str){
		return str.replace(/[A-Z]/g, function(result){
			console.log(result);//匹配一次执行一次
			return '-' + result.toLowerCase();
		});
	}

	function fn2(str){
		return str.replace(/([A-Z])/g, "-$1").toLowerCase();
		//使用到$1 正则必须有括号 $1必须在字符串里面
	}

	//连字符式----->驼峰式
	function fn3(str){
		return str.replace(/(\-[\w])/g, function(result){
			console.log(result);
			//注意下某些陌生字符要进行转义操作
			return result.slice(1).toUpperCase();
		});
	}