<!--单条编辑弹窗-->
<template>
    <el-dialog class="edit_dialog" 
        title="单条信息" :visible.sync="editDialogVisible" >
        
        <project-edit></project-edit>

    </el-dialog>
</template>

<script>
	import {mapState, mapMutations} from 'vuex' 
    import projectEdit from '@/views/projectEdit'

	export default {
        name:'editDialog',
        computed:{
            //弹框可视状态
            editDialogVisible:{
                get(){
                    var result = this.$store.state.editDialogVisible;
                    return result;
                },
                set(newstate){
                    this.changeEditDgVisible(newstate);
                }
            },
            ...mapState({
                "method": state => state.method
            })
        },
        methods:{
            ...mapMutations({
                changeEditDgVisible: "changeEditDgVisible"
            }),
        },
        components:{
            projectEdit
        }
	}
</script>

<style lang="scss" type="text/css">
	$width: 350px;

    .edit_dialog{
		.el-input{
			width: $width;
		}
		.el-date-editor.el-input, .el-date-editor.el-input__inner {
			width: $width;
		}
		.el-select{
			width: $width;
		}

        .el-dialog__body{
            text-align: center;
        }
        .el-form{
            display: inline-block;
        }
        .el-form-item__content{
            position: relative;
        }
        .el-form-item__label{
            text-align: left;
        }

        //添加新需求人
        .add_person{
            float: left;

            .el-input{
                width: 120px;
            }
        }
        .prompt{
            color: #c0c4cc;
            margin-left: 5px;
            position: absolute;
            top: 0;
            right: -52px;
        }

	}
    
</style>