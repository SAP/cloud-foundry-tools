import Vue from "vue";
import CFSignIn from "./App";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(CFSignIn),
}).$mount("#app");
