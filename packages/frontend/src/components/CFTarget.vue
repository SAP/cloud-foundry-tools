<template>
  <div id="targetDiv" class="loggedIn">
    <vscode-divider role="separator" aria-orientation="horizontal" orientation="horizontal" />
    <br /><br />
    <div class="cloud-foundry-target">Cloud Foundry Target</div>
    <div :style="{ display: orgAndSpaceSetVisibility }" class="org-and-space-visibility">
      <v-mdi
        name="mdi-check-circle-outline"
        size="16"
        fill="var(--vscode-notebookStatusSuccessIcon-foreground, #388a34)"
      />
      Target is set to: {{ currentOrg }} org and {{ currentSpace }} space.
    </div>
    <br /><br />
    <span class="subtitle-color-field">Select Cloud Foundry Organization </span><span class="text-danger">*</span><br />
    <vscode-dropdown class="cf-drop-down mt-8" :value="selectedOrg.guid" @input="updateSelectedOrg">
      <vscode-option v-for="org in optOrganizations" :key="org.guid" :value="org.guid">{{ org.label }}</vscode-option>
    </vscode-dropdown>
    <br /><br />
    <span class="subtitle-color-field">Select Cloud Foundry Space </span><span class="text-danger">*</span><br />
    <vscode-dropdown class="cf-drop-down mt-8" :value="selectedSpace.guid" @input="updateSelectedSpace">
      <vscode-option v-for="space in optSpaces" :key="space.guid" :value="space.guid">{{ space.label }}</vscode-option>
    </vscode-dropdown>
    <br /><br />
    <vscode-button class="mt-8" :disabled="isApplyButtonDisabled" @click="setTarget"> Apply </vscode-button>
  </div>
</template>

<script>
import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeButton());
import * as _ from "lodash";
export default {
  name: "CFTarget",
  props: {
    target: {
      type: Object,
      required: true,
    },
    rpc: {
      type: Object,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
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
  computed: {
    loggedInVisibility() {
      return !this.isLoggedIn ? "none" : "";
    },
    orgAndSpaceSetVisibility() {
      return this.areOrgAndSpaceSet || (this.target.currentOrg && this.target.currentSpace) ? "" : "none";
    },
    isApplyButtonDisabled() {
      return (
        this.selectedOrg.label === undefined ||
        this.selectedSpace.label === undefined ||
        (this.selectedOrg.label === this.currentOrg && this.selectedSpace.label === this.currentSpace)
      );
    },
    optOrganizations() {
      return this.orgs;
    },
    optSpaces() {
      return this.spaces;
    },
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        this.getOrgAndSpace();
      }
    },
  },
  updated() {
    if (this.currentOrg === "") {
      this.currentOrg = this.target?.currentOrg;
    }
    if (this.currentSpace === "") {
      this.currentSpace = this.target?.currentSpace;
    }
  },
  methods: {
    updateSelectedOrg(newOrg) {
      this.selectedOrg = _.find(this.orgs, (org) => org.guid === newOrg.target.value);
      this.selectSpace(undefined);
    },
    updateSelectedSpace(newSpace) {
      this.selectedSpace = _.find(this.spaces, (space) => space.guid === newSpace.target.value);
    },
    getOrgAndSpace() {
      this.rpc.invoke("getSelectedTarget").then((target) => {
        this.rpc.invoke("getOrgs").then((orgs) => {
          const orgsWithSelected = orgs.map((org) => {
            if (org.label === target.org) {
              this.selectedOrg = {
                label: org.label,
                guid: org.guid,
                selected: true,
              };
            }
            return {
              guid: org.guid,
              label: org.label,
              selected: org.label === target.org,
            };
          });
          this.orgs = orgsWithSelected;

          // If no org could be selected from the current target, set it to the first org if exists
          if (!this.selectedOrg || !this.selectedOrg.guid) {
            if (this.orgs && this.orgs[0]) {
              this.selectedOrg = {
                label: this.orgs[0].label,
                guid: this.orgs[0].guid,
              };
            }
          }

          // If some org is selected - select a space with the current target information
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
        this.spaces = spacesWithSelected;
        // If a specific space should be selected - choose it, otherwise take the first if exists and fallback to empty selection object.
        this.selectedSpace =
          _.find(this.spaces, (space) => space.selected === true) ?? (this.spaces && this.spaces[0]) ?? {};
      });
    },
    setTarget() {
      const org = this.selectedOrg.label;
      const space = this.selectedSpace.label;

      this.rpc.invoke("applyTarget", [org, space]).then(() => {
        this.areOrgAndSpaceSet = true;
        this.currentOrg = org;
        this.currentSpace = space;
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
.cf-drop-down {
  min-width: 400px;
  width: fit-content;
}
</style>
