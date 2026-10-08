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
      className: "bg-[#FEF2F2] text-[#DC2626]",
    };
  }

  // Word
  if (["doc", "docx"].includes(extension)) {
    return {
      Icon: DescriptionIcon,
      className: "bg-[#EFF6FF] text-[#2563EB]",
    };
  }

  // PowerPoint
  if (["ppt", "pptx"].includes(extension)) {
    return {
      Icon: SlideshowIcon,
      className: "bg-[#FFF7ED] text-[#EA580C]",
    };
  }

  // Excel
  if (["xls", "xlsx"].includes(extension)) {
    return {
      Icon: TableChartIcon,
      className: "bg-[#F0FDF4] text-[#16A34A]",
    };
  }

  // Default
  return {
    Icon: DescriptionIcon,
    className: "bg-[#F4F4F5] text-[#71717A]",
  };
};

export default getDocumentIcon;