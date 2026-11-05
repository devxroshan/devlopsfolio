"use client";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

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
import { useUserStore } from "../stores/user-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddSkillAPI, DeleteSkillAPI, GetAllSkillAPI } from "./skill-api/api";
import { AddRoleAPI, GetAllRolesAPI, DeleteRoleAPI } from "./role-api/api";
import { APISuccess } from "../types/api-success";
import { LocalAppError } from "../types/local-error";
import { APIError } from "../types/api-error";
import { getLocalFieldErr } from "../utils/getLocalFieldErr";
import { useSkillStore } from "../stores/skill-store";
import { DeleteSkillSchema } from "./skill-api/schema/delete-skill.schema";
import { AddProjectSchema } from "./project-api/schema/add-project.schema";
import { CreateRoleSchema } from "./role-api/schema/create-role.schema";
import {
  AddProjectAPI,
  DeleteProjectAPI,
  GetAllProjectAPI,
} from "./project-api/api";
import { useProjectStore } from "../stores/project-store";
import { useRoleStore } from "../stores/role-store";
import { DeleteProjectSchema } from "./project-api/schema/delete-project.schema";
import { DeleteRoleSchema } from "./role-api/schema/delete-role.schema";

const PortfolioAndSkills = () => {
  type DeveloperProfile = Developer & { bio: string };
  type UserProfile = Omit<User, "password">;

  const queryClient = useQueryClient();

  const userStre = useUserStore();
  const skillStre = useSkillStore();
  const projectStre = useProjectStore();
  const roleStre = useRoleStore();

  const [userProfileInfo, setUserProfileInfo] = useState<UserProfile>(
    {} as UserProfile,
  );
  const [developerProfileInfo, setDeveloperProfileInfo] =
    useState<DeveloperProfile>({} as DeveloperProfile);
  const [skillInfo, setSkillInfo] = useState<Skill>({
    name: "",
    experience_year: 0,
  } as Skill);
  const [newProjectInfo, setNewProjectInfo] = useState<AddProjectSchema>(
    {} as AddProjectSchema,
  );
  const [newRoleInfo, setNewRoleInfo] = useState<CreateRoleSchema>({
    end_year: 0,
  } as CreateRoleSchema);
  const [isAddProject, setIsAddProject] = useState<boolean>(false);
  const [isAddRole, setIsAddRole] = useState<boolean>(false);

  useEffect(() => {
    setUserProfileInfo(userStre);
  }, [userStre]);

  const addSkillMutation = useMutation<
    APISuccess,
    LocalAppError | APIError,
    Skill
  >({
    mutationFn: AddSkillAPI,
    onSuccess: (data) => {
      setSkillInfo({} as Skill);
      queryClient.invalidateQueries({
        queryKey: ["all-skill"],
      });
    },
    onError: (err) => {},
  });

  const deleteSkillMutation = useMutation<
    APISuccess,
    APIError | LocalAppError,
    DeleteSkillSchema
  >({
    mutationFn: DeleteSkillAPI,
    onSuccess: (data) => {},
    onError: (err) => {},
  });

  const addProjectMutation = useMutation<
    APISuccess,
    APIError | LocalAppError,
    AddProjectSchema
  >({
    mutationFn: AddProjectAPI,
    onSuccess: (data) => {
      if (data.ok) {
        setNewProjectInfo({} as AddProjectSchema);
        queryClient.invalidateQueries({
          queryKey: ["all-developer-project"],
        });
      }
    },
    onError: (err) => {},
  });

  const deleteProjectMutation = useMutation<
    APISuccess,
    APIError | LocalAppError,
    DeleteProjectSchema
  >({
    mutationFn: DeleteProjectAPI,
    onSuccess: (data) => {},
    onError: (err) => {
      console.log(err);
    },
  });

  const addRoleMutation = useMutation<
    APISuccess,
    APIError | LocalAppError,
    CreateRoleSchema
  >({
    mutationFn: AddRoleAPI,
    onSuccess: (data) => {
      setNewRoleInfo({} as CreateRoleSchema);
      queryClient.invalidateQueries({
        queryKey: ["all-developer-role"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const deleteRoleMutation = useMutation<
    APISuccess,
    APIError | LocalAppError,
    DeleteRoleSchema
  >({
    mutationFn: DeleteRoleAPI,
    onSuccess: (data) => {
      if (data.ok) {
        queryClient.invalidateQueries({
          queryKey: ["all-developer-role"],
        });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const skillQuery = useQuery({
    queryFn: GetAllSkillAPI,
    queryKey: ["all-skill"],
  });

  const projectQuery = useQuery({
    queryFn: GetAllProjectAPI,
    queryKey: ["all-developer-project"],
  });

  const roleQuery = useQuery({
    queryFn: GetAllRolesAPI,
    queryKey: ["all-developer-role"],
  });

  useEffect(() => {
    if (skillQuery.data?.data) {
      skillStre.setSkill(skillQuery.data.data);
    }
    if (projectQuery.data?.data) {
      projectStre.setProjects(projectQuery.data.data);
    }
    if (roleQuery.data?.data) {
      roleStre.setRoles(roleQuery.data.data);
    }
  }, [skillQuery.data, projectQuery.data, roleQuery.data]);

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
            <span className="font-geist-mono font-medium text-sm">
              CORE PROFILE & AVAILABILITY
            </span>
          </div>

          <div className="w-full h-fit py-2 flex flex-col items-center justify-center gap-3 select-none">
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                variant="primary"
                label="Full Name"
                value={userProfileInfo.name}
                onChange={(e) =>
                  setUserProfileInfo({
                    ...userProfileInfo,
                    name: e.target.value,
                  })
                }
              />
              <Input
                variant="primary"
                label="Title"
                value={developerProfileInfo.title}
                onChange={(e) =>
                  setDeveloperProfileInfo({
                    ...developerProfileInfo,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                variant="primary"
                label="Discipline"
                value={developerProfileInfo.discipline}
                onChange={(e) =>
                  setDeveloperProfileInfo({
                    ...developerProfileInfo,
                    discipline: e.target.value,
                  })
                }
              />
              <Input
                variant="number"
                label="Hourly Rate (₹/hr)"
                value={developerProfileInfo.hourly_rate_rupees}
                min={1}
                onChange={(e) =>
                  setDeveloperProfileInfo({
                    ...developerProfileInfo,
                    hourly_rate_rupees: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                variant="select"
                label="Availability"
                value={developerProfileInfo.availability}
                options={disciplineOptions}
                onChange={(e) =>
                  setDeveloperProfileInfo({
                    ...developerProfileInfo,
                    availability: e.target.value as EAvailability,
                  })
                }
              />
              <Input
                variant="number"
                label="Years of Experience"
                value={developerProfileInfo.experience_years}
                min={1}
                onChange={(e) =>
                  setDeveloperProfileInfo({
                    ...developerProfileInfo,
                    experience_years: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                variant="primary"
                label="Location"
                value={developerProfileInfo.location}
                onChange={(e) =>
                  setDeveloperProfileInfo({
                    ...developerProfileInfo,
                    location: e.target.value,
                  })
                }
              />
              <Input
                variant="primary"
                label="Company"
                value={userProfileInfo.company}
                onChange={(e) =>
                  setUserProfileInfo({
                    ...userProfileInfo,
                    company: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                variant="textarea"
                label="Bio & Summary"
                value={developerProfileInfo.bio}
                onChange={(e) =>
                  setDeveloperProfileInfo({
                    ...developerProfileInfo,
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
            {skillStre.skills.length > 0 &&
              skillStre.skills.map((skill) => (
                <SkillCard
                  key={skill._id}
                  name={skill.name}
                  years_of_experience={skill.experience_year}
                  proficiency={skill.proficiency_level!}
                  onDelete={() => {
                    skillStre.removeSkill(skill._id);
                    deleteSkillMutation.mutate({ skill_id: skill._id });
                  }}
                ></SkillCard>
              ))}
          </div>

          {!skillStre.skills.length && (
            <div className="text-sm text-text-muted py-6 flex flex-col items-center justify-center gap-2 w-full">
              No skills yet.
            </div>
          )}

          <div className="w-full h-fit px-2 py-2 border border-border-subtle bg-surface-elevated rounded-lg flex flex-col gap-1.5 items-start justify-center">
            <div className="w-full h-fit  flex items-center justify-start gap-2">
              <span className="text-xs text-text-dimmed font-medium">
                Add Skill:
              </span>

              <span className="text-red-700 text-xs font-medium select-none">
                {(addSkillMutation.error as LocalAppError) &&
                  (addSkillMutation.error as LocalAppError).fieldErrors![0]
                    ?.msg}
              </span>
            </div>

            <div className="w-full flex items-center justify-between gap-2 h-fit">
              <Input
                variant="primary"
                label=""
                value={skillInfo.name}
                hint="Skill name"
                bgColor="bg-surface-hover"
                onChange={(e) =>
                  setSkillInfo({ ...skillInfo, name: e.target.value })
                }
              />
              <Input
                variant="select"
                label=""
                value={skillInfo.proficiency_level}
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
                    proficiency_level: e.target.value as SkillProficiency,
                  })
                }
              />
              <Input
                variant="number"
                label=""
                value={skillInfo.experience_year}
                min={1}
                hint="Experience"
                bgColor="bg-surface-hover"
                onChange={(e) =>
                  setSkillInfo({
                    ...skillInfo,
                    experience_year: Number(e.target.value),
                  })
                }
              />

              <Button
                variant="primary"
                btnText="Add Skill"
                size="xs"
                leadingIcon={Plus}
                onClick={() => addSkillMutation.mutate(skillInfo)}
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
            {projectStre.projects.length > 0 &&
              projectStre.projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  roles={project.role}
                  techStack={project.tech_stack}
                  description={project.description}
                  outcome={project.outcome_or_metrics}
                  live={project.live}
                  github={project.github}
                  onDelete={() => {
                    projectStre.removeProject(project._id);
                    deleteProjectMutation.mutate({ project_id: project._id });
                  }}
                ></ProjectCard>
              ))}

            {!projectStre.projects.length && (
              <div className="text-sm text-text-muted py-6 flex flex-col items-center justify-center gap-2">
                No projects yet.
                <Button
                  variant="primary"
                  btnText="Add Project"
                  size="xs"
                  className="rounded-md"
                  onClick={() => setIsAddProject(true)}
                />
              </div>
            )}
          </div>

          {isAddProject && (
            <div
              className="w-full bg-surface-elevated rounded-lg border border-border-subtle flex flex-col items-start justify-center gap-2 px-3 py-2"
              onKeyDown={(e) => {
                e.key == "Enter" && addProjectMutation.mutate(newProjectInfo);
              }}
            >
              <span className="font-semibold text-sm">New Project:</span>

              <div className="grid w-full grid-cols-2 items-start gap-2">
                <Input
                  variant="primary"
                  label="Project Title"
                  bgColor="bg-surface-hover"
                  value={newProjectInfo.title}
                  error={
                    getLocalFieldErr(
                      "title",
                      addProjectMutation.error as LocalAppError,
                    )?.msg ?? ""
                  }
                  onChange={(e) =>
                    setNewProjectInfo({
                      ...newProjectInfo,
                      title: e.target.value,
                    })
                  }
                />
                <Input
                  variant="primary"
                  label="Role (Comma seprated)"
                  bgColor="bg-surface-hover"
                  value={newProjectInfo.role?.toString() ?? ""}
                  error={
                    getLocalFieldErr(
                      "role",
                      addProjectMutation.error as LocalAppError,
                    )?.msg ?? ""
                  }
                  onChange={(e) =>
                    setNewProjectInfo({
                      ...newProjectInfo,
                      role: e.target.value.trim().split(","),
                    })
                  }
                />
                <Input
                  variant="primary"
                  label="Tech Stack (Comma seprated)"
                  bgColor="bg-surface-hover"
                  value={newProjectInfo.tech_stack?.toString() ?? ""}
                  error={
                    getLocalFieldErr(
                      "tech_stack",
                      addProjectMutation.error as LocalAppError,
                    )?.msg ?? ""
                  }
                  onChange={(e) =>
                    setNewProjectInfo({
                      ...newProjectInfo,
                      tech_stack: e.target.value.trim().split(","),
                    })
                  }
                />
                <Input
                  variant="primary"
                  label="Outcome & Metrics"
                  bgColor="bg-surface-hover"
                  value={newProjectInfo.outcome_or_metrics}
                  error={
                    getLocalFieldErr(
                      "outcome_or_metrics",
                      addProjectMutation.error as LocalAppError,
                    )?.msg ?? ""
                  }
                  onChange={(e) =>
                    setNewProjectInfo({
                      ...newProjectInfo,
                      outcome_or_metrics: e.target.value,
                    })
                  }
                />
                <Input
                  variant="primary"
                  label="Live URL"
                  bgColor="bg-surface-hover"
                  value={newProjectInfo.live}
                  error={
                    getLocalFieldErr(
                      "live",
                      addProjectMutation.error as LocalAppError,
                    )?.msg ?? ""
                  }
                  onChange={(e) =>
                    setNewProjectInfo({
                      ...newProjectInfo,
                      live: e.target.value,
                    })
                  }
                />
                <Input
                  variant="primary"
                  label="Github repo"
                  bgColor="bg-surface-hover"
                  value={newProjectInfo.github}
                  error={
                    getLocalFieldErr(
                      "github",
                      addProjectMutation.error as LocalAppError,
                    )?.msg ?? ""
                  }
                  onChange={(e) =>
                    setNewProjectInfo({
                      ...newProjectInfo,
                      github: e.target.value,
                    })
                  }
                />
              </div>
              <Input
                variant="textarea"
                label="Description"
                bgColor="bg-surface-hover"
                value={newProjectInfo.description}
                error={
                  getLocalFieldErr(
                    "description",
                    addProjectMutation.error as LocalAppError,
                  )?.msg ?? ""
                }
                onChange={(e) =>
                  setNewProjectInfo({
                    ...newProjectInfo,
                    description: e.target.value,
                  })
                }
              />

              <div className="w-xs flex items-center justify-center ml-auto gap-2">
                <Button
                  variant="secondary"
                  btnText="Cancel"
                  size="sm"
                  onClick={() => setIsAddProject(false)}
                />
                <Button
                  variant="primary"
                  btnText="Add Project"
                  size="sm"
                  onClick={() => {
                    addProjectMutation.mutate(newProjectInfo);
                  }}
                />
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
            {roleStre.roles.length > 0 &&
              roleStre.roles.map((role) => (
                <RoleCard
                  key={role._id}
                  role={role.role}
                  company={role.company_name}
                  start_year={role.start_year.toString()}
                  end_year={
                    role.end_year === 0 ? "Present" : role.end_year.toString()
                  }
                  description={role.description}
                  onDelete={() => {
                    roleStre.removeRole(role._id);
                    deleteRoleMutation.mutate({
                      worked_in_company_id: role._id,
                    });
                  }}
                />
              ))}

            {!roleStre.roles.length && (
              <div className="text-sm text-text-muted py-6 flex flex-col items-center justify-center gap-2">
                No roles yet.
                <Button
                  variant="primary"
                  btnText="Add Role"
                  size="xs"
                  className="rounded-md"
                  onClick={() => setIsAddRole(true)}
                />
              </div>
            )}
          </div>

          {isAddRole && (
            <div
              className="w-full bg-surface-elevated px-3 py-3 rounded-2xl border border-border-subtle flex flex-col items-center justify-start gap-2"
              onKeyDown={(e) => {
                e.key == "Enter" && addRoleMutation.mutate(newRoleInfo);
              }}
            >
              <div className="grid grid-cols-2 gap-2 items-start w-full">
                <Input
                  variant="primary"
                  label="Company"
                  value={newRoleInfo.company_name}
                  error={
                    getLocalFieldErr(
                      "company_name",
                      addRoleMutation.error as LocalAppError,
                    )?.msg ?? ""
                  }
                  bgColor="bg-surface-hover"
                  onChange={(e) =>
                    setNewRoleInfo({
                      ...newRoleInfo,
                      company_name: e.target.value,
                    })
                  }
                />
                <Input
                  variant="primary"
                  label="Role"
                  value={newRoleInfo.role}
                  error={
                    getLocalFieldErr(
                      "role",
                      addRoleMutation.error as LocalAppError,
                    )?.msg ?? ""
                  }
                  bgColor="bg-surface-hover"
                  onChange={(e) =>
                    setNewRoleInfo({
                      ...newRoleInfo,
                      role: e.target.value,
                    })
                  }
                />
                <Input
                  variant="number"
                  label="From"
                  value={newRoleInfo.start_year?.toString()}
                  error={
                    getLocalFieldErr(
                      "start_year",
                      addRoleMutation.error as LocalAppError,
                    )?.msg ?? ""
                  }
                  bgColor="bg-surface-hover"
                  min={1900}
                  onChange={(e) =>
                    setNewRoleInfo({
                      ...newRoleInfo,
                      start_year: parseInt(e.target.value),
                    })
                  }
                />
                <Input
                  variant="number"
                  label="To"
                  value={newRoleInfo.end_year?.toString() ?? 0}
                  error={
                    getLocalFieldErr(
                      "end_year",
                      addRoleMutation.error as LocalAppError,
                    )?.msg ?? ""
                  }
                  bgColor="bg-surface-hover"
                  min={1900}
                  onChange={(e) =>
                    setNewRoleInfo({
                      ...newRoleInfo,
                      end_year: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <Input
                variant="textarea"
                label="Description"
                value={newRoleInfo.description || ""}
                error={
                  getLocalFieldErr(
                    "description",
                    addRoleMutation.error as LocalAppError,
                  )?.msg ?? ""
                }
                bgColor="bg-surface-hover"
                onChange={(e) =>
                  setNewRoleInfo({
                    ...newRoleInfo,
                    description: e.target.value || "",
                  })
                }
              />
              <div className="w-xs flex items-center justify-center ml-auto gap-2 mt-4">
                <Button
                  variant="secondary"
                  btnText="Cancel"
                  size="sm"
                  onClick={() => setIsAddRole(false)}
                />
                <Button
                  variant="primary"
                  btnText="Save Role"
                  size="sm"
                  onClick={() => addRoleMutation.mutate(newRoleInfo)}
                />
              </div>
            </div>
          )}
        </section>
      </AuthRequired>
    </>
  );
};

export default PortfolioAndSkills;
