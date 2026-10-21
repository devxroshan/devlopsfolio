"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  User as UserIcon,
  Mail,
  Building,
  Key,
  BriefcaseIcon,
  Clock,
  LocateIcon,
  VerifiedIcon,
  LockIcon,
} from "lucide-react";
import React, { Dispatch, Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

// components
import Input from "../components/Input";
import Button from "../components/Button";

// types
import { User } from "./type";
import { APIError } from "../types/api-error";
import { SignUpInfo } from "./schema/signup.schema";
import { APISuccess } from "../types/api-success";

// enums
import { ETabs, EAvailability } from "./enums";

// libs
import { LocalAppError } from "../types/local-error";

// API
import {
  ForgotPasswordAPI,
  ResetPasswordAPI,
  SignInAPI,
  SignUpAPI,
  VerifyEmailAPI,
} from "./api";

// utils
import { getLocalFieldErr } from "../utils/getLocalFieldErr";

// schema
import { VerifyEmailInfo } from "./schema/verify-email.schema";
import { SignInInfo } from "./schema/signin.schema";
import { ForgotPasswordInfo } from "./schema/forgot-password.schema";
import {
  ResetPasswordInfo,
  resetPasswordSchema,
} from "./schema/reset-password.schema";
import { ApiError } from "next/dist/server/api-utils";
import { schemaValidator } from "../utils/schema-validator";

// wrappers
import AuthNotRequired from "../wrapper/AuthNotRequired";

const tabs = [
  { name: "Sign Up", matcher: ETabs.SIGN_UP },
  { name: "Sign In", matcher: ETabs.SIGN_IN },
  { name: "Forgot Password", matcher: ETabs.FORGOT_PASSWORD },
  { name: "Reset Password", matcher: ETabs.RESET_PASSWORD },
  { name: "Verification", matcher: ETabs.VERIFICATION },
] as const;

const userDefaults = {
  name: "",
  email: "",
  password: "",
  is_email_verified: false,
  is_client: true as const,
  company: "",
};

const developerDefaults = {
  discipline: "",
  title: "",
  time_zone: "",
  location: "",
  experience_years: 0,
  availability: undefined,
  hourly_rate_rupees: 0,
};

const SignUp = ({
  setCurrentTab,
  userInfo,
  setUserInfo,
}: {
  setCurrentTab: Dispatch<React.SetStateAction<ETabs>>;
  userInfo: SignUpInfo;
  setUserInfo: Dispatch<React.SetStateAction<SignUpInfo>>;
}) => {
  const signUpMutation = useMutation<
    APISuccess,
    LocalAppError | APIError,
    SignUpInfo
  >({
    mutationFn: SignUpAPI,
    onSuccess: (data) => {
      console.log("Data -> ", data);
    },
    onError: (err) => {
      const apiErr = err as APIError;
      console.log(apiErr);
    },
  });

  const handlerSignUp = () => {
    signUpMutation.mutate(userInfo);
  };

  return (
    <>
      {!signUpMutation.data?.ok ? (
        <div
          className="w-lg h-fit rounded-2xl bg-surface-subtle border border-border-subtle py-5 px-7 flex flex-col items-center justify-start gap-3 mt-20 mb-15"
          onKeyDown={(e) => {
            e.key == "Enter" && handlerSignUp();
          }}
        >
          <div className="w-full h-fit flex flex-col items-start justify-center gap-0.5">
            <span className="text-2xl font-semibold">Create Account</span>
            <span className="text-xs text-text-dimmed">
              Join DevMatch as an enterprise client or vetted software engineer.
            </span>
          </div>

          <div className="w-full h-fit flex flex-col items-start justify-center gap-0.5">
            <span className="text-xs text-text-secondary">
              Select your account type:
            </span>
            <div className="w-full h-fit flex items-center justify-between gap-1.5">
              <div
                className={`w-[50%] h-fit rounded-xl px-3 py-2 flex flex-col items-start justify-center cursor-pointer border border-border-subtle transition-all duration-300 ${userInfo.is_client ? "bg-white" : "bg-surface-elevated hover:border-border-hover"}`}
                onClick={() => {
                  setUserInfo({
                    ...userInfo,
                    is_client: true,
                  });
                }}
              >
                <span
                  className={`text-sm ${userInfo.is_client ? "text-black" : "text-text-muted"}`}
                >
                  I am a Client
                </span>
                <span className={`text-xs text-text-dimmed`}>
                  Post briefs and hire vetted talent
                </span>
              </div>

              <div
                className={`w-[50%] h-fit rounded-xl px-3 py-2 flex flex-col items-start justify-center cursor-pointer border border-border-subtle transition-all duration-300 ${!userInfo.is_client ? "bg-white" : "bg-surface-elevated hover:border-border-hover"}`}
                onClick={() => {
                  setUserInfo({
                    ...userInfo,
                    is_client: false,
                  } as SignUpInfo);
                }}
              >
                <span
                  className={`text-sm ${!userInfo.is_client ? "text-black" : "text-text-muted"}`}
                >
                  I am a Developer
                </span>
                <span className={`text-xs text-text-dimmed`}>
                  Showcase portfolio & get hired
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-fit flex flex-col items-center justify-start gap-2 mb-2">
            <Input
              variant="primary"
              label="Full Name"
              hint="e.g Roshan Kewat"
              value={userInfo.name}
              error={
                getLocalFieldErr("name", signUpMutation.error as LocalAppError)
                  ?.msg ?? ""
              }
              leadingIcon={UserIcon}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  name: e.target.value,
                });
              }}
            />
            <Input
              variant="primary"
              label="Work Email"
              value={userInfo.email}
              hint="e.g your@mail.com"
              error={
                getLocalFieldErr("email", signUpMutation.error as LocalAppError)
                  ?.msg ?? ""
              }
              leadingIcon={Mail}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                });
              }}
            />
            <Input
              variant="primary"
              label="Company/Organization"
              value={userInfo.company}
              hint="e.g Microsoft"
              leadingIcon={Building}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  company: e.target.value,
                });
              }}
            />
            <Input
              variant="password"
              label="Password"
              value={userInfo.password}
              hint="••••••••••••••••"
              error={
                getLocalFieldErr(
                  "password",
                  signUpMutation.error as LocalAppError,
                )?.msg ?? ""
              }
              leadingIcon={Key}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  password: e.target.value,
                });
              }}
            />

            {/* Developer's Options */}
            <div className="w-full h-fit flex flex-col items-center justify-start gap-2">
              {!userInfo.is_client && (
                <>
                  <div className="w-full h-fit flex gap-1 items-center justify-between">
                    <Input
                      variant="select"
                      label="Discipline"
                      value={userInfo.discipline}
                      error={
                        getLocalFieldErr(
                          "discipline",
                          signUpMutation.error as LocalAppError,
                        )?.msg ?? ""
                      }
                      hint="e.g Full-stack Development"
                      options={[
                        {
                          label: "Frontend Development",
                          value: "Frontend Development",
                        },
                        {
                          label: "Backend Development",
                          value: "Backend Development",
                        },
                        {
                          label: "Full-stack Development",
                          value: "Full-stack Development",
                        },
                        {
                          label: "Mobile App Development",
                          value: "Mobile App Development",
                        },
                        {
                          label: "Game Development",
                          value: "Game Development",
                        },
                        {
                          label: "DevOps & Site Reliability Engineering",
                          value: "DevOps & Site Reliability Engineering",
                        },
                        {
                          label: "Cloud Engineering",
                          value: "Cloud Engineering",
                        },
                        {
                          label: "Data Engineering",
                          value: "Data Engineering",
                        },
                        {
                          label: "AI & Machine Learning Engineering",
                          value: "AI & Machine Learning Engineering",
                        },
                        {
                          label: "Cybersecurity Engineering",
                          value: "Cybersecurity Engineering",
                        },
                        {
                          label: "Software Testing & Quality Assurance",
                          value: "Software Testing & Quality Assurance",
                        },
                        {
                          label: "Embedded Systems Engineering",
                          value: "Embedded Systems Engineering",
                        },
                        {
                          label: "Database Engineering",
                          value: "Database Engineering",
                        },
                        {
                          label: "Platform Engineering",
                          value: "Platform Engineering",
                        },
                        {
                          label: "Blockchain Development",
                          value: "Blockchain Development",
                        },
                      ]}
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          discipline: e.target.value,
                        });
                      }}
                    />
                    <Input
                      variant="primary"
                      label="Title"
                      hint="e.g Senior Software Engineer"
                      value={userInfo.title}
                      error={
                        getLocalFieldErr(
                          "title",
                          signUpMutation.error as LocalAppError,
                        )?.msg ?? ""
                      }
                      leadingIcon={BriefcaseIcon}
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          title: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="w-full h-fit flex gap-1 items-center justify-between">
                    <Input
                      variant="primary"
                      label="Time Zone"
                      hint="e.g Asia/Kolkata (UTC+5:30)"
                      value={userInfo.time_zone}
                      error={
                        getLocalFieldErr(
                          "time_zone",
                          signUpMutation.error as LocalAppError,
                        )?.msg ?? ""
                      }
                      leadingIcon={Clock}
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, time_zone: e.target.value });
                      }}
                    />
                    <Input
                      variant="primary"
                      label="Location"
                      hint="e.g Bengaluru, India"
                      value={userInfo.location}
                      error={
                        getLocalFieldErr(
                          "location",
                          signUpMutation.error as LocalAppError,
                        )?.msg ?? ""
                      }
                      leadingIcon={LocateIcon}
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, location: e.target.value });
                      }}
                    />
                  </div>
                  <div className="w-full h-fit flex gap-1 items-center justify-between">
                    <Input
                      variant="number"
                      label="Years of Experience"
                      value={userInfo.experience_years}
                      hint="e.g 5"
                      error={
                        getLocalFieldErr(
                          "experience_years",
                          signUpMutation.error as LocalAppError,
                        )?.msg ?? ""
                      }
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          experience_years: Number(e.target.value),
                        });
                      }}
                    />
                    <Input
                      variant="number"
                      label="Hourly Rate (₹)"
                      hint="e.g 1500"
                      value={userInfo.hourly_rate_rupees}
                      error={
                        getLocalFieldErr(
                          "hourly_rate_rupees",
                          signUpMutation.error as LocalAppError,
                        )?.msg ?? ""
                      }
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          hourly_rate_rupees: Number(e.target.value),
                        });
                      }}
                    />
                  </div>

                  <Input
                    variant="select"
                    label="Availability"
                    value={userInfo.availability}
                    hint="e.g Full time, Part time, or Not available"
                    error={
                      getLocalFieldErr(
                        "availability",
                        signUpMutation.error as LocalAppError,
                      )?.msg ?? ""
                    }
                    options={[
                      { label: "Full Time", value: "full time" },
                      { label: "Part Time", value: "part time" },
                      { label: "Not Available", value: "not available" },
                    ]}
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        availability: e.target.value as EAvailability,
                      });
                    }}
                  />
                </>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            btnText="Create Account & Verify"
            isDisabled={signUpMutation.isPending}
            onDisabledText="Creating..."
            trailingIcon={ArrowRight}
            onClick={() => handlerSignUp()}
          />

          <div className="w-full h-fit text-text-secondary py-4 flex flex-col items-center justify-center text-sm gap-5">
            <div className="w-[70%] flex items-center justify-between gap-1">
              <div className="flex-1 border-t border-border-subtle" />
              <span className="whitespace-nowrap px-2 text-xs font-medium text-text-dimmed">
                CONTINUE WITH
              </span>
              <div className="flex-1 border-t border-border-subtle" />
            </div>

            <Button variant="secondary" btnText="Continue With Google" />
          </div>

          <div className="w-[70%] h-fit border-t text-text-secondary border-border-subtle py-4 flex items-center justify-center text-sm">
            <span className="text-text-dimmed">Already have an account?</span>
            <button
              className="cursor-pointer hover:underline"
              onClick={() => setCurrentTab(ETabs.SIGN_IN)}
            >
              Sign In
            </button>
          </div>
        </div>
      ) : (
        <div className="w-md h-fit rounded-2xl bg-surface-subtle border border-border-subtle py-8 px-8 flex flex-col items-center justify-center gap-5 mt-20 mb-15 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
            <VerifiedIcon className="w-7 h-7 text-green-500" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">
              Account created successfully!
            </span>
            <span className="text-sm text-text-dimmed">
              A verification link has been sent to{" "}
              <strong>{userInfo.email}</strong>. Please check your email to
              verify your account.
            </span>
          </div>
          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Go to Inbox
          </a>
        </div>
      )}
    </>
  );
};

