"use client";
import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { IsSignedInAPI } from "../auth/api";

const AuthRequired = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isSignedInMutation = useMutation({
    mutationFn: IsSignedInAPI,
    onSuccess: (data) => {
      if (!data.data) {
        router.push("/auth?tab=sign_in");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    isSignedInMutation.mutate();
  }, []);

  return <div>{children}</div>;
};

export default AuthRequired;
