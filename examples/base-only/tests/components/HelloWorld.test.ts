import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from '~/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders component', () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.find('h2').text()).toContain('Hello, World!');
  });

  it('increments count when increase button is clicked', async () => {
    const wrapper = mount(HelloWorld);
    const increaseBtn = wrapper.findAll('button')[1]; // Increase button is second
    
    expect(wrapper.vm.count).toBe(0);
    await increaseBtn.trigger('click');
    expect(wrapper.vm.count).toBe(1);
  });

  it('decrements count when decrease button is clicked', async () => {
    const wrapper = mount(HelloWorld);
    const decreaseBtn = wrapper.findAll('button')[0]; // Decrease button is first
    
    expect(wrapper.vm.count).toBe(0);
    await decreaseBtn.trigger('click');
    expect(wrapper.vm.count).toBe(-1);
  });

  it('resets count when reset button is clicked', async () => {
    const wrapper = mount(HelloWorld);
    const increaseBtn = wrapper.findAll('button')[1];
    const resetBtn = wrapper.findAll('button')[2];
    
    await increaseBtn.trigger('click');
    await increaseBtn.trigger('click');
    expect(wrapper.vm.count).toBe(2);
    
    await resetBtn.trigger('click');
    expect(wrapper.vm.count).toBe(0);
  });

  it('displays correct status message based on count', async () => {
    const wrapper = mount(HelloWorld);
    
    // Initial state
    expect(wrapper.text()).toContain('No counts yet');
    
    // Positive
    await wrapper.vm.$el.querySelectorAll('button')[1].click();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Count is positive');
    
    // Reset
    await wrapper.vm.$el.querySelectorAll('button')[2].click();
    await wrapper.vm.$nextTick();
  });
});
