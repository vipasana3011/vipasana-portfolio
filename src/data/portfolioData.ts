import { Project, Experience, Education, Certification, SkillCategory } from '@/types';

export const personalInfo = {
  name: 'Vipasana',
  roleBadge: 'Digital Media Specialist ✨',
  roles: [
    'Digital Media Specialist',
    'Social Media Manager',
    'Web Developer',
    'Creative Designer',
  ],
  heroDescription:
    'I have worked on projects ranging from building functional web applications to managing social media growth and engagement. I believe in continuous learning and enjoy taking on challenges that help me grow both technically and creatively.',
  about: {
    heading: 'The story behind the work',
    paragraphs: [
      'A passionate Digital Media Specialist who loves blending creativity with technology. I enjoy working on projects that involve media, design, and development to create meaningful digital experiences.',
      'I am a versatile and motivated individual with skills in social media management, web development, and digital media. Through hands-on experiences and internship projects, I have built a solid foundation in both creative and technical areas. Always eager to learn, I aim to contribute to impactful projects and grow as a well-rounded digital professional.',
    ],
    pillars: [
      {
        icon: '🎨',
        title: 'Creativity',
        description: 'Crafting visual stories that resonate.',
      },
      {
        icon: '💻',
        title: 'Web Development',
        description: 'Modern, responsive, performant builds.',
      },
      {
        icon: '📱',
        title: 'Social Media',
        description: 'Growth, engagement, content strategy.',
      },
    ],
  },
  contact: {
    email: 'vipasana3011@gmail.com',
    phone: '+91 8239017449',
    location: 'India · Open to remote work',
    github: 'https://github.com/vipasana3011',
    linkedin: 'https://www.linkedin.com/in/vipasana/',
    whatsapp: 'https://wa.me/918239017449',
    resumeUrl: '/images/VIPA_RESUME.pdf',
    portrait: '/images/vipaabout.jpg',
  },
  stats: [
    { label: 'Internships Completed', value: '3+' },
    { label: 'Projects Delivered', value: '10+' },
    { label: 'Curiosity & Drive', value: '100%' },
  ],
};

export const educationList: Education[] = [
  {
    id: 'bca',
    degree: 'Bachelor of Computer Applications',
    institution: 'University of Rajasthan',
    period: '2023 – 2026',
    badge: '🎓 Graduate',
    description:
      'Completed a strong foundation in computer science, programming, web development and digital technologies.',
  },
  {
    id: 'rbse',
    degree: 'Higher Secondary Education',
    institution: 'Rajasthan Board of Secondary Education',
    period: 'Completed in 2023',
    badge: '📚 RBSE Board',
    description:
      'Completed Commerce stream with Computer Science as a core subject while building interest in technology.',
  },
];

export const experienceList: Experience[] = [
  {
    id: 'xsoln',
    role: 'Social Media Manager',
    company: 'Xsoln Technologies',
    period: 'Aug 2025 – Oct 2025',
    indexNum: '01',
    tag: 'SOCIAL MEDIA & CONTENT STRATEGY',
    gradient: 'from-[#1f0a0c] via-[#121212] to-[#0a0a0a]',
    highlights: [
      "Created and curated content for the company's social media platforms.",
      'Planned content calendars and scheduled posts to maintain a consistent social media presence.',
      'Managed day-to-day social media activities, including content planning, publishing and audience engagement.',
    ],
  },
  {
    id: 'infotact',
    role: 'Web Development Intern',
    company: 'Infotact Solutions',
    period: 'Jun 2025 – Aug 2025',
    indexNum: '02',
    tag: 'FRONTEND ENGINEERING & E-COMMERCE',
    gradient: 'from-[#1a0809] via-[#111111] to-[#090909]',
    highlights: [
      'Built responsive interfaces using HTML, CSS and JavaScript.',
      'Contributed to a niche e-commerce front-end as part of the team.',
      'Gained practical experience with version control and modern web development practices.',
    ],
  },
  {
    id: 'wilfred',
    role: 'Social Media Manager',
    company: "St. Wilfred's TPO",
    period: 'May 2024 – May 2025',
    indexNum: '03',
    tag: 'BRAND AWARENESS & DIGITAL CAMPAIGNS',
    gradient: 'from-[#220a0d] via-[#131313] to-[#0a0a0a]',
    highlights: [
      'Planned, created and scheduled content across Instagram, LinkedIn and Facebook.',
      'Managed social media activities including reels, stories and regular content publishing.',
      'Coordinated with design and event teams to plan and publish social media content.',
    ],
  },
  {
    id: 'dbrand',
    role: 'Digital Marketing Intern',
    company: 'DBrand Camp',
    period: 'Apr 2023 – Jul 2023',
    indexNum: '04',
    tag: 'SEO OPTIMIZATION & GROWTH HACKING',
    gradient: 'from-[#1d090b] via-[#101010] to-[#080808]',
    highlights: [
      'Worked on Off-Page SEO and effective backlink building.',
      'Handled Local SEO and Google Business Profile optimization.',
      'Researched keywords, competitors and local business listings.',
    ],
  },
];

