<!--配置表弹窗-->
<template>
    <div class="project_detail detail_page">

		<div class="search_bar clearfix">
			<el-button type="primary" class="search_detail_btn" @click="addLine()">+</el-button>
        </div>

		<!--项目二表格2-->
		<el-table :data="tableData" style="width: 100%"
			:row-key="(row) => {return row.id}"
			:expand-row-keys="expands" @row-click="rowClick">

			<el-table-column type="expand">
				<template slot-scope="scope">
					<el-form label-position="left" inline class="table-expand">
						
						<div class="form_group clearfix">
							<el-form-item label="操作：">
								<div v-show="tableIndex!=scope.$index">
									<!-- <el-button size="mini" type="primary" @click="setComplete(scope.$index)">完成</el-button> -->
									<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(scope.row.id, scope.$index)">删除</el-button>
								</div>
								<div v-show="tableIndex==scope.$index">
									<el-button size="mini" type="primary" @click="handleConfirm(scope.$index, scope.row)">确认</el-button>
									<el-button size="mini" @click="handleCancel(scope.$index, scope.row)">取消</el-button>
								</div>
							</el-form-item>
						</div>

						<div class="form_group clearfix">
							<el-form-item label="步骤详情：*">
								<span v-show="tableIndex!=scope.$index">{{scope.row.projectDetails}}</span>
								<el-input type="text" v-model="scope.row.projectDetails" 
									:maxlength="50"
									v-show="tableIndex==scope.$index"></el-input>
							</el-form-item>

							<el-form-item label="步骤类型：">
								<span v-show="tableIndex!=scope.$index">{{ $transValue(scope.row.type, innerTaskOptions) }}</span>
								<el-select v-model="scope.row.type" filterable allow-create
									@change="(data)=>{checkInnerTask(data, scope.row.type)}" placeholder="请选择" 
									v-show="tableIndex==scope.$index">
									<el-option v-for="item in innerTaskOptions"
										:key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="负责人：">
								<span v-show="tableIndex!=scope.$index">{{ $transValue(scope.row.commPerson, commPersonOptions) }}</span>
								<el-select v-model="scope.row.commPerson" filterable allow-create
									@change="(data)=>{checkCommPerson(data, scope.row.commPerson)}" placeholder="请选择" 
									v-show="tableIndex==scope.$index">
									<el-option v-for="item in commPersonOptions"
										:key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>

						<div class="form_group clearfix">
							<el-form-item label="开始时间 *：">
								<span v-show="tableIndex!=scope.$index">{{ $transDate(scope.row.startTime) }}</span>
								<el-date-picker v-model="scope.row.startTime" type="datetime"
									placeholder="选择日期时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"
									@change="(data)=>{setPredictEndTime2(data, scope.$index)}"
									v-show="tableIndex==scope.$index">
								</el-date-picker>
							</el-form-item>

							<el-form-item label="预计结束时间：">
								<span>{{ $transDate(scope.row.aboutEndTime) }}</span>
							</el-form-item>
							
							<el-form-item label="结束时间：">
								<span v-show="tableIndex!=scope.$index">{{ $transDate(scope.row.endTime) }}</span>
								<el-date-picker v-model="scope.row.endTime" type="datetime"
									placeholder="选择日期时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"
									v-show="tableIndex==scope.$index" :disabled="disabled">
								</el-date-picker>
							</el-form-item>
						</div>

						<div class="form_group clearfix">
							<el-form-item label="预计耗时(时)：">
								<span v-show="tableIndex!=scope.$index">{{scope.row.aboutTimeConsuming}}</span>
								<el-input type="text" v-model.number="scope.row.aboutTimeConsuming"
									v-show="tableIndex==scope.$index" @change="(data)=>{setPredictEndTime(data, scope.$index)}"></el-input>
							</el-form-item>

							<el-form-item label="操作耗时(时)：">
								<span v-show="tableIndex!=scope.$index">{{scope.row.operationTimeConsuming}}</span>
								<el-input type="text" v-model.number="scope.row.operationTimeConsuming"
									v-show="tableIndex==scope.$index" :disabled="disabled"></el-input>
							</el-form-item>

							<el-form-item label="实际耗时(时)：">
								<span v-show="tableIndex!=scope.$index">{{scope.row.actualTimeConsuming}}</span>
								<el-input type="text" v-model.number="scope.row.actualTimeConsuming"
									v-show="tableIndex==scope.$index" :disabled="disabled"></el-input>
							</el-form-item>
						</div>

						<div class="form_group clearfix">
							<el-form-item label="完成情况：">
								<span v-show="tableIndex!=scope.$index">{{ $transValue(scope.row.completeSituation, completeOptions) }}</span>
								<el-select v-model="scope.row.completeSituation" placeholder="请选择" v-show="tableIndex==scope.$index"
									@change="(data)=>{checkComplete(data, scope.$index)}">
									<el-option v-for="item in completeOptions"
										:key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="数据结果：">
								<span v-show="tableIndex!=scope.$index">{{scope.row.resultData}}</span>
								<el-input type="text" v-model="scope.row.resultData" v-show="tableIndex==scope.$index"></el-input>
							</el-form-item>
						</div>
						
						<div class="form_group clearfix" v-show="authority==2">
							<el-form-item label="评估结果：">
								<span v-show="tableIndex!=scope.$index || (tableIndex==scope.$index && authority!=2)">{{scope.row.score}}</span>
								<el-input type="text" v-model="scope.row.score" 
									v-show="tableIndex==scope.$index"></el-input>
							</el-form-item>

							<el-form-item label="评估人：">
								<span>{{scope.row.scorePerson}}</span>
							</el-form-item>
						</div>
					</el-form>

				</template>
			</el-table-column>

			<el-table-column prop="id" label="序号" width="50">
				<template slot-scope="scope">
					<span>{{scope.$index+1}}</span>
				</template>
			</el-table-column>
				
			<el-table-column prop="projectDetails" label="步骤详情" min-width="180"></el-table-column>

			<el-table-column prop="type" label="步骤类型">
				<template slot-scope="scope">
					<span>{{ $transValue(scope.row.type, innerTaskOptions) }}</span>
				</template>
			</el-table-column>

			<el-table-column prop="completeSituation" label="完成情况">
				<template slot-scope="scope">
					<span>{{ $transValue(scope.row.completeSituation, completeOptions) }}</span>
				</template>
			</el-table-column>

			<el-table-column prop="startTime" label="开始时间">
				<template slot-scope="scope">
					<span>{{ $transDate(scope.row.startTime) }}</span>
				</template>
			</el-table-column>

			<el-table-column label="操作耗时(时)">
				<template slot-scope="scope">
					<span>{{scope.row.operationTimeConsuming}}</span>
				</template>
			</el-table-column>

			<el-table-column label="实际耗时(时)">
				<template slot-scope="scope">
					<span>{{scope.row.actualTimeConsuming}}</span>
				</template>
			</el-table-column>

			<el-table-column prop="endTime" label="结束时间">
				<template slot-scope="scope">
					<span>{{ $transDate(scope.row.endTime) }}</span>
				</template>
			</el-table-column>

			<el-table-column label="评估结果">
				<template slot-scope="scope">
					<span>{{scope.row.score}}</span>
				</template>
			</el-table-column>

			<el-table-column label="文件" width="160">
				<template slot-scope="scope">
					<el-button @click="openFilelist(scope.row.id)" :disabled="!scope.row.id">文件列表</el-button>
				</template>
			</el-table-column>
        </el-table>

    </div>
