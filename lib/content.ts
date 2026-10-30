import type { StaticImageData } from "next/image";
import lmsImage from "../public/images/lms.webp";
import rideItImage from "../public/images/cab-booking.webp";
import ecommerceImage from "../public/images/e-commerce.webp";
import portraitImage from "../public/images/portrait.webp";
import type { TechIconKey } from "./tech-icons";

/* ================= PROFILE ================= */

export const profile = {
  name: "Shivam Singh",
  firstName: "Shivam",
  lastName: "Singh",
  role: "Full Stack Developer",
  email: "shivamsingh.s1991@gmail.com",
  phone: { display: "+91 96530 81173", href: "tel:+919653081173" },
  resume: "/docs/Shivam_Singh.pdf",
  portrait: portraitImage,
  current: { company: "Hubblehox", focus: "building an enterprise LMS" },
  intro:
    "I build production-ready web applications end to end — interfaces in React and Next.js, APIs in Node.js and NestJS, and data layers in MongoDB and MySQL.",
};

export type SocialKey = "github" | "linkedin" | "instagram";

export const socials: { key: SocialKey; label: string; handle: string; href: string }[] = [
  { key: "github", label: "GitHub", handle: "@shivam1991git", href: "https://github.com/shivam1991git" },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "in/shivam-singh-010a61250",
    href: "https://www.linkedin.com/in/shivam-singh-010a61250",
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "@onenonly_shiv",
    href: "https://www.instagram.com/onenonly_shiv?igsh=MXJpMmMwZm1vNGFpeQ%3D%3D&utm_source=qr",
  },
];

/* ================= NAVIGATION ================= */

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "learning", label: "Learning" },
  { id: "why", label: "Why Hire Me" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/* ================= ABOUT ================= */

export const about = {
  lead: "I turn complex requirements into software that is clean, fast and easy to maintain.",
  paragraphs: [
    "My journey into software development began with curiosity and grew into a passion for building things that make a difference. As an MCA graduate working professionally since 2024, I've grown from an eager learner into a confident full stack developer.",
    "Today I work on a comprehensive Learning Management System at Hubblehox, owning features across both the frontend and the backend — from reusable UI components to aggregation pipelines and bulk-data workflows.",
    "I believe in writing clean, maintainable code that delivers value to users and stakeholders alike.",
  ],
  facts: [
    { label: "Currently", value: "Full Stack Developer at Hubblehox" },
    { label: "Education", value: "MCA, Tezpur University" },
    { label: "Shipping since", value: "2024" },
    { label: "Core stack", value: "React · Next.js · NestJS · MongoDB" },
  ],
  focus: [
    { title: "Frontend", text: "Responsive interfaces with React, Next.js and TypeScript." },
    { title: "Backend", text: "Scalable APIs with Node.js, Express and NestJS." },
    { title: "Data", text: "Efficient schemas and queries in MongoDB and MySQL." },
    { title: "Delivery", text: "End-to-end ownership, from concept to deployment." },
  ],
};

/* ================= SKILLS ================= */

/** `note` replaces the "used in" hint for skills learned outside project work. */
export type Skill = { name: string; icon?: TechIconKey; note?: string };

export type SkillGroup = { title: string; blurb: string; items: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    blurb: "Component-driven interfaces that stay fast as they grow.",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "MUI", icon: "mui" },
      { name: "Redux", icon: "redux" },
    ],
  },
  {
    title: "Backend",
    blurb: "APIs and services designed for real production load.",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "NestJS", icon: "nestjs" },
      { name: "REST APIs" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    title: "Databases & Optimization",
    blurb: "Data models and queries tuned for large datasets.",
    items: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql", note: "completed self-study" },
      { name: "Indexing & Query Optimization" },
      { name: "Aggregation Pipelines" },
    ],
  },
  {
    title: "Languages",
    blurb: "Typed where it matters.",
    items: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Java", icon: "java" },
    ],
  },
  {
    title: "Auth & Security",
    blurb: "Access control built in, not bolted on.",
    items: [{ name: "JWT", icon: "jwt" }, { name: "Bcrypt" }, { name: "RBAC" }],
  },
  {
    title: "Cloud · AWS",
    blurb: "Self-taught, hands-on with the core building blocks.",
    items: [
      { name: "EC2", note: "self-taught · hands-on practice" },
      { name: "S3", note: "self-taught · hands-on practice" },
      { name: "IAM", note: "self-taught · hands-on practice" },
      { name: "Load Balancing", note: "self-taught · hands-on practice" },
      { name: "Auto Scaling", note: "self-taught · hands-on practice" },
    ],
  },
  {
    title: "AI-Assisted Development",
    blurb: "Modern AI tools as part of how I build.",
    items: [
      { name: "Claude Code", icon: "claudecode", note: "part of my development workflow" },
      { name: "Codex", note: "part of my development workflow" },
      { name: "ChatGPT", note: "part of my development workflow" },
    ],
  },
  {
    title: "Tools & Collaboration",
    blurb: "How I ship alongside product, QA and engineering teams.",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Bitbucket", icon: "bitbucket" },
      { name: "Postman", icon: "postman" },
      { name: "VS Code" },
      { name: "Jira", icon: "jira" },
      { name: "Agile / Scrum" },
      { name: "Excel / Word Integration" },
      { name: "JSON / CSV Parsing" },
    ],
  },
];

