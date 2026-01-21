import { Play, Pause, Menu, ArrowUpDown, X } from 'lucide-react';
import { Task } from '../App';
import { useState, useMemo } from 'react';

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onTaskSelect: (taskId: string) => void;
  onOpenTechStack: () => void;
  selectedTechStack: string | null;
  onClearTechStackFilter: () => void;
}

type SortType = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc';

export function TaskList({ 
  tasks, 
  selectedTaskId, 
  onTaskSelect, 
  onOpenTechStack,
  selectedTechStack,
  onClearTechStackFilter
}: TaskListProps) {
  const [sortType, setSortType] = useState<SortType>('date-desc');

  // Sort tasks based on sortType
  const sortedTasks = useMemo(() => {
    const tasksCopy = [...tasks];
    
    switch (sortType) {
      case 'date-desc':
        return tasksCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'date-asc':
        return tasksCopy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'name-asc':
        return tasksCopy.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
      case 'name-desc':
        return tasksCopy.sort((a, b) => b.title.localeCompare(a.title, 'ko'));
      default:
        return tasksCopy;
    }
  }, [tasks, sortType]);

  const toggleSort = () => {
    const sortOrder: SortType[] = ['date-desc', 'date-asc', 'name-asc', 'name-desc'];
    const currentIndex = sortOrder.indexOf(sortType);
    const nextIndex = (currentIndex + 1) % sortOrder.length;
    setSortType(sortOrder[nextIndex]);
  };

  const getSortLabel = () => {
    switch (sortType) {
      case 'date-desc':
        return '날짜순 ↓';
      case 'date-asc':
        return '날짜순 ↑';
      case 'name-asc':
        return '이름순 ↑';
      case 'name-desc':
        return '이름순 ↓';
    }
  };

  return (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-white/10">
        {/* Title Row */}
        <div className="mb-4">
          <h2 className="text-white/90">프로젝트 업무</h2>
        </div>

        {/* Filter Badge */}
        {selectedTechStack && (
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40">
              <span className="text-cyan-300 text-sm">{selectedTechStack}</span>
              <button
                onClick={onClearTechStackFilter}
                className="hover:bg-cyan-500/30 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-cyan-300" />
              </button>
            </div>
          </div>
        )}

        {/* Control Row */}
        <div className="flex items-center justify-between">
          {/* Count */}
          <div className="text-white/50">
            총 <span className="text-cyan-400 font-medium">{sortedTasks.length}</span>개 업무
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {/* Sort Button */}
            <button
              onClick={toggleSort}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
              title="정렬 방식 변경"
            >
              <ArrowUpDown className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-sm">{getSortLabel()}</span>
            </button>

            {/* Tech Stack Menu Button */}
            <button
              onClick={onOpenTechStack}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center transition-all duration-200 group"
              title="전체 기술 스택 보기"
            >
              <Menu className="w-5 h-5 text-white/70 group-hover:text-cyan-300 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-3 md:px-4 py-3 md:py-4">
        <div className="space-y-2">
          {sortedTasks.map((task) => {
            const isSelected = selectedTaskId === task.id;
            
            return (
              <div
                key={task.id}
                onClick={() => onTaskSelect(task.id)}
                className={`
                  group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg cursor-pointer
                  transition-all duration-300
                  ${isSelected 
                    ? 'bg-cyan-600/30 shadow-lg shadow-cyan-500/20' 
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
                      ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50'
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