import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function PercentageCalculator() {
  const [results, setResults] = useState({
    percentOf: '',
    whatPercent: '',
    percentChange: '',
    percentIncrease: ''
  });
  const { toast } = useToast();

  const calculatePercentOf = (percent: string, number: string) => {
    const p = parseFloat(percent);
    const n = parseFloat(number);
    
    if (isNaN(p) || isNaN(n)) {
      toast({
        title: "Error",
        description: "Please enter valid numbers",
        variant: "destructive"
      });
      return;
    }
    
    const result = (p / 100) * n;
    setResults(prev => ({ ...prev, percentOf: result.toString() }));
    
    toast({
      title: "Success",
      description: `${p}% of ${n} = ${result}`
    });
  };

  const calculateWhatPercent = (number: string, total: string) => {
    const n = parseFloat(number);
    const t = parseFloat(total);
    
    if (isNaN(n) || isNaN(t) || t === 0) {
      toast({
        title: "Error",
        description: "Please enter valid numbers (total cannot be zero)",
        variant: "destructive"
      });
      return;
    }
    
    const result = (n / t) * 100;
    setResults(prev => ({ ...prev, whatPercent: result.toFixed(2) + '%' }));
    
    toast({
      title: "Success",
      description: `${n} is ${result.toFixed(2)}% of ${t}`
    });
  };

  const calculatePercentChange = (oldValue: string, newValue: string) => {
    const old = parseFloat(oldValue);
    const newVal = parseFloat(newValue);
    
    if (isNaN(old) || isNaN(newVal) || old === 0) {
      toast({
        title: "Error",
        description: "Please enter valid numbers (old value cannot be zero)",
        variant: "destructive"
      });
      return;
    }
    
    const result = ((newVal - old) / old) * 100;
    const changeType = result >= 0 ? 'increase' : 'decrease';
    setResults(prev => ({ 
      ...prev, 
      percentChange: `${Math.abs(result).toFixed(2)}% ${changeType}` 
    }));
    
    toast({
      title: "Success",
      description: `${Math.abs(result).toFixed(2)}% ${changeType} from ${old} to ${newVal}`
    });
  };

  const calculatePercentIncrease = (baseNumber: string, percentChange: string) => {
    const base = parseFloat(baseNumber);
    const percent = parseFloat(percentChange);
    
    if (isNaN(base) || isNaN(percent)) {
      toast({
        title: "Error",
        description: "Please enter valid numbers",
        variant: "destructive"
      });
      return;
    }
    
    const result = base + (base * percent / 100);
    setResults(prev => ({ ...prev, percentIncrease: result.toString() }));
    
    toast({
      title: "Success",
      description: `${base} ${percent >= 0 ? '+' : ''}${percent}% = ${result}`
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* What is X% of Y? */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-4">What is X% of Y?</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-1 block">Percentage</Label>
                <Input 
                  id="percent1" 
                  type="number" 
                  placeholder="25" 
                  step="any"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-1 block">Number</Label>
                <Input 
                  id="number1" 
                  type="number" 
                  placeholder="200" 
                  step="any"
                />
              </div>
            </div>
            <Button 
              onClick={() => {
                const percent = (document.getElementById('percent1') as HTMLInputElement).value;
                const number = (document.getElementById('number1') as HTMLInputElement).value;
                calculatePercentOf(percent, number);
              }}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Calculate
            </Button>
            {results.percentOf && (
              <div className="bg-white p-3 rounded border">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Result:</div>
                    <div className="font-bold text-lg text-blue-700">{results.percentOf}</div>
                  </div>
                  <Button onClick={() => copyResult(results.percentOf)} size="sm" variant="outline">
                    <i className="fas fa-copy"></i>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* X is what % of Y? */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-4">X is what % of Y?</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-1 block">Number</Label>
                <Input 
                  id="number2" 
                  type="number" 
                  placeholder="50" 
                  step="any"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-1 block">Total</Label>
                <Input 
                  id="total2" 
                  type="number" 
                  placeholder="200" 
                  step="any"
                />
              </div>
            </div>
            <Button 
              onClick={() => {
                const number = (document.getElementById('number2') as HTMLInputElement).value;
                const total = (document.getElementById('total2') as HTMLInputElement).value;
                calculateWhatPercent(number, total);
              }}
              className="w-full bg-green-600 text-white hover:bg-green-700"
            >
              Calculate
            </Button>
            {results.whatPercent && (
              <div className="bg-white p-3 rounded border">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Result:</div>
                    <div className="font-bold text-lg text-green-700">{results.whatPercent}</div>
                  </div>
                  <Button onClick={() => copyResult(results.whatPercent)} size="sm" variant="outline">
                    <i className="fas fa-copy"></i>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Percentage Change */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-4">Percentage Change</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-1 block">Old Value</Label>
                <Input 
                  id="old-value" 
                  type="number" 
                  placeholder="100" 
                  step="any"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-1 block">New Value</Label>
                <Input 
                  id="new-value" 
                  type="number" 
                  placeholder="120" 
                  step="any"
                />
              </div>
            </div>
            <Button 
              onClick={() => {
                const oldValue = (document.getElementById('old-value') as HTMLInputElement).value;
                const newValue = (document.getElementById('new-value') as HTMLInputElement).value;
                calculatePercentChange(oldValue, newValue);
              }}
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
            >
              Calculate
            </Button>
            {results.percentChange && (
              <div className="bg-white p-3 rounded border">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Result:</div>
                    <div className="font-bold text-lg text-purple-700">{results.percentChange}</div>
                  </div>
                  <Button onClick={() => copyResult(results.percentChange)} size="sm" variant="outline">
                    <i className="fas fa-copy"></i>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Percentage Increase/Decrease */}
        <div className="bg-amber-50 p-6 rounded-lg">
          <h3 className="font-semibold text-amber-800 mb-4">Percentage Increase/Decrease</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-1 block">Base Number</Label>
                <Input 
                  id="base-number" 
                  type="number" 
                  placeholder="100" 
                  step="any"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-1 block">Percentage (+ or -)</Label>
                <Input 
                  id="percent-change" 
                  type="number" 
                  placeholder="20" 
                  step="any"
                />
              </div>
            </div>
            <Button 
              onClick={() => {
                const baseNumber = (document.getElementById('base-number') as HTMLInputElement).value;
                const percentChange = (document.getElementById('percent-change') as HTMLInputElement).value;
                calculatePercentIncrease(baseNumber, percentChange);
              }}
              className="w-full bg-amber-600 text-white hover:bg-amber-700"
            >
              Calculate
            </Button>
            {results.percentIncrease && (
              <div className="bg-white p-3 rounded border">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Result:</div>
                    <div className="font-bold text-lg text-amber-700">{results.percentIncrease}</div>
                  </div>
                  <Button onClick={() => copyResult(results.percentIncrease)} size="sm" variant="outline">
                    <i className="fas fa-copy"></i>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-slate-50 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-800 mb-3">Quick Reference & Examples</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <strong>Percentage of a number:</strong><br />
            25% of 200 = (25 ÷ 100) × 200 = 50
          </div>
          <div>
            <strong>What percent:</strong><br />
            50 is what % of 200? = (50 ÷ 200) × 100 = 25%
          </div>
          <div>
            <strong>Percentage change:</strong><br />
            From 100 to 120 = ((120-100) ÷ 100) × 100 = 20% increase
          </div>
          <div>
            <strong>Percentage increase:</strong><br />
            100 + 20% = 100 + (100 × 0.20) = 120
          </div>
        </div>
      </div>
    </div>
  );
}
