import { describe, expect, it } from 'vitest'
import { useTextUtils } from '@/composables/useTextUtils.ts'

describe('Text Utils Composable', () => {
  describe('Capitalize Word', () => {
    const { capitalizeWord } = useTextUtils()

    it('should not change numbers', () => {
      expect(capitalizeWord('734')).toEqual('734')
    })

    it('should not change if starting with number', () => {
      expect(capitalizeWord('7 dwarves')).toEqual('7 dwarves')
    })

    it('should not change if starting with space', () => {
      expect(capitalizeWord(' test')).toEqual(' test')
    })

    it('should keep final space', () => {
      expect(capitalizeWord('test ')).toEqual('Test ')
    })

    it('should capitalize first letter', () => {
      expect(capitalizeWord('something')).toEqual('Something')
    })

    it('should only capitalize first letter of first word', () => {
      expect(capitalizeWord('something else')).toEqual('Something else')
    })
  })

  describe('Capitalize Each Word', () => {
    const { capitalizeEachWord } = useTextUtils()

    it('should not change numbers', () => {
      expect(capitalizeEachWord('7 5ths')).toEqual('7 5ths')
    })

    it('should work even if starting with space', () => {
      expect(capitalizeEachWord(' something weird')).toEqual(' Something Weird')
      expect(capitalizeEachWord(' something   weirder')).toEqual(' Something   Weirder')
    })

    it('should capitalize first letter', () => {
      expect(capitalizeEachWord('something')).toEqual('Something')
    })

    it('should capitalize first letter of all words', () => {
      expect(capitalizeEachWord('hello world!')).toEqual('Hello World!')
    })
  })
})
