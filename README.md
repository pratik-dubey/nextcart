**🛒 NextCart — Smart Real‑time Grocery Ordering Platform**
NextCart is a production-grade full-stack grocery delivery platform built with Next.js 14 (App Router), TypeScript, MongoDB, and Socket.IO.
It delivers seamless experiences for customers, delivery partners, and administrators through real-time communication, AI chat, secure payments, and live tracking.

**🌟 Core Features**
🔐 Multi-Role Auth: Admin/User/Delivery via NextAuth.js + Google OAuth

💳 Dual Payments: Stripe Checkout + COD with webhook verification

🚚 Real-time Tracking: Socket.IO live GPS + Leaflet maps + ETA

💬 AI Chat: Gemini API-powered contextual reply suggestions

📦 Admin Dashboard: Recharts analytics + grocery CRUD

🗺️ Smart Assignment: MongoDB geospatial matching + auto-broadcast

📩 OTP Delivery: Gmail SMTP verification system

☁️ Cloudinary: Optimized image uploads + CDN delivery

🎨 Responsive UI: Tailwind CSS + Redux Toolkit state and  animations via Motion


**🖼️ Screenshots**
📂 NextCart/screenshots/

User: Login | Dashboard | Grocery Store | Cart | Orders | Stripe | Tracking | AI Chat
Delivery: Dashboard | Assignment | Map | OTP
Admin: Dashboard | Groceries | Orders


**📁 Detailed Project Structure**

NextCart/ (Root Directory)
├── nextcart/ (Next.js Full-stack Application)
│   ├── src/
│   │   ├── app/ (App Router - Pages & Routes)
│   │   │   ├── api/
│   │   │   │   ├── admin/
│   │   │   │   │   ├── add-grocery/
│   │   │   │   │   ├── edit-grocery/
│   │   │   │   │   ├── delete-grocery/
│   │   │   │   │   ├── get-groceries/
│   │   │   │   │   ├── get-orders/
│   │   │   │   │   └── update-order-status/[orderId]/
│   │   │   │   ├── user/
│   │   │   │   │   ├── payment/
│   │   │   │   │   ├── order/
│   │   │   │   │   ├── my-orders/
│   │   │   │   │   ├── get-order/[orderId]/
│   │   │   │   │   ├── edit-role-mobile/
│   │   │   │   │   └── stripe/webhook/
│   │   │   │   ├── delivery/
│   │   │   │   │   ├── get-assignments/
│   │   │   │   │   ├── current-order/
│   │   │   │   │   ├── assignment/[id]/accept-assignment/
│   │   │   │   │   └── otp/
│   │   │   │   │       ├── send/
│   │   │   │   │       └── verify/
│   │   │   │   ├── chat/
│   │   │   │   │   ├── messages/
│   │   │   │   │   ├── save/
│   │   │   │   │   └── ai-suggestions/
│   │   │   │   ├── socket/
│   │   │   │   │   ├── connect/
│   │   │   │   │   └── update-location/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── register/
│   │   │   │   ├── me/
│   │   │   │   └── check-for-admin/
│   │   │   ├── admin/ (Admin Dashboard Pages)
│   │   │   ├── user/ (User Dashboard Pages)
│   │   │   ├── delivery/ (Delivery Partner Pages)
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── unauthorized/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   └── globals.css
│   │   ├── components/ (19 React Components)
│   │   │   ├── ui/
│   │   │   ├── maps/
│   │   │   ├── charts/
│   │   │   └── forms/
│   │   ├── lib/
│   │   │   ├── cloudinary.ts (Image upload service)
│   │   │   ├── db.ts (MongoDB connection)
│   │   │   ├── mailer.ts (Nodemailer service)
│   │   │   ├── socket.ts (Socket.IO client)
│   │   │   └── emitEventHandler.ts (Event handlers)
│   │   ├── models/ (5 MongoDB Schemas)
│   │   ├── redux/ (State Management)
│   │   ├── hooks/ (Custom React Hooks)
│   │   ├── auth.ts (NextAuth config)
│   │   ├── proxy.ts (API proxy config)
│   │   ├── Provider.tsx (Global providers)
│   │   └── InitUser.tsx (Session bootstrap)
│   ├── public/ (Static Assets)
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── eslint.config.mjs
└── socketServer/ (Standalone Socket.IO Server)
    ├── index.js (Main socket server)
    ├── package.json
    └── .env (Socket server config)


