"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Copy,
  ExternalLink,
  Heart,
  MapPin,
  MessageSquare,
  Globe2,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

export interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  years: number;
}

export interface Project {
  title: string;
  role: string;
  year: string;
  impact: string;
  description: string;
  architecture: string;
  stack: string[];
  demoUrl: string;
  repoUrl: string;
}

export interface WorkExperience {
  company: string;
  monogram: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface DeveloperProfile {
  name: string;
  title: string;
  location: string;
  timezone: string;
  avatar: string;
  rate: number;
  availability: string;
  summary: string;
  links: {
    github: string;
    linkedin: string;
    portfolio: string;
    twitter: string;
  };
  match: {
    overall: number;
    stack: number;
    seniority: number;
    budget: number;
    availability: number;
  };
  skills: Record<string, Skill[]>;
  projects: Project[];
  experience: WorkExperience[];
}

const profile: DeveloperProfile = {
  name: "Alex Morgan",
  title: "Staff Distributed Systems & AI Engineer",
  location: "San Francisco, CA",
  timezone: "America/Los_Angeles",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=85",
  rate: 165,
  availability: "Available now",
  summary:
    "Engineering leader who turns ambiguous platform challenges into resilient, measurable systems. I build high-throughput infrastructure and practical AI products, while helping teams raise the bar on ownership, observability, and delivery.",
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    portfolio: "https://example.com",
    twitter: "https://x.com",
  },
  match: {
    overall: 94,
    stack: 98,
    seniority: 92,
    budget: 90,
    availability: 100,
  },
  skills: {
    Frontend: [
      { name: "TypeScript", level: "Expert", years: 9 },
      { name: "React", level: "Expert", years: 8 },
      { name: "Next.js", level: "Advanced", years: 5 },
      { name: "GraphQL", level: "Advanced", years: 6 },
    ],
    "Backend & Systems": [
      { name: "Go", level: "Expert", years: 8 },
      { name: "Python", level: "Expert", years: 9 },
      { name: "Kafka", level: "Advanced", years: 7 },
      { name: "PostgreSQL", level: "Expert", years: 10 },
    ],
    "Cloud & DevOps": [
      { name: "AWS", level: "Expert", years: 8 },
      { name: "Kubernetes", level: "Advanced", years: 6 },
      { name: "Terraform", level: "Advanced", years: 5 },
      { name: "Observability", level: "Advanced", years: 7 },
    ],
    "AI / ML & Data": [
      { name: "LLM systems", level: "Advanced", years: 3 },
      { name: "PyTorch", level: "Advanced", years: 5 },
      { name: "Vector search", level: "Advanced", years: 3 },
      { name: "Spark", level: "Intermediate", years: 4 },
    ],
  },
  projects: [
    {
      title: "Realtime Signal Platform",
      role: "Principal Engineer · Platform",
      year: "2024",
      impact: "Scaled event throughput 4.2× to 120k RPS.",
      description:
        "A multi-tenant event backbone powering real-time product analytics for 18M users.",
      architecture:
        "Partitioned Kafka streams, Go ingestion services, and a hot/cold data path on AWS.",
      stack: ["Go", "Kafka", "Kubernetes", "ClickHouse", "AWS"],
      demoUrl: "https://example.com",
      repoUrl: "https://github.com",
    },
    {
      title: "Support Copilot",
      role: "Tech Lead · Applied AI",
      year: "2023",
      impact: "Cut median resolution time by 37% across 240k conversations.",
      description:
        "A grounded assistant that helps support teams find accurate answers in internal knowledge.",
      architecture:
        "Retrieval pipeline with hybrid search, evaluated prompts, and human feedback loops.",
      stack: ["Python", "FastAPI", "PostgreSQL", "OpenAI", "React"],
      demoUrl: "https://example.com",
      repoUrl: "https://github.com",
    },
  ],
  experience: [
    {
      company: "Northstar Labs",
      monogram: "N",
      role: "Staff Software Engineer",
      period: "2021 — Present",
      location: "San Francisco · Remote",
      highlights: [
        "Led a 9-person platform group; improved service availability to 99.99%.",
        "Designed event infrastructure sustaining 120k requests per second.",
        "Introduced paved roads and SLOs, reducing production incident time by 43%.",
      ],
    },
    {
      company: "Orbit Commerce",
      monogram: "O",
      role: "Senior Backend Engineer",
      period: "2017 — 2021",
      location: "New York · Hybrid",
      highlights: [
        "Rebuilt checkout services for 3× seasonal traffic with no downtime.",
        "Mentored engineers and established the team's architecture review practice.",
      ],
    },
  ],
};

