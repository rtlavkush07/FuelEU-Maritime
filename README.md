Project Name:-  FuelEU Maritime 



This project presents a FuelEU Maritime Compliance Management Platform built using React + TypeScript + Node.js + PostgreSQL, following Hexagonal (Ports & Adapters) Architecture for clean modularity.

It manages the entire workflow for:

Voyage and route data processing

GHG emission evaluation

Compliance Balance (CB) computation

FuelEU Banking and Pooling operations

🧭 Table of Contents

Overview

Architecture

Features

Tech Stack

Backend Setup

Frontend Setup

Database Model

API Endpoints

Testing Guide

Project Layout

Enhancements

Author

🌍 Overview

The FuelEU Maritime Platform helps monitor and evaluate GHG intensity compliance for maritime operations.

It offers:

A backend API to compute and manage compliance metrics.

A frontend dashboard built in React that visualizes emission comparisons and compliance balances.

🏗️ Architecture

The codebase follows Hexagonal (Clean) Architecture, ensuring separation between:

Core business logic

Input/output and framework layers

🧩 Backend Directory Structure
src/
  core/                # Domain logic and entities
  adapters/
    inbound/http/      # Express routes and controllers
    outbound/postgres/ # Prisma repositories (database adapters)
  infrastructure/
    db/                # Prisma client and schema setup
    server/            # Express app and configuration
  shared/              # Common constants and type definitions

🎨 Frontend Directory Structure
src/
  core/                # Hooks and domain data models
  adapters/
    ui/                # React components and pages
    infrastructure/    # Axios API communication
  shared/              # Shared reusable utilities


This design promotes modularity and scalability.

⚙️ Key Features
🛳️ Route Dashboard

Displays complete route dataset (/routes)

Fields: vessel type, fuel, year, emissions, GHG intensity

Allows selecting a baseline route

⚖️ Comparison Module

Endpoint: /routes/comparison

Shows baseline vs comparison metrics

Indicates compliance state 

Includes bar chart visualization via Recharts

💼 Banking (FuelEU Article 20)

Tracks Compliance Balance (CB) by vessel/year

Enables banking surplus CB for future offset

Automatically applies banked values to deficits

🤝 Pooling (FuelEU Article 21)

Create ship pools to balance surplus/deficit

Ensures combined CB ≥ 0

Protects surplus contributors from dropping below zero

🧰 Tech Stack
Layer	Technology
Frontend	React, TypeScript, Vite, TailwindCSS, Recharts
Backend	Node.js, Express, TypeScript, Prisma
Database	PostgreSQL
Architecture	Hexagonal / Clean
Tools	ESLint, Prettier, GitHub, AI-assisted coding
⚙️ Backend Setup
1️⃣ Install Dependencies
cd Backend
npm install

2️⃣ Configure Environment

Add .env with:

DATABASE_URL="postgresql://postgres:<PASSWORD>@localhost:5432/fueleu?schema=public"

3️⃣ Generate & Apply Migrations
npx prisma generate
npx prisma migrate dev --name init

4️⃣ Seed and Start Server
npx ts-node prisma/seed.ts
npm run dev


Backend runs at  http://localhost:4000

⚙️ Frontend Setup
1️⃣ Install Dependencies
cd Frontend
npm install

2️⃣ Start Dev Server
npm run dev


Frontend runs at  http://localhost:5173

Ensure backend is running before accessing the frontend.

🗄️ Database & Prisma
Prisma Models

routes — Route data (id, routeId, vesselType, fuelType, year, ghgIntensity, etc.)

ship_compliance — Compliance records per ship-year

bank_entries — Stored surplus compliance balances

pools — Pool registry

pool_members — Pool participants with before/after CB

Compliance Balance Formula
CB = (TargetIntensity - ActualIntensity) × (FuelConsumption × 41,000)


TargetIntensity (2025) = 89.3368 gCO₂e/MJ

📡 API Reference
Method	Endpoint	Description
GET	/routes	Fetch all routes
POST	/routes/:id/baseline	Set route as baseline
GET	/routes/comparison	Retrieve baseline vs comparison data
GET	/compliance/cb?shipId&year	Calculate and fetch CB
POST	/compliance/banking/bank	Store surplus CB
POST	/compliance/banking/apply	Use stored surplus
POST	/pools	Create compliance pool
🧪 Testing
Backend Tests
npm run test


(Unit and integration tests are recommended for CB, Banking, and Pooling logic.)

Manual API Verification (Postman / Browser)

/routes — Fetch routes

/routes/:id/baseline — Set baseline route

/routes/comparison — Compare data

/compliance/cb?shipId&year — Calculate CB

/pools — Create pool

🧩 Project Layout
FuelEU-Maritime/
 ├── Backend/
 │   ├── src/
 │   │   ├── core/
 │   │   ├── adapters/
 │   │   └── infrastructure/
 │   ├── prisma/
 │   ├── package.json
 │   └── .env
 ├── Frontend/
 │   ├── src/
 │   │   ├── adapters/ui/
 │   │   ├── adapters/infrastructure/
 │   │   └── core/
 │   ├── package.json
 │   └── vite.config.ts
 ├── README.md
 ├── AGENT_WORKFLOW.md
 └── REFLECTION.md

🚧 Future Enhancements

Implement role-based authentication (Admin / Operator)

Add user-specific dashboards and filters

Dockerize and deploy with CI/CD

Expand Jest test coverage

Integrate charts for Banking & Pooling modules


Project By:-
Lav kumar
rtlavkush07@gmail.com
NIT Allahabad