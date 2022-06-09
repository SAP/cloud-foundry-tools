import Vue from "vue";
import CFSignIn from "./App";
import VueMdijs from "vue-mdijs";
import { mdiCheckCircleOutline, mdiHelpCircleOutline, mdiCloseCircleOutline } from "@mdi/js";
import { VTooltip, VPopover, VClosePopover } from "v-tooltip";

Vue.config.productionTip = false;
VueMdijs.add({ mdiCheckCircleOutline, mdiHelpCircleOutline, mdiCloseCircleOutline });
Vue.use(VueMdijs);
Vue.directive("tooltip", VTooltip);
Vue.directive("close-popover", VClosePopover);
Vue.component("v-popover", VPopover);

new Vue({
  render: (h) => h(CFSignIn),
}).$mount("#app");
