//�շ�ʽ---->���ַ�ʽ
	function fn1(str){
		return str.replace(/[A-Z]/g, function(result){
			console.log(result);//ƥ��һ��ִ��һ��
			return '-' + result.toLowerCase();
		});
	}

	function fn2(str){
		return str.replace(/([A-Z])/g, "-$1").toLowerCase();
		//ʹ�õ�$1 ������������� $1�������ַ�������
	}

	//���ַ�ʽ----->�շ�ʽ
	function fn3(str){
		return str.replace(/(\-[\w])/g, function(result){
			console.log(result);
			//ע����ĳЩİ���ַ�Ҫ����ת�����
			return result.slice(1).toUpperCase();
		});
	}