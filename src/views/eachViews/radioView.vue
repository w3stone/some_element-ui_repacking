<template>
    <!--radio单选-->
    <div class="item_group radio_group">
        <h3 class="group_title">radio单选</h3>

        <filter-radio v-model="model" :options="options"></filter-radio>

        <div class="values_content">
            <b>返回结果：</b>{{ JSON.stringify(model) }}
        </div>

        <pre v-highlight>
            <code class="html">
                &lt;template&gt;
                    &lt;filter-radio v-model="model" :options="options"&gt;&lt;/filter-radio&gt;
                &lt;/template&gt;

                &lt;script&gt;
                    export default {
                        data () {
                            return {
                                model: [],
                                options: [
                                    {"name": "单选01", "value":0},
                                    {"name": "单选02", "value":1},
                                    {"name": "单选03", "value":2}
                                ]
                            };
                        }
                    }
                &lt;/script&gt;
            </code>
        </pre>
    </div>        
</template>

<script>
    import filterRadio from '@/components/filterItems/radio'
	
	export default {
        name: "homeIndex",
        data (){
            return{
                model: "",
                options: [
                    {"name": "单选01", "value":0},
                    {"name": "单选02", "value":1},
                    {"name": "单选03", "value":2}
                ]
            }
        },
		components:{
			filterRadio
        }
	}
	
</script>

<style lang="scss" type="test/css">
    
</style>