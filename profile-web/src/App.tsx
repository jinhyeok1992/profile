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
    id: '12',
    title: '보험사 VOC 운영개발',
    category: '흥국화재',
    duration: '2018.10 ~ 2020.07',
    description: '채널계 VOC 업무 SM을 담당하며 전자정부 프레임워크 기반의 고도화 프로젝트를 수행했습니다.',
    subtasks: [
      '채널계 VOC 서비스 유지보수',
      'Java와 쉘스크립트, JP1를 이용한 배치 프로그램 개발',
      'EAI를 통한 MCI 전문 개발',
      'SSO 솔루션 환경 세팅 및 브릿지 페이지 개발',
      'Oracle SQL로 통계 쿼리 개발',
      '전자정부 프레임워크로 프로젝트 고도화',
      '대외 민원시스템 이중화 작업 및 사내 결재 시스템 구축'
    ],
    assignee: '김진혁',
    priority: 'High',
    progress: 100,
  },
  {
    id: '11',
    title: '품질보증 시스템(QIS) 구축',
    category: '한화솔루션',
    duration: '2020.07 ~ 2020.10',
    description: '방산 공장에서 생산된 물품 발주/검사/평가 프로세스를 관리하는 웹서비스를 제작했습니다.',
    subtasks: [
      'JavaScript, Spring으로 관리자 페이지 개발',
      'OZ Viewer 연동',
      '메인 서버(MS-SQL)와 담당 서버(Oracle) 간의 데이터 연동 쿼리 개발',
      '프로시저 수정'
    ],
    assignee: '김진혁',
    priority: 'High',
    progress: 100,
  },
  {
    id: '10',
    title: '금융 빅데이터 플랫폼 구축',
    category: 'BC카드',
    duration: '2020.11 ~ 2020.12',
    description: '빅데이터 API를 구매/판매 할 수 있는 웹플랫폼을 고도화했습니다.',
    subtasks: [
      'JavaScript와 PostgreSQL을 이용한 웹페이지 제작'
    ],
    assignee: '김진혁',
    priority: 'Medium',
    progress: 100,
  },
  {
    id: '9',
    title: '뷰티포인트 멤버십앱 운영개발',
    category: '아모레퍼시픽',
    duration: '2021.01 ~ 2021.04',
    description: '멤버십 관리 및 신규 이벤트를 개발했습니다.',
    subtasks: [
      'JavaScript를 이용한 웹뷰 페이지 개발',
      'Postman으로 모바일 개발자와 앱서비스 협업',
      '포인트 적립과 사은품 구매 서비스 API 개발',
      '랜덤 룰렛 이벤트 서비스 API 개발',
      '이벤트 랜덤 쿠폰 서비스와 포인트 적립 API 개발'
    ],
    assignee: '김진혁',
    priority: 'High',
    progress: 100,
  },
  {
    id: '8',
    title: '공용서비스 컨테이너 전환',
    category: 'KTDS',
    duration: '2021.05 ~ 2021.12',
    description: 'KT 라이프플랜 플랫폼, 공정경쟁 플랫폼을 고도화했습니다.',
    subtasks: [
      'JavaScript, jQuery, FreeMarker, Bootstrap을 이용한 웹페이지 개발',
      'PostgreSQL을 이용한 피벗 공통 메뉴 개발',
      '멀티 파일 업로드 API 및 화면 구성',
      '스프링 시큐리티를 통한 로그인 핸들러 관리',
      '인증권한 관리 및 인증 로직 개발'
    ],
    assignee: '김진혁',
    priority: 'High',
    progress: 100,
  },
  {
    id: '7',
    title: '보험사 콜센터 운영개발',
    category: 'AXA다이렉트',
    duration: '2022.01 ~ 2022.06',
    description: '채널계 콜센터 운영 개발을 담당했습니다.',
    subtasks: [
      'ProFrame과 Java 기반 콜센터 QA, 상품권 서비스 유지보수',
      'ProFrame 배치를 이용한 콜센터 배치 개발 및 관리',
      'Secure CRT 텔넷을 이용한 로그 분석 및 오류사항 유지보수',
      '상품권 발송 누락분 데이터 수정',
      '콜센터 평가 관리 개편 - 이의제기 및 재평가 로직 개발'
    ],
    assignee: '김진혁',
    priority: 'Medium',
    progress: 100,
  },
  {
    id: '6',
    title: '통합품질 감시 시스템(TQMS) 개발',
    category: 'SK on',
    duration: '2022.06 ~ 2022.12',
    description: '사내 공장 실시간 모니터링 및 관리 서비스를 구축했습니다.',
    subtasks: [
      'jqGrid, JavaScript, jQuery, Spring으로 관리자 페이지 구축',
      '통계 쿼리와 연동으로 실시간 업데이트 현황 구축'
    ],
    assignee: '김진혁',
    priority: 'High',
    progress: 100,
  },
  {
    id: '5',
    title: '시설관리공단 홈페이지 고도화',
    category: '원주시 시설관리공단',
    duration: '2023.01 ~ 2023.04',
    description: '원주시 시설 수강 신청 및 관리 서비스를 고도화했습니다.',
    subtasks: [
      'Thymeleaf, Spring Boot를 이용한 관리자 페이지 구축',
      'Nicepay 에이전트를 이용한 결제 로직 개발',
      'SMS, 카카오톡 발송 API 개발',
      '세션 스토리지를 이용한 로그인 사용자 세션 관리 API 개발',
      '티켓 발권 서비스 외부연동 API 개발'
    ],
    assignee: '김진혁',
    priority: 'High',
    progress: 100,
  },
  {
    id: '4',
    title: '매장 예약관리 시스템',
    category: '주식회사 피터',
    duration: '2023.05 ~ 2023.09',
    description: '매장 및 회원 관리와 대회 관리 플랫폼을 구축했습니다.',
    subtasks: [
      'Vue와 Nuxt 기반의 사용자 및 관리자 페이지 프론트 서버 구성',
      'Store, Middleware, Plugins를 이용한 공통 모듈 개발',
      '참가 티켓 관리 페이지 개발',
      '바닐라 JavaScript로 캘린더 폼 개발',
      '갤러리 앱 연동 이미지 업로드 로직 구성'
    ],
    assignee: '김진혁',
    priority: 'Medium',
    progress: 100,
  },
  {
    id: '3',
    title: '클라우드 전환 프로젝트',
    category: '우리은행, 대구은행',
    duration: '2023.10 ~ 2024.03',
    description: '우리은행, 대구은행 클라우드 전환사업 - CMP 솔루션을 커스터마이징했습니다.',
    subtasks: [
      '스프링 배치를 이용한 인사정보 파일 머지 배치 기능 구현',
      'React와 TypeScript 기반의 CMP 솔루션 프론트엔드 수정 개발',
      'CMP 대시보드 화면과 VM, APIC 등의 클라우드 장비 연동',
      '크레덴셜 정보 관리 및 암복호화 개발'
    ],
    assignee: '김진혁',
    priority: 'High',
    progress: 100,
  },
  {
    id: '2',
    title: '클라우드 AP전환 프로젝트',
    category: '한국 콘텐츠진흥원',
    duration: '2024.04 ~ 2024.06',
    description: '퍼블릭 클라우드 환경에서 전자정부 프레임워크 기반의 AP전환 프로젝트를 수행했습니다.',
    subtasks: [
      'Bastion Host를 사용한 퍼블릭 클라우드 서버 환경 작업',
      '전자정부 프레임워크 및 톰캣 WAS 환경 설치',
      '전자정부 프레임워크 버전업 (3.10 → 4.1)',
      '새 프레임워크 버전에 맞게 기존 AP 수정 이관'
    ],
    assignee: '김진혁',
    priority: 'High',
    progress: 100,
  },
  {
    id: '1',
    title: '디지털 클러스터링 프로젝트',
    category: '아워홈',
    duration: '2024.10 ~ 현재',
    description: 'QSIS(Quality Safety Integral System) 프로젝트 안정화 및 연계된 신규 프로젝트 작업을 진행 중입니다.',
    subtasks: [
      'QMS, SOFT, 품질 클레임 등 통합 관리 시스템 개발',
      'Selenium, JSoup으로 데이터 크롤링 및 AWS RDS, OpenSearch 적재',
      'JPA에서 MyBatis로 전환 작업 및 DB 테이블 재설계',
      'QSIS 플랫폼 공통 관리 영역 재구축',
      '메뉴 정보 DB화 및 권한 기반 화면 컴포넌트 제어 고도화',
      '다중 DB 트랜잭션 개발 및 설정',
      'AWS S3 이관 자동화 모듈 개발',
      '통계 분석 대시보드 개발'
    ],
    assignee: '김진혁',
    priority: 'High',
    progress: 75,
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