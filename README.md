#🌟 Droply

A modern platform for secure and fast file management with a sleek UI, real-time performance, and a robust backend.









✨ Features

🔐 Secure Authentication via Clerk

📂 File Upload & Management with ImageKit integration

🌐 Responsive UI powered by HeroUI

⚡ Fast Performance using Next.js API routes

🎉 Immediate Adoption – 50+ users on the first day

📊 Optional Analytics & Tracking

🛠️ Tech Stack
Layer	Technology
Frontend	Next.js, HeroUI
Authentication	Clerk
Database	Neon (PostgreSQL)
ORM	Drizzle
File Storage	ImageKit
Backend	Next.js API Routes



🎬 Screenshots / Demo
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f70fdeb2-8862-49a6-a8c4-f17055275cee" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e56db2c0-8b5f-4b75-9015-6f68ff5b1991" />

⚡ Installation & Setup

Clone the repository

git clone https://github.com/yourusername/droply.git
cd droply


Install dependencies

npm install


Configure environment variables → Create a .env file in the root

# Database
DATABASE_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

# Fallback URLs
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=

# App
NEXT_PUBLIC_APP_URL=


Run the project

npm run dev


Open in browser
👉 http://localhost:3000

📂 Project Structure
droply/
├── app/          # Next.js frontend & API routes
├── components/   # Reusable UI components (HeroUI)
├── lib/          # Database & ORM setup (Drizzle)
├── public/       # Static assets
├── styles/       # Global & component CSS
└── README.md     # Documentation

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a feature branch

git checkout -b feature/YourFeature


Commit changes

git commit -m "Add YourFeature"


Push to branch

git push origin feature/YourFeature


Open a pull request

🚀 Deployment

The easiest way to deploy your Next.js app is via Vercel
 – from the creators of Next.js.

Check the official Next.js deployment docs
 for more details.

💡 Droply makes file management fast, secure, and delightful.
