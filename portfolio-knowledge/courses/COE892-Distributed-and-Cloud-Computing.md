# COE892 — Distributed & Cloud Computing

## Course Overview
Distributed & Cloud Computing introduced the design and implementation of large-scale distributed and cloud-based systems. The course focused on how modern software systems are built when computation, storage, users, and services are spread across multiple machines or environments.

The course covered distributed system architectures, client-server systems, peer-to-peer design, inter-process communication, concurrency, synchronization, consistency, replication, fault tolerance, recovery, virtualization, containers, and cloud deployment. A major part of the course involved applying these ideas through Python-based labs and a final distributed web application project.

## Institution / Program
Toronto Metropolitan University, Software Engineering, Electrical and Computer Engineering Department

## Term / Date
Fourth Year, Winter Semester

## Main Topics
- Distributed computing and cloud computing fundamentals
- Large-scale distributed system design
- Client-server architecture
- Peer-to-peer systems, including structured and unstructured P2P
- Distributed Hash Tables, including DHT-based system design
- Processes, threads, multithreading, and multiprocessing
- Concurrency, synchronization, locks, and shared memory
- Inter-process communication methods
- Remote Procedure Calls using gRPC
- Protocol Buffers for strongly typed service communication
- Message-oriented communication using AMQP
- RabbitMQ and asynchronous task processing
- Publisher-subscriber communication models
- MQTT and multicast communication
- Physical clocks, logical clocks, and vector clocks
- Mutual exclusion and election algorithms
- Replication and consistency models
- Fault tolerance, reliability, and recovery
- RAFT consensus algorithm
- Cloud service models
- Virtualization using virtual machines and containers
- Docker containerization
- Container orchestration concepts
- Web application design using Python frameworks
- FastAPI-based backend development
- REST APIs and WebSocket communication
- Public cloud deployment patterns
- API gateways and microservice coordination

## Theory Learned
This course built a strong foundation in how distributed systems are designed, coordinated, and deployed. One of the main ideas was that distributed systems are not just regular applications running on different machines. They introduce additional challenges such as communication delays, partial failures, synchronization problems, consistency trade-offs, and coordination between independent components.

A major theory topic was distributed architecture. This included client-server systems, where clients request services from centralized servers, and peer-to-peer systems, where nodes communicate directly with one another. The course also introduced structured peer-to-peer systems such as Distributed Hash Tables, as well as unstructured peer-to-peer models such as Gnutella-style networks.

The course also covered concurrency and synchronization. This included understanding the difference between concurrency and parallelism, how threads and processes behave, and why shared resources require careful synchronization. Concepts such as locks, race conditions, shared memory, and thread-safe programming were important for understanding how multiple tasks can run safely at the same time.

Another major area was distributed communication. The course compared different communication styles, including direct synchronous communication through RPC and asynchronous communication through message queues. gRPC was used as an example of strongly typed service-to-service communication, while RabbitMQ was used to demonstrate asynchronous message processing where producers and consumers do not need to run at the same time.

The cloud computing portion focused on virtualization, containers, cloud service models, and application deployment. The course explained how containers package applications with their dependencies and how cloud platforms can host distributed applications. It also introduced container orchestration and cloud-native design concepts.

Later topics focused on replication, consistency, reliability, fault tolerance, and recovery. These topics explained how distributed systems continue operating even when nodes fail, messages are delayed, or replicas temporarily disagree. The course also introduced consensus through the RAFT algorithm, showing how distributed systems can agree on state even in the presence of failures.

## Lab Work
The lab work was a major part of the course and followed a connected rover-and-minefield theme. Each lab expanded the same system using a new distributed computing concept.

### Lab 1 — Concurrency vs Parallelism
In Lab 1, I built a Python-based rover simulation to compare sequential execution with multithreaded execution. The simulation involved ten rovers navigating a minefield grid using commands such as `L`, `R`, `M`, and `D`.

The first part of the lab focused on rover path calculation. Each rover received commands, moved through a grid, and generated a path output file. I implemented both a sequential version, where rovers were processed one at a time, and a threaded version, where each rover ran in its own thread. This showed that threading improved performance for I/O-bound tasks because API requests and file-writing operations could overlap.

The second part introduced mine disarming. When a rover found a mine, the system had to brute-force a PIN by hashing the mine serial number with possible PIN values until the SHA-256 hash started with six leading zeros. This was CPU-bound work, so threading did not provide the same level of improvement. This helped demonstrate the impact of Python’s Global Interpreter Lock and why threading is better suited for I/O-bound tasks than CPU-heavy computation.

This lab helped me understand:
- The practical difference between concurrency and parallelism
- When multithreading improves performance
- Why CPU-bound and I/O-bound tasks behave differently
- How locks protect shared resources
- How Python threading is affected by the Global Interpreter Lock
- How performance measurements can be used to compare system designs

### Lab 2 — gRPC
In Lab 2, I extended the rover simulation by replacing the previous communication approach with gRPC. The system was split into a Ground Control server and ten rover clients.

