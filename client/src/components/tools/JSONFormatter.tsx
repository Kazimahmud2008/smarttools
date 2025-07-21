import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const formatJSON = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter JSON data to format",
        variant: "destructive"
      });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
      setShowResult(true);
      
      toast({
        title: "Success",
        description: "JSON formatted successfully!"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
      setError(errorMessage);
      setShowResult(true);
      
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive"
      });
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter JSON data to minify",
        variant: "destructive"
      });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setShowResult(true);
      
      toast({
        title: "Success",
        description: "JSON minified successfully!"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
      setError(errorMessage);
      setShowResult(true);
      
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive"
      });
    }
  };

  const validateJSON = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter JSON data to validate",
        variant: "destructive"
      });
      return;
    }

    try {
      JSON.parse(input);
      setOutput('✅ Valid JSON');
      setError('');
      setShowResult(true);
      
      toast({
        title: "Success",
        description: "JSON is valid!"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
      setError(errorMessage);
      setOutput('');
      setShowResult(true);
      
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive"
      });
    }
  };

  const copyResult = () => {
    const textToCopy = error || output;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied!",
        description: "Result copied to clipboard"
      });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="json-input" className="text-sm font-medium text-slate-700 mb-2 block">
          Enter JSON data
        </Label>
        <Textarea
          id="json-input"
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "John", "age": 30, "city": "New York"}'
          className="w-full font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={formatJSON}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <i className="fas fa-indent mr-2"></i>
          Format JSON
        </Button>
        <Button 
          onClick={minifyJSON}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          <i className="fas fa-compress mr-2"></i>
          Minify JSON
        </Button>
        <Button 
          onClick={validateJSON}
          className="bg-purple-500 text-white hover:bg-purple-600"
        >
          <i className="fas fa-check mr-2"></i>
          Validate JSON
        </Button>
      </div>

      {showResult && (
        <div>
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-red-800 font-medium">JSON Error:</h4>
                <Button onClick={copyResult} size="sm" variant="outline">
                  <i className="fas fa-copy"></i>
                </Button>
              </div>
              <div className="text-red-600 text-sm font-mono">{error}</div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Result:</Label>
                <Button onClick={copyResult} size="sm" variant="outline">
                  <i className="fas fa-copy mr-2"></i>
                  Copy
                </Button>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap overflow-x-auto font-mono text-sm text-slate-800">
                  {output}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
