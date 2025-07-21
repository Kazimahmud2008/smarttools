import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getToolById } from '@/lib/tools';
import { toolSEOData } from '@/lib/seo';
import SEO from './SEO';

// Tool Components
import QRGenerator from './tools/QRGenerator';
import PasswordGenerator from './tools/PasswordGenerator';
import TextConverter from './tools/TextConverter';
import WordCounter from './tools/WordCounter';
import JSONFormatter from './tools/JSONFormatter';
import LoremGenerator from './tools/LoremGenerator';
import Base64Converter from './tools/Base64Converter';
import URLConverter from './tools/URLConverter';
import HTMLConverter from './tools/HTMLConverter';
import NumberConverter from './tools/NumberConverter';
import EpochConverter from './tools/EpochConverter';
import PercentageCalculator from './tools/PercentageCalculator';
import BMICalculator from './tools/BMICalculator';
import AgeCalculator from './tools/AgeCalculator';
import TemperatureConverter from './tools/TemperatureConverter';
import ColorPicker from './tools/ColorPicker';
import RandomNumber from './tools/RandomNumber';
import TextReverser from './tools/TextReverser';
import CountdownTimer from './tools/CountdownTimer';

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolId: string | null;
}

const toolComponents: Record<string, React.ComponentType> = {
  'qr-generator': QRGenerator,
  'password-generator': PasswordGenerator,
  'text-converter': TextConverter,
  'word-counter': WordCounter,
  'json-formatter': JSONFormatter,
  'lorem-generator': LoremGenerator,
  'base64-encoder': Base64Converter,
  'url-encoder': URLConverter,
  'html-converter': HTMLConverter,
  'number-converter': NumberConverter,
  'epoch-converter': EpochConverter,
  'percentage-calculator': PercentageCalculator,
  'bmi-calculator': BMICalculator,
  'age-calculator': AgeCalculator,
  'temperature-converter': TemperatureConverter,
  'color-picker': ColorPicker,
  'random-number': RandomNumber,
  'text-reverser': TextReverser,
  'countdown-timer': CountdownTimer,
};

export default function ToolModal({ isOpen, onClose, toolId }: ToolModalProps) {
  if (!toolId) return null;

  const tool = getToolById(toolId);
  const ToolComponent = toolComponents[toolId];
  const seoData = toolSEOData[toolId];

  if (!tool || !ToolComponent) return null;

  return (
    <>
      {seoData && (
        <SEO
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords}
          canonicalUrl={seoData.canonicalUrl}
        />
      )}
      
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <div className={`bg-gradient-to-r ${tool.gradient} p-2 rounded-lg`}>
                <i className={`${tool.icon} text-white text-lg`}></i>
              </div>
              <span>{tool.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-6">
            <ToolComponent />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
