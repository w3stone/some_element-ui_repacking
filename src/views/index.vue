<!--项目二——需求管理详情-->
<template>
    <div class="home_page">
        <div class="item_group">
            <h3 class="group_title">基础用法</h3>
            <p class="introduction">给每一组件绑定<span>v-model</span>, 传入<span>options</span>。
                可通过传入<span>props</span>来设置配置项(可选，默认配置项见下)，
                如果添加<span>special</span>属性，返回JSON.stringify()/集合
            </p>

            <pre v-highlight>
                <code class="html">
                    &lt;script&gt;
                        export default {
                            data () {
                                return {
                                    model: [],
                                    options_example: [
                                        {"name": "item01", "value":0},
                                        {"name": "item02", "value":1},
                                        {"name": "item03", "value":2}
                                    ],
                                    defaultProps = {
                                        label: 'name',
                                        value: 'value'
                                    }
                                };
                            }
                        }
                    &lt;/script&gt;
                </code>
            </pre>
        </div>

        <radio-view></radio-view>

        <checkbox-view></checkbox-view>
        

                <!--4、select单选-->
                <!-- <filter-selecter v-model="modelList[index].model[0]" v-if="item.inputtype==4"
                    :selectitemlist="item.selectitemlist"
                    @change="linkSelect(item.id, item.inputname, index)"
                    :ref="item.inputname+item.id">
                </filter-selecter> -->

                <!--5、select多选-->
                <!-- <filter-selecter v-model="modelList[index].model" v-if="item.inputtype==5"
                    :selectitemlist="item.selectitemlist" multiple data-actions-box
                    @change="linkSelect(item.id, item.inputname, index)"
                    :ref="item.inputname+item.id">
                </filter-selecter> -->

                <!--6、自动补全单选(本地)-->
                <!-- <filter-remote v-model="modelList[index].model[0]" 
                    :selectitemlist="modelList[index].options" 
                    v-if="item.inputtype==6 && (item.loadtype==1 || item.loadtype==2)" 
                    :ref="item.inputname+item.id"
                    @change="linkSelect(item.id, item.inputname, index)">
                </filter-remote> -->

                <!--6、自动补全单选(网络)-->
                <!-- <filter-remote v-model="modelList[index].model[0]" async
                    :selectitemlist="modelList[index].options" :apiName="apiName" :selectionId="item.id"
                    :ownName="item.inputname" :parentName="item.parentname"
                    v-if="item.inputtype==6 && item.loadtype==3" 
                    :ref="item.inputname+item.id"
                    @change="linkSelect(item.id, item.inputname, index)">
                </filter-remote> -->

                <!--7、自动补全多选(本地)-->
                <!-- <filter-remote v-model="modelList[index].model" multiple data-actions-box
                    :selectitemlist="modelList[index].options"
                    v-if="item.inputtype==7 && (item.loadtype==1 || item.loadtype==2)" 
                    :ref="item.inputname+item.id"
                    @change="linkSelect(item.id, item.inputname, index)">
                </filter-remote> -->

                <!--7、自动补全多选(网络)-->
                <!-- <filter-remote v-model="modelList[index].model" multiple async data-actions-box
                    :selectitemlist="modelList[index].options" 
                    :apiName="apiName" :selectionId="item.id"
                    :ownName="item.inputname" :parentName="item.parentname"
                    v-if="item.inputtype==7 && item.loadtype==3" 
                    :ref="item.inputname+item.id"
                    @change="linkSelect(item.id, item.inputname, index)">
                </filter-remote> -->

                <!--9、select分组多选(本地)-->
                <!-- <filter-selecter-group v-model="modelList[index].model" multiple
                    :selectitemlist="modelList[index].options" 
                    v-if="item.inputtype==9" :ref="item.inputname+item.id">
                </filter-selecter-group> -->
        
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {options01, options02} from '@/assets/scripts/file.js'
    import {defaultProps} from '@/components/filterItems/config.js'
    import radioView from '@/views/eachViews/radioView'
    import checkboxView from '@/views/eachViews/checkboxView'
    
    import filterSelect from '@/components/filterItems/selecter'
    import filterRemote from '@/components/filterItems/remote'
    import filterSelectGroup from '@/components/filterItems/selecterGroup'
	
	export default {
        name: "homeIndex",
        data (){
            return{

            }
        },
        methods:{
            

        },
        mounted(){
            this.radioOptions = options01;
            this.checkboxOptions = options02;
        },
		components:{
			radioView, checkboxView, filterSelect, filterRemote, filterSelectGroup
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .home_page{
        padding: 0 50px;

        .item_group{
            border-bottom: 1px solid #ededed;
            padding-top: 20px;

            .group_title{
                font-weight: 400;
                color: #1f2f3d;
                font-size: 28px;
                margin: 14px 0;
            }
            .sub_title{
                font-weight: 400;
                color: #1f2f3d;
                font-size: 22px; 
                margin: 30px 0 20px;
            }
            //使用介绍
            .introduction{
                font-size: 16px;
                span{
                    color: #5e6d82;
                    background-color: #e6effb;
                    margin: 0 4px;
                    display: inline-block;
                    padding: 1px 5px;
                    font-size: 12px;
                    border-radius: 3px;
                    height: 18px;
                    line-height: 18px;
                }
            }
            //返回结果
            .values_content{
                height: 28px;
                line-height: 28px;
                padding-left: 5px;
                margin-top: 5px;
            }
            pre{
                margin-top: 0;
            }
        }
    }
</style>