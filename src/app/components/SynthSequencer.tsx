interface SynthSequencerProps {
  pattern: number[][];
  onToggleNote: (stepIndex: number, noteIndex: number) => void;
  currentStep: number;
  isPlaying: boolean;
}

const NOTES = [
  { name: 'C4', freq: 261.63 },
  { name: 'D4', freq: 293.66 },
  { name: 'E4', freq: 329.63 },
  { name: 'G4', freq: 392.00 },
  { name: 'A4', freq: 440.00 },
  { name: 'C5', freq: 523.25 },
];

export function SynthSequencer({ pattern, onToggleNote, currentStep, isPlaying }: SynthSequencerProps) {
  const steps = pattern.length;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Synthesizer</h2>
      <div className="space-y-1">
        {NOTES.map((note, noteIndex) => (
          <div key={note.name} className="flex items-center gap-2">
            <div className="w-12 text-sm font-medium">{note.name}</div>
            <div className="flex gap-1">
              {Array.from({ length: steps }).map((_, stepIndex) => {
                const isActive = pattern[stepIndex]?.includes(noteIndex);
                const isCurrent = isPlaying && currentStep === stepIndex;
                
                return (
                  <button
                    key={stepIndex}
                    onClick={() => onToggleNote(stepIndex, noteIndex)}
                    className={`w-8 h-6 rounded transition-all ${
                      isActive
                        ? 'bg-purple-500 hover:bg-purple-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    } ${
                      isCurrent ? 'ring-2 ring-yellow-400 ring-offset-1 ring-offset-gray-900' : ''
                    } ${stepIndex % 4 === 0 ? 'ml-2' : ''}`}
                    aria-label={`Note ${note.name}, Step ${stepIndex + 1}`}
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

export { NOTES };
