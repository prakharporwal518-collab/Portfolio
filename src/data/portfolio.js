// ─────────────────────────────────────────────────────────────
//  Edit this one file to update everything on the site.
//  Items marked TODO are placeholders — replace them with your own.
//  Usernames, LinkedIn/X links, email and resume can ALSO be set without
//  code from the admin panel on the live site: open  /#admin
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: "Prakhar",
  lastName: "Porwal",
  roles: ["BTech CSE Student", "Developer", "Problem Solver"],
  tagline:
    "I build modern web applications and explore innovative technologies to create meaningful solutions.",
  location: "Bhopal, India",
  email: "prakharporwal518@gmail.com",
  education: "BTech CSE (2nd Year)",
  status: "Open to Internship",
  quote: "Building things that make an impact.",
  socials: {
    linkedin: "https://www.linkedin.com/", // TODO
    github: "https://github.com/prakharporwal518-collab",
    email: "mailto:prakharporwal518@gmail.com",
    x: "https://x.com/", // TODO
  },
};

export const features = [
  { icon: "code", title: "Web Development", text: "Building responsive and user-friendly web applications using modern technologies." },
  { icon: "brain", title: "Problem Solving", text: "Love solving complex problems with DSA in C++ and turning ideas into real solutions." },
  { icon: "stack", title: "Continuous Learning", text: "Always exploring new tools — system design, AI and machine learning." },
  { icon: "rocket", title: "Future Goals", text: "To become a skilled software engineer and contribute to useful open-source projects." },
];

// color = brand color used for the 3D tech-ball badges
export const skills = [
  { name: "C++", short: "C++", color: "#3b82f6" },
  { name: "C", short: "C", color: "#5c6bc0" },
  { name: "JavaScript", short: "JS", color: "#facc15" },
  { name: "TypeScript", short: "TS", color: "#3178c6" },
  { name: "React", short: "React", color: "#61dafb" },
  { name: "Node.js", short: "Node", color: "#22c55e" },
  { name: "Express", short: "Ex", color: "#e5e7eb" },
  { name: "HTML", short: "HTML", color: "#f97316" },
  { name: "CSS", short: "CSS", color: "#38bdf8" },
  { name: "Tailwind", short: "TW", color: "#06b6d4" },
  { name: "Python", short: "Py", color: "#fbbf24" },
  { name: "MySQL", short: "SQL", color: "#0ea5e9" },
  { name: "MongoDB", short: "Mongo", color: "#4ade80" },
  { name: "Git", short: "Git", color: "#f05032" },
  { name: "GitHub", short: "GH", color: "#c4b5fd" },
  { name: "VS Code", short: "VS", color: "#007acc" },
  { name: "Figma", short: "Fig", color: "#a259ff" },
  { name: "DSA", short: "DSA", color: "#f472b6" },
  { name: "Three.js", short: "3D", color: "#a78bfa" },
  { name: "Machine Learning", short: "ML", color: "#fb7185" },
];

export const techStack = ["C++", "React", "JavaScript", "MySQL", "Node.js", "Git", "VS Code", "Figma"];

