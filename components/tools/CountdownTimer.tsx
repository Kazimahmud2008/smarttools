import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
}

export default function CountdownTimer() {
  const [timerName, setTimerName] = useState('');
  const [inputHours, setInputHours] = useState('0');
  const [inputMinutes, setInputMinutes] = useState('5');
  const [inputSeconds, setInputSeconds] = useState('0');
  const [timer, setTimer] = useState<TimerState>({
    hours: 0,
    minutes: 5,
    seconds: 0,
    totalSeconds: 300,
    isRunning: false,
    isPaused: false,
    isFinished: false
  });
  const [showTimer, setShowTimer] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (timer.isRunning && !timer.isPaused && timer.totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          const newTotalSeconds = prev.totalSeconds - 1;
          
          if (newTotalSeconds <= 0) {
            // Timer finished
            return {
              ...prev,
              hours: 0,
              minutes: 0,
              seconds: 0,
              totalSeconds: 0,
              isRunning: false,
              isFinished: true
            };
          }

          const hours = Math.floor(newTotalSeconds / 3600);
          const minutes = Math.floor((newTotalSeconds % 3600) / 60);
          const seconds = newTotalSeconds % 60;

          return {
            ...prev,
            hours,
            minutes,
            seconds,
            totalSeconds: newTotalSeconds
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isRunning, timer.isPaused, timer.totalSeconds]);

  useEffect(() => {
    if (timer.isFinished) {
      toast({
        title: "🎉 Time's Up!",
        description: timerName ? `${timerName} timer has finished!` : "Your timer has finished!"
      });
      
      // Play notification sound (if browser supports it)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Timer Finished!', {
          body: timerName ? `${timerName} timer has finished!` : 'Your countdown timer has finished!',
          icon: '/favicon.ico'
        });
      }
    }
  }, [timer.isFinished, timerName, toast]);

  const startTimer = () => {
    const hours = parseInt(inputHours) || 0;
    const minutes = parseInt(inputMinutes) || 0;
    const seconds = parseInt(inputSeconds) || 0;
    
    if (hours < 0 || minutes < 0 || seconds < 0 || minutes >= 60 || seconds >= 60) {
      toast({
        title: "Error",
        description: "Please enter valid time values (minutes and seconds must be less than 60)",
        variant: "destructive"
      });
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    if (totalSeconds <= 0) {
      toast({
        title: "Error",
        description: "Please enter a time greater than 0",
        variant: "destructive"
      });
      return;
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    setTimer({
      hours,
      minutes,
      seconds,
      totalSeconds,
      isRunning: true,
      isPaused: false,
      isFinished: false
    });
    
    setShowTimer(true);
    
    toast({
      title: "Timer Started",
      description: timerName ? `${timerName} timer started!` : "Countdown timer started!"
    });
  };

  const pauseTimer = () => {
    setTimer(prev => ({ ...prev, isPaused: true }));
    toast({
      title: "Timer Paused",
      description: "Timer has been paused"
    });
  };

  const resumeTimer = () => {
    setTimer(prev => ({ ...prev, isPaused: false }));
    toast({
      title: "Timer Resumed",
      description: "Timer has been resumed"
    });
  };

  const stopTimer = () => {
    setTimer(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      isFinished: false
    }));
    setShowTimer(false);
    toast({
      title: "Timer Stopped",
      description: "Timer has been stopped"
    });
  };

  const resetTimer = () => {
    setTimer({
      hours: 0,
      minutes: 5,
      seconds: 0,
      totalSeconds: 300,
      isRunning: false,
      isPaused: false,
      isFinished: false
    });
    setInputHours('0');
    setInputMinutes('5');
    setInputSeconds('0');
    setTimerName('');
    setShowTimer(false);
    toast({
      title: "Timer Reset",
      description: "Timer has been reset"
    });
  };

  const formatTime = (hours: number, minutes: number, seconds: number): string => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (): string => {
    if (timer.isFinished) return 'text-red-600';
    if (timer.totalSeconds <= 60) return 'text-orange-600';
    if (timer.totalSeconds <= 300) return 'text-yellow-600';
    return 'text-emerald-600';
  };

  const getProgress = (): number => {
    const originalTotal = parseInt(inputHours || '0') * 3600 + parseInt(inputMinutes || '0') * 60 + parseInt(inputSeconds || '0');
    if (originalTotal === 0) return 0;
    return ((originalTotal - timer.totalSeconds) / originalTotal) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 p-6 rounded-lg">
        <h3 className="font-semibold text-emerald-800 mb-4">Countdown Timer</h3>
        <p className="text-emerald-700 text-sm mb-6">
          Set a custom countdown timer for your tasks, breaks, or events.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="timer-name" className="text-sm font-medium text-slate-700 mb-2 block">
              Timer Name (Optional)
            </Label>
            <Input
              id="timer-name"
              type="text"
              value={timerName}
              onChange={(e) => setTimerName(e.target.value)}
              placeholder="e.g., Pomodoro, Break Time, Meeting"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="timer-hours" className="text-sm font-medium text-slate-700 mb-2 block">
                Hours
              </Label>
              <Input
                id="timer-hours"
                type="number"
                value={inputHours}
                onChange={(e) => setInputHours(e.target.value)}
                min="0"
                max="23"
                className="text-center"
              />
            </div>

            <div>
              <Label htmlFor="timer-minutes" className="text-sm font-medium text-slate-700 mb-2 block">
                Minutes
              </Label>
              <Input
                id="timer-minutes"
                type="number"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                min="0"
                max="59"
                className="text-center"
              />
            </div>

            <div>
              <Label htmlFor="timer-seconds" className="text-sm font-medium text-slate-700 mb-2 block">
                Seconds
              </Label>
              <Input
                id="timer-seconds"
                type="number"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                min="0"
                max="59"
                className="text-center"
              />
            </div>

            <div className="flex items-end">
              <Button 
                onClick={startTimer}
                disabled={timer.isRunning}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                <i className="fas fa-play mr-2"></i>
                Start Timer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showTimer && (
        <div className="bg-white border rounded-lg p-8">
          <div className="text-center">
            {timerName && (
              <h4 className="text-lg font-semibold text-slate-800 mb-4">{timerName}</h4>
            )}
            
            <div className={`text-6xl md:text-8xl font-bold font-mono mb-6 ${getTimerColor()}`}>
              {formatTime(timer.hours, timer.minutes, timer.seconds)}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {timer.isRunning && !timer.isPaused && !timer.isFinished && (
                <Button 
                  onClick={pauseTimer}
                  className="bg-amber-600 text-white hover:bg-amber-700"
                >
                  <i className="fas fa-pause mr-2"></i>
                  Pause
                </Button>
              )}

              {timer.isRunning && timer.isPaused && !timer.isFinished && (
                <Button 
                  onClick={resumeTimer}
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <i className="fas fa-play mr-2"></i>
                  Resume
                </Button>
              )}

              {timer.isRunning && !timer.isFinished && (
                <Button 
                  onClick={stopTimer}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  <i className="fas fa-stop mr-2"></i>
                  Stop
                </Button>
              )}

              <Button 
                onClick={resetTimer}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <i className="fas fa-redo mr-2"></i>
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}

      {timer.isFinished && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-800 text-2xl font-bold mb-2">
            🎉 Time's Up!
          </div>
          <div className="text-green-700 mb-4">
            {timerName ? `${timerName} timer has finished.` : 'Your timer has finished.'}
          </div>
          <Button 
            onClick={resetTimer}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <i className="fas fa-plus mr-2"></i>
            Set New Timer
          </Button>
        </div>
      )}

      {/* Preset Timers */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-3">Quick Preset Timers</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { name: '5 min', h: 0, m: 5, s: 0 },
            { name: '10 min', h: 0, m: 10, s: 0 },
            { name: '15 min', h: 0, m: 15, s: 0 },
            { name: '25 min', h: 0, m: 25, s: 0 },
            { name: '30 min', h: 0, m: 30, s: 0 },
            { name: '45 min', h: 0, m: 45, s: 0 },
            { name: '1 hour', h: 1, m: 0, s: 0 },
            { name: '2 hours', h: 2, m: 0, s: 0 }
          ].map((preset) => (
            <Button
              key={preset.name}
              onClick={() => {
                setInputHours(preset.h.toString());
                setInputMinutes(preset.m.toString());
                setInputSeconds(preset.s.toString());
              }}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Popular Use Cases */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-800 mb-2">Popular Timer Uses</h4>
        <div className="text-purple-700 text-sm space-y-1">
          <p><strong>Pomodoro Technique:</strong> 25-minute focused work sessions</p>
          <p><strong>Cooking & Baking:</strong> Perfect timing for recipes and dishes</p>
          <p><strong>Exercise & Fitness:</strong> Workout intervals and rest periods</p>
          <p><strong>Study Sessions:</strong> Focused learning with scheduled breaks</p>
          <p><strong>Presentations:</strong> Time management for meetings and talks</p>
        </div>
      </div>
    </div>
  );
}
