/**
 * format date
 * 实现一个函数，将日期对象按照期望的格式进行输出
 * 比如，今天是2014年1月12日 11点15分24秒，期望转换成格式为 2014-01-12，则格式为 yyyy-MM-dd
 * 如果期望格式是 14年1月12日，则格式为 yy年M月d日
 * 如果期望格式是 2014/01/12 11:15:24，则格式为 yyyy/MM/dd HH:mm:ss
 *
 * y -> 年，M->月，d->日，H->时，m->分，s->秒
 * 当格式中只有一个字母表示时，则值为多少即多少，如果多于1个字母，则按字母数量进行补零输出，如：
 * 2001年1月1日，格式为 y-M-d 输出 2011-1-1，若为 yy-MM-d 输出 01-01-1
 *
 * @param object src  需要format的日期对象
 * @param string format 格式化模型
 * @return string 返回格式化后的日期文字
 */
function formatDate(src, format) {
	if(src instanceof Date){

		var obj = {
			"M+": src.getMonth() + 1,	//月
			"d+": src.getDate(),		//日
			"H+": src.getHours(),		//时
			"m+": src.getMinutes(),		//分
			"s+": src.getSeconds()		//秒
		};

		if(/(y+)/.test(format)){		//匹配年
			format = format.replace(RegExp.$1, (src.getFullYear() + "").substr(4 - RegExp.$1.length)); 
		}


		for(var i in obj){
			if(new RegExp("(" + i + ")").test(format)){
				format = format.replace(RegExp.$1, RegExp.$1.length == 1? obj[i] : ("00"+obj[i]).substr(("" + obj[i]).length));
			}
		}
	}
		return format;
}

/**
 * uniqStrArray
 * 字符串数组去重
 * 输入是一个由字符串组成的一维数组，去掉其中重复的
 *
 * @param array strArr
 * @return array
 */
function uniqStrArray(strArr) {
    var newArr = [];
	var obj = {};
    var i,index;
	var len = strArr.length;	
	
    if (len < 2) {
        return strArr;
    }

    for (i = 0; i < len; i++) {
        index = strArr[i];

        if (obj[index] !== 1) {			            
            obj[index] = 1;
			newArr.push(index);
        }
    }

    return newArr;
}

/**
 * clone
 * 克隆任何对象，可能是任何类型，注意是需要值赋值，要完全复制出一个新的，而不是指针复制
 *
 * @param object src
 * @param object
 */
//一开始的方法
function clone_old(src){
	var dest;

	switch (typeof src) {
		case 'undefined': 			
			break;
		case 'number':			
			dest = src;
			break;
		case 'string':
			dest = src;	
			break;
		case 'boolean':
			dest = src;
			break;
		case 'function':									
			var that = this;
			dest = function() {
				return that.apply(src, arguments);	
	
			};
			for(var i in src) {
				dest[i] = src[i];	
			}
		case 'object':
			if(src === null) {
				dest = null;
			}else if(src instanceof Array) {				//使用this不成功，改为了src
				dest = [];
			
				for(var i=0; i<src.length; i++ ) {
					dest.push(clone_old(src[i]));
				}
			}else {											//使用this不成功，改为了src
				dest = {};
				
				for(var i in src) {
					dest[i] = clone_old(src[i]);
				}
			}
			break;
		default:
			break;		
	}

	return dest;
} 

//一个更简单的方法
function clone(src){
	var dest;
	
	if(typeof(src) == 'object') {
		var argc = arguments.callee;			//关键在使用arguments.callee

		if(src === null){
			dest = null;
		}else if (src instanceof Array) {
			dest = [];
			for(var i=0; i<src.length; i++) {
				dest.push(argc(src[i]));
			}			
		}else {
			dest = {};
			for(var i in src){
				dest[i] = argc(src[i]);
			}
			
		}

		return dest;
	}
	dest = src;

	return dest;
}

