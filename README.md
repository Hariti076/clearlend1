# 🏦 TrancheLend — Transparent Bank-Like P2P Lending Platform

> Responsible peer-to-peer lending with tranche-based disbursement, EMI repayment structure, and complete financial transparency.
---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Project Vision](#-project-vision)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Documentation](#-api-documentation)
- [User Roles](#-user-roles)
- [How It Works](#-how-it-works)
- [Pros & Cons](#-pros--cons)
- [License](#-license)

---

## 📖 About the Project

Traditional P2P lending platforms suffer from two core problems:

1. **High default risk** due to lump-sum disbursement — borrowers receive the full loan upfront, which increases the chance of fund misuse.
2. **Lack of transparency** — borrowers are often unaware of the true cost of borrowing (effective APR, hidden fees, deductions).

**TrancheLend** solves this by introducing:

- **Monthly tranche disbursement** — funds are released in stages, tied to successful EMI repayments.
- **Bank-like EMI structure** — fixed monthly installments for predictable, affordable repayment.
- **Full financial transparency** — every fee, deduction, and rate is visible upfront via a real-time dashboard.

This platform bridges the gap between the speed of P2P lending and the discipline of traditional banking.

---

## 🔭 Project Vision

To build a responsible, non-custodial P2P lending ecosystem that combines the accessibility of peer lending with the discipline and transparency of traditional banking — making credit **affordable**, **predictable**, and **trustworthy** for everyone.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📦 **Monthly Tranche Disbursement** | Next tranche is released only after successful EMI repayment, reducing lender risk |
| 📉 **Lower Interest Rates** | Staged disbursement reduces lender exposure, enabling competitive rates |
| 📊 **Transparency Dashboard** | Displays gross amount, net received, all fees, and effective APR |
| 🧾 **Bank-like EMI Structure** | Fixed monthly repayments for predictable, affordable borrowing |
| 🔐 **KYC & Risk Categorization** | Borrowers classified by credit score and income data |
| 💼 **Lender Analytics** | Real-time tracking of returns, repayments, and pool performance |
| 🛡️ **JWT Auth + RBAC** | Secure role-based access for Borrower, Lender, and Admin |

---

## 🛠 Tech Stack

> _Update this section to reflect your actual stack._

**Frontend**
- React.js / Next.js
- Tailwind CSS
- Chart.js / Recharts (dashboard analytics)

**Backend**
- Node.js + Express.js
- JWT Authentication
- Role-Based Access Control (RBAC)

**Database**
- PostgreSQL / MongoDB

**Payments**
- Third-party payment gateway integration (e.g., Razorpay, Stripe)

**DevOps**
- Docker
- GitHub Actions (CI/CD)

---

## 🏗 Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                        Client                            │
│         Borrower Portal | Lender Dashboard | Admin UI    │
└────────────────────┬─────────────────────────────────────┘
                     │ REST API / WebSocket
┌────────────────────▼─────────────────────────────────────┐
│                    Backend (Node.js)                      │
│  Auth Service │ Loan Engine │ Tranche Manager │ Analytics │
└────────┬──────────────────────────────────────┬──────────┘
         │                                      │
┌────────▼────────┐                  ┌──────────▼──────────┐
│    Database     │                  │  Payment Gateway    │
│  (PostgreSQL)   │                  │  (Razorpay/Stripe)  │
└─────────────────┘                  └─────────────────────┘
```

**Tranche Release Flow:**
```
Loan Approved → Tranche 1 Disbursed → Borrower pays EMI 1
    → EMI verified → Tranche 2 Disbursed → ... → Loan Closed
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm or yarn
- PostgreSQL (or MongoDB)
- A payment gateway account (Razorpay / Stripe)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/tranchelend.git
cd tranchelend

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `/backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/tranchelend

# Authentication
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# Payment Gateway
PAYMENT_GATEWAY_KEY=your_razorpay_or_stripe_key
PAYMENT_GATEWAY_SECRET=your_secret

# KYC (optional)
KYC_API_KEY=your_kyc_provider_key
```

### Running the App

```bash
# Run backend (from /backend)
npm run dev

# Run frontend (from /frontend)
npm run dev
```

The app will be available at `http://localhost:3000`.

To run with Docker:

```bash
docker-compose up --build
```

---

## 📡 API Documentation

> Full API docs available via Swagger at `/api/docs` after running the server.

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/auth/me` | Get current user profile |

### Loans

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/loans/apply` | Borrower applies for a loan |
| GET | `/api/loans/:id` | Get loan details |
| GET | `/api/loans/:id/tranches` | Get tranche disbursement schedule |
| POST | `/api/loans/:id/repay` | Submit EMI repayment |

### Lender

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/lender/fund` | Fund a loan pool |
| GET | `/api/lender/portfolio` | View lender portfolio & returns |
| GET | `/api/lender/analytics` | Real-time pool performance data |

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all users |
| PUT | `/api/admin/loans/:id/approve` | Approve or reject a loan |
| GET | `/api/admin/dashboard` | Platform-wide analytics |

---

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **Borrower** | Apply for loans, view tranche schedule, make EMI repayments, access transparency dashboard |
| **Lender** | Fund loan pools, track returns, view repayment history and pool performance |
| **Admin** | Approve/reject loans, manage KYC, view platform analytics, configure risk parameters |

---

## ⚙️ How It Works

### For Borrowers

1. **Register & KYC** — Complete identity verification and credit score assessment.
2. **Apply for a Loan** — Specify amount, tenure, and purpose. Risk tier is assigned automatically.
3. **Loan Approval** — Admin reviews and approves; interest rate is determined by risk category.
4. **Receive Tranches** — Funds are disbursed monthly. Each subsequent tranche is released only after the previous EMI is paid.
5. **Repay via EMI** — Fixed monthly installments over the loan tenure.
6. **Full Transparency** — Dashboard shows gross loan amount, net received (after fees), effective APR, and payment history.

### For Lenders

1. **Register & Deposit** — Complete onboarding and deposit funds.
2. **Choose a Pool** — Select a risk tier (Low / Medium / High) with corresponding expected returns.
3. **Earn Returns** — Receive pro-rata returns as borrowers repay EMIs each month.
4. **Monitor Performance** — Real-time dashboard for repayment status, expected returns, and late payment alerts.

---

## ✅ Pros & ❌ Cons

**✅ Advantages**
- Lower interest rates compared to traditional P2P platforms
- Staged disbursement prevents fund misuse
- Full cost transparency for borrowers — no hidden fees
- Predictable EMI structure for budgeting
- Better lender risk management through controlled exposure

**❌ Trade-offs**
- Relies on third-party payment gateways
- No fund custody adds trust complexity
- Regulatory compliance varies by region
- Smart contract bugs (future scope) are hard to reverse
- AI-assisted code may require additional auditing

---



## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

---

## 💡 Why TrancheLend?

> *Traditional P2P platforms are risky and opaque. Banks are slow and inaccessible. TrancheLend fills the gap — offering faster approvals than banks, lower rates than P2P, and staged disbursement that protects lenders. Every fee, deduction, and rate is visible upfront. No hidden costs. No lump-sum risk. Just responsible credit.*

---

<p align="center">Built with ❤️ for responsible, transparent lending</p>
