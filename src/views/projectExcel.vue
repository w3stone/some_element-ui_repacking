<!--配置表弹窗-->
<template>
    <div class="project_excel excel_page">

		<div class="search_bar">
			<span>日期范围：</span>
			<el-date-picker v-model="startTime" type="date"
				placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
			</el-date-picker>
			<span style="margin:0 4px">至</span>
			<el-date-picker v-model="endTime" type="date"
				placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
			</el-date-picker>
			<span style="margin:0 4px"></span>
			<el-button type="primary" class="search_detail_btn" @click="exportFn()">导出excel</el-button>

            <!--隐藏与显示表格-->
            <div class="switch_box">
                <el-switch class="switch" v-model="switchModel" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
		</div>

		<div style="overflow-x:auto" v-show="switchModel">
			
			<el-table :data="excelTableData" id="excel_table2"
				:span-method="tableSpanMethod">
				<!--外部-->
				<el-table-column prop="out_id" label="序号">
					<template slot-scope="scope">
						<span>{{ scope.$index+1 }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="out_startTime" label="开始时间">
					<template slot-scope="scope">
						<span>{{ $transDate(scope.row.out_startTime) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="projectName" label="项目名"></el-table-column>

				<el-table-column prop="projectPerson" label="需求来源">
					<template slot-scope="scope">
						<span>{{ $transValue(scope.row.projectPerson, projectPersonOptions) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="projectType" label="项目类型">
					<template slot-scope="scope">
						<span>{{ $transValue(scope.row.projectType, proejct2TaskOptions) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="out_completeSituation" label="完成情况">
					<template slot-scope="scope">
						<span>{{ $transValue(scope.row.out_completeSituation, completeOptions, 1) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="out_actualTimeConsuming" label="实际耗时(时)"></el-table-column>

				<el-table-column prop="out_endTime" label="结束时间">
					<template slot-scope="scope">
						<span>{{ $transDate(scope.row.out_endTime) }}</span>
					</template>
				</el-table-column>
				
				<!--内部-->
				<el-table-column prop="projectDetails" label="步骤详情"></el-table-column>

				<el-table-column prop="type" label="步骤类型">
					<template slot-scope="scope">
						<span>{{ $transValue(scope.row.type, innerTaskOptions) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="in_startTime" label="开始时间">
					<template slot-scope="scope">
						<span>{{ $transDate(scope.row.in_startTime) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="aboutTimeConsuming" label="预计耗时(时)"></el-table-column>

				<el-table-column prop="aboutEndTime" label="预计结束时间">
					<template slot-scope="scope">
						<span>{{ $transDate(scope.row.aboutEndTime) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="in_endTime" label="结束时间">
					<template slot-scope="scope">
						<span>{{ $transDate(scope.row.in_endTime) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="operationTimeConsuming" label="操作耗时(时)"></el-table-column>

				<el-table-column prop="in_actualTimeConsuming" label="实际耗时(时)"></el-table-column>

				<el-table-column prop="in_completeSituation" label="完成情况">
					<template slot-scope="scope">
						<span>{{ $transValue(scope.row.in_completeSituation, completeOptions) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="commperson" label="负责人">
					<template slot-scope="scope">
						<span>{{ $transValue(scope.row.commperson, commPersonOptions) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="resultData" label="数据结果"></el-table-column>

				<el-table-column prop="score" label="评估结果"></el-table-column>

				<el-table-column prop="scorePerson" label="评估结果"></el-table-column>
			</el-table>

		</div>

    </div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import { completeOptions } from '@/assets/scripts/file.js'

	export default {
		name: "tableDialog",
		props: {},
		data: function() {
			return {
				excelTableData: [],
				newTableCopy: [],
				completeOptions: [], //完成情况字典表
				startTime: "",
                endTime: "",
                switchModel: false
			};
		},
		computed: {
			//接收vuex的传值
            ...mapState({
				"tableDataCopy": state => state.tableDataCopy,
				"projectPersonOptions": state => state.projectPersonOptions, //需求人
				"commPersonOptions": state => state.commPersonOptions, //项目负责人/任务人type2
				"proejct2TaskOptions": state => state.proejct2TaskOptions,
				"innerTaskOptions": state => state.innerTaskOptions
            }),
			dicList(){
				let dc = [];
				let allId = Enumerable.from(this.excelTableData).select("o=>o.out_id").toArray();
				let distinctId = Enumerable.from(this.excelTableData).select("o=>o.out_id").distinct().toArray();

				for(var i=0; i<distinctId.length; i++){
					dc.push(allId.indexOf(distinctId[i]));
				}
				dc.push(this.excelTableData.length); //补充一位
				return dc;
			}
		},
		methods: {
            //获取项目二所需数据
			getAllDemand(){
				this.$dataGet("/getAllDemand", (data)=>{
					this.excelTableData = data;
					this.newTableCopy = data;
				});
			},
			//导出方法
			exportFn(){
				let canGoOn = this.dateChange(); //切换时间范围
				if(!canGoOn)
					return false;
                
                let panelId = "excel_table2";
				let excelTitle = this.startTime +"至" + this.endTime + "项目需求查询明细.xlsx";

				let timer = setTimeout(()=>{
					this.exportExcel(panelId, excelTitle);
					clearTimeout(timer);
				},800);
				
            },
            //导出excel(调用父组件)
			exportExcel (panelId, excelTitle) {
                this.$emit("exportExcel", panelId, excelTitle);
			},
			//选择日期后事件
			dateChange(){
				this.startTime = this.startTime || this.$getCurrentMonthFirstDay().slice(0, 10);
				this.endTime = this.endTime || this.$getCurrentMonthLastDay().slice(0, 10);

				//将日期转时间戳
				let startTimeStamp = this.$dateToTimestamp(this.startTime);
				let endTimeStamp = this.$dateToTimestamp(this.endTime);
				
				if(startTimeStamp<=endTimeStamp){
					this.excelTableData = this.newTableCopy.filter((o)=>{
                        return this.$dateToTimestamp(o.out_startTime)>=startTimeStamp 
                            && this.$dateToTimestamp(o.out_startTime)<=endTimeStamp 
                    });
					return true;

				}else{
					this.$alert("开始时间应小于结束时间！", 2);
					this.excelTableData = this.newTableCopy;
					return false;
				}
			},
			//表格合并行方法(项目二)
			tableSpanMethod({ row, column, rowIndex, columnIndex }) {
				if (columnIndex>=0 && columnIndex<=7) {
					let result = this.findDC(rowIndex);
					if(this.findDC(rowIndex)){
						return {
							rowspan: result[0],
							colspan: result[1]
						};
					}else{
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}
            },
            //找到与字典表对应的行号
			findDC(rowIndex){
				for(var i=0; i<this.dicList.length; i++){
					if(rowIndex==this.dicList[i]){
						return [this.dicList[i+1] - this.dicList[i], 1];
					}
				}
            }
		},
		mounted(){
            //console.log("进入project_excel");
            this.completeOptions = completeOptions;
            this.getAllDemand(); //获取新数据
		}
	}
</script>