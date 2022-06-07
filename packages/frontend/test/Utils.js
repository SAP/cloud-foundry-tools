import { mount, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Form from "@sap-devx/inquirer-gui";

import { createLocalVue } from "@vue/test-utils";
const localVue = createLocalVue();

export function initComponent(component, propsData, isMount) {
  const options = {};
  Vue.use(Form, options);

  const initFunction = isMount === true ? mount : shallowMount;
  const props = {
    localVue,
    propsData: {
      ...propsData,
    },
  };
  return initFunction.call(this, component, props);
}

export function destroy(wrapper) {
  if (wrapper && wrapper.destroy) {
    wrapper.destroy();
  }
}
