<template>
    <!--radio单选-->
    <div class="item_group select_group">
        <h3 class="group_title">select选择器</h3>

        <!--单选-->
        <div class="">
            <h4 class="sub_title">单选</h4>

            <filter-select v-model="model01" :options="options"></filter-select>

            <div class="values_content">
                <b>返回结果：</b>{{ JSON.stringify(model01) }}
            </div>

            <pre v-highlight>
                <code class="html">
                    &lt;template&gt;
                        &lt;filter-select v-model="model" :options="options"&gt;&lt;/filter-select&gt;
                    &lt;/template&gt;

                    &lt;script&gt;
                        export default {
                            data () {
                                return {
                                    model: "",
                                    options: [
                                        {"name": "选择器01", "value":0},
                                        {"name": "选择器02", "value":1},
                                        {"name": "选择器03", "value":2},
                                        {"name": "选择器04", "value":3},
                                        {"name": "选择器05", "value":4}
                                    ]
                                };
                            }
                        }
                    &lt;/script&gt;
                </code>
            </pre>
        </div>

        <!--多选-->
        <div class="">
            <h4 class="sub_title">多选</h4>

            <filter-select v-model="model02" :options="options" multiple></filter-select>

            <div class="values_content">
                <b>返回结果：</b>{{ JSON.stringify(model02) }}
            </div>

            <pre v-highlight>
                <code class="html">
                    &lt;template&gt;
                        &lt;filter-select v-model="model" :options="options" multiple&gt;&lt;/filter-select&gt;
                    &lt;/template&gt;

                    &lt;script&gt;
                        //options同上
                    &lt;/script&gt;
                </code>
            </pre>
        </div>

        <!--多选(可全选/全不选)-->
        <div class="">
            <h4 class="sub_title">多选(可全选/全不选)</h4>

            <filter-select v-model="model03" :options="options" multiple dataActionsBox></filter-select>

            <div class="values_content">
                <b>返回结果：</b>{{ JSON.stringify(model03) }}
            </div>

            <pre v-highlight>
                <code class="html">
                    &lt;template&gt;
                        &lt;filter-select v-model="model" :options="options" multiple dataActionsBox&gt;&lt;/filter-select&gt;
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
        name: "selectView",
        data (){
            return{
                model01: "",
                model02: [],
                model03: [],
                options: [
                    {"name": "选择器01", "value":0},
                    {"name": "选择器02", "value":1},
                    {"name": "选择器03", "value":2},
                    {"name": "选择器04", "value":3},
                    {"name": "选择器05", "value":4}
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