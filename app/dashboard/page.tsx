import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CloudUpload } from "lucide-react";

import DashboardContent from "@/components/DashboardContent";
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
  // Authentication check
  const { userId } = await auth();
  const user = await currentUser();

  // Redirect unauthenticated users
  if (!userId) {
    redirect("/sign-in");
  }

  // Serialize user data to avoid passing Clerk User object directly
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

  // Extract display name with fallback chain
  const displayName =
    user?.firstName ||
    user?.fullName ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "";

  return (
    <div className="min-h-screen flex flex-col bg-default-50">
      {/* Navigation */}
      <Navbar user={serializedUser} />

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-6">
        <DashboardContent userId={userId} userName={displayName} />
      </main>

      {/* Footer */}
      <footer className="bg-default-50 border-t border-default-200 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Brand */}
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Droply</h2>
            </div>

            {/* Copyright */}
            <p className="text-default-500 text-sm">
              &copy; {new Date().getFullYear()} Droply
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}