<template>
	<el-dropdown class="main_menu" @command="handleCommand">
		<span class="avatar_box">
			<i class="el-icon-tickets"></i>
		</span>
		
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item command="profile">个人信息</el-dropdown-item>
			<el-dropdown-item command="logout">退出</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {mainOptions} from '@/assets/scripts/file.js'

	export default {
	    name:'mainMenu',
	  	data:function() {
		    return {
				menuLists: [],
				mainOptions: []
		    }
		},
		computed:{
			title(){
				return this.$route.query.project;
			}
		},
		methods:{
			 ...mapMutations({
                changeMethod: "changeMethod"
            }),
			//退出登录
			logout(){
				this.$clearCookie("userid"); //清除cookie
				this.$clearCookie("userName"); //清除cookie
				this.$router.push("/login"); //改变路由
			},
			//页面切换
			changePage(path, type){
				this.$router.push(path); //改变路由
				this.changeMethod(type);
			},
			//下拉菜单操作
			handleCommand(command){
				//console.log(command);
				if(command!="logout"){
					this.$router.push("/profile"); //改变路由

				}else{
					this.logout();
				}
			}
		},
		mounted(){
			this.mainOptions = mainOptions;
		}
	}
</script>

<style lang="scss" type="text/css">
	.main_menu{
		padding: 0 30px;

		.avatar_box{
			font-size: 30px;
			color: $mainColor;
			background-color: #fff;
			//border: 1px solid $mainColor;
			//border-radius: 8px;
		}

	}

</style>