<template>
  <div>
    <h1 wrapping-type="Normal">Login to Cloud Foundry</h1>
    Enter Cloud Foundry parameters in order to login to Cloud Foundry enviroment
    <vscode-divider role="separator"></vscode-divider>
    <br />
  </div>
</template>
<script>
import { provideVSCodeDesignSystem, vsCodeDivider } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeDivider());

export default {
  name: "Header",
  props: [],
};
</script>
