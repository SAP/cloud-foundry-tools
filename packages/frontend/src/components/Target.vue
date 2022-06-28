<template>
  <div class="loggedIn" id="targetDiv">
    <vscode-divider role="separator" aria-orientation="horizontal" orientation="horizontal"></vscode-divider>
    <br /><br />
    <div class="cloud-foundry-target">Cloud Foundry Target</div>
    <div :style="{ display: orgAndSpaceSetVisibility }" class="org-and-space-visibility">
      <v-mdi
        name="mdi-check-circle-outline"
        size="16"
        fill="var(--vscode-notebookStatusSuccessIcon-foreground, #388a34)"
      ></v-mdi>
      Target is set to: {{ currentOrg }} org and {{ currentSpace }} space.
    </div>
    <br /><br />
    <span class="subtitle-color-field">Select Cloud Foundry Organization </span><span class="text-danger">*</span><br />
    <vscode-dropdown class="mt-8 dropdown" position="below" @change="changeOrg">
      <vscode-option v-for="o in orgs" :key="o.guid" :value="o.guid" :selected="o.selected">{{
        o.label
      }}</vscode-option>
    </vscode-dropdown>
    <br /><br />
    <span class="subtitle-color-field">Select Cloud Foundry Space </span><span class="text-danger">*</span><br />
    <vscode-dropdown class="mt-8 dropdown" position="below" @change="changeSpace">
      <vscode-option v-for="s in spaces" :key="s.guid" :value="s.guid" :selected="s.selected">{{
        s.label
      }}</vscode-option>
    </vscode-dropdown>
    <br /><br />

    <vscode-button class="mt-8" @click="setTarget" v-bind:disabled="disableApplyButton">Apply</vscode-button>
  </div>
</template>
<script>
import { provideVSCodeDesignSystem, vsCodeButton, vsCodeDropdown, vsCodeOption } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeDropdown());
provideVSCodeDesignSystem().register(vsCodeButton());
provideVSCodeDesignSystem().register(vsCodeOption());

export default {
  name: "Target",
  props: ["target", "rpc", "isLoggedIn"],
  data() {
    return {
      areOrgAndSpaceSet: "",
      disableApplyButton: true,
      orgs: [],
      spaces: [],
      selectedOrg: {},
      selectedSpace: {},
      currentOrg: undefined,
      currentSpace: undefined,
    };
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) this.getOrgAndSpace();
    },
  },
  computed: {
    loggedInVisibility() {
      return !this.isLoggedIn ? "none" : "";
    },
    orgAndSpaceSetVisibility() {
      return !this.areOrgAndSpaceSet ? "none" : "";
    },
  },
  methods: {
    getOrgAndSpace() {
      this.rpc.invoke("getSelectedTarget").then((target) => {
        this.rpc.invoke("getOrgs").then((orgs) => {
          this.disableApplyButton = true;

          const orgsWithSelected = orgs.map((org) => {
            if (org.label === target.org) {
              this.selectedOrg = { label: org.label, guid: org.guid };
            }
            return {
              guid: org.guid,
              label: org.label,
              selected: org.label === target.org,
            };
          });
          this.orgs = [{ label: " ", guid: "0", selected: true }].concat(orgsWithSelected);

          if (!this.selectedOrg || !this.selectedOrg.guid) {
            if (this.orgs && this.orgs[0]) {
              this.selectedOrg = { label: this.orgs[0].label, guid: this.orgs[0].guid };
            }
          }
          if (this.selectedOrg && this.selectedOrg.guid) {
            this.selectSpace(target.space);
          }
        });
      });
    },
    selectSpace(targetSpace) {
      this.rpc.invoke("getSpaces", [this.selectedOrg.guid]).then((spaces) => {
        const spacesWithSelected = spaces.map((space) => {
          return {
            guid: space.guid,
            label: space.label,
            selected: targetSpace ? space.label === targetSpace : false,
          };
        });
        this.spaces = [{ label: " ", guid: "0", selected: true }].concat(spacesWithSelected);

        if (targetSpace == undefined || !this.selectedSpace || !this.selectedSpace.guid) {
          this.selectedSpace = {
            label: this.spaces[0].label,
            guid: this.spaces[0].guid,
          };
        }
      });
      this.statusApplyButton();
    },
    changeOrg(val) {
      this.selectedOrg = this.orgs.find((org) => org.guid === val.target.value);
      this.selectSpace(undefined);
      this.statusApplyButton();
    },
    changeSpace(val) {
      this.selectedSpace = this.spaces.find((space) => space.guid === val.target.value);
      this.statusApplyButton();
    },
    statusApplyButton() {
      if (this.selectedSpace.label == this.currentSpace) {
        this.disableApplyButton = true;
      } else if (this.selectedOrg.guid != "0" && this.selectedSpace.guid != "0") {
        this.disableApplyButton = false;
      } else {
        this.disableApplyButton = true;
      }
    },
    setEndpoint(val) {
      this.endpoint = val.target.value;
    },
    setTarget() {
      const org = this.selectedOrg.label;
      const space = this.selectedSpace.label;

      this.rpc.invoke("applyTarget", [org, space]).then(() => {
        this.areOrgAndSpaceSet = true;
        this.currentOrg = org;
        this.currentSpace = space;
        this.disableApplyButton = true;
        console.log("update target display");
      });
    },
  },
};
</script>

<style>
.subtitle-color-field {
  color: var(--vscode-editorCodeLens-foreground, #999999);
}
.mt-8 {
  margin-top: 8px;
}
.cloud-foundry-target {
  font-weight: bold;
  padding-right: 16px;
  float: left;
}
.org-and-space-visibility {
  float: left;
}
.text-danger {
  color: red;
}
.dropdown {
  width: 300px;
}
</style>
