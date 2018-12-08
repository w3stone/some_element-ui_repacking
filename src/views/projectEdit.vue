<template>
    <div class="project_edit edit_page">
        <!--项目二-->
        <el-form :model="form">
            <el-form-item label="项目名 *" :label-width="formLabelWidth">
                <el-input v-model="form.projectName" auto-complete="off" placeholder="请输入项目名"
                :maxlength="30"></el-input>
            </el-form-item>

            <el-form-item label="开始时间 *" :label-width="formLabelWidth">
                <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间"
                    format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
            </el-form-item>

            <el-form-item label="接入人员" :label-width="formLabelWidth">
                <el-select v-model="form.achievePerson" filterable allow-create
                    @change="checkAchievePerson" placeholder="请选择接入人员">
                    <el-option v-for="item in commPersonOptions"
                        :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <span class="prompt">可添加</span>
            </el-form-item>

            <el-form-item label="需求来源" :label-width="formLabelWidth">
                <el-select v-model="form.projectPerson" filterable allow-create
                    @change="checkProjectPerson" placeholder="请选择需求来源">
                    <el-option v-for="item in projectPersonOptions"
						:key="item.value" :label="item.label" :value="item.value">
					</el-option>
                </el-select>
                <span class="prompt">可添加</span>
			</el-form-item>

            <el-form-item label="项目类型" :label-width="formLabelWidth">
                <el-select
                    v-model="form.projectType" filterable allow-create
                    @change="checkProejct2Task" placeholder="请选择项目类型">
                    <el-option v-for="item in proejct2TaskOptions"
						:key="item.value" :label="item.label" :value="item.value">
					</el-option>
                </el-select>
                <span class="prompt">可添加</span>
			</el-form-item>

            <el-form-item label="完成情况" :label-width="formLabelWidth">
                <el-select
                    v-model="form.completeSituation"
                    placeholder="请选择任务类型">
                    <el-option v-for="item in completeOptions"
						:key="item.value" :label="item.label" :value="item.value">
					</el-option>
                </el-select>
			</el-form-item>

            <!-- <el-form-item label="实际耗时" :label-width="formLabelWidth">
                <el-input v-model="form.actualTimeConsuming" auto-complete="off" placeholder="请输入实际耗时"></el-input>
            </el-form-item> -->

            <el-form-item label="结束时间" :label-width="formLabelWidth">
                <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间"
                    format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
            </el-form-item>

            <el-form-item label="项目金额" :label-width="formLabelWidth">
                <el-input type="number" v-model="form.projectFee" placeholder="请输入项目金额"></el-input>
            </el-form-item>

            <el-form-item label="已开票金额" :label-width="formLabelWidth">
                <el-input type="number" v-model="form.receipt" placeholder="请输入已开票金额"></el-input>
            </el-form-item>

            <el-form-item label="实收金额" :label-width="formLabelWidth">
                <el-input type="number" v-model="form.actualFee" placeholder="请输入实收金额"></el-input>
            </el-form-item>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeEditDgVisible(false)">取 消</el-button>
            <el-button type="primary" @click="submitFn()">确 定</el-button>
        </div>

    </div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
    import {completeOptions, dqForm} from '@/assets/scripts/file.js'

	export default {
        name:'proejctEdit',
        props: {},
	  	data:function () {
		    return {
				form: {},
                completeOptions: [],
                projectPersonModel: "",
                newPerson: "", //新需求人
                newTask: "", //新任务类型
                addPersonShow: false,
                startTimeShow: true, //项目二修改时间
                tempOptions: [],
                authority: 0, //权限
				formLabelWidth: "100px"
		    }
        },
        computed:{
            ...mapState({
                "method": state => state.method,
                "currentOuterId": state => state.currentOuterId, //当前表格id
                "editDialogVisible": state => state.editDialogVisible,
                "tableDataCopy": state => state.tableDataCopy,
                "tableDetailDataCopy": state => state.tableDetailDataCopy,
                "commPersonOptions": state => state.commPersonOptions, //项目负责人
                "projectPersonOptions": state => state.projectPersonOptions, //需求人
				"proejct2TaskOptions": state => state.proejct2TaskOptions
            })
        },
        methods: {
            ...mapMutations({
                changeEditDgVisible: "changeEditDgVisible",
                changeSubmit: "changeSubmit",
                addProjectPersonOptions: "addProjectPersonOptions", //添加需求人
                addCommPersonOptions: "addCommPersonOptions", //添加任务人
                addP2TaskOptions: "addP2TaskOptions"
            }),
            //根据id获取当前列
            getListById(id){
                //console.log(this.tableDataCopy, id);
                let list = this.tableDataCopy.filter((o)=>{return o.id==id })[0];
                return list;
            },
            makeForm(){
                //拼接所需form
                if(this.currentOuterId){
                    this.form = this.getListById(this.currentOuterId);

                }else{ //新建
                    let newForm = this.$deepCopy(dqForm);
                    newForm.projectPerson = this.projectPersonOptions[0].value; //设置默认需求人
                    newForm.projectType = this.proejct2TaskOptions[0].value; //设置默认项目类型
                    newForm.achievePerson = this.commPersonOptions[0].value; //设置默认任务人

                    this.form = newForm;
                }
                this.startTimeShow = this.currentOuterId? false: true;
            },
            //提交方法
            submitFn(){
                let verification = this.form.startTime && this.form.projectName; //验证条件

                //验证需求人
                this.form.projectPerson = this.checkProjectPerson(this.form.projectPerson);

                //验证任务人
                this.form.achievePerson = this.checkAchievePerson(this.form.achievePerson);

                //验证项目类型
                this.form.projectType = this.checkProejct2Task(this.form.projectType);

                //没完成不能填结束时间
                if(this.form.completeSituation!=0 && this.form.endTime){
                    this.$alert("没完成不能填结束时间！", 2);
                    this.form.endTime = ""; //清空结束时间
                    return false;
                }
                if(this.form.completeSituation==0 && !this.form.endTime){
                    this.$alert("完成后结束时间不能为空！", 2);
                    return false;
                }


                if(!this.form.id && verification){ //添加任务
                    var newForm = this.$deepCopy(this.form);
                    delete newForm.id; //删除id属性
                    
                    this.$dataPost("/insertDemandQuery", newForm, (result)=>{
                        this.form.id = result;
                        this.changeSubmit(true); //已经提交成功
                        this.changeEditDgVisible(false); //关闭弹窗
                    });

                }else if(verification){ //修改任务
                    let params = this.form;

                    //完成判断(当内部没有全不完成时,不能选完成)
                    if(this.form.completeSituation==0 ){
                        let innerList = this.tableDetailDataCopy.filter(o=>{ return o.projectId==this.form.id });
                        let completeList = innerList.filter((o)=>{return o.completeSituation==0});

                        if( (innerList.length>0 && completeList.length==0) || innerList.length==0){   
                            this.$alert("内部步骤未全完成", 2);
                            this.form.completeSituation = 1; //赋值"进行中"
                            this.form.endTime = ""; //清空结束时间
                            return false;
                        }

                    }

                    //提交数据
                    this.$dataPostXD("/updateDemandQuery", params, (result)=>{
                        this.changeSubmit(true); //已经提交成功
                        this.changeEditDgVisible(false); //关闭弹窗
                    });
                    
                }else{
                    this.$alert("请填写必填项！", 2);
                }
               
            },
            //验证需求人
            checkProjectPerson(data){
                if(typeof data=="string"){
                    let list = this.projectPersonOptions.filter((o)=>{return o.label==data});
                    
                    if(list.length==0){ //需要添加
                        this.$addPerson(this.form.projectPerson, 1, (resultId)=>{
                            this.addProjectPersonOptions({"type":1, "label":this.form.projectPerson, "value":resultId});
                            return resultId; //返回赋值新自增id
                        });

                    }else{ //不需要添加
                        return list[0].value; //返回字典表里对应的value
                    }

                }else if(typeof data=="number"){
                    return data; //返回原值

                }else{ return 0; }
            },
            //验证任务人
            checkAchievePerson(data){
                if(typeof data=="string"){
                    let list = this.commPersonOptions.filter((o)=>{return o.label==data});
                    
                    if(list.length==0){ //需要添加
                        this.$addPerson(this.form.achievePerson, 2, (resultId)=>{
                            this.addCommPersonOptions({"type":2, "label":this.form.achievePerson, "value":resultId});
                            return resultId; //返回赋值新自增id
                        });

                    }else{ //不需要添加
                        return list[0].value; //返回字典表里对应的value
                    }

                }else if(typeof data=="number"){
                    return data; //返回原值

                }else{ return 0; }
            },
            //验证项目类型2
            checkProejct2Task(data){
                if(typeof data=="string"){
                    let list = this.proejct2TaskOptions.filter((o)=>{return o.label==data});
                    
                    if(list.length==0){ //需要添加
                        this.$addTask(this.form.projectType, 3, (resultId)=>{
                            this.addP2TaskOptions({"type":3, "label":this.form.projectType, "value":resultId});
                            return resultId; //返回赋值新自增id
                        });

                    }else{ //不需要添加
                        return list[0].value; //返回字典表里对应的value
                    }

                }else if(typeof data=="number"){
                    return data; //返回原值

                }else{ return 0; }
            }

		},
		mounted(){
            this.completeOptions = completeOptions;
            this.authority = parseInt( this.$getCookie("authority") );
            this.makeForm();
        },
        watch:{
            "editDialogVisible":{ 
                handler(newVal, oldVal){
                    //console.log(newVal, oldVal);
                    if(true==newVal){
                        this.makeForm();
                    }
                }
            }
        }
	}
</script>

<style lang="scss" type="text/css">
	
</style>