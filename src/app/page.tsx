import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title:
    "CINEMA GO | Sign in",
  description: "Sign in",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout> */}
        <SignIn />
      {/* </DefaultLayout> */}
    </>
  );
}
