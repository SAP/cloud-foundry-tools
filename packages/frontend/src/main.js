import { createApp } from "vue";
import CFSignIn from "./App";
import VueMdijs from "vue-mdijs";
import { mdiCheckCircleOutline, mdiHelpCircleOutline, mdiCloseCircleOutline } from "@mdi/js";

const app = createApp(CFSignIn);
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("ui5-") || tag.startsWith("vscode-");
VueMdijs.add({ mdiCheckCircleOutline, mdiHelpCircleOutline, mdiCloseCircleOutline });
app.use(VueMdijs);

app.mount("#app");
