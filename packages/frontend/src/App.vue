<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div id="app">
    <CFHeader class="app" />

    <vscode-progress-ring v-if="showBusyIndicator" class="progress-ring" />

    <div v-if="!showBusyIndicator" class="app">
      <CFSignin
        v-if="!showBusyIndicator"
        :target="initialTarget"
        :rpc="rpc"
        :setLoggedIn="setLoggedIn"
        :isLoggedIn="isLoggedIn"
      />

      <CFTarget v-if="!showBusyIndicator && isLoggedIn" :target="initialTarget" :rpc="rpc" />
    </div>
    <!-- end progress -->
  </div>
</template>

<script>
import { RpcBrowser } from "@sap-devx/webview-rpc/out.browser/rpc-browser";
import { RpcBrowserWebSockets } from "@sap-devx/webview-rpc/out.browser/rpc-browser-ws";
import * as _ from "lodash";
import CFHeader from "./components/CFHeader.vue";
import CFSignin from "./components/CFSignin.vue";
import CFTarget from "./components/CFTarget.vue";
import {
  provideVSCodeDesignSystem,
  vsCodeButton,
  vsCodeProgressRing,
  vsCodeDropdown,
} from "@vscode/webview-ui-toolkit";
import { ref } from "vue";

provideVSCodeDesignSystem().register(vsCodeButton());
provideVSCodeDesignSystem().register(vsCodeProgressRing());
provideVSCodeDesignSystem().register(vsCodeDropdown());

export default {
  name: "App",
  components: {
    CFHeader,
    CFSignin,
    CFTarget,
  },
  setup() {
    const isLoggedIn = ref(false);

    const setLoggedIn = (value) => {
      isLoggedIn.value = value;
    };

    return {
      isLoggedIn,
      setLoggedIn,
    };
  },
  data() {
    return {
      rpc: Object,
      showBusyIndicator: true,
      initialTarget: Object,
      curretOrg: "",
      currentSpace: "",
    };
  },
  async created() {
    await this.setupRpc();
    await this.init();
    this.setLoggedIn(this.initialTarget.isLoggedIn);
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
    async setupRpc() {
      /* istanbul ignore if */
      if (this.isInVsCode()) {
        // eslint-disable-next-line no-undef
        window.vscode = acquireVsCodeApi();
        this.rpc = new RpcBrowser(window, window.vscode);
        this.initRpc();
      } else {
        const ws = new WebSocket("ws://127.0.0.1:8081");
        return new Promise((resolve, reject) => {
          ws.onopen = async () => {
            try {
              this.rpc = new RpcBrowserWebSockets(ws);
              this.initRpc();
              resolve();
            } catch (e) {
              reject(e);
            }
          };
        });
      }
    },
    initRpc() {
      const functions = ["setBusyIndicator"];
      _.forEach(functions, (funcName) => {
        this.rpc?.registerMethod({
          func: this[funcName],
          thisArg: this,
          name: funcName,
        });
      });
    },
    async init() {
      return this.rpc?.invoke("init").then((target) => {
        this.initialTarget = target;
      });
    },
  },
};
</script>
<style scoped>
.app {
  padding-left: 16px;
}
.progress-ring {
  margin-top: 25%;
  margin-left: 50%;
}
</style>
