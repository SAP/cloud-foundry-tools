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
    <v-select class="mt-8" v-model="selectedOrg" :options="optOrganizations" :clearable="false" />
    <br /><br />
    <span class="subtitle-color-field">Select Cloud Foundry Space </span><span class="text-danger">*</span><br />
    <v-select class="mt-8" v-model="selectedSpace" :options="optSpaces" :clearable="false" />
    <br /><br />

    <vscode-button class="mt-8" @click="setTarget" v-bind:disabled="statusApplyButton">Apply</vscode-button>
  </div>
</template>
<script>
import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(vsCodeButton());

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
    selectedOrg(v) {
      this.selectSpace(undefined);
      this.$emit("updateTargetOrg", v.label);
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
    optOrganizations() {
      return this.orgs;
    },
    optSpaces() {
      return this.spaces;
    },
  },
  methods: {
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
          if (!this.selectedOrg || !this.selectedOrg.guid) {
            if (this.orgs && this.orgs[0]) {
              this.selectedOrg = {
                label: this.orgs[0].label,
                guid: this.orgs[0].guid,
              };
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
        this.selectedSpace.label = undefined;
        this.spaces = spacesWithSelected;
      });
    },
    changeSpace(val) {
      this.selectedSpace = this.spaces.find((space) => space.guid === val.target.value);
      this.selectedSpace.selected = true;
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
.v-select .vs__dropdown-toggle,
.vs__dropdown-menu {
  background: var(--vscode-editor-background);
  width: fit-content;
  min-width: 400px;
  border-color: var(--vscode-input-foreground);
}
.v-select,
.vs__selected {
  color: var(--vscode-editor-foreground);
}
.v-select .vs__open-indicator,
.vs__clear {
  fill: var(--vscode-scrollbarSlider-activeBackground);
}
</style>
