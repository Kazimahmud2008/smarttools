export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  gradient: string;
  tags: string[];
}

export const tools: Tool[] = [
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Create custom QR codes for URLs, text, WiFi, and more',
    icon: 'fas fa-qrcode',
    category: 'Generator',
    gradient: 'from-indigo-500 to-blue-500',
    tags: ['Free', 'Instant']
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure, random passwords with custom options',
    icon: 'fas fa-key',
    category: 'Security',
    gradient: 'from-green-500 to-emerald-500',
    tags: ['Secure', 'Random']
  },
  {
    id: 'text-converter',
    name: 'Text Case Converter',
    description: 'Convert text between UPPER, lower, Title, and camelCase',
    icon: 'fas fa-font',
    category: 'Text',
    gradient: 'from-purple-500 to-pink-500',
    tags: ['Text', 'Format']
  },
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    description: 'Count words, characters, paragraphs, and reading time',
    icon: 'fas fa-spell-check',
    category: 'Text',
    gradient: 'from-orange-500 to-red-500',
    tags: ['Analytics', 'Text']
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data',
    icon: 'fas fa-code',
    category: 'Developer',
    gradient: 'from-teal-500 to-cyan-500',
    tags: ['Developer', 'Format']
  },
  {
    id: 'lorem-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for designs and mockups',
    icon: 'fas fa-paragraph',
    category: 'Design',
    gradient: 'from-yellow-500 to-amber-500',
    tags: ['Design', 'Placeholder']
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings and files',
    icon: 'fas fa-exchange-alt',
    category: 'Developer',
    gradient: 'from-slate-500 to-gray-500',
    tags: ['Encoding', 'Developer']
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for safe web transmission',
    icon: 'fas fa-link',
    category: 'Web',
    gradient: 'from-blue-500 to-indigo-500',
    tags: ['Web', 'URL']
  },
  {
    id: 'html-converter',
    name: 'HTML Encoder/Decoder',
    description: 'Encode and decode HTML entities for safe display',
    icon: 'fab fa-html5',
    category: 'Web',
    gradient: 'from-orange-500 to-red-500',
    tags: ['HTML', 'Web']
  },
  {
    id: 'number-converter',
    name: 'Number Base Converter',
    description: 'Convert between binary, decimal, octal, and hex',
    icon: 'fas fa-hashtag',
    category: 'Math',
    gradient: 'from-pink-500 to-rose-500',
    tags: ['Math', 'Convert']
  },
  {
    id: 'epoch-converter',
    name: 'Epoch Time Converter',
    description: 'Convert between Unix timestamp and human time',
    icon: 'fas fa-clock',
    category: 'Time',
    gradient: 'from-emerald-500 to-teal-500',
    tags: ['Time', 'Unix']
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, ratios, and percentage changes',
    icon: 'fas fa-percent',
    category: 'Math',
    gradient: 'from-yellow-500 to-orange-500',
    tags: ['Math', 'Calculate']
  },
  {
    id: 'loan-calculator',
    name: 'Loan EMI Calculator',
    description: 'Calculate loan EMI, interest, and payment schedules',
    icon: 'fas fa-calculator',
    category: 'Finance',
    gradient: 'from-green-500 to-blue-500',
    tags: ['Finance', 'Loan']
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index and health recommendations',
    icon: 'fas fa-weight',
    category: 'Health',
    gradient: 'from-pink-500 to-rose-500',
    tags: ['Health', 'Calculator']
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate precise age, days lived, and next birthday',
    icon: 'fas fa-birthday-cake',
    category: 'Time',
    gradient: 'from-violet-500 to-purple-500',
    tags: ['Age', 'Time']
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between various units of measurement',
    icon: 'fas fa-ruler',
    category: 'Convert',
    gradient: 'from-indigo-500 to-purple-500',
    tags: ['Convert', 'Units']
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    icon: 'fas fa-thermometer-half',
    category: 'Convert',
    gradient: 'from-red-500 to-orange-500',
    tags: ['Convert', 'Science']
  },
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Set custom countdown timers for tasks and events',
    icon: 'fas fa-stopwatch',
    category: 'Time',
    gradient: 'from-emerald-500 to-cyan-500',
    tags: ['Timer', 'Productivity']
  },
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert time between different time zones',
    icon: 'fas fa-globe',
    category: 'Time',
    gradient: 'from-blue-500 to-teal-500',
    tags: ['Time', 'Timezone']
  },
  {
    id: 'utm-builder',
    name: 'UTM Link Builder',
    description: 'Create UTM tracking links for marketing campaigns',
    icon: 'fas fa-external-link-alt',
    category: 'Marketing',
    gradient: 'from-purple-500 to-indigo-500',
    tags: ['Marketing', 'UTM']
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    description: 'Reverse text character by character or word by word',
    icon: 'fas fa-undo',
    category: 'Text',
    gradient: 'from-slate-500 to-zinc-500',
    tags: ['Text', 'Reverse']
  },
  {
    id: 'coin-toss',
    name: 'Coin Toss Simulator',
    description: 'Flip virtual coins with heads or tails results',
    icon: 'fas fa-coins',
    category: 'Random',
    gradient: 'from-amber-500 to-yellow-500',
    tags: ['Random', 'Game']
  },
  {
    id: 'dice-roller',
    name: 'Dice Roller',
    description: 'Roll virtual dice with customizable sides and count',
    icon: 'fas fa-dice',
    category: 'Random',
    gradient: 'from-red-500 to-pink-500',
    tags: ['Random', 'Game']
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors and get HEX, RGB, HSL values',
    icon: 'fas fa-palette',
    category: 'Design',
    gradient: 'from-violet-500 to-purple-500',
    tags: ['Design', 'Colors']
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and validate regular expressions with sample text',
    icon: 'fas fa-search',
    category: 'Developer',
    gradient: 'from-indigo-500 to-blue-500',
    tags: ['Developer', 'Regex']
  },
  {
    id: 'number-to-words',
    name: 'Number to Words Converter',
    description: 'Convert numbers to written words in multiple languages',
    icon: 'fas fa-language',
    category: 'Convert',
    gradient: 'from-green-500 to-teal-500',
    tags: ['Convert', 'Language']
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to speech with voice options',
    icon: 'fas fa-volume-up',
    category: 'Audio',
    gradient: 'from-blue-500 to-cyan-500',
    tags: ['Audio', 'Speech']
  },
  {
    id: 'password-strength',
    name: 'Password Strength Checker',
    description: 'Check password strength and get security recommendations',
    icon: 'fas fa-shield-alt',
    category: 'Security',
    gradient: 'from-red-500 to-orange-500',
    tags: ['Security', 'Password']
  },
  {
    id: 'image-to-base64',
    name: 'Image to Base64 Converter',
    description: 'Convert images to Base64 encoded strings',
    icon: 'fas fa-image',
    category: 'Convert',
    gradient: 'from-purple-500 to-pink-500',
    tags: ['Image', 'Base64']
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tips and split bills among multiple people',
    icon: 'fas fa-receipt',
    category: 'Finance',
    gradient: 'from-green-500 to-emerald-500',
    tags: ['Finance', 'Tip']
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate discounts, sale prices, and savings',
    icon: 'fas fa-tags',
    category: 'Finance',
    gradient: 'from-orange-500 to-red-500',
    tags: ['Finance', 'Discount']
  },
  {
    id: 'word-frequency',
    name: 'Word Frequency Counter',
    description: 'Count word frequency and analyze text patterns',
    icon: 'fas fa-chart-bar',
    category: 'Text',
    gradient: 'from-teal-500 to-cyan-500',
    tags: ['Text', 'Analytics']
  },
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Generate SEO meta tags for websites',
    icon: 'fas fa-tags',
    category: 'SEO',
    gradient: 'from-indigo-500 to-purple-500',
    tags: ['SEO', 'Meta']
  },
  {
    id: 'wifi-qr-generator',
    name: 'WiFi QR Code Generator',
    description: 'Generate QR codes for WiFi network connections',
    icon: 'fas fa-wifi',
    category: 'Network',
    gradient: 'from-blue-500 to-teal-500',
    tags: ['WiFi', 'QR']
  },
  {
    id: 'random-number',
    name: 'Random Number Generator',
    description: 'Generate random numbers within custom ranges',
    icon: 'fas fa-dice',
    category: 'Random',
    gradient: 'from-emerald-500 to-teal-500',
    tags: ['Random', 'Numbers']
  }
];

export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: string): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(tools.map(tool => tool.category))];
};
