"use client";
import { useState } from "react";

import AuthRequired from "../wrapper/AuthRequired";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";
import SkillCard from "./components/skill-card";
import ProjectCard from "./components/project-card";
import RoleCard from "./components/role-card";

import { disciplineOptions } from "../auth/page";

import {
  EyeIcon,
  Save,
  UserIcon,
  FileStack,
  Plus,
  WorkflowIcon,
} from "lucide-react";
import { Developer, User } from "../auth/type";
import { EAvailability } from "../auth/enums";
import { Skill } from "./type";
import { SkillProficiency } from "./enum";

const PortfolioAndSkills = () => {
  type Profile = Omit<
    User,
    "profile_pic" | "is_client" | "password" | "is_email_verified" | "email"
  > &
    Developer & { bio: string };

  const [profileInfo, setProfileInfo] = useState<Profile>({} as Profile);
  const [skillInfo, setSkillInfo] = useState<Skill>({
    skill_name: "",
    years_of_experience: 0,
  } as Skill);
  const [isAddProject, setIsAddProject] = useState<boolean>(false);
  const [isAddRole, setIsAddRole] = useState<boolean>(false);

  return (
    <>
      <AuthRequired>
        <Navbar />

        <div className="w-[70vw] h-fit px-6 py-6 gap-2 flex items-center bg-surface-subtle rounded-xl border border-border-subtle justify-between mx-auto mt-15 select-none">
          <div className="flex flex-col gap-1 items-start justify-center w-fit">
            <span className="text-2xl font-bold">
              Developer Portfolio & Skills
            </span>
            <span className="text-text-dimmed text-xs">
              Keep your skills and deliverables updated to maximize
              recommendation ranking by client project algorithms.
            </span>
          </div>

          <div className="w-fit flex items-center justify-end gap-2">
            <Button
              variant="secondary"
              btnText="Preview"
              leadingIcon={EyeIcon}
              size="sm"
              fullWidth={false}
            />
            <Button
              variant="primary"
              btnText="Save Profile"
              leadingIcon={Save}
              size="sm"
              fullWidth={false}
            />
          </div>
        </div>

        {/* Profile & Availability */}
        <section className="w-[70vw] h-fit px-6 py-3 border border-border-subtle rounded-xl bg-surface-subtle flex flex-col item-start justify-center gap-2 mx-auto mt-10 mb-2">
          <div className="w-full h-fit py-2 text-text-dimmed text-sm border-b border-border-subtle flex items-end justify-start gap-1 select-none">
            <UserIcon className="w-5" />
            <span className="font-geist-mono font-medium">
              CORE PROFILE & AVAILABILITY
            </span>
          </div>

          <div className="w-full h-fit py-2 flex flex-col items-center justify-center gap-3 select-none">
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                variant="primary"
                label="Full Name"
                value={profileInfo.name}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, name: e.target.value })
                }
              />
              <Input
                variant="primary"
                label="Title"
                value={profileInfo.title}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, title: e.target.value })
                }
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                variant="primary"
                label="Discipline"
                value={profileInfo.discipline}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, discipline: e.target.value })
                }
              />
              <Input
                variant="number"
                label="Hourly Rate (₹/hr)"
                value={profileInfo.hourly_rate_rupees}
                min={1}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    hourly_rate_rupees: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                variant="select"
                label="Availability"
                value={profileInfo.availability}
                options={disciplineOptions}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    availability: e.target.value as EAvailability,
                  })
                }
              />
              <Input
                variant="number"
                label="Years of Experience"
                value={profileInfo.experience_years}
                min={1}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    experience_years: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                variant="primary"
                label="Location"
                value={profileInfo.location}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    location: e.target.value,
                  })
                }
              />
              <Input
                variant="primary"
                label="Company"
                value={profileInfo.company}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    company: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                variant="textarea"
                label="Bio & Summary"
                value={profileInfo.bio}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    bio: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="w-[70vw] h-fit px-6 py-3 border border-border-subtle rounded-xl bg-surface-subtle flex flex-col item-start justify-center gap-2 mx-auto mt-10 mb-2">
          <div className="w-full h-fit py-2 text-text-dimmed text-sm border-b border-border-subtle flex items-end justify-start gap-1 select-none">
            <FileStack className="w-5" />
            <span className="font-geist-mono font-medium">
              TECHNICAL SKILLS
            </span>
          </div>

          <div className="grid w-full h-fit grid-cols-3 items-start gap-2">
            <SkillCard />
            <SkillCard />
            <SkillCard />
            <SkillCard />
            <SkillCard />
            <SkillCard />
            <SkillCard />
            <SkillCard />
            <SkillCard />
          </div>

          <div className="w-full h-fit px-2 py-2 border border-border-subtle bg-surface-elevated rounded-lg flex flex-col gap-1.5 items-start justify-center">
            <span className="text-xs text-text-dimmed font-medium">
              Add Skill:
            </span>

            <div className="w-full flex items-center justify-between gap-2 h-fit">
              <Input
                variant="primary"
                label=""
                value={skillInfo.skill_name}
                hint="Skill name"
                bgColor="bg-surface-hover"
                onChange={(e) =>
                  setSkillInfo({ ...skillInfo, skill_name: e.target.value })
                }
              />
              <Input
                variant="select"
                label=""
                value={skillInfo.proficiency}
                hint="Proficiency"
                bgColor="bg-surface-hover"
                options={[
                  { label: "Expert", value: "expert" },
                  { label: "Intermediate", value: "intermediate" },
                  { label: "Beginner", value: "beginner" },
                ]}
                onChange={(e) =>
                  setSkillInfo({
                    ...skillInfo,
                    proficiency: e.target.value as SkillProficiency,
                  })
                }
              />
              <Input
                variant="number"
                label=""
                value={skillInfo.years_of_experience}
                min={1}
                hint="Experience"
                bgColor="bg-surface-hover"
                onChange={(e) =>
                  setSkillInfo({
                    ...skillInfo,
                    years_of_experience: Number(e.target.value),
                  })
                }
              />

              <Button
                variant="primary"
                btnText="Add Skill"
                size="xs"
                leadingIcon={Plus}
              />
            </div>
          </div>
        </section>

        {/* Project */}
        <section className="w-[70vw] h-fit px-6 py-6 border border-border-subtle rounded-2xl bg-surface-subtle flex flex-col item-start justify-center gap-2 mx-auto mt-10 mb-2">
          <div className="w-full h-fit py-2 text-text-dimmed text-sm border-b border-border-subtle flex items-end justify-between gap-1 select-none">
            <div className="flex items-end gap-1 justify-center">
              <FileStack className="w-5" />
              <span className="font-geist-mono font-medium">PROJECTS</span>
            </div>

            <Button
              variant="transparent"
              btnText="Add Project"
              onClick={() => setIsAddProject(!isAddProject)}
            />
          </div>

          <div className="w-full flex flex-col items-center justify-start gap-2">
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
          </div>

          {isAddProject && (
            <div className="w-full bg-surface-elevated rounded-lg border border-border-subtle flex flex-col items-start justify-center gap-2 px-3 py-2">
              <span className="font-semibold text-sm">New Project:</span>

              <div className="grid w-full grid-cols-2 items-start gap-2">
                <Input
                  variant="primary"
                  label="Project Title"
                  bgColor="bg-surface-hover"
                  value={""}
                  onChange={() => {}}
                />
                <Input
                  variant="primary"
                  label="Role (Comma seprated)"
                  bgColor="bg-surface-hover"
                  value={""}
                  onChange={() => {}}
                />
                <Input
                  variant="primary"
                  label="Tech Stack (Comma seprated)"
                  bgColor="bg-surface-hover"
                  value={""}
                  onChange={() => {}}
                />
                <Input
                  variant="primary"
                  label="Outcome & Metrics"
                  bgColor="bg-surface-hover"
                  value={""}
                  onChange={() => {}}
                />
                <Input
                  variant="primary"
                  label="Live URL"
                  bgColor="bg-surface-hover"
                  value={""}
                  onChange={() => {}}
                />
                <Input
                  variant="primary"
                  label="Github repo"
                  bgColor="bg-surface-hover"
                  value={""}
                  onChange={() => {}}
                />
              </div>
              <Input
                variant="textarea"
                label="Description"
                bgColor="bg-surface-hover"
                value={""}
                onChange={() => {}}
              />

              <div className="w-xs flex items-center justify-center ml-auto gap-2">
                <Button
                  variant="secondary"
                  btnText="Cancel"
                  size="sm"
                  onClick={() => setIsAddProject(false)}
                />
                <Button variant="primary" btnText="Save Project" size="sm" />
              </div>
            </div>
          )}
        </section>

        {/* Work Experience */}
        <section className="w-[70vw] h-fit px-6 py-6 border border-border-subtle rounded-2xl bg-surface-subtle flex flex-col item-start justify-center gap-2 mx-auto mt-10 mb-28">
          <div className="w-full h-fit py-2 text-text-dimmed text-sm border-b border-border-subtle flex items-end justify-between gap-1 select-none">
            <div className="flex items-end gap-1 justify-center">
              <WorkflowIcon className="w-5" />
              <span className="font-geist-mono font-medium">
                WORK EXPERIENCE
              </span>
            </div>

            <Button
              variant="transparent"
              btnText="Add Role"
              onClick={() => setIsAddRole(!isAddRole)}
            />
          </div>

          <div className="w-full flex flex-col items-center justify-start gap-2">
            <RoleCard></RoleCard>
          </div>

          {isAddRole && (
            <div className="w-full bg-surface-elevated px-3 py-3 rounded-2xl border border-border-subtle flex flex-col items-center justify-start gap-2">
              <div className="grid grid-cols-2 gap-2 items-start w-full">
                <Input
                  variant="primary"
                  label="Company"
                  value={""}
                  bgColor="bg-surface-hover"
                  onChange={() => {}}
                />
                <Input
                  variant="primary"
                  label="Role"
                  value={""}
                  bgColor="bg-surface-hover"
                  onChange={() => {}}
                />
                <Input
                  variant="number"
                  label="From"
                  value={""}
                  bgColor="bg-surface-hover"
                  min={1900}
                  onChange={() => {}}
                />
                <Input
                  variant="number"
                  label="To"
                  value={""}
                  bgColor="bg-surface-hover"
                  min={1900}
                  onChange={() => {}}
                />
              </div>
              <div className="w-xs flex items-center justify-center ml-auto gap-2">
                <Button
                  variant="secondary"
                  btnText="Cancel"
                  size="sm"
                  onClick={() => setIsAddRole(false)}
                />
                <Button variant="primary" btnText="Save Role" size="sm" />
              </div>
            </div>
          )}
        </section>
      </AuthRequired>
    </>
  );
};

export default PortfolioAndSkills;