</template>

<script>
	import {mapState, mapMutations} from "vuex";
	import {completeOptions, dqDeatialForm} from '@/assets/scripts/file.js'

	export default {
		name: "projectDetail",
		props: {},
		data: function() {
			return {
				tempForm: {}, //备份需要修改的对象
				projectId: 0,
				tableData: [], //表格2数据
				tableIndex: -1, //要显示的行
				completeOptions: [],
				expands: [], //要展开的行，数值的元素是row的key值
				disabled: false, //禁用
				authority: 0
			};
		},
		computed: {
			//接收vuex的传值
            ...mapState({
				"currentOuterId": state => state.currentOuterId,
				"tableDialogVisible": state => state.tableDialogVisible,
				"tableDetailDataCopy": state => state.tableDetailDataCopy,
				"commPersonOptions": state => state.commPersonOptions, //项目负责人
				"innerTaskOptions": state => state.innerTaskOptions //步骤列表
			})
		},
		methods: {
			...mapMutations({
				changeTableDgVisible: "changeTableDgVisible", //改变弹窗可视状态
				changeFilelistDgVisible: "changeFilelistDgVisible",
				changeCurrentInnerId: "changeCurrentInnerId", //改变当前内部id
				changeSubmit: "changeSubmit",
				addInnerTaskOptions: "addInnerTaskOptions",
				addCommPersonOptions: "addCommPersonOptions"
			}),
			//初始化
			init(){
				this.tableData = []; //清空
				this.tableIndex = -1; //要显示的行
				this.expands = []; //清空展开行
				this.projectId = this.currentOuterId;
				this.getDemandQueryDetails(this.projectId);
			},
			//获取项目二表2数据
			getDemandQueryDetails(id) {
				this.tableData = this.tableDetailDataCopy.filter(o=>{ return o.projectId==id });
				console.log(this.tableData);
			},
			//每一行编辑方法
            handleEdit(index, row){
				this.tempForm = this.$deepCopy(row); //存储原数据
				this.disabled = row.completeSituation==0? false: true; //设置禁用状态
                this.tableIndex = index;
            },
            //每一行确认方法
            handleConfirm(index, row){
				//console.log(index,row);

				let verification = row.startTime && row.projectDetails; //验证条件
				row.projectId = this.projectId; //设置projectId

				if(this.authority==2) row.scorePerson=this.$getCookie("userName"); //如果权限为2，评估人为当前用户

				//完成状况判断
				if(row.completeSituation==0 
					&& !(row.actualTimeConsuming && row.operationTimeConsuming && this.$transDate(row.endTime) ) ){
					this.$alert("未填结束时间or操作耗时or实际耗时！", 2);
					return false;
				}

				//验证内部步骤
				if(!row.type){
					this.$alert("步骤类型不能为空！", 2);
					return false;
				}else{
					row.type = this.checkInnerTask(row.type);
				}

				//验证负责人
				if(!row.commPerson){
					this.$alert("负责人不能为空！", 2);
					return false;
				}else{
					row.commPerson = this.checkCommPerson(row.commPerson);
				}

				//新建
				if(!row.id && verification){
					var newForm = this.$deepCopy(row);
					delete newForm.id; //删除id属性
					
					this.$dataPostXD("/insertDemandQueryDetails", newForm, result => {
						//成功
						this.tableIndex = -1;
						this.tableData[index].id = result; //设置默认id
						this.changeSubmit(true);
					});

				}
				//更新
				else if(verification){
					this.$dataPostXD("/updateDemandQueryDetails", row, result => {
						this.tableIndex = -1;
						this.changeSubmit(true);
					});
				}else{
					this.$alert("请填写必填项！", 2);
				}

            },
            //每一行取消方法
            handleCancel(index, row){
				if (!row.id){ //如果为空,删除当前行
					this.tableData.splice(index, 1); //前端删除起始下标为index，长度为1的一个值
				}else{
					this.tableData[index] = this.tempForm; //对象还原
				}

				this.tableIndex = -1;
				
			},
			//每一行删除方法
			handleDelete(id, index){
				let params = { id: id };
				//console.log(this.tableData, index);

				this.$btnConfirm(()=>{ //点击确定事件
                    this.$dataGetXD("/deleteDemandQueryDetails", params, ()=>{
						this.changeSubmit(true);
						this.tableData.splice(index, 1); //前端删除删除当前行
					});	
                });
			},
			//新建一行
            addLine(){
				let blankForm = this.$deepCopy(dqDeatialForm);
				blankForm.commPerson = this.$checkListLength(this.commPersonOptions); //设置默认负责人
				blankForm.type = this.$checkListLength(this.innerTaskOptions); //设置默认项目类型
				this.expands.push(blankForm.id); //第一行默认展开
				this.disabled = true; //默认禁用

				if ( (this.tableData.length>0 && this.tableData[0].id) || this.tableData.length==0){
					this.tableData.unshift(blankForm);
				}

				this.tableIndex = 0;
				this.expands = [this.expands[0]];
			},
			//设置预计结束时间(先填开始时间，再填预计耗时)
			setPredictEndTime(data, index){
				//console.log(data, index);
				if(!this.tableData[index].startTime){
					this.$alert("未填开始时间!", 2);
					return false;
				}

				let timestamp = this.$dateToTimestamp(this.tableData[index].startTime);
				let newTimestamp = timestamp + this.$hourToTimestamp(data);
				this.tableData[index].aboutEndTime = this.$timestampToDate(newTimestamp);

			},
			//设置预计结束时间(先填预计耗时，再填开始时间)
			setPredictEndTime2(data, index){
				let timestamp = this.$dateToTimestamp(data);
				let newTimestamp = timestamp + this.$hourToTimestamp(this.tableData[index].aboutTimeConsuming);
				this.tableData[index].aboutEndTime = this.$timestampToDate(newTimestamp);
			},
			//打开文件列表
			openFilelist(id){
				this.changeFilelistDgVisible(true);
				//console.log(id);
				this.changeCurrentInnerId(id); //改变当前内部id
			},
			//验证完成
			checkComplete(data, index){
				if(data!=0){ 
					this.disabled = true; //禁用
					this.tableData[index].operationTimeConsuming = 0;
					this.tableData[index].actualTimeConsuming = 0;
					this.tableData[index].endTime = "";

				}else{ //完成
					this.disabled = false; //取消禁用
				}	
			},
			//验证步骤类型
            checkInnerTask(data, type){
                if(typeof data=="string" && data!=""){
                    let list = this.innerTaskOptions.filter((o)=>{return o.label==data});
                    
                    if(list.length==0){ //需要添加
                        this.$addTask(type, 1, (resultId)=>{
                            this.addInnerTaskOptions({"type":1, "label":type, "value":resultId});
                            return resultId; //返回赋值新自增id
                        });

                    }else{ //不需要添加
                        return list[0].value; //返回字典表里对应的value
                    }

                }else if(typeof data=="number"){
                    return data; //返回原值

                }else{ return 0; }
			},
			//验证负责人
            checkCommPerson(data, commPerson){
                if(typeof data=="string"){
                    let list = this.commPersonOptions.filter((o)=>{return o.label==data});
                    
                    if(list.length==0){ //需要添加
                        this.$addPerson(commPerson, 2, (resultId)=>{
                            this.addCommPersonOptions({"type":2, "label":commPerson, "value":resultId});
                            return resultId; //返回赋值新自增id
                        });

                    }else{ //不需要添加
                        return list[0].value; //返回字典表里对应的value
                    }

                }else if(typeof data=="number"){
                    return data; //返回原值

                }else{ return 0; }
            },
			//表格行点击事件
			rowClick(row, event, column){
				//console.log(row, event, column);
				if(row.id == this.expands[0]){ //展开
					this.expands = [];
				}else{ //关闭
					this.expands = [];
					this.expands.push(row.id);
				}	
			}
		},
		mounted(){
			this.completeOptions = completeOptions;
			this.authority = parseInt( this.$getCookie("authority") );
			this.init();
		},
		watch:{
            "tableDialogVisible":{ 
                handler(newVal, oldVal){
                    //console.log(newVal, oldVal)
                    if(true==newVal){
                        this.init();
                    }
                }
            }
        }

	}
</script>