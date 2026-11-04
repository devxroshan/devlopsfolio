import { ExternalLink, Trash2 } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  roles: string[];
  outcome: string;
  live: string;
  github: string;
  onDelete?: () => void;
};

export default function ProjectCard({
  title,
  description,
  techStack,
  roles,
  outcome,
  github,
  live,
  onDelete,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface-subtle px-4 py-3 text-neutral-100 shadow-sm shadow-black/30 select-none w-full">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
            <span className="text-sm text-text-dimmed"> | </span>
            {roles.map((role: string, index) => (
              <p key={role} className="text-xs text-neutral-500">
                {role}
                {index > 1 && " · "}
              </p>
            ))}
          </div>
          <p className="mt-1 text-xs leading-5 text-neutral-400">
            {description}
          </p>
          <p className="mt-1 text-[11px] leading-5 text-neutral-500">
            {techStack.join(" · ")}
          </p>
          <p className="text-xs leading-5 text-neutral-300">
            <span className="font-medium text-neutral-200">Outcome:</span>{" "}
            {outcome}
          </p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete project"
          className="shrink-0 rounded p-1 text-neutral-600 transition cursor-pointer hover:bg-red-950 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <a
          href={live}
          target="_blank"
          className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-black transition hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          Live
        </a>
        <a
          href={github}
          target="_blank"
          className="inline-flex items-center gap-1 rounded-md border border-neutral-700 px-2.5 py-1 text-xs font-semibold text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
        >
          GitHub repo
        </a>
      </div>
    </div>
  );
}
