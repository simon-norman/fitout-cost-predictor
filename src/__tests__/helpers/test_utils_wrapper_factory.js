import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

const createWrapper = (componentToTest) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
            
  const wrapper = shallowMount(componentToTest, {
    localVue,
  });
    
  return wrapper;
};

module.exports = {
  createWrapper,
};
