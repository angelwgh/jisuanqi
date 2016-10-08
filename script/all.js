!function () {
	var result=document.getElementById('J_calculator_show').children[1];
	var Oresult=document.getElementById('J_calculator_show').children[0];
	var num=document.getElementById('J_calculator_number');
	var symbol=document.getElementById('J_calculate_symbol');
	var special=document.getElementById('J_calculate_special');
	var lis=num.parentNode.getElementsByTagName('li');
     
     for (var i = 0; i < lis.length; i++) {
     	lis[i].addEventListener('mousedown',MDColor(i));
     	lis[i].addEventListener('mouseup',MSColor(i));
     	lis[i].addEventListener('mouseout',MSColor(i))
     }
     /*鼠标按下颜色加深*/
     function MDColor (i) {
     	return function () {
     		lis[i].className='mouse-down-color';

     	}
     }
     /*鼠标弹起颜色恢复*/
     function MSColor (i) {
     	return function () {
     		lis[i].className='';
     	}
     }

	//创建一个数组，用来暂时存放输入的字符
	var temp=[];
	//初始化输出的结果为'0'

	/*result.innerHTML=0;*/
	outputResult(0);
	
	/*给数字区绑定鼠标点击事件*/
	for (var i = 0; i < num.children.length; i++) {
		num.children[i].addEventListener('click',numOutput(i))
	}
	/*数字区输入显示*/
	function numOutput (i) {
		
		return function  () {
			/*当输入的字符是'.'的时候
			  如果之前没有输入过，则把'.'加入数组
			*/
			if (num.children[i].innerHTML=='.') {
				if(temp.indexOf(".")==-1){
					temp.push(num.children[i].innerHTML);
				}
			/*当输入的字符是'±'时
              改变显示数字的符号
			*/
			}else if (num.children[i].innerHTML=='±') {
				if (temp.length!=1||temp[0]!=0) {
					console.log(temp!=[0])
					if (temp.indexOf("-") == -1) {
						temp.unshift('-');
					} else {
						temp.shift()
					}	
				}
				
			}
			else{
				/*输入正常的数字，加入临时数组*/
				temp.push(num.children[i].innerHTML)
			}
			/*把数组内的数字拼接后输出*/
			outputResult (parseFloat(temp.join('')))
			/*result.innerHTML=parseFloat(temp.join(''));*/
			console.log(temp);
			
		}	
	}
	
	var add=document.getElementById('m_calculator_add');
	var sub=document.getElementById('m_calculator_sub');
	var mul=document.getElementById('m_calculator_mul');
	var div=document.getElementById('m_calculator_div');
	var equ=document.getElementById('m_calculator_equ');

	/*用一个对象用来存储计算的数字和运算符号*/
	var num_count={
		num_a:0,//用于存放上一次输入的数字
		num_b:0,
		num_sign:"+",//用于存放上次输入的运算符号,默认为加好

		reset:function () {//重置对象数据
			this.num_a=0;
			this.num_sign="+";
		}
	}
	
	function count(sign){
		//用于存放刚刚输入的数字
		if (temp.length!=0) {
			num_count.num_b=parseFloat(temp.join(''));
		}
		
		switch (num_count.num_sign) {
			case '+':
				num_count.result=num_count.num_a+num_count.num_b;
				break;
			case '-':
				num_count.result=num_count.num_a-num_count.num_b;
				break;
			case '×':
				num_count.result=num_count.num_a*num_count.num_b;
				break;
			case '÷':
				num_count.result=num_count.num_a/num_count.num_b;
				break;
			case '=':
				num_count.result=num_count.num_b;
				break;
			default:
				break;
		}
		console.log(num_count);
		
		num_count.num_a=num_count.result;
		num_count.num_sign=sign;
		outputResult (num_count.result);
		
		temp=[];

	}


	add.addEventListener('click',fun_add);
	function fun_add () {
	    count('+');
	}
	sub.addEventListener('click',fun_sub);
	function fun_sub () {
		count('-');
	}
	mul.addEventListener('click',fun_mul);
	function fun_mul () {
		count('×');
	}
	div.addEventListener('click',fun_div);
	function fun_div () {
		count('÷');
	}
	equ.addEventListener('click',fun_equ);
	function fun_equ () {
		count('=');
	}

	var special=document.getElementById('J_calculate_special').getElementsByTagName('li');
	var c=special[0];
	var ce=special[1];
	var backspace=special[2];

	c.addEventListener('click',function () {
		temp=[];
		num_count.reset();
		outputResult (0);
	})
	ce.addEventListener('click',function () {
		temp=[];
		outputResult (0);
	})
	backspace.addEventListener('click',function () {
		temp.pop();
		console.log(temp)
		if (temp.length!==0) {
			outputResult (parseFloat(temp.join('')));
		} else {
			outputResult (0);
		}
		
	})

	function outputResult (r) {
		if(r){
			
		}
		console.log(r)
		result.innerHTML=r;
	}
	
}();