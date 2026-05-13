# Smart Parking System

## One-Line Summary
A team-built distributed smart parking web app with five FastAPI microservices, a React and Vite frontend, and real deployment patterns including GitHub Pages, Actions, and a Cloudflare tunnel.

## Problem
Parking operators need a coherent view of occupancy, reservations, and pricing, but a single monolith is hard to scale and reason about. The course final project required demonstrating microservices, gateways, and cloud-connected deployment in a realistic scenario.

## Solution
Our Smart Parking System provides simulated real-time lot visibility, dynamic pricing from occupancy, time-based reservations, and simulated IoT-style entry and exit events. A React client talks only to an API gateway; the gateway routes and aggregates calls to dedicated services for parking state, reservations, sensors, and pricing.

## My Role
This was a COE892 team capstone. I contributed to the overall microservice design, FastAPI service boundaries, HTTP communication between services, SQLite-per-service data ownership, and the integration story for the hosted frontend talking to backends during demos.

## Tech Stack
Python, FastAPI, Uvicorn, React, Vite, JavaScript, HTML, CSS, SQLite, HTTP between services, httpx, GitHub Pages, GitHub Actions, Cloudflare Tunnel, API gateway pattern.

## Key Features
API gateway as the single browser entry point, parking spot lifecycle (available, occupied, reserved), reservation creation and expiry with simulated time, sensor service that simulates vehicle arrivals and departures and updates spots, occupancy-based pricing service, React UI for the lot, pricing, reservations, and sensor controls.

## Technical Implementation
Five FastAPI services run independently: API Gateway, Parking Service, Reservation Service, Sensor Service, and Pricing Service. The gateway centralizes CORS and can aggregate responses so the React app stays simple. Services use HTTP for synchronous calls where needed; each service owns its SQLite database. The React app is built with Vite and deployed to GitHub Pages via GitHub Actions. During development the backends ran locally while the frontend was served over HTTPS, so we used a Cloudflare HTTPS tunnel to avoid mixed-content blocking between the hosted UI and local HTTP APIs.

## Challenges
Cross-origin and mixed-content rules when the UI is on GitHub Pages and APIs are on localhost, and keeping five services and their databases consistent for demos.

## How We Solved Them
We routed all browser traffic through the gateway, used the Cloudflare tunnel for HTTPS to HTTP bridging during integration, and kept service contracts small so each team member could run and test services in isolation.

## Impact / Results
A working end-to-end demonstration of microservices, gateway aggregation, CI/CD for the frontend, and practical cloud-adjacent networking, documented in my COE892 course writeup.

## Good Interview Talking Points
API gateway versus BFF, database-per-service trade-offs, why tunnels are a dev convenience rather than production topology, and how I would add auth and real IoT ingestion next.

## Related Skills
Distributed systems, microservices, FastAPI, React, SQLite, HTTP service design, CI/CD, Cloudflare Tunnel, cloud deployment concepts.
