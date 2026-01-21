'use client';

import { useState } from 'react';
import { demoService } from '@/services/demo';
import { BrandItem } from '@/types/device';

export default function ApiDemo() {
  const [data, setData] = useState<BrandItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await demoService.getDict(['brand']);
      
      setData(result.data?.brand || []);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : typeof err === 'string' ? err : '请求失败'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">API 调用演示</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          当前 API 地址: <code className="bg-gray-100 px-1 py-0.5 rounded">{process.env.API_URL || '未设置'}</code>
        </p>
        <button
          onClick={handleFetch}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {loading ? '加载中...' : '测试接口请求'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md mb-4 text-sm">
          ❌ 错误: {error}
        </div>
      )}

      {data && (
        <div className="p-4 bg-green-50 rounded-md">
          <h3 className="text-green-800 font-medium mb-2">请求成功</h3>
          <pre className="text-xs text-green-700 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
