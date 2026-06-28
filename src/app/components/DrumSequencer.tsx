import { Button } from './ui/button';
import type { DrumSound } from '../hooks/useAudioEngine';

interface DrumSequencerProps {
  pattern: boolean[][];
  onToggleStep: (trackIndex: number, stepIndex: number) => void;
  currentStep: number;
  isPlaying: boolean;
}

const DRUM_TRACKS: { name: string; sound: DrumSound }[] = [
  { name: 'Kick', sound: 'kick' },
  { name: 'Snare', sound: 'snare' },
  { name: 'Hi-Hat', sound: 'hihat' },
  { name: 'Clap', sound: 'clap' },
];

export function DrumSequencer({ pattern, onToggleStep, currentStep, isPlaying }: DrumSequencerProps) {
  const steps = pattern[0]?.length || 16;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Drum Sequencer</h2>
      <div className="space-y-2">
        {DRUM_TRACKS.map((track, trackIndex) => (
          <div key={track.name} className="flex items-center gap-2">
            <div className="w-16 text-sm font-medium">{track.name}</div>
            <div className="flex gap-1">
              {Array.from({ length: steps }).map((_, stepIndex) => {
                const isActive = pattern[trackIndex]?.[stepIndex];
                const isCurrent = isPlaying && currentStep === stepIndex;
                
                return (
                  <button
                    key={stepIndex}
                    onClick={() => onToggleStep(trackIndex, stepIndex)}
                    className={`w-8 h-8 rounded transition-all ${
                      isActive
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    } ${
                      isCurrent ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900' : ''
                    } ${stepIndex % 4 === 0 ? 'ml-2' : ''}`}
                    aria-label={`Track ${trackIndex + 1}, Step ${stepIndex + 1}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { DRUM_TRACKS };