/**
 * each
 * 实现一个遍历数组的函数
 * 可以实现如下效果
 * var arr = [1,2,3];
 * for (var i = 0, len = arr.length; i < len; i++) {
 *     if (i != 2) {
 *         console.log(arr[i]);
 *     }
 * }
 * 可以改写为：
 * var arr = [1,2,3];
 * each( arr, function (i, data) {
 *     // i is index of array, i can be named depends on your need like j, k, l...
 *	   // data is arr[i], data can be named depends on your need like d, arrElement, item...
 *     if (i != 2) {
 *         console.log(data);	
 *     }
 * });
 *
 * @param arr 需要遍历的数组
 * @param Function fn 对每一个数组子元素处理函数
 */

function each(arr, fn) {
	for (var i in arr) {
		fn(i, arr[i]);
	}
}

/**
 * isParent
 * 判断一个节点是否是另外一个节点的父节点，或者更父层的节点
 *
 * @param object parent，需要判断是否为父节点的节点
 * @param object node，需要判断是否为子节点的节点
 * @return boolean，
 */
function isParent(parent, node) {
	while(node !== undefined && node !== null && node.tagName.toUpperCase() !== 'BODY'){
		if(node == parent){
			return true;		
		}
		node = node.parentNode;
	}
    return false;
}

/**
 * getElementsByAttribute
 * 通过属性获取一个DOM数组
 * 一共可以传三种参数
 * 1. 父节点[可选]，为DOM对象，查找该节点的子节点树里符合条件的节点。如果不传该参数，则默认在整个文档流中寻找
 * 2. 属性名称，为字符串，如果某节点有该属性，则将该节点加入到返回的数组中
 * 3. 属性值[可选]，为字符串，只返回属性等于该值的节点
 * getElementsByAttribute( node, "class", "span-4" ); 查找node节点的子节点树种，class为span-4的节点
 * getElementsByAttribute( "data-listen" ); 查找整个文档中有属性 data-listen 的节点
 * getElementsByAttribute( "data-listen", "on" ); 查找整个文档中，属性data-listen值为on的节点
 *
 */
function getElementsByAttribute(attName, attValue) {
	var len = arguments.length;
	var results = [];

	if(len < 1)					//无参数传入 则返回null
		return null;

	if(arguments[0] instanceof Object && (arguments[0].nodeType === 1)){			//第一个参数是node的情况
		var nodes = arguments[0].getElementsByTagName("*");
		var attN = arguments[1],
			attV = arguments[2];
	}else if(typeof(arguments[0]) == 'string'){					//第一个参数是属性名attName的情况
		var nodes = document.getElementsByTagName("*");
		var attN = arguments[0],
			attV = arguments[1];
	}else {		
		return null;
	}

	if((typeof(attN) == 'string') && (typeof(attV) == 'string')){			//参数attName，参数attValue均存在的情况
		for(var i=0; i<nodes.length; i++){
			if(nodes[i].getAttributeNode(attN) && (nodes[i].getAttributeNode(attN).nodeValue == attV)){			
				results.push(nodes[i]);
			}
		}
		return results;
	}else if((typeof(attN) == 'string')){				//参数attName存在，attValue不存在的情况
		for(var i=0; i<nodes.length; i++){
				if(nodes[i].getAttributeNode(attN) ){
					results.push(nodes[i]);
				}
			}
		return results;
	}else {								//其他情况视为错误 返回null
		return null;
	}
}


/**
 * addClass
 * 为DOM节点增加class样式，要求不重复增加
 * @param object target，需要增加class的DOM节点
 * @param string className, 需要增加的class样式，可以多个，用空格隔开
 */
function addClass(target, className) {
	var oldClass = target.className.replace(/(\s+)/gi, ' '),//对于字符串开头和结尾存在空格的情况，由于不太影响结果，这里没有进行过滤
		blank = (oldClass != '')? ' ':'',
		newClass = oldClass + blank + className.replace(/(\s+)/gi, ' ');

	var oldarr = newClass.split(" ");
	var a = {},
		newarr = [],
		index;

	for(var i=0; i<oldarr.length; i++){
		index = oldarr[i];
		if(oldarr[index] !== 1){
			oldarr[index] = 1;
			newarr.push(index);
		}
	}

	target.className = newarr.join(" ");
}

/**
 * removeClass
 * 为DOM节点删除某个class样式
 * @param object target, 需要删除样式的DOM节点
 * @param string className, 需要删除的class样式，可以多个，用空格隔开
 */
