<template>
  <div>
    <h1 wrapping-type="Normal">Cloud Foundry Sign In and Targets</h1>
    <span class="subtitle-field">
      Provide your Cloud Foundry parameters to sign in to the Cloud Foundry enviroment</span
    >
    <br />
    <br />
    <vscode-divider role="separator" />
    <br />
  </div>
</template>
<script>
import { provideVSCodeDesignSystem, vsCodeDivider } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeDivider());

export default {
  name: "CFHeader",
  props: [],
};
</script>

<style scoped>
.subtitle-field {
  color: var(--vscode-descriptionForeground, #717171);
  margin-bottom: 16px;
}
</style>
