import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
interface IProps {
  content: string | undefined;
}

const FileSyntaxHighlighter = ({ content }: IProps) => {
  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem("fontSize");
    return savedFontSize ? JSON.parse(savedFontSize) : 20;
  });

  useEffect(() => {
    localStorage.setItem("fontSize", JSON.stringify(fontSize));
  }, [fontSize]);

  return (
    <>
      <div className="flex justify-end items-center mr-1">
        <button className="text-xl p-2 bg-[#1e1b2a]" onClick={() => setFontSize((prev: number) => prev - 1)}>
          -
        </button>
        <span className="text-md"> Font Size {fontSize} </span>
        <button className="text-xl p-2 bg-[#1e1b2a]" onClick={() => setFontSize((prev: number) => prev + 1)}>
          +
        </button>
      </div>
      <SyntaxHighlighter
        language="typescript"
        style={atomOneDarkReasonable}
        customStyle={{
          backgroundColor: "transparent",
          width: "100%",
          maxHeight: "100vh",
          overflow: "auto",
          fontSize: `${fontSize}px`,
        }}
        showLineNumbers
      >
        {String(content)}
      </SyntaxHighlighter>
    </>
  );
};

export default FileSyntaxHighlighter;
