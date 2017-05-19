//浅层次又符合json数据格式的话,可以用
var obj2 = JSON.parse(JSON.stringify(obj1));

var obj1 = {
		a : 1,
		b : 2,
		c : {
			d : 1,
			f : 2
		},
		g : function h(){}
	}
	//深拷贝（无引用的拷贝）:碰到数据和对象就送进回调函数里面
	//注意要点：如果obj1的属性等于数组或对象，那么浅拷贝会导致obbj2获得的是内存地址,所以要用递归
	function fn1(obj){
		if(typeof obj === 'object'){ //判断是不是引用类型
			if(Object.prototype.toString.call(obj) === '[object Array]'){//判断是不是数组
				var newArr = [];
				for(var i = 0, len = obj.length; i < len; i++){
					newArr.push(obj[i]);
				}
				return newArr;
			}else{//判断是不是对象
				var newObj = {};
				for(var i in obj){
					if(obj.hasOwnProperty(i)){
						newObj[i] = fn1(obj[i]);//这里是递归
					}
				}
				return newObj;
			}
		}else{
			return obj;
		}
	}
	//简化版本
	function fn2(obj){
		let temp = obj.constructor === Array? [] : {};
		for(let val in obj){
			if(obj.hasOwnProperty(val)){
				temp[val] = typeof obj[val] === 'object'? fn2(obj[val]) : obj[val];
				//利用typeof arr/object === 'object' typeof fn1 === 'function'
			}
		}
		return temp;
	}
	console.log(fn2(obj1));