import React from "react";

interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: number;
  className?: string;
  isWithBorder?: boolean;
}

const getInitials = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) {
    return (
      parts[0].charAt(0).toUpperCase() +
      (parts[0].length > 1 ? parts[0].charAt(1).toLowerCase() : "")
    );
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = React.memo(
  ({ uri, name = "U", size = 40, className = "", isWithBorder = false }) => {
    const initials = getInitials(name);

    const containerClasses = `
      relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary
      ${isWithBorder ? "border-2 border-white shadow-sm" : ""}
      ${className}
    `;

    const style = {
      width: size,
      height: size,
    };

    if (uri && uri.trim() !== "" && !uri.includes("placehold.co")) {
      return (
        <div className={containerClasses} style={style}>
          <img
            src={uri}
            alt={name}
            className="h-full w-full object-cover shrink-0"
            onError={(e) => {
              // Fallback if image fails to load
              (e.currentTarget as HTMLImageElement).style.display = "none";
              (e.currentTarget.parentElement as HTMLElement).innerHTML =
                `<span class="font-bold text-white uppercase" style="font-size: ${size * 0.4}px">${initials}</span>`;
            }}
          />
        </div>
      );
    }

    return (
      <div className={containerClasses} style={style}>
        <span
          className="font-bold text-white uppercase"
          style={{ fontSize: size * 0.4 }}
        >
          {initials}
        </span>
      </div>
    );
  },
);

export default Avatar;