// Your projects. The site also loads your public GitHub repos live, so:
//  • a repo listed here uses this title/text/tags (live demo link is filled from
//    the repo's "Website" field on GitHub if you leave `live` empty)
//  • a new repo you push to GitHub appears automatically after these.
// `repo` must match the GitHub repo name. Add a repo name to `hiddenRepos` to hide it.
export const projects = [
  {
    repo: "Medreach", title: "Medreach",
    text: "AI emergency-response platform for public healthcare: citizens report emergencies, hospitals coordinate beds and ambulances, plus a 108 control-room simulator. Built for the MPOnline Idea & Innovation Hackathon 2026.",
    tags: ["JavaScript", "Node.js", "AI", "Healthcare"], live: "https://medreach-2.onrender.com",
  },
  {
    repo: "Doctrace--AI", title: "DocTrace AI",
    text: "Reads invoices, contracts and purchase orders and extracts deadlines, obligations and anomalies — every output traced back to the exact page and line. Zero Origin Hackathon 2026.",
    tags: ["React", "TypeScript", "Supabase", "Gemini"], live: "https://doctrace-ai.netlify.app",
  },
  {
    repo: "Bolo-Yojana-", title: "Bolo Yojana",
    text: "Voice-first, multilingual (Hindi/Hinglish) AI assistant that helps rural citizens understand government schemes, check eligibility and know which documents to carry.",
    tags: ["React", "Python", "RAG", "Voice AI"], live: "",
  },
  {
    repo: "Adaptive-Context-Aware-Code-API-Guardrails", title: "GuardX — Code & API Guardrails",
    text: "AI-assisted security layer that scores risky code and API actions from their context (who, device, time, auth freshness) instead of a fixed rule table.",
    tags: ["JavaScript", "Security", "AI"], live: "https://prakharporwal518-collab.github.io/Adaptive-Context-Aware-Code-API-Guardrails/",
  },
  {
    repo: "Multi-Camera-3D-Scene-Understanding", title: "Multi-Camera 3D Scene Understanding",
    text: "Calibrates 2–8 cameras into one world frame, estimates depth, fuses a 3D point cloud, tracks objects and builds a scene graph — with a web workspace for every stage.",
    tags: ["Python", "Computer Vision", "TypeScript", "3D"], live: "",
  },
  {
    repo: "HR-RAG-PROJECT-", title: "HR Assist — HR Policy RAG Chatbot",
    text: "Employees ask HR questions in plain English and get answers only from the policy PDFs they're allowed to see, with page citations. Hybrid BM25 + ChromaDB retrieval.",
    tags: ["Python", "RAG", "ChromaDB", "LLM"], live: "",
  },
  {
    repo: "Expense-tracking-system", title: "FinTrack — Expense Tracker",
    text: "Full-stack expense tracker that forecasts next month, finds forgotten subscriptions, flags unusual spending and settles group debts in the fewest transfers.",
    tags: ["Node.js", "Express", "SQLite", "JavaScript"], live: "",
  },
  {
    repo: "Movie-recommendation-system", title: "CineMatch — Movie Recommender",
    text: "Content-based movie recommender using TF-IDF and cosine similarity over plot, genre, cast and keywords, with a scroll-animated 3D web UI.",
    tags: ["Python", "scikit-learn", "ML"], live: "",
  },
  {
    repo: "Attendance-Tracking-system", title: "Attendance Tracking System",
    text: "Web app for colleges: teachers mark a class in one pass, students see their attendance percentage, admins manage people, courses and rosters.",
    tags: ["JavaScript", "Node.js", "SQL"], live: "",
  },
].map((p) => ({ ...p, github: `https://github.com/prakharporwal518-collab/${p.repo}` }));

export const hiddenRepos = ["Portfolio"];

// ── Coding platforms ─────────────────────────────────────────
// username: leave "" to skip live fetching for that platform.
// static:   numbers shown if the live fetch fails (or no username). TODO: set yours.
// solved:   counts toward "Total Problems Solved".
export const platforms = {
  leetcode: {
    name: "LeetCode", color: "#ffa116", username: "", // TODO
    url: (u) => `https://leetcode.com/u/${u}/`,
    static: { solved: 0, easy: 0, medium: 0, hard: 0, rating: 0 },
  },
  gfg: {
    name: "GeeksforGeeks", color: "#2f8d46", username: "", // TODO
    url: (u) => `https://www.geeksforgeeks.org/user/${u}/`,
    static: { solved: 0, score: 0 },
  },
  codechef: {
    name: "CodeChef", color: "#b0845a", username: "", // TODO
    url: (u) => `https://www.codechef.com/users/${u}`,
    static: { solved: 0, stars: 0, rating: 0, highest: 0 },
  },
  codeforces: {
    name: "Codeforces", color: "#3b82f6", username: "", // TODO
    url: (u) => `https://codeforces.com/profile/${u}`,
    static: { solved: 0, rating: 0, rank: "unrated" },
  },
  hackerrank: {
    name: "HackerRank", color: "#00ea64", username: "", // TODO
    url: (u) => `https://www.hackerrank.com/profile/${u}`,
    static: { badges: 0, stars: 0 },
  },
  github: {
    name: "GitHub", color: "#e5e7eb", username: "prakharporwal518-collab",
    url: (u) => `https://github.com/${u}`,
    static: { repos: 0, contributions: 0 },
  },
};

// TODO: replace with your certificates
export const certifications = [
  { name: "Data Structures & Algorithms in C++", issuer: "Coursera", date: "2026", url: "" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "2025", url: "" },
  { name: "JavaScript (Basic)", issuer: "HackerRank", date: "2025", url: "" },
  { name: "Introduction to Machine Learning", issuer: "NPTEL", date: "2026", url: "" },
];

// TODO: replace with your achievements
export const achievements = [
  { date: "2026", title: "Solved 300+ DSA problems", text: "Consistent daily practice across LeetCode and GeeksforGeeks." },
  { date: "2026", title: "Hackathon participant", text: "Built a working prototype with my team in 24 hours." },
  { date: "2025", title: "First open-source contribution", text: "Merged a pull request into a public GitHub project." },
  { date: "2025", title: "Started BTech CSE", text: "Began my journey into computer science and software engineering." },
];
