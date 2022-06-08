<template>
  <div>
    <h1 wrapping-type="Normal">Cloud Foundry Sign In and Targets</h1>
    <span style="color: var(--vscode-foreground, #cccccc)"
      >Provide your Cloud Foundry parameters to sign in to the Cloud Foundry enviroment</span
    >
    <br />
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
