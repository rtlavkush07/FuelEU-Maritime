🤖 AI Agent Workflow

FuelEU Maritime Compliance Platform – AI Contribution Report

This document provides a transparent overview of how AI tools were used throughout the development of the FuelEU Maritime Compliance Platform.
The goal is to clearly highlight where, how, and to what extent AI assistance contributed to the project while ensuring all final implementations were human-reviewed and verified.

⚙️ AI Tools Utilized
AI Tool	Purpose	Area of Application
ChatGPT (GPT-5)	Main coding and logic collaborator	API design, Prisma schema modeling, frontend logic, and optimization guidance
GitHub Copilot	Inline coding assistant	TypeScript boilerplate, JSX patterns, and quick code suggestions
Cursor / VS Code AI Agent (optional)	Refactoring & typing support	Auto-formatting, linting, and type correction
Claude (if used)	Concept explanation	Understanding regulatory and compliance-related logic
🧩 Workflow: Prompt → AI Output → Human Refinement
🧠 1) Backend — Route Comparison API

Prompt Used:

“Create a comparison API that returns baseline vs comparison route with % difference and a compliance flag.”

AI Output:

Generated Prisma query to fetch baseline and target routes

Applied formula:

percent=(baselinecompare​−1)×100

Added a simple compliance flag logic

Manual Refinements:

Renamed variables for clarity and readability

Added error handling for missing baseline records

Improved response structure for cleaner API output

🧠 2) Frontend — Comparison View (React)

Prompt Used:

“Develop a comparison tab using React + TypeScript + Tailwind + Recharts.”

AI Output:

Working React component using <BarChart>, <Tooltip>, and <Legend>

Integrated dynamic data binding and layout

Manual Refinements:

Enhanced TypeScript interfaces for data consistency

Added fallback message for empty datasets

Customized color palette for visual contrast and accessibility

🧠 3) Prisma Environment Variable Fix

Prompt Used:

“DATABASE_URL not detected when running prisma generate.”

AI Suggestion:

Diagnosed missing environment variable on Windows

Recommended temporary fix:

set DATABASE_URL=postgresql://postgres:Ayush%40123@localhost:5432/fueleu?schema=public


Manual Resolution:

Verified fix and migrated credentials into .env for secure persistence

🧪 Issue Validation Summary
Issue	AI Suggestion	Final Resolution
TypeScript Node errors	Install @types/node	Added reference in tsconfig.json
Wrong import paths	Use relative imports	Replaced with consistent root aliases
Compare view empty data	Add loader/fallback	Implemented conditional rendering
CORS restrictions	Enable middleware	Added app.use(cors({ origin: "*" }))
📊 Key Insights
✅ Effective AI Contributions

Accelerated setup for backend and frontend components

Improved structural consistency and readability

Reduced repetitive coding efforts significantly

⚠️ Required Human Oversight

TypeScript generics and type safety

Validation of compliance formulas and logic

Manual testing of API and UI integrations

🧭 Development Workflow Summary

Planning & logic design: collaboratively done with ChatGPT

Component scaffolding: powered by GitHub Copilot

Testing, debugging, and optimization: handled manually

Commit organization: module-wise (Routes, Compare, Banking, Pooling) for clear traceability

👍 Where AI Excelled

Reduced boilerplate and scaffolding time by ~65–70%

Produced consistent, well-structured TypeScript code

Helped implement a clean, modular architecture

Provided quick resolutions for environment and schema issues

⚠️ Where AI Fell Short

Occasional incorrect import paths

Minor async/await syntax gaps

Sometimes produced redundant query logic

🧠 Best Practices Followed

✅ Used ChatGPT primarily for planning, structure, and logic, not direct copy-paste.
✅ Relied on Copilot for repetitive patterns and small snippets.
✅ Every AI-generated output was tested, refined, and reviewed manually.
✅ All commits were feature-based for traceable development history.
✅ Maintained complete documentation of AI involvement for transparency.

🧭 Final Summary

AI tools played a key supporting role in accelerating development and maintaining a clean, modular structure.
Every AI-assisted suggestion was carefully validated, debugged, and refined before integration.

The overall result was a human-led, AI-augmented development workflow—achieving both speed and precision without compromising on code quality or reliability.

Project by:
Lav Kumar
NIT Allahabad
📧 rtlavkush07@gmail.com
