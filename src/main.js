import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import hljs  from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import "./plugins/element.js";


Vue.config.productionTip = false;

Vue.directive('highlight', function(el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
        hljs.highlightBlock(block)
    })
});

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
