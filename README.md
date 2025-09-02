This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Droply 🚀

Droply is a modern platform for secure and fast file management, with a sleek UI, real-time performance, and robust backend powered by Next.js, Clerk, Neon, Drizzle, and ImageKit.

Features ✨

🔐 Secure Authentication via Clerk

📂 File Upload & Management with ImageKit integration

🌐 Responsive UI using HeroUI

⚡ Fast Performance powered by Next.js API routes

🎉 Immediate Adoption: 50+ users on the first day

📊 Optional Analytics & Tracking

Tech Stack 🛠️
Layer	Technology
Frontend	Next.js, HeroUI
Authentication	Clerk
Database	Neon (PostgreSQL)
ORM	Drizzle
File Storage	ImageKit
Backend	Next.js API Routes
Screenshots / Demo 🎬




Or insert a GIF showing Droply in action:


Installation & Setup ⚡

Clone the repository

git clone https://github.com/yourusername/droply.git
cd droply


Install dependencies

npm install


Configure environment variables
Create a .env file in the root:

# Database URL
DATABASE_URL

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
IMAGEKIT_PRIVATE_KEY
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_UR
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL

# Fallback URLs
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL

# App URLs
NEXT_PUBLIC_APP_URL

Run the project

npm run dev


Open in browser
Navigate to http://localhost:3000

Project Structure 📂
droply/
├── app/                # Next.js frontend & API routes
├── components/         # Reusable UI components (HeroUI)
├── lib/                # Database & ORM setup (Drizzle)
├── public/             # Static assets
├── styles/             # Global & component CSS
└── README.md           # Documentation

Contributions 🤝

Contributions are welcome!

Fork the repo

Create a feature branch (git checkout -b feature/YourFeature)

Commit changes (git commit -m 'Add YourFeature')

Push branch (git push origin feature/YourFeature)

Open a pull request

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
