import Vue from 'vue';
import {Message} from 'element-ui' //获取消息框
import store from '@/store.js'

//Vue.use(Message);

var domain = store.state.domain; //api域名

function initFn(params, callback, argument){
    //如果没有参数
    if (typeof argument == "function"){
        callback = argument;
        params = {};
    }
    //对象合并,确定最终参数
    return {
        //params: baseParams? $.extend({}, params, baseParams): params,
        params: params,
        callback: callback
    } 

}


//ajaxGet封装
function dataGet(apiName, params, callback){
    var url = domain + apiName;
    var obj = initFn(params, callback, arguments[1]);
    params = obj.params;
    callback = obj.callback;

    // axios.get(url, {params: params}).then((response) => {
    //     var all = response.data;
    //     console.log(all);
    //     if(callback) callback(all);

    // }).catch((error)=>{
    //     console.log(error);    
    // });

    $.ajax({
        type:'GET',
        url: url,
        data: params,
        success: (data)=>{
            var all = data;
            //console.log(all);
            if(callback) callback(all);

        },
        error:(error)=>{
            console.log(error);
        }
    });

}

//ajaxGet封装(含交互)
function dataGetXD(apiName, params, callback){
    var url = domain + apiName;
    var obj = initFn(params, callback, arguments[1]);
    params = obj.params;
    callback = obj.callback;

    $.ajax({
        type:'GET',
        url: url,
        data: params,
        success: (result)=>{
            if(result==1){ //成功
                Message({message: '操作成功！', type: 'success'});
                if(callback) callback(result);
    
            }else{ //失败
                Message({message: '操作失败！', type: 'error'});
            }

        },
        error:(error)=>{
            console.log(error);
            Message({message: '操作失败！', type: 'error'});   
        }
    });
}


//ajaxPost封装
function dataPost(apiName, params, callback){
    var url = domain + apiName;
    var obj = initFn(params, callback, arguments[1]);
    params = obj.params;
    callback = obj.callback;

    $.ajax({
        type:'POST',
        url: url,
        data: params,
        success: (data)=>{
            var result = data;
            if(result==0){
                
            }else{
                if(callback) callback(result);
            }

        },
        error:(error)=>{
            console.log(error);
        }
    });

}


//ajaxPost封装(含交互)
function dataPostXD(apiName, params, callback){
    var url = domain + apiName;
    var obj = initFn(params, callback, arguments[1]);
    params = obj.params;
    callback = obj.callback;

    $.ajax({
        type:'POST',
        url: url,
        //data: JSON.parse(JSON.stringify(params)),
        data: params,
        success: (data)=>{
            var result = data;
            if(result==0){
                Message({ type: 'error', message: '操作失败!' });
            }else{
                Message({ type: 'success', message: '操作成功!' });
                if(callback) callback(result);
            }

        },
        error:(data)=>{
            console.log(data);
            Message({ type: 'error', message: '操作失败!' });
        }
    });
}


export{
    dataGet, dataGetXD, dataPost, dataPostXD
}