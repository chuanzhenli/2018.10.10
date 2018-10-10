//{width : 400,height:400}
//完美运动框架
function sport_11(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		//设置开关
		var stop = true; //假设所有的属性都已到达目标
		//遍历对象
		for(var attr in json){
			//1.获取当前值
			var cur = attr === 'opacity' ? parseInt(parseFloat(getStyle(obj,attr)) * 100) : parseInt(getStyle(obj,attr));
			//2.计算速度
			var speed  = (json[attr] - cur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			//3.停止检测
			if(cur !== json[attr]){
				stop = false;
			}
			if(attr === 'opacity'){
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = 'alpha(opacity=' + (cur + speed) + ')';
			}else{
				obj.style[attr] = cur + speed + 'px';
			}
		}
		if(stop){
			clearInterval(obj.timer);
			if(typeof fn === 'function'){
				fn();
			}
			
		}
	},30)
}
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,true)[attr];
}