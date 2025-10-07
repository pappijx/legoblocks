import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ markdownContent }: { markdownContent: string }) => {
  const components = {
    // Headings
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold text-text mb-8 mt-12 first:mt-0 border-b border-border pb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-semibold text-text mb-6 mt-10">
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-medium text-text mb-4 mt-8">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-medium text-text mb-3 mt-6">{children}</h4>
    ),
    h5: ({ children }: { children: React.ReactNode }) => (
      <h5 className="text-lg font-medium text-text mb-2 mt-4">{children}</h5>
    ),
    h6: ({ children }: { children: React.ReactNode }) => (
      <h6 className="text-base font-medium text-text mb-2 mt-4">{children}</h6>
    ),

    // Paragraphs
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="text-text mb-4 leading-relaxed">{children}</p>
    ),

    // Lists
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-text">
        {children}
      </ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-text">
        {children}
      </ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="text-text leading-relaxed">{children}</li>
    ),

    // Links
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors duration-200"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),

    // Code
    code: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-surface text-text px-2 py-1 rounded-md text-sm font-mono">
            {children}
          </code>
        );
      }
      return (
        <code className="bg-surface text-text px-2 py-1 rounded-md text-sm font-mono">
          {children}
        </code>
      );
    },
    pre: ({ children }: { children: React.ReactNode }) => (
      <pre className="bg-surface border border-border rounded-lg p-4 mb-6 overflow-x-auto">
        {children}
      </pre>
    ),

    // Blockquotes
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-border bg-surface pl-6 py-4 mb-6 italic text-muted">
        {children}
      </blockquote>
    ),

    // Horizontal Rule
    hr: () => <hr className="border-border my-8" />,

    // Tables
    table: ({ children }: { children: React.ReactNode }) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse border border-border">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
      <thead className="bg-surface">{children}</thead>
    ),
    tbody: ({ children }: { children: React.ReactNode }) => (
      <tbody>{children}</tbody>
    ),
    tr: ({ children }: { children: React.ReactNode }) => (
      <tr className="border-b border-border hover:bg-surface/50 transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
      <th className="border border-border px-4 py-2 text-left font-semibold text-text">
        {children}
      </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
      <td className="border border-border px-4 py-2 text-text">{children}</td>
    ),

    // Strong and Emphasis
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-text">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-text">{children}</em>
    ),
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components as Components}
    >
      {markdownContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
