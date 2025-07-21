import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function NumberConverter() {
  const [input, setInput] = useState('');
  const [inputBase, setInputBase] = useState('10');
  const [results, setResults] = useState({
    binary: '',
    decimal: '',
    octal: '',
    hex: ''
  });
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const convertNumber = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a number to convert",
        variant: "destructive"
      });
      return;
    }

    try {
      // Parse the input number from the specified base
      const decimalValue = parseInt(input.trim(), parseInt(inputBase));
      
      if (isNaN(decimalValue)) {
        throw new Error('Invalid number format');
      }

      // Convert to all bases
      const binary = decimalValue.toString(2);
      const decimal = decimalValue.toString(10);
      const octal = decimalValue.toString(8);
      const hex = decimalValue.toString(16).toUpperCase();

      setResults({ binary, decimal, octal, hex });
      setError('');
      setShowResults(true);
      
      toast({
        title: "Success",
        description: "Number converted successfully!"
      });
    } catch (err) {
      const errorMessage = `Invalid number for base ${inputBase}`;
      setError(errorMessage);
      setShowResults(false);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const copyResult = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Copied!",
        description: "Number copied to clipboard"
      });
    });
  };

  const baseExamples: Record<string, string> = {
    '2': 'e.g., 1010',
    '8': 'e.g., 755',
    '10': 'e.g., 42',
    '16': 'e.g., 2A'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="number-input" className="text-sm font-medium text-slate-700 mb-2 block">
            Enter a number
          </Label>
          <Input
            id="number-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={baseExamples[inputBase]}
            className="w-full font-mono"
          />
        </div>
        
        <div>
          <Label htmlFor="input-base" className="text-sm font-medium text-slate-700 mb-2 block">
            Input Base
          </Label>
          <Select value={inputBase} onValueChange={setInputBase}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">Binary (Base 2)</SelectItem>
              <SelectItem value="8">Octal (Base 8)</SelectItem>
              <SelectItem value="10">Decimal (Base 10)</SelectItem>
              <SelectItem value="16">Hexadecimal (Base 16)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={convertNumber}
        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg"
      >
        <i className="fas fa-hashtag mr-2"></i>
        Convert Number
      </Button>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">Conversion Error:</div>
          <div className="text-red-600 text-sm mt-1">{error}</div>
        </div>
      )}

      {showResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Binary (Base 2)</div>
              <Button 
                onClick={() => copyResult(results.binary)}
                size="sm"
                variant="ghost"
              >
                <i className="fas fa-copy"></i>
              </Button>
            </div>
            <div className="font-mono text-lg break-all text-blue-700 font-bold">{results.binary}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Decimal (Base 10)</div>
              <Button 
                onClick={() => copyResult(results.decimal)}
                size="sm"
                variant="ghost"
              >
                <i className="fas fa-copy"></i>
              </Button>
            </div>
            <div className="font-mono text-lg break-all text-green-700 font-bold">{results.decimal}</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Octal (Base 8)</div>
              <Button 
                onClick={() => copyResult(results.octal)}
                size="sm"
                variant="ghost"
              >
                <i className="fas fa-copy"></i>
              </Button>
            </div>
            <div className="font-mono text-lg break-all text-purple-700 font-bold">{results.octal}</div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Hexadecimal (Base 16)</div>
              <Button 
                onClick={() => copyResult(results.hex)}
                size="sm"
                variant="ghost"
              >
                <i className="fas fa-copy"></i>
              </Button>
            </div>
            <div className="font-mono text-lg break-all text-amber-700 font-bold">{results.hex}</div>
          </div>
        </div>
      )}

      {/* Base Information */}
      <div className="bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold text-slate-800 mb-2">Number Base Information:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600">
          <div><strong>Binary (Base 2):</strong> Uses digits 0-1</div>
          <div><strong>Octal (Base 8):</strong> Uses digits 0-7</div>
          <div><strong>Decimal (Base 10):</strong> Uses digits 0-9</div>
          <div><strong>Hexadecimal (Base 16):</strong> Uses 0-9, A-F</div>
        </div>
      </div>
    </div>
  );
}
