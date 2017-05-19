var oDiv = document.getElementById('div1');
	function getParents(obj){
		var parents = [];
		while(obj.parentNode && obj.parentNode.tagName != 'HTML'){
			parents.push(obj.parentNode);
			obj = obj.parentNode;
		}
		return parents;
	}
	console.log(getParents(oDiv));
	//依次是 div#div1 div body html document