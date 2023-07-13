import { createApp } from "vue";
import CFSignIn from "./App";
import VueMdijs from "vue-mdijs";
import { mdiCheckCircleOutline, mdiHelpCircleOutline, mdiCloseCircleOutline } from "@mdi/js";
// import { VTooltip, VPopover, VClosePopover } from "v-tooltip";

const app = createApp(CFSignIn);
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("ui5-") || tag.startsWith("vscode-");
VueMdijs.add({ mdiCheckCircleOutline, mdiHelpCircleOutline, mdiCloseCircleOutline });
app.use(VueMdijs);

// app.directive("tooltip", VTooltip);
// app.directive("close-popover", VClosePopover);
// // eslint-disable-next-line vue/component-definition-name-casing
// app.component("v-popover", VPopover);

app.mount("#app");
