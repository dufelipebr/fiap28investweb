'use client';
import { useState, useEffect } from 'react'
import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import "./globals.css";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {Avatar, Dropdown} from "flowbite-react";
import { LoginInfo } from './lib/login';

//const inter = Inter({ subsets: ["latin"] });
const navigation = [
  
]
/*export const metadata: Metadata = {
  title: "Bronco InsurTec Solutions",
  description: "Somos uma empresa que cuida de você",
};*/

function classNames(...classes) 
{
  return classes.filter(Boolean).join(' ')
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({nome: '', email: ''})

  useEffect(() => {
    const loginData = LoginInfo();
    if (loginData) {
      setLoggedIn(true)
      setUserInfo({nome: loginData.username, email: loginData.email});
    }
  }, [])

  console.log(userInfo.nome);
  console.log(userInfo.email);

  // const handleLogoff =  (event) => 
  // {

  // }
 
  return (
    <html lang="en">
      <body>
      <div className="bg-neutral-400">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Insurtec Solution</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
        </nav>

      </header>
        {children}
      </div>
      </body>
    </html>
  );
}
