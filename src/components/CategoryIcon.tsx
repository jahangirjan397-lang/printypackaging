type CategoryIconProps = {
  slug: string;
  size?: "sm" | "md" | "lg";
  tone?: "navy" | "orange";
  className?: string;
};

const iconSizes = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-20 w-20",
};

const iconTones = {
  navy: "text-[#07111F]",
  orange: "text-[#FF6A00]",
};

export default function CategoryIcon({
  slug,
  size = "md",
  tone = "navy",
  className = "",
}: CategoryIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${iconSizes[size]} ${iconTones[tone]} ${className}`}
    >
      {renderCategoryIcon(slug)}
    </span>
  );
}

function renderCategoryIcon(slug: string) {
  const commonProps = {
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-full w-full",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (slug) {
    case "luxury-packaging":
      return (
        <svg {...commonProps}>
          <path d="M10 25L20 13H44L54 25L32 53L10 25Z" />
          <path d="M10 25H54" />
          <path d="M20 13L32 25L44 13" />
          <path d="M32 25V53" />
          <path d="M49 8V16M45 12H53" />
        </svg>
      );

    case "food-packaging":
      return (
        <svg {...commonProps}>
          <path d="M13 23H51L47 52H17L13 23Z" />
          <path d="M19 23L24 13H40L45 23" />
          <path d="M25 37C25 30 31 26 40 27C40 35 34 40 25 40" />
          <path d="M25 40C23 36 21 33 18 31" />
        </svg>
      );

    case "retail-packaging":
      return (
        <svg {...commonProps}>
          <path d="M14 22H50L47 53H17L14 22Z" />
          <path d="M23 27V18C23 13 27 9 32 9C37 9 41 13 41 18V27" />
          <path d="M24 37H40" />
          <path d="M32 29V45" />
        </svg>
      );

    case "cosmetic-packaging":
      return (
        <svg {...commonProps}>
          <path d="M21 22H43V53H21V22Z" />
          <path d="M26 13H38V22H26V13Z" />
          <path d="M24 9H40" />
          <path d="M27 36H37" />
          <path d="M32 31V41" />
          <path d="M49 9V17M45 13H53" />
        </svg>
      );

    case "printing-finishing":
      return (
        <svg {...commonProps}>
          <path d="M9 21L32 10L55 21L32 32L9 21Z" />
          <path d="M9 32L32 43L55 32" />
          <path d="M9 43L32 54L55 43" />
          <path d="M49 7V15M45 11H53" />
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <path d="M10 21L32 10L54 21L32 32L10 21Z" />
          <path d="M10 21V43L32 54V32" />
          <path d="M54 21V43L32 54" />
        </svg>
      );
  }
}