import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
    const user = await currentUser();
      // const fileInputRef = useRef<HTMLInputElement>(null);
    if (!userId) {
      redirect("/sign-in");
    }
  
    // Serialize the user data
    const serializedUser = user
      ? {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          username: user.username,
          emailAddress: user.emailAddresses?.[0]?.emailAddress,
        }
      : null;
  
  return (
    <div className="flex min-h-screen flex-col bg-default-50">
      {/* Navbar */}
      <Navbar user={serializedUser}/>

      {/* Main content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-12 md:px-6 md:py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
              {/* Hero Text */}
              <div className="space-y-6 text-center lg:text-left">
                <div>
                  <h1 className="mb-4 text-3xl font-bold leading-tight text-default-900 md:text-4xl lg:text-5xl">
                    Store your <span className="text-primary">images</span> with
                    ease
                  </h1>
                  <p className="text-lg text-default-600 md:text-xl">
                    Simple. Secure. Fast.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 pt-4 lg:justify-start">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button size="lg" variant="solid" color="primary">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button size="lg" variant="flat" color="primary">
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>

                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        variant="solid"
                        color="primary"
                        endContent={<ArrowRight className="h-4 w-4" />}
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>

              {/* Hero Illustration */}
              <div className="order-first flex justify-center lg:order-last">
                <div className="relative h-64 w-64 md:h-80 md:w-80">
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-24 w-24 text-primary/70 md:h-32 md:w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-default-50 px-4 py-12 md:px-6 md:py-16">
          <div className="container mx-auto">
            <div className="mb-8 text-center md:mb-12">
              <h2 className="text-2xl font-bold text-default-900 md:text-3xl">
                What You Get
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
              {/* Quick Uploads */}
              <Card className="border border-default-200 bg-default-50 shadow-sm transition-shadow hover:shadow-md">
                <CardBody className="p-6 text-center">
                  <CloudUpload className="mx-auto mb-4 h-10 w-10 text-primary md:h-12 md:w-12" />
                  <h3 className="mb-2 text-lg font-semibold text-default-900 md:text-xl">
                    Quick Uploads
                  </h3>
                  <p className="text-default-600">Drag, drop, done.</p>
                </CardBody>
              </Card>

              {/* Smart Organization */}
              <Card className="border border-default-200 bg-default-50 shadow-sm transition-shadow hover:shadow-md">
                <CardBody className="p-6 text-center">
                  <Folder className="mx-auto mb-4 h-10 w-10 text-primary md:h-12 md:w-12" />
                  <h3 className="mb-2 text-lg font-semibold text-default-900 md:text-xl">
                    Smart Organization
                  </h3>
                  <p className="text-default-600">
                    Keep it tidy, find it fast.
                  </p>
                </CardBody>
              </Card>

              {/* Locked Down */}
              <Card className="mx-auto max-w-md border border-default-200 bg-default-50 shadow-sm transition-shadow hover:shadow-md sm:col-span-2 sm:mx-0 sm:max-w-full md:col-span-1">
                <CardBody className="p-6 text-center">
                  <Shield className="mx-auto mb-4 h-10 w-10 text-primary md:h-12 md:w-12" />
                  <h3 className="mb-2 text-lg font-semibold text-default-900 md:text-xl">
                    Locked Down
                  </h3>
                  <p className="text-default-600">
                    Your images, your eyes only.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-default-50 px-4 py-12 md:px-6 md:py-20">
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-2xl font-bold text-default-900 md:text-3xl">
              Ready?
            </h2>

            <SignedOut>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="solid"
                    color="primary"
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    Let&apos;s Go
                  </Button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="solid"
                  color="primary"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-default-200 bg-default-50 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center gap-2 md:mb-0">
              <CloudUpload className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Droply</h2>
            </div>
            <p className="text-sm text-default-500">
              &copy; {new Date().getFullYear()} Droply
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
