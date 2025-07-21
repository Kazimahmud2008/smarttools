import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  description: string;
}

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const { toast } = useToast();

  const calculateBMI = () => {
    let weightKg: number;
    let heightM: number;

    try {
      if (unit === 'metric') {
        weightKg = parseFloat(weight);
        heightM = parseFloat(heightCm) / 100;
        
        if (isNaN(weightKg) || isNaN(heightM) || weightKg <= 0 || heightM <= 0) {
          throw new Error('Invalid input');
        }
      } else {
        const weightLb = parseFloat(weight);
        const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
        
        if (isNaN(weightLb) || isNaN(totalInches) || weightLb <= 0 || totalInches <= 0) {
          throw new Error('Invalid input');
        }
        
        weightKg = weightLb * 0.453592;
        heightM = totalInches * 0.0254;
      }

      const bmi = weightKg / (heightM * heightM);
      const bmiRounded = Math.round(bmi * 10) / 10;

      let category: string;
      let color: string;
      let description: string;

      if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-blue-600';
        description = 'Consider consulting with a healthcare provider about healthy weight gain strategies.';
      } else if (bmi < 25) {
        category = 'Normal weight';
        color = 'text-green-600';
        description = 'Great! You are in a healthy weight range for your height.';
      } else if (bmi < 30) {
        category = 'Overweight';
        color = 'text-yellow-600';
        description = 'Consider healthy diet and exercise to reach a normal weight range.';
      } else {
        category = 'Obese';
        color = 'text-red-600';
        description = 'Consider consulting with a healthcare provider about weight management strategies.';
      }

      setResult({
        bmi: bmiRounded,
        category,
        color,
        description
      });

      toast({
        title: "BMI Calculated",
        description: `Your BMI is ${bmiRounded} (${category})`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please enter valid weight and height values",
        variant: "destructive"
      });
    }
  };

  const resetCalculator = () => {
    setWeight('');
    setHeightCm('');
    setHeightFt('');
    setHeightIn('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-4">Calculate Your BMI</h3>
        <p className="text-blue-700 text-sm mb-6">
          Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adults.
        </p>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2 block">Unit System</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (kg/cm)</SelectItem>
                <SelectItem value="imperial">Imperial (lb/ft-in)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2 block">
                Weight ({unit === 'metric' ? 'kg' : 'lb'})
              </Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lb'}
                step="0.1"
              />
            </div>

            {unit === 'metric' ? (
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Height (cm)</Label>
                <Input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="Enter height in cm"
                  step="0.1"
                />
              </div>
            ) : (
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Height</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    placeholder="Feet"
                    min="0"
                  />
                  <Input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    placeholder="Inches"
                    min="0"
                    max="11"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculateBMI}
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
            >
              <i className="fas fa-calculator mr-2"></i>
              Calculate BMI
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
          <h4 className="text-xl font-bold text-center mb-6">Your BMI Results</h4>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{result.bmi}</div>
            <div className={`text-xl font-semibold ${result.color}`}>{result.category}</div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <p className="text-slate-700 text-center">{result.description}</p>
          </div>

          {/* BMI Categories Chart */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h5 className="font-semibold text-slate-800 mb-3">BMI Categories (Adults)</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-blue-100">
                <span>Underweight</span>
                <span className="font-medium text-blue-700">Below 18.5</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-green-100">
                <span>Normal weight</span>
                <span className="font-medium text-green-700">18.5 - 24.9</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-yellow-100">
                <span>Overweight</span>
                <span className="font-medium text-yellow-700">25 - 29.9</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-red-100">
                <span>Obese</span>
                <span className="font-medium text-red-700">30 and above</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Important Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="fas fa-exclamation-triangle text-amber-600 mt-1"></i>
          <div>
            <h4 className="font-semibold text-amber-800">Important Note</h4>
            <p className="text-amber-700 text-sm mt-1">
              BMI is a screening tool and not a diagnostic tool. It does not account for muscle mass, 
              bone density, overall body composition, and racial and sex differences. Consult with a 
              healthcare provider for a comprehensive health assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
