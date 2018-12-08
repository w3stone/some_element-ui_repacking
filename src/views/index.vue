<!--项目二——需求管理详情-->
<template>
    <div class="home_page">
        nihao
        
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {completeOptions} from '@/assets/scripts/file.js'
	
	export default {
        name: "homeIndex",
        data (){
            return{
                dialogVisible: true,
                //项目二
                tableData: [],
                completeOptions: [],
                filterList1: [{"text": "数据查询", "value":1}],
                searchInput: "", //搜索内容
            }
        },
        computed:{
            //接收vuex的传值
            ...mapState({
                "isSubmited": state => state.isSubmited,
                "tableDialogVisible": state => state.tableDialogVisible,
                "tableDataCopy": state => state.tableDataCopy,
                "editDialogVisible": state => state.editDialogVisible,
                "commPersonOptions": state => state.commPersonOptions, //项目负责人
                "projectPersonOptions": state => state.projectPersonOptions, //需求人
                "proejct2TaskOptions": state => state.proejct2TaskOptions, //
            }),
            filterList2(){ //完成情况过滤列表
                return this.completeOptions.map((item)=>{
                    return {"text": item.label, "value":item.value}
                });
            }
        },
        methods:{
            ...mapMutations({
                changeEditDgVisible: "changeEditDgVisible",
                changeTableDgVisible: "changeTableDgVisible",
                changeExcelDgVisible: "changeExcelDgVisible",
                changeTableData: "changeTableData",
                changeTableDetailData: "changeTableDetailData",
                changeCurrentOuterId: "changeCurrentOuterId",
                changeProjectName: "changeProjectName",
                changeSubmit: "changeSubmit" //改变提交状态
            }),
            //初始化方法
            init(){
                this.getDemandQuery();
                this.getDemandQueryDetails();
                this.$alert("刷新成功！", 1);
                this.changeSubmit(false);
            },
            //获取项目2表格1数据
            getDemandQuery(){
                this.$dataGet("/getDemandQuery", (data)=>{
                    //console.log(data);
                    this.tableData = data;
                    this.changeTableData(data);
                    //清空
                    //this.changeCurrentOuterId(0);
                    //this.changeProjectName("");
                });
            },
            //获取项目2表格2数据
            getDemandQueryDetails(){
                this.$dataGet("/getDemandQueryDetails", (data)=>{
                    this.changeTableDetailData(data);
                });
            },
            //条件筛选
            search(){ 
                let inputSearchData = this.searchInput? this.tableDataCopy.filter((o)=>{
                    var personName = this.$transValue(o.projectPerson, this.projectPersonOptions);
                    var projectType = this.$transValue(o.projectType, this.proejct2TaskOptions);

                    return o.projectName.indexOf(this.searchInput)!=-1 
                    || personName.indexOf(this.searchInput)!=-1
                    || projectType.indexOf(this.searchInput)!=-1
                }): this.tableDataCopy;

                this.tableData = inputSearchData;
            },
            //查看详情(表二)
            seeDetail(id, name){
                this.changeTableDgVisible(true); //打开弹框
                this.changeCurrentOuterId(id);
                this.changeProjectName(name);                
            },
            //添加or编辑
            handle(hosId){
                this.changeEditDgVisible(true);
                this.changeCurrentOuterId(hosId);
            },
            //删除
            del(id){
                let params = { id: id };

                this.$btnConfirm(()=>{ //点击确定事件
                    this.$dataGetXD("/deleteDemandQuery", params, ()=>{
                        this.changeSubmit(true);
                    });
                });
            },
            //拼接项目类型列表
            makeFilterList1(){
                this.filterList1 = this.proejct2TaskOptions.map((item)=>{
                    return {"text": item.label, "value":item.value}
                });
            },
            //项目类型筛选
            filterHandler1(value, row){
                return row.projectType == value;
            },
            //状态筛选
            filterHandler2(value, row){
                return row.completeSituation == value;
            }

        },
        mounted(){
            //console.log("进入project");
            this.completeOptions = completeOptions;
            this.init();
            this.makeFilterList1(); //初始化项目类型过滤列表
        },
        watch:{
            "proejct2TaskOptions":{ //重新拼接项目类型过滤列表
                handler(newVal, oldVal){
                    this.makeFilterList1();
                }
            },
            "isSubmited":{
                handler(newVal, oldVal){
                    if(true==newVal)
                        this.init();
                }
            }
        },
		components:{
			
        }
	}
	
</script>

<style lang="scss" type="test/css">
    
</style>