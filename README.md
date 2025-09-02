

<h1 align="center">🌟 Droply</h1>

<p align="center">
  <b>A modern platform for secure and fast file management with a sleek UI, real-time performance, and a robust backend.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/Auth-Clerk-blueviolet?style=for-the-badge&logo=clerk" />
  <img src="https://img.shields.io/badge/DB-PostgreSQL-316192?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/ORM-Drizzle-ffd43b?style=for-the-badge&logo=drizzle" />
  <img src="https://img.shields.io/badge/Storage-ImageKit-00BFFF?style=for-the-badge&logo=imagekit" />
  <img src="https://img.shields.io/badge/Desktop-Electron-2c2e3b?style=for-the-badge&logo=electron" />
  <img src="https://img.shields.io/badge/Infra-Docker%20%7C%20AWS%20EC2-2496ED?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel" />
</p>

---

## ✨ Features  

- 🔐 **Secure Authentication** via Clerk  
- 📂 **File Upload & Management** with ImageKit integration  
- 🌐 **Responsive UI** powered by HeroUI  
- ⚡ **Fast Performance** using Next.js API routes  
- 🎉 **Immediate Adoption** – *50+ users on the first day*  
- 📊 **Optional Analytics & Tracking**  

---

## 🛠️ Tech Stack  

| Layer          | Technologies                          |
|----------------|---------------------------------------|
| **Frontend**   | Next.js, HeroUI, TypeScript           |
| **Backend**    | Next.js API Routes                    |
| **Database**   | PostgreSQL (Neon)                     |
| **ORM**        | Drizzle                               |
| **File Storage**| ImageKit                             |
| **Auth**       | Clerk                                 |
| **Desktop**    | Electron                              |
| **Infra**      | Docker, AWS EC2                       |

---

## 🎬 Screenshots / Demo  

<p align="center">
  <img width="800" alt="Droply Demo" src="https://github.com/user-attachments/assets/481b9e91-0643-4456-b431-ba79f12d4c10" />
</p>

---

## ⚡ Installation & Setup  

### 🔽 Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/droply.git
   cd droply


2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the root directory with the following environment variables:

   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # ImageKit
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Fallback URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

   # App URLs
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Database - Neon PostgreSQL
   DATABASE_URL=your_neon_database_url
   ```

### Building for Production

1. Build the application:

   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   # or
   pnpm start
   ```


Open in browser
👉 http://localhost:3000

📂 Project Structure
droply/
├── app/          
├── components/   
├── lib/          
├── public/       
├── styles/       
└── README.md     

# 🤝 Contributing

Contributions are welcome!

Fork the repo

Create a feature branch
```bash
git checkout -b feature/YourFeature
```


Commit changes
```bash
git commit -m "Add YourFeature"
```

Push to branch
```bash
git push origin feature/YourFeature
```


Open a pull request

# 🚀 Deployment

The easiest way to deploy your Next.js app is via Vercel
 – from the creators of Next.js.

Check the official Next.js deployment docs
 for more details.

💡 Droply makes file management fast, secure, and delightful.
