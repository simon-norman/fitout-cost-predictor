import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';

// Stub out Window.requestAnimationFrame, which is called when Vuetify components
// mounted as part of the test. This is because JSDOM does not implement requestAnimationFrame
window.requestAnimationFrame = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

const createWrapper = (componentToTest) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuelidate);

  const wrapper = mount(componentToTest, {
    localVue,
  });
    
  return wrapper;
};

module.exports = {
  createWrapper,
};
