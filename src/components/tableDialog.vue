<!--配置表弹窗-->
<template>
    <el-dialog class="tableDialog" 
        :title="title" :visible.sync="tableDialogVisible" width="80%">

		<el-dialog
			width="60%"
			title="文件列表"
			:visible.sync="filelistDialogVisible"
			append-to-body>
			<project-file></project-file>
		</el-dialog>

        <project-detail></project-detail>

    </el-dialog>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import projectDetail from '@/views/projectDetail'
	import projectFile from '@/views/projectFile'
	
	export default {
		name: "tableDialog",
		computed: {
			//弹框可视状态
			tableDialogVisible: {
				get() {
					let result = this.$store.state.tableDialogVisible;
					return result;
				},
				set(newstate) {
					this.changeTableDgVisible(newstate);
				}
			},
			filelistDialogVisible: {
				get() {
					let result = this.$store.state.filelistDialogVisible;
					return result;
				},
				set(newstate) {
					this.changeFilelistDgVisible(newstate);
				}
			},
			...mapState({
				"method": state => state.method,
				"hosName": state => state.hosName,
				"projectName": state => state.projectName,
				"taskPersonName": state => state.taskPersonName
            }),
			title(){
				return this.projectName;
			}
		},
		methods: {
			...mapMutations({
				changeTableDgVisible: "changeTableDgVisible", //改变弹窗可视状态
				changeFilelistDgVisible: "changeFilelistDgVisible"
			})
		},
		components:{
			projectDetail, projectFile
		}
	}
</script>

<style lang="scss" type="text/css">
	.tableDialog{
		.el-date-editor.el-input, .el-date-editor.el-input__inner {
			width: 217px;
		}

		.el-form--inline .el-form-item__content{
			width: 217px;
			text-align: left;
		}

		input[type="number"].el-input__inner{
			padding-right: 0px;
		}
		.upload_btn{
			display: inline-block;
		}
		.download_btn{
			display: inline-block;
		}

		.table-expand {
			font-size: 0;
		}
		.table-expand label {
			//float: left;
			font-size: 16px;
			width: 130px;
			color: #99a9bf;
		}
		.table-expand .el-form-item {
			float: left;
			margin: 0;
			padding: 4px 0;
			width: 33%;
			text-align: center;
			//border: 1px dashed #ddd;
		}
		.form_group{
			border-bottom:  1px dashed #ddd;
			padding: 4px 0;
		}

		.ud_icon{
			font-size: 18px;
			//font-weight: bold;
			margin-right: 5px;
			cursor: pointer;

			&:hover{
				transform: scale(1.1, 1.1);
				transition: all 0.5s;
			}
		}

		//响应式
        @media only screen and (max-width: 1600px){
            .table-expand .el-form-item {
				//width: 50% !important;
				text-align: left !important;
			}
			.el-form-item__content{
				width: auto !important;
				float: left;
			}
			.table-expand label {
				float: left;
			}
        }
	}
</style>