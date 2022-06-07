<template>
  <div>
    Cloud Foundry Sign-in

    <div :style="{ display: loggedInVisibility }">You are logged in to Cloud Foundry</div>
    <br /><br />

    <div :style="{ display: loggedInVisibility }">
      Cloud Foundry Endpoint {{ endpoint }} <br /><br />
      <vscode-button @click="SignoutClicked">Sign-out</vscode-button>
    </div>

    <!-- authentication area -->
    <div :style="{ display: notLoggedInVisibility }" id="authenticationDiv">
      <br />
      <vscode-text-field size="50" :value="this.target.defaultEndpoint" @input="setEndpoint"
        >Enter Cloud Foundry Endpoint</vscode-text-field
      >

      <br /><br />

      <vscode-radio-group orientation="horizontal" :value="ssoOrCredentials" @change="setSSO">
        <vscode-radio id="radioCredentials" value="Credentials">Credentials </vscode-radio>
        <vscode-radio id="radioSSO" value="SSO">SSO Passcode </vscode-radio>
      </vscode-radio-group>

      <br /><br />

      <div id="sso-div" :style="{ display: ssoVisibility }">
        <vscode-link :href="target.passcodeUrl"
          >Click here to authenticate via browser ({{ target.passcodeUrl }})</vscode-link
        >
        <br /><br />

        <vscode-text-field size="50" placeholder="Paste passcode here" ref="passcode" :value="passcode">
          SSO Passcode
          <span slot="end" class="codicon codicon-clippy" @click="paste"></span>
        </vscode-text-field>
      </div>
      <div id="credentials-div" :style="{ display: credentialsVisibility }">
        <vscode-text-field ref="username" :value="username" size="50" placeholder="Enter your Username"
          >Username</vscode-text-field
        >
        <br /><br />
        <vscode-text-field ref="password" :value="password" type="password" size="50" placeholder="Enter your password"
          >Password</vscode-text-field
        >
      </div>

      <br /><br />
      <vscode-button @click="SigninClicked">Sign-in</vscode-button>
    </div>

    <br /><br />
  </div>
</template>
<script>
import {
  provideVSCodeDesignSystem,
  vsCodeTextField,
  vsCodeRadioGroup,
  vsCodeRadio,
  vsCodeLink,
  vsCodeButton,
} from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeTextField());
provideVSCodeDesignSystem().register(vsCodeRadioGroup());
provideVSCodeDesignSystem().register(vsCodeRadio());
provideVSCodeDesignSystem().register(vsCodeLink());
provideVSCodeDesignSystem().register(vsCodeButton());

export default {
  name: "Signin",
  props: ["target", "rpc"],
  data() {
    return {
      isLoggedIn: "",
      ssoOrCredentials: "Credentials",
      endpoint: "",
      passcode: "",
      username: "",
      password: "",
    };
  },
  updated() {
    this.isLoggedIn === "" ? (this.isLoggedIn = this.target.isLoggedIn) : "";
    this.endpoint === "" ? (this.endpoint = this.target.defaultEndpoint) : "";
  },
  watch: {
    isLoggedIn(newVal) {
      this.$emit("updateIsLoggedIn", newVal);
    },
  },
  computed: {
    loggedInVisibility() {
      return !this.isLoggedIn ? "none" : "";
    },
    notLoggedInVisibility() {
      return this.isLoggedIn ? "none" : "";
    },
    ssoVisibility() {
      return this.ssoOrCredentials === "SSO" ? "" : "none";
    },
    credentialsVisibility() {
      return this.ssoOrCredentials === "Credentials" ? "" : "none";
    },
  },
  methods: {
    setEndpoint(val) {
      this.endpoint = val.target.value;
    },
    paste() {
      navigator.clipboard.readText().then((clipText) => (this.passcode = clipText));
    },
    setSSO(val) {
      this.ssoOrCredentials = val.target.value;
    },
    SigninClicked() {
      let payload = {};
      payload.endpoint = this.endpoint !== "" ? this.endpoint : this.target.defaultEndpoint;
      if (this.ssoOrCredentials === "SSO") {
        this.passcode = this.$refs.passcode.value;
        payload.ssoPasscode = this.passcode;
      } else {
        payload.user = this.$refs.username.value;
        payload.password = this.$refs.password.value;
      }

      this.rpc.invoke("loginClick", [payload]).then((res) => {
        if (res) {
          this.isLoggedIn = true;
        } else {
          // TODO: login failed
        }
      });
    },
    SignoutClicked() {
      let payload = {};
      this.rpc.invoke("logoutClick", [payload]).then((res) => {
        if (res) {
          this.isLoggedIn = false;
        } else {
          // TODO show error in logout
        }
      });
    },
  },
};
</script>