function removeClass(target, className) {
	var oldClass = target.className.replace(/(\s+)/gi, ' ');	//没有对字符串开头和结尾存在的空格进行过滤
		className = className.replace(/(\s+)/gi, ' ');
	var oldarr = oldClass.split(" ");
	var delarr = className.split(" ");

	var	newarr = [], 
		a = {},
		index;

	if(oldClass == '' || className == '' || oldClass == ' ' ||className == ' ') 
		return 0;
		
	for(var i=0; i< delarr.length; i++){
		index = delarr[i];
		a[index] = 1;
	}

	for(var i=0; i<oldarr.length; i++){
		index = oldarr[i];

		if(a[index] !== 1){
			newarr.push(index);
		}
	}
	
	target.className = newarr.join(' ');
}

/**
 * DOM事件代理器
 * 为某个DOM下的某些节点增加事件代理
 * 如：
 * eventDelegate(node, "li", "click", clickHandle); 为node节点下所有的li节点增加click事件响应，响应函数为clickHandle
 *
 * @param object parentNode
 * @param string tagName
 * @param string eventName
 * @param Function handle
 */
function eventDelegate(parentNode, tagName, eventName, handle) {
	if(!parentNode) {
		return false;
	}

	if (parentNode.addEventListener){						//Firefox等现代浏览器
		parentNode.addEventListener(eventName, function(e){
			e = e || window.event;
			var target = e.srcElement? e.srcElement : e.target;

			if (target && target.nodeName == tagName.toUpperCase()) {
				handle.apply(target, arguments);
			}
		},false);
	}else if (parentNode.attachEvent) {						//IE
		parentNode.attachEvent('on'+eventName, function(){
			e = e || window.event;
			var target = e.srcElement? e.srcElement : e.target;
			
			if (target && target.nodeName == tagName) {
				handle.apply(target, arguments);
			}
		});	
	}else {										//其他情况
		parent["on" + eventName] = function(){
			e = e || window.event;
			var target = e.srcElement? e.srcElement : e.target;
			
			if (target && target.nodeName == tagName) {
				handle.apply(target, arguments);
			}
		};
	}
}

/**
 * fadeIn
 * 淡入渐变效果
 * 改变元素的透明度，将元素逐渐显示出来
 * @param object node 元素
 */
function fadeIn(node) {
	var finValue = 100;			
	var chaValue = 0;			

	node.style.display = 'block';

	setOpacity(node, 0);		//初始化透明度

	(function(){
		setOpacity(node, chaValue);		//设置透明度
		chaValue += 5;

		if (chaValue <= finValue) {
			setTimeout(arguments.callee, 20);	
		}
	})();
	
	
	function setOpacity(node, value){
		if(node.filters){
			node.style.filter = 'alpha(opacity=' + chaValue +')' 	
		}else {
			 node.style.opacity = chaValue / 100;
		}
	}
}
	
/**
 * fadeOut
 * 淡出渐变效果
 * 改变元素的透明度，将元素逐渐消失
 * @param object node 元素
 */
function fadeOut(node) {
	var finValue = 0;
	var chaValue = node.opacity? node.opacity : 100;

	(function(){
		setOpacity(node, chaValue);			//设置透明度
		chaValue -= 5;

		if (chaValue >= finValue){
			setTimeout(arguments.callee, 20);
		}else if(finValue < 0){
			node.style.display = 'none';
		}		
	})();

	function setOpacity(node, value){
		if(node.filters){
			node.style.filter = 'alpha(opacity=' + chaValue +')' 	
		}else {
			 node.style.opacity = chaValue / 100;
		}
	}
}

//测试 formatDate
function testFormatDate(){
	var date = new Date();

	var newFormat = formatDate(date, "yyyy-MM-dd"); 
	var newFormat2 = formatDate(date, "yyyy年M月d日");
	var newFormat3 = formatDate(date, "yyyy:MM:dd HH:mm:ss");
	var newFormat4 = formatDate("here","yyyy-MM-dd");

	console.log('时间: ' + date);
	console.log('yyyy-MM-dd: ' + newFormat);
	console.log('yyyy年M月d日: ' + newFormat2);
	console.log('yyyy:MM:dd HH:mm:ss: ' + newFormat3);
	console.log('无效对象: ' + newFormat4);
}

