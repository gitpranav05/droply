"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Mail, Github, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function SignInForm() {
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      const result = await signIn.create({
        identifier: data.identifier,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setAuthError("Sign-in could not be completed. Please try again.");
      }
    } catch (error: any) {
      setAuthError(
        error.errors?.[0]?.message ||
          "An error occurred during sign-in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignIn = async (provider: "oauth_google" | "oauth_github") => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl">
          <CardHeader className="flex flex-col gap-1 items-center pb-2">
            <h1 className="text-3xl font-bold text-black drop-shadow">
              Welcome Back
            </h1>
            <p className="text-black/80 text-center text-sm">
              Sign in to access your secure cloud storage
            </p>
          </CardHeader>

          <Divider className="bg-white/30" />

          <CardBody className="py-6">
            {authError && (
              <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-6 flex items-center gap-2 border border-red-400/30">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{authError}</p>
              </div>
            )}

            {/* Email + Password Sign In */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="identifier"
                  className="text-sm font-medium text-black"
                >
                  Email
                </label>
                <Input
                  id="identifier"
                  type="email"
                  
                  placeholder="your.email@example.com"
                  startContent={<Mail className="h-4 w-4 text-black/70" />}
                  isInvalid={!!errors.identifier}
                  errorMessage={errors.identifier?.message}
                  {...register("identifier")}
                  className="w-full"
                  classNames={{
                    input: "text-black placeholder-black/60",
                    inputWrapper:
                      "bg-white/10  border-white/30  focus-within:ring-indigo-400",
                  }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-black"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  startContent={<Lock className="h-4 w-4 text-black/70" />}
                  endContent={
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-black/70" />
                      ) : (
                        <Eye className="h-4 w-4 text-black/70" />
                      )}
                    </Button>
                  }
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  {...register("password")}
                  className="w-full"
                  classNames={{
                    input: "text-black placeholder-black/60",
                    inputWrapper:
                      "bg-white/10 border border-white/30 focus-within:ring-indigo-400",
                  }}
                />
              </div>

              <Button
                type="submit"
                color="primary"
                className="w-full font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-black shadow-lg hover:shadow-indigo-500/50 transition-all"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Divider for OAuth */}
            <div className="flex items-center gap-2 my-6">
              <Divider className="flex-1 bg-white/30" />
              <span className="text-sm text-black/70">or</span>
              <Divider className="flex-1 bg-white/30" />
            </div>

            {/* Social Sign-In Buttons */}
            <div className="space-y-3">
              <Button
                variant="bordered"
                className="w-full bg-white/10 text-black hover:bg-white/20 transition-all"
                onClick={() => handleOAuthSignIn("oauth_google")}
              >
                <FcGoogle className="h-5 w-5" /> Sign in with Google
              </Button>
              <Button
                variant="bordered"
                className="w-full bg-white/10 text-black hover:bg-white/20 transition-all"
                onClick={() => handleOAuthSignIn("oauth_github")}
              >
                <Github className="h-5 w-5" /> Sign in with GitHub
              </Button>
            </div>
          </CardBody>

          <Divider className="bg-white/30" />

          <CardFooter className="flex justify-center py-4">
            <p className="text-sm text-black/80">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="text-indigo-200 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
