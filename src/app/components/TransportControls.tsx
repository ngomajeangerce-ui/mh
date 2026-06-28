import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Play, Pause, Square } from 'lucide-react';

interface TransportControlsProps {
  isPlaying: boolean;
  bpm: number;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onBpmChange: (bpm: number) => void;
}

export function TransportControls({
  isPlaying,
  bpm,
  onPlay,
  onPause,
  onStop,
  onBpmChange,
}: TransportControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        {!isPlaying ? (
          <Button onClick={onPlay} size="lg" className="gap-2">
            <Play className="w-5 h-5" />
            Play
          </Button>
        ) : (
          <Button onClick={onPause} size="lg" variant="secondary" className="gap-2">
            <Pause className="w-5 h-5" />
            Pause
          </Button>
        )}
        <Button onClick={onStop} size="lg" variant="outline" className="gap-2">
          <Square className="w-5 h-5" />
          Stop
        </Button>
      </div>

      <div className="flex items-center gap-4 flex-1 max-w-xs">
        <span className="text-sm font-medium whitespace-nowrap">BPM: {bpm}</span>
        <Slider
          value={[bpm]}
          onValueChange={([value]) => onBpmChange(value)}
          min={60}
          max={180}
          step={1}
          className="flex-1"
        />
      </div>
    </div>
  );
}
