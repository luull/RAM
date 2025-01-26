import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import SignIn from "./auth/signin/page";
import HomePage from "@/components/LandingPage/HomePage";

export const metadata: Metadata = {
  title:
    "RAM | Landing Page",
  description: "Landing Page",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout> */}
        <HomePage />
      {/* </DefaultLayout> */}
    </>
  );
}
