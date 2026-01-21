import { apiClient } from '@/lib/api-client';
import type { ApiResponse } from '@/types/api';
import { BrandItem } from '@/types/device';

// export interface DemoData {
//   id: number;
//   name: string;
//   // 根据实际接口返回定义
//   [key: string]: any;
// }

export const demoService = {
  // 示例：获取数据
  // getData: () => {
  //   return apiClient.get<DemoData>('/api/demo'); // 替换为实际接口路径
  // },

  // // 示例：发送数据
  // postData: (data: { name: string }) => {
  //   return apiClient.post<{ success: boolean }>('/api/demo', data);
  // },
  
  // // 示例：带参数获取
  // search: (query: string) => {
  //   return apiClient.get<DemoData[]>('/api/search', { q: query });
  // },
  getDict: (arry: Array<string>) => {
    return apiClient.post<ApiResponse<{ [key: string]: BrandItem[] }>>('/ecenter/sys/dict/data/listByDictTypeArray', arry);
  }
};
