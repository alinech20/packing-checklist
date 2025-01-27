export interface IPackingItem {
  id?: number
  temp_id?: string
  checklist_id: number
  checklist_temp_id?: string
  name: string
  qty: number
  buy_qty: number
  prepared_qty: number
  prepared: boolean
  packed_qty: number
  packed: boolean
}

export interface IChecklist {
  id?: number
  temp_id?: string
  name: string
  items: IPackingItem[]
}
