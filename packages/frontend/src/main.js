import { createApp } from "vue";
import CFSignIn from "./App.vue";
import "./styles/tooltip.css";
import tooltip from "./directives/tooltip.js";

const app = createApp(CFSignIn);
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("ui5-") || tag.startsWith("vscode-");

// register all directives
app.directive("tooltip", tooltip);

app.mount("#app");
