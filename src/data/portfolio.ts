const getTotalExperience = () => {
  const startDate = new Date("2022-04-22");
  const now = new Date();
  const diffInYears =
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const roundedYears = Math.floor(diffInYears);
  return `${roundedYears || 3}+`;
};

export const portfolioData = {
  personal: {
    name: "Veer Prakash",
    title: [
      "Software Engineer",
      "Graphic Designer",
      "Mobile App Developer",
      "AI Enthusiast",
    ],
    tagline: "Crafting slick UIs & solid backends that blend design and tech.",
    image: "/images/Veer-Headshot.png",
    email: "veer.prakashwork@gmail.com",
    location: "Bangalore, India",
  },
  about: {
    totalExperience: getTotalExperience(),
    description:
      "Passionate software engineer and graphic designer with 3+ years of experience creating innovative digital solutions, building scalable web applications and mobile apps, crafting beautiful user interfaces, and contributing to impactful projects, new technologies, and open-source.",
    highlights: [
      `${getTotalExperience()} years in software development`,
      "Skilled in modern web and mobile app development technologies",
      "Currently learning advanced AI and Angular development",
      "UI/UX design enthusiast",
    ],
  },
  experience: [
    {
      id: 1,
      title: "Software Engineer",
      company: "Shipthis Inc.",
      period: "Sept 2024 - Present",
      location: "Newark, Delaware",
      description:
        "Developing scalable frontend/backend systems with Angular and Python. Building cross-platform mobile apps using Ionic. Working on AI integrations, CI/CD pipelines, and GCP cloud infrastructure.",
      achievements: [
        "Delivered Sales CRM module for freight forwarding",
        "Published mobile apps on App Store and Play Store",
        "Implemented and managed CI/CD pipelines",
      ],
    },
    {
      id: 2,
      title: "SDE - Frontend Developer",
      company: "Fracto (Ruptok Fintech)",
      period: "Jun 2023 - Sept 2024",
      location: "Delhi, India",
      description:
        "Led frontend development of fintech apps including invoicing and OCR tools using React, TypeScript, and Tailwind. Focused on reusable components, responsiveness, and code quality with unit tests.",
      achievements: [
        "Launched Fracto OCR and invoicing systems",
        "Increased app responsiveness by 85% with reusable components",
        "Ensured 90% code quality via code reviews and unit testing",
      ],
    },
    {
      id: 3,
      title: "Technical Trainee - SDE",
      company: "Gemini Solutions Pvt Ltd",
      period: "Apr 2022 - Apr 2023",
      location: "Gurugram, Haryana, India",
      description:
        "Full Stack Developer focusing on backend APIs with Node.js and MongoDB. Created reusable React components and optimized job scheduling using AWS SQS and agenda.",
      achievements: [
        "Improved API reliability by 30%",
        "Cut frontend dev time by 40% with reusable components",
        "Enhanced job processing efficiency with AWS SQS and agenda",
      ],
    },
  ],
  projects: [
    {
      id: 1,
      title: "TalkGPT - GPT Audio Web App",
      description:
        "Full-featured TalkGPT app using Google Gemini API with chat and real-time audio response functionality..",
      image: "/images/talkgpt.png",
      technologies: ["Javascript", "Node.js", "Gemini API"],
      liveUrl: "https://veerprakash28.github.io/talk-gpt/",
      githubUrl: "https://github.com/veerprakash28/talk-gpt",
    },
    {
      id: 2,
      title: "FitBit - Fitness Trainer Appointment Scheduling App",
      description:
        "A web app that helps fitness trainers efficiently manage client appointments with features like a calendar view.",
      image: "/images/fitbit.png",
      technologies: ["React", "Tailwind CSS", "Material UI"],
      liveUrl: "https://react-fitbit.netlify.app/",
      githubUrl: "https://github.com/veerprakash28/fitbit-app",
    },
    {
      id: 3,
      title: "Chat App",
      description:
        "A real-time chat app with React.js, Node.js, and Socket.io, allowing users to join rooms via links or codes, see active participants, and chat instantly.",
      image: "/images/chatapp.png",
      technologies: ["Node.js", "React.js", "Socket.io", "Javascript"],
      liveUrl: "https://learning-js-chat-app.netlify.app/",
      githubUrl:
        "https://github.com/veerprakash28/Learning-JS/tree/master/chat-app",
    },
  ],
  techStack: {
    frontend: [
      "JavaScript",
      "TypeScript",
      "React",
      "Angular",
      "HTML5",
      "CSS3",
      "TailwindCSS",
      "Bootstrap",
      "Material UI",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "Python",
      "Java",
      "FastAPI",
      "gRPC",
      "REST APIs",
    ],
    mobile: ["Ionic", "React Native"],
    database: ["MongoDB", "MySQL", "Redis", "SQLite", "Firebase"],
    cloud: ["AWS", "GCP", "Heroku", "Docker", "Jenkins"],
    tools: [
      "Git",
      "GitHub",
      "Postman",
      "Figma",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Canva",
      "Jest",
      "Vitest",
    ],
    aiml: [
      "OpenAI",
      "Gemini",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "Seaborn",
    ],
  },
  social: {
    github: "https://github.com/veerprakash28",
    linkedin: "https://linkedin.com/in/veerprakash28",
    youtube: "https://www.youtube.com/@dev-projects-lab",
    instagram: "https://www.instagram.com/art.gallery28",
  },
};
