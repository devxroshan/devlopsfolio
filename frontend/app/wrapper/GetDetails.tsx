"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { GetMeAPI } from "../api/user.api";
import { APISuccess } from "../types/api-success";
import { LocalAppError } from "../types/local-error";
import { APIError } from "../types/api-error";
import { userStore } from "../stores/user-store";

const omittedUserFetch = ["auth", "/"];

const GetDetails = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  //   Stores
  const user = userStore();

  const [fetchUserDetails, setFetchUserDetails] = useState<boolean>(
    !omittedUserFetch.includes(pathname),
  );

  const getUserDetails = useQuery<APISuccess, LocalAppError | APIError>({
    queryFn: GetMeAPI,
    queryKey: ["user-details"],
    enabled: fetchUserDetails == true,
  });

  useEffect(() => {
    if (getUserDetails.data?.ok) {
      user.setUser(getUserDetails.data.data);
    }
  }, [getUserDetails.data]);

  useEffect(() => {
    setFetchUserDetails(!omittedUserFetch.includes(pathname));
  }, []);

  return <>{children}</>;
};

export default GetDetails;
