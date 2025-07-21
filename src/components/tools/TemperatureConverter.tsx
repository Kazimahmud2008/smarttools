import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function TemperatureConverter() {
  const [input, setInput] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [results, setResults] = useState({
    celsius: '',
    fahrenheit: '',
    kelvin: ''
  });
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const convertTemperature = () => {
    const temp = parseFloat(input);
    
    if (isNaN(temp)) {
      if (input.trim() !== '') {
        toast({
          title: "Error",
          description: "Please enter a valid temperature value",
          variant: "destructive"
        });
      }
      return;
    }

    let celsius: number;
    
    // Convert input to Celsius first
    switch (fromUnit) {
      case 'celsius':
        celsius = temp;
        break;
      case 'fahrenheit':
        celsius = (temp - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = temp - 273.15;
        break;
      default:
        celsius = temp;
    }

    // Convert from Celsius to all units
    const fahrenheit = (celsius * 9/5) + 32;
    const kelvin = celsius + 273.15;

    setResults({
      celsius: celsius.toFixed(2),
      fahrenheit: fahrenheit.toFixed(2),
      kelvin: kelvin.toFixed(2)
    });
    
    setShowResults(true);
    
    if (input.trim() !== '') {
      toast({
        title: "Success",
        description: "Temperature converted successfully!"
      });
    }
  };

  // Auto-convert when input or unit changes
  useEffect(() => {
    convertTemperature();
  }, [input, fromUnit]);

  const copyResult = (value: string, unit: string) => {
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Copied!",
        description: `${value}° ${unit} copied to clipboard`
      });
    });
  };

  const resetConverter = () => {
    setInput('');
    setResults({ celsius: '', fahrenheit: '', kelvin: '' });
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-4">Temperature Converter</h3>
        <p className="text-red-700 text-sm mb-6">
          Convert between Celsius, Fahrenheit, and Kelvin temperature scales.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="temp-input" className="text-sm font-medium text-slate-700 mb-2 block">
                Temperature
              </Label>
              <Input
                id="temp-input"
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter temperature"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="temp-from" className="text-sm font-medium text-slate-700 mb-2 block">
                From
              </Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={convertTemperature}
              className="flex-1 bg-red-600 text-white hover:bg-red-700"
            >
              <i className="fas fa-thermometer-half mr-2"></i>
              Convert Temperature
            </Button>
            <Button 
              onClick={resetConverter}
              variant="outline"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {showResults && input && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Celsius (°C)</span>
              <Button 
                onClick={() => copyResult(results.celsius, 'Celsius')}
                size="sm" 
                variant="ghost"
              >
                <i className="fas fa-copy text-xs"></i>
              </Button>
            </div>
            <div className="text-3xl font-bold text-blue-600">{results.celsius}°</div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Fahrenheit (°F)</span>
              <Button 
                onClick={() => copyResult(results.fahrenheit, 'Fahrenheit')}
                size="sm" 
                variant="ghost"
              >
                <i className="fas fa-copy text-xs"></i>
              </Button>
            </div>
            <div className="text-3xl font-bold text-orange-600">{results.fahrenheit}°</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Kelvin (K)</span>
              <Button 
                onClick={() => copyResult(results.kelvin, 'Kelvin')}
                size="sm" 
                variant="ghost"
              >
                <i className="fas fa-copy text-xs"></i>
              </Button>
            </div>
            <div className="text-3xl font-bold text-purple-600">{results.kelvin}</div>
          </div>
        </div>
      )}

      {/* Temperature Reference Points */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-800 mb-3">Common Temperature References</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span>Absolute Zero:</span>
            <span className="font-medium">-273.15°C / -459.67°F / 0K</span>
          </div>
          <div className="flex justify-between">
            <span>Water Freezing:</span>
            <span className="font-medium">0°C / 32°F / 273.15K</span>
          </div>
          <div className="flex justify-between">
            <span>Room Temperature:</span>
            <span className="font-medium">20°C / 68°F / 293.15K</span>
          </div>
          <div className="flex justify-between">
            <span>Body Temperature:</span>
            <span className="font-medium">37°C / 98.6°F / 310.15K</span>
          </div>
          <div className="flex justify-between">
            <span>Water Boiling:</span>
            <span className="font-medium">100°C / 212°F / 373.15K</span>
          </div>
          <div className="flex justify-between">
            <span>Oven Temperature:</span>
            <span className="font-medium">200°C / 392°F / 473.15K</span>
          </div>
        </div>
      </div>

      {/* Conversion Formulas */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Conversion Formulas</h4>
        <div className="text-blue-700 text-sm space-y-1">
          <p><strong>Celsius to Fahrenheit:</strong> °F = (°C × 9/5) + 32</p>
          <p><strong>Fahrenheit to Celsius:</strong> °C = (°F - 32) × 5/9</p>
          <p><strong>Celsius to Kelvin:</strong> K = °C + 273.15</p>
          <p><strong>Kelvin to Celsius:</strong> °C = K - 273.15</p>
        </div>
      </div>
    </div>
  );
}
