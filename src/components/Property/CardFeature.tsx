interface CardFeatureProps {
  value: string | number;
  text: string;
  icon?: React.ReactNode;
}

export const CardFeature = ({ value, text, icon }: CardFeatureProps) => {
  return (
    <div className="flex flex-row items-center gap-1.5 sm:gap-2 p-1.5 px-2 sm:px-3 border border-gray-200/60 rounded-xl bg-white hover:bg-cyan-50/80 hover:border-cyan-200 transition-all duration-300 cursor-default group min-w-0">
      {icon && (
        <div className="text-cyan-600/80 group-hover:text-cyan-600 transition-colors shrink-0 scale-90 sm:scale-100">
          {icon}
        </div>
      )}
      <div className="flex flex-row items-baseline gap-1 overflow-hidden">
        <span className="text-sm sm:text-base font-bold text-gray-900 truncate">
          {value}
        </span>
        <span className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider truncate opacity-70">
          {text}
        </span>
      </div>
    </div>
  );
};