/* ================= PROJECTS ================= */

export type Project = {
  id: string;
  title: string;
  context: string;
  image: StaticImageData;
  imageAlt: string;
  frameLabel: string;
  description: string;
  features: string[];
  tech: string[];
  links: { github?: string; live?: string };
  note?: string;
};

export const projects: Project[] = [
  {
    id: "lms",
    title: "Learning Management System",
    context: "Flagship · Hubblehox",
    image: lmsImage,
    imageAlt: "Learning Management System dashboards, course catalog, quizzes and reports",
    frameLabel: "enterprise-lms · internal",
    description:
      "Enterprise LMS enabling course management, authentication, bulk uploads and analytics.",
    features: [
      "User authentication & authorization",
      "Learning Objective management",
      "Excel upload processing",
      "REST API integration",
      "Admin dashboard",
      "Real-time sync",
    ],
    tech: ["React", "Next.js", "Node.js", "NestJS", "MongoDB", "TypeScript"],
    links: {},
    note: "Company product — source code is private.",
  },
  {
    id: "ride-it",
    title: "Ride-It",
    context: "Cab booking & rental platform · MCA major project",
    image: rideItImage,
    imageAlt: "Ride-It cab booking platform landing page",
    frameLabel: "ride-it · live demo",
    description:
      "A MERN cab booking platform with secure authentication, ride booking workflows, driver management, administrative controls and customer feedback — built on a scalable client-server architecture with RESTful APIs.",
    features: [
      "Multi-role authentication (User, Driver, Admin)",
      "Cab booking and ride management",
      "Driver onboarding and management",
      "Admin control panel",
      "Customer profile management",
      "Booking history tracking",
      "Feedback & rating module",
    ],
    tech: ["React", "Redux", "Node.js", "Express.js", "MongoDB", "JWT", "Axios", "Bootstrap", "REST API", "Git"],
    links: {
      github: "https://github.com/shivam1991git/RIDE-IT",
      live: "https://ride-it-aed-git-main-thisisshivam1991-6980s-projects.vercel.app",
    },
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    context: "Full-stack storefront",
    image: ecommerceImage,
    imageAlt: "E-Commerce platform illustration",
    frameLabel: "e-commerce-website",
    description: "A full-featured e-commerce system with cart, payments and an admin panel.",
    features: ["Product catalog", "Cart & checkout", "Payment integration", "Admin dashboard"],
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    links: { github: "https://github.com/shivam1991git/e-commerce-website" },
  },
];

