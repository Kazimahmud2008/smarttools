import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [hexInput, setHexInput] = useState('#3B82F6');
  const [colorValues, setColorValues] = useState({
    hex: '#3B82F6',
    rgb: 'rgb(59, 130, 246)',
    hsl: 'hsl(217, 91%, 60%)',
    cmyk: 'cmyk(76%, 47%, 0%, 4%)'
  });
  const [palette, setPalette] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    updateColorValues(selectedColor);
    generatePalette(selectedColor);
  }, [selectedColor]);

  const updateColorValues = (color: string) => {
    try {
      // Convert hex to RGB
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // RGB
      const rgb = `rgb(${r}, ${g}, ${b})`;

      // HSL
      const [h, s, l] = rgbToHsl(r, g, b);
      const hsl = `hsl(${h}, ${s}%, ${l}%)`;

      // CMYK
      const [c, m, y, k] = rgbToCmyk(r, g, b);
      const cmyk = `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;

      setColorValues({
        hex: color.toUpperCase(),
        rgb,
        hsl,
        cmyk
      });

      setHexInput(color.toUpperCase());
    } catch (error) {
      // Handle invalid color
    }
  };

  const updateFromHex = (hexValue: string) => {
    setHexInput(hexValue);
    
    if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
      setSelectedColor(hexValue);
    }
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

    return [
      Math.round(c * 100),
      Math.round(m * 100),
      Math.round(y * 100),
      Math.round(k * 100)
    ];
  };

  const generatePalette = (baseColor: string) => {
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const colors = [];
    
    // Lighter shades
    for (let i = 0.8; i >= 0.2; i -= 0.2) {
      const nr = Math.round(r + (255 - r) * i);
      const ng = Math.round(g + (255 - g) * i);
      const nb = Math.round(b + (255 - b) * i);
      colors.push(`#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`);
    }

    // Base color
    colors.push(baseColor);

    // Darker shades
    for (let i = 0.2; i <= 0.8; i += 0.2) {
      const nr = Math.round(r * (1 - i));
      const ng = Math.round(g * (1 - i));
      const nb = Math.round(b * (1 - i));
      colors.push(`#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`);
    }

    setPalette(colors);
  };

  const copyColorValue = (format: string) => {
    const value = colorValues[format as keyof typeof colorValues];
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Copied!",
        description: `${format.toUpperCase()} value copied to clipboard`
      });
    });
  };

  const selectPaletteColor = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="space-y-6">
      <div className="bg-rose-50 p-6 rounded-lg">
        <h3 className="font-semibold text-rose-800 mb-4">Color Picker</h3>
        <p className="text-rose-700 text-sm mb-6">
          Pick colors and get their values in different formats (HEX, RGB, HSL, CMYK).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="color-picker" className="text-sm font-medium text-slate-700 mb-2 block">
              Pick a Color
            </Label>
            <div className="relative">
              <input
                type="color"
                id="color-picker"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full h-20 border border-gray-300 rounded-lg cursor-pointer"
              />
              <div 
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{ backgroundColor: selectedColor }}
              ></div>
            </div>
          </div>

          <div>
            <Label htmlFor="hex-input" className="text-sm font-medium text-slate-700 mb-2 block">
              Or Enter HEX Color
            </Label>
            <Input
              id="hex-input"
              type="text"
              value={hexInput}
              onChange={(e) => updateFromHex(e.target.value)}
              placeholder="#FFFFFF"
              className="font-mono"
            />
            <div className="mt-2 text-xs text-slate-600">
              Enter a valid hex color (e.g., #FF5733)
            </div>
          </div>
        </div>
      </div>

      {/* Color Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">HEX</div>
            <Button 
              onClick={() => copyColorValue('hex')}
              size="sm" 
              variant="ghost"
            >
              <i className="fas fa-copy text-xs"></i>
            </Button>
          </div>
          <div className="font-mono font-bold text-slate-800">{colorValues.hex}</div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">RGB</div>
            <Button 
              onClick={() => copyColorValue('rgb')}
              size="sm" 
              variant="ghost"
            >
              <i className="fas fa-copy text-xs"></i>
            </Button>
          </div>
          <div className="font-mono font-bold text-slate-800">{colorValues.rgb}</div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">HSL</div>
            <Button 
              onClick={() => copyColorValue('hsl')}
              size="sm" 
              variant="ghost"
            >
              <i className="fas fa-copy text-xs"></i>
            </Button>
          </div>
          <div className="font-mono font-bold text-slate-800">{colorValues.hsl}</div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">CMYK</div>
            <Button 
              onClick={() => copyColorValue('cmyk')}
              size="sm" 
              variant="ghost"
            >
              <i className="fas fa-copy text-xs"></i>
            </Button>
          </div>
          <div className="font-mono font-bold text-slate-800">{colorValues.cmyk}</div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-semibold text-slate-800 mb-3">Color Palette Generator</h4>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {palette.map((color, index) => (
            <div
              key={index}
              className="aspect-square rounded cursor-pointer border-2 border-transparent hover:border-slate-400 transition-all"
              style={{ backgroundColor: color }}
              onClick={() => selectPaletteColor(color)}
              title={color}
            ></div>
          ))}
        </div>
      </div>

      {/* Color Preview */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold text-slate-800 mb-4">Color Preview</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="w-full h-32 rounded-lg border" style={{ backgroundColor: selectedColor }}></div>
            <div className="text-center mt-2 text-sm text-slate-600">Solid Color</div>
          </div>
          <div>
            <div 
              className="w-full h-32 rounded-lg border bg-gradient-to-r"
              style={{ 
                backgroundImage: `linear-gradient(45deg, ${selectedColor}, white)` 
              }}
            ></div>
            <div className="text-center mt-2 text-sm text-slate-600">Gradient to White</div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Usage Examples</h4>
        <div className="text-blue-700 text-sm space-y-1">
          <p><strong>CSS:</strong> color: {colorValues.hex}; or background-color: {colorValues.rgb};</p>
          <p><strong>HTML:</strong> &lt;div style="color: {colorValues.hex}"&gt;</p>
          <p><strong>Design:</strong> Use HEX values for digital designs, CMYK for print materials</p>
        </div>
      </div>
    </div>
  );
}
