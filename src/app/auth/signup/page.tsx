'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { prefix } from "@/utils/prefix";
import useLocalStorage from "@/hooks/useLocalStorage"; 
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
  const [userDaftar, setUserDaftar] = useLocalStorage<any>("user-sign", []);
    const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    role:"user"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUserData = {
      username: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      password: formData.password, 
      role:"user", 
    };

    setUserDaftar((prevData: any) => [...prevData, newUserData]);
    router.push("/auth/signin");
    setFormData({
      username: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      role: "user",
    });
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 mt-15 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-wrap items-center">
        <div className="w-full xl:w-1/2">
          <div className="w-full p-4 sm:p-12.5 xl:p-15">
            <Breadcrumb pageName="Daftar" />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-dark dark:text-white mb-2">Username</label>
                <input 
                  type="text" 
                  name="username" 
                  className="w-full p-3 border rounded-lg dark:bg-dark-2 dark:text-white" 
                  placeholder="Masukkan nama lengkap" 
                  value={formData.username} 
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-dark dark:text-white mb-2">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="w-full p-3 border rounded-lg dark:bg-dark-2 dark:text-white" 
                  placeholder="Masukkan email" 
                  value={formData.email} 
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-dark dark:text-white mb-2">No. Telepon</label>
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  className="w-full p-3 border rounded-lg dark:bg-dark-2 dark:text-white" 
                  placeholder="Masukkan no telepon" 
                  value={formData.phoneNumber} 
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-dark dark:text-white mb-2">Alamat Lengkap</label>
                <textarea 
                  name="address" 
                  className="w-full p-3 border rounded-lg dark:bg-dark-2 dark:text-white" 
                  placeholder="Masukkan alamat lengkap" 
                  value={formData.address} 
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-dark dark:text-white mb-2">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  className="w-full p-3 border rounded-lg dark:bg-dark-2 dark:text-white" 
                  placeholder="Masukkan password" 
                  value={formData.password} 
                  onChange={handleChange}
                />
                <hr className="my-5"/>
              </div>
              <button type="submit" className="w-full bg-secondary text-white py-3 rounded-lg font-medium">Daftar</button>
            </form>
          <div className="mt-6 text-center">
        <p>
        Sudah punya akun ?{" "}
          <Link href="/auth/signin" className="text-primary">
            Login
          </Link>
        </p>
      </div>
          </div>
        </div>

        <div className="hidden w-full p-5 xl:block xl:w-1/2">
          <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
            <Link className="mb-10 justify-center flex" href="/">
              <Image
                className="hidden dark:block"
                src={`${prefix}/images/logo/RAM-dark.png`}
                alt="Logo"
                width={276}
                height={32}
              />
              <Image
                className="dark:hidden"
                src={`${prefix}/images/logo/RAM-light.png`}
                alt="Logo"
                width={276}
                height={32}
              />
            </Link>
            <p className="mb-3 text-xl font-medium text-center text-dark dark:text-white">
              Buat akun baru Anda
            </p>
            <h1 className="mb-4 text-2xl font-bold text-center text-dark dark:text-white sm:text-heading-3">
              Bergabung bersama kami!
            </h1>
            <p className="text-center font-medium mb-0 text-dark-4 dark:text-dark-6">
              Silakan daftar dengan mengisi kolom di sebelah kiri ini
            </p>

            <div>
              <Image
                src={`${prefix}/images/grids/grid-02.svg`}
                alt="Logo"
                width={305}
                height={100}
                className="mx-auto dark:opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
