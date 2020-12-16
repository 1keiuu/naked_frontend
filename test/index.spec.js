import { mount } from '@vue/test-utils'
import NkdButton from '@/components/v1/atoms/NkdButton/NkdButton.vue'

describe('NkdButton', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(NkdButton)
    expect(wrapper.vm).toBeTruthy()
  })
})
