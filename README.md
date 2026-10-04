# 🌿 Stockly

**Inventory Management System built with the MERN stack**

Stockly helps small and medium businesses track products, manage stock levels, record sales, and understand their inventory through a clear dashboard and reports.

> **Status:** 🚧 In development (8-week team project)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Team](#team)
- [Development Workflow](#development-workflow)
- [Roadmap](#roadmap)
- [Definition of Done](#definition-of-done)
- [Final Acceptance Checks](#final-acceptance-checks)
- [Design](#design)

---

## Features

**Authentication & Roles**
- Register, login, and logout with JWT
- Password hashing with bcrypt
- Protected routes and admin-only areas

**Products**
- Create, edit, archive, and restore products
- Search, filters, sorting, and pagination
- Form validation

**Categories & Suppliers**
- Manage categories and suppliers
- Link products to both

**Inventory**
- Stock adjustments
- Full stock movement history
- Low-stock checks and alerts

**Sales & POS**
- Point-of-sale workflow
- Sales list and invoice details
- Insufficient-stock handling
- Sale cancellation with rules

**Dashboard & Reports**
- Statistic cards, low-stock and recent-sales panels
- Charts and inventory valuation
- Date-filtered sales reports

**Notifications & Users**
- Notifications inbox with unread badge
- Admin-only user management

---

## Tech Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| Frontend   | React, Vite, Tailwind CSS, Axios            |
| Backend    | Node.js, Express                            |
| Database   | MongoDB (Mongoose), MongoDB Atlas           |
| Auth       | JWT, bcrypt                                 |
| Deployment | Render (backend), MongoDB Atlas (database)  |

---

## Project Structure

> Planned layout. It may change as the project evolves.

```
stockly/
├── client/                 # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/     # Shared UI components
│   │   ├── context/        # AuthContext
│   │   ├── hooks/          # Debounce, pagination, product hooks
│   │   ├── layouts/        # AppLayout, Sidebar, Topbar
│   │   ├── pages/          # Products, Inventory, Sales, Dashboard...
│   │   ├── services/       # Axios client and API service layer
│   │   └── routes/         # Protected and admin routes
│   └── ...
├── server/                 # Node + Express backend
│   ├── src/
│   │   ├── config/         # DB and environment configuration
│   │   ├── models/         # Mongoose models
│   │   ├── controllers/
│   │   ├── services/       # Product, stock, and sales logic
│   │   ├── routes/
│   │   ├── middleware/     # Auth, roles, error handling
│   │   └── tests/
│   └── ...
└── README.md
```

**Core models:** users, categories, suppliers, products, sales, stock movements, notifications, settings.

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm
- A MongoDB instance (local or MongoDB Atlas)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd stockly

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install
```

### Running locally

```bash
# Backend (from /server)
npm run dev

# Frontend (from /client)
npm run dev
```

> Script names may differ once the setup is finalized in Week 1. Update this section accordingly.

---

## Environment Variables

Create a `.env` file in `/server`:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in `/client`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

> Never commit `.env` files. Share secrets with the team through a secure channel.

---

## Team

| Member | Name                | Role                | Responsibility                                                              |
|--------|---------------------|---------------------|-----------------------------------------------------------------------------|
| M1     | Mohamed Abdelnasser | MERN Lead           | Backend, database, authentication, integration, and deployment              |
| M2     | Abdaltwab Sayed     | Frontend Lead       | Routing, layout, shared UI, and API integration                             |
| M3     | 3omda               | Products            | Product screens, forms, search, filters, and pagination                     |
| M4     | Moataz Mohamed      | Dashboard & Reports | Statistics, charts, analytics, notifications, admin users, and presentation |
| M5     | Omar                | Inventory & Sales   | Categories, suppliers, stock, and POS                                       |
| M6     | Mohamed Al-Assal    | QA Tester           | Tests every shared update and reports bugs (no coding)                      |

Each developer is responsible for fixing bugs in their own features.

---

## Development Workflow

- Every task is a **GitHub issue** with one owner, acceptance criteria, and dependencies.
- Work on **feature branches** and open **pull requests**. Keep `main` stable and merge only reviewed changes.
- After every shared push, **M6 tests the change** and reports defects. The responsible developer fixes them, and M6 retests.
- Bug reports include: feature, reproduction steps, expected result, actual result, and a screenshot or video when useful.
- Hold a **short daily check-in** and **demo completed work weekly**.

---

## Roadmap

| Week | Focus                                   | Deliverable                                                |
|------|-----------------------------------------|------------------------------------------------------------|
| 1    | Requirements, diagrams, and setup       | Agreed MVP, diagrams, wireframes, runnable foundations     |
| 2    | Database, authentication, frontend base | Core models, auth, and a navigable frontend shell          |
| 3    | Backend core and feature development    | Core API endpoints and first integrated screens            |
| 4    | Products, inventory, and sales          | Main operational flows connected to the backend            |
| 5    | Dashboard, reports, and integration     | Feature-complete MVP                                       |
| 6    | Testing, bug fixing, and hardening      | Stabilized release candidate                               |
| 7    | Deployment and release verification     | Deployed app with critical journeys verified in production |
| 8    | Final QA, presentation, and handover    | Final project, presentation, and acceptance checks         |

---

## Definition of Done

A feature is complete when:

- UI and API work is finished
- Validation and loading, empty, and error states are handled
- The pull request has been reviewed
- QA finds no unresolved critical issue

---

## Final Acceptance Checks

| Area                | Acceptance evidence                                                               |
|---------------------|-----------------------------------------------------------------------------------|
| Authentication      | Register, login, logout, protected routes, and role restrictions work             |
| Products & inventory| Create, edit, and archive products; adjust stock; inspect stock history           |
| Sales               | Record a sale, view invoice, handle insufficient stock, verify cancellation rules |
| Dashboard & reports | Figures reflect actual data; date filters and empty states behave correctly       |
| Release             | Production URL works in a fresh browser; critical journeys smoke-tested           |

---

## Design

Stockly uses a calm, nature-inspired **"Forest & Clay"** palette.

| Role          | Name           | Hex     |
|---------------|----------------|---------|
| Primary       | Forest         | #3F7D5C |
| Primary hover | Deep Forest    | #2E5E45 |
| Sidebar       | Pine           | #1F3D2E |
| Soft accent   | Sage           | #8FB996 |
| Background    | Mist           | #F6F8F4 |
| Surface       | White          | #FFFFFF |
| Border        | Fern Mist      | #DDE5DA |
| Text          | Charcoal Green | #1F2A24 |
| Muted text    | Stone          | #5F6F65 |
| Warm accent   | Sand           | #E9DFC7 |
| Success       | Leaf           | #4C9A6A |
| Warning       | Amber          | #D9A441 |
| Danger        | Clay Red       | #C65D4E |
| Info          | Lake           | #4F8EA3 |

---

## License

To be decided by the team.
