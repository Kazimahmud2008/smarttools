import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    QRCode: any;
  }
}

export default function QRGenerator() {
  const [input, setInput] = useState('');
  const [size, setSize] = useState('300');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const { toast } = useToast();

  const generateQR = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter text or URL to generate QR code",
        variant: "destructive"
      });
      return;
    }

    try {
      // Using QR Server API for demo (in production, use QRCode.js library)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(input)}`;
      setQrCode(qrUrl);
      
      toast({
        title: "Success",
        description: "QR code generated successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive"
      });
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="qr-input" className="text-sm font-medium text-slate-700 mb-2 block">
          Enter text or URL
        </Label>
        <Textarea
          id="qr-input"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com or any text"
          className="w-full"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="qr-size" className="text-sm font-medium text-slate-700 mb-2 block">
            Size
          </Label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="200">200x200</SelectItem>
              <SelectItem value="300">300x300</SelectItem>
              <SelectItem value="400">400x400</SelectItem>
              <SelectItem value="500">500x500</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-2 block">
            Format
          </Label>
          <Select defaultValue="PNG">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PNG">PNG</SelectItem>
              <SelectItem value="JPG">JPG</SelectItem>
              <SelectItem value="SVG">SVG</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        onClick={generateQR}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg"
      >
        <i className="fas fa-qrcode mr-2"></i>
        Generate QR Code
      </Button>
      
      {qrCode && (
        <div className="text-center space-y-4">
          <div className="bg-slate-50 p-6 rounded-lg">
            <img src={qrCode} alt="QR Code" className="mx-auto rounded-lg shadow-lg" />
          </div>
          <Button 
            onClick={downloadQR}
            variant="outline"
            className="bg-green-500 text-white hover:bg-green-600"
          >
            <i className="fas fa-download mr-2"></i>
            Download QR Code
          </Button>
        </div>
      )}
    </div>
  );
}
