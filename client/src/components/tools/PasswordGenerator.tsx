import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export default function PasswordGenerator() {
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<{ level: string; color: string; score: number }>({
    level: '',
    color: '',
    score: 0
  });
  const { toast } = useToast();

  const generatePassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }

    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let newPassword = '';
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
    
    toast({
      title: "Success",
      description: "Password generated successfully!"
    });
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score += 25;
    if (pwd.length >= 12) score += 25;
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[A-Z]/.test(pwd)) score += 10;
    if (/[0-9]/.test(pwd)) score += 10;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20;

    let level: string, color: string;
    if (score < 30) {
      level = 'Weak';
      color = 'text-red-600';
    } else if (score < 60) {
      level = 'Fair';
      color = 'text-yellow-600';
    } else if (score < 80) {
      level = 'Good';
      color = 'text-blue-600';
    } else {
      level = 'Strong';
      color = 'text-green-600';
    }

    setStrength({ level, color, score: Math.min(score, 100) });
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast({
        title: "Copied!",
        description: "Password copied to clipboard"
      });
    });
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-slate-700 mb-4 block">
          Password Length: {length[0]}
        </Label>
        <Slider
          value={length}
          onValueChange={setLength}
          min={4}
          max={50}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-slate-600 mt-1">
          <span>4</span>
          <span>50</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="uppercase"
            checked={includeUppercase}
            onCheckedChange={(checked) => setIncludeUppercase(!!checked)}
          />
          <Label htmlFor="uppercase" className="text-slate-700">
            Include Uppercase Letters (A-Z)
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="lowercase"
            checked={includeLowercase}
            onCheckedChange={(checked) => setIncludeLowercase(!!checked)}
          />
          <Label htmlFor="lowercase" className="text-slate-700">
            Include Lowercase Letters (a-z)
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="numbers"
            checked={includeNumbers}
            onCheckedChange={(checked) => setIncludeNumbers(!!checked)}
          />
          <Label htmlFor="numbers" className="text-slate-700">
            Include Numbers (0-9)
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="symbols"
            checked={includeSymbols}
            onCheckedChange={(checked) => setIncludeSymbols(!!checked)}
          />
          <Label htmlFor="symbols" className="text-slate-700">
            Include Symbols (!@#$%)
          </Label>
        </div>
      </div>

      <Button 
        onClick={generatePassword}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg"
      >
        <i className="fas fa-key mr-2"></i>
        Generate Password
      </Button>

      {password && (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <code className="text-lg font-mono text-slate-800 break-all flex-1 mr-2">
                {password}
              </code>
              <Button
                onClick={copyPassword}
                size="sm"
                variant="outline"
                className="ml-2"
              >
                <i className="fas fa-copy"></i>
              </Button>
            </div>
          </div>
          
          {strength.level && (
            <div>
              <div className={`flex items-center justify-between text-sm font-medium ${strength.color}`}>
                <span>Password Strength: {strength.level}</span>
                <span>{strength.score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    strength.score < 30 ? 'bg-red-500' :
                    strength.score < 60 ? 'bg-yellow-500' :
                    strength.score < 80 ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${strength.score}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
