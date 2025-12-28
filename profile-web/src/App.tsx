import { useState } from 'react';
import { TaskList } from './components/TaskList';
import { TaskDetail } from './components/TaskDetail';

export interface Task {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  subtasks: string[];
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  progress: number;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: '요구사항 분석 및 정의',
    category: '기획',
    duration: '5일',
    description: '프로젝트의 전반적인 요구사항을 수집하고 분석하여 문서화합니다. 이해관계자들과의 미팅을 통해 명확한 목표를 설정합니다.',
    subtasks: ['이해관계자 인터뷰', '요구사항 문서 작성', '승인 및 검토'],
    assignee: '김기획',
    priority: 'High',
    progress: 75,
  },
  {
    id: '2',
    title: 'UI/UX 디자인 설계',
    category: '디자인',
    duration: '7일',
    description: '사용자 경험을 최적화한 인터페이스 디자인을 제작합니다. 와이어프레임부터 최종 디자인까지 진행합니다.',
    subtasks: ['와이어프레임 작성', '프로토타입 제작', '디자인 시스템 구축', '사용성 테스트'],
    assignee: '박디자인',
    priority: 'High',
    progress: 60,
  },
  {
    id: '3',
    title: '데이터베이스 스키마 설계',
    category: '개발',
    duration: '4일',
    description: '효율적인 데이터 구조를 위한 데이터베이스 스키마를 설계하고 최적화합니다.',
    subtasks: ['ERD 작성', '테이블 정의', '인덱스 설계', '마이그레이션 스크립트 작성'],
    assignee: '이개발',
    priority: 'High',
    progress: 90,
  },
  {
    id: '4',
    title: '백엔드 API 개발',
    category: '개발',
    duration: '10일',
    description: 'RESTful API를 설계하고 구현합니다. 인증, 권한 관리 및 데이터 처리 로직을 포함합니다.',
    subtasks: ['API 엔드포인트 설계', '비즈니스 로직 구현', '인증/인가 구현', 'API 문서화'],
    assignee: '최백엔드',
    priority: 'High',
    progress: 45,
  },
  {
    id: '5',
    title: '프론트엔드 컴포넌트 개발',
    category: '개발',
    duration: '12일',
    description: '재사용 가능한 UI 컴포넌트를 개발하고 상태 관리를 구현합니다.',
    subtasks: ['컴포넌트 라이브러리 구축', '상태 관리 설정', '라우팅 구현', 'API 연동'],
    assignee: '정프론트',
    priority: 'Medium',
    progress: 30,
  },
  {
    id: '6',
    title: '단위 테스트 작성',
    category: '테스트',
    duration: '6일',
    description: '주요 기능에 대한 단위 테스트를 작성하여 코드 품질을 보장합니다.',
    subtasks: ['테스트 환경 설정', '백엔드 테스트 작성', '프론트엔드 테스트 작성', '커버리지 분석'],
    assignee: '강테스트',
    priority: 'Medium',
    progress: 20,
  },
  {
    id: '7',
    title: '통합 테스트 및 QA',
    category: '테스트',
    duration: '8일',
    description: '전체 시스템의 통합 테스트를 수행하고 버그를 수정합니다.',
    subtasks: ['테스트 시나리오 작성', '통합 테스트 실행', '버그 수정', '재테스트'],
    assignee: '강테스트',
    priority: 'Medium',
    progress: 10,
  },
  {
    id: '8',
    title: '배포 환경 구축',
    category: '인프라',
    duration: '5일',
    description: 'CI/CD 파이프라인을 구축하고 프로덕션 환경을 설정합니다.',
    subtasks: ['서버 환경 설정', 'CI/CD 파이프라인 구축', '모니터링 도구 설정', '백업 시스템 구축'],
    assignee: '윤인프라',
    priority: 'High',
    progress: 55,
  },
  {
    id: '9',
    title: '사용자 매뉴얼 작성',
    category: '문서화',
    duration: '4일',
    description: '최종 사용자를 위한 상세한 사용 가이드를 작성합니다.',
    subtasks: ['사용자 가이드 작성', '관리자 매뉴얼 작성', '비디오 튜토리얼 제작', 'FAQ 작성'],
    assignee: '임문서',
    priority: 'Low',
    progress: 0,
  },
  {
    id: '10',
    title: '최종 배포 및 릴리즈',
    category: '배포',
    duration: '3일',
    description: '프로덕션 환경에 최종 배포하고 모니터링합니다.',
    subtasks: ['프로덕션 배포', '모니터링 및 로그 확인', '핫픽스 대기', '릴리즈 노트 작성'],
    assignee: '윤인프라',
    priority: 'High',
    progress: 0,
  },
];

export default function App() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const selectedTask = mockTasks.find(task => task.id === selectedTaskId);

  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Left Panel - Task Detail (Desktop) / Overlay (Mobile) */}
      <div className={`
        md:flex-1 md:overflow-hidden md:block
        fixed inset-0 z-50 md:relative md:z-auto
        transition-transform duration-300 ease-in-out
        ${isDetailOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <TaskDetail 
          task={selectedTask} 
          onClose={handleCloseDetail}
        />
      </div>

      {/* Backdrop for mobile */}
      {isDetailOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={handleCloseDetail}
        />
      )}

      {/* Right Panel - Task List */}
      <div className="flex-1 md:border-l border-white/10">
        <TaskList
          tasks={mockTasks}
          selectedTaskId={selectedTaskId}
          onTaskSelect={handleTaskSelect}
        />
      </div>
    </div>
  );
}