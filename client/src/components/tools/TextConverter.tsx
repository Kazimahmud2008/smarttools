import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function TextConverter() {
  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const convertCase = (caseType: string) => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to convert",
        variant: "destructive"
      });
      return;
    }

    let result: string;
    
    switch (caseType) {
      case 'upper':
        result = inputText.toUpperCase();
        break;
      case 'lower':
        result = inputText.toLowerCase();
        break;
      case 'title':
        result = inputText.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case 'camel':
        result = inputText.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, '');
        break;
      case 'snake':
        result = inputText.toLowerCase().replace(/\s+/g, '_');
        break;
      case 'kebab':
        result = inputText.toLowerCase().replace(/\s+/g, '-');
        break;
      default:
        result = inputText;
    }

    setConvertedText(result);
    setShowResult(true);
    
    toast({
      title: "Success",
      description: "Text converted successfully!"
    });
  };

  const copyText = () => {
    navigator.clipboard.writeText(convertedText).then(() => {
      toast({
        title: "Copied!",
        description: "Text copied to clipboard"
      });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="text-input" className="text-sm font-medium text-slate-700 mb-2 block">
          Enter your text
        </Label>
        <Textarea
          id="text-input"
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text here..."
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Button 
          onClick={() => convertCase('upper')}
          variant="outline"
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          UPPERCASE
        </Button>
        <Button 
          onClick={() => convertCase('lower')}
          variant="outline"
          className="bg-green-500 text-white hover:bg-green-600"
        >
          lowercase
        </Button>
        <Button 
          onClick={() => convertCase('title')}
          variant="outline"
          className="bg-purple-500 text-white hover:bg-purple-600"
        >
          Title Case
        </Button>
        <Button 
          onClick={() => convertCase('camel')}
          variant="outline"
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          camelCase
        </Button>
        <Button 
          onClick={() => convertCase('snake')}
          variant="outline"
          className="bg-teal-500 text-white hover:bg-teal-600"
        >
          snake_case
        </Button>
        <Button 
          onClick={() => convertCase('kebab')}
          variant="outline"
          className="bg-pink-500 text-white hover:bg-pink-600"
        >
          kebab-case
        </Button>
      </div>

      {showResult && (
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-2 block">
            Result
          </Label>
          <div className="relative">
            <Textarea
              value={convertedText}
              readOnly
              rows={5}
              className="w-full bg-slate-50"
            />
            <Button
              onClick={copyText}
              size="sm"
              className="absolute top-2 right-2 bg-indigo-500 text-white hover:bg-indigo-600"
            >
              <i className="fas fa-copy mr-2"></i>
              Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