The communication structure was defined using Protocol Buffers. The `.proto` file defined the service interface and message formats used between the server and clients. The main RPC methods included:
- `GetMap`, used by rovers to retrieve the minefield map
- `GetCommands`, used to stream rover commands from Ground Control
- `GetMineSerial`, used to retrieve the serial number of a mine at a coordinate
- `ReportStatus`, used by rovers to report mission results
- `ShareMinePIN`, used by rovers to share discovered mine PINs and hashes

The server used a `ThreadPoolExecutor` so multiple rover clients could connect and communicate at the same time. Each rover client retrieved its map, received a streamed command sequence, executed movement commands, requested mine serial numbers when needed, and reported results back to Ground Control.

This lab helped me understand:
- How remote procedure calls work in distributed systems
- How Protocol Buffers define strongly typed service contracts
- How gRPC supports client-server communication
- How server streaming can be used to send command sequences
- How distributed components can interact through clearly defined interfaces
- How service stubs and generated code simplify distributed communication

### Lab 3 — RabbitMQ
In Lab 3, I added RabbitMQ to the rover system to introduce asynchronous messaging. In the previous gRPC lab, rovers handled mine disarming directly through synchronous communication. In this lab, mine disarming was separated into a new component called `deminer.py`.

The system had three main components:
- Ground Control, which remained a gRPC server
- Rover clients, which still used gRPC to receive maps and commands
- Deminer processes, which consumed mine-disarming jobs from RabbitMQ

When a rover detected a mine, it requested the mine serial number through gRPC and then published a disarming task to a RabbitMQ queue called `Demine-Queue`. The rover did not compute the PIN itself. Instead, independent deminer processes consumed tasks from the queue, brute-forced the SHA-256 PIN, and published the result to another queue called `Defused-Mines`.

This lab showed how asynchronous communication can decouple components. Rovers did not need to wait for mine disarming to finish, and multiple deminer workers could be added without changing the rover or Ground Control logic.

This lab helped me understand:
- How message queues decouple producers and consumers
- How RabbitMQ supports asynchronous task processing
- How gRPC and RabbitMQ can be used together in one distributed system
- When synchronous communication is appropriate
- When asynchronous communication is a better design choice
- How queue-based workers improve scalability and fault tolerance
- How horizontal scaling works by adding more consumers to the same queue

### Lab 4/5 — FastAPI, WebSockets, Containers, and Cloud Deployment
In Labs 4 and 5, I built a minefield rover control system using FastAPI. The goal was to create a backend server that could manage a map, mines, and rovers through REST API endpoints, while also supporting real-time rover control through WebSockets.

The backend used FastAPI and Uvicorn. It stored the map as a 2D Python list and stored mines and rovers using in-memory dictionaries. The API included endpoints for:
- Viewing and updating the map
- Creating, reading, updating, and deleting mines
- Creating, reading, updating, and deleting rovers
- Dispatching a rover using a stored command sequence
- Controlling a rover in real time through a WebSocket connection

The dispatch logic reused the rover movement rules from the earlier labs. Rovers started at `(0,0)`, faced South, and processed movement commands one at a time. If a rover landed on an active mine without digging, it was eliminated. If it dug successfully, the system brute-forced a SHA-256 PIN to defuse the mine.

The WebSocket mode made the rover control more interactive. Instead of sending a full command sequence at once, the user could send commands step by step. After each command, the server returned the updated rover state immediately. This made the system feel closer to real-time control.

I also built a simple browser-based operator interface using HTML, CSS, and JavaScript. The interface displayed the minefield grid, mines table, rover table, live control buttons, and an execution log. This made the system easier to test visually without needing to manually send API requests.

After the application worked locally, I containerized it using Docker. The Docker image used a Python base image, installed the required dependencies, exposed the application port, and packaged the backend so it could run consistently in another environment. The container was then deployed to Microsoft Azure using Azure Container Registry and Azure Web App for Containers.

This lab helped me understand:
- REST API design with FastAPI
- WebSocket-based real-time communication
- Backend state management
- API validation and error handling
- Frontend-to-backend integration
- Docker containerization
- Azure Container Registry
- Azure Web App for Containers
- How cloud deployment changes the way applications are packaged and run

## Projects / Deliverables
### Final Project — Smart Parking System
For the final project, my group built a Smart Parking System as a distributed web application. The system was designed to provide real-time parking lot visibility, dynamic pricing, simulated IoT sensor events, and time-based parking reservations.

The project used a microservices architecture with five independent FastAPI services:
- API Gateway
- Parking Service
- Sensor Service
- Reservation Service
- Pricing Service

The API Gateway acted as the single entry point for the frontend. Instead of the React app calling each microservice directly, all browser requests were routed through the gateway. This simplified the frontend, centralized CORS handling, and allowed the gateway to aggregate responses from multiple services.

