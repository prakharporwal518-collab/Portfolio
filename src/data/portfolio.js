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

// TODO: replace with your real projects
export const projects = [
  {
    title: "3D Developer Portfolio",
    text: "This site — React Three Fiber scenes, GSAP scroll effects, live coding stats via a Netlify function.",
    tags: ["React", "Three.js", "GSAP", "Netlify"],
    github: "https://github.com/prakharporwal518-collab/Portfolio",
    live: "",
  },
  {
    title: "DSA Visualizer",
    text: "Step-by-step animations of sorting, graph and tree algorithms to make DSA concepts click.",
    tags: ["JavaScript", "Canvas", "DSA"],
    github: "",
    live: "",
  },
  {
    title: "Task Manager API",
    text: "REST API with authentication, CRUD and MongoDB — built to learn backend and system design basics.",
    tags: ["Node.js", "Express", "MongoDB"],
    github: "",
    live: "",
  },
  {
    title: "ML Movie Recommender",
    text: "Content-based recommendation system using cosine similarity, with a small web UI.",
    tags: ["Python", "scikit-learn", "ML"],
    github: "",
    live: "",
  },
];

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
