export type Milestone = {
  id: number
  emoji: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  accent: string
  glow: string
  border: string
  isFuture?: boolean
  variant?: 'default' | 'gpa' | 'ai' | 'devops' | 'production'
  gpa?: number
}

export const MILESTONES: Milestone[] = [
  {
    id: 1,
    emoji: '🛰',
    title: 'Military Service',
    subtitle: 'Satellite Communications & Systems Specialist',
    description:
      'Built discipline, responsibility and problem-solving under pressure while operating advanced communication systems in the IDF.',
    highlights: ['High responsibility', 'Technical systems', 'Mission-critical environments', 'Teamwork'],
    accent: '#94a3b8',
    glow: 'rgba(148,163,184,0.08)',
    border: 'rgba(148,163,184,0.18)',
  },
  {
    id: 2,
    emoji: '🎓',
    title: 'Computer Science',
    subtitle: 'B.Sc. Computer Science — Ramat Gan Academic College',
    description: 'Deep foundations in computer science — theory and practice every semester.',
    highlights: [
      'Algorithms',
      'Data Structures',
      'Operating Systems',
      'Databases',
      'Networking',
      'Software Engineering',
    ],
    accent: '#3b82f6',
    glow: 'rgba(59,130,246,0.1)',
    border: 'rgba(59,130,246,0.22)',
    variant: 'gpa',
    gpa: 93,
  },
  {
    id: 3,
    emoji: '🚀',
    title: 'Co-Founder of Web4You',
    subtitle: 'Software Agency',
    description:
      'Started building real software for clients. Designed and delivered 20+ production websites and custom software solutions.',
    highlights: ['Client communication', 'Full Stack Development', 'Real deployments', 'Business experience'],
    accent: '#06b6d4',
    glow: 'rgba(6,182,212,0.1)',
    border: 'rgba(6,182,212,0.22)',
  },
  {
    id: 4,
    emoji: '🤖',
    title: 'AI Engineering',
    subtitle: 'LLM & RAG Systems',
    description: 'Started building AI-powered applications — production systems, not demos.',
    highlights: [
      'LLMs',
      'RAG Systems',
      'Vector Databases',
      'Prompt Engineering',
      'Ollama',
      'ChromaDB',
      'Flask',
      'MongoDB',
    ],
    accent: '#60a5fa',
    glow: 'rgba(96,165,250,0.1)',
    border: 'rgba(96,165,250,0.22)',
    variant: 'ai',
  },
  {
    id: 5,
    emoji: '⚙',
    title: 'DevOps Journey',
    subtitle: 'Cloud-Native Engineering',
    description: 'Expanded into cloud-native engineering — shipping reliably at scale.',
    highlights: ['Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Linux', 'Automation'],
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.1)',
    border: 'rgba(168,85,247,0.22)',
    variant: 'devops',
  },
  {
    id: 6,
    emoji: '💻',
    title: 'Building Production Software',
    subtitle: 'Idea to Deployment',
    description: 'Developing complete applications from idea to deployment.',
    highlights: ['AI SOC Analyst', 'AI Agent RAG PDF', 'MentConnect', 'Client Projects'],
    accent: '#06b6d4',
    glow: 'rgba(6,182,212,0.1)',
    border: 'rgba(6,182,212,0.22)',
    variant: 'production',
  },
  {
    id: 7,
    emoji: '🌍',
    title: "What's Next",
    subtitle: 'Software Engineer',
    description: 'Building products that make an impact.',
    highlights: ['AI Systems', 'Backend Development', 'Cloud Native Engineering'],
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.28)',
    isFuture: true,
  },
]

export const JOURNEY_STATS = [
  { emoji: '🎓', label: 'GPA', value: 93, suffix: '', accent: '#3b82f6' },
  { emoji: '🌐', label: 'Production Projects', value: 20, suffix: '+', accent: '#06b6d4' },
  { emoji: '🤖', label: 'AI Systems', value: 4, suffix: '+', accent: '#60a5fa' },
  { emoji: '☁️', label: 'DevOps & Cloud Projects', value: 10, suffix: '+', accent: '#a855f7' },
  { emoji: '💼', label: 'Years of Development', value: 3, suffix: '+', accent: '#f59e0b' },
]
