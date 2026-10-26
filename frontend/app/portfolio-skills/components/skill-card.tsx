import { Trash2 } from "lucide-react";

const SkillCard = () => {
  return (
    <div className="w-full bg-surface-elevated border border-border-subtle rounded-lg flex items-center justify-between px-3 py-2 select-none">
      <div className="w-fit flex flex-col items-start justify-center gap-1">
        <span className="font-semibold text-sm">Electronics</span>
        <div className="flex items-center justify-center">
            <span className="text-xs text-text-dimmed font-medium">Expert</span>
            <span className="text-xs text-text-dimmed font-medium"> · </span>
            <span className="text-xs text-text-dimmed font-medium"> 7 yrs </span>
        </div>
      </div>

      <Trash2 className="w-4 text-text-dimmed cursor-pointer active:scale-95 transition-all duration-300 hover:scale-105"/>
    </div>
  );
};

export default SkillCard;
