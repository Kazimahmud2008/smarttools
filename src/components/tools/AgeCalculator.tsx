import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: string;
  daysUntilBirthday: number;
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [calculateUntil, setCalculateUntil] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);
  const { toast } = useToast();

  const calculateAge = () => {
    if (!birthDate) {
      toast({
        title: "Error",
        description: "Please enter your birth date",
        variant: "destructive"
      });
      return;
    }

    try {
      const birth = new Date(birthDate);
      const today = calculateUntil ? new Date(calculateUntil) : new Date();
      
      if (birth > today) {
        toast({
          title: "Error",
          description: "Birth date cannot be in the future",
          variant: "destructive"
        });
        return;
      }

      // Calculate age
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      // Calculate totals
      const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      const totalHours = totalDays * 24;
      const totalMinutes = totalHours * 60;
      const totalSeconds = totalMinutes * 60;

      // Calculate next birthday
      const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }

      const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      setResult({
        years,
        months,
        days,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
        nextBirthday: nextBirthday.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        daysUntilBirthday
      });

      toast({
        title: "Age Calculated",
        description: `You are ${years} years, ${months} months, and ${days} days old`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid date format",
        variant: "destructive"
      });
    }
  };

  const resetCalculator = () => {
    setBirthDate('');
    setCalculateUntil('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-4">Calculate Your Age</h3>
        <p className="text-purple-700 text-sm mb-6">
          Enter your date of birth to calculate your exact age and other interesting statistics.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birth-date" className="text-sm font-medium text-slate-700 mb-2 block">
                Birth Date *
              </Label>
              <Input
                id="birth-date"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="calculate-until" className="text-sm font-medium text-slate-700 mb-2 block">
                Calculate Until (Optional)
              </Label>
              <Input
                id="calculate-until"
                type="date"
                value={calculateUntil}
                onChange={(e) => setCalculateUntil(e.target.value)}
                placeholder="Leave empty for today"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculateAge}
              className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
            >
              <i className="fas fa-birthday-cake mr-2"></i>
              Calculate Age
            </Button>
            <Button 
              onClick={resetCalculator}
              variant="outline"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-xl font-bold text-center mb-6">Age Calculation Results</h4>

          {/* Main Age Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600">{result.years}</div>
              <div className="text-sm text-blue-700">Years</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">{result.months}</div>
              <div className="text-sm text-green-700">Months</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600">{result.days}</div>
              <div className="text-sm text-purple-700">Days</div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <h5 className="font-semibold text-slate-800 mb-3">Detailed Statistics</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Days:</span>
                <span className="font-medium text-slate-800">{result.totalDays.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Hours:</span>
                <span className="font-medium text-slate-800">{result.totalHours.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Minutes:</span>
                <span className="font-medium text-slate-800">{result.totalMinutes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Seconds:</span>
                <span className="font-medium text-slate-800">{result.totalSeconds.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Birthday Information */}
          <div className="bg-amber-50 rounded-lg p-4">
            <h5 className="font-semibold text-amber-800 mb-3">Birthday Information</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-amber-700">Next Birthday:</span>
                <span className="font-medium text-amber-800">{result.nextBirthday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Days Until Birthday:</span>
                <span className="font-medium text-amber-800">
                  {result.daysUntilBirthday === 0 ? "Today! 🎉" : `${result.daysUntilBirthday} days`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fun Facts */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h4 className="font-semibold text-indigo-800 mb-2">Fun Age Facts</h4>
        <div className="text-indigo-700 text-sm space-y-1">
          <p>• Your heart beats approximately 2.5 billion times in your lifetime</p>
          <p>• You blink around 15-20 times per minute, or about 10 million times per year</p>
          <p>• You breathe approximately 20,000 times per day</p>
          <p>• Your brain processes about 70,000 thoughts per day</p>
        </div>
      </div>
    </div>
  );
}