//测试 UniqStrArray(strArr)
function testUniqStrArray(){
	var arr_old = ['test','1','34','asdf','test','a','asdf','asdfs']; 

	var arr_new = uniqStrArray(arr_old); 

	console.log('原数组: ');
	console.log(arr_old);
	console.log('去重后：');	
	console.log(arr_new);  
} 

//测试 Clone(src)
function testClone(select){
	var srcObj = {
		a: null,
		c: 1,
		d: '11',
		e: true,
		f: ['node',1,null,'test'],
		g: {
			ga: null,
			gc: 1,
			gd: '11',
			gf: ['node',1,null,'test'],
		},
		h: function(){console.log(d);},
		i: 'null'
	}
	
	var destObj = clone(srcObj);
	//var destObj = clone_old(srcObj);

	if(select == 1){
		console.log('原对象：');
		console.log(srcObj);
	}else if (select == 2){
		srcObj.g = {ganew:'new',gcnew:11};
		console.log('原对象更改后：');
		console.log(srcObj);
	}

	console.log('克隆对象：');
	console.log(destObj);


}

//测试 each(arr, fn)
function testEach(){
	var arr = ['abc', 
				function(){console.log('hi.');},
				1,
				{a:1,b:'bb',f:function(){console.log(a);}},
				['abc',23,null]
			  ];
	console.log('数组：');
	console.log(arr);
	console.log('遍历结果：');

	each(arr,function(i,data){
		if(i != 2)
			console.log(i + ' : ' + data);
	});
}

//测试 isParent(parent, node)
function testIsParent(parentId, childId){
	var parentNode = document.getElementById(parentId);
	var childNode = document.getElementById(childId);

	var value = isParent(parentNode, childNode);

	if(value == true){
		document.getElementById('isParentResult').innerHTML = parentId + '是' + childId + ' 的祖辈！';
	}else{
		document.getElementById('isParentResult').innerHTML = parentId + '不是' + childId + ' 的祖辈！';
	}
}

//测试 GetElementsByAttribute()
function testGetElementsByAttribute(){
	var select = arguments[0];
	var node, attName, attValue;

	console.log('a[0]:'+arguments[0]);
	console.log('a[1]:'+arguments[1]);
	console.log('a[2]:'+arguments[2]);
	console.log('a[3]:'+arguments[3]);

	if(select == 1){
		node = document.getElementById(arguments[1]);
		attName = arguments[2];
		attValue = arguments[3];

		var results = getElementsByAttribute(node, attName, attValue);
	}else if (select == 2){
		node = document.getElementById(arguments[1]);
		attName = arguments[2];

		var results = getElementsByAttribute(node, attName);
	}else if (select == 3){
		attName = arguments[1];
		attValue = arguments[2];

		var results = getElementsByAttribute(attName, attValue);
	}else if (select == 4){
		attName = arguments[1];

		var results = getElementsByAttribute(attName);
	}	
	
	console.log(results);
}

//测试 addClass(node, string) 和 removeClass(node, string)
function testClass(nodeId,select,className){
	var node = document.getElementById(nodeId);

	if(select === 1){
		addClass(node, className);			//添加样式
	}else if(select === 2){
		removeClass(node, className);		//删除样式
	}else {
		return 0;
	}
}

//测试 eventDelegate
function testEventDelegate(){
	var parentNode = document.getElementById('parent-delegate'), 
		tagName = 'li', 
		eventName = 'click';
	
	document.getElementById('delegateResult').innerHTML = '(请任意点击child)';

	//执行代理
	eventDelegate(parentNode, tagName, eventName, function(){
		this.innerHTML += ' has changed';
	});
}


//测试 fadeIn(node), fadeOut(node)
function testFadeInOut(nodeId,select){
	var node = document.getElementById(nodeId);

	if(select === 1){
		fadeIn(node);			//淡入
	}else if(select === 2){	
		fadeOut(node);			//淡出
	}
}
