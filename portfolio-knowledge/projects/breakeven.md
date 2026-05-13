# BreakEven

## One-Line Summary
A full-stack daily budgeting app with carryover, expenses, and authenticated access so users can see a clear allowance and ledger-style summaries.

## Problem
People often lose track of day-to-day spending against a budget. I wanted a focused app built around a daily allowance model with carryover, instead of only monthly totals, so the mental model stays simple.

## Solution
BreakEven is a web application where users manage spending against a daily budget system that supports carryover. The backend persists users, budgets, and expenses and exposes APIs the frontend calls for summaries and actions. Google OAuth handles sign-in, and JWT verification secures API access. PostgreSQL is used through Supabase for storage and related backend services.

## My Role
I designed and built the application end to end: React frontend, Ruby on Rails backend, database schema and queries, authentication flow with Google OAuth and JWT verification, daily budget and carryover logic, expense tracking, and precomputed ledger-style summaries so balances stay consistent.

## Tech Stack
React, Ruby on Rails, PostgreSQL, Supabase, Google OAuth, JWT verification, REST APIs.

## Key Features
Google OAuth sign-in, JWT-protected API access, daily budget with carryover, expense tracking, precomputed ledger logic for financial summaries, persistent user and transaction data.

## Technical Implementation
The frontend is React. The backend is Rails with REST endpoints for budgets, expenses, and user session flows. Supabase backs PostgreSQL. OAuth completes in the browser; the backend issues and checks JWTs for subsequent requests. Budget math runs server-side so rules stay authoritative; ledger-related data is structured so the UI can show stable summaries without recalculating everything on each navigation.

## Challenges
Keeping daily allowance, carryover, and expenses consistent under edge cases (partial days, edits, backdated expenses) and avoiding duplicate or conflicting client and server rules.

## How I Solved Them
I centralized financial rules on the server, used clear data models for allowances and expenses, and leaned on precomputed summary paths where that simplified the UI and reduced race conditions between what the user sees and what is stored.

## Impact / Results
A usable personal finance tool aligned with how I like to budget, and a strong full-stack portfolio piece combining auth, persistence, and domain logic in one product.

## Good Interview Talking Points
Why carryover matters for UX compared to rigid monthly buckets, trade-offs of Supabase plus Rails, how JWT fits after OAuth, and how I would add tests or auditing for money-related APIs.

## Related Skills
Full-stack web development, React, Ruby on Rails, PostgreSQL, Supabase, OAuth, JWT, REST API design, domain modeling for financial data.
