import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        domain: "/DemandManagePlatform/api", //域名
        //domain: "/DemandManagePlatform1/api", //测试域名
        baseParams:{ //api基本参数
            appname: "HosArea",
            token: "960A4157-E503-47E5-97B4-838ACDEE06D9", //校验码
            device: "3", //设备号 1 苹果 2 安卓 3 网页
            version: "1.0.0.0.0"
        },
        isSubmited: false, //是否提交过
        method: 1, //0:流水接入平台, 1:需求管理平台
        currentOuterId: 0, //当前外部表格id
        currentInnerId: 0, //当前内部表格id
        hosName: "", //当前医院名称
        projectName: "", //当前项目名
        taskPersonName: "", //当前任务人员
        editDialogVisible: false, //编辑弹框可视状态
        tableDialogVisible: false, //二级表格弹窗可视状态
        filelistDialogVisible: false, //文件列表弹框可视状态
        excelDialogVisible: false, //导出excel弹窗可视状态
        tableDataCopy: [], //表格1拷贝,
        tableDetailDataCopy: [], //详情表格拷贝
        perTeacherOptions: [], //绩效老师字典表
        projectPersonOptions: [], //需求人字典表
        commPersonOptions: [], //项目负责人字典表
        proejct1TaskOptions: [], //项目一任务字典表
        proejct2TaskOptions: [], //项目二任务字典表
        proejct3TaskOptions: [], //项目三任务字典表
        innerTaskOptions: [], //项目2&3详情任务字典表
        deliverOptions: [], //交付类型字典表
        authority: 0 //权限
    },
    getters:{
        getImgDomain (state) {
            return state.imgDomain;
        },
    },
    mutations: {
        changeSubmit(state, bol){ //是否已经提交过
            state.isSubmited = bol;
        },
        changeMethod(state, method){
            state.method = method;
        },
        changeCurrentOuterId(state, val){ //改变当前外部id
            state.currentOuterId = val;
        },
        changeCurrentInnerId(state, val){ //改变当前内部id
            state.currentInnerId = val;
        },
        changeHosName(state, val){ //改变当前医院名(医院名)
            state.hosName = val;
        },
        changeProjectName(state, val){ //改版当前项目名(项目二)
            state.projectName = val;
        },
        changeTaskPersonName(state, val){ //改变当前任务人(项目三)
            state.taskPersonName = val;
        },
        changeEditDgVisible(state, bol){ //改变弹窗可视状态
            state.editDialogVisible = bol;
        },
        changeTableDgVisible(state, bol){ //改变弹窗可视状态
            state.tableDialogVisible = bol;
        },
        changeFilelistDgVisible(state, bol){ //改变弹窗可视状态
            state.filelistDialogVisible = bol;
        },
        changeExcelDgVisible(state, bol){ //改变弹窗可视状态
            state.excelDialogVisible = bol;
        },
        changeTableData(state, data){ //改变表格拷贝
            state.tableDataCopy = data;
        },
        changeTableDetailData(state, data){
            state.tableDetailDataCopy = data;
        },
        changePerTeacherOptions(state, data){ //改变绩效老师字典表
            state.perTeacherOptions = data;
        },
        addPerTeacherOptions(state, data){ //添加绩效老师
            state.perTeacherOptions.push(data);
        },
        changeProjectPersonOptions(state, data){ //改变需求人字典表
            state.projectPersonOptions = data;
        },
        addProjectPersonOptions(state, data){ //添加需求人
            state.projectPersonOptions.push(data);
        },
        changeCommPersonOptions(state, data){ //改变负责人字典表
            state.commPersonOptions = data;
        },
        addCommPersonOptions(state, data){ //添加负责人
            state.commPersonOptions.push(data);
        },
        changeP1TaskOptions(state, data){
            state.proejct1TaskOptions = data;
        },
        addP1TaskOptions(state, data){
            state.proejct1TaskOptions.push(data);
        },
        changeP2TaskOptions(state, data){
            state.proejct2TaskOptions = data;
        },
        addP2TaskOptions(state, data){
            state.proejct2TaskOptions.push(data);
        },
        changeP3TaskOptions(state, data){
            state.proejct3TaskOptions = data;
        },
        addP3TaskOptions(state, data){
            state.proejct3TaskOptions.push(data);
        },
        changeInnerTaskOptions(state, data){ //改变内部步骤字典表
            state.innerTaskOptions = data;
        },
        addInnerTaskOptions(state, data){
            state.innerTaskOptions.push(data);
        },
        changeDeliverOptions(state, data){ //改变交付情况字典表
            state.deliverOptions = data;
        },
        changeAuthority(state, authority){ //改变权限
            state.authority = authority
        }
        
    }

});

export default store