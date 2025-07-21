import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function HTMLConverter() {
  const [encodeInput, setEncodeInput] = useState('');
  const [decodeInput, setDecodeInput] = useState('');
  const [encodeResult, setEncodeResult] = useState('');
  const [decodeResult, setDecodeResult] = useState('');
  const { toast } = useToast();

  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    ' ': '&nbsp;'
  };

  const decodeEntities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™'
  };

  const encodeHTML = () => {
    if (!encodeInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML or text to encode",
        variant: "destructive"
      });
      return;
    }

    let encoded = encodeInput;
    Object.entries(htmlEntities).forEach(([char, entity]) => {
      const regex = new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      encoded = encoded.replace(regex, entity);
    });

    setEncodeResult(encoded);
    
    toast({
      title: "Success",
      description: "HTML encoded successfully!"
    });
  };

  const decodeHTML = () => {
    if (!decodeInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML entities to decode",
        variant: "destructive"
      });
      return;
    }

    let decoded = decodeInput;
    Object.entries(decodeEntities).forEach(([entity, char]) => {
      const regex = new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      decoded = decoded.replace(regex, char);
    });

    // Handle numeric entities
    decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(dec);
    });

    // Handle hex entities
    decoded = decoded.replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });

    setDecodeResult(decoded);
    
    toast({
      title: "Success",
      description: "HTML decoded successfully!"
    });
  };

  const copyEncoded = () => {
    navigator.clipboard.writeText(encodeResult).then(() => {
      toast({
        title: "Copied!",
        description: "Encoded HTML copied to clipboard"
      });
    });
  };

  const copyDecoded = () => {
    navigator.clipboard.writeText(decodeResult).then(() => {
      toast({
        title: "Copied!",
        description: "Decoded HTML copied to clipboard"
      });
    });
  };

  return (
    <div className="space-y-8">
      {/* Encode Section */}
      <div className="bg-orange-50 p-6 rounded-lg">
        <h3 className="font-semibold text-orange-800 mb-4">Encode HTML Entities</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="html-encode-input" className="text-sm font-medium text-slate-700 mb-2 block">
              Enter HTML or text to encode
            </Label>
            <Textarea
              id="html-encode-input"
              rows={4}
              value={encodeInput}
              onChange={(e) => setEncodeInput(e.target.value)}
              placeholder='<div class="example">Hello & welcome to "HTML" encoding!</div>'
              className="w-full font-mono"
            />
          </div>
          
          <Button 
            onClick={encodeHTML}
            className="bg-orange-600 text-white hover:bg-orange-700"
          >
            <i className="fab fa-html5 mr-2"></i>
            Encode HTML
          </Button>
          
          {encodeResult && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Encoded HTML:</Label>
                <Button onClick={copyEncoded} size="sm" variant="outline">
                  <i className="fas fa-copy"></i>
                </Button>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <div className="font-mono text-sm break-all text-slate-800">{encodeResult}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decode Section */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-4">Decode HTML Entities</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="html-decode-input" className="text-sm font-medium text-slate-700 mb-2 block">
              Enter HTML entities to decode
            </Label>
            <Textarea
              id="html-decode-input"
              rows={4}
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              placeholder='&lt;div class=&quot;example&quot;&gt;Hello &amp; welcome to &quot;HTML&quot; encoding!&lt;/div&gt;'
              className="w-full font-mono"
            />
          </div>
          
          <Button 
            onClick={decodeHTML}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <i className="fas fa-code mr-2"></i>
            Decode HTML
          </Button>
          
          {decodeResult && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Decoded HTML:</Label>
                <Button onClick={copyDecoded} size="sm" variant="outline">
                  <i className="fas fa-copy"></i>
                </Button>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <div className="text-sm break-all text-slate-800">{decodeResult}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Common HTML Entities Reference */}
      <div className="bg-slate-50 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-800 mb-3">Common HTML Entities Reference:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <code>&amp;</code>
            <span>→</span>
            <code>&amp;amp;</code>
          </div>
          <div className="flex justify-between">
            <code>&lt;</code>
            <span>→</span>
            <code>&amp;lt;</code>
          </div>
          <div className="flex justify-between">
            <code>&gt;</code>
            <span>→</span>
            <code>&amp;gt;</code>
          </div>
          <div className="flex justify-between">
            <code>"</code>
            <span>→</span>
            <code>&amp;quot;</code>
          </div>
          <div className="flex justify-between">
            <code>'</code>
            <span>→</span>
            <code>&amp;#39;</code>
          </div>
          <div className="flex justify-between">
            <code>©</code>
            <span>→</span>
            <code>&amp;copy;</code>
          </div>
        </div>
      </div>
    </div>
  );
}
