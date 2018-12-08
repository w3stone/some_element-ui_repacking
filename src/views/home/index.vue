<template>
    <div class="theme1 homeIndex">
        <div class="menu_box">
            <main-menu></main-menu>
        </div>

        <!--主要页面-->
        <div class="inner" style="height:100%">
            <router-view></router-view> 
        </div>

        <edit-dialog></edit-dialog>
        <table-dialog></table-dialog>
        <excel-dialog></excel-dialog>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {completeOptions} from '@/assets/scripts/file.js'
    import mainMenu from '@/components/mainMenu'
    import editDialog from '@/components/editDialog'
    import tableDialog from '@/components/tableDialog'
    import excelDialog from '@/components/excelDialog'
    import timeWidget from '@/components/timeWidget'
	
	export default {
        name: "homeIndex",
        data (){
            return{
                dialogVisible: true
            }
        },
        computed:{
            //接收vuex的传值
            ...mapState({
                "tableDialogVisible": state => state.tableDialogVisible,
                "tableDataCopy": state => state.tableDataCopy,
                "editDialogVisible": state => state.editDialogVisible,
                "commPersonOptions": state => state.commPersonOptions, //项目负责人/任务人type2
                "perTeacherOptions": state => state.perTeacherOptions, //绩效老师type0
                "projectPersonOptions": state => state.projectPersonOptions, //需求人type1
                "deliverOptions": state => state.deliverOptions //交付情况
            }),
            method(){
                var method = this.$store.state.method;
                //this.init(); //获取信息
                return method;
            },
            theme(){
                if(this.method==0){ //项目1
                    return "theme1";
                }else if(this.method==1){ //项目2
                    return "theme2";
                }else if(this.method==2){ //项目3
                    return "theme3";
                };
            },
        },
        methods:{
            ...mapMutations({
                changeCommPersonOptions: "changeCommPersonOptions",
                changePerTeacherOptions: "changePerTeacherOptions",
                changeProjectPersonOptions: "changeProjectPersonOptions",
                changeP1TaskOptions: "changeP1TaskOptions",
                changeP2TaskOptions: "changeP2TaskOptions",
                changeP3TaskOptions: "changeP3TaskOptions",
                changeInnerTaskOptions: "changeInnerTaskOptions",
                changeDeliverOptions: "changeDeliverOptions"
            }),
            //获取所有老师信息
            getTeacherOptions(){
                this.$dataGet("/getTeacher",(all)=>{
                    var teacherOptions = all.map((item)=>{
                        return {"value":item.ID, "label":item.NAME, "type": item.TYPE}
                    });
                    var perTeacherOptions = teacherOptions.filter((o)=>{return o.type==0}); //绩效老师
                    var projectPersonOptions = teacherOptions.filter((o)=>{return o.type==1}); //需求人
                    var commPersonOptions = teacherOptions.filter((o)=>{return o.type==2}); //操作者

                    //console.log(this.projectPersonOptions);
                    
                    this.changePerTeacherOptions(perTeacherOptions);
                    this.changeProjectPersonOptions(projectPersonOptions);
                    this.changeCommPersonOptions(commPersonOptions);
                });
            },
            //配置任务类型字典表
            getDicTaskType(){
                this.$dataGet("/getDicTaskType",(all)=>{
                    var taskOptions = all.map((item)=>{
                        return {"value":item.id, "label":item.typeName, "type": item.type}
                    });
                    let p1TaskOptions = taskOptions.filter((o)=>{return o.type==0}); //项目一外部任务
                    let p2TaskOptions = taskOptions.filter((o)=>{return o.type==3}); //项目二外部任务
                    let p3TaskOptions = taskOptions.filter((o)=>{return o.type==2}); //项目三外部任务
                    let innerTaskOptions = taskOptions.filter((o)=>{return o.type==1}); //内部步骤
                    let deliverOptions = taskOptions.filter((o)=>{return o.type==4}); //交付情况
                    
                    this.changeP1TaskOptions(p1TaskOptions);
                    this.changeP2TaskOptions(p2TaskOptions);
                    this.changeP3TaskOptions(p3TaskOptions);
                    this.changeInnerTaskOptions(innerTaskOptions);
                    this.changeDeliverOptions(deliverOptions);
                });
            }
        },
        mounted(){
            this.$router.push("/project"); //设置默认路由
            //获取字典表
            this.getDicTaskType();
            this.getTeacherOptions();
        },
		components:{
			mainMenu, tableDialog, excelDialog, editDialog, timeWidget
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .inner{
        width: 90%;
        margin: 0 auto;
    }
    //主页面外部盒子
    .homeIndex{
        position: relative;
        box-sizing: border-box;
        height: 100%;
        padding-top: 16px;
    }
    .menu_box{
        position: absolute;
        top: 28px;
        left: 0;
        width: 5%;
        text-align: center;

        //主菜单
        .main_menu{
            display: inline-block;
        }
    }

    /**主页面**/
    .main_page{
        width: 100%;
        height: 100%;

        //条件框
        .search_bar{
            padding: 8px 0;
            //margin-top: 16px;

            //条件筛选
            .search_filter{
                float: left;
                width: 300px;
                padding-right: 10px;

                li{
                    float: left;
                    padding-left: 20px;

                    .el-input{
                        width: 300px;
                    }
                }
            }
            //标题
            .page_title{
                float: right;
                font-weight: normal;
                font-size: 20px;
                height: 40px;
                line-height: 40px;
            }
        }

        //表格外层
        .table_box{
            height: calc(100% - 80px);
            position: relative;
            overflow-y: auto;
            border: 1px solid #ededed;
            border-bottom: none;
            //padding-bottom: 40px;
        }
        /**完成情况样式**/
        .processing{
            color: #3a8ee6;
            font-style: italic;
            font-weight: bold;
        }
        .completed{
            color: #0ca914;
            text-decoration: line-through;
            font-weight: bold;
        }
        .stoped{
            color: tomato;
            font-weight: bold;
        }
        
    }

    .table-expand {
        font-size: 0;
    }
    .table-expand label {
        width: 90px;
        color: #77b0ff;
        //font-weight: bold;
        font-size: 16px;
    }
    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }


    //重置下拉框菜单
    .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
        background-color: $mainhoverColor !important;
        color: #fff !important;
    }

    .theme1{
        //重置button_primary样式
        .el-button--primary{
            background: $mainColor ;
            border-color: $mainColor;

            &:hover{
                background: $mainhoverColor;
                border-color: $mainhoverColor;
            }
        }
        //重置radio样式
        .el-radio__input.is-checked .el-radio__inner{
            border-color: $mainColor;
            background: $mainColor;
        }
        .el-radio__input.is-checked+.el-radio__label{
            color: $mainColor;
        } 
    
    }

    .theme2{
        //重置button_primary样式
        .el-button--primary{
            background: $secColor ;
            border-color: $secColor;

            &:hover{
                background: $sechoverColor;
                border-color: $sechoverColor;
            }
        }
        //重置radio样式
        .el-radio__input.is-checked .el-radio__inner{
            border-color: $secColor;
            background: $secColor;
        }
        .el-radio__input.is-checked+.el-radio__label{
            color: $secColor;
        }
    
    }

    .theme3{
        //重置button_primary样式
        .el-button--primary{
            background: $trdColor ;
            border-color: $trdColor;

            &:hover{
                background: $trdhoverColor;
                border-color: $trdhoverColor;
            }
        }
        //重置radio样式
        .el-radio__input.is-checked .el-radio__inner{
            border-color: $trdColor;
            background: $trdColor;
        }
        .el-radio__input.is-checked+.el-radio__label{
            color: $trdColor;
        }
    
    }
	
</style>