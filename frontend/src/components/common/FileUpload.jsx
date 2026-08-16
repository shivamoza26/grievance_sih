import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  X,
  RefreshCw,
} from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const FileUpload = ({
  file,
  onFileChange,
  onRemove,
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File size must be less than 5 MB.");
      return false;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      alert("Only JPG, PNG, WEBP and PDF files are allowed.");
      return false;
    }

    return true;
  };

  const processFile = (selectedFile) => {
    if (!validateFile(selectedFile)) return;

    onFileChange(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleInputChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleRemove = () => {
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onRemove();
  };

  const handleReplace = () => {
    inputRef.current?.click();
  };

  const formatFileSize = (size) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(0)} KB`;
    }

    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  };

  // --------------------------------------------------
  // FILE SELECTED
  // --------------------------------------------------

  if (file) {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">

        {/* Image Preview */}
        {preview && (
          <div className="relative bg-slate-100">

            <img
              src={preview}
              alt="Uploaded evidence preview"
              className="w-full max-h-64 object-contain"
            />

          </div>
        )}

        {/* File Information */}
        <div className="flex items-center gap-3 p-4">

          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            {file.type.startsWith("image/") ? (
              <ImageIcon size={19} />
            ) : (
              <FileText size={19} />
            )}
          </div>

          <div className="min-w-0 flex-1">

            <p className="text-sm font-medium text-slate-800 truncate">
              {file.name}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              {formatFileSize(file.size)}
              {" • "}
              {file.type === "application/pdf"
                ? "PDF document"
                : "Image"}
            </p>

          </div>

          <button
            type="button"
            onClick={handleReplace}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            <RefreshCw size={14} />
            Replace
          </button>

          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove file"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
          >
            <X size={17} />
          </button>

        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          onChange={handleInputChange}
          className="hidden"
        />

      </div>
    );
  }

  // --------------------------------------------------
  // EMPTY UPLOAD
  // --------------------------------------------------

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => {
        setIsDragging(false);
      }}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        mt-4
        flex
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-dashed
        px-6
        py-10
        text-center
        cursor-pointer
        transition-all
        duration-200
        ${
          isDragging
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
        }
      `}
    >

      <div
        className={`
          w-11
          h-11
          rounded-xl
          flex
          items-center
          justify-center
          transition
          ${
            isDragging
              ? "bg-blue-100 text-blue-700"
              : "bg-white text-slate-500 border border-slate-200"
          }
        `}
      >
        <Upload size={20} />
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-700">
        {isDragging
          ? "Drop your file here"
          : "Upload supporting evidence"}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Drag and drop or click to browse
      </p>

      <p className="mt-3 text-[11px] text-slate-400">
        JPG, PNG, WEBP or PDF • Maximum 5 MB
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.pdf"
        onChange={handleInputChange}
        className="hidden"
      />

    </div>
  );
};

export default FileUpload;