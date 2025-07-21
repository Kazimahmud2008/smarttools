export interface ToolSEO {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
}

export const toolSEOData: Record<string, ToolSEO> = {
  'qr-generator': {
    title: 'Free QR Code Generator Online - Create QR Codes Instantly | Smarttools',
    description: 'Generate QR codes for URLs, text, WiFi, and more. Free online QR code generator with custom sizes and formats. No registration required.',
    keywords: 'QR code generator, free QR codes, create QR code, QR generator online, WiFi QR code, URL QR code',
    canonicalUrl: 'https://smarttools.com/qr-code-generator'
  },
  'password-generator': {
    title: 'Secure Random Password Generator - Create Strong Passwords | Smarttools',
    description: 'Generate strong, secure random passwords with customizable options. Include uppercase, lowercase, numbers, and symbols. Free password generator tool.',
    keywords: 'password generator, random password, secure password, strong password generator, password creator, free password tool',
    canonicalUrl: 'https://smarttools.com/password-generator'
  },
  'text-converter': {
    title: 'Text Case Converter - UPPERCASE, lowercase, Title Case | Smarttools',
    description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Free online text case converter tool.',
    keywords: 'text case converter, uppercase converter, lowercase converter, title case, camelCase converter, text formatter',
    canonicalUrl: 'https://smarttools.com/text-case-converter'
  },
  'word-counter': {
    title: 'Word Counter & Character Counter - Count Text Statistics | Smarttools',
    description: 'Count words, characters, paragraphs, and sentences. Calculate reading time and text statistics. Free online word counter tool.',
    keywords: 'word counter, character counter, text counter, word count tool, reading time calculator, text statistics',
    canonicalUrl: 'https://smarttools.com/word-character-counter'
  },
  'json-formatter': {
    title: 'JSON Formatter & Validator - Format and Validate JSON Online | Smarttools',
    description: 'Format, validate, and beautify JSON data online. Free JSON formatter with syntax highlighting and error detection.',
    keywords: 'JSON formatter, JSON validator, JSON beautifier, format JSON, validate JSON, JSON parser',
    canonicalUrl: 'https://smarttools.com/json-formatter'
  },
  'lorem-generator': {
    title: 'Lorem Ipsum Generator - Generate Placeholder Text | Smarttools',
    description: 'Generate Lorem Ipsum placeholder text for your designs and mockups. Choose words, sentences, or paragraphs. Free lorem ipsum generator.',
    keywords: 'lorem ipsum generator, placeholder text, dummy text, lorem ipsum, text generator, design placeholder',
    canonicalUrl: 'https://smarttools.com/lorem-ipsum-generator'
  },
  'base64-encoder': {
    title: 'Base64 Encoder & Decoder - Encode and Decode Base64 Online | Smarttools',
    description: 'Encode and decode Base64 strings and files online. Free Base64 encoder/decoder tool with instant results.',
    keywords: 'base64 encoder, base64 decoder, encode base64, decode base64, base64 converter, base64 tool',
    canonicalUrl: 'https://smarttools.com/base64-encoder-decoder'
  },
  'url-encoder': {
    title: 'URL Encoder & Decoder - Encode and Decode URLs Online | Smarttools',
    description: 'Encode and decode URLs for safe web transmission. Free URL encoder/decoder tool for web developers.',
    keywords: 'URL encoder, URL decoder, encode URL, decode URL, URL converter, percent encoding',
    canonicalUrl: 'https://smarttools.com/url-encoder-decoder'
  },
  'bmi-calculator': {
    title: 'BMI Calculator - Calculate Body Mass Index Online | Smarttools',
    description: 'Calculate your Body Mass Index (BMI) with our free online calculator. Supports metric and imperial units with health recommendations.',
    keywords: 'BMI calculator, body mass index, BMI chart, health calculator, weight calculator, fitness calculator',
    canonicalUrl: 'https://smarttools.com/bmi-calculator'
  },
  'color-picker': {
    title: 'Color Picker - Get HEX, RGB, HSL Color Values | Smarttools',
    description: 'Pick colors and get their HEX, RGB, and HSL values. Free online color picker tool with color palette generator.',
    keywords: 'color picker, hex color picker, rgb color picker, color tool, color converter, color palette',
    canonicalUrl: 'https://smarttools.com/color-picker'
  }
};
