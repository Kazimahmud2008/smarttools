import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (inputText: string) => {
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    
    const sentences = inputText.trim() 
      ? inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length 
      : 0;
    
    const paragraphs = inputText.trim() 
      ? inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length 
      : 0;
    
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime
    });
  };

  const statCards = [
    { label: 'Characters', value: stats.characters, color: 'bg-blue-50 text-blue-600', icon: 'fas fa-font' },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces, color: 'bg-green-50 text-green-600', icon: 'fas fa-text-width' },
    { label: 'Words', value: stats.words, color: 'bg-purple-50 text-purple-600', icon: 'fas fa-spell-check' },
    { label: 'Sentences', value: stats.sentences, color: 'bg-orange-50 text-orange-600', icon: 'fas fa-paragraph' },
    { label: 'Paragraphs', value: stats.paragraphs, color: 'bg-pink-50 text-pink-600', icon: 'fas fa-align-left' },
    { label: 'Reading Time (min)', value: stats.readingTime, color: 'bg-teal-50 text-teal-600', icon: 'fas fa-clock' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="word-count-input" className="text-sm font-medium text-slate-700 mb-2 block">
          Enter your text
        </Label>
        <Textarea
          id="word-count-input"
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to get word and character count..."
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className={`${stat.color} p-4 rounded-lg text-center`}>
            <div className="flex items-center justify-center mb-2">
              <i className={`${stat.icon} text-xl`}></i>
            </div>
            <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
            <div className="text-sm opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>

      {text && (
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-700 mb-2">Text Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600">
            <div>Average words per sentence: {stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0}</div>
            <div>Average characters per word: {stats.words > 0 ? Math.round(stats.characters / stats.words) : 0}</div>
            <div>Longest word: {getLongestWord(text)}</div>
            <div>Most common word: {getMostCommonWord(text)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function getLongestWord(text: string): string {
  const words = text.replace(/[^\w\s]/g, '').split(/\s+/).filter(word => word.length > 0);
  return words.length > 0 ? words.reduce((a, b) => a.length > b.length ? a : b) : 'N/A';
}

function getMostCommonWord(text: string): string {
  const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(word => word.length > 2);
  const frequency: Record<string, number> = {};
  
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  const mostCommon = Object.entries(frequency).reduce((a, b) => a[1] > b[1] ? a : b, ['N/A', 0]);
  return mostCommon[0];
}
