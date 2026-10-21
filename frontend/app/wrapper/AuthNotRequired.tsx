"use client";
import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IsSignedInAPI } from "../auth/api";

const AuthNotRequired = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isSignedInMutaion = useMutation({
    mutationFn: IsSignedInAPI,
    onSuccess: (data) => {
      if (data.data) {
        router.push("/portfolio-skills");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    isSignedInMutaion.mutate();
  }, []);

  return <div>{children}</div>;
};

export default AuthNotRequired;
