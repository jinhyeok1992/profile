import { Play, Pause } from 'lucide-react';
import { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onTaskSelect: (taskId: string) => void;
  onOpenTechStack: () => void;
}

export function TaskList({ tasks, selectedTaskId, onTaskSelect, onOpenTechStack }: TaskListProps) {
  return (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-white/10 flex items-start justify-between">
        <div>
          <h2 className="text-white/90 mb-2">프로젝트 업무</h2>
          <p className="text-white/50">총 {tasks.length}개 업무</p>
        </div>
        <button
          onClick={onOpenTechStack}
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-400/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          title="전체 기술 스택 보기"
        >
          <Code2 className="w-5 h-5 md:w-6 md:h-6 text-purple-300 group-hover:text-purple-200 transition-colors" />
        </button>
      </div>
      
      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-3 md:px-4 py-3 md:py-4">
        <div className="space-y-2">
          {tasks.sort((a, b) => a.id.localeCompare(b.id)).map((task) => {
            const isSelected = selectedTaskId === task.id;
            
            return (
              <div
                key={task.id}
                onClick={() => onTaskSelect(task.id)}
                className={`
                  group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg cursor-pointer
                  transition-all duration-300
                  ${isSelected 
                    ? 'bg-purple-600/30 shadow-lg shadow-purple-500/20' 
                    : 'hover:bg-white/5'
                  }
                `}
              >
                {/* Play/Pause Button */}
                <button
                  className={`
                    flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isSelected
                      ? 'bg-purple-500 shadow-lg shadow-purple-500/50'
                      : 'bg-white/10 group-hover:bg-white/20'
                    }
                  `}
                >
                  {isSelected ? (
                    <Pause className="w-4 h-4 md:w-5 md:h-5 text-white" fill="white" />
                  ) : (
                    <Play className="w-4 h-4 md:w-5 md:h-5 text-white" fill="white" />
                  )}
                </button>

                {/* Task Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={`
                    transition-colors duration-300 truncate
                    ${isSelected ? 'text-white' : 'text-white/80'}
                  `}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 md:gap-3 mt-1">
                    <span className="text-white/50 truncate">{task.category}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50">{task.duration}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex-shrink-0 w-12 md:w-16">
                  <div className="text-right text-white/50 mb-1">{task.progress}%</div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isSelected ? 'bg-purple-400' : 'bg-white/30'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}