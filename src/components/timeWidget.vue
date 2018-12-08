<template>
	<div class="timeWidget" v-if="time.length>0">
        <span>
            <span class="year">{{ year }}</span><i class="split">-</i>
            <span class="month">{{ month }}</span><i class="split">-</i>
            <span class="day">{{ day }}</span>
        </span>
        
        <span v-show="showMinute">
            <i class="split"> </i>
            <span class="hour">{{ hour }}</span><i class="split">:</i>
            <span class="minute">{{ minute }}</span>
        </span>
    </div>
</template>

<script>
	export default {
	    name:'timeWidget',
	  	props:["time", "showMinute"],
		data() {
			return {
                year:"",
                month: "",
                day: "",
                hour: "",
                minute: "",
			};
        },
		mounted(){
            this.setTime();
        },
        methods:{
            setTime(){
                if(this.time.length>0){
                let left = this.time.split(" ")[0];
                this.year = left.split("-")[0];
                this.month = left.split("-")[1];
                this.day = left.split("-")[2];

                let right = this.time.split(" ")[1];
                this.hour = right.split(":")[0];
                this.minute = right.split(":")[1];
            }
            }
        },
        watch:{
            "time":{
                handler(newVal, oldVal){
                    this.setTime();
                }
            }
        }
	}
</script>

<style lang="scss" type="text/css">
	.timeWidget{
        text-align: center;
        border: 1px solid #cac2c2;
        border-radius: 4px;
        background: #f5f7fa;
        padding: 0 2px;

        .split{
            margin-left: 2px;
            color: #a09d9d;
        }

        .month{
            //color: #fff;
            font-size: 16px;
            font-weight: bold;
            font-style: italic;

        }
        .day{
            font-size: 16px;
            font-weight: bold;
            font-style: italic;
        }
        .hour{
            font-size: 15px;
            font-style: italic;
        }
        .minute{
            font-size: 15px;
            font-style: italic;
        }
    }
</style>