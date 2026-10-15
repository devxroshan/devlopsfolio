"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Building,
  Key,
  BriefcaseIcon,
  Clock,
  LocateIcon,
} from "lucide-react";
import React, { Dispatch, Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

// components
import Input from "../components/Input";
import Button from "../components/Button";

const enum ETabs {
  SIGN_UP = "sign_up",
  SIGN_IN = "sign_in",
  FORGOT_PASSWORD = "forgot_password",
  RESET_PASSWORD = "reset_password",
  VERIFICATION = "verification",
}

const enum EAccountType {
  DEVELOPER = "developer",
  CLIENT = "client",
}

const enum EAvailability {
  FULL_TIME = "full time",
  PART_TIME = "part time",
  NOT_AVAILABLE = "not available",
}

const tabs = [
  { name: "Sign Up", matcher: ETabs.SIGN_UP },
  { name: "Sign In", matcher: ETabs.SIGN_IN },
  { name: "Forgot Password", matcher: ETabs.FORGOT_PASSWORD },
  { name: "Reset Password", matcher: ETabs.RESET_PASSWORD },
  { name: "Verification", matcher: ETabs.VERIFICATION },
] as const;

interface IUser {
  name: string;
  email: string;
  password: string;
  is_client: boolean;
  company: string;
}

interface IDeveloper {
  discipline: string;
  title: string;
  time_zone: string;
  location: string;
  experience_years: number;
  availability: EAvailability;
  hourly_rate_rupees: number;
}

type SignUpInfo = IUser & Partial<IDeveloper>;

const userDefaults = {
  name: "",
  email: "",
  password: "",
  is_client: true,
  company: "",
};

const developerDefaults = {
  discipline: "",
  title: "",
  time_zone: "",
  location: "",
  experience_years: 0,
  availability: EAvailability.NOT_AVAILABLE,
  hourly_rate_rupees: 0,
};

const SignUp = ({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<React.SetStateAction<ETabs>>;
}) => {
  const [userInfo, setUserInfo] = useState<SignUpInfo>({
    ...userDefaults,
    ...developerDefaults,
  });

  const handlerSignUp = () => {
    console.log(userInfo);
  };

  return (
    <>
      <div
        className="w-lg h-fit rounded-2xl bg-surface-subtle border border-border-subtle py-3 px-4 flex flex-col items-center justify-start gap-3"
        onKeyDown={() => handlerSignUp()}
      >
        <div className="w-full h-fit flex flex-col items-start justify-center gap-0.5">
          <span className="text-xl font-semibold">Create Account</span>
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
                });
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
            leadingIcon={User}
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
            hint="e.g your@mail.com"
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
            hint="••••••••••••••••"
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
                    hint="e.g Full-stack Development"
                    options={[
                      { label: "Frontend Development", value: "Frontend Development" },
                      { label: "Backend Development", value: "Backend Development" },
                      { label: "Full-stack Development", value: "Full-stack Development" },
                      { label: "Mobile App Development", value: "Mobile App Development" },
                      { label: "Game Development", value: "Game Development" },
                      { label: "DevOps & Site Reliability Engineering", value: "DevOps & Site Reliability Engineering" },
                      { label: "Cloud Engineering", value: "Cloud Engineering" },
                      { label: "Data Engineering", value: "Data Engineering" },
                      { label: "AI & Machine Learning Engineering", value: "AI & Machine Learning Engineering" },
                      { label: "Cybersecurity Engineering", value: "Cybersecurity Engineering" },
                      { label: "Software Testing & Quality Assurance", value: "Software Testing & Quality Assurance" },
                      { label: "Embedded Systems Engineering", value: "Embedded Systems Engineering" },
                      { label: "Database Engineering", value: "Database Engineering" },
                      { label: "Platform Engineering", value: "Platform Engineering" },
                      { label: "Blockchain Development", value: "Blockchain Development" },
                    ]}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, discipline: e.target.value });
                    }}
                  />
                  <Input
                    variant="primary"
                    label="Title"
                    hint="e.g Senior Software Engineer"
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
                    leadingIcon={Clock}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, time_zone: e.target.value });
                    }}
                  />
                  <Input
                    variant="primary"
                    label="Location"
                    hint="e.g Bengaluru, India"
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
                    hint="e.g 5"
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
                  hint="e.g Full time, Part time, or Not available"
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
          trailingIcon={ArrowRight}
          onClick={() => handlerSignUp()}
        />

        <div className="w-[70%] h-fit border-t text-text-secondary border-border-subtle py-4 flex items-center justify-center text-sm mt-4">
          <span className="text-text-dimmed">Already have an account?</span>
          <button
            className="cursor-pointer hover:underline"
            onClick={() => setCurrentTab(ETabs.SIGN_IN)}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

const SignIn = () => {
  return <></>;
};

const ForgotPassword = () => {
  return <></>;
};

const ResetPassword = () => {
  return <></>;
};

const Verification = () => {
  return <></>;
};

const AuthContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState<ETabs>(
    (searchParams.get("tab") as ETabs) ?? ETabs.SIGN_UP,
  );

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.push(`?tab=${tabs[0].matcher}`);
      setCurrentTab(tabs[0].matcher);
    } else {
      router.push(`?tab=${currentTab}`);
    }
    return () => {};
  }, [currentTab]);

  return (
    <>
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

      <div className="w-full h-full flex items-center justify-center mt-20 mb-15">
        {currentTab == ETabs.SIGN_UP && (
          <SignUp setCurrentTab={setCurrentTab} />
        )}
        {currentTab == ETabs.SIGN_IN && <SignIn />}
        {currentTab == ETabs.FORGOT_PASSWORD && <ForgotPassword />}
        {currentTab == ETabs.RESET_PASSWORD && <ResetPassword />}
        {currentTab == ETabs.VERIFICATION && <Verification />}
      </div>

      <footer className="w-full px-12 py-2 h-14 bg-canvas border border-border-subtle flex items-center justify-between">
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
    </>
  );
};

const Auth = () => {
  return (
    <Suspense
      fallback={<div className="w-screen h-screen bg-canvas text-white"></div>}
    >
      <AuthContent />
    </Suspense>
  );
};

export default Auth;
