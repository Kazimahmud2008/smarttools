import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function URLConverter() {
  const [encodeInput, setEncodeInput] = useState('');
  const [decodeInput, setDecodeInput] = useState('');
  const [encodeResult, setEncodeResult] = useState('');
  const [decodeResult, setDecodeResult] = useState('');
  const { toast } = useToast();

  const encodeURL = () => {
    if (!encodeInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter URL or text to encode",
        variant: "destructive"
      });
      return;
    }

    try {
      const encoded = encodeURIComponent(encodeInput);
      setEncodeResult(encoded);
      
      toast({
        title: "Success",
        description: "URL encoded successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode URL",
        variant: "destructive"
      });
    }
  };

  const decodeURL = () => {
    if (!decodeInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter encoded URL to decode",
        variant: "destructive"
      });
      return;
    }

    try {
      const decoded = decodeURIComponent(decodeInput);
      setDecodeResult(decoded);
      
      toast({
        title: "Success",
        description: "URL decoded successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid URL encoding",
        variant: "destructive"
      });
    }
  };

  const copyEncoded = () => {
    navigator.clipboard.writeText(encodeResult).then(() => {
      toast({
        title: "Copied!",
        description: "Encoded URL copied to clipboard"
      });
    });
  };

  const copyDecoded = () => {
    navigator.clipboard.writeText(decodeResult).then(() => {
      toast({
        title: "Copied!",
        description: "Decoded URL copied to clipboard"
      });
    });
  };

  return (
    <div className="space-y-8">
      {/* Encode Section */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-4">Encode URL</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="url-encode-input" className="text-sm font-medium text-slate-700 mb-2 block">
              Enter URL or text to encode
            </Label>
            <Textarea
              id="url-encode-input"
              rows={4}
              value={encodeInput}
              onChange={(e) => setEncodeInput(e.target.value)}
              placeholder="https://example.com/path with spaces & special chars"
              className="w-full"
            />
          </div>
          
          <Button 
            onClick={encodeURL}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <i className="fas fa-link mr-2"></i>
            Encode URL
          </Button>
          
          {encodeResult && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Encoded URL:</Label>
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
        <h3 className="font-semibold text-green-800 mb-4">Decode URL</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="url-decode-input" className="text-sm font-medium text-slate-700 mb-2 block">
              Enter encoded URL to decode
            </Label>
            <Textarea
              id="url-decode-input"
              rows={4}
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              placeholder="https%3A//example.com/path%20with%20spaces%20%26%20special%20chars"
              className="w-full font-mono"
            />
          </div>
          
          <Button 
            onClick={decodeURL}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <i className="fas fa-unlink mr-2"></i>
            Decode URL
          </Button>
          
          {decodeResult && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Decoded URL:</Label>
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
    </div>
  );
}
