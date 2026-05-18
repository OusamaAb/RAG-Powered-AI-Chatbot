window.OUSAMA = {
  email: "OusamaHAlabdullah@gmail.com",
  github: "https://github.com/OusamaAb",
  linkedin: "https://www.linkedin.com/in/ousama-alabdullah/",
  about: [
    "I am a Software Engineering graduate from Toronto Metropolitan University with experience in software development, data engineering, cloud technologies, and AI-powered applications.",
    "I have worked on backend systems, full-stack web apps, computer vision, distributed systems, automation scripts, and real-time data processing.",
    "I enjoy building practical software, especially when it involves working with data, creating useful systems, and solving real problems."
  ],
  now: [
    "Shipping a RAG-powered portfolio chatbot grounded in approved markdown about my work.",
    "Building BreakEven, a full-stack daily budgeting app with carryover, OAuth sign-in, and a Rails API.",
    "Sharpening Python, React, Next.js, AWS, and data pipeline skills on side projects and prep."
  ],
  projects: [
    {
      id: "breakeven",
      title: "BreakEven",
      tag: "Full-stack · Finance",
      year: "2026",
      blurb: "A daily allowance budgeting app with carryover, expense tracking, and ledger-style summaries kept consistent on the backend.",
      detail: [
        "React frontend, Ruby on Rails backend, PostgreSQL through Supabase, Google OAuth sign-in, and JWT-protected APIs.",
        "Centralizes budget and carryover math on the server so summaries stay authoritative under edits and backdated expenses.",
        "Precomputed ledger paths keep the UI stable without recalculating on every navigation."
      ],
      stack: ["React", "Rails", "PostgreSQL", "Supabase", "OAuth", "JWT"],
      links: [
        { label: "Live demo", href: "https://breakeven-frontend.onrender.com/" },
        { label: "GitHub", href: "https://github.com/OusamaAb/BreakEven" }
      ]
    },
    {
      id: "nao-robot",
      title: "Chat with NAO",
      tag: "Robotics · Capstone",
      year: "2025 – 2026",
      blurb: "Fourth-year engineering design capstone: a NAO humanoid that talks, recognizes faces, identifies songs, and dances using laptop-side AI services.",
      detail: [
        "On-robot state machine in Python 2.7 with NAOqi runs four modes: idle, conversational, facial recognition, and listen-and-dance.",
        "Laptop-side Flask services in Python 3 wire up ChatGPT conversation, face recognition with OpenCV and dlib, AudD song ID, and Google speech-to-text.",
        "Tested under real lighting, battery, and Wi-Fi conditions for a reliable end-to-end demo."
      ],
      stack: ["NAOqi", "Python", "Flask", "OpenAI", "OpenCV", "face_recognition", "AudD"],
      links: [
        { label: "Watch demo", href: "https://youtu.be/k3GlubiHJS4" },
        { label: "GitHub", href: "https://github.com/OusamaAb/Chat-with-NAO-robot-using-ChatGPT" }
      ]
    },
    {
      id: "smart-parking",
      title: "Smart Parking System",
      tag: "Distributed · Cloud",
      year: "2026",
      blurb: "Team-built distributed smart parking web app with five FastAPI microservices, a React frontend, and real deployment patterns.",
      detail: [
        "API gateway routes browser traffic to Parking, Reservation, Sensor, and Pricing services with database-per-service ownership.",
        "React + Vite frontend deployed to GitHub Pages through a GitHub Actions CI/CD workflow.",
        "Cloudflare HTTPS tunnel bridges the hosted UI to local backends without mixed-content errors during demos."
      ],
      stack: ["FastAPI", "React", "Vite", "SQLite", "GitHub Actions", "Cloudflare Tunnel"],
      links: [
        { label: "GitHub", href: "https://github.com/OusamaAb/COE892-Project---Smart-Parking-System" }
      ]
    },
    {
      id: "portfolio-rag",
      title: "Portfolio RAG Chatbot",
      tag: "AI · RAG",
      year: "2026",
      blurb: "This site's chatbot — retrieval-augmented Q&A grounded only in approved markdown about my projects, experience, and background.",
      detail: [
        "Markdown chunks embedded with OpenAI text-embedding-3-small and stored in Supabase Postgres with pgvector.",
        "HNSW vector index returns top-k chunks for a query before the model writes the answer.",
        "Server-side guardrails so responses stay inside approved portfolio content."
      ],
      stack: ["Supabase", "pgvector", "OpenAI", "Node.js", "RAG"],
      links: [
        { label: "GitHub", href: "https://github.com/OusamaAb/RAG-Powered-AI-Chatbot" }
      ]
    },
    {
      id: "document-scanner",
      title: "Document Scanner",
      tag: "Computer vision · OCR",
      year: "2025",
      blurb: "A classical CV pipeline that detects a page in a photo, corrects perspective, preprocesses for legibility, and extracts text with Tesseract.",
      detail: [
        "OpenCV edge detection and contour analysis locate page candidates, with aspect-ratio and area sanity checks.",
        "Homography warps the page to a fronto-parallel view; adaptive thresholding handles stubborn lighting.",
        "Tesseract OCR tuned so phone photos with mild perspective and shadow still yield readable text."
      ],
      stack: ["Python", "OpenCV", "Tesseract OCR", "NumPy"],
      links: [
        { label: "GitHub", href: "https://github.com/OusamaAb/CPS843-Project-Document-Scanner-with-Text-Extraction" }
      ]
    },
    {
      id: "football-pickems",
      title: "Football Pickems",
      tag: "Full-stack · Sports",
      year: "2026",
      blurb: "A friend-league football prediction web app where users pick outcomes, scorers, scorelines, and cards across a season.",
      detail: [
        "Models users, leagues, fixtures, picks, and standings with explicit pick states (open, locked, scored).",
        "Scoring runs deterministically when results arrive, so standings rebuild idempotently from stored picks.",
        "Designed for future sports data API integration and league admin tooling."
      ],
      stack: ["React", "Next.js", "TypeScript", "REST APIs"],
      links: [
        { label: "GitHub", href: "https://github.com/OusamaAb/football-pickems" }
      ]
    }
  ],
  experience: [
    {
      role: "Engineering Intern",
      org: "Ministry of Transportation Ontario",
      dates: "May 2024 – Aug 2025",
      bullets: [
        "Built Python pipelines that extracted, cleaned, compared, and reported traffic data from HERE, TomTom, Waze, Transnomis, and MTO Bluetooth.",
        "Used Pandas, GeoPandas, Shapely, and QGIS to match traffic segments to route geometry and shapefiles for travel time analysis.",
        "Maintained Oracle SQL transportation records and prepared cleaned datasets for Power BI dashboards and weekly reports.",
        "Contributed to the ITS Systems Inventory PowerApps tool and Microsoft DevOps release workflows."
      ]
    },
    {
      role: "Data Analyst Intern",
      org: "Vanguard Financial",
      dates: "Apr 2021 – Jul 2021",
      bullets: [
        "Improved SQL queries used for financial reporting and weekly data extraction.",
        "Automated repetitive data cleaning in Python so weekly reports stayed faster and more reliable.",
        "Built Power BI and Tableau dashboards to make business metrics easier to access for internal teams."
      ]
    }
  ],
  education: {
    school: "Toronto Metropolitan University",
    degree: "Bachelor of Engineering, Software Engineering",
    grad: "2026",
    coursework: [
      {
        code: "COE892",
        name: "Distributed & Cloud Computing",
        term: "4th Year · Winter",
        blurb: "Distributed and cloud-based systems — communication patterns, concurrency, microservices, containers, and cloud deployment.",
        theory: [
          "Client-server vs peer-to-peer architectures, DHTs, and unstructured P2P.",
          "Concurrency, threading, locks, and the difference between I/O-bound and CPU-bound work.",
          "Sync vs async communication: gRPC, REST, and message queues.",
          "Containers, cloud service models, and consensus algorithms like RAFT."
        ],
        labs: [
          "Lab 1 — rover sim comparing sequential vs threaded execution and SHA-256 mine disarming.",
          "Lab 2 — gRPC + Protocol Buffers for ground-control / rover communication.",
          "Lab 3 — RabbitMQ deminer workers consuming async disarming jobs.",
          "Lab 4/5 — FastAPI REST + WebSockets, Dockerized and deployed to Azure."
        ],
        projects: [
          "Smart Parking System — distributed web app with five FastAPI microservices, an API gateway, a React frontend on GitHub Pages, and a Cloudflare HTTPS tunnel into local backends."
        ],
        tools: ["Python", "FastAPI", "gRPC", "RabbitMQ", "Docker", "Azure"]
      },
      {
        code: "CPS843",
        name: "Computer Vision",
        term: "4th Year · Fall",
        blurb: "Classical computer vision — intensity transforms, filtering, projective geometry, SIFT/stitching, and OCR pipelines.",
        theory: [
          "Intensity transforms (log, inverse-log, gamma) and histogram equalization.",
          "Edge detection with Roberts / Prewitt / Sobel and the Laplacian operator.",
          "Projective vs affine vs similarity transforms; homogeneous coordinates and conics.",
          "Camera intrinsics, projection matrices, and SIFT feature matching."
        ],
        labs: [
          "PS1 — intensity transforms, bit-plane slicing, and histogram equalization in MATLAB.",
          "PS2 — Sobel/Prewitt/Roberts edges, unsharp masking, and Gaussian noise filtering.",
          "PS3 — projective geometry, MLESAC, and 3D point-cloud sphere fitting.",
          "PS4 — camera projection matrices and panorama stitching with SIFT/AutoStitch."
        ],
        projects: [
          "Document Scanner with Text Extraction — page detection, homography warp, CLAHE / Otsu preprocessing, and Tesseract OCR with word and line bounding boxes."
        ],
        tools: ["MATLAB", "Python", "OpenCV", "Tesseract"]
      },
      {
        code: "COE70A / COE70B",
        name: "Engineering Design Capstone",
        term: "4th Year · Full Year",
        blurb: "Two-semester capstone — from problem definition and design alternatives to a working prototype, demo, and final report.",
        theory: [
          "Engineering design process: requirements, constraints, alternatives, and trade-offs.",
          "Human-robot interaction and modular system architecture.",
          "State machines for coordinating robot behaviour and shared peripherals.",
          "Splitting work between a constrained robot and a heavier laptop service tier."
        ],
        labs: [
          "COE70A — project scoping, design alternatives, milestone reviews, and oral exam.",
          "COE70B — full integration, testing under real lighting / battery / network conditions, demo."
        ],
        projects: [
          "Chat with NAO — a NAO humanoid with idle, conversational, facial recognition, and listen-and-dance states, backed by Flask services for ChatGPT, OpenCV face recognition, and AudD song ID."
        ],
        tools: ["NAOqi", "Python 2.7 / 3", "Flask", "OpenCV", "OpenAI"]
      },
      {
        code: "COE817",
        name: "Network Security",
        term: "4th Year · Winter",
        blurb: "Cryptography and authentication in networked Java systems — sockets, keys, signatures, and replay-attack prevention.",
        theory: [
          "Confidentiality, integrity, authentication, and non-repudiation.",
          "Symmetric vs public-key crypto; the roles of RSA, AES, and HMAC.",
          "Nonce-based challenge-response and replay protection.",
          "Key Distribution Centers, session keys, and protocol design pitfalls."
        ],
        labs: [
          "Lab 1 — Java sockets and a Vigenère-cipher chat with a multithreaded server.",
          "Lab 2 — symmetric and RSA-based authentication with digital signatures.",
          "Lab 3 — KDC-based hybrid key distribution between two clients.",
          "Lab 4 — secure group chat with replay-attack prevention."
        ],
        projects: [
          "Secure banking app — multi-client server with authenticated key distribution, AES + HMAC-SHA256, nonce-based replay protection, and encrypted audit logs."
        ],
        tools: ["Java", "JCA / JCE", "AES", "RSA", "HMAC-SHA256"]
      },
      {
        code: "COE891",
        name: "Software Testing & QA",
        term: "4th Year · Winter",
        blurb: "Test design, automation, coverage, and mutation testing — applied through Java testing tools and Apache Commons Math.",
        theory: [
          "Input Space Partitioning and Boundary Value Analysis.",
          "Control- and data-flow graphs: node, edge, edge-pair, prime-path, and DU-path coverage.",
          "Logic coverage — predicate, clause, GACC, CACC, and RACC.",
          "Mutation testing as a measure of suite strength beyond line coverage."
        ],
        labs: [
          "Lab 1–2 — JUnit, TestNG, parameterized tests, and OpenClover coverage.",
          "Lab 3 — Selenium WebDriver browser automation with TestNG.",
          "Lab 4–5 — CFG / DFG construction and logic-based test design.",
          "Lab 6 — PIT mutation testing on Money / MoneyBag with mutator comparisons."
        ],
        projects: [
          "Apache Commons Math QA project — ISP / BVA for WeightedMean, CFG / DFG for matrix ops, logic coverage for matrix add/multiply, PIT on MultivariateNormalDistribution, plus an LLM-assisted ChatUniTest comparison."
        ],
        tools: ["JUnit", "TestNG", "Selenium", "OpenClover", "JaCoCo", "PIT"]
      },
      {
        code: "COE718",
        name: "Embedded Systems",
        term: "4th Year · Fall",
        blurb: "ARM Cortex-M3 embedded design — peripherals, interrupts, RTOS scheduling, and a multimedia integration project.",
        theory: [
          "ARM Cortex-M3 programming model, bit-banding, and conditional execution.",
          "Interrupts, timers, and memory-mapped I/O for peripheral control.",
          "RTOS scheduling — preemptive, round-robin, Rate Monotonic, and EDF.",
          "Priority inversion and priority elevation under shared resources."
        ],
        labs: [
          "Lab 1 — joystick + LED + GLCD + ADC GPIO basics in Keil µVision.",
          "Lab 2 — bit-banding, masking, and barrel shifting for performance.",
          "Lab 3b — preemptive RTX scheduling with task signals and synchronization.",
          "Lab 4 — Rate Monotonic Scheduling, virtual timers, and priority-inversion resolution."
        ],
        projects: [
          "Media Centre on MCB1700 — a state-machine app with a photo gallery, USB-streamed audio player via timer / DAC, and a T-Rex Run game rendered on the GLCD."
        ],
        tools: ["C", "Keil µVision", "CMSIS-RTOS", "MCB1700"]
      },
      {
        code: "COE768",
        name: "Computer Networks",
        term: "4th Year · Fall",
        blurb: "TCP/IP fundamentals — sockets, packet analysis, and a peer-to-peer file-sharing project in C.",
        theory: [
          "OSI and TCP/IP layering, encapsulation, and protocol headers.",
          "TCP vs UDP — handshakes, reliability, and overhead trade-offs.",
          "Framing, error detection, stop-and-wait, and sliding-window protocols.",
          "Ethernet, ARP, DNS, IP addressing, and LAN switching."
        ],
        labs: [
          "Lab 1 — VM-to-VM ping + Echo with Wireshark layer analysis.",
          "Lab 2 — TCP three-way handshake, forking concurrent servers, and Hello sockets.",
          "Lab 3 — TCP-based reliable file download.",
          "Lab 4 — UDP time service and chunked UDP file transfer with custom PDUs."
        ],
        projects: [
          "P2P file sharing in C — index server plus peers using UDP control PDUs and TCP transfers, with registration, search, deregistration, and dynamic port assignment via getsockname()."
        ],
        tools: ["C", "BSD sockets", "Linux", "Wireshark"]
      },
      {
        code: "ELE888",
        name: "Intelligent Systems (ML)",
        term: "4th Year · Winter",
        blurb: "Foundations of machine learning — implemented from scratch in Python on the IRIS dataset and image data.",
        theory: [
          "Bayesian decision theory, posteriors, and minimum-risk classification.",
          "Linear discriminant functions and perceptron gradient descent.",
          "Multilayer neural networks, backpropagation, and nonlinear separation.",
          "K-means clustering and cluster-quality evaluation with the Xie-Beni index."
        ],
        labs: [
          "Lab 1 — two-class Bayes classifier on IRIS with cost-sensitive thresholds.",
          "Lab 2 — perceptron-based linear discriminant on Setosa / Versicolour / Virginica.",
          "Lab 3 — multilayer net solving XOR with hidden-space decision-boundary plots.",
          "Lab 4 — K-means image-colour clustering with a two-run comparison."
        ],
        projects: [
          "The lab assignments served as the main project component — Bayes, perceptron, an XOR-solving neural net, and K-means all implemented from scratch."
        ],
        tools: ["Python", "NumPy", "Matplotlib", "scikit-learn"]
      },
      {
        code: "CPS510",
        name: "Database Systems",
        term: "3rd Year · Fall",
        blurb: "Relational database design — ER modeling, SQL, normalization, and a semester-long job-bank project in Oracle.",
        theory: [
          "ER modeling: entities, attributes, relationships, weak entities, and constraints.",
          "Relational algebra — selection, projection, joins, union, and difference.",
          "Functional dependencies and normalization through 1NF, 2NF, 3NF, and BCNF.",
          "Storage, indexing, and physical-organization basics."
        ],
        labs: [
          "Weekly labs that built one piece at a time: ER diagram, Oracle DDL, simple and advanced SQL, FD analysis, 3NF, BCNF, and a shell + GUI front end."
        ],
        projects: [
          "JobsForAll — an Oracle-backed job-bank system with Account, Applicant, Recruiter, Company, JobListing, and JobApplication tables, normalized to BCNF, plus SQL views and a GUI."
        ],
        tools: ["Oracle SQL", "SQL*Plus", "ER diagrams", "Relational algebra"]
      },
      {
        code: "CPS714",
        name: "Software Project Management",
        term: "4th Year · Fall",
        blurb: "How software projects are scoped, scheduled, executed, and closed — across predictive and Agile life cycles.",
        theory: [
          "Triple constraint — scope, time, and cost (plus quality, risk, and stakeholders).",
          "Project, program, and portfolio management; SWOT and weighted scoring.",
          "Predictive vs Agile vs hybrid life cycles; Scrum, sprints, and retros.",
          "Risk identification, probability / impact analysis, and contingency planning."
        ],
        labs: [
          "Building Work Breakdown Structures from project scopes.",
          "Activity lists, milestones, and dependency-aware schedule design.",
          "Gantt charts and network diagrams for tracking progress.",
          "Agile sprint planning, standups, reviews, and retrospectives."
        ],
        projects: [
          "Team-managed software project — full life cycle including charter, scope, WBS, schedule, risk register, sprint plans, demos, and a final delivery presentation."
        ],
        tools: ["Gantt tools", "Jira / GitHub Projects", "WBS / risk-register templates"]
      },
      {
        code: "CPS688",
        name: "Advanced Algorithms",
        term: "3rd Year · Winter",
        blurb: "Algorithm design and analysis — greedy, DP, divide-and-conquer, graphs, NP-completeness, flows, and randomized algorithms.",
        theory: [
          "Greedy algorithms — Dijkstra, Bellman-Ford, Kruskal, and Prim.",
          "Dynamic programming — knapsack, sequence alignment, and coin change.",
          "NP-completeness and polynomial-time reductions (3-SAT, vertex cover, TSP).",
          "Network flow with Ford-Fulkerson and the max-flow / min-cut theorem.",
          "Randomized algorithms — min-cut contraction, MAX 3-SAT, and hashing."
        ],
        labs: [],
        projects: [],
        tools: ["Pseudocode", "Big-O analysis", "Recurrence relations"]
      }
    ]
  },
  skills: {
    Languages: ["Python", "Java", "JavaScript", "TypeScript", "Ruby", "SQL", "HTML", "CSS", "C", "C++", "Bash", "MATLAB"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Vite", "Responsive design", "Component UI", "API integration"],
    Backend: ["FastAPI", "Ruby on Rails", "Flask", "REST APIs", "Microservices", "API gateways", "JWT", "OAuth"],
    Databases: ["PostgreSQL", "Supabase", "Oracle SQL", "SQLite", "pgvector", "Data modeling", "ETL workflows"],
    "Data Engineering": ["Pandas", "NumPy", "GeoPandas", "Shapely", "Excel automation", "Power BI", "Tableau", "Data pipelines"],
    "Cloud / DevOps": ["AWS", "Lambda", "S3", "SageMaker", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Azure DevOps", "Databricks"],
    "AI / ML": ["OpenAI APIs", "RAG", "OpenCV", "Tesseract OCR", "Scikit-learn", "TensorFlow", "Face recognition", "NLP"],
    Testing: ["JUnit", "TestNG", "Selenium WebDriver", "PIT mutation testing", "Unit testing", "Integration testing"]
  },
  certs: [
    {
      name: "AWS Certified Cloud Practitioner",
      org: "Amazon Web Services",
      date: "2025",
      exp: "2028"
    },
    {
      name: "AWS Certified AI Practitioner",
      org: "Amazon Web Services",
      date: "2025",
      exp: "2028"
    }
  ]
};
