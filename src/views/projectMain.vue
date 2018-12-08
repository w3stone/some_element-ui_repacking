<!--项目二——需求管理详情-->
<template>
    <div class="project_page main_page">
        <div class="search_bar clearfix">
            <div class="search_filter">
                <el-input placeholder="可以搜索项目名、需求来源、任务类型" v-model="searchInput" 
                    @keyup.native="search()" @change="search()" clearable></el-input>
            </div>

            <el-button type="primary" class="search_detail_btn" @click="handle(0)">+</el-button>
            <el-button type="primary" class="search_detail_btn" @click="init()"><i class="el-icon-refresh"></i></el-button>
            <el-button type="primary" class="search_detail_btn" @click="changeExcelDgVisible(true)">导出excel</el-button>

            <h3 class="page_title">需求管理详情</h3>
        </div>

        <!--表格1-->
        <div class="table_box">
            <el-table :data="tableData" height="100%" style="width: 100%">

                <el-table-column prop="id" label="序号" width="60">
                    <template slot-scope="scope">
                        <span>{{ scope.$index+1 }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="projectType" label="项目类型" 
                    :filters="filterList1" :filter-method="filterHandler1">
                    <template slot-scope="scope">
                        <span>{{ $transValue(scope.row.projectType, proejct2TaskOptions) }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="projectName" label="项目名" min-width="200"></el-table-column>

                <el-table-column prop="achievePerson" label="负责人">
                    <template slot-scope="scope">
                        <span>{{ $transValue(scope.row.achievePerson, commPersonOptions) }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="projectPerson" label="客户名称">
                    <template slot-scope="scope">
                        <span>{{ $transValue(scope.row.projectPerson, projectPersonOptions) }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="completeSituation" label="完成情况"
                    :filters="filterList2" :filter-method="filterHandler2">
                    <template slot-scope="scope">
                        <span :class="$completeStyle(scope.row.completeSituation)">
                            {{ $transValue(scope.row.completeSituation, completeOptions, 1) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column prop="projectFee" label="项目金额">
                    <template slot-scope="scope">
                        <span>{{ scope.row.projectFee }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="receipt" label="已开票金额">
                    <template slot-scope="scope">
                        <span>{{ scope.row.receipt }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="actualFee" label="实收金额">
                    <template slot-scope="scope">
                        <span>{{ scope.row.actualFee }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="startTime" label="开始时间" width="164">
                    <template slot-scope="scope">
                        <!-- <span>{{ $transDate(scope.row.startTime) }}</span> -->
                        <time-widget :time="$transDate(scope.row.startTime)" :showMinute="true"></time-widget>
                    </template>
                </el-table-column>
                
                <el-table-column prop="endTime" label="结束时间" width="164">
                    <template slot-scope="scope">
                        <!-- <span>{{ $transDate(scope.row.endTime) }}</span> -->
                        <time-widget :time="$transDate(scope.row.endTime)" :showMinute="true"></time-widget>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="seeDetail(scope.row.id, scope.row.projectName)">详情</el-button>
                        <el-button size="mini" @click="handle(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {completeOptions} from '@/assets/scripts/file.js'
    import timeWidget from '@/components/timeWidget'
	
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
			timeWidget
        }
	}
	
</script>

<style lang="scss" type="test/css">
    
</style>