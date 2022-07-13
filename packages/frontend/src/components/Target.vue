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

    <vscode-button class="mt-8" @click="setTarget" v-bind:disabled="statusApplyButton">Apply</vscode-button>
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
      orgs: [],
      spaces: [],
      selectedOrg: {},
      selectedSpace: {},
      currentOrg: "",
      currentSpace: "",
    };
  },
  updated() {
    this.currentOrg === "" ? (this.currentOrg = this.target.currentOrg) : "";
    this.currentSpace === "" ? (this.currentSpace = this.target.currentSpace) : "";
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) this.getOrgAndSpace();
    },
    currentOrg(newOrg) {
      this.$emit("updateTargetOrg", newOrg);
    },
    currentSpace(newSpace) {
      this.$emit("updateTargetSpace", newSpace);
    },
  },
  computed: {
    loggedInVisibility() {
      return !this.isLoggedIn ? "none" : "";
    },
    orgAndSpaceSetVisibility() {
      return this.areOrgAndSpaceSet || (this.target.currentOrg && this.target.currentSpace) ? "" : "none";
    },
    statusApplyButton() {
      return (
        this.selectedOrg.label === undefined ||
        this.selectedSpace.label === undefined ||
        (this.selectedOrg.label === this.currentOrg && this.selectedSpace.label === this.currentSpace)
      );
    },
  },
  methods: {
    getOrgAndSpace() {
      this.rpc.invoke("getSelectedTarget").then((target) => {
        this.rpc.invoke("getOrgs").then((orgs) => {
          const orgsWithSelected = orgs.map((org) => {
            if (org.label === target.org) {
              this.selectedOrg = { label: org.label, guid: org.guid, selected: true };
            }
            return {
              guid: org.guid,
              label: org.label,
              selected: org.label === target.org,
            };
          });
          if (!this.currentOrg) {
            this.orgs = [{ label: " ", guid: "0", selected: false }].concat(orgsWithSelected);
          } else {
            this.orgs = orgsWithSelected;
          }

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
        const spacesWithSelected = Array.isArray(spaces)
          ? spaces.map((space) => {
              return {
                guid: space.guid,
                label: space.label,
                selected: targetSpace ? space.label === targetSpace : false,
              };
            })
          : [];
        if (!this.currentSpace || targetSpace == undefined) {
          this.spaces = [{ label: " ", guid: "0", selected: true }].concat(spacesWithSelected);
          this.selectedSpace.label = undefined;
        } else {
          this.spaces = spacesWithSelected;
        }
      });
    },
    changeOrg(val) {
      this.selectedOrg = this.orgs.find((org) => org.guid === val.target.value);
      this.selectedOrg.selected = true;
      this.selectSpace(undefined);
    },
    changeSpace(val) {
      this.selectedSpace = this.spaces.find((space) => space.guid === val.target.value);
      this.selectedSpace.selected = true;
    },
    setTarget() {
      const org = this.selectedOrg.label;
      const space = this.selectedSpace.label;

      this.rpc.invoke("applyTarget", [org, space]).then(() => {
        this.areOrgAndSpaceSet = true;
        this.currentOrg = org;
        this.currentSpace = space;
        console.log("update target display");
      });
    },
  },
};
</script>

<style>
.subtitle-color-field {
  color: var(--vscode-descriptionForeground, #717171);
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
