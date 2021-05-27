// new Function 实现
var json = '{"name":"小姐姐", "age":20}';
var obj = (new Function('return ' + json))();