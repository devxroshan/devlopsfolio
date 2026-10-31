import { Trash2, Edit } from "lucide-react";
import { SkillProficiency } from "../enum";

type SkillCardProps = {
  name: string;
  years_of_experience: number;
  proficiency: SkillProficiency;
  onDelete?: () => void;
};

const SkillCard = ({
  name,
  years_of_experience,
  proficiency,
  onDelete,
}: SkillCardProps) => {
  return (
    <div className="w-full bg-surface-elevated border border-border-subtle rounded-lg flex items-center justify-between px-3 py-2 select-none">
      <div className="w-fit flex flex-col items-start justify-center gap-1">
        <span className="font-semibold text-sm">{name}</span>
        <div className="flex items-center justify-center">
          <span className="text-xs text-text-dimmed font-medium">
            {proficiency[0].toUpperCase() + proficiency.slice(1)}
          </span>
          <span className="text-xs text-text-dimmed font-medium"> · </span>
          <span className="text-xs text-text-dimmed font-medium">
            {" "}
            {years_of_experience} yrs{" "}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Trash2
          className="w-4 text-text-dimmed cursor-pointer active:scale-95 transition-all duration-300 hover:scale-105"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default SkillCard;
