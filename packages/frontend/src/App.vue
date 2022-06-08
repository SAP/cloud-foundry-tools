<template>
  <v-app id="app">
    <Header />

    <div :style="{ display: progressVisibility }">
      <vscode-progress-ring></vscode-progress-ring>
    </div>

    <div :style="{ display: formVisibility }">
      <div style="visibility: none">
        <Signin :target="initialTarget" :rpc="rpc" @updateIsLoggedIn="updateIsLoggedIn" />

        <div :style="{ display: targetVisibility }">
          <Target :target="initialTarget" :rpc="rpc" :isLoggedIn="isLoggedIn" />
        </div>
      </div>
    </div>
    <!-- end progress -->
  </v-app>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import { RpcBrowser } from "@sap-devx/webview-rpc/out.browser/rpc-browser";
import { RpcBrowserWebSockets } from "@sap-devx/webview-rpc/out.browser/rpc-browser-ws";
import * as _ from "lodash";
import Header from "./components/Header.vue";
import Signin from "./components/Signin.vue";
import Target from "./components/Target.vue";
import {
  provideVSCodeDesignSystem,
  vsCodeButton,
  vsCodeProgressRing,
  vsCodeDropdown,
} from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeButton());
provideVSCodeDesignSystem().register(vsCodeProgressRing());
provideVSCodeDesignSystem().register(vsCodeDropdown());

function initialState() {
  return {
    rpc: Object,
    showBusyIndicator: "",
    initialTarget: Object,
    isLoggedIn: false,
  };
}
export default {
  name: "app",
  components: {
    Header,
    Signin,
    Target,
  },
  data() {
    return initialState();
  },
  computed: {
    targetVisibility() {
      return this.isLoggedIn ? "" : "none";
    },
    progressVisibility() {
      return !this.showBusyIndicator ? "none" : "";
    },
    formVisibility() {
      return this.showBusyIndicator ? "none" : "";
    },
    isLoadingColor() {
      return true;
    },
    currentPrompt() {
      return _.get(this.prompts, "[" + this.promptIndex + "]");
    },
  },
  watch: {
    prompts: {
      handler() {
        this.setBusyIndicator();
      },
    },
  },
  methods: {
    updateIsLoggedIn(val) {
      this.isLoggedIn = val;
    },
    setBusyIndicator(value) {
      this.showBusyIndicator = value;
    },
    isInVsCode() {
      return typeof acquireVsCodeApi !== "undefined";
    },
    setupRpc() {
      /* istanbul ignore if */
      if (this.isInVsCode()) {
        // eslint-disable-next-line no-undef
        window.vscode = acquireVsCodeApi();
        this.rpc = new RpcBrowser(window, window.vscode);
        this.initRpc();
      } else {
        const ws = new WebSocket("ws://127.0.0.1:8081");
        /* istanbul ignore next */
        ws.onopen = () => {
          this.rpc = new RpcBrowserWebSockets(ws);
          this.initRpc();
        };
      }
    },
    initRpc() {
      const functions = ["setBusyIndicator"];
      _.forEach(functions, (funcName) => {
        this.rpc.registerMethod({
          func: this[funcName],
          thisArg: this,
          name: funcName,
        });
      });
    },
    init() {
      this.rpc.invoke("init").then((target) => {
        this.initialTarget = target;
      });
    },
  },
  created() {
    this.setupRpc();
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped></style>
