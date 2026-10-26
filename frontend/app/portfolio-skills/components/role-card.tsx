type ProjectCardProps = {
  onDelete?: () => void;
};

const RoleCard = ({ onDelete }: ProjectCardProps) => {
  return (
    <article className="w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-3 text-white shadow-sm select-none">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-5">
            Staff Frontend Engineer{" "}
            <span className="font-normal text-white/55">at</span> Veloce Data
            Platforms
          </h3>
          <p className="text-xs leading-4 text-white/50">2022 - 2025</p>
          <p className="text-xs leading-5 text-white/70">
            Spearheaded migration to Next.js enterprise micro-frontends and
            unified design tokens across 14 product squads.
          </p>
        </div>
        <button
          type="button"
          aria-label="Delete role"
          onClick={onDelete}
          className="mt-0.5 shrink-0 rounded p-1 text-white/40 transition-colors cursor-pointer hover:bg-red-950 focus-visible:ring-red-500 hover:text-red-400"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 7h16M10 11v6m4-6v6M5.5 7l.8 13h11.4l.8-13M9 7V4h6v3" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default RoleCard;
