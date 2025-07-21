import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export default function LoremGenerator() {
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const generateLorem = () => {
    let output = '';
    
    if (type === 'words') {
      output = generateWords(count, startWithLorem);
    } else if (type === 'sentences') {
      output = generateSentences(count, startWithLorem);
    } else if (type === 'paragraphs') {
      output = generateParagraphs(count, startWithLorem);
    }
    
    setResult(output);
    setShowResult(true);
    
    toast({
      title: "Success",
      description: `${count} ${type} generated successfully!`
    });
  };

  const generateWords = (wordCount: number, withLorem: boolean): string => {
    let words = [];
    
    if (withLorem) {
      words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
      wordCount = Math.max(0, wordCount - 5);
    }
    
    for (let i = 0; i < wordCount; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    
    return words.join(' ') + '.';
  };

  const generateSentences = (sentenceCount: number, withLorem: boolean): string => {
    const sentences = [];
    
    for (let i = 0; i < sentenceCount; i++) {
      const sentenceLength = Math.floor(Math.random() * 10) + 8; // 8-18 words per sentence
      let words = [];
      
      if (i === 0 && withLorem) {
        words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
        for (let j = 5; j < sentenceLength; j++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
      } else {
        for (let j = 0; j < sentenceLength; j++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      }
      
      sentences.push(words.join(' ') + '.');
    }
    
    return sentences.join(' ');
  };

  const generateParagraphs = (paragraphCount: number, withLorem: boolean): string => {
    const paragraphs = [];
    
    for (let i = 0; i < paragraphCount; i++) {
      const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-7 sentences per paragraph
      const paragraph = generateSentences(sentenceCount, i === 0 && withLorem);
      paragraphs.push(paragraph);
    }
    
    return paragraphs.join('\n\n');
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: "Lorem ipsum text copied to clipboard"
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="lorem-type" className="text-sm font-medium text-slate-700 mb-2 block">
            Type
          </Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraphs">Paragraphs</SelectItem>
              <SelectItem value="sentences">Sentences</SelectItem>
              <SelectItem value="words">Words</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="lorem-count" className="text-sm font-medium text-slate-700 mb-2 block">
            Count
          </Label>
          <Input
            id="lorem-count"
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            min={1}
            max={50}
          />
        </div>
        
        <div className="flex items-end">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="start-with-lorem"
              checked={startWithLorem}
              onCheckedChange={(checked) => setStartWithLorem(!!checked)}
            />
            <Label htmlFor="start-with-lorem" className="text-sm text-slate-700">
              Start with "Lorem ipsum"
            </Label>
          </div>
        </div>
      </div>

      <Button 
        onClick={generateLorem}
        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:shadow-lg"
      >
        <i className="fas fa-paragraph mr-2"></i>
        Generate Lorem Ipsum
      </Button>

      {showResult && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium text-slate-700">Generated Text:</Label>
            <Button onClick={copyResult} size="sm" variant="outline">
              <i className="fas fa-copy mr-2"></i>
              Copy
            </Button>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg max-h-64 overflow-y-auto">
            <div className="whitespace-pre-wrap text-slate-800">{result}</div>
          </div>
        </div>
      )}
    </div>
  );
}
