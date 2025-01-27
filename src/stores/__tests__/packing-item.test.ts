import { beforeEach, describe, expect, expectTypeOf, it } from 'vitest'
import { usePackingItemStore } from '@/stores/packing-item.ts'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import type { IPackingItem } from '@/types/checklist.ts'

describe('Packing Item Store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('should be initialized', () => {
    const store = usePackingItemStore()

    // item list
    expect(store.itemList).toEqual([])
    expectTypeOf(store.itemList).toEqualTypeOf<IPackingItem[]>()

    // set items
    expect(store.setItems).toBeDefined()
    expectTypeOf(store.setItems).toBeFunction()
    expectTypeOf(store.setItems).parameter(0).toEqualTypeOf<IPackingItem[]>()
    expectTypeOf(store.setItems).returns.toEqualTypeOf<IPackingItem[]>()

    // add item
    expect(store.addItem).toBeDefined()
    expectTypeOf(store.addItem).toBeFunction()
    expectTypeOf(store.addItem).parameter(0).toBeString()
    expectTypeOf(store.addItem).returns.toEqualTypeOf<IPackingItem | undefined>()

    // remove by id
    expect(store.removeItemById).toBeDefined()
    expectTypeOf(store.removeItemById).toBeFunction()
    expectTypeOf(store.removeItemById).parameter(0).toBeNumber()
    expectTypeOf(store.removeItemById).returns.toEqualTypeOf<IPackingItem[] | undefined>()

    // edit item by id
    expect(store.editItemById).toBeDefined()
    expectTypeOf(store.editItemById).toBeFunction()
    expectTypeOf(store.editItemById).parameter(0).toBeNumber()
    expectTypeOf(store.editItemById).parameter(1).toEqualTypeOf<Partial<IPackingItem>>()
    expectTypeOf(store.editItemById).returns.toEqualTypeOf<IPackingItem | undefined>()
  })

  describe('Set Items', () => {
    const firstBatch = [
      {
        id: 1,
        checklist_id: 1,
        name: 'name1',
        qty: 0,
        buy_qty: 0,
        prepared_qty: 0,
        prepared: false,
        packed_qty: 0,
        packed: false,
      },
      {
        id: 2,
        checklist_id: 1,
        name: 'name2',
        qty: 0,
        buy_qty: 0,
        prepared_qty: 0,
        prepared: false,
        packed_qty: 0,
        packed: false,
      },
    ]
    const secondBatch = [
      {
        id: 3,
        checklist_id: 2,
        name: 'name3',
        qty: 0,
        buy_qty: 0,
        prepared_qty: 0,
        prepared: false,
        packed_qty: 0,
        packed: false,
      },
      {
        id: 4,
        checklist_id: 2,
        name: 'name4',
        qty: 0,
        buy_qty: 0,
        prepared_qty: 0,
        prepared: false,
        packed_qty: 0,
        packed: false,
      },
    ]

    it('should reset item list', () => {
      const store = usePackingItemStore()
      const { setItems } = store
      const { itemList } = storeToRefs(store)

      expect(itemList.value).toEqual([])
      expectTypeOf(store.itemList).toEqualTypeOf<IPackingItem[]>()

      setItems(firstBatch)
      expect(itemList.value.length).toBe(2)
      expect(itemList.value).toStrictEqual(firstBatch)

      setItems(secondBatch)
      expect(itemList.value.length).toBe(2)
      expect(itemList.value).toStrictEqual(secondBatch)

      setItems([])
      expect(itemList.value.length).toBe(0)
      expect(itemList.value).toStrictEqual([])
    })
  })

  describe('Add Item', () => {
    const iterations = 10 // iterations for loops in tests below

    it('should not add with empty name', () => {
      const store = usePackingItemStore()
      const { addItem } = store
      const { itemList } = storeToRefs(store)

      expect(itemList.value).toEqual([])
      expectTypeOf(store.itemList).toEqualTypeOf<IPackingItem[]>()

      for (let i = 0; i < iterations; i++) {
        const result = addItem('')
        expect(result).toBeUndefined()
        expect(itemList.value.length).toBe(0)
      }

      expect(itemList.value.length).toBe(0)
    })

    // covered by v-model modifiers atm
    it.skip('should not add with space name', () => {
      const store = usePackingItemStore()
      const { addItem } = store
      const { itemList } = storeToRefs(store)

      expect(itemList.value).toEqual([])
      expectTypeOf(store.itemList).toEqualTypeOf<IPackingItem[]>()

      for (let i = 0; i < iterations; i++) {
        const result = addItem('    ')
        expect(result).toBeUndefined()
        expect(itemList.value.length).toBe(0)
      }

      expect(itemList.value.length).toBe(0)
    })

    it('should add only unique names', () => {
      const store = usePackingItemStore()
      const { addItem } = store
      const { itemList } = storeToRefs(store)

      expect(itemList.value).toEqual([])
      expectTypeOf(store.itemList).toEqualTypeOf<IPackingItem[]>()

      for (let i = 0; i < iterations; i++) {
        const result = addItem(`item${(i % 5) + 1}`)

        if (i < 5) {
          expect(result!.name).toBe(`item${(i % 5) + 1}`)
          expect(itemList.value.length).toBe((i % 5) + 1)
        } else {
          expect(result).toBeUndefined()
          expect(itemList.value.length).toBe(5)
        }
      }
    })

    it('should add items to list', () => {
      const store = usePackingItemStore()
      const { addItem } = store
      const { itemList } = storeToRefs(store)

      expect(itemList.value).toEqual([])
      expectTypeOf(store.itemList).toEqualTypeOf<IPackingItem[]>()

      for (let i = 0; i < iterations; i++) {
        const result = addItem(`item${i + 1}`)
        expect(result!.name).toBe(`item${i + 1}`)
        expect(itemList.value.length).toBe(i + 1)
      }

      expect(itemList.value.length).toBe(iterations)
    })
  })

  describe('Remove Item', () => {
    it('should not remove with invalid id', () => {
      const iterations = 10
      const store = usePackingItemStore()
      const { addItem, removeItemById } = store

      for (let i = 0; i < iterations; i++) addItem(`item${i + 1}`)

      const result = removeItemById(40)
      expect(result).toBeUndefined()
    })

    it('should remove item', () => {
      const iterations = 10
      const store = usePackingItemStore()
      const { addItem, removeItemById } = store

      for (let i = 0; i < iterations; i++) addItem(`item${i + 1}`)

      let result = removeItemById(7)
      expect(result!.length).toBe(1)
      expect(result![0].id).toBe(7)
      expect(result![0].name).toBe('item7')

      result = removeItemById(3)
      expect(result!.length).toBe(1)
      expect(result![0].id).toBe(3)
      expect(result![0].name).toBe('item3')
    })
  })

  describe('Edit Item', () => {
    it('should return undefined if not found', () => {
      const store = usePackingItemStore()
      const { addItem, editItemById } = store

      addItem('item1')
      const editedResult = editItemById(17, { qty: 10, packed: true })
      expect(editedResult).toBeUndefined()
    })

    it('should edit item', () => {
      const store = usePackingItemStore()
      const { addItem, editItemById } = store

      const result = addItem('item1')
      const editedResult = editItemById(result!.id, { qty: 10, packed: true })
      expect(editedResult!.id).toBe(1)
      expect(editedResult!.name).toBe('item1')
      expect(editedResult!.qty).toBe(10)
      expect(editedResult!.packed).toBe(true)
    })
  })
})
