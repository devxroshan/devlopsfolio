import express from "express";

import { asyncRequestHandler } from "../../lib/asyncRequestHandler.js";


const signUp = async (req: express.Request, res: express.Response) => {
    const userInfo = req.body;
    return {
        ok: true,
        msg: "User signed up successfully",
        data: userInfo
    }
}

const verifyEmail = async (req: express.Request, res: express.Response) => {}

const signIn = async (req: express.Request, res: express.Response) => {}

const forgotPassword = async (req: express.Request, res: express.Response) => {}

const resetPassword = async (req: express.Request, res: express.Response) => {}


export const SignUp = asyncRequestHandler(signUp);
export const SignIn = asyncRequestHandler(signIn);
export const VerifyEmail = asyncRequestHandler(verifyEmail);
export const ForgotPassword = asyncRequestHandler(forgotPassword);
export const ResetPassword = asyncRequestHandler(resetPassword);