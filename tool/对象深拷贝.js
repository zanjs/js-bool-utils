//ǳ����ַ���json���ݸ�ʽ�Ļ�,������
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
	//����������õĿ�����:�������ݺͶ�����ͽ��ص���������
	//ע��Ҫ�㣺���obj1�����Ե�������������ôǳ�����ᵼ��obbj2��õ����ڴ��ַ,����Ҫ�õݹ�
	function fn1(obj){
		if(typeof obj === 'object'){ //�ж��ǲ�����������
			if(Object.prototype.toString.call(obj) === '[object Array]'){//�ж��ǲ�������
				var newArr = [];
				for(var i = 0, len = obj.length; i < len; i++){
					newArr.push(obj[i]);
				}
				return newArr;
			}else{//�ж��ǲ��Ƕ���
				var newObj = {};
				for(var i in obj){
					if(obj.hasOwnProperty(i)){
						newObj[i] = fn1(obj[i]);//�����ǵݹ�
					}
				}
				return newObj;
			}
		}else{
			return obj;
		}
	}
	//�򻯰汾
	function fn2(obj){
		let temp = obj.constructor === Array? [] : {};
		for(let val in obj){
			if(obj.hasOwnProperty(val)){
				temp[val] = typeof obj[val] === 'object'? fn2(obj[val]) : obj[val];
				//����typeof arr/object === 'object' typeof fn1 === 'function'
			}
		}
		return temp;
	}
	console.log(fn2(obj1));