/* ================= EXPERIENCE ================= */

export type TimelineEntry = {
  title: string;
  org: string;
  location?: string;
  duration: string;
  current?: boolean;
  stack?: string[];
  badges?: string[];
  highlightsLabel: string;
  highlights: string[];
  detailsLabel: string;
  details: string[];
};

export const experience: TimelineEntry[] = [
  {
    title: "Full Stack Developer",
    org: "Hubblehox",
    location: "On-site",
    duration: "Jan 2025 — Present",
    current: true,
    stack: ["React", "Next.js", "TypeScript", "NestJS", "MongoDB"],
    highlightsLabel: "Key achievements",
    highlights: [
      "Delivered LMS features supporting large-scale content and user management workflows",
      "Built automated bulk-upload systems reducing manual data entry efforts significantly",
      "Improved API and database performance through query optimization, indexing, and aggregation strategies",
      "Developed reusable component architecture that accelerated feature development across modules",
      "Successfully integrated document processing workflows for Excel, DOCX, JSON, and ZIP-based content ingestion",
    ],
    detailsLabel: "Responsibilities",
    details: [
      "Developing and maintaining enterprise Learning Management System (LMS) using React, Next.js, TypeScript, NestJS, and MongoDB",
      "Building scalable RESTful APIs and optimized database queries",
      "Implementing bulk data upload workflows with Excel parsing, validation, transformation, and database integration",
      "Developing document-processing pipelines including DOCX reading, ZIP extraction and JSON parsing",
      "Creating reusable and modular UI components to improve maintainability and development speed",
      "Implementing pagination, filtering, sorting, and search functionalities for large datasets",
      "Designing MongoDB aggregation pipelines and optimizing queries for improved performance",
      "Collaborating with product, QA, and development teams to deliver new features and enhancements",
      "Debugging production issues, improving application reliability, and optimizing frontend and backend performance",
    ],
  },
  {
    title: "Associate Web Developer",
    org: "BVG India",
    location: "On-site",
    duration: "Sep 2024 — Jan 2025",
    stack: ["React"],
    highlightsLabel: "Key achievements",
    highlights: ["Delivered production-ready modules", "Improved website UX significantly"],
    detailsLabel: "Responsibilities",
    details: [
      "Developed responsive web applications",
      "Built reusable React components",
      "Integrated backend APIs",
      "Optimized performance",
    ],
  },
];

/* ================= EDUCATION ================= */

export const education: TimelineEntry[] = [
  {
    title: "Master of Computer Applications (MCA)",
    org: "Tezpur University, Assam",
    duration: "2022 — 2024",
    badges: ["CGPA 7.98 / 10", "Major Project: Ride-It (A+)", "Mini Project: Cataract Detection"],
    highlightsLabel: "Key achievements",
    highlights: [
      "A+ Grade in Major Project",
      "Strong academic performance in DBMS, Operating Systems, Algorithms, and Data Mining",
    ],
    detailsLabel: "Details",
    details: [
      "Specialized in Software Engineering, Data Structures, Algorithms, DBMS, Operating Systems, Data Mining, and Web Technologies",
      "Developed 'Ride-It' Cab Booking Platform as Major Project (A+ Grade)",
      "Built a Cataract Detection System as Mini Project using Machine Learning concepts",
      "Strengthened foundations in scalable software development, database design, and system architecture",
    ],
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    org: "Mahatma Gandhi Kashi Vidyapith, Varanasi",
    duration: "2019 — 2022",
    badges: ["First Division · 76.5%"],
    highlightsLabel: "Key achievements",
    highlights: ["First Division — Topper of the college", "Strong foundation in computer science fundamentals"],
    detailsLabel: "Details",
    details: [
      "Studied Programming, Data Structures, DBMS, Software Engineering, Computer Networks, Operating Systems, E-Commerce, and Web Development",
      "Developed multiple academic projects focused on software development and database applications",
      "Built strong programming foundations using C, C++, Java, and Database Systems",
    ],
  },
  {
    title: "Senior Secondary (XII)",
    org: "Varanasi Public School (CBSE)",
    duration: "2017 — 2019",
    badges: ["Science · Mathematics"],
    highlightsLabel: "Focus",
    highlights: ["Built analytical and problem-solving skills that led to pursuing Computer Applications"],
    detailsLabel: "Details",
    details: ["Studied Mathematics, Physics, Chemistry, and Physical Education"],
  },
    {
    title: "Higher Secondary (X)",
    org: "Varanasi Public School (CBSE)",
    duration: "2015 — 2017",
    badges: ["Computer Science · Mathematics"],
    highlightsLabel: "Focus",
    highlights: ["Built analytical and problem-solving skills that led to pursuing Computer Applications"],
    detailsLabel: "Details",
    details: ["Studied Mathematics, Physics, Chemistry, and Computer Fundamentals"],
  },
];

