	//简单的时期格式化
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
	// 稍微复杂版本
	Date.prototype.format = function(fmt) { 
     var o = { //相当于存储正则表达式的对象
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) { //返回true/false
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));//这里根据你输入"yyy--..."的长度进行截取 
    }//RegExp.$1 ：最邻近的正则表达式去匹配获得的子字符串，需要有"()"。
     for(var k in o) { 
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
             //除了年和毫秒，其他都返回要么是一位或两位数，一位的要补0。这里的思路：为了补零，直接添加两个0，然后一个数截取一个0，两位数截取两个0，那么都统一了
         }
     }
    return fmt; 
}       