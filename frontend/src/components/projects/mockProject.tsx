export const  mockProjects = [
  {
    id: 1,
    title: "AI Ethics in Healthcare Systems",
    type: "thesis",
    lastWorked: "2 hours ago",
    stats: {
      sources: 47,
      wordCount: 12400,
      chapters: { completed: 3, total: 6 }
    },
    nextStep: "Continue with Chapter 4 draft",
    recentActivity: "Added 3 citations on algorithmic bias"
  },
  {
    id: 2,
    title: "Sustainable Urban Planning Models",
    type: "capstone",
    lastWorked: "1 day ago",
    stats: {
      sources: 23,
      wordCount: 8200,
      chapters: { completed: 2, total: 5 }
    },
    nextStep: "Review methodology section",
    recentActivity: "Completed literature review outline"
  },
  {
    id: 3,
    title: "Consumer Behavior in Digital Markets",
    type: "market-research",
    lastWorked: "3 days ago",
    stats: {
      sources: 31,
      wordCount: 6800,
      chapters: { completed: 1, total: 4 }
    },
    nextStep: "Start data analysis chapter",
    recentActivity: "Gathered 12 industry reports"
  }
];

export const projectTypes = [
  {
    id: "1",
    name: "Thesis",
    description: "70+ page research project with literature review"
  },
  {
    id: "2", 
    name: "Capstone",
    description: "Final project demonstrating skills and knowledge"
  },
  {
    id: "3",
    name: "Essay", 
    description: "Short-form academic writing with citations"
  },
  {
    id: "4",
    name: "Market Research",
    description: "Business/industry analysis and insights"
  },
  {
    id: "5",
    name: "Self Research", 
    description: "Personal learning and exploration project"
  },
  {
    id: "6",
    name: "Other",
    description: "Custom research project type"
  }
]; 

export const challenges = [
  {
    id: "1",
    name: "Just getting started",
    description: "Need to define my topic and research direction"
  },
  {
    id: "2",
    name: "Have a topic, need sources", 
    description: "Know what I'm researching but need to find materials"
  },
  {
    id: "3",
    name: "Have sources, need to organize",
    description: "Collected materials but need to analyze and synthesize"
  },
  {
    id: "4",
    name: "Ready to write",
    description: "Need structure, citations, and writing assistance"
  }
];