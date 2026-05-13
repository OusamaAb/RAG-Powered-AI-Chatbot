## Course Overview
Two-semester capstone: **COE70A (Fall)** — problem framing, requirements, architecture, and design iteration with team deliverables. **COE70B (Winter)** — implementation, integration, testing, demonstration, and final project delivery.

## Institution / Program
Toronto Metropolitan University, Software Engineering, Electrical and Computer Engineering Department

## Term / Date
- **COE70A:** Fourth Year, Fall Semester
- **COE70B:** Fourth Year, Winter Semester

## Main Topics
- Open-ended engineering design process
- Project management, teamwork, milestones, and technical documentation
- Requirements gathering, problem definition, design constraints, and design alternatives
- Human-robot interaction using speech, vision, and movement
- NAO robot programming using NAOqi
- State machines and concurrency for controlling robot behaviour
- Speech recognition, transcription, and spoken conversation flow
- Facial recognition and user registration
- LLM integration for robot conversation and dance selection
- Flask API services and local network communication between robot and laptop
- Robot motion control, choreography, and dance routine execution
- Testing, debugging, performance measurement, and final demonstration

## Theory Learned
This course focused on applying engineering design theory to a real working prototype. The main theory involved turning an open-ended problem into a complete system by defining objectives, identifying constraints, comparing design alternatives, building the solution, testing it, and documenting the results.

For the capstone project, the main technical theory came from human-robot interaction, modular system design, state machines, concurrency, speech processing, facial recognition, and API-based AI integration. The NAO robot needed to manage different behaviours such as idle mode, conversation, facial recognition, and listen-and-dance mode. A state machine was used so the robot could switch between these behaviours in an organized and predictable way.

The project also involved learning how to split work between a limited robot platform and a more powerful laptop. The NAO robot handled physical interaction, sensors, speech output, and movement, while the laptop handled heavier processing such as ChatGPT responses, facial recognition, song identification, and transcription. This showed the value of modular architecture, where each service can be built, tested, and updated separately.

Another major theory area was engineering trade-off analysis. The project compared different design choices, including a state machine versus a monolithic loop, Python 2/Python 3 versus C++, session-only memory versus persistent user memory, and ChatGPT-based dance selection versus tone-analysis-based dance selection. These comparisons helped justify the final design decisions.

## Lab Work
The lab work involved designing, building, testing, and improving the NAO robot system over both semesters. In COE70A, the lab work focused more on planning, project definition, research, early architecture, design alternatives, milestone submissions, and meetings with the Faculty Lab Coordinator. In COE70B, the lab work shifted toward implementation, integration, testing, debugging, and final demonstration.

The main implementation work was building a NAO robot application that could interact with users through speech, facial recognition, and dancing. The robot-side code ran in Python 2.7 using NAOqi and controlled the robot’s microphone, camera, speaker, and motors. The main robot program used a state machine with four main states: idle, conversational, facial recognition, and listen-and-dance.

The team also built laptop-side Flask services in Python 3. One service handled ChatGPT conversation and dance selection, one handled facial recognition using OpenCV, dlib, and the face_recognition library, and one handled song identification through the AudD API. The robot communicated with these services over the local network using HTTP requests, JSON data, audio files, and camera images.

Testing was done across the full system. The team tested wake-word detection, conversation flow, facial recognition, user registration, dance selection, robot balance, battery effects, lighting conditions, network performance, and API latency. Some issues found during testing included slower performance on low battery, weaker facial recognition in dim lighting, slower requests on weak networks, and one dance routine that could make the robot lose balance.

## Projects / Deliverables
- **Capstone Project:** Chat with NAO Robot using ChatGPT
- **Project Goal:** Build a social robot system where a NAO robot can talk to users, recognize faces, remember the current user during a session, and dance to music.
- **COE70A Deliverables:** project topic selection, design process work, milestone submissions, milestone compliance reports, design activity report, project planning, architecture decisions, and oral examination.
- **COE70B Deliverables:** working prototype, project management and teamwork deliverables, milestone compliance reports, final demonstrations, project oral examination, Open House participation, and final engineering design report.
- **Final Report Sections:** abstract, introduction, background, objectives, theory and design, alternative designs, material/component list, measurement and testing procedures, performance measurement results, analysis of performance, conclusions, references, and appendices.
- **Final Prototype Features:** wake-word activation, spoken conversation using ChatGPT, facial recognition for known and new users, session-based user context, song recognition, ChatGPT-based dance selection, and predefined NAO dance routines.

## Tools / Technologies
- NAO humanoid robot
- NAOqi SDK
- Python 2.7 on the NAO robot
- Python 3 on the laptop
- Flask
- HTTP requests and JSON communication
- OpenAI API / ChatGPT
- gpt-5-mini
- Google speech-to-text
- AudD song recognition API
- OpenCV
- dlib
- face_recognition library
- Choregraphe
- ALTextToSpeech
- ALSpeechRecognition
- ALVideoDevice
- ALMotion
- angleInterpolationBezier
- Local network communication
- Ethernet, Wi-Fi, and phone hotspot testing
- registered_users.json for storing recognized users
- dance_counts.json for tracking dance usage
- Python threading, queues, and state-machine control

## Skills Demonstrated
- Engineering design and system architecture
- Human-robot interaction design
- Robotics programming with NAOqi
- AI API integration
- Speech-to-text and voice interaction design
- Computer vision and facial recognition
- State-machine design and concurrent programming
- Flask API development
- Client-server communication over a local network
- Debugging a distributed robot/software system
- Testing under real-world conditions such as lighting, battery level, and network quality
- Performance measurement and latency analysis
- Technical report writing and engineering documentation
- Project planning, milestone tracking, teamwork, and oral presentation
- Design trade-off analysis and justification of engineering decisions

## Key Takeaways
This course showed how a large open-ended engineering problem can be turned into a working prototype through planning, design, implementation, testing, and iteration. The biggest takeaway was that connecting physical hardware to modern AI services is possible, but every connection introduces practical challenges.

The project showed that modular design makes a complex robot system easier to manage. Keeping the NAO robot responsible for physical interaction while moving heavier processing to laptop services made the system more flexible and easier to debug. The state machine was also important because it kept the robot’s behaviours organized and prevented the microphone, camera, and motors from being used by multiple parts of the system at the same time.

The testing phase showed that real-world conditions matter a lot. Lighting affected facial recognition, battery level affected recording and camera capture, network quality affected response time, and cloud APIs introduced latency. The project also showed that a successful demo depends not only on writing code, but also on reliability, safety, documentation, project management, and careful testing.

## Related Portfolio Topics
- AI-powered humanoid robot interaction
- Human-robot interaction
- NAO robot programming
- LLM-powered conversational systems
- Speech-to-text voice interfaces
- Computer vision and facial recognition
- Modular Flask API architecture
- Distributed client-server system design
- Robotics motion control and choreography
- Real-time system testing and debugging
- Engineering capstone design
- Technical project management and team-based software/hardware integration