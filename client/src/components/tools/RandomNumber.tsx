import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export default function RandomNumber() {
  const [minValue, setMinValue] = useState('1');
  const [maxValue, setMaxValue] = useState('100');
  const [count, setCount] = useState('1');
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [includeDecimals, setIncludeDecimals] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const generateRandomNumbers = () => {
    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);
    const cnt = parseInt(count);

    if (isNaN(min) || isNaN(max) || isNaN(cnt)) {
      toast({
        title: "Error",
        description: "Please enter valid numbers for all fields",
        variant: "destructive"
      });
      return;
    }

    if (min >= max) {
      toast({
        title: "Error",
        description: "Minimum value must be less than maximum value",
        variant: "destructive"
      });
      return;
    }

    if (cnt < 1 || cnt > 1000) {
      toast({
        title: "Error",
        description: "Count must be between 1 and 1000",
        variant: "destructive"
      });
      return;
    }

    if (!allowDuplicates && cnt > (max - min + 1) && !includeDecimals) {
      toast({
        title: "Error",
        description: "Cannot generate unique numbers: count exceeds available range",
        variant: "destructive"
      });
      return;
    }

    const numbers: number[] = [];
    const usedNumbers = new Set<number>();

    for (let i = 0; i < cnt; i++) {
      let number: number;
      let attempts = 0;
      const maxAttempts = 10000;

      do {
        if (includeDecimals) {
          number = Math.random() * (max - min) + min;
          number = Math.round(number * 100) / 100; // Round to 2 decimal places
        } else {
          number = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        attempts++;
      } while (!allowDuplicates && usedNumbers.has(number) && attempts < maxAttempts);

      if (attempts >= maxAttempts && !allowDuplicates && usedNumbers.has(number)) {
        break; // Unable to generate unique number
      }

      numbers.push(number);
      if (!allowDuplicates) {
        usedNumbers.add(number);
      }
    }

    setResults(numbers);
    setShowResults(true);

    const stats = {
      count: numbers.length,
      min: Math.min(...numbers),
      max: Math.max(...numbers),
      sum: numbers.reduce((a, b) => a + b, 0),
      avg: numbers.reduce((a, b) => a + b, 0) / numbers.length
    };

    toast({
      title: "Success",
      description: `Generated ${numbers.length} random numbers. Average: ${stats.avg.toFixed(2)}`
    });
  };

  const copyAllNumbers = () => {
    const text = results.join(', ');
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "All numbers copied to clipboard"
      });
    });
  };

  const copyAsArray = () => {
    const text = `[${results.join(', ')}]`;
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Numbers copied as array format"
      });
    });
  };

  const resetGenerator = () => {
    setResults([]);
    setShowResults(false);
  };

  const getStats = () => {
    if (results.length === 0) return null;
    
    return {
      count: results.length,
      min: Math.min(...results),
      max: Math.max(...results),
      sum: results.reduce((a, b) => a + b, 0),
      avg: results.reduce((a, b) => a + b, 0) / results.length
    };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <div className="bg-lime-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lime-800 mb-4">Random Number Generator</h3>
        <p className="text-lime-700 text-sm mb-6">
          Generate random numbers within your specified range with various options.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="min-value" className="text-sm font-medium text-slate-700 mb-2 block">
                Minimum Value
              </Label>
              <Input
                id="min-value"
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                step={includeDecimals ? "0.01" : "1"}
              />
            </div>

            <div>
              <Label htmlFor="max-value" className="text-sm font-medium text-slate-700 mb-2 block">
                Maximum Value
              </Label>
              <Input
                id="max-value"
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                step={includeDecimals ? "0.01" : "1"}
              />
            </div>

            <div>
              <Label htmlFor="count-value" className="text-sm font-medium text-slate-700 mb-2 block">
                Count
              </Label>
              <Input
                id="count-value"
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                min="1"
                max="1000"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allow-duplicates"
                checked={allowDuplicates}
                onCheckedChange={(checked) => setAllowDuplicates(!!checked)}
              />
              <Label htmlFor="allow-duplicates" className="text-sm text-slate-700">
                Allow Duplicates
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-decimals"
                checked={includeDecimals}
                onCheckedChange={(checked) => setIncludeDecimals(!!checked)}
              />
              <Label htmlFor="include-decimals" className="text-sm text-slate-700">
                Include Decimal Numbers
              </Label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={generateRandomNumbers}
              className="flex-1 bg-lime-600 text-white hover:bg-lime-700"
            >
              <i className="fas fa-dice mr-2"></i>
              Generate Random Numbers
            </Button>
            <Button 
              onClick={resetGenerator}
              variant="outline"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {showResults && results.length > 0 && (
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-800">Generated Numbers</h4>
            <div className="flex gap-2">
              <Button onClick={copyAllNumbers} size="sm" variant="outline">
                <i className="fas fa-copy mr-2"></i>
                Copy List
              </Button>
              <Button onClick={copyAsArray} size="sm" variant="outline">
                <i className="fas fa-brackets-curly mr-2"></i>
                Copy Array
              </Button>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg mb-4 max-h-64 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {results.map((number, index) => (
                <span
                  key={index}
                  className="bg-white px-3 py-1 rounded border text-sm font-mono"
                >
                  {number}
                </span>
              ))}
            </div>
          </div>

          {stats && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2">Statistics</h5>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div>
                  <div className="text-blue-600 font-medium">Count</div>
                  <div className="text-blue-800">{stats.count}</div>
                </div>
                <div>
                  <div className="text-blue-600 font-medium">Minimum</div>
                  <div className="text-blue-800">{stats.min}</div>
                </div>
                <div>
                  <div className="text-blue-600 font-medium">Maximum</div>
                  <div className="text-blue-800">{stats.max}</div>
                </div>
                <div>
                  <div className="text-blue-600 font-medium">Sum</div>
                  <div className="text-blue-800">{includeDecimals ? stats.sum.toFixed(2) : stats.sum}</div>
                </div>
                <div>
                  <div className="text-blue-600 font-medium">Average</div>
                  <div className="text-blue-800">{stats.avg.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Use Cases */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h4 className="font-semibold text-indigo-800 mb-2">Common Use Cases</h4>
        <div className="text-indigo-700 text-sm space-y-1">
          <p><strong>Games & Simulations:</strong> Dice rolls, card shuffling, random events</p>
          <p><strong>Testing & Development:</strong> Sample data generation, load testing</p>
          <p><strong>Education:</strong> Math problems, statistical exercises, probability experiments</p>
          <p><strong>Decision Making:</strong> Random selection, lottery numbers, sampling</p>
        </div>
      </div>
    </div>
  );
}
