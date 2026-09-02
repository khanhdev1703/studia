import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TableChartIcon from "@mui/icons-material/TableChart";

const getDocumentIcon = (
  fileName = "",
  mimeType = ""
) => {
  const extension = fileName
    .split(".")
    .pop()
    .toLowerCase();

  // PDF
  if (
    extension === "pdf" ||
    mimeType === "application/pdf"
  ) {
    return {
      Icon: PictureAsPdfIcon,
      className: "bg-red-50 text-red-500",
    };
  }

  // Word
  if (
    ["doc", "docx"].includes(extension)
  ) {
    return {
      Icon: DescriptionIcon,
      className: "bg-blue-50 text-blue-600",
    };
  }

  // PowerPoint
  if (
    ["ppt", "pptx"].includes(extension)
  ) {
    return {
      Icon: SlideshowIcon,
      className: "bg-orange-50 text-orange-500",
    };
  }

  // Excel
  if (
    ["xls", "xlsx"].includes(extension)
  ) {
    return {
      Icon: TableChartIcon,
      className: "bg-green-50 text-green-600",
    };
  }

  // Default
  return {
    Icon: DescriptionIcon,
    className: "bg-gray-100 text-gray-500",
  };
};

export default getDocumentIcon;