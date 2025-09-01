import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";
import { CloudUpload } from "lucide-react";
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navbar */}
      <Navbar user={serializedUser} />

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Welcome back, {user?.firstName || "Explorer"} 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your uploads and explore your files in style.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10">
            {/* <Button
          color="primary"
          variant="flat"
          startContent={<FileUp className="h-4 w-4" />}
          onClick={() => fileInputRef.current?.click()}
          className="flex-1"
        >
          Add Image
        </Button> 
         */}
          {/* Upload Section */}
          {/* <div className="bg-white/5 rounded-2xl p-8 shadow-lg backdrop-blur-lg border border-white/10 transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              Upload Files
            </h2>
            <p className="text-gray-400 mb-6">
              Drag & drop your files here or click to browse.
            </p>
            <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-500/10 transition-colors">
              <CloudUpload className="w-12 h-12 text-purple-400" />
            </div>
          </div> */}

          {/* Dashboard Content */}
          <div className="bg-white/5 rounded-2xl p-8 shadow-lg backdrop-blur-lg border border-white/10 transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Your Files
            </h2>
            <DashboardContent
              userId={userId}
              userName={
                user?.firstName ||
                user?.fullName ||
                user?.emailAddresses?.[0]?.emailAddress ||
                ""
              }
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-6 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-6 w-6 text-purple-400" />
              <h2 className="text-lg font-bold">Droply</h2>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Droply. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
