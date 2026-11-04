import {
  asyncRequestHandler,
  type RequestHandlerParams,
} from "../../utils/asyncRequestHandler.js";

import { WorkedInCompany } from "../../models/worked-in-company.model.js";
import { NotFoundException } from "../../config/http-exceptions.js";

const createWorkedInCompany = async (handler: RequestHandlerParams) => {
  const { company_name, position, start_year, end_year, description } =
    handler.req.body;

  const newWorkedInCompany = await WorkedInCompany.create({
    user_id: handler.req.user?._id as string,
    company_name,
    position,
    start_year,
    end_year,
    description,
  });

  return {
    ok: true,
    msg: "Worked in company created successfully",
    data: newWorkedInCompany,
  };
};

const getAllWorkedInCompany = async (handler: RequestHandlerParams) => {
  const workedInCompanies = await WorkedInCompany.find({
    user_id: handler.req.user?._id as string,
  });

  return {
    ok: true,
    msg: "Worked in companies retrieved successfully",
    data: workedInCompanies,
  };
};

const deleteWorkedInCompany = async (handler: RequestHandlerParams) => {
  const { worked_in_company_id } = handler.req.query as {
    worked_in_company_id: string;
  };

  const deletedWorkedInCompany = await WorkedInCompany.findOneAndDelete({
    _id: worked_in_company_id,
    user_id: handler.req.user?._id as string,
  });

  if (!deletedWorkedInCompany) {
    throw new NotFoundException(
      "Worked in company not found or already deleted",
    );
  }

  return {
    ok: true,
    msg: "Worked in company deleted successfully",
  };
};

export const CreateWorkedInCompany = asyncRequestHandler(createWorkedInCompany);
export const GetAllWorkedInCompany = asyncRequestHandler(getAllWorkedInCompany);
export const DeleteWorkedInCompany = asyncRequestHandler(deleteWorkedInCompany);
