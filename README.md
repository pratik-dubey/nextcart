## 🚀 **NextCart** 
## *Real-time Quick E-Commerce & Delivery Platform*
**Next.js 14 • Socket.IO • Stripe • MongoDB • AI Chat**

```bash
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

```
**🖼️ Screenshots**
📂 NextCart/screenshots/

 ## **User :-** 

 ## **Login :**  
 
 <img width="1917" height="1019" alt="Screenshot 2026-01-19 204348" src="https://github.com/user-attachments/assets/c20e74ed-9c75-4628-9467-61a94f841616" />
 

 :- ## **Dashboard and Grocery Store :**
 
 <img width="1899" height="912" alt="Screenshot 2026-01-19 195641" src="https://github.com/user-attachments/assets/27dd2e3e-d5c4-4251-8e91-6eed5799b2fe" />
 <img width="1899" height="910" alt="Screenshot 2026-01-19 195730" src="https://github.com/user-attachments/assets/dd677692-1bb5-4f62-a2ac-f0fc77fa58cc" /> 
 
 ## **Cart and Checkout :**  
 
 <img width="1901" height="909" alt="Screenshot 2026-01-19 203535" src="https://github.com/user-attachments/assets/ea4a2594-af55-4ab9-a842-06f528516960" />
 <img width="1901" height="916" alt="Screenshot 2026-01-19 195955" src="https://github.com/user-attachments/assets/85317dc1-5c1d-4274-b167-13de30b43501" />

 ## **Orders :**  
 
 <img width="1897" height="913" alt="Screenshot 2026-01-19 203252" src="https://github.com/user-attachments/assets/8efa1b3b-0250-4a87-8051-5642e105ad0b" />

 ## **Stripe :**  
 
 <img width="1899" height="1017" alt="Screenshot 2026-01-19 200140" src="https://github.com/user-attachments/assets/ca4577aa-e521-4562-96af-b4b9d4c505d1" />
 <img width="1912" height="965" alt="Screenshot 2026-01-19 200218" src="https://github.com/user-attachments/assets/d231ede7-0806-47a5-ab63-b94f58385bd1" />

  ## **Tracking :**  
 
 <img width="1900" height="1001" alt="Screenshot 2026-01-19 201401" src="https://github.com/user-attachments/assets/07720a2b-f7ba-4176-9a88-8423f150251e" />

 ## **AI Chat :**  

 <img width="1906" height="1014" alt="Screenshot 2026-01-19 202742" src="https://github.com/user-attachments/assets/856bde54-44d6-47d1-b4f0-5bbb6a57d801" />

## **Delivery-Boy :-**  

## **Dashboard :**  

<img width="1900" height="907" alt="Screenshot 2026-01-19 194041" src="https://github.com/user-attachments/assets/1c3acf5d-012e-4416-ad05-7f6b07458f38" />

## **Assignment :**  

<img width="1919" height="913" alt="Screenshot 2026-01-19 200953" src="https://github.com/user-attachments/assets/d78d8128-a996-480a-8dc9-46ba70e422df" />

## **Live Map Tracking :**  

<img width="1900" height="1001" alt="Screenshot 2026-01-19 201401" src="https://github.com/user-attachments/assets/115bc725-03b3-4462-90d0-8520624cc664" />

## **OTP :**  

<img width="1912" height="912" alt="Screenshot 2026-01-19 204041" src="https://github.com/user-attachments/assets/6dc919ad-c6b6-4837-a7e2-e3ac8a49b84d" />
<img width="1901" height="906" alt="Screenshot 2026-01-19 204117" src="https://github.com/user-attachments/assets/4cb67a12-feb6-4f6d-a766-d032dec05c83" />


## **Admin :-**  

:- ## **Dashboard :**  

<img width="1898" height="866" alt="Screenshot 2026-01-19 194357" src="https://github.com/user-attachments/assets/b85f361c-fcb3-41eb-b96a-cf672c5693a2" />

:- ## **Groceries :**  

<img width="1902" height="868" alt="Screenshot 2026-01-19 192823" src="https://github.com/user-attachments/assets/c14d15c8-3703-4ffd-8647-7a09a0b11d54" />
<img width="1898" height="864" alt="Screenshot 2026-01-19 192930" src="https://github.com/user-attachments/assets/d63434b4-939a-4012-adcf-8b4b2044005b" />

 ## **Orders :**  

<img width="1904" height="868" alt="Screenshot 2026-01-19 195050" src="https://github.com/user-attachments/assets/8a4fedc2-6b4c-4ebd-9cb6-dd249551ef9d" />

```
## 📁 Project Structure

NextCart/
├── nextcart/                    # Next.js Full-stack App
│   ├── src/
│   │   ├── app/                 # App Router (Pages + APIs)
│   │   │   ├── api/
│   │   │   │   ├── admin/       # 6 Admin endpoints
│   │   │   │   │   ├── add-grocery/
│   │   │   │   │   ├── edit-grocery/
│   │   │   │   │   ├── delete-grocery/
│   │   │   │   │   ├── get-groceries/
│   │   │   │   │   └── get-orders/
│   │   │   │   ├── user/        # 8 User endpoints
│   │   │   │   │   ├── order/
│   │   │   │   │   ├── my-orders/
│   │   │   │   │   └── stripe/webhook/
│   │   │   │   ├── delivery/    # 6 Delivery endpoints
│   │   │   │   │   ├── get-assignments/
│   │   │   │   │   ├── current-order/
│   │   │   │   │   └── otp/ (send/verify)
│   │   │   │   ├── chat/        # 3 Chat endpoints
│   │   │   │   │   ├── messages/
│   │   │   │   │   └── ai-suggestions/
│   │   │   │   └── auth/        # NextAuth
│   │   │   ├── admin/           # Admin Dashboard Pages
│   │   │   ├── user/            # User Pages
│   │   │   ├── delivery/        # Delivery Pages
│   │   │   └── login/register/
│   │   ├── components/          # 19 React Components
│   │   ├── lib/                 # Core Services
│   │   │   ├── cloudinary.ts
│   │   │   ├── db.ts
│   │   │   ├── mailer.ts
│   │   │   └── socket.ts
│   │   ├── models/              # 5 MongoDB Schemas
│   │   └── redux/               # State Management
│   ├── public/
│   └── package.json
└── socketServer/                # Socket.IO Server
    ├── index.js
    └── package.json



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