The Parking Service managed parking spot data, including whether each spot was available, occupied, or reserved. The Reservation Service handled reservation creation, expiration, and simulated time. The Sensor Service simulated vehicle entry and exit events and updated spot states through internal service calls. The Pricing Service was stateless and calculated parking rates based on occupancy levels.

The frontend was built with React and Vite. It displayed the parking lot, current spot availability, dynamic pricing, reservation controls, and simulated sensor interactions. The frontend was deployed to GitHub Pages using a GitHub Actions CI/CD workflow.

The backend services ran locally on the developer machine, while the frontend was hosted online. To connect the hosted frontend to the local backend securely, the project used a Cloudflare HTTPS tunnel. This solved the browser mixed-content issue that happens when an HTTPS frontend tries to call an HTTP backend.

The system successfully demonstrated:
- Microservice-based system design
- API gateway routing and aggregation
- Service-to-service communication using HTTP
- Database-per-service ownership
- Real-time parking availability updates
- Dynamic pricing based on occupancy
- Reservation lifecycle management
- Simulated IoT sensor events
- GitHub Pages frontend deployment
- GitHub Actions CI/CD
- Cloudflare tunneling for secure frontend-backend communication

### Other Deliverables
- Lab 1 report on concurrency, parallelism, threading, locks, and SHA-256 mine disarming
- Lab 2 report on gRPC, Protocol Buffers, server streaming, and rover-client communication
- Lab 3 report on RabbitMQ, asynchronous messaging, and deminer worker processes
- Lab 4/5 report on FastAPI, REST APIs, WebSockets, Docker, and Azure deployment
- Final project proposal
- Interim project report
- Final project code
- Final project report
- Final project demonstration

## Tools / Technologies
- Python
- FastAPI
- Uvicorn
- gRPC
- Protocol Buffers
- RabbitMQ
- Pika
- WebSockets
- REST APIs
- HTTP service-to-service communication
- httpx
- Docker
- Azure Container Registry
- Azure Web App for Containers
- Microsoft Azure
- React
- Vite
- JavaScript
- HTML
- CSS
- SQLite
- GitHub Pages
- GitHub Actions
- Cloudflare Tunnel
- SHA-256 hashing
- Python threading
- ThreadPoolExecutor
- Locks and synchronization primitives
- JSON
- API Gateway pattern
- Microservices architecture

## Skills Demonstrated
- Designed and implemented distributed systems using multiple communication models
- Compared sequential, concurrent, and threaded execution in Python
- Used locks to protect shared resources in multithreaded programs
- Analyzed the difference between I/O-bound and CPU-bound workloads
- Built client-server systems using gRPC and Protocol Buffers
- Implemented server-streaming RPC methods
- Integrated RabbitMQ for asynchronous task processing
- Separated synchronous and asynchronous communication responsibilities
- Built RESTful APIs using FastAPI
- Implemented WebSocket-based real-time control
- Designed and tested backend API endpoints
- Created browser-based interfaces for interacting with distributed applications
- Containerized Python applications using Docker
- Deployed containerized applications to Azure
- Designed a microservices-based final project
- Used an API Gateway to route and aggregate backend requests
- Applied database-per-service principles
- Built a React frontend connected to distributed backend services
- Used GitHub Actions for frontend deployment
- Used Cloudflare Tunnel to bridge a hosted frontend and local backend services
- Wrote technical reports explaining architecture, implementation, results, and trade-offs
- Presented and demonstrated lab work and a final cloud-based project

## Key Takeaways
The biggest takeaway from this course was that distributed systems require more than just splitting an application into multiple services. Each component needs a clear role, a communication method, and a strategy for handling delays, failures, consistency, and coordination.

The labs showed that the best communication method depends on the situation. gRPC is useful when a service needs an immediate response and a strongly typed interface. RabbitMQ is better when work can happen asynchronously and should not block the caller. REST APIs and WebSockets are useful for web applications, especially when users need both standard request-response actions and real-time updates.

The course also showed that concurrency and parallelism are not always the same thing. Threading can improve performance when the system spends time waiting on I/O, but it may not help much for CPU-heavy tasks in Python because of the Global Interpreter Lock.

Another important takeaway was the value of deployment and packaging. Docker made applications easier to run consistently, and cloud deployment introduced real-world concerns like ports, environment variables, CORS, HTTPS, and frontend-backend communication.

The final project tied the course together by showing how microservices, API gateways, service communication, dynamic system state, frontend deployment, and cloud connectivity can work together in one distributed application.

## Related Portfolio Topics
- Microservices architecture
- Cloud application development
- Distributed systems design
- Backend API development
- FastAPI web services
- gRPC service communication
- RabbitMQ asynchronous messaging
- Docker containerization
- Azure cloud deployment
- React frontend development
- API Gateway design
- WebSocket real-time communication
- Smart Parking System project
- Service-to-service communication
- CI/CD with GitHub Actions
- Cloudflare tunneling
- System design and architecture diagrams
- Fault tolerance and scalability concepts
- Concurrency and multithreaded programming