"use client";
import React from "react";
import Slideshow from "@/app/_components/_home/slideshow";
import LoginCard from "@/app/_components/_home/loginCard";

const LoginPage = () => {
  return (
    <>
      <div className="relative min-h-screen">
        <Slideshow />
        <div className="absolute inset-0 flex items-center justify-center p-4 md:hidden">
          <LoginCard />
        </div>
        <div className="hidden min-h-screen md:flex">
          <div className="relative flex-1">
            <Slideshow />
          </div>
          <div className="flex flex-1 items-center justify-center p-4">
            <LoginCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
