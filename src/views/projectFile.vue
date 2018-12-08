<!--配置表弹窗-->
<template>
    <div class="project_file file_page">
        <div class="handle_bar">
			<!--上传-->
            <el-upload
                class="upload_btn"
                :action="domain + '/upload'"
                :data="{proNum: currentOuterId, proDetailNum: currentInnerId}"
                :multiple="false"
                :before-upload="(file)=>{beforeUpload(file)}"
                :on-success="(response, file, fileList)=>{uploadSuccess()}">
                <el-button>上传新文件</el-button>
                <!-- <span>＜5M</span> -->
            </el-upload>
		</div>

        <el-table :data="fileTableData" style="width: 100%" class="file_table">
            <el-table-column prop="id" label="序号" width="60">
                <template slot-scope="scope">
                    <span>{{ scope.$index+1 }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="fileName" label="文件名"></el-table-column>

            <el-table-column prop="fileType" label="文件类型" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.fileType }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="fileSize" label="文件大小" width="100">
                <template slot-scope="scope">
                    <span>{{ transFileSize(scope.row.fileSize) }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="lastDate" label="上传/更新日期" width="160">
                <template slot-scope="scope">
                    <span>{{ scope.row.lastDate }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <!-- <el-button size="mini" type="primary" @click="fileDownload(scope.row.file, currentOuterId, currentInnerId)">下载</el-button> -->
                    <form :action="domain+'/download'" name="form" method="post" class="download_btn">
                        <input type="hidden" name="fileName" :value="scope.row.file"> 
                        <input type="hidden" name="proNum" :value="currentOuterId">  
                        <input type="hidden" name="proDetailNum" :value="currentInnerId"> 
                        <input type="submit" value="下载">
                    </form>
                    <!-- <el-button size="mini" @click="handle(scope.row.id)">覆盖</el-button> -->
                    <el-upload
                        class="upload_btn"
                        :action="domain + '/upload'"
                        :data="{proNum: currentOuterId, proDetailNum: currentInnerId}"
                        :multiple="false"
                        :before-upload="(file)=>{beforeUpload(file, scope.row.file)}"
                        :on-success="(response, file, fileList)=>{uploadSuccess()}">
                        <el-button size="mini">覆盖</el-button>
                        <!-- <span>＜5M</span> -->
                    </el-upload>
                    <el-button size="mini" type="danger" @click="handleDel(scope.row.file, scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>	

    </div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import { completeOptions } from '@/assets/scripts/file.js'

	export default {
		name: "projectFile",
		props: {},
		data: function() {
			return {
				fileTableData: [],
				completeOptions: [], //完成情况字典表
				startTime: "",
                endTime: "",
                switchModel: false
			};
		},
		computed: {
			//接收vuex的传值
            ...mapState({
                "domain": state => state.domain,
                "currentOuterId": state => state.currentOuterId, //外部id
                "currentInnerId": state => state.currentInnerId, //内部id
                "filelistDialogVisible": state => state.filelistDialogVisible
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
            //获取文件列表
            getFileList(){
                let params = {"proNum": this.currentOuterId, "proDetailNum": this.currentInnerId};
                this.$dataPost("/getFileList", params, (data)=>{
                    this.fileTableData = data.length>0? data: [];
                });
            },
            //转换文件大小
            transFileSize(sizeNum){
                let kb = 1024;
                let mb = 1048576;
                return sizeNum>mb? this.$reserveDecimal(sizeNum/mb)+"mb": this.$reserveDecimal(sizeNum/kb)+"kb";
            },
            //上传前回调函数
			beforeUpload(file, oldFile){
                if(oldFile){
                    this.delFile(oldFile); //删除旧文件
                }

				//console.log(file);
				if(file.size>5*1024*1024){
                    this.$alert("文件大于5m！", 2);
					return false;
				}
			},
			//上传成功回调函数
			uploadSuccess(fileName){
				//console.log(file);
                this.$alert("上传成功！", 1);
                this.getFileList(); //重新获取文件列表
			},
			//文件下载
			fileDownload(fileName, proNum, proDetailNum){
				let params = {"fileName":fileName, "proNum":proNum, "proDetailNum":proDetailNum}

				this.$dataPost("/download", params, (data)=>{
                    //let blob = new Blob([data], {type: "text/plain"});
                    let blob = new Blob([data], {});
                    let a = document.createElement('a');
                    
					a.innerHTML = fileName;
					// 指定生成的文件名
					a.download = fileName;
					a.href = URL.createObjectURL(blob);``

					document.body.appendChild(a);

					let evt = document.createEvent("MouseEvents");
					evt.initEvent("click", false, false);

					a.dispatchEvent(evt);

					document.body.removeChild(a);
				});
            },
            //删除文件
            delFile(file){
                let params = {"fileName":file, "proNum":this.currentOuterId, "proDetailNum":this.currentInnerId};
                this.$dataPost("/deleteFile", params, (data)=>{});  
            },
            //删除操作
            handleDel(file, index){
                this.$btnConfirm(()=>{ //点击确定事件
                    this.delFile(file);
                    this.fileTableData.splice(index, 1); //前端删除一行
                });
            }
        },
		mounted(){
            this.getFileList(); //获取文件列表
        },
        watch:{
            "filelistDialogVisible":{ 
                handler(newVal, oldVal){
                    //console.log(newVal, oldVal);
                    if(true==newVal){
                        this.getFileList(); //获取文件列表
                    }
                }
            }
        }
	}
</script>

<style lang="scss" type="text/css">
    .file_page{
        .upload_btn .el-upload-list{
            display: none;
        }
        //上传按钮
        .upload_btn{
            display: inline-block;
            margin-right: 6px;
        }

        //下载按钮
        .download_btn{
            display: inline-block;
            margin-right: 6px;

            input[type="submit"]{
                display: inline-block;
                line-height: 1;
                white-space: nowrap;
                cursor: pointer;
                background: #fff;
                border: 1px solid #dcdfe6;
                color: #606266;
                -webkit-appearance: none;
                text-align: center;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                outline: 0;
                margin: 0;
                -webkit-transition: .1s;
                transition: .1s;
                padding: 7px 15px;
                font-size: 12px;
                border-radius: 3px;

                &:hover{
                    color: #409EFF;
                    border-color: #c6e2ff;
                    background-color: #ecf5ff;
                }
            }
        }

    }

</style>