'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Markdown from '@/components/Markdown';

export default function AIChatPage() {
  const t = useTranslations();
  const [messages, setMessages] = useState<Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
  }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自适应文本区域高度
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustTextareaHeight();
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom('auto'); // 流式输出时使用 auto 行为，避免滚动卡顿
  }, [messages]);

  // 用于跟踪是否应该自动滚动（当用户手动滚动时暂停自动滚动）
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = element;
    // 当用户滚动到距离底部 100px 以内时，恢复自动滚动
    if (scrollHeight - scrollTop - clientHeight < 100) {
      setShouldAutoScroll(true);
    } else {
      setShouldAutoScroll(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://192.168.13.164:9112/api/dify/client/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          query: userMessage.content,
          inputs: {},
          userId: '123456789',
        }),
      });

      if (!response.ok) {
        throw new Error('API 响应失败');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法获取响应流.');
      }

      const decoder = new TextDecoder();
      let assistantContent = '';
      const tempMessageId = Date.now().toString() + '_temp';

      // 添加临时消息用于显示流式输出
      setMessages(prev => [...prev, {
        id: tempMessageId,
        role: 'assistant' as const,
        content: '',
      }]);

      let buffer = '';
      let lastUpdateTime = 0;
      const UPDATE_INTERVAL = 100; // 控制更新频率，每100ms更新一次
      
      while (true) {
        try {
          const { done, value } = await reader.read();
          if (done) {
            // 处理缓冲区中剩余的内容
            if (buffer) {
              processSSEBuffer(buffer);
            }
            // 确保最终内容被更新
            setMessages(prev => prev.map(msg => 
              msg.id === tempMessageId 
                ? { ...msg, content: assistantContent }
                : msg
            ));
            break;
          }

          // 不使用 { stream: true }，确保正确解码完整的 UTF-8 序列
          const chunk = decoder.decode(value);
          buffer += chunk;
          
          // 处理缓冲区中的完整行
          processSSEBuffer(buffer);

          // 控制更新频率，避免过于频繁的状态更新
          const now = Date.now();
          if (now - lastUpdateTime > UPDATE_INTERVAL) {
            // 更新临时消息内容
            setMessages(prev => prev.map(msg => 
              msg.id === tempMessageId 
                ? { ...msg, content: assistantContent }
                : msg
            ));
            lastUpdateTime = now;
          }
        } catch (error) {
          console.error('读取响应流时出错:', error);
          // 继续处理，避免整个流程中断
        }
      }

      // 1. 修改处理逻辑
      function processSSEBuffer(buf: string) {
        const lines = buf.split('\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.startsWith('data:')) continue;

          const rawData = trimmedLine.substring(5);
          if (rawData.trim() === '[DONE]') break;

          // 处理所有转义序列，确保Markdown语法正确解析
          // 1. 首先将\n转换为实际的换行符
          // 2. 处理其他可能的转义序列
          let processedData = rawData
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\\\/g, '\\');
          
          assistantContent += processedData;
        }
      }
      // 完成后，用最终内容替换临时消息
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessageId 
          ? { ...msg, id: Date.now().toString() }
          : msg
      ));

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant' as const,
        content: `错误: ${error instanceof Error ? error.message : '未知错误'}`,
      }]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">AI 对话</h1>
          <button
            onClick={() => {
              setMessages([]);
              setConversationId('');
            }}
            className="text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline px-3 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
          >
            新对话
          </button>
        </div>
      </header>

      {/* 消息区域 */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-32">
        <div 
          className="space-y-5 max-h-[calc(100vh-280px)] md:max-h-[calc(100vh-300px)] overflow-y-auto pr-2"
          onScroll={handleScroll}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-80 md:h-96 text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <span className="text-blue-600 dark:text-blue-400 text-3xl md:text-4xl">🤖</span>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                你好！我是你的 AI 助手
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md md:max-w-lg text-base md:text-lg">
                有什么我可以帮助你的吗？例如：&ldquo;PowerHill是什么&rdquo;、&ldquo;如何学习编程&rdquo;等问题。
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[70%] md:max-w-[65%] p-5 rounded-2xl ${message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-lg shadow-md'
                    } transition-all duration-300 ease-out`}
                >
                  <div className={`${message.role === 'user' ? '' : ''}`}>
                    <div className="prose dark:prose-invert prose-sm md:prose-base max-w-none break-words">
                      {/* 直接传入字符串内容 */}
                      <Markdown content={message.content} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* 输入区域 */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="输入你的问题...\n\n提示：按 Enter 发送消息，按 Shift+Enter 换行"
              className="w-full p-5 pr-24 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all md:text-base min-h-[90px] resize-none shadow-sm"
              disabled={loading}
              style={{ height: 'auto' }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-3 bottom-3 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {loading ? (
                <svg className="w-5 h-5 md:w-6 md:h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
