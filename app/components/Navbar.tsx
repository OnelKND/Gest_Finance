"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { HandCoins } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { checkAndAddUser } from "../actions";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(()=> {
    if (user?.primaryEmailAddress?.emailAddress) {
      checkAndAddUser(user?.primaryEmailAddress?.emailAddress);
    }
  } ,[user])

  
  return (
    <div className="bg-base-200/30 px-5 md:px-[10%] py-4">
      {isLoaded &&
        (isSignedIn ? (
          <>
            {/* Nav large ecran */}
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center space-x-2 text-2xl font-bold">
                <span>
                  Gest <span className="text-accent">_Finance</span>
                </span>
                <HandCoins className="w-10 h-10 text-accent" />
              </div>
              {/* Lien */}
              <div className="md:flex hidden">
                <Link className="btn" href={"/budgets"}>
                  Mes budgets
                </Link>
                <Link className="btn mx-4" href={""}>
                  Tableau de bord
                </Link>
                <Link className="btn" href={""}>
                  Mes Transactions
                </Link>
              </div>
              <UserButton />
            </div>

            <div className="md:hidden flex mt-2 justify-center">
              <Link className="btn btn-sm" href={"/budgets"}>
                Mes budgets
              </Link>
              <Link className="btn mx-4 btn-sm" href={""}>
                Tableau de bord
              </Link>
              <Link className="btn btn-sm" href={""}>
                Mes Transactions
              </Link>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-2xl font-bold">
              <span>
                Gest <span className="text-accent">_Finance</span>
              </span>
              <HandCoins className="w-10 h-10 text-accent" />
            </div>
            <div className="flex mt-2 justify-center">
              <Link className="btn btn-sm" href={"/sign-in"}>
                Se connecter
              </Link>
              <Link className="btn mx-4 btn-sm btn-accent" href={"/sign-up"}>
                S&apos;inscrire
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
