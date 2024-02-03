"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Signed in successfully");

      if (origin) {
        router.push("/origin");
        return;
      }

      if (isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
      router.refresh();
    },

    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invealid email or password.");
      }
    },
  });

  const onSubmit = async ({ email, password }: TAuthCredentialsValidator) => {
    await signIn({ email, password });
  };

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0 px-2.5">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller ? "seller" : ""} account
            </h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-up"
            >
              Don&apos;t have an account?
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    placeholder="example@example.com"
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    {...register("email", {
                      required: "Email is required field",
                    })}
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    {...register("password", {
                      required: "Password is required field",
                    })}
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button>Sign In</Button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute -z-10 inset-0 flex items-center">
                <div className="border-t w-full" />
              </div>
              <div className="flex justify-center">
                <span className="bg-background text-muted-foreground px-2 text-xs uppercase">
                  or
                </span>
              </div>
            </div>

            {isSeller ? (
              <Button
                onClick={continueAsBuyer}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
