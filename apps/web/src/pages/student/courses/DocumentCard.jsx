import { Download } from "lucide-react";

import {
  formatFileSize,
  getDocumentType,
} from "../../../utils/document";

import getDocumentIcon from "../../../utils/getIcon";

const DocumentCard = ({
  document,
  onDownload,
  downloading = false,
}) => {
  if (!document) {
    return null;
  }

  const fileName =
    document.name || "Tài liệu";

  const fileType = getDocumentType(
    fileName,
    document.mimeType
  );

  const {
    Icon: DocumentIcon,
    className: iconClass,
  } = getDocumentIcon(
    fileName,
    document.mimeType
  );

  return (
    <div
      className="
                flex
                items-center
                gap-3
                rounded-md
                border
                border-[#E4E1F2]
                bg-white
                px-3.5
                py-3
                shadow-sm
            "
    >
      {/* File icon */}

      <div
        className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    ${iconClass}
                `}
      >
        <DocumentIcon
          sx={{
            fontSize: 20,
          }}
        />
      </div>

      {/* File information */}

      <div className="min-w-0 flex-1">
        <p
          className="
                        truncate
                        text-sm
                        font-medium
                        text-[#252238]
                    "
          title={fileName}
        >
          {fileName}
        </p>

        <div className="mt-1 flex items-center gap-2">
          {/* File type */}

          <span
            className="
                            rounded
                            bg-gray-100
                            px-1.5
                            py-0.5
                            text-[10px]
                            font-medium
                            text-gray-500
                        "
          >
            {fileType}
          </span>

          {/* File size */}

          {document.size > 0 && (
            <>
              <span className="text-[10px] text-gray-300">
                •
              </span>

              <span className="text-[10px] text-gray-400">
                {formatFileSize(
                  document.size
                )}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Download */}

      <button
        type="button"
        onClick={() =>
          onDownload?.(document)
        }
        disabled={
          downloading ||
          !onDownload
        }
        title="Tải xuống"
        className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    text-gray-400
                    transition
                    hover:bg-[#F0EEFF]
                    hover:text-[#6C5CE7]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
      >
        {downloading ? (
          <span
            className="
                            h-4
                            w-4
                            animate-spin
                            rounded-full
                            border-2
                            border-gray-200
                            border-t-[#6C5CE7]
                        "
          />
        ) : (
          <Download size={18} />
        )}
      </button>
    </div>
  );
};

export default DocumentCard;