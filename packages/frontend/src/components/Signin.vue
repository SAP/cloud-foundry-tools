<template>
  <div>
    <div style="font-weight: bold; width: 13%; float: left">Cloud Foundry Sign-in</div>
    <div :style="{ display: loggedInVisibility }" style="width: 23%; float: left">
      You are signed in to Cloud Foundry
    </div>
    <br /><br />

    <div :style="{ display: loggedInVisibility }">
      <span style="color: var(--vscode-foreground, #767676)">Cloud Foundry Endpoint</span>
      <br />
      <div>{{ endpoint }}</div>
      <br /><br />
      <vscode-button style="background-color: #444" @click="SignoutClicked">Sign-out</vscode-button>
    </div>

    <!-- authentication area -->
    <div :style="{ display: notLoggedInVisibility }" id="authenticationDiv">
      <br />
      <vscode-text-field
        size="50"
        :value="this.target.defaultEndpoint"
        @input="setEndpoint"
        style="color: var(--vscode-foreground, #cccccc)"
        >Enter Cloud Foundry Endpoint <span class="text-danger" style="color: red">*</span></vscode-text-field
      >

      <br /><br />

      <span style="color: var(--vscode-foreground, #cccccc)">Select authentication method </span>
      <vscode-radio-group orientation="horizontal" :value="ssoOrCredentials" @change="setSSO">
        <vscode-radio id="radioCredentials" value="Credentials">Credentials </vscode-radio>
        <vscode-radio id="radioSSO" value="SSO">SSO Passcode </vscode-radio>
      </vscode-radio-group>

      <br /><br />

      <div id="sso-div" :style="{ display: ssoVisibility }">
        <vscode-link :href="target.passcodeUrl">Open a new browser page to generate your SSO passcode </vscode-link>
        <br /><br />

        <vscode-text-field
          size="50"
          placeholder="Enter your passcode"
          v-on:keyup="btnStatus"
          ref="passcode"
          :value="passcode"
          style="color: var(--vscode-foreground, #cccccc)"
        >
          Enter your SSO Passcode
          <span class="text-danger" style="color: red">*</span>
          <span slot="end" class="codicon codicon-clippy" @click="paste"></span>
        </vscode-text-field>
      </div>
      <div id="credentials-div" :style="{ display: credentialsVisibility }">
        <vscode-text-field
          v-on:keyup="btnStatus"
          ref="username"
          :value="username"
          size="50"
          placeholder="E-mail address or Company ID"
          style="color: var(--vscode-foreground, #cccccc)"
          >Enter your Username <span class="text-danger" style="color: red">*</span></vscode-text-field
        >
        <br /><br />
        <vscode-text-field
          v-on:keyup="btnStatus"
          ref="password"
          :value="password"
          type="password"
          size="50"
          style="color: var(--vscode-foreground, #cccccc)"
          >Enter your password <span class="text-danger" style="color: red">*</span></vscode-text-field
        >
      </div>

      <br /><br />
      <vscode-button @click="SigninClicked" v-bind:disabled="disableButton">Sign-in</vscode-button>
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
      disableButton: true,
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
    btnStatus() {
      if (this.ssoOrCredentials == "Credentials" && this.$refs.username.value != "" && this.$refs.password.value != "")
        this.disableButton = false;
      else if (this.ssoOrCredentials == "SSO" && this.$refs.passcode.value != "") this.disableButton = false;
      else this.disableButton = true;
    },
    setEndpoint(val) {
      this.endpoint = val.target.value;
    },
    paste() {
      navigator.clipboard.readText().then((clipText) => {
        this.passcode = clipText;
        if (clipText != "") this.disableButton = false;
      });
    },
    setSSO(val) {
      this.ssoOrCredentials = val.target.value;
      this.disableButton = true;
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

<style></style>