export const projectsList: Project[] = [
  // Web Development Projects
  {
    id: 'nivala',
    title: 'Nivala — 3D Food Ordering & Delivery',
    category: 'web',
    tag: 'Full-Stack Web App',
    description:
      'A full-stack food ordering/delivery website built with Next.js, TypeScript, Tailwind CSS, and Supabase — featuring dynamic menu listings, cart functionality, and user authentication.',
    image: '/images/nivala.png',
    link: 'https://nivala-food.vercel.app/',
    featured: true,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    indexNum: '#01',
    match: '99%',
  },
  {
    id: 'viilora',
    title: 'Viilora — Luxury Skincare FullStack',
    category: 'web',
    tag: 'FullStack E-Commerce',
    description:
      'A luxury skincare e-commerce web platform featuring elegant aesthetics, rich catalog presentation, and modern responsive UI.',
    image: '/images/viilora.png',
    link: 'https://viilora-skincare.vercel.app/',
    featured: true,
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    indexNum: '#02',
    match: '98%',
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    category: 'web',
    tag: 'Web Utility Tool',
    description:
      'A fast, interactive, and user-friendly web calculator built for instantaneous multi-case percentage computations.',
    image: '/images/calweb.png',
    link: 'https://vipasana3011.github.io/Percentage-Calculator/',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    indexNum: '#03',
    match: '97%',
  },
  {
    id: 'srili',
    title: 'Srili E-Commerce Project',
    category: 'web',
    tag: 'E-Commerce Storefront',
    description:
      'A boutique e-commerce web store designed with seamless navigation, refined product cards, and smooth checkout flow.',
    image: '/images/srili.png',
    link: 'https://srili-ecommerce.vercel.app/',
    technologies: ['React', 'CSS Modules', 'Vercel'],
    indexNum: '#04',
    match: '98%',
  },
  {
    id: 'birthday',
    title: 'Happy Birthday Bhavya',
    category: 'web',
    tag: 'Interactive Web Experience',
    description:
      'A bespoke celebratory interactive web experience with animated greetings, memory galleries, and delightful micro-interactions.',
    image: '/images/birthday.png',
    link: 'https://happy-birthday-bhavya.vercel.app/',
    technologies: ['HTML5', 'CSS Animations', 'JavaScript'],
    indexNum: '#05',
    match: '99%',
  },
  {
    id: 'jaipur',
    title: 'JaipurDotCom Project',
    category: 'web',
    tag: 'City Guide & Heritage Portal',
    description:
      'A vibrant digital travel and cultural guide celebrating the royal heritage, crafts, and landmarks of the Pink City.',
    image: '/images/jaipur.png',
    link: 'https://jaipurdotcom.vercel.app/',
    technologies: ['JavaScript', 'Tailwind CSS', 'Web Design'],
    indexNum: '#06',
    match: '96%',
  },
  {
    id: 'kashuti-boutique',
    title: 'Kashuti Boutique Project',
    category: 'web',
    tag: 'Fashion & Handloom Showcase',
    description:
      'A showcase platform for handcrafted apparel and traditional Indian ethnic boutique fashion.',
    image: '/images/kashuti.png',
    link: 'https://kashuti-boutique.vercel.app/',
    technologies: ['React', 'Responsive UI', 'Modern CSS'],
    indexNum: '#07',
    match: '97%',
  },
  {
    id: 'priyanka-properties',
    title: 'Priyanka Properties',
    category: 'web',
    tag: 'Real Estate Platform',
    description:
      'A modern real estate portal showcasing premium residential listings, land parcels, and client advisory services.',
    image: '/images/priyanka-properties.png',
    link: 'https://priyankaproperties.vercel.app/',
    technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
    indexNum: '#08',
    match: '98%',
  },

  // Social Media Management Projects
  {
    id: 'smm-content',
    title: 'Content Management Portfolio',
    category: 'smm',
    tag: 'Social Media & Branding',
    description:
      'Comprehensive content design, reel production, carousel storytelling, and aesthetic feed curation strategies.',
    image: '/images/content.png',
    link: 'https://my-smm-portfolio.netlify.app',
    technologies: ['Canva', 'Meta Suite', 'Content Strategy', 'Copywriting'],
    indexNum: '#09',
    match: '100%',
  },
  {
    id: 'smm-performance',
    title: 'Social Media Performance & Growth',
    category: 'smm',
    tag: 'Analytics & Campaign Scaling',
    description:
      'Data-driven social growth strategies, conversion optimization, audience engagement metrics, and campaign execution.',
    image: '/images/engagement.png',
    link: 'https://my-smm-portfolio.netlify.app',
    technologies: ['Analytics', 'Ad Campaigning', 'Growth Hacking', 'Community'],
    indexNum: '#10',
    match: '99%',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    desc: 'Crafting responsive, high-performance web applications and interactive user interfaces using modern web standards.',
    tag: 'UI & INTERACTION',
    icon: '💻',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Full-Stack & Cloud APIs',
    desc: 'Building modern web solutions, handling cloud database integrations with Supabase, and consuming REST APIs.',
    tag: 'ARCHITECTURE',
    icon: '⚡',
    skills: ['TypeScript', 'Supabase', 'REST APIs', 'Git & GitHub', 'Vercel', 'Netlify'],
  },
  {
    id: 'smm',
    title: 'Social Media Management',
    desc: 'Planning content calendars, orchestrating viral reels, managing community engagement, and driving digital reach.',
    tag: 'ENGAGEMENT',
    icon: '📱',
    skills: ['Social Media Management', 'Content Strategy', 'Reels & Stories', 'Audience Growth', 'Community Engagement'],
  },
  {
    id: 'marketing',
    title: 'Marketing & SEO Strategy',
    desc: 'Data-backed search engine optimization, local discovery on Google, and performance campaign scaling.',
    tag: 'GROWTH',
    icon: '📈',
    skills: ['Off-Page SEO', 'Local SEO', 'Audience Analytics', 'Campaign Planning', 'Google Business Profile'],
  },
  {
    id: 'creative',
    title: 'Creative Design & Branding',
    desc: 'Visual storytelling, brand identity creation, marketing collateral, and captivating social media creatives.',
    tag: 'CREATIVE',
    icon: '🎨',
    skills: ['Canva Pro', 'Brand Identity', 'Meta Business Suite', 'Visual Storytelling', 'Copywriting'],
  },
  {
    id: 'tools',
    title: 'Tools & Modern Workflow',
    desc: 'Harnessing modern developer productivity software, e-commerce storefronts, and cutting-edge AI utilities.',
    tag: 'PRODUCTIVITY',
    icon: '✨',
    skills: ['VS Code', 'GitHub', 'Shopify', 'ChatGPT / AI Tools', 'Postman', 'Figma Basics'],
  },
];

