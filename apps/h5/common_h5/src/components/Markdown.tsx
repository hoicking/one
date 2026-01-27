import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}

      components={{
        // 段落样式
        p: ({node, ...props}) => (
          <p className="mb-4 leading-relaxed" {...props} />
        ),
        // 标题样式
        h1: ({node, ...props}) => (
          <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />
        ),
        h2: ({node, ...props}) => (
          <h2 className="text-xl font-bold mb-3 mt-5" {...props} />
        ),
        h3: ({node, ...props}) => (
          <h3 className="text-lg font-bold mb-3 mt-4" {...props} />
        ),
        h4: ({node, ...props}) => (
          <h4 className="text-base font-bold mb-2 mt-3" {...props} />
        ),
        // 列表样式
        ul: ({node, ...props}) => (
          <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />
        ),
        ol: ({node, ...props}) => (
          <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />
        ),
        li: ({node, ...props}) => (
          <li className="leading-relaxed" {...props} />
        ),
        // 引用样式
        blockquote: ({node, ...props}) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4" {...props} />
        ),
        // 代码块样式
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="rounded-lg overflow-hidden my-4">
              <div className="bg-gray-800 text-gray-400 text-xs px-4 py-1 flex justify-between items-center">
                <span>{match[1]}</span>
              </div>
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{ margin: 0, borderRadius: 0 }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-pink-500" {...props}>
              {children}
            </code>
          );
        },
        // 链接样式
        a: ({node, ...props}) => (
          <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
        ),
        // 分隔线样式
        hr: ({node, ...props}) => (
          <hr className="my-6 border-gray-200 dark:border-gray-700" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}