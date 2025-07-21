import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function EpochConverter() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState('');
  const [datetimeInput, setDatetimeInput] = useState('');
  const [humanTimeResult, setHumanTimeResult] = useState('');
  const [timestampResult, setTimestampResult] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    
    // Set current date/time as default
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now - offset)).toISOString().slice(0, 16);
    setDatetimeInput(localISOTime);
    
    return () => clearInterval(interval);
  }, []);

  const getCurrentHumanTime = () => {
    return new Date(currentTimestamp * 1000).toLocaleString();
  };

  const convertTimestampToHuman = () => {
    if (!timestampInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Unix timestamp",
        variant: "destructive"
      });
      return;
    }

    try {
      const timestamp = parseInt(timestampInput);
      if (isNaN(timestamp)) {
        throw new Error('Invalid timestamp');
      }

      const date = new Date(timestamp * 1000);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid timestamp');
      }

      const humanTime = date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });

      setHumanTimeResult(humanTime);
      
      toast({
        title: "Success",
        description: "Timestamp converted to human time!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid timestamp format",
        variant: "destructive"
      });
    }
  };

  const convertHumanToTimestamp = () => {
    if (!datetimeInput) {
      toast({
        title: "Error",
        description: "Please select a date and time",
        variant: "destructive"
      });
      return;
    }

    try {
      const date = new Date(datetimeInput);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      const timestamp = Math.floor(date.getTime() / 1000);
      setTimestampResult(timestamp.toString());
      
      toast({
        title: "Success",
        description: "Date converted to Unix timestamp!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid date format",
        variant: "destructive"
      });
    }
  };

  const copyCurrentTimestamp = () => {
    navigator.clipboard.writeText(currentTimestamp.toString()).then(() => {
      toast({
        title: "Copied!",
        description: "Current timestamp copied to clipboard"
      });
    });
  };

  const copyResult = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Copied!",
        description: "Result copied to clipboard"
      });
    });
  };

  return (
    <div className="space-y-8">
      {/* Current Timestamp */}
      <div className="bg-emerald-50 p-6 rounded-lg">
        <h3 className="font-semibold text-emerald-800 mb-4">Current Unix Timestamp</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-2xl font-bold text-emerald-700">{currentTimestamp}</div>
            <div className="text-sm text-emerald-600 mt-1">{getCurrentHumanTime()}</div>
          </div>
          <Button 
            onClick={copyCurrentTimestamp}
            variant="outline"
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <i className="fas fa-copy mr-2"></i>
            Copy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Timestamp to Human */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-4">Timestamp to Human Time</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="timestamp-input" className="text-sm font-medium text-slate-700 mb-2 block">
                Enter Unix timestamp
              </Label>
              <Input
                id="timestamp-input"
                type="text"
                value={timestampInput}
                onChange={(e) => setTimestampInput(e.target.value)}
                placeholder="1640995200"
                className="font-mono"
              />
            </div>
            
            <Button 
              onClick={convertTimestampToHuman}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              <i className="fas fa-arrow-right mr-2"></i>
              Convert to Human Time
            </Button>
            
            {humanTimeResult && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-slate-700">Human Time:</Label>
                  <Button 
                    onClick={() => copyResult(humanTimeResult)}
                    size="sm" 
                    variant="outline"
                  >
                    <i className="fas fa-copy"></i>
                  </Button>
                </div>
                <div className="bg-white p-3 rounded border border-slate-200">
                  <div className="font-medium text-slate-800">{humanTimeResult}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Human to Timestamp */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-4">Human Time to Timestamp</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="datetime-input" className="text-sm font-medium text-slate-700 mb-2 block">
                Select date and time
              </Label>
              <Input
                id="datetime-input"
                type="datetime-local"
                value={datetimeInput}
                onChange={(e) => setDatetimeInput(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={convertHumanToTimestamp}
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
            >
              <i className="fas fa-arrow-right mr-2"></i>
              Convert to Timestamp
            </Button>
            
            {timestampResult && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-slate-700">Unix Timestamp:</Label>
                  <Button 
                    onClick={() => copyResult(timestampResult)}
                    size="sm" 
                    variant="outline"
                  >
                    <i className="fas fa-copy"></i>
                  </Button>
                </div>
                <div className="bg-white p-3 rounded border border-slate-200">
                  <div className="font-mono font-medium text-slate-800">{timestampResult}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-slate-50 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-800 mb-3">About Unix Timestamps</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <strong>What is Unix Timestamp?</strong><br />
            A Unix timestamp is the number of seconds since January 1, 1970, 00:00:00 UTC.
          </div>
          <div>
            <strong>Why use timestamps?</strong><br />
            They provide a universal way to represent time across different systems and timezones.
          </div>
          <div>
            <strong>Range:</strong><br />
            Standard 32-bit timestamps work until January 19, 2038.
          </div>
          <div>
            <strong>Precision:</strong><br />
            Unix timestamps are typically in seconds, but can be in milliseconds for higher precision.
          </div>
        </div>
      </div>
    </div>
  );
}
