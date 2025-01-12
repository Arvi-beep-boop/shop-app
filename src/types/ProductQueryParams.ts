export interface ProductQueryParams {
  title: string;
  categoryId?: number;
  order_by?: string;
  order?: 'ASC' | 'DESC';
}
