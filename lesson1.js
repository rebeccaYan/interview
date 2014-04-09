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
function formatDate( src, format ) {
	return;
}


/**
 * uniqStrArray
 * 字符串数组去重
 * 输入是一个由字符串组成的一维数组，去掉其中重复的
 *
 * @param array strArr
 * @return array
 */
function uniqStrArray( strArr ) {
	return;
}

/**
 * clone
 * 克隆任何对象，可能是任何类型，注意是需要值赋值，要完全复制出一个新的，而不是指针复制
 *
 * @param object src
 * @param object
 */
function clone( src ) {
	return;
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
function each( arr, fn ) {

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
	return;
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
function getElementsByAttribute() {
	return;
}

/**
 * addClass
 * 为DOM节点增加class样式，要求不重复增加
 * @param object target，需要增加class的DOM节点
 * @param string className, 需要增加的class样式，可以多个，用空格隔开
 */
function addClass( target, className ) {

}

/**
 * removeClass
 * 为DOM节点删除某个class样式
 * @param object target, 需要删除样式的DOM节点
 * @param string className, 需要删除的class样式，可以多个，用空格隔开
 */
 function removeClass( target, className ) {

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
function eventDelegate( parentNode, tagName, eventName, handle ) {

}

/**
 * fadeIn
 * 淡入渐变效果
 * 改变元素的透明度，将元素逐渐显示出来
 * @param object node 元素
 */
function fadeIn( node ) {

}

/**
 * fadeOut
 * 淡出渐变效果
 * 改变元素的透明度，将元素逐渐消失
 * @param object node 元素
 */
function fadeOut( node ) {

}
