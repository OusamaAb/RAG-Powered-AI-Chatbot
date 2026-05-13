# Football Pickems

## One-Line Summary
A football prediction web application where friends run private leagues and submit predictions for matches and detailed outcomes.

## Problem
Casual football fans want lightweight leagues with friends, not only generic sportsbook odds. Predicting outcomes, scorers, scorelines, and cards in one place needs accounts, league structure, and scoring rules that stay fair as the season runs.

## Solution
Football Pickems is a full-stack concept for prediction leagues: users create or join leagues, submit picks for fixtures, and accumulate points from scoring rules tied to real match results. The focus is on accounts, league management, prediction entry, and sports data integration so results can drive standings over time.

## My Role
I am building the product as a full-stack project: user accounts, league creation and membership, prediction flows, scoring logic, and integration points for football or sports data APIs as the implementation matures.

## Tech Stack
React, Next.js, TypeScript, REST APIs, databases, and related tooling aligned with my broader full-stack stack.

## Key Features
User accounts, friend leagues, predictions for match outcomes, goal scorers, assists, scorelines, and cards, scoring logic driven by results, and room to plug in live or scheduled sports data.

## Technical Implementation
The frontend direction is React with Next.js and TypeScript for typed UI and routing. APIs expose league and pick operations; persistence stores users, leagues, fixtures references, and picks. Scoring runs when results are known so standings update deterministically from stored picks plus result payloads.

## Challenges
Keeping pick windows and locked picks consistent with kickoff times, handling partial data from external APIs, and designing scoring so ties and edge cases are defined up front.

## How I Solved Them
Modeling explicit states for picks (open, locked, scored), centralizing scoring in one service layer, and validating API payloads before mutating standings so one bad feed row cannot corrupt a league.

## Impact / Results
A portfolio-grade sports web app that shows full-stack skills beyond CRUD: rules engines, time-sensitive UX, and third-party data.

## Good Interview Talking Points
How I would model leagues and seasons in the database, idempotent scoring jobs, rate limits on external APIs, and admin tools for disputed picks.

## Related Skills
Full-stack development, React, Next.js, TypeScript, REST APIs, authentication patterns, database design, sports data integration.
