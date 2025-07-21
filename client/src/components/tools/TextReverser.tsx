import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function TextReverser() {
  const [inputText, setInputText] = useState('');
  const [reversedText, setReversedText] = useState('');
  const [reverseType, setReverseType] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const reverseText = (type: string) => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to reverse",
        variant: "destructive"
      });
      return;
    }

    let result: string;
    
    switch (type) {
      case 'characters':
        result = inputText.split('').reverse().join('');
        break;
      case 'words':
        result = inputText.split(/\s+/).reverse().join(' ');
        break;
      case 'lines':
        result = inputText.split('\n').reverse().join('\n');
        break;
      case 'sentences':
        result = inputText.split(/[.!?]+/).filter(s => s.trim()).reverse().map(s => s.trim()).join('. ') + '.';
        break;
      default:
        result = inputText;
    }

    setReversedText(result);
    setReverseType(type);
    setShowResult(true);
    
    toast({
      title: "Success",
      description: `Text reversed by ${type} successfully!`
    });
  };

  const copyReversedText = () => {
    navigator.clipboard.writeText(reversedText).then(() => {
      toast({
        title: "Copied!",
        description: "Reversed text copied to clipboard"
      });
    });
  };

  const clearAll = () => {
    setInputText('');
    setReversedText('');
    setShowResult(false);
    setReverseType('');
  };

  const reverseOptions = [
    {
      type: 'characters',
      label: 'Reverse Characters',
      description: 'Reverse character by character',
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: 'fas fa-font'
    },
    {
      type: 'words',
      label: 'Reverse Words',
      description: 'Reverse word order',
      color: 'bg-green-500 hover:bg-green-600',
      icon: 'fas fa-spell-check'
    },
    {
      type: 'lines',
      label: 'Reverse Lines',
      description: 'Reverse line order',
      color: 'bg-purple-500 hover:bg-purple-600',
      icon: 'fas fa-align-left'
    },
    {
      type: 'sentences',
      label: 'Reverse Sentences',
      description: 'Reverse sentence order',
      color: 'bg-orange-500 hover:bg-orange-600',
      icon: 'fas fa-paragraph'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-lg">
        <h3 className="font-semibold text-slate-800 mb-4">Text Reverser</h3>
        <p className="text-slate-700 text-sm mb-6">
          Reverse your text in different ways - character by character, word by word, line by line, or sentence by sentence.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="reverse-input" className="text-sm font-medium text-slate-700 mb-2 block">
              Enter your text
            </Label>
            <Textarea
              id="reverse-input"
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reverseOptions.map((option) => (
              <Button
                key={option.type}
                onClick={() => reverseText(option.type)}
                className={`${option.color} text-white transition-colors flex items-center justify-start p-4 h-auto`}
              >
                <div className="flex items-center space-x-3">
                  <i className={`${option.icon} text-lg`}></i>
                  <div className="text-left">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs opacity-90">{option.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {inputText && (
            <Button 
              onClick={clearAll}
              variant="outline"
              className="w-full"
            >
              <i className="fas fa-trash mr-2"></i>
              Clear All
            </Button>
          )}
        </div>
      </div>

      {showResult && (
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-800">
              Reversed Text ({reverseType})
            </h4>
            <Button onClick={copyReversedText} size="sm" variant="outline">
              <i className="fas fa-copy mr-2"></i>
              Copy
            </Button>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="whitespace-pre-wrap font-mono text-slate-800 break-words">
              {reversedText}
            </div>
          </div>

          {/* Text Statistics */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded text-center">
              <div className="font-semibold text-blue-600">{reversedText.length}</div>
              <div className="text-blue-700">Characters</div>
            </div>
            <div className="bg-green-50 p-3 rounded text-center">
              <div className="font-semibold text-green-600">
                {reversedText.trim() ? reversedText.trim().split(/\s+/).length : 0}
              </div>
              <div className="text-green-700">Words</div>
            </div>
            <div className="bg-purple-50 p-3 rounded text-center">
              <div className="font-semibold text-purple-600">
                {reversedText.split('\n').length}
              </div>
              <div className="text-purple-700">Lines</div>
            </div>
            <div className="bg-orange-50 p-3 rounded text-center">
              <div className="font-semibold text-orange-600">
                {reversedText.trim() ? reversedText.split(/[.!?]+/).filter(s => s.trim()).length : 0}
              </div>
              <div className="text-orange-700">Sentences</div>
            </div>
          </div>
        </div>
      )}

      {/* Examples Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-3">Examples</h4>
        <div className="text-blue-700 text-sm space-y-2">
          <div>
            <strong>Original:</strong> "Hello World! How are you?"
          </div>
          <div>
            <strong>Characters:</strong> "?uoy era woH !dlroW olleH"
          </div>
          <div>
            <strong>Words:</strong> "you? are How World! Hello"
          </div>
          <div>
            <strong>Sentences:</strong> "How are you? Hello World!"
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-2">Common Use Cases</h4>
        <div className="text-green-700 text-sm space-y-1">
          <p><strong>Creative Writing:</strong> Create reversed text effects for artistic purposes</p>
          <p><strong>Puzzles & Games:</strong> Generate text puzzles or hidden messages</p>
          <p><strong>Data Processing:</strong> Reverse data strings for analysis or encryption</p>
          <p><strong>Fun & Entertainment:</strong> Create backwards challenges or social media content</p>
        </div>
      </div>
    </div>
  );
}
