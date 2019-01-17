<template>
    <!--radio单选-->
    <div class="item_group select_group">
        <h3 class="group_title">select+可搜索</h3>

        <!--本地搜索单选-->
        <div class="">
            <h4 class="sub_title">本地搜索单选</h4>

            <filter-select v-model="model01" :options="options" remote></filter-select>

            <div class="values_content">
                <b>返回结果：</b>{{ JSON.stringify(model01) }}
            </div>

            <pre v-highlight>
                <code class="html">
                    &lt;template&gt;
                        &lt;filter-select v-model="model" :options="options" remote&gt;&lt;/filter-select&gt;
                    &lt;/template&gt;

                    &lt;script&gt;
                        export default {
                            data () {
                                return {
                                    model: "",
                                    options: [
                                        {"name": "上海", "value":0},
                                        {"name": "北京", "value":1},
                                        {"name": "广州", "value":2},
                                        {"name": "深圳", "value":3},
                                        {"name": "杭州", "value":4},
                                        {"name": "重庆", "value":5}
                                    ]
                                };
                            }
                        }
                    &lt;/script&gt;
                </code>
            </pre>
        </div>

        <!--本地搜索多选-->
        <div class="">
            <h4 class="sub_title">本地搜索多选</h4>

            <filter-select v-model="model02" :options="options" multiple remote></filter-select>

            <div class="values_content">
                <b>返回结果：</b>{{ JSON.stringify(model02) }}
            </div>

            <pre v-highlight>
                <code class="html">
                    &lt;template&gt;
                        &lt;filter-select v-model="model" :options="options" multiple remote&gt;&lt;/filter-select&gt;
                    &lt;/template&gt;

                    &lt;script&gt;
                        //options同上
                    &lt;/script&gt;
                </code>
            </pre>
        </div>

        <!--网络搜索-->
        <div class="">
            <h4 class="sub_title">网络搜索</h4>

            <filter-select v-model="model03" remote 
                async apiName="..." method="GET" ownName="cityName">
            </filter-select>

            <div class="values_content">
                <b>返回结果：</b>{{ JSON.stringify(model03) }}
            </div>

            <pre v-highlight>
                <code class="html">
                    &lt;template&gt;
                        &lt;filter-select v-model="model" :options="options" remote async&gt;&lt;/filter-select&gt;
                    &lt;/template&gt;

                    &lt;script&gt;
                        //options同上
                    &lt;/script&gt;
                </code>
            </pre>
        </div>

    </div>        
</template>

<script>
    import filterSelect from '@/components/filterItems/select'
	
	export default {
        name: "remoteView",
        data (){
            return{
                model01: "",
                model02: [],
                model03: "",
                model04: [],
                options: [
                    {"name": "上海", "value":0},
                    {"name": "北京", "value":1},
                    {"name": "广州", "value":2},
                    {"name": "深圳", "value":3},
                    {"name": "杭州", "value":4},
                    {"name": "重庆", "value":5}
                ]
            }
        },
		components:{
			filterSelect
        }
	}
	
</script>

<style lang="scss" type="test/css">
    
</style>