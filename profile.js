window.OUSAMA = {
  email: "ousama@example.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  about: [
    "I am a Software Engineering graduate from Toronto Metropolitan University with experience in software development, data engineering, cloud technologies, and AI-powered applications.",
    "I have worked on backend systems, full-stack web apps, computer vision, distributed systems, automation scripts, and real-time data processing.",
    "I enjoy building practical software, especially when it involves working with data, creating useful systems, and solving real problems."
  ],
  now: [
    "Building a RAG-powered portfolio chatbot backed by approved markdown knowledge files.",
    "Improving full-stack, backend, data engineering, cloud, and AI systems skills.",
    "Developing projects around budgeting, football prediction leagues, and AI-integrated applications."
  ],
  projects: [
    {
      id: "breakeven",
      title: "BreakEven",
      tag: "Full-stack finance",
      year: "2026",
      blurb: "A daily budgeting app with carryover, expenses, authenticated access, and ledger-style summaries.",
      detail: [
        "Built with React, Ruby on Rails, PostgreSQL, Supabase, Google OAuth, JWT verification, and REST APIs.",
        "Centralizes budget and carryover rules on the backend so financial summaries stay consistent.",
        "Shows full-stack product work across authentication, persistence, domain logic, and UI."
      ],
      stack: ["React", "Rails", "PostgreSQL", "Supabase", "OAuth", "JWT"],
      link: "https://github.com/"
    },
    {
      id: "football-pickems",
      title: "Football Pickems",
      tag: "Sports web app",
      year: "2026",
      blurb: "A football prediction web app where friends run private leagues and submit predictions for matches.",
      detail: [
        "Models users, leagues, fixtures, picks, scoring rules, and standings.",
        "Uses explicit pick states such as open, locked, and scored to handle time-sensitive UX.",
        "Designed for future football or sports data API integration."
      ],
      stack: ["React", "Next.js", "TypeScript", "REST APIs", "Databases"],
      link: "https://github.com/"
    },
    {
      id: "portfolio-rag",
      title: "Portfolio RAG Chatbot",
      tag: "AI retrieval",
      year: "2026",
      blurb: "A portfolio chatbot that answers recruiter-style questions using only approved markdown files.",
      detail: [
        "Uses Supabase Postgres with pgvector for vector search over portfolio knowledge chunks.",
        "Embeds markdown chunks with OpenAI text-embedding-3-small.",
        "Built with guardrails so answers stay grounded in approved portfolio content."
      ],
      stack: ["Supabase", "pgvector", "OpenAI", "Node.js", "RAG"],
      link: "https://github.com/"
    }
  ],
  experience: [
    {
      role: "Software & Data Engineering Intern",
      org: "Ministry of Transportation Ontario",
      dates: "May 2024 - Aug 2025",
      bullets: [
        "Built Python automation scripts for traffic data extraction, cleaning, filtering, comparison, and reporting.",
        "Worked with HERE, TomTom, Waze, Transnomis, MTO Bluetooth, Oracle SQL, Power BI, PowerApps, Databricks, GeoPandas, Shapely, and QGIS.",
        "Improved manual traffic data workflows, dashboard inputs, and ITS inventory tooling."
      ]
    },
    {
      role: "Data Analyst Intern",
      org: "Vanguard Financial",
      dates: "Apr 2021 - Jul 2021",
      bullets: [
        "Improved SQL queries used for financial reporting and weekly data extraction.",
        "Automated data cleaning workflows using Python.",
        "Built Power BI and Tableau dashboards to make business metrics easier to access."
      ]
    }
  ],
  education: {
    school: "Toronto Metropolitan University",
    degree: "Bachelor of Engineering, Software Engineering",
    grad: "2026",
    coursework: [
      "Distributed and Cloud Computing",
      "Software Testing",
      "Database Systems",
      "Computer Vision",
      "Network Security",
      "Embedded Systems",
      "Machine Learning"
    ]
  },
  skills: {
    Languages: ["Python", "Java", "JavaScript", "TypeScript", "Ruby", "SQL", "C", "C++"],
    Frontend: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
    Backend: ["FastAPI", "Ruby on Rails", "REST APIs", "JWT", "Microservices"],
    Data: ["PostgreSQL", "Supabase", "Oracle SQL", "Pandas", "GeoPandas", "Power BI"],
    Cloud: ["AWS", "Docker", "Kubernetes", "CI/CD", "Azure DevOps"],
    AI: ["RAG", "OpenAI APIs", "Computer Vision", "OpenCV", "Tesseract OCR"]
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
