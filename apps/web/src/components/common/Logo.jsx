import logo from '../../assets/logo-1.png';

function Logo({
  size = 'md',
  showText = true,
  border = true,
  borderColor = '#6C5CE7',
  borderWidth = 2,
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
          bg-white
        `}
        style={{
          border: border
            ? `${borderWidth}px solid ${borderColor}`
            : 'none',
        }}
      >
        <img
          src={logo}
          alt="Studia"
          className="h-[95%] w-[95%] object-contain"
        />
      </div>

      {showText && (
        <span className="ml-2 text-lg font-semibold text-[#252238]">
          Studia
        </span>
      )}
    </div>
  );
}

export default Logo;