/* ================= LEARNING ================= */

export type LearningStatus = "In progress" | "Completed" | "Self-taught";

export type LearningItem = {
  title: string;
  status: LearningStatus;
  text: string;
  topics: string[];
};

export const learning: LearningItem[] = [
  {
    title: "System Design",
    status: "In progress",
    text: "Learning how to design scalable, reliable systems — the architecture decisions behind applications that keep working as traffic and data grow.",
    topics: ["Scalability", "Architecture", "Trade-offs"],
  },
  {
    title: "PostgreSQL",
    status: "Completed",
    text: "Completed learning PostgreSQL, adding a second relational database alongside the MySQL and MongoDB I use in production work.",
    topics: ["PostgreSQL", "SQL"],
  },
  {
    title: "AWS",
    status: "Self-taught",
    text: "Learned core AWS services on my own with hands-on practice — compute, storage, access control and keeping applications available under load.",
    topics: ["EC2", "S3", "IAM", "Load Balancing", "Auto Scaling"],
  },
  {
    title: "AI-Assisted Development",
    status: "Self-taught",
    text: "Comfortable working with AI coding assistants such as Claude Code, Codex and ChatGPT as part of my development workflow.",
    topics: ["Claude Code", "Codex", "ChatGPT"],
  },
];

/* ================= WHY HIRE ME ================= */

export const principles = [
  {
    title: "Problem Solver",
    text: "I enjoy solving real-world challenges by analyzing requirements, identifying root causes, and building practical, scalable solutions.",
  },
  {
    title: "Quality-Focused Development",
    text: "I write clean, maintainable, and reusable code while following industry best practices, ensuring long-term scalability and reliability.",
  },
  {
    title: "Continuous Learner",
    text: "I actively explore new technologies and quickly adapt to modern tools, frameworks, and development practices to stay current.",
  },
  {
    title: "Ownership & Accountability",
    text: "From planning and development to deployment and maintenance, I take responsibility for delivering reliable and production-ready solutions.",
  },
  {
    title: "Collaborative Team Player",
    text: "I work effectively with developers, QA engineers, designers, and stakeholders to deliver high-quality products and meet business goals.",
  },
  {
    title: "Business-Oriented Mindset",
    text: "I focus on building solutions that improve user experience, optimize workflows, and create measurable business value.",
  },
];

/* ================= DERIVED ================= */

const normalize = (name: string) => name.toLowerCase().replace(/\.js$/, "").replace(/[^a-z0-9]/g, "");

/** Where a technology was actually used — derived from the projects and roles above. */
export function usedIn(skill: string): string[] {
  const key = normalize(skill);
  const places = [
    ...projects.filter((p) => p.tech.some((t) => normalize(t) === key)).map((p) => p.title),
    ...experience.filter((e) => e.stack?.some((t) => normalize(t) === key)).map((e) => e.org),
  ];
  return [...new Set(places)];
}
