<template>
  <div>
    <div class="cloud-foundry-title">Cloud Foundry Sign In</div>
    <div :style="{ display: loggedInVisibility }" class="logged-in-visibility">
      <v-mdi
        name="mdi-check-circle-outline"
        size="16"
        fill="var(--vscode-notebookStatusSuccessIcon-foreground, #388a34)"
      ></v-mdi>
      You are signed in to Cloud Foundry.
    </div>
    <br /><br />

    <div :style="{ display: loggedInVisibility }">
      <span class="subtitle-color-field">Cloud Foundry Endpoint</span>
      <br />
      <div class="mt-8">{{ endpoint }}</div>
      <br /><br />
      <vscode-button class="sign-out-button" @click="SignoutClicked">Sign Out</vscode-button>
    </div>

    <!-- authentication area -->
    <div :style="{ display: notLoggedInVisibility }" id="authenticationDiv">
      <br />
      <span class="subtitle-color-field">Enter Cloud Foundry Endpoint </span><span class="text-danger">*</span>
      <br />
      <vscode-text-field
        class="pt-8"
        size="50"
        :value="this.target.defaultEndpoint"
        @input="setEndpoint"
      ></vscode-text-field>
      <br /><br />

      <span class="subtitle-color-field">Select authentication method </span>

      <v-mdi
        name="mdi-help-circle-outline"
        align-self=""
        size="16"
        fill="var(--vscode-textLink-foreground, #006ab1)"
        v-tooltip="{
          content:
            ' Single sign-on (SSO) is a token-based authentication method <br />in which an SSO token is passed in an HTTP header or cookie.',
          placement: 'right',
          class: 'tooltip-custom',
          size: '5',
        }"
      >
      </v-mdi>
      <vscode-radio-group orientation="horizontal" :value="ssoOrCredentials" @change="setSSO">
        <vscode-radio id="radioCredentials" value="Credentials">Credentials </vscode-radio>
        <vscode-radio id="radioSSO" value="SSO">SSO Passcode </vscode-radio>
      </vscode-radio-group>

      <div id="sso-div" :style="{ display: ssoVisibility }">
        <vscode-link @click="openPasscodeLink" class="pr-4"
          >Open a new browser page to generate your SSO passcode
        </vscode-link>
        <v-mdi
          name="mdi-help-circle-outline"
          size="16"
          fill="var(--vscode-textLink-foreground, #006ab1)"
          v-tooltip="{
            content:
              ' Your SSO passcode is generated in a seperate browser page. <br />Copy it and paste it back in SAP Business Application Studio.',
            placement: 'right',
            class: 'tooltip-custom',
            size: '10%',
          }"
        >
        </v-mdi>
        <br /><br /><br />

        <span class="subtitle-color-field">Enter your SSO Passcode </span><span class="text-danger">*</span>
        <br />
        <vscode-text-field
          class="pt-8"
          size="47"
          placeholder="Enter your passcode"
          v-on:keyup="btnStatus"
          v-model="passcode"
          ref="psc"
          @input="(p) => (passcode = p.target.value)"
          :value="passcode"
        >
          <span
            slot="end"
            class="codicon codicon-clippy"
            @click="paste"
            v-tooltip="{
              content: 'Paste the generated passcode',
              placement: 'right',
              class: 'tooltip-custom',
              size: '10%',
            }"
          ></span>
        </vscode-text-field>
      </div>
      <br />

      <div id="credentials-div" :style="{ display: credentialsVisibility }">
        <span class="subtitle-color-field">Enter your username </span><span class="text-danger">*</span>
        <br />
        <vscode-text-field
          class="pt-8"
          v-on:keyup="btnStatus"
          v-model="username"
          :value="username"
          @input="(u) => (username = u.target.value)"
          size="50"
          placeholder="User ID"
        ></vscode-text-field>
        <br /><br />

        <span class="subtitle-color-field">Enter your password </span><span class="text-danger">*</span>
        <br />
        <vscode-text-field
          class="pt-8"
          v-on:keyup="btnStatus"
          v-model="password"
          :value="password"
          @input="(p) => (password = p.target.value)"
          type="password"
          size="50"
        ></vscode-text-field>
      </div>
      <br />
      <span :style="{ display: authFailedVisibility }" style="color: var(--vscode-errorForeground, #b80000)">
        <v-mdi name="mdi-close-circle-outline" size="16" fill="var(--vscode-errorForeground, #b80000)"></v-mdi>
        Authentication failed. Please try again.
        <br />
      </span>
      <br />
      <vscode-button @click="SigninClicked" v-bind:disabled="disableButton">Sign in</vscode-button>
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
        this.$refs.psc.value = this.passcode;
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
        }
      });
    },
    openPasscodeLink() {
      this.rpc.invoke("openPasscodeLink", [this.endpoint]).then(() => {
        console.log("opening passcode url");
      });
    },
  },
};
</script>

<style>
.cloud-foundry-title {
  font-weight: bold;
  float: left;
  padding-right: 16px;
}
.logged-in-visibility {
  float: left;
}
.sign-out-button {
  background-color: #444;
}
.text-danger {
  color: red;
}
.subtitle-color-field {
  color: var(--vscode-descriptionForeground, #717171);
}
/* mdi-icon */
svg.mdi-icon {
  vertical-align: bottom;
}
.tooltip .tooltip-inner {
  width: auto;
  background-color: black;
  color: white;
  font-size: 10px !important;
  padding: 8px 8px 8px 8px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.22) 5px 5px 5px;
  opacity: 1 !important;
}
.pr-4 {
  padding-right: 4px;
  padding-top: 16px;
}
.pt-8 {
  padding-top: 8px;
}
.pt-8::part(control)::placeholder {
  font-style: italic !important;
}
</style>