export const certificationsList: Certification[] = [
  {
    id: 'becil',
    title: 'Cyber Security & Ethical Hacking',
    issuer: 'BECIL',
    year: '2024',
    badge: 'SECURITY CREDENTIAL',
    description:
      'Learned cybersecurity fundamentals, ethical hacking concepts and online safety practices.',
    image: '/images/cyber-security.jpg',
  },
  {
    id: 'infotact-cert',
    title: 'Web Development Training',
    issuer: 'Infotact Solutions',
    year: '2025',
    badge: 'TECHNICAL TRAINING',
    description:
      'Completed practical training focused on modern front-end development and responsive websites.',
    image: '/images/infotact-training.jpg',
  },
  {
    id: 'kashuti-cert',
    title: 'Social Media Management',
    issuer: 'Kashuti',
    year: '2024',
    badge: 'HONORABLE RECOGNITION',
    description:
      'Recognized for managing social media presence and improving online engagement creatively.',
    image: '/images/kashuti-socialmedia.jpg',
  },
  {
    id: 'bajaj-cert',
    title: 'HR Workshop',
    issuer: 'Bajaj Finserv',
    year: '2024',
    badge: 'EXECUTIVE WORKSHOP',
    description:
      'Participated in an HR workshop under Banking, Finance & Insurance program.',
    image: '/images/bajaj-workshop.jpg',
  },
  {
    id: 'swpg-cert',
    title: 'Design Challenge (2nd Position)',
    issuer: 'CodeNerds SWPG',
    year: '2025',
    badge: '2ND POSITION AWARD',
    description:
      'Secured 2nd position in a creative design challenge showcasing innovative visual thinking and creativity.',
    image: '/images/design-challenge.jpg',
  },
];
