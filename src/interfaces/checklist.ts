export interface IPackingItem {
  id: number
  checklist_id: number
  name: string
  qty: number
  buy_qty: number
  prepared_qty: number
  prepared: boolean
  packed_qty: number
  packed: boolean
}

export interface IChecklist {
  id: number
  name: string
  items: IPackingItem[]
}
