import express from "express";

// lib
import {
  asyncRequestHandler,
  type RequestHandlerParams,
} from "../../lib/asyncRequestHandler.js";
import { Skill, type ISkill } from "../../models/skill.model.js";
import { NotFoundException } from "../../config/http-exceptions.js";

const addSkill = async (handler: RequestHandlerParams) => {
  const skillInfo: ISkill = handler.req.body;

  const newSkill = await Skill.create({
    user_id: handler.req.user?._id as string,
    ...skillInfo,
  });

  return {
    ok: true,
    msg: "New skill added.",
    data: newSkill,
  };
};

const getAllSkill = async (handler: RequestHandlerParams) => {
  const userId = handler.req.user?._id as string;

  const allSkills = await Skill.find({ user_id: userId });

  if (allSkills.length <= 0) {
    return {
      ok: true,
      msg: "No skills yet.",
    };
  }

  return {
    ok: true,
    msg: "All skills found.",
    data: allSkills,
  };
};

const editSkill = async (handler: RequestHandlerParams) => {
  const editedSkillInfo = handler.req.body;

  const { id: _omit, ...editedSkill } = editedSkillInfo;

  const isUpdated = await Skill.findOneAndUpdate(
    { _id: editedSkillInfo.id!, user_id: handler.req.user?._id as string },
    {
      $set: {
        ...editedSkill,
      },
    },
  );

  if (!isUpdated) {
    throw new NotFoundException("Skill not found.");
  }

  return {
    ok: true,
    msg: "Skill updated successfully.",
  };
};

const deleteSkill = async (handler: RequestHandlerParams) => {
  const skillId = handler.req.body.query.skill_id;

  const isDeleted = await Skill.findByIdAndDelete(skillId);

  if (!isDeleted) {
    throw new NotFoundException("Skill not found.");
  }

  return {
    ok: true,
    msg: "Skill deleted successfully.",
  };
};

export const AddSkill = asyncRequestHandler(addSkill);
export const GetAllSkill = asyncRequestHandler(getAllSkill);
export const EditSkill = asyncRequestHandler(editSkill);
export const DeleteSkill = asyncRequestHandler(deleteSkill);
