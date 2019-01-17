<template>
    <!--radio单选-->
    <div class="item_group checkbox_group">
        <h3 class="group_title">checkbox多选</h3>

        <!--不含全选-->
        <div class="">
            <h4 class="sub_title">不含全选</h4>

            <filter-checkbox v-model="model01" :options="options"></filter-checkbox>

            <div class="values_content">
                <b>返回结果：</b>{{ JSON.stringify(model01) }}
            </div>

            <pre v-highlight>
                <code class="html">
                    &lt;template&gt;
                        &lt;filter-checkbox v-model="model" :options="options"&gt;&lt;/filter-checkbox&gt;
                    &lt;/template&gt;

                    &lt;script&gt;
                        export default {
                            data () {
                                return {
                                    model: [],
                                    options: [
                                        {"name": "多选01", "value":0},
                                        {"name": "多选02", "value":1},
                                        {"name": "多选03", "value":2},
                                        {"name": "多选04", "value":3},
                                        {"name": "多选05", "value":4}
                                    ]
                                };
                            }
                        }
                    &lt;/script&gt;
                </code>
            </pre>
        </div>

        <!--含全选-->
        <div class="">
            <h4 class="sub_title">含全选</h4>

            <filter-checkbox v-model="model02" :options="options" isCheckAll></filter-checkbox>

            <div class="values_content">
                <b>返回结果：</b>{{ JSON.stringify(model02) }}
            </div>

            <pre v-highlight>
                <code class="html">
                    &lt;template&gt;
                        &lt;filter-checkbox v-model="model" :options="options" isCheckAll&gt;&lt;/filter-checkbox&gt;
                    &lt;/template&gt;

                    &lt;script&gt;
                        export default {
                            data () {
                                return {
                                    model: [],
                                    options: [
                                        {"name": "多选01", "value":0},
                                        {"name": "多选02", "value":1},
                                        {"name": "多选03", "value":2},
                                        {"name": "多选04", "value":3},
                                        {"name": "多选05", "value":4}
                                    ]
                                };
                            }
                        }
                    &lt;/script&gt;
                </code>
            </pre>
        </div>
    </div>        
</template>

<script>
    import filterCheckbox from '@/components/filterItems/checkbox'
	
	export default {
        name: "homeIndex",
        data (){
            return{
                model01: [],
                model02: [],
                options: [
                    {"name": "多选01", "value":0},
                    {"name": "多选02", "value":1},
                    {"name": "多选03", "value":2},
                    {"name": "多选04", "value":3},
                    {"name": "多选05", "value":4}
                ]
            }
        },
		components:{
			filterCheckbox
        }
	}
	
</script>

<style lang="scss" type="test/css">
    
</style>