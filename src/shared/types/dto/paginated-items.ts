export interface PaginatedItems<T> {
  itemCount: number
  itemsPerPage: number
  pageCount: number
  pageIndex: number
  items: T[]
}