const SignIn = ({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<React.SetStateAction<ETabs>>;
}) => {
  const router = useRouter();

  const [signInInfo, setSignInInfo] = useState<SignInInfo>({
    email: "",
    password: "",
  });

  const signInMutation = useMutation<
    APISuccess,
    APIError | LocalAppError,
    SignInInfo
  >({
    mutationFn: SignInAPI,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handlerSignIn = () => {
    signInMutation.mutate(signInInfo);
  };

  useEffect(() => {
    if (signInMutation.data?.ok) {
      router.push("/portfolio-skills");
    }
  }, [signInMutation]);

  return (
    <>
      {!signInMutation.data?.ok &&
      (signInMutation.error as APIError)?.code == "NOT_VERIFIED" ? (
        <div className="w-md h-fit rounded-2xl bg-surface-subtle border border-border-subtle py-8 px-8 flex flex-col items-center justify-center gap-5 mt-20 mb-15 text-center">
          <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Mail className="w-7 h-7 text-amber-500" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Verify your email</span>
            <span className="text-sm text-text-dimmed">
              Your email address hasn’t been verified yet. We’ve sent a
              verification link to <strong>{signInInfo.email}</strong>. Check
              your inbox and verify your email to continue.
            </span>
          </div>
          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Check your email
          </a>
          <Button
            variant="transparent"
            btnText="Back to sign in"
            className="text-xs font-medium"
            textColor="text-text-dimmed"
            hoverTextColor="text-text-secondary"
            leadingIcon={ArrowLeft}
            onClick={() => signInMutation.reset()}
          />
        </div>
      ) : (
        <div
          className="w-md h-fit rounded-2xl bg-surface-subtle border border-border-subtle py-6 px-8 flex flex-col items-center justify-start gap-5 mt-20 mb-15"
          onKeyDown={(e) => e.key == "Enter" && handlerSignIn()}
        >
          <div className="w-full h-fit flex flex-col items-start justify-center gap-0.5">
            <span className="text-2xl font-semibold">Welcome back</span>
            <span className="text-xs text-text-dimmed">
              Sign in to access your talent workspace and project matches.
            </span>
          </div>

          <div className="w-full h-fit flex flex-col items-center justify-start gap-2">
            <Input
              variant="primary"
              label="Email Address"
              hint="e.g name@Company.com"
              value={signInInfo.email}
              error={
                getLocalFieldErr("email", signInMutation.error as LocalAppError)
                  ?.msg ?? ""
              }
              leadingIcon={Mail}
              onChange={(e) => {
                setSignInInfo({
                  ...signInInfo,
                  email: e.target.value,
                });
              }}
            />
            <Input
              variant="password"
              label="Password"
              hint="••••••••••••••••"
              value={signInInfo.password}
              error={
                getLocalFieldErr(
                  "password",
                  signInMutation.error as LocalAppError,
                )?.msg ?? ""
              }
              leadingIcon={Key}
              onChange={(e) => {
                setSignInInfo({
                  ...signInInfo,
                  password: e.target.value,
                });
              }}
            />

            <Button
              variant="transparent"
              btnText="Forgot Password?"
              className="text-xs ml-auto"
              textColor="text-text-dimmed"
              hoverTextColor="hover:text-text-primary"
              onClick={() => setCurrentTab(ETabs.FORGOT_PASSWORD)}
            />
          </div>

          <Button
            variant="primary"
            btnText="Sign in to Account"
            isDisabled={signInMutation.isPending}
            onDisabledText={"Signing In..."}
            trailingIcon={ArrowRight}
            onClick={() => handlerSignIn()}
          />

          <div className="w-full h-fit text-text-secondary py-4 flex flex-col items-center justify-center text-sm gap-5">
            <div className="w-[70%] flex items-center justify-between gap-1">
              <div className="flex-1 border-t border-border-subtle" />
              <span className="whitespace-nowrap px-2 text-xs font-medium text-text-dimmed">
                CONTINUE WITH
              </span>
              <div className="flex-1 border-t border-border-subtle" />
            </div>

            <Button variant="secondary" btnText="Continue With Google" />
          </div>

          <div className="w-[70%] h-fit border-t text-text-secondary border-border-subtle py-4 flex items-center justify-center text-sm">
            <span className="text-text-dimmed">Don't have an account?</span>
            <button
              className="cursor-pointer hover:underline"
              onClick={() => setCurrentTab(ETabs.SIGN_UP)}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ForgotPassword = ({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<React.SetStateAction<ETabs>>;
}) => {
  const [forgotPasswordInfo, setForgotPasswordInfo] =
    useState<ForgotPasswordInfo>({ email: "" });

  const forgotPasswordMutation = useMutation<
    APISuccess,
    LocalAppError | APIError,
    ForgotPasswordInfo
  >({
    mutationFn: ForgotPasswordAPI,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleForgotPassword = () => {
    forgotPasswordMutation.mutate(forgotPasswordInfo);
  };

  return (
    <>
      <div
        className="w-md h-fit px-6 py-6 rounded-2xl border border-border-subtle bg-surface-subtle flex flex-col items-center justify-center gap-4"
        onKeyDown={(e) => {
          e.key == "Enter" && handleForgotPassword();
        }}
      >
        <div className="w-full flex items-center justify-start">
          <div className="bg-surface-elevated border border-border-subtle rounded-xl w-10 h-10 flex items-center justify-center">
            <Key className="w-5 text-text-secondary" />
          </div>
        </div>

        <div className="w-full flex flex-col gap-1 items-start justify-center">
          <span className="text-text-primary text-2xl font-bold">
            Forgot Password?
          </span>
          <span className="text-xs text-text-dimmed">
            No worries. Enter your registered email address and we'll send a
            verification recovery code.
          </span>
        </div>

        <div className="w-full mt-4 flex flex-col gap-4 items-start justify-center">
          <Input
            variant="primary"
            label="Registered Email Address"
            hint="e.g name@Company.com"
            value={forgotPasswordInfo.email}
            error={
              getLocalFieldErr(
                "email",
                forgotPasswordMutation.error as LocalAppError,
              )?.msg ?? ""
            }
            leadingIcon={Mail}
            onChange={(e) => {
              setForgotPasswordInfo({
                ...forgotPasswordInfo,
                email: e.target.value,
              });
            }}
          />

          <Button
            variant="primary"
            btnText="Send recovery link"
            trailingIcon={ArrowRight}
            isDisabled={forgotPasswordMutation.isPending}
            onDisabledText={"Sending..."}
            onClick={() => handleForgotPassword()}
          />
        </div>

        <div className="w-[80%] h-fit border-t py-4 mt-3 border-border-subtle flex flex-col items-center justify-center">
          <Button
            variant="transparent"
            btnText="Back to sign in"
            className="text-xs font-medium"
            textColor="text-text-dimmed"
            hoverTextColor="text-text-secondary"
            leadingIcon={ArrowLeft}
            onClick={() => setCurrentTab(ETabs.SIGN_IN)}
          />
        </div>
      </div>
    </>
  );
};

const ResetPassword = ({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<React.SetStateAction<ETabs>>;
}) => {
  const searchParams = useSearchParams();

  const [resetPasswordInfo, setResetPasswordInfo] = useState<ResetPasswordInfo>(
    { newPassword: "", confirmPassword: "", token: "" },
  );
  const [validation, setValidation] = useState<{
    isMatched: boolean;
    isLowercase: boolean;
    isUppercase: boolean;
    isNumber: boolean;
    isLongEnough: boolean;
    isSymbol: boolean;
  }>();

  const resetPasswordMutation = useMutation<
    APISuccess,
    LocalAppError | ApiError,
    ResetPasswordInfo
  >({
    mutationFn: ResetPasswordAPI,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleResetPassword = () => {
    if (validation?.isMatched) {
      resetPasswordMutation.mutate(resetPasswordInfo);
    }
  };

  const handleValidation = async () => {
    try {
      await schemaValidator(resetPasswordSchema, resetPasswordInfo);
      setValidation({
        isMatched: true,
        isLowercase: true,
        isUppercase: true,
        isNumber: true,
        isLongEnough: true,
        isSymbol: true,
      });
    } catch (error) {
      const errors = (error as LocalAppError).fieldErrors || [];
      const errorCodes = new Set(errors.map((err) => err.code));

      setValidation({
        isLongEnough: !errorCodes.has("TOO_SHORT"),
        isNumber: !errorCodes.has("MISSING_NUMBER"),
        isLowercase: !errorCodes.has("MISSING_LOWERCASE"),
        isUppercase: !errorCodes.has("MISSING_UPPERCASE"),
        isSymbol: !errorCodes.has("MISSING_SYMBOL"),
        isMatched: !errorCodes.has("PASSWORD_MISMATCH"),
      });
    }
  };

  useEffect(() => {
    handleValidation();
  }, [resetPasswordInfo]);

  useEffect(() => {
    setResetPasswordInfo({
      ...resetPasswordInfo,
      token: searchParams.get("token") ?? "",
    });
  }, [searchParams]);

  return (
    <>
      {!resetPasswordMutation.data?.ok ? (
        <div
          className="w-md h-fit px-6 py-6 rounded-2xl border border-border-subtle bg-surface-subtle flex flex-col items-center justify-center gap-4 select-none"
          onKeyDown={(e) => {
            e.key == "Enter" && handleResetPassword();
          }}
        >
          <div className="w-full flex items-center justify-start">
            <div className="bg-surface-elevated border border-border-subtle rounded-xl w-10 h-10 flex items-center justify-center">
              <VerifiedIcon className="w-5 text-text-secondary" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-1 items-start justify-center">
            <span className="text-text-primary text-2xl font-bold">
              Reset Password
            </span>
            <span className="text-xs text-text-dimmed">
              choose a new, strong password.
            </span>
          </div>

          <div className="w-full h-fit flex flex-col items-start justify-center gap-4">
            <div className="flex flex-col w-full items-start justify-center gap-1">
              <Input
                variant="password"
                label="New Password*"
                hint="At least 8 characters"
                leadingIcon={LockIcon}
                value={resetPasswordInfo.newPassword}
                onChange={(e) => {
                  setResetPasswordInfo({
                    ...resetPasswordInfo,
                    newPassword: e.target.value,
                  });
                }}
              />

              <div className="w-full h-fit flex items-center justify-start gap-1 text-xs text-text-dimmed">
                <span
                  className={`${validation?.isLongEnough ? "text-text-secondary" : ""}`}
                >
                  8+ chars
                </span>
                <span>·</span>
                <span
                  className={`${validation?.isNumber ? "text-text-secondary" : ""}`}
                >
                  num
                </span>
                <span>·</span>
                <span
                  className={`${validation?.isSymbol ? "text-text-secondary" : ""}`}
                >
                  symbol
                </span>
                <span>·</span>
                <span
                  className={`${validation?.isUppercase ? "text-text-secondary" : ""}`}
                >
                  uppercase
                </span>
                <span>·</span>
                <span
                  className={`${validation?.isLowercase ? "text-text-secondary" : ""}`}
                >
                  lowercase
                </span>
                <span>·</span>
                <span
                  className={`${validation?.isMatched ? "text-text-secondary" : ""}`}
                >
                  matches
                </span>
              </div>
            </div>

            <Input
              variant="password"
              label="Confirm New Password*"
              hint="Confirm new password"
              leadingIcon={LockIcon}
              value={resetPasswordInfo.confirmPassword}
              onChange={(e) =>
                setResetPasswordInfo({
                  ...resetPasswordInfo,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <Button
            variant="primary"
            btnText="Reset Password"
            isDisabled={resetPasswordMutation.isPending}
            onDisabledText={"Resetting..."}
            trailingIcon={ArrowRight}
            onClick={handleResetPassword}
          />

          <div className="w-full h-fit border-t py-4 mt-3 border-border-subtle flex items-center justify-center select-none">
            <span className="text-xs text-text-muted font-medium">
              Remember your password?
            </span>
            <Button
              variant="transparent"
              btnText="Sign in"
              className="font-medium hover:underline"
              onClick={() => setCurrentTab(ETabs.SIGN_IN)}
            />
          </div>
        </div>
      ) : (
        <div className="w-md h-fit px-6 py-8 rounded-2xl border border-border-subtle bg-surface-subtle flex flex-col items-center justify-center gap-5 select-none text-center">
          <div className="bg-surface-elevated border border-border-subtle rounded-2xl w-14 h-14 flex items-center justify-center">
            <VerifiedIcon className="w-7 text-text-secondary" />
          </div>

          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <span className="text-text-primary text-2xl font-bold">
              Password reset successfully
            </span>
            <span className="text-sm text-text-dimmed">
              Your password has been updated. You can now sign in with your new
              password.
            </span>
          </div>

          <Button
            variant="primary"
            btnText="Sign in"
            trailingIcon={ArrowRight}
            onClick={() => setCurrentTab(ETabs.SIGN_IN)}
          />
        </div>
      )}
    </>
  );
};

const Verification = ({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<React.SetStateAction<ETabs>>;
}) => {
  const searchParams = useSearchParams();

  const [verifiedUserInfo, setVerifiedUserInfo] = useState<
    Omit<User, "password">
  >({
    name: "",
    email: "",
    is_client: false,
    profile_pic: "",
    is_email_verified: false,
    company: "",
  });

  const verificationMutation = useMutation<
    APISuccess,
    LocalAppError | APIError,
    VerifyEmailInfo
  >({
    mutationFn: VerifyEmailAPI,
    onSuccess: (data) => {
      setVerifiedUserInfo(data?.data);
    },
  });

  useEffect(() => {
    verificationMutation.mutate({ token: searchParams.get("token") as string });
  }, []);

  return (
    <>
      <div className="w-md h-fit px-6 py-6 rounded-2xl border border-border-subtle bg-surface-subtle flex flex-col items-center justify-center gap-4 select-none mt-20 mb-15">
        {verificationMutation.data?.ok ? (
          <>
            <div className="flex items-center justify-center bg-white w-14 h-14 rounded-2xl">
              <VerifiedIcon className="text-black w-12" />
            </div>

            <span className="text-xs bg-canvas px-2 py-0.5 rounded-md border border-border-subtle font-geist-mono font-medium text-text-muted tracking-widest">
              VERIFICATION COMPLETE
            </span>

            <div className="w-full h-fit flex flex-col gap-1 items-center justify-center">
              <span className="text-2xl font-semibold">
                Email Verified Successfully
              </span>
              <span className="text-xs text-text-dimmed">
                Your account is fully activated. You are ready to explore
                devlopsfolio.
              </span>
            </div>

            <div className="w-full h-fit flex flex-col items-center justify-center gap-1 px-3 py-3 border border-border-subtle bg-surface-elevated rounded-xl">
              <div className="w-full flex gap-2 items-center justify-start">
                {verifiedUserInfo.profile_pic ? (
                  <Image
                    src={"/test.jpeg"}
                    width={1000}
                    height={1000}
                    alt="Profile Pic"
                    className="w-12 h-12 rounded-lg border border-border-subtle"
                  />
                ) : (
                  <div className="px-4 py-4 flex items-center justify-center border border-border-subtle rounded-md">
                    <UserIcon className="w-8 h-8" />
                  </div>
                )}

                <div className="w-full h-fit flex flex-col items-start justify-center gap-1">
                  <div className="w-full flex items-center justify-start gap-2">
                    <span>{verifiedUserInfo.name}</span>
                    <span className="px-2 bg-text-primary tracking-wider rounded-sm text-black text-xs font-medium font-geist-mono">
                      {verifiedUserInfo.is_client ? "CLIENT" : "DEVELOPER"}
                    </span>
                  </div>
                  <span className="text-text-dimmed text-xs">
                    {verifiedUserInfo.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full border border-border-subtle rounded-xl bg-surface-elevated px-3 py-3 flex flex-col items-start justify-center gap-2">
              <span className="text-xs text-text-secondary font-medium">
                Next Steps in Your{" "}
                {verifiedUserInfo.is_client
                  ? "Client Workspace"
                  : "Developer Console"}
                :
              </span>

              <ul className="text-xs text-text-dimmed list-disc w-full space-y-1 pl-5">
                <li>
                  {verifiedUserInfo.is_client
                    ? "Select or post a project brief to run algorithmic talent matching."
                    : "Complete your skills matrix and upload portfolio projects."}
                </li>
                <li>
                  {verifiedUserInfo.is_client
                    ? "Tune algorithm parameters to recalibrate candidate rankings."
                    : "Browse client project opportunities with real-time match scores."}
                </li>
                <li>
                  {verifiedUserInfo.is_client
                    ? "Send direct invites and negotiate proposals with developers."
                    : "Submit custom proposals and receive direct project invitations."}
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              btnText={`Sign in to Account`}
              onClick={() => setCurrentTab(ETabs.SIGN_IN)}
              trailingIcon={ArrowRight}
            />
          </>
        ) : (
          <>
            <div className="w-full flex flex-col items-center gap-4 rounded-xl px-5 py-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <CircleAlert aria-hidden="true" className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold">
                  Verification link is incomplete
                </h2>
                <p className="text-sm text-text-dimmed">
                  This link is missing its verification token. Request a new
                  verification session by signing in, or sign in if you have
                  already verified your account.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 items-center justify-center">
                <Button
                  variant="primary"
                  btnText="Go to sign in"
                  trailingIcon={ArrowRight}
                  onClick={() => setCurrentTab(ETabs.SIGN_IN)}
                />
                <Button
                  variant="secondary"
                  btnText="Create an account"
                  className="text-xs"
                  textColor="text-text-dimmed"
                  hoverBgColor="text-text-secondary"
                  trailingIcon={ArrowRight}
                  onClick={() => setCurrentTab(ETabs.SIGN_UP)}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const AuthContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<SignUpInfo>({
    ...userDefaults,
    ...developerDefaults,
  });
  const [currentTab, setCurrentTab] = useState<ETabs>(
    (searchParams.get("tab") as ETabs) ?? ETabs.SIGN_UP,
  );

  useEffect(() => {
    if (!searchParams.get("tab")) {
      setCurrentTab(ETabs.SIGN_UP);
    } else {
      if (!Object.values(ETabs).includes(searchParams.get("tab") as ETabs)) {
        setCurrentTab(ETabs.SIGN_IN);
      } else {
        setCurrentTab(searchParams.get("tab") as ETabs);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("tab") === currentTab) return;
    params.set("tab", currentTab);
    router.push(`?${params.toString()}`);
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <div className="bg-canvas w-full h-12 border border-b-2 border-border-subtle flex px-12 py-2 items-center justify-between gap-5 font-geist-mono fixed">
        <h2 className="font-semibold">devlopsfolio.in</h2>
        <div className="w-fit h-full flex items-center justify-between gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`text-xs cursor-pointer outline-none transition-all duration-300 rounded-md px-2 py-1 ${currentTab === tab.matcher ? "bg-white text-black font-semibold" : "bg-transparent text-white hover:text-black hover:bg-white hover:font-semibold"}`}
              onClick={() => {
                setCurrentTab(tab.matcher);
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <Link
          href={"/"}
          className="flex w-fit h-full items-center justify-center gap-0.5 text-text-dimmed hover:text-text-secondary transition-all duration-300 text-sm font-semibold"
        >
          <ArrowLeft className="w-5"></ArrowLeft>
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full flex-1 flex items-center justify-center">
        {currentTab == ETabs.SIGN_UP && (
          <SignUp
            setCurrentTab={setCurrentTab}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}
        {currentTab == ETabs.SIGN_IN && (
          <SignIn setCurrentTab={setCurrentTab} />
        )}
        {currentTab == ETabs.FORGOT_PASSWORD && (
          <ForgotPassword setCurrentTab={setCurrentTab} />
        )}
        {currentTab == ETabs.RESET_PASSWORD && (
          <ResetPassword setCurrentTab={setCurrentTab} />
        )}
        {currentTab == ETabs.VERIFICATION && (
          <Verification setCurrentTab={setCurrentTab} />
        )}
      </div>

      <footer className="w-full px-12 py-2 h-14 bg-canvas border border-border-subtle mt-auto flex items-center justify-between">
        <span className="text-xs text-text-dimmed">
          devlopsfolio Auth System · End-to-End Cryptographic & Verification
          Flows
        </span>

        <div className="flex items-center justify-center gap-3">
          <button
            className="text-xs font-light text-text-muted hover:text-text-secondary transition-all duration-300"
            onClick={() => setCurrentTab(ETabs.SIGN_UP)}
          >
            Sign Up
          </button>
          <span className="text-sm text-text-dimmed">•</span>
          <button
            className="text-xs font-light text-text-muted hover:text-text-secondary transition-all duration-300"
            onClick={() => setCurrentTab(ETabs.SIGN_IN)}
          >
            Sign In
          </button>
          <span className="text-sm text-text-dimmed">•</span>
          <button
            className="text-xs font-light text-text-muted hover:text-text-secondary transition-all duration-300"
            onClick={() => setCurrentTab(ETabs.FORGOT_PASSWORD)}
          >
            Forgot Password
          </button>
          <span className="text-sm text-text-dimmed">•</span>
          <button
            className="text-xs font-light text-text-muted hover:text-text-secondary transition-all duration-300"
            onClick={() => setCurrentTab(ETabs.RESET_PASSWORD)}
          >
            Reset Password
          </button>
        </div>
      </footer>
    </div>
  );
};

const Auth = () => {
  return (
    <Suspense
      fallback={<div className="w-screen h-screen bg-canvas text-white"></div>}
    >
      <AuthNotRequired>
        <AuthContent />
      </AuthNotRequired>
    </Suspense>
  );
};

export default Auth;
