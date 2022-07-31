import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

const localVue = createLocalVue();

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

export function initComponent(component, propsData, isMount) {
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
