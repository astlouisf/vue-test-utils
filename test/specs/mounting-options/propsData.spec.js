import { shallowMount } from 'packages/test-utils/src'
import ComponentWithProps from '~resources/components/component-with-props.vue'
import { describeRunIf } from 'conditional-specs'

const baseData = {
  prop1: ['', '']
}

describeRunIf(process.env.TEST_ENV !== 'node', 'propsData', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ComponentWithProps, {
      propsData: baseData
    })
  })

  afterEach(() => {
    wrapper = null
  })

  describe('should not modify propsData between tests', () => {
    it('should have the correct props after modifying', async () => {
      expect(wrapper.vm.prop1).toHaveLength(2)
      await wrapper.setProps({ prop1: [] })
      expect(wrapper.vm.prop1).toHaveLength(0)
    })

    it('should have the default props despite being modified in the previous test', () => {
      expect(wrapper.vm.prop1).toHaveLength(2)
    })
  })
})

const Component = {
  template: '<div>{{ child }}</div>',
  props: ['child']
}

const childData = {
  child: 'aBc'
}

describeRunIf(process.env.TEST_ENV !== 'node', 'propsData {child}', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      propsData: childData
    })
  })

  afterEach(() => {
    wrapper = null
  })

  describe('should not modify propsData between tests', () => {
    it('should have the correct props after modifying', async () => {
      expect(wrapper.vm.child).toHaveLength(3)
      await wrapper.setProps({ child: '' })
      expect(wrapper.vm.child).toHaveLength(0)
    })

    it('should have the default props despite being modified in the previous test', () => {
      expect(wrapper.vm.child).toHaveLength(3)
    })
  })
})
