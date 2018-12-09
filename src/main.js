import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import hljs  from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import "./plugins/element.js";


Vue.config.productionTip = false;

Vue.directive('highlight', function(el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
        hljs.highlightBlock(block)
    })
});


//保留x位小数
Vue.prototype.$reserveDecimal = function(num, dig){ 
    dig = dig || 2; //默认保留两位小数
    return parseFloat(num).toFixed(dig);
}

//通过字典表转换
Vue.prototype.$transValue = function(val, options, defaultVal){
    if(val==null && defaultVal){
        val=defaultVal; //如果为null设置默认值
    }
    var result = options.filter((o)=>{return o.value==val});
    return result.length? result[0].label: "";
}
//数组对象深度复制
Vue.prototype.$deepCopy = function(ele){
    if(typeof ele=="object" && Array.isArray(ele)){
        return $.extend(true, [], ele); //深拷贝
    }else if(typeof ele=="object" && !Array.isArray(ele)){
        return $.extend(true, {}, ele); //深拷贝
    }else{
        return ele;
    }
}

//设置时间格式(1900-01-01 00:00:00)
Vue.prototype.$setDate = function(date){
    var Y = date.getFullYear() + '-';
    var M = ( date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1 ) + '-';
    var D = ( date.getDate()<10 ? '0'+date.getDate(): date.getDate() ) + ' ';
    var h = ( date.getHours()<10 ? '0'+date.getHours() : date.getHours() ) + ':';
    var m = ( date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes() ) + ':';
    //var s = '00';
    var s = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;
}

//获取当前时间
Vue.prototype.$getCurrentDate = function(){
    var date = new Date();
    return this.$setDate(date);
}

//时间戳转日期
Vue.prototype.$timestampToDate = function(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    return this.$setDate(date);
}

//日期转时间戳
Vue.prototype.$dateToTimestamp = function(value) {
    if(typeof value=="string" && value.indexOf("-")!=-1){
        value = value.replace(/-/g, "/")
        if(value.indexOf(".")!=-1) value = value.split(".")[0];
    }
    var date = new Date(value);
    return date.valueOf();
}

//小时转时间戳
Vue.prototype.$hourToTimestamp = function(hour){
    return hour*60*60*1000;
}

//获取本月第一天
Vue.prototype.$getCurrentMonthFirstDay = function(){
    var current = new Date();
    current.setDate(1);
    current.setHours(0);
    current.setMinutes(0);
    current.setSeconds(0);
    return this.$setDate(current);
}

//获取本月最后一天
Vue.prototype.$getCurrentMonthLastDay = function(){
    var current = new Date();
    var currentMonth = current.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthDayOne = new Date(current.getFullYear(),nextMonth,1);
    var minusDate = 1000*60*60*24;
    return this.$setDate( new Date(nextMonthDayOne.getTime()-minusDate) );
}

//日期字符串转换
Vue.prototype.$transDate = function(str){
    if(str && (typeof str=="string") && str.indexOf("1900")==-1){
        return str.slice(0, 16); //截取16位
    }else{
        return "";
    }
}

//日期字符串转换(不含时分)
Vue.prototype.$transDate2 = function(str){
    if(str && (typeof str=="string") && str.indexOf("1900")==-1){
        return str.slice(0, 10); //截取10位
    }else{
        return "";
    }
}

//单位转换(0否1是)
Vue.prototype.$transRadio = function(type){
    if(type==1){
        return "是";
    }else{
        return "否";
    }
}

//状态区分
Vue.prototype.$completeStyle = function(state){
    if(state==0){
        return "completed";
    }else if(state==1){
        return "processing";
    }else if(state==2){
        return "stoped";
    }else{
        return "";
    }
}

//返回数组第一条
Vue.prototype.$checkListLength = function(list){
    if(list.length>0){
        return list[0].value;
    }else{
        return ""; //返回空字符串
    }
}

//添加新人
Vue.prototype.$addPerson = function(personName, type, callback){
    let paras = {"type": type, "name": personName, "code":0};

    dataPostXD("/insertDicPerson", paras, (data)=>{
        if(callback) callback(data);
    });
}

//添加新任务类型
Vue.prototype.$addTask = function(taskName, type, callback){
    let paras = {"type": type, "typeName":taskName, "code":0};

    dataPostXD("/insertDicTaskType", paras, (data)=>{
        if(callback) callback(data);
    });
}

//message封装
Vue.prototype.$alert = function(msg, type){
    let result = "";
    if(type==0){result='error'}
    else if(type==1){result='success'}
    else if(type==2){result='warning'}
    else if(type==3){result='info'}
    this.$message({message: msg, type: result});
}

//confirm封装
Vue.prototype.$btnConfirm = function(callback){
    this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => { //确定事件
        if(callback) callback();
        
    }).catch(() => { //取消事件
        this.$alert("已经取消", 3);
    });  
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
