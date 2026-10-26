import { ExternalLink, Trash2 } from "lucide-react";

const project = {
  title: "Cloud-Native CI/CD Platform",
  description:
    "Built an automated delivery platform to help engineering teams deploy services consistently across development, staging, and production environments.",
  techStack: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "Docker"],
  role: "DevOps Engineer — led the platform design, infrastructure as code, deployment pipelines, and monitoring setup.",
  outcome:
    "Standardized software releases with repeatable infrastructure and automated quality checks, reducing operational overhead.",
  metrics: [
    { value: "65%", label: "faster deployments" },
    { value: "40%", label: "less manual release work" },
    { value: "99.9%", label: "service availability" },
  ],
};

type ProjectCardProps = {
  onDelete?: () => void;
};

export default function ProjectCard({ onDelete }: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface-subtle px-4 py-3 text-neutral-100 shadow-sm shadow-black/30 select-none">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h2 className="text-sm font-semibold tracking-tight">
              {project.title}
            </h2>
            <span className="text-sm text-text-dimmed"> | </span>
            <p className="text-xs text-neutral-500">
              {project.role.split(" — ")[0]}
            </p>
          </div>
          <p className="mt-1 text-xs leading-5 text-neutral-400">
            {project.description}
          </p>
          <p className="mt-1 text-[11px] leading-5 text-neutral-500">
            {project.techStack.join(" · ")}
          </p>
          <p className="text-xs leading-5 text-neutral-300">
            <span className="font-medium text-neutral-200">Outcome:</span>{" "}
            {project.outcome}
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
          href="#live-demo"
          className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-black transition hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          Live
        </a>
        <a
          href="#github-repo"
          className="inline-flex items-center gap-1 rounded-md border border-neutral-700 px-2.5 py-1 text-xs font-semibold text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
        >
          GitHub repo
        </a>
      </div>
    </div>
  );
}
