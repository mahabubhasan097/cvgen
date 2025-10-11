import { ResumeData } from "@/types/resume";

/**
 * Default Resume Data
 * Provides template data for IT professionals
 */
export const DEFAULT_RESUME: ResumeData = {
  contact: {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    portfolio: "johndoe.dev",
  },
  summary:
    "Results-driven Software Engineer with 5+ years of experience in full-stack development. Proficient in JavaScript, React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading cross-functional teams to achieve business objectives.",
  experience: [
    {
      id: "exp1",
      company: "Tech Corp",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      isCurrently: true,
      achievements: [
        "Led development of microservices architecture serving 2M+ users, reducing API response time by 40%",
        "Mentored team of 5 junior developers, improving code quality and reducing bugs by 30%",
        "Implemented CI/CD pipeline using GitHub Actions, reducing deployment time from 2 hours to 15 minutes",
        "Architected real-time notification system using WebSockets and Redis, handling 100K concurrent connections",
      ],
    },
    {
      id: "exp2",
      company: "StartUp Inc",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
      isCurrently: false,
      achievements: [
        "Developed and launched 3 customer-facing web applications using React, Node.js, and PostgreSQL",
        "Optimized database queries, reducing load times by 60% and improving user experience",
        "Integrated third-party APIs including Stripe, SendGrid, and AWS S3 for payment and file management",
        "Collaborated with design team to implement responsive UI/UX, increasing mobile engagement by 45%",
      ],
    },
    {
      id: "exp3",
      company: "Digital Agency",
      position: "Junior Developer",
      location: "New York, NY",
      startDate: "Aug 2019",
      endDate: "May 2020",
      isCurrently: false,
      achievements: [
        "Built responsive websites for 10+ clients using HTML, CSS, JavaScript, and WordPress",
        "Implemented SEO best practices, improving client search rankings by average of 25%",
        "Maintained and updated existing codebases, fixing critical bugs and adding new features",
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Berkeley, CA",
      graduationDate: "May 2019",
      gpa: "3.8/4.0",
    },
  ],
  skills: [
    {
      id: "skill1",
      category: "Languages",
      items: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "SQL",
        "HTML/CSS",
      ],
    },
    {
      id: "skill2",
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "Vue.js",
        "Redux",
        "Tailwind CSS",
        "Material-UI",
      ],
    },
    {
      id: "skill3",
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "Django",
        "RESTful APIs",
        "GraphQL",
        "Microservices",
      ],
    },
    {
      id: "skill4",
      category: "Database",
      items: [
        "PostgreSQL",
        "MongoDB",
        "MySQL",
        "Redis",
        "Firebase",
        "DynamoDB",
      ],
    },
    {
      id: "skill5",
      category: "DevOps & Tools",
      items: [
        "Git",
        "Docker",
        "AWS",
        "CI/CD",
        "Jenkins",
        "Kubernetes",
        "Linux",
      ],
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Mar 2023",
      credentialId: "AWS-12345",
    },
    {
      id: "cert2",
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "Sep 2022",
    },
  ],
};

