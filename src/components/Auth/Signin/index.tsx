"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <>


      <div>
        <SigninWithPassword />
      </div>
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Atau login dari gugel
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>
      <GoogleSigninButton text="Login dari" />

      <div className="mt-6 text-center">
        <p>
          Belum punya akun ?{" "}
          <Link href="/auth/signup" className="text-primary">
            Daftar
          </Link>
        </p>
      </div>
    </>
  );
}
