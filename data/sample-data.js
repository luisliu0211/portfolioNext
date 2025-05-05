export const sampleWorks = [
  {
    id: 1,
    title: '个人作品集网站',
    subtitle: '使用 Next.js 构建的个人作品展示平台',
    description:
      '这是一个使用 Next.js、React 和 Material-UI 构建的个人作品集网站。包含作品展示、博客文章和技能介绍等功能。',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    tags: ['Next.js', 'React', 'Material-UI', '响应式设计'],
    github: 'https://github.com/example/portfolio',
    demo: 'https://portfolio-example.com',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: '电商管理系统',
    subtitle: '完整的电商后台管理解决方案',
    description:
      '一个功能完善的电商管理系统，包含商品管理、订单处理、用户管理、数据统计等模块。',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    tags: ['React', 'Node.js', 'MySQL', 'Express'],
    github: 'https://github.com/example/ecommerce',
    demo: 'https://ecommerce-example.com',
    createdAt: '2024-02-01',
  },
  {
    id: 3,
    title: '社交媒体应用',
    subtitle: '类 Twitter 社交平台',
    description:
      '一个类似 Twitter 的社交媒体应用，支持发帖、评论、点赞、关注等功能。',
    coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    tags: ['React', 'Firebase', '实时通讯', '社交媒体'],
    github: 'https://github.com/example/social-media',
    demo: 'https://social-example.com',
    createdAt: '2024-02-15',
  },
];

export const sampleSkills = [
  {
    id: 1,
    category: '前端开发',
    skills: [
      {
        name: 'React',
        level: 90,
        description: '熟练使用 React 构建现代化 Web 应用',
        icon: 'react-icon',
      },
      {
        name: 'Next.js',
        level: 85,
        description: '掌握 Next.js 框架，能够构建 SEO 友好的应用',
        icon: 'nextjs-icon',
      },
      {
        name: 'JavaScript',
        level: 95,
        description: '深入理解 JavaScript 核心概念和最新特性',
        icon: 'javascript-icon',
      },
    ],
  },
  {
    id: 2,
    category: '后端开发',
    skills: [
      {
        name: 'Node.js',
        level: 80,
        description: '使用 Node.js 开发 RESTful API 和后端服务',
        icon: 'nodejs-icon',
      },
      {
        name: 'Express',
        level: 85,
        description: '熟练使用 Express 框架构建 Web 服务器',
        icon: 'express-icon',
      },
      {
        name: 'MySQL',
        level: 75,
        description: '能够设计和优化数据库结构',
        icon: 'mysql-icon',
      },
    ],
  },
  {
    id: 3,
    category: '其他技能',
    skills: [
      {
        name: 'Git',
        level: 85,
        description: '熟练使用 Git 进行版本控制和团队协作',
        icon: 'git-icon',
      },
      {
        name: 'Docker',
        level: 70,
        description: '了解容器化技术，能够使用 Docker 部署应用',
        icon: 'docker-icon',
      },
      {
        name: 'AWS',
        level: 65,
        description: '具备基本的云服务使用经验',
        icon: 'aws-icon',
      },
    ],
  },
];
