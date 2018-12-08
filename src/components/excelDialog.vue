<!--配置表弹窗-->
<template>
    <el-dialog class="excelDialog" 
        title="导出excel" :visible.sync="excelDialogVisible" width="80%">

        <project-excel v-on:exportExcel="exportExcel"></project-excel>

    </el-dialog>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import { completeOptions } from '@/assets/scripts/file.js'
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
    import projectExcel from '@/views/projectExcel'

	export default {
		name: "tableDialog",
		props: {},
		data: function() {
			return {
				tempForm: {}, //备份需要修改的对象
				excelTableData: [],
				newTableCopy: [],
				startTime: "",
				endTime: ""
			};
		},
		computed: {
			//接收vuex的传值
            ...mapState({
				"method": state => state.method
            }),
			//弹框可视状态
			excelDialogVisible: {
				get() {
					var result = this.$store.state.excelDialogVisible;
					return result;
				},
				set(newstate) {
					this.changeExcelDgVisible(newstate);
				}
			}
		},
		methods: {
			...mapMutations({
				changeExcelDgVisible: "changeExcelDgVisible" //改变弹窗可视状态
			}),
			//导出excel核心方法
			exportExcel (panelId, excelTitle) {
				/* generate workbook object from table */
				var wb = XLSX.utils.table_to_book(document.querySelector('#'+ panelId));
				/* get binary string as output */
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
				try {
					FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), excelTitle)
				} catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
				return wbout;
			}
		},
		components:{
            projectExcel
        }
	}
</script>

<style lang="scss" type="text/css">
	.excel_page{
		.search_bar{
			padding-bottom: 30px;

			.switch_box{
				width: 40px;
				height: 20px;
				float: right;
				padding-top: 8px;

				&>.switch{
					display: none;
				}

				&:hover>.switch{
					display: block;
				}
			}
		}
	}
</style>