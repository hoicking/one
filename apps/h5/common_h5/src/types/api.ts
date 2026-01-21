// 通用 API 响应结构
export interface ApiResponse<T = unknown> {
  code: number;
  message: string | null;
  data: T | null;
}

// 分页数据结构（预留）
export interface PaginatedData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
