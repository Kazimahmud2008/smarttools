import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Base64Converter() {
  const [encodeInput, setEncodeInput] = useState('');
  const [decodeInput, setDecodeInput] = useState('');
  const [encodeResult, setEncodeResult] = useState('');
  const [decodeResult, setDecodeResult] = useState('');
  const [decodeError, setDecodeError] = useState('');
  const { toast } = useToast();

  const encodeBase64 = () => {
    if (!encodeInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to encode",
        variant: "destructive"
      });
      return;
    }

    try {
      const encoded = btoa(encodeInput);
      setEncodeResult(encoded);
      
      toast({
        title: "Success",
        description: "Text encoded to Base64 successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text",
        variant: "destructive"
      });
    }
  };

  const decodeBase64 = () => {
    if (!decodeInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter Base64 string to decode",
        variant: "destructive"
      });
      return;
    }

    try {
      const decoded = atob(decodeInput.trim());
      setDecodeResult(decoded);
      setDecodeError('');
      
      toast({
        title: "Success",
        description: "Base64 decoded successfully!"
      });
    } catch (error) {
      setDecodeError('Invalid Base64 string');
      setDecodeResult('');
      
      toast({
        title: "Error",
        description: "Invalid Base64 string",
        variant: "destructive"
      });
    }
  };

  const copyEncoded = () => {
    navigator.clipboard.writeText(encodeResult).then(() => {
      toast({
        title: "Copied!",
        description: "Encoded text copied to clipboard"
      });
    });
  };

  const copyDecoded = () => {
    navigator.clipboard.writeText(decodeResult).then(() => {
      toast({
        title: "Copied!",
        description: "Decoded text copied to clipboard"
      });
    });
  };

  return (
    <div className="space-y-8">
      {/* Encode Section */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-4">Encode Text to Base64</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="encode-input" className="text-sm font-medium text-slate-700 mb-2 block">
              Enter text to encode
            </Label>
            <Textarea
              id="encode-input"
              rows={4}
              value={encodeInput}
              onChange={(e) => setEncodeInput(e.target.value)}
              placeholder="Enter text to encode..."
              className="w-full"
            />
          </div>
          
          <Button 
            onClick={encodeBase64}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <i className="fas fa-arrow-up mr-2"></i>
            Encode to Base64
          </Button>
          
          {encodeResult && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Encoded Result:</Label>
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
        <h3 className="font-semibold text-green-800 mb-4">Decode Base64 to Text</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="decode-input" className="text-sm font-medium text-slate-700 mb-2 block">
              Enter Base64 string to decode
            </Label>
            <Textarea
              id="decode-input"
              rows={4}
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              placeholder="Enter Base64 string to decode..."
              className="w-full font-mono"
            />
          </div>
          
          <Button 
            onClick={decodeBase64}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <i className="fas fa-arrow-down mr-2"></i>
            Decode from Base64
          </Button>
          
          {decodeResult && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Decoded Result:</Label>
                <Button onClick={copyDecoded} size="sm" variant="outline">
                  <i className="fas fa-copy"></i>
                </Button>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <div className="text-sm break-all text-slate-800">{decodeResult}</div>
              </div>
            </div>
          )}
          
          {decodeError && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <div className="text-red-600 text-sm font-medium">{decodeError}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
