<template>
  <div>
    <div class="cloud-foundry-title">Cloud Foundry Sign-in</div>
    <div :style="{ display: loggedInVisibility }" class="logged-in-visibility">
      <v-mdi name="mdi-check-circle-outline" size="15" fill="green"></v-mdi>
      You are signed in to Cloud Foundry
    </div>
    <br /><br />

    <div :style="{ display: loggedInVisibility }">
      <span class="cloud-foundry-endpoint">Cloud Foundry Endpoint</span>
      <br />
      <div>{{ endpoint }}</div>
      <br /><br />
      <vscode-button class="sign-out-button" @click="SignoutClicked">Sign-out</vscode-button>
    </div>

    <!-- authentication area -->
    <div :style="{ display: notLoggedInVisibility }" id="authenticationDiv">
      <br />
      <vscode-text-field size="50" :value="this.target.defaultEndpoint" @input="setEndpoint" class="cccccc-field"
        >Enter Cloud Foundry Endpoint <span class="text-danger">*</span></vscode-text-field
      >

      <br /><br />

      <span class="cccccc-field">Select authentication method </span>

      <v-mdi
        name="mdi-help-circle-outline"
        size="15"
        fill="#4f9cea"
        v-tooltip="{
          content:
            ' Single sign-on (SSO) is a token-based authentication method in which an SSO token is passed in an HTTP header or cookie.',
          placement: 'right',
          class: 'tooltip-custom',
        }"
      >
      </v-mdi>
      <vscode-radio-group orientation="horizontal" :value="ssoOrCredentials" @change="setSSO">
        <vscode-radio id="radioCredentials" value="Credentials">Credentials </vscode-radio>
        <vscode-radio id="radioSSO" value="SSO">SSO Passcode </vscode-radio>
      </vscode-radio-group>

      <br /><br />

      <div id="sso-div" :style="{ display: ssoVisibility }">
        <vscode-link :href="target.passcodeUrl">Open a new browser page to generate your SSO passcode </vscode-link>
        <v-mdi
          name="mdi-help-circle-outline"
          size="15"
          fill="#4f9cea"
          v-tooltip="{
            content:
              ' Your SSO passcode is generated in a seperate browser page. <br />Copy it and paste it back in SAP Business Application Studio.',
            placement: 'right',
            class: 'tooltip-custom',
          }"
        >
        </v-mdi>
        <br /><br />

        <vscode-text-field
          size="50"
          placeholder="Enter your passcode"
          v-on:keyup="btnStatus"
          v-model="passcode"
          @input="(p) => (passcode = p.target.value)"
          :value="passcode"
          class="cccccc-field"
        >
          Enter your SSO Passcode
          <span class="text-danger">*</span>
          <span slot="end" class="codicon codicon-clippy" @click="paste"></span>
        </vscode-text-field>
      </div>
      <div id="credentials-div" :style="{ display: credentialsVisibility }">
        <vscode-text-field
          v-on:keyup="btnStatus"
          v-model="username"
          :value="username"
          @input="(u) => (username = u.target.value)"
          size="50"
          placeholder="E-mail address or Company ID"
          class="cccccc-field"
          >Enter your Username <span class="text-danger">*</span></vscode-text-field
        >
        <br /><br />
        <vscode-text-field
          v-on:keyup="btnStatus"
          v-model="password"
          :value="password"
          @input="(p) => (password = p.target.value)"
          type="password"
          size="50"
          class="cccccc-field"
          >Enter your password <span class="text-danger">*</span></vscode-text-field
        >
      </div>
      <br />
      <span :style="{ display: authFailedVisibility }" style="color: #b80000">
        <v-mdi name="mdi-close-circle-outline" size="15" fill="#b80404"></v-mdi>
        Authentication failed. Please try again.
      </span>
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
      authFailed: "",
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
    authFailedVisibility() {
      return !this.authFailed ? "none" : "";
    },
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
      if (this.ssoOrCredentials == "Credentials" && this.username != "" && this.password != "")
        this.disableButton = false;
      else if (this.ssoOrCredentials == "SSO" && this.passcode != "") this.disableButton = false;
      else this.disableButton = true;
    },
    setEndpoint(val) {
      this.endpoint = val.target.value;
    },
    paste() {
      navigator.clipboard.readText().then((clipText) => {
        this.passcode = clipText;
        this.btnStatus();
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
        payload.ssoPasscode = this.passcode;
      } else {
        payload.user = this.username;
        payload.password = this.password;
      }

      this.rpc.invoke("loginClick", [payload]).then((res) => {
        if (res) {
          this.authFailed = "";
          this.isLoggedIn = true;
        } else {
          this.authFailed = true;
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

<style>
.cloud-foundry-title {
  font-weight: bold;
  width: 13%;
  float: left;
}
.logged-in-visibility {
  width: 23%;
  float: left;
}
.cloud-foundry-endpoint {
  color: var(--vscode-foreground, #767676);
}
.sign-out-button {
  background-color: #444;
}
.text-danger {
  color: red;
}
.cccccc-field {
  color: var(--vscode-foreground, #cccccc);
}
.tooltip .tooltip-inner {
  width: 284px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 10px 10px 20px 10px;
  /* border: 1px solid #BFBFBF; */
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
</style>
