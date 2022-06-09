<template>
  <div class="loggedIn" id="targetDiv">
    <vscode-divider role="separator" aria-orientation="horizontal" orientation="horizontal"></vscode-divider>
    <br /><br />
    <div style="font-weight: bold; width: 13%; float: left">Cloud Foundry Target</div>
    <div :style="{ display: orgAndSpaceSetVisibility }" style="width: 23%; float: left">
      <v-mdi name="mdi-check-circle-outline" size="15" fill="green"></v-mdi>
      Organization and space are set.
    </div>
    <br /><br />
    <span style="color: var(--vscode-foreground, #cccccc)">Select Cloud Foundry Organization </span
    ><span class="text-danger" style="color: red">*</span><br />
    <vscode-dropdown position="below" @change="changeOrg">
      <vscode-option v-for="o in orgs" :key="o.guid" :value="o.guid" :selected="o.selected">{{
        o.label
      }}</vscode-option>
    </vscode-dropdown>
    <br /><br />
    <span style="color: var(--vscode-foreground, #cccccc)">Select Cloud Foundry Space </span
    ><span class="text-danger" style="color: red">*</span><br />
    <vscode-dropdown position="below" @change="changeSpace">
      <vscode-option v-for="s in spaces" :key="s.guid" :value="s.guid" :selected="s.selected">{{
        s.label
      }}</vscode-option>
    </vscode-dropdown>
    <br /><br />

    <vscode-button @click="setTarget">Apply</vscode-button>
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
          this.selectedOrg = undefined;
          this.selectedSpace = undefined;

          let orgsWithSelected = orgs.map((org) => {
            if (org.label === target.org) {
              this.selectedOrg = { label: org.label, guid: org.guid };
            }
            return {
              guid: org.guid,
              label: org.label,
              selected: org.label === target.org,
            };
          });
          this.orgs = orgsWithSelected;

          if (!this.selectedOrg || !this.selectedOrg.guid) {
            if (orgs && orgs[0]) {
              this.selectedOrg = { label: orgs[0].label, guid: orgs[0].guid };
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
        let spacesWithSelected = spaces.map((space) => {
          return {
            guid: space.guid,
            label: space.label,
            selected: targetSpace ? space.label === targetSpace : false,
          };
        });

        this.spaces = spacesWithSelected;
        if (!this.selectedSpace || !this.selectedSpace.guid) {
          this.selectedSpace = {
            label: spaces[0].label,
            guid: spaces[0].guid,
          };
        }
      });
    },
    changeOrg(val) {
      this.selectedOrg = this.orgs.find((org) => org.guid === val.target.value);
      this.selectSpace(undefined);
    },
    changeSpace(val) {
      this.selectedSpace = this.spaces.find((space) => space.guid === val.target.value);
    },
    setEndpoint(val) {
      this.endpoint = val.target.value;
    },
    setTarget() {
      const org = this.selectedOrg.label;
      const space = this.selectedSpace.label;

      this.rpc.invoke("applyTarget", [org, space]).then(() => {
        this.areOrgAndSpaceSet = true;
        console.log("update target display");
      });
    },
  },
};
</script>
