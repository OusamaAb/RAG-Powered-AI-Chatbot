# NAO Robot

## One-Line Summary
Chat with NAO, my fourth-year engineering design capstone: a NAO humanoid that talks, recognizes faces, identifies songs, and dances using laptop-side AI services and a strict on-robot state machine.

## Problem
Humanoid robots need clear behavior modes so audio, vision, and motion do not fight each other, while modern AI (speech, LLMs, vision) is too heavy to run entirely on the robot. The capstone required a full design cycle from requirements through demo-ready integration.

## Solution
The system splits responsibilities. The NAO runs NAOqi in Python 2 and hosts microphone, camera, speaker, and motion control behind a four-state machine: idle, conversational, facial recognition, and listen-and-dance. Heavier work runs on a laptop in Python 3 as Flask microservices: ChatGPT for conversation and dance selection, OpenCV with dlib and face_recognition for faces, and the AudD API for song identification, plus Google speech-to-text for voice input. The robot exchanges HTTP, JSON, audio, and images with the laptop over the local network.

## My Role
Team-based COE70A and COE70B capstone. I contributed to architecture, AI API integration (OpenAI and ChatGPT paths), speech and audio flows, facial recognition service wiring, robot state behavior, testing under real lighting and battery conditions, and documentation for milestones and the final report.

## Tech Stack
NAO humanoid, NAOqi, Python 2.7 on robot, Python 3 on laptop, Flask, HTTP and JSON, OpenAI and ChatGPT, Google speech-to-text, AudD, OpenCV, dlib, face_recognition, Choregraphe, NAO motion APIs, local Ethernet and Wi-Fi testing.

## Key Features
Wake-word style activation, spoken ChatGPT conversation, facial recognition with session-based user context, song recognition, ChatGPT-assisted dance selection, execution of predefined NAO dance routines, and safe switching between modes via the state machine.

## Technical Implementation
The state machine serializes access to sensitive resources so only one behavior owns the mic or motors at a time. Flask services encapsulate each AI concern so failures or latency in one API do not require rewriting robot motion code. JSON and binary audio or image payloads cross the network with timeouts sized for demo reliability. User recognition stores lightweight session data such as registered users and dance usage counts for the demo narrative.

## Challenges
Dim lighting weakened face recognition, low battery affected capture quality, weak Wi-Fi increased API latency, and one aggressive dance risked balance issues on the physical robot.

## How I Solved Them
We iterated on lighting and distance during test sessions, monitored battery before demos, added network fallbacks and clear idle states when APIs stalled, and tuned dance choices after observing balance during dry runs.

## Impact / Results
A rare portfolio artifact that combines embodied hardware, multimodal AI, distributed client-server design, and full engineering documentation and demonstration.

## Good Interview Talking Points
Why split Python 2 on device versus Python 3 on laptop, state machine versus monolithic loop trade-offs, latency budgets for voice UX, and how I would harden secrets and transport for anything beyond a lab network.

## Related Skills
Human-robot interaction, robotics, Flask APIs, LLM integration, speech-to-text, computer vision, face recognition, state machines, concurrent and networked systems, system testing, technical writing, teamwork.
