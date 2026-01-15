import {
  SiNotion,
  SiFigma,
  SiMiro,
  SiGoogledocs,
  SiAdobexd,
  SiSketch,
  SiInvision,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiJsonwebtokens,
  SiSwagger,
  SiReact,
  SiTailwindcss,
  SiReactquery,
  SiJest,
  SiTestinglibrary,
  SiVitest,
  SiCypress,
  SiPostman,
  SiJira,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiAmazon,
  SiNginx,
  SiGitbook,
  SiLoom,
  SiMarkdown,
  SiVercel,
  SiSentry,
  SiDatadog,
  SiSlack,
} from 'react-icons/si';
import { Code2, Database, TestTube, Eye } from 'lucide-react';

const techStackIcons: { [key: string]: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string } } = {
  'Notion': { icon: SiNotion, color: '#000000' },
  'Figma': { icon: SiFigma, color: '#F24E1E' },
  'Miro': { icon: SiMiro, color: '#FFD02F' },
  'Google Docs': { icon: SiGoogledocs, color: '#4285F4' },
  'Adobe XD': { icon: SiAdobexd, color: '#FF61F6' },
  'Sketch': { icon: SiSketch, color: '#F7B500' },
  'InVision': { icon: SiInvision, color: '#FF3366' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'Prisma': { icon: SiPrisma, color: '#2D3748' },
  'dbdiagram.io': { icon: Database, color: '#6366F1' },
  'Redis': { icon: SiRedis, color: '#DC382D' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express': { icon: SiExpress, color: '#000000' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'JWT': { icon: SiJsonwebtokens, color: '#000000' },
  'Swagger': { icon: SiSwagger, color: '#85EA2D' },
  'React': { icon: SiReact, color: '#61DAFB' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Zustand': { icon: Database, color: '#443E38' },
  'React Query': { icon: SiReactquery, color: '#FF4154' },
  'Jest': { icon: SiJest, color: '#C21325' },
  'React Testing Library': { icon: SiTestinglibrary, color: '#E33332' },
  'Vitest': { icon: SiVitest, color: '#6E9F18' },
  'Supertest': { icon: TestTube, color: '#8B5CF6' },
  'Cypress': { icon: SiCypress, color: '#17202C' },
  'Playwright': { icon: Eye, color: '#2EAD33' },
  'Postman': { icon: SiPostman, color: '#FF6C37' },
  'Jira': { icon: SiJira, color: '#0052CC' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'Kubernetes': { icon: SiKubernetes, color: '#326CE5' },
  'GitHub Actions': { icon: SiGithubactions, color: '#2088FF' },
  'AWS': { icon: SiAmazon, color: '#FF9900' },
  'Nginx': { icon: SiNginx, color: '#009639' },
  'GitBook': { icon: SiGitbook, color: '#3884FF' },
  'Loom': { icon: SiLoom, color: '#625DF5' },
  'Markdown': { icon: SiMarkdown, color: '#000000' },
  'Vercel': { icon: SiVercel, color: '#000000' },
  'Sentry': { icon: SiSentry, color: '#362D59' },
  'Datadog': { icon: SiDatadog, color: '#632CA6' },
  'CloudWatch': { icon: Eye, color: '#FF4F8B' },
  'Slack': { icon: SiSlack, color: '#4A154B' },
};

interface TechStackIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TechStackIcon({ name, size = 'md' }: TechStackIconProps) {
  const tech = techStackIcons[name];
  const Icon = tech?.icon || Code2;
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <Icon 
      className={sizeClasses[size]} 
      style={{ color: tech?.color || '#A78BFA' }}
    />
  );
}

export function getTechStackColor(name: string): string {
  return techStackIcons[name]?.color || '#A78BFA';
}