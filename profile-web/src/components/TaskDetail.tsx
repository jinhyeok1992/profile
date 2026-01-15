import { useEffect, useState } from 'react';
import { Task } from '../App';
import { Clock, User, AlertCircle, CheckCircle2, X, Code2 } from 'lucide-react';
import { TechStackIcon } from './TechStackIcon';

interface TaskDetailProps {
  task: Task | undefined;
  onClose: () => void;
}

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (task) {
      setAnimationKey(prev => prev + 1);
    }
  }, [task?.id]);

  if (!task) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-cyan-900 via-sky-900 to-blue-900">
        <div className="text-center px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <Play className="w-12 h-12 text-white/20" />
          </div>
          <h2 className="text-white/40 mb-2">업무를 선택해주세요</h2>
          <p className="text-white/30">
            <span className="md:inline hidden">오른쪽 목록에서 업무를 클릭하면</span>
            <span className="md:hidden">업무를 클릭하면</span>
            <br />
            상세 내용을 확인할 수 있습니다
          </p>
        </div>
      </div>
    );
  }

  const priorityColors = {
    High: 'text-red-400',
    Medium: 'text-yellow-400',
    Low: 'text-green-400',
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-8 bg-gradient-to-br from-cyan-900 via-sky-900 to-blue-900">
      {/* Mobile Close Button */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Scrolling Title */}
      <div className="mb-6 md:mb-8 overflow-hidden relative h-12 md:h-16">
        <div
          key={animationKey}
          className="absolute whitespace-nowrap animate-scroll-left text-white/90"
          style={{
            animation: 'scrollLeft 8s linear infinite',
          }}
        >
          {task.title}
        </div>
        <style>{`
          @keyframes scrollLeft {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-scroll-left {
            animation: scrollLeft 8s linear infinite;
          }
        `}</style>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto space-y-4 md:space-y-6">
        {/* Header Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-white mb-2">{task.title}</h2>
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {task.category}
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full bg-white/10 ${priorityColors[task.priority]} whitespace-nowrap ml-2`}>
              {task.priority}
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 text-white/70">
              <Clock className="w-5 h-5" />
              <div>
                <div className="text-white/50">소요 시간</div>
                <div>{task.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <User className="w-5 h-5" />
              <div>
                <div className="text-white/50">담당자</div>
                <div>{task.assignee}</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70">진행률</span>
              <span className="text-purple-400">{task.progress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
          <h3 className="text-white/90 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            업무 설명
          </h3>
          <p className="text-white/70 leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Subtasks */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
          <h3 className="text-white/90 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            세부 작업 항목
          </h3>
          <div className="space-y-3">
            {task.subtasks.map((subtask, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-white/70">{subtask}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
          <h3 className="text-white/90 mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            사용 기술 스택
          </h3>
          <div className="flex flex-wrap gap-2">
            {task.techStack.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
              >
                <TechStackIcon name={tech} size="md" />
                <span className="text-white/80">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Play({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}