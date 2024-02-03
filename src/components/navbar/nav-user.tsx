"use client";

import { User } from "@/payload-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

interface NavUserProps {
  user: User;
}

export const NavUser = ({ user }: NavUserProps) => {
  const { signOut } = useAuth();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
          <Button variant="ghost" size="sm" className="relative">
            My account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent clasName="bg-white w-60">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              <p className="font-medium text-sm text-black">{user.email}</p>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/sell">Seller Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={signOut} className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
