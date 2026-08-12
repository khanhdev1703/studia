import logo from '../../assets/logo-1.png';

function Logo({
  size = 'md',
  showText = true,
}) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  return (
    <div className="flex items-center">
      <div
        className={`
          ${sizes[size]}
          flex shrink-0 items-center justify-center
          rounded-full
          border-2 border-[#6C5CE7]
          bg-white
        `}
      >
        <img
          src={logo}
          alt="LMS"
          className="h-[95%] w-[95%] object-contain"
        />
      </div>

      {showText && (
        <span className="ml-2 text-lg font-semibold text-[#252238]">
          LMS
        </span>
      )}
    </div>
  );
}

export default Logo;