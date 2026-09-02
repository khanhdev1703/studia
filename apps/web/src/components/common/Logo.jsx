import { useNavigate } from "react-router-dom";
import LogoImage from "../../assets/logo.png";

const Logo = ({ size = 50, link, className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <img
      src={LogoImage}
      alt="Achan - Học tiếng Lào"
      width={size}
      height={size}
      onClick={handleClick}
      className={`${link ? "cursor-pointer" : ""} ${className}`.trim()}
    />
  );
};

export default Logo;