**🧾 Tech Stack**
Frontend: Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit, Recharts, Leaflet
Backend: Next.js API Routes, Socket.IO, NextAuth.js
Database: MongoDB (Mongoose ORM)
Integrations: Stripe, Cloudinary, Gemini API, Nodemailer (Gmail)

**⚙️ Installation & Setup**
1. Clone Repository
bash
git clone https://github.com/your-username/NextCart.git
cd NextCart
2. Install Dependencies
bash
# Next.js App (Frontend + Backend APIs)
cd nextcart && npm install

# Socket.IO Real-time Server
cd ../socketServer && npm install
3. Environment Variables
Create nextcart/.env.local with these exact variables:

text
# ========================================
# DATABASE
# ========================================
MONGODB_URL=add your mongodb url here

# ========================================
# AUTHENTICATION
# ========================================
AUTH_SECRET=kjhidhsficuhn
GOOGLE_CLIENT_ID=add your google client id here
GOOGLE_CLIENT_SECRET=add your google client secret here

# ========================================
# CLOUDINARY (Image Uploads)
# ========================================
CLOUDINARY_CLOUD_NAME=add your cloudinary cloud name here
CLOUDINARY_API_KEY=add your cloudinary api key here
CLOUDINARY_API_SECRET=add your cloudinary api secret here

# ========================================
# STRIPE PAYMENTS
# ========================================
STRIPE_SECRET_KEY=add your stripe secret key here
STRIPE_WEBHOOK_SECRET=add your stripe webhook secret here

# ========================================
# APP CONFIGURATION
# ========================================
NEXT_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_SOCKET_SERVER="http://localhost:4000"

# ========================================
# GEMINI AI CHAT
# ========================================
GEMINI_API_KEY=add your gemini api key here

# ========================================
# EMAIL SERVICE (OTP & Notifications)
# ========================================
EMAIL=add your email here
PASS=add your app password here
4. Run Development Servers
Terminal 1 - Next.js Application:

bash
cd nextcart
npm run dev
Available at: http://localhost:3000

Terminal 2 - Socket.IO Server:

bash
cd socketServer
node index.js
Running at: http://localhost:4000

Stripe Webhooks (Local Testing)
stripe listen --forward-to localhost:3000/api/user/stripe/webhook


Copy the generated webhook secret into .env.local.

5. Test Your Setup
Register as new user at /register

Login as admin (first user created automatically)

Add groceries via admin panel

Place test order and verify delivery flow

**API Overview (High-Level)**

Auth: Registration, login, Google OAuth

Admin: Grocery CRUD, order management, analytics

User: Order placement, payments, order history

Delivery: Assignment handling, OTP verification

Chat: Real-time messaging + AI suggestions

Socket: Location updates, assignments, live events

All APIs are implemented using Next.js App Router (app/api/*).


**📊 Architecture Overview**
Frontend (Next.js 14) → API Routes → MongoDB
                    ↓
Socket.IO Server ←→ Real-time Updates (Location, Chat, Orders)
                    ↓
Stripe Webhook → Payment Confirmation → Email Notifications


Deployment Status

Planned deployment setup:

Frontend: Vercel

Backend APIs: Next.js

Real-time server: Node.js service

Database: MongoDB Atlas

Status: Deploying Soon


**Author**

Pratik Dubey
B.Tech Information Technology
Full-Stack Developer

GitHub: https://github.com/pratik-dubey

LinkedIn: https://linkedin.com/in/pratik-dubey-02888429b
