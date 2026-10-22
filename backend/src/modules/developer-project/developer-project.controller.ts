import express from "express";

//utils
import { asyncRequestHandler } from "../../utils/asyncRequestHandler.js";
import type { RequestHandlerParams } from "../../utils/asyncRequestHandler.js";

// models
import {
  DeveloperProject,
  type IDeveloperProject,
  type IDeveloperProjectSchema,
} from "../../models/developer-project.model.js";

// exceptions
import { NotFoundException } from "../../config/http-exceptions.js";

const createProject = async (handler: RequestHandlerParams) => {
  const developerProjectInfo: IDeveloperProject = handler.req.body;

  const newProject = await DeveloperProject.create({
    user_id: handler.req.user?._id as string,
    ...developerProjectInfo,
  });

  return {
    ok: true,
    msg: "Project created successfully.",
    data: newProject,
  };
};

const getAllProject = async (handler: RequestHandlerParams) => {
  const allProjects = await DeveloperProject.find({
    user_id: handler.req.user?._id as string,
  });

  if (allProjects.length <= 0) {
    return {
      ok: true,
      msg: "No projects yet.",
    };
  }

  return {
    ok: true,
    msg: "All projects fetched.",
    data: allProjects,
  };
};

const getProject = async (handler: RequestHandlerParams) => {
  const projectId = handler.req.query.project_id as string;

  const project = await DeveloperProject.findOne({
    user_id: handler.req.user?._id as string,
    _id: projectId,
  });

  if (!project) {
    return {
      ok: false,
      msg: "Project not found.",
    };
  }

  return {
    ok: true,
    msg: "Project fetched.",
    data: project,
  };
};

const editProject = async (handler: RequestHandlerParams) => {
  const editProjectInfo: Partial<
    Omit<IDeveloperProjectSchema, "_id" | "user_id">
  > & { id: string } = handler.req.body;

  const { id, ...editedProjectInfo } = editProjectInfo;

  const project = await DeveloperProject.findOneAndUpdate(
    {
      user_id: handler.req.user?._id as string,
      _id: id,
    },
    editedProjectInfo,
    { new: true },
  );

  if (!project) {
    throw new NotFoundException("Project not found.");
  }

  return {
    ok: true,
    msg: "Project updated successfully.",
    data: project,
  };
};

const deleteProject = async (handler: RequestHandlerParams) => {
  const projectId = handler.req.query.project_id as string;

  const isDeleted = await DeveloperProject.deleteOne({
    user_id: handler.req.user?._id as string,
    _id: projectId,
  });

  if (isDeleted.deletedCount === 0) {
    throw new NotFoundException("Project not found.");
  }

  return {
    ok: true,
    msg: "Project deleted successfully.",
  };
};

export const CreateProject = asyncRequestHandler(createProject);
export const GetAllProject = asyncRequestHandler(getAllProject);
export const GetProject = asyncRequestHandler(getProject);
export const EditProject = asyncRequestHandler(editProject);
export const DeleteProject = asyncRequestHandler(deleteProject);
