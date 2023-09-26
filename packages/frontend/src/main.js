import { createApp } from "vue";
import CFSignIn from "./App.vue";
import VueMdijs from "vue-mdijs";
import { mdiCheckCircleOutline, mdiHelpCircleOutline, mdiCloseCircleOutline } from "@mdi/js";
import "./styles/tooltip.css";
import tooltip from "./directives/tooltip.js";

const app = createApp(CFSignIn);
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("ui5-") || tag.startsWith("vscode-");
VueMdijs.add({ mdiCheckCircleOutline, mdiHelpCircleOutline, mdiCloseCircleOutline });
app.use(VueMdijs);

// register all directives
app.directive("tooltip", tooltip);

app.mount("#app");
