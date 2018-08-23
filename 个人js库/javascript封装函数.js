var Lic = {
    getId: function (id) { // 封装兼容getElementById
        var el = document.getElementById(id);
        if (!+"v1") {
            if (el && el.attributes["id"].value === id) {
                return el;
            } else {
                var els = document.all[id],
                    n = els.length;
                for (var i = 0; i < n; i++) {
                    if (els[i].attributes["id"].value === id) {
                        return els[i];
                    }
                }
            }
        }
        return el;
    },
    getClassName: function (opts) { // 封装兼容 getElementsByClassName
        var searchClass = opts.searchClass; // 存储要查找的类名
        var node = opts.node || document; // 存储要查找的范围
        var tag = opts.tag || '*'; // 存储一定范围内要查找的标签
        var result = [];
        // 判断浏览器支不支持getElementsByClassName方法
        if (document.getElementsByClassName) { // 如果浏览器支持
            var nodes = node.getElementsByClassName(searchClass);
            if (tag !== "*") {
                for (var i = 0; node = nodes[i++];) {
                    if (node.tagName === tag.toUpperCase()) {
                        result.push(node);
                    }
                }
            } else {
                result = nodes;
            }
            return result;
        } else { // 使IE8以下浏览器能够支持该属性
            var els = node.getElementsByTagName(tag);
            var elsLen = els.length;
            var i, j;
            var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
            for (i = 0, j = 0; i < elsLen; i++) {
                if (pattern.test(els[i].className)) { // 检测正则表达式
                    result[j] = els[i];
                    j++;
                }
            }
            return result;
        }
    },
    addHandler: function (element, type, handler) { // 事件绑定兼容
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attchEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    removeHandler: function (element, type, handler) { // 事件删除兼容
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    getClass: function (ele) { // 获取class
        return ele.className.replace(/\s+/, " ").split(" ");
    },
    hasClass: function (ele, cls) { // 判断是否有class
        return -1 < (" " + ele.className + " ").indexOf(" " + cls + " ");
    },
    addClass: function (ele, cls) { // 添加calss
        if (!this.hasClass(ele, cls)) {
            ele.className += " "
            cls;
        }
    },
    removeClass: function (ele, cls) { // 删除class
        if (this.hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', "gi");
            ele.className = ele.className.replace(reg, " ");
        }
    },
    toggleClass: function (ele, cls) { // 切换class
        if (this.hasClass(ele, cls)) {
            this.removeClass(ele, cls);
        } else {
            this.addClass(ele, cls);
        }
    },

    makeArray: function (nodeList) { // 兼容IE的将类数组转换成数组
        var arr = null;
        try {
            return Array.prototype.slice.call(nodeList);
        } catch (error) {
            arr = new Array();
            for (var i = 0, len = nodeList.length; i < len; i++) {
                arr.push(nodeList[i]);
            }
            return arr;
        }
    },

    getInnerText: function (element) { // 兼容所有浏览器的获取innerText
        return typeof (element.textContent == "string") ? element.textContent : element.getInnerText;
    },
    setInnerText: function (element, text) { // 兼容所有浏览器的设置innerText
        if (typeof element.textContent == "string") {
            element.textContent = text;
        } else {
            element.innerText = text;
        }
    },

    trim: function (str) { // 去除前后空格
        return str.replace(/^\s+/, "").replace(/\s+$/, "");
    },
    trimLeft: function (str) { // 去除左侧空格
        return str.replace(/^\s+/, "");
    },
    trimRight: function (str) { // 去除右侧空格
        return str.replace(/\s+$/, "");
    },

    toCamelCase: function (str) { // 转驼峰 background-color 转换 backgroundColor
        var pattern = /-([a-z]){1}/ig;
        return str.replace(pattern, function ($all, letter) {
            return letter.toUpperCase();
        });
    }
}