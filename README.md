# **Restaurant E-Commerce Hub**

A multi-tenant e-commerce platform for restaurants, built with TypeScript, Express, Next.js, and PostgreSQL. Customers can browse menus and place orders, restaurants manage their offerings via a dashboard, and admins oversee the system.

---

## **Project Overview**

- **Objective**: Create a scalable hub where multiple restaurants can showcase food and services, with a customer frontend, restaurant dashboard, and admin panel.
- **Status**: Early development (Day 1 complete: setup with backend and frontend skeletons).
- **Tech Stack**:
  - **Backend**: TypeScript, Express, PostgreSQL, JWT for auth.
  - **Frontend**: Next.js (TypeScript), Tailwind CSS.
  - **Database**: PostgreSQL.

---

## **Features (Planned)**

### **Customer Frontend**

- Browse restaurants and menus.
- Add items to cart and checkout.
- Track orders.

### **Restaurant Dashboard**

- Manage profile and menu items.
- View and update orders.

### **Admin Panel**

- Approve restaurants.
- Manage users and system settings.

_More features (e.g., promotions, inventory) to be added post-MVP._

---

## **Prerequisites**

- [Node.js](https://nodejs.org) (LTS, e.g., 20.x)
- [PostgreSQL](https://www.postgresql.org/download/) (local or cloud, e.g., Supabase)
- [Git](https://git-scm.com)

---

## **Setup Instructions**

### **Clone the Repository**

```bash
git clone https://github.com/sahadcse/restaurant-ecommerce-hub.git
cd restaurant-ecommerce-hub
```

### **Backend Setup**

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/`:
   ```env
   PORT=3000
   JWT_SECRET=your-secret-here
   ```
   _Note_: Replace `your-secret-here` with a secure key (e.g., generate via `openssl rand -hex 32`).
4. Start the server:
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:3000` to see the welcome message.

### **Frontend Setup**

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js app:
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:3000` to see the homepage.

_Note_: Backend and frontend run on the same port by default. Adjust `PORT` in `backend/.env` (e.g., to `3001`) if running simultaneously.

---

## **Project Structure**

```
restaurant-ecommerce-hub/
├── backend/            # TypeScript Express backend
│   ├── src/
│   │   └── index.ts   # Main server file
│   ├── package.json
│   └── tsconfig.json
├── frontend/           # Next.js frontend
│   ├── app/           # App Router pages
│   ├── components/    # Reusable components
│   ├── public/        # Static assets
│   ├── package.json
│   └── tsconfig.json
└── README.md          # This file
```

---

## **Development Plan**

- **Day 1**: Setup complete (TypeScript backend + Next.js frontend).
- **Day 2**: Set up PostgreSQL and connect to backend.
- **Weeks 2-10**: Build APIs, frontend pages, and deploy MVP.
- Full plan available upon request.

---

## **Contributing**

This is a solo project for now, but feel free to fork or suggest improvements via issues/PRs!

---

## **License**

Not yet defined. TBD as the project evolves.

---

## **Contact**

- Built by [sahadcse].
- Questions? Open an issue or reach out!

---
