"use client";
import Image from "next/image";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  ExternalLink,
  MapPin,
  X,
} from "lucide-react";
import { Dispatch, useState } from "react";

import Button from "@/app/components/Button";
import { Job, Project, Skill } from "../type";
import { Developer } from "@/app/auth/type";
import { User } from "@/app/auth/type";

const tabs = ["Overview & stack", "Featured projects", "Work history"] as const;
type Tab = (typeof tabs)[number];

type ProjectWithId = Project & { _id: string };
type SkillWithId = Skill & { _id: string; user_id: string };

type Profile = Omit<User, "password" | "is_email_verified" | "is_client"> &
  Omit<Developer, "dicipline">;

type ProfilePreviewProps = {
  user: Profile;
  skills: SkillWithId[];
  projects: ProjectWithId[];
  jobs: Job[];
  setIsPreview: Dispatch<React.SetStateAction<boolean>>;
};

const ProfilePreviw = ({
  user,
  skills,
  projects,
  jobs,
  setIsPreview,
}: ProfilePreviewProps) => {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/60 p-4 backdrop-blur-sm sm:p-6">
        <main className="my-auto flex h-[92vh] max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-subtle shadow-2xl">
          <header className="flex shrink-0 items-center justify-between border-b border-border-subtle bg-canvas px-5 py-4 sm:px-7">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
                Talent profile
              </p>
              <h1 className="mt-1 text-lg font-semibold">Developer preview</h1>
            </div>
            <button
              type="button"
              aria-label="Close profile preview"
              className="rounded-lg p-2 text-text-muted transition hover:bg-surface-hover hover:text-text-primary"
            >
              <X
                className="h-5 w-5 cursor-pointer"
                onClick={() => setIsPreview(false)}
              />
            </button>
          </header>

          <div className="grid min-h-0 flex-1 overflow-hidden md:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="flex min-h-0 flex-col gap-5 overflow-y-auto border-b border-border-subtle bg-surface-elevated p-5 sm:p-7 md:border-b-0 md:border-r">
              <div className="flex items-start justify-between">
                <Image
                  src="/test.jpeg"
                  width={160}
                  height={160}
                  className="h-20 w-20 rounded-2xl border border-border-subtle object-cover"
                  alt="Roshan Kewat"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {user.availability}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  {user.name}
                </h2>
                <p className="mt-1 text-sm text-text-muted">{user.title}</p>
                <div className="mt-3 flex items-center gap-1.5 text-sm text-text-muted">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>
              </div>

              <p className="text-sm leading-6 text-text-muted">
                {user.bio || ""}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-surface-hover px-2.5 py-1.5 text-xs text-text-muted">
                  {user.experience_years} years experience
                </span>
                <span className="rounded-md bg-surface-hover px-2.5 py-1.5 text-xs text-text-muted">
                  Open to work
                </span>
                {user.hourly_rate_rupees !== undefined &&
                  user.hourly_rate_rupees !== null && (
                    <span className="rounded-md bg-surface-hover px-2.5 py-1.5 text-xs text-text-muted">
                      ₹{Number(user.hourly_rate_rupees).toLocaleString()}/hr
                    </span>
                  )}
              </div>

              <div className="mt-auto space-y-2 border-t border-border-subtle pt-5">
                <Button variant="primary" btnText="Send Proposal" />
                <Button
                  variant="outline"
                  btnText="Direct Message"
                  fullWidth={true}
                />
                <div className="flex items-center justify-center gap-4 pt-2">
                  <a
                    href={`mailto:${user.email}`}
                    aria-label={`Email ${user.name}`}
                    className="text-text-muted transition hover:text-text-primary"
                  >
                    <span className="sr-only">Email</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  {/* <a
                    href="#github"
                    aria-label="GitHub profile"
                    className="text-text-muted transition hover:text-text-primary"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="#linkedin"
                    aria-label="LinkedIn profile"
                    className="text-text-muted transition hover:text-text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a> */}
                </div>
              </div>
            </aside>

            <section className="flex min-h-0 min-w-0 flex-col">
              <nav
                aria-label="Profile sections"
                className="flex shrink-0 gap-5 overflow-x-auto border-b border-border-subtle px-5 sm:px-7"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    aria-current={activeTab === tab ? "page" : undefined}
                    className={`shrink-0 border-b-2 py-4 text-sm transition ${
                      activeTab === tab
                        ? "border-text-primary font-medium text-text-primary"
                        : "border-transparent text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>

              <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
                {activeTab === "Overview & stack" && (
                  <div className="space-y-8">
                    <section>
                      <div className="mb-4 flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-text-muted" />
                        <h3 className="font-semibold">Technical stack</h3>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {skills.map((skill) => (
                          <article
                            key={skill._id}
                            className="rounded-lg border border-border-subtle bg-surface-elevated p-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-medium">
                                {skill.name}
                              </h4>
                              <span className="rounded-full bg-surface-hover px-2 py-1 text-xs text-text-muted">
                                {skill.proficiency_level}
                              </span>
                            </div>
                            <p className="mt-2 text-xs text-text-muted">
                              {skill.experience_year} years experience
                            </p>
                          </article>
                        ))}
                      </div>
                    </section>
                    <section>
                      <h3 className="mb-3 font-semibold">What I bring</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          "Product-minded engineering",
                          "Accessible UI development",
                          "API & database design",
                          "Performance optimization",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-sm text-text-muted"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </section>
                    <section className="rounded-xl border border-border-subtle bg-surface-elevated p-4">
                      <p className="text-sm leading-6 text-text-muted">
                        Currently interested in product teams building useful
                        tools for people. I enjoy owning features end-to-end and
                        collaborating closely with design and engineering.
                      </p>
                    </section>
                  </div>
                )}

                {activeTab === "Featured projects" && (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <article
                        key={project.title}
                        className="group rounded-xl border border-border-subtle bg-surface-elevated p-4 transition hover:border-text-muted/40"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs text-text-muted">
                              {project.tech_stack}
                            </p>
                            <h3 className="mt-1 font-semibold">
                              {project.title}
                            </h3>
                          </div>
                          <a href={project.live} target="_blank">
                            <ExternalLink className="h-4 w-4 text-text-muted transition group-hover:text-text-primary" />
                          </a>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-text-muted">
                          {project.description}
                        </p>
                      </article>
                    ))}
                  </div>
                )}

                {activeTab === "Work history" && (
                  <div className="space-y-6">
                    {jobs.map((job) => (
                      <article
                        key={job.company_name}
                        className="relative border-l border-border-subtle pl-5"
                      >
                        <span className="absolute -left-1.25 top-1 h-2.5 w-2.5 rounded-full border-2 border-surface-subtle bg-text-muted" />
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold">{job.role}</h3>
                            <p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted">
                              <BriefcaseBusiness className="h-3.5 w-3.5" />
                              {job.company_name}
                            </p>
                          </div>
                          <span className="text-xs text-text-muted">
                            {job.start_year} -{" "}
                            {job.end_year == 0 ? "Present" : job.end_year}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-text-muted">
                          {job?.description || ""}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfilePreviw;
