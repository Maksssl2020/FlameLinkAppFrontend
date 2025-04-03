import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type EditorProps = {
  onChange: (value: string) => void;
};

const Editor = ({ onChange }: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            ["blockquote", "code-block"],
            ["image", "link"],
          ],
          clipboard: {
            matchVisual: false,
          },
        },
      });

      quillInstance.current.on("text-change", () => {
        onChange(quillInstance.current?.root.innerHTML || "");
      });
    }
  }, [onChange]);

  return (
    <div
      ref={editorRef}
      className={
        "text-white bg-gray-200 border-pink-100 border-b-2 border-x-2 h-full w-full rounded-b-lg"
      }
    />
  );
};

export default Editor;
