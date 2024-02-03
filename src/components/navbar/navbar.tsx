import { MainWrapper } from "../main-wrapper";
import { Icons } from "../icons";
import { NavItems } from "./nav-items";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Cart } from "../cart";
import { getServerSideUser } from "@/lib/payload-utils";
import { NavUser } from "./nav-user";

export const Navbar = async () => {
  const { user } = await getServerSideUser();

  return (
    <div className="bg-white sticky z-[49] top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MainWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* TODO: mobile nav */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">{<Icons.logo className="h-10 w-10" />}</Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-3">
                  {!!user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign in
                    </Link>
                  )}

                  {!!user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {!!user ? null : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Create account
                    </Link>
                  )}

                  {!!user ? <NavUser user={user} /> : null}

                  {!!user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}

                  {!!user ? (
                    <div className="flow-root">
                      <Cart />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </MainWrapper>
      </header>
    </div>
  );
};
