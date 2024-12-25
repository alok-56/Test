import React from "react";
import ReactMarkdown from "react-markdown";
import {
  CodeHighlighter,
  CodeHighlighterLanguage,
  CodeHighlighterTheme,
} from "code-highlighter-react";

interface IMarkdownRendererProps {
  message: string;
}

const MarkdownRenderer: React.FC<IMarkdownRendererProps> = ({ message }) => {
  const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : undefined;
      return !inline && match ? (
        <CodeHighlighter
          language={language?.toLowerCase() as CodeHighlighterLanguage}
          code={children}
          theme={CodeHighlighterTheme.Dark}
          copyButtonText={"Copy"}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return <ReactMarkdown components={components}>{message}</ReactMarkdown>;
};

export default MarkdownRenderer;