const tabs = [
  "Overview & stack",
  "Featured projects",
  "Work history",
  "Credentials & metrics",
] as const;
type Tab = (typeof tabs)[number];

function IconButton({
  label,
  children,
  onClick,
  active = false,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
        active
          ? "border-rose-400/20 bg-rose-400/10 text-rose-300"
          : "border-white/8 text-neutral-400 hover:border-white/20 hover:bg-white/6 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function SectionHeading({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <h2 className="text-sm font-semibold tracking-wide text-white">
        {title}
      </h2>
      {detail && <span className="text-[11px] text-neutral-500">{detail}</span>}
    </div>
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/2.5 px-2.5 py-2">
      <span className="text-xs font-medium text-neutral-200">{skill.name}</span>
      <span className="rounded bg-white/6 px-1.5 py-0.5 text-[9px] text-neutral-400">
        {skill.level}
      </span>
      <span className="ml-auto whitespace-nowrap font-mono text-[10px] text-neutral-500">
        {skill.years}y
      </span>
    </div>
  );
}

export default function ProfilePreview() {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState("");
  const [localTime, setLocalTime] = useState("");
  const monthlyRetainer = useMemo(
    () => (profile.rate * 160).toLocaleString(),
    [],
  );

  useEffect(() => {
    const updateTime = () =>
      setLocalTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: profile.timezone,
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
      );
    updateTime();
    const timer = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const copyProfile = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("Profile link copied");
    } catch {
      setToast("Unable to copy link");
    }
    window.setTimeout(() => setToast(""), 2400);
  };

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-neutral-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center justify-between border-b border-white/8 pb-4">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
            <Code2 size={16} className="text-neutral-200" /> DevMatch{" "}
            <span className="text-neutral-700">/</span> Talent
          </div>
          <div className="flex items-center gap-2">
            <IconButton label="Copy profile link" onClick={copyProfile}>
              <Copy size={15} />
            </IconButton>
            <IconButton
              label={saved ? "Remove from shortlist" : "Add to shortlist"}
              active={saved}
              onClick={() => setSaved(!saved)}
            >
              {saved ? (
                <Heart size={15} fill="currentColor" />
              ) : (
                <BookmarkIcon />
              )}
            </IconButton>
          </div>
        </header>

        <div className="grid items-start gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-6">
            <section className="rounded-xl border border-white/9 bg-surface-subtle p-5">
              <div className="relative mb-4 inline-block">
                <img
                  src={profile.avatar}
                  alt={`${profile.name} profile`}
                  className="h-18.5 w-18.5 rounded-2xl border border-white/10 object-cover"
                />
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-surface-subtle bg-emerald-400" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-white">
                  {profile.name}
                </h1>
                <BadgeCheck
                  size={17}
                  className="text-sky-400"
                  aria-label="Verified developer"
                />
              </div>
              <p className="mt-1 text-sm leading-5 text-neutral-400">
                {profile.title}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-[11px] text-neutral-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} />
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 size={12} />
                  {localTime} local
                </span>
              </div>
              <div className="mt-4 space-y-2 border-t border-white/[0.07] pt-4">
                <div className="flex items-center gap-2 text-[11px] text-sky-300">
                  <ShieldCheck size={14} /> Verified DevMatch Pro
                </div>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <CheckCircle2 size={14} className="text-emerald-400" /> GitHub
                  activity verified
                </div>
              </div>
              <div className="mt-5 rounded-lg border border-white/[0.07] bg-[#111] p-3.5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-2xl font-semibold text-white">
                      ${profile.rate}
                      <span className="text-xs font-normal text-neutral-500">
                        {" "}
                        / hr
                      </span>
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-500">
                      ${monthlyRetainer} / month · 160h
                    </p>
                  </div>
                  <span className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-2 py-1 text-[10px] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {profile.availability}
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white text-xs font-semibold text-black transition hover:bg-neutral-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                >
                  <BriefcaseBusiness size={14} /> Hire / Send proposal{" "}
                  <ArrowUpRight size={14} />
                </button>
                <button
                  type="button"
                  className="mt-2 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-xs font-medium text-neutral-300 transition hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <MessageSquare size={14} /> Direct message
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Find Alex on
                </span>
                <div className="flex gap-1.5">
                  <SocialLink label="GitHub" href={profile.links.github}>
                    {/* <Github size={14} /> */}
                    <></>
                  </SocialLink>
                  <SocialLink label="LinkedIn" href={profile.links.linkedin}>
                    {/* <Linkedin size={14} />/ */}
                    <></>
                  </SocialLink>
                  <SocialLink label="Portfolio" href={profile.links.portfolio}>
                    <Globe2 size={14} />
                  </SocialLink>
                  <SocialLink label="X / Twitter" href={profile.links.twitter}>
                    <X size={14} />
                  </SocialLink>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-white/9 bg-surface-subtle p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Sparkles size={14} className="text-violet-300" /> Match score
                </div>
                <span className="font-mono text-lg font-semibold text-white">
                  {profile.match.overall}
                  <span className="text-xs text-neutral-500">%</span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-linear-to-r from-violet-500 to-sky-400"
                  style={{ width: `${profile.match.overall}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] text-neutral-500">
                Strong fit for your engineering brief
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <MatchItem label="Tech stack" value={profile.match.stack} />
                <MatchItem label="Seniority" value={profile.match.seniority} />
                <MatchItem label="Budget" value={profile.match.budget} />
                <MatchItem
                  label="Availability"
                  value={profile.match.availability}
                />
              </div>
            </section>
          </aside>

          <section className="min-w-0 overflow-hidden rounded-xl border border-white/9 bg-surface-subtle">
            <div className="border-b border-white/8 px-4 pt-2 sm:px-6">
              <div
                role="tablist"
                aria-label="Developer profile sections"
                className="flex gap-5 overflow-x-auto"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative whitespace-nowrap py-3 text-xs transition focus-visible:outline-none focus-visible:text-white ${activeTab === tab ? "font-medium text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 sm:p-6">
              {activeTab === "Overview & stack" && <Overview />}
              {activeTab === "Featured projects" && <Projects />}
              {activeTab === "Work history" && <WorkHistory />}
              {activeTab === "Credentials & metrics" && <Credentials />}
            </div>
          </section>
        </div>
      </div>
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-white/10 bg-[#161616] px-4 py-3 text-xs text-white shadow-2xl"
        >
          <Check size={14} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </main>
  );
}

function BookmarkIcon() {
  return <Star size={15} />;
}

function SocialLink({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-neutral-400 transition hover:border-white/20 hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      {children}
    </a>
  );
}

function MatchItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-white/[0.035] px-2.5 py-2">
      <div className="flex justify-between gap-1 text-[10px]">
        <span className="text-neutral-500">{label}</span>
        <span className="font-mono text-neutral-300">{value}%</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-neutral-400"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-7">
      <section>
        <SectionHeading title="Engineering perspective" detail="ABOUT" />
        <p className="max-w-3xl text-sm leading-6 text-neutral-400">
          {profile.summary}
        </p>
      </section>
      <section>
        <SectionHeading
          title="Technical skill matrix"
          detail="4 DOMAINS · 16 SKILLS"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {Object.entries(profile.skills).map(([group, skills]) => (
            <div key={group}>
              <h3 className="mb-2.5 text-[11px] font-medium text-neutral-300">
                {group}
              </h3>
              <div className="grid gap-1.5">
                {skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-4 text-[10px] text-neutral-500">
        <ShieldCheck size={13} className="text-sky-400" /> Self-reported skills
        are validated against portfolio work and references.
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="space-y-4">
      <SectionHeading
        title="Featured portfolio"
        detail="SELECTED WORK · 2023—2024"
      />
      {profile.projects.map((project) => (
        <article
          key={project.title}
          className="rounded-xl border border-white/8 bg-[#0D0D0D] p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">
                  {project.title}
                </h3>
                <span className="rounded border border-white/8 px-1.5 py-0.5 font-mono text-[9px] text-neutral-500">
                  {project.year}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-neutral-500">
                {project.role}
              </p>
            </div>
            <span className="rounded-md border border-emerald-400/15 bg-emerald-400/6 px-2.5 py-1.5 text-[11px] font-medium text-emerald-300">
              {project.impact}
            </span>
          </div>
          <p className="mt-4 text-xs leading-5 text-neutral-400">
            {project.description}
          </p>
          <div className="mt-3 rounded-lg border border-white/6 bg-black/40 p-3">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-neutral-500">
              Architecture
            </span>
            <p className="mt-1 text-[11px] leading-5 text-neutral-400">
              {project.architecture}
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/[0.07] px-2 py-1 text-[10px] text-neutral-400"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <ProjectLink
                href={project.demoUrl}
                icon={<ExternalLink size={12} />}
              >
                Live demo
              </ProjectLink>
              <ProjectLink href={project.repoUrl} icon={<>Repo</>}>
                Repository
              </ProjectLink>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-white/8 px-2.5 py-1.5 text-[10px] text-neutral-300 transition hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      {icon}
      {children}
    </a>
  );
}

function WorkHistory() {
  return (
    <div>
      <SectionHeading title="Work history" detail="9+ YEARS EXPERIENCE" />
      <div className="relative ml-4 border-l border-white/10">
        {profile.experience.map((job, index) => (
          <article
            key={job.company}
            className={`relative pb-8 pl-7 ${index === profile.experience.length - 1 ? "pb-0" : ""}`}
          >
            <span className="absolute -left-4.25 top-0 flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-[#111] text-[11px] font-semibold text-neutral-300">
              {job.monogram}
            </span>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {job.company}
                </h3>
                <p className="mt-1 text-xs text-neutral-400">{job.role}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-white/4 px-2 py-1 font-mono text-[10px] text-neutral-400">
                <CalendarDays size={11} />
                {job.period}
              </span>
            </div>
            <p className="mt-1 text-[10px] text-neutral-600">{job.location}</p>
            <ul className="mt-3 space-y-2">
              {job.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-xs leading-5 text-neutral-400"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function Credentials() {
  const metrics = [
    ["Total repositories", "86"],
    ["PRs merged", "1,240"],
    ["Code review rating", "4.9 / 5"],
    ["Delivered on time", "96%"],
  ];
  return (
    <div className="space-y-7">
      <section>
        <SectionHeading title="Education" detail="ACADEMIC BACKGROUND" />
        <div className="rounded-lg border border-white/8 bg-[#0D0D0D] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xs font-semibold text-white">
                M.S. Computer Science
              </h3>
              <p className="mt-1 text-[11px] text-neutral-400">
                University of California, Berkeley
              </p>
              <p className="mt-1 text-[10px] text-neutral-600">
                Distributed Systems · 2017
              </p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-neutral-400">
              <BriefcaseBusiness size={15} />
            </span>
          </div>
        </div>
      </section>
      <section>
        <SectionHeading title="Certifications" detail="VERIFIED CREDENTIALS" />
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            ["AWS", "Solutions Architect · Professional"],
            ["Google Cloud", "Professional Cloud Architect"],
            ["CNCF", "Certified Kubernetes Administrator"],
          ].map(([issuer, name]) => (
            <div
              key={issuer}
              className="rounded-lg border border-white/8 bg-[#0D0D0D] p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white">{issuer}</span>
                <BadgeCheck size={14} className="text-sky-400" />
              </div>
              <p className="mt-2 text-[10px] leading-4 text-neutral-500">
                {name}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <SectionHeading title="Engineering metrics" detail="CAREER TO DATE" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {metrics.map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-white/8 bg-[#0D0D0D] p-3"
            >
              <p className="font-mono text-xl font-semibold text-white">
                {value}
              </p>
              <p className="mt-1 text-[10px] leading-4 text-neutral-500">
                {label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-neutral-600">
          Metrics verified through connected GitHub activity and project
          references.
        </p>
      </section>
    </div>
  );
}
