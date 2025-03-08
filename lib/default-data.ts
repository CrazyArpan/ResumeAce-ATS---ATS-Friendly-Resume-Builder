import type { ResumeData } from "./types"

export const defaultResumeData: ResumeData = {
  personal: {
    name: "John Doe",
    title: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    website: "johndoe.com",
    portfolio: "portfolio.johndoe.com",
    github: "github.com/johndoe",
    linkedin: "linkedin.com/in/johndoe",
    profileImage: "",
    summary:
      "Experienced software engineer with over 8 years of experience in developing scalable web applications. Proficient in JavaScript, TypeScript, React, and Node.js. Passionate about creating efficient, maintainable code and mentoring junior developers.",
  },
  experience: [
    {
      id: "exp1",
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      current: true,
      description:
        "• Led a team of 5 developers to deliver a new product feature that increased user engagement by 25%\n• Implemented CI/CD pipeline that reduced deployment time by 40%\n• Refactored legacy codebase, improving application performance by 30%\n• Mentored junior developers and conducted code reviews",
    },
    {
      id: "exp2",
      title: "Software Engineer",
      company: "Web Innovators LLC",
      location: "Austin, TX",
      startDate: "Mar 2017",
      endDate: "Dec 2019",
      current: false,
      description:
        "• Developed responsive web applications using React and Node.js\n• Collaborated with UX designers to implement user-friendly interfaces\n• Optimized database queries, reducing load times by 50%\n• Participated in agile development processes",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Berkeley, CA",
      startDate: "Aug 2013",
      endDate: "May 2017",
      current: false,
      description:
        "• GPA: 3.8/4.0\n• Relevant coursework: Data Structures, Algorithms, Database Systems\n• Senior thesis: Machine Learning Applications in Web Development",
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "E-commerce Platform",
      description:
        "Developed a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented features like user authentication, product search, shopping cart, and payment processing.",
      githubLink: "github.com/johndoe/ecommerce",
      liveLink: "ecommerce-demo.johndoe.com",
      technologies: "React, Node.js, Express, MongoDB, Stripe API",
      startDate: "Jun 2021",
      endDate: "Dec 2021",
    },
    {
      id: "proj2",
      name: "Task Management App",
      description:
        "Created a task management application with drag-and-drop functionality, user authentication, and real-time updates using Socket.io.",
      githubLink: "github.com/johndoe/taskmanager",
      liveLink: "taskmanager.johndoe.com",
      technologies: "React, TypeScript, Firebase, Socket.io",
      startDate: "Jan 2021",
      endDate: "Apr 2021",
    },
  ],
  skills: [
    { id: "skill1", name: "JavaScript" },
    { id: "skill2", name: "TypeScript" },
    { id: "skill3", name: "React" },
    { id: "skill4", name: "Node.js" },
    { id: "skill5", name: "Express" },
    { id: "skill6", name: "MongoDB" },
    { id: "skill7", name: "SQL" },
    { id: "skill8", name: "Git" },
    { id: "skill9", name: "AWS" },
  ],
  additionalSections: [
    {
      id: "additional1",
      title: "Certifications",
      content:
        "• AWS Certified Solutions Architect\n• MongoDB Certified Developer\n• Google Cloud Professional Developer",
    },
  ],
}

