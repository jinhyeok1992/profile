import { X, Code2 } from 'lucide-react';
import { TechStackIcon } from './TechStackIcon';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
  techStacks: string[];
}

export function TechStackModal({ isOpen, onClose, techStacks }: TechStackModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-gradient-to-br from-cyan-900 via-sky-900 to-blue-900 rounded-2xl border border-white/20 shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-white">사용 기술 스택</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {techStacks.map((tech, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-sky-500/0 group-hover:from-cyan-500/10 group-hover:to-sky-500/10 transition-all duration-300" />
                  <div className="relative p-4 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <TechStackIcon name={tech} size="lg" />
                    </div>
                    <span className="text-white/80 text-center text-sm">{tech}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}