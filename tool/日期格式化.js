	//�򵥵�ʱ�ڸ�ʽ��
	Date.prototype.format = function(fmt){
		var obj = {
			'y+': this.getFullYear(),
			'M+': this.getMonth() + 1,
			'd+': this.getDay(),
			'h+': this.getHours(),
			'm+': this.getMinutes(),
			's+': this.getSeconds() 
		}
		for(var k in obj){
			if(obj.hasOwnProperty(k)){
				if(new RegExp("(" + k + ")").test(fmt)){
					fmt = fmt.replace(RegExp.$1, obj[k]);
				}
			}
		}
		return fmt;
	}
	var d = new Date();
	console.log(d.format('yyyy-MM-ddd:h-m-s'));
	// ��΢���Ӱ汾
	Date.prototype.format = function(fmt) { 
     var o = { //�൱�ڴ洢������ʽ�Ķ���
        "M+" : this.getMonth()+1,                 //�·� 
        "d+" : this.getDate(),                    //�� 
        "h+" : this.getHours(),                   //Сʱ 
        "m+" : this.getMinutes(),                 //�� 
        "s+" : this.getSeconds(),                 //�� 
        "q+" : Math.floor((this.getMonth()+3)/3), //���� 
        "S"  : this.getMilliseconds()             //���� 
    }; 
    if(/(y+)/.test(fmt)) { //����true/false
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));//�������������"yyy--..."�ĳ��Ƚ��н�ȡ 
    }//RegExp.$1 �����ڽ���������ʽȥƥ���õ����ַ�������Ҫ��"()"��
     for(var k in o) { 
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
             //������ͺ��룬����������Ҫô��һλ����λ����һλ��Ҫ��0�������˼·��Ϊ�˲��㣬ֱ���������0��Ȼ��һ������ȡһ��0����λ����ȡ����0����ô��ͳһ��
         }
     }
    return fmt; 
}       