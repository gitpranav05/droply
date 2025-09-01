"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import {
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Github,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signUpSchema } from "@/schemas/signUpSchema";
import { motion } from "framer-motion";

export default function SignUpForm() {
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (error: any) {
      setAuthError(
        error.errors?.[0]?.message ||
          "An error occurred during sign-up. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setIsSubmitting(true);
    setVerificationError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setVerificationError("Verification could not be completed. Please try again.");
      }
    } catch (error: any) {
      setVerificationError(
        error.errors?.[0]?.message ||
          "An error occurred during verification. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignUp = (provider: "oauth_google" | "oauth_github") => {
    if (!isLoaded || !signUp) return;
    return signUp.authenticateWithRedirect({
      strategy: provider,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center  p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl">
            <CardHeader className="flex flex-col gap-1 items-center pb-2">
              <h1 className="text-3xl font-bold text-black drop-shadow">
                Verify Your Email
              </h1>
              <p className="text-black/80 text-center text-sm">
                We've sent a verification code to your email
              </p>
            </CardHeader>

            <Divider className="bg-white/30" />

            <CardBody className="py-6">
              {verificationError && (
                <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-6 flex items-center gap-2 border border-red-400/30">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p>{verificationError}</p>
                </div>
              )}

              <form onSubmit={handleVerificationSubmit} className="space-y-6">
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="Enter the 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full"
                  classNames={{
                    input: "text-black placeholder-white/60",
                    inputWrapper:
                      "bg-white/10 border border-white/30 focus-within:ring-2 focus-within:ring-indigo-400",
                  }}
                  autoFocus
                />

                <Button
                  type="submit"
                  color="primary"
                  className="w-full font-semibold rounded-xl  text-black shadow-lg hover:shadow-indigo-500/50 transition-all"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify Email"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-black/70">
                  Didn't receive a code?{" "}
                  <button
                    onClick={async () => {
                      if (signUp) {
                        await signUp.prepareEmailAddressVerification({
                          strategy: "email_code",
                        });
                      }
                    }}
                    className="text-indigo-200 hover:underline font-medium"
                  >
                    Resend code
                  </button>
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl">
          <CardHeader className="flex flex-col gap-1 items-center pb-2">
            <h1 className="text-3xl font-bold text-black drop-shadow">
              Create Your Account
            </h1>
            <p className="text-black/80 text-center text-sm">
              Sign up to start managing your images securely
            </p>
          </CardHeader>

          <Divider className="bg-white/30" />

          <CardBody className="py-6 space-y-6">
            {/* Social Sign Up */}
            <div className="flex flex-col gap-3">
              <Button
                variant="bordered"
                className="w-full bg-white/10 text-black hover:bg-white/20 transition-all"
                onClick={() => handleOAuthSignUp("oauth_google")}
              >
                <FcGoogle className="h-5 w-5" /> Continue with Google
              </Button>
              <Button
                variant="bordered"
                className="w-full bg-white/10 text-black hover:bg-white/20 transition-all"
                onClick={() => handleOAuthSignUp("oauth_github")}
              >
                <Github className="h-5 w-5" /> Continue with GitHub
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Divider className="flex-1 bg-white/30" />
              <span className="text-xs text-black/70">or</span>
              <Divider className="flex-1 bg-white/30" />
            </div>

            {authError && (
              <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-2 flex items-center gap-2 border border-red-400/30">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{authError}</p>
              </div>
            )}

            {/* Email + Password Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                startContent={<Mail className="h-4 w-4 text-black/70" />}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                {...register("email")}
                className="w-full"
                classNames={{
                  input: "text-black placeholder-black/60",
                  inputWrapper:
                    "bg-white/10 border border-white/30 focus-within:ring-indigo-400",
                }}
              />

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
                    "bg-white/10 border border-white/30  focus-within:ring-indigo-400",
                }}
              />

              <Input
                id="passwordConfirmation"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                startContent={<Lock className="h-4 w-4 text-black/70" />}
                endContent={
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-black/70" />
                    ) : (
                      <Eye className="h-4 w-4 text-black/70" />
                    )}
                  </Button>
                }
                isInvalid={!!errors.passwordConfirmation}
                errorMessage={errors.passwordConfirmation?.message}
                {...register("passwordConfirmation")}
                className="w-full"
                classNames={{
                  input: "text-black placeholder-black/60",
                  inputWrapper:
                    "bg-white/10 border border-white/30  focus-within:ring-indigo-400",
                }}
              />

              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-300 mt-0.5" />
                <p className="text-sm text-black/80">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
                <div id="clerk-captcha" data-cl-theme="dark" data-cl-size="flexible" />
              <Button
                type="submit"
                color="primary"
                className="w-full font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/50 transition-all"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </CardBody>

          <Divider className="bg-white/30" />

          <CardFooter className="flex justify-center py-4">
            <p className="text-sm text-black/80">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-indigo-200 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
