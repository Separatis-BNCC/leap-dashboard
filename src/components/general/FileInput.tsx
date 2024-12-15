import { useRef, useState } from "react";
import { Button } from "../ui/Button";

type Props = {
  onChange?: (file?: File) => void;
  placeholder?: string;
};

export default function FileInput({
  onChange,
  placeholder = "Select file",
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState(placeholder);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name || placeholder);
    if (onChange) onChange(file);
  };

  return (
    <div
      role="input"
      className="flex items-center gap-4 border-[1px] border-lighter px-4 py-3 rounded-md justify-center"
    >
      <input
        type="file"
        className="absolute z-[-100] opacity-0"
        ref={inputRef}
        onChange={handleFileInput}
      />
      <i className="bx bx-file text-2xl  text-light"></i>
      <p className="text-light flex-1 truncate">{fileName}</p>
      <Button
        variant={"accent"}
        className="px-6"
        onClick={() => inputRef.current?.click()}
      >
        Change
      </Button>
    </div>
  );
}
