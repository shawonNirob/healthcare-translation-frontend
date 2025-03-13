// List of supported languages
export const LANGUAGES = [
  'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali',
  'Urdu', 'Swahili', 'English', 'Dutch', 'Turkish', 'Polish',
  'Romanian', 'Czech', 'Slovak', 'Hungarian'
];

// Languages with limited speech synthesis support
export const LIMITED_SUPPORT_LANGUAGES = ['Bengali', 'Urdu', 'Swahili', 'Hindi', 'Arabic'];

// Language codes mapping
export const LANGUAGE_CODES = {
  'English': 'en-US',
  'Spanish': 'es-ES',
  'French': 'fr-FR',
  'German': 'de-DE',
  'Italian': 'it-IT',
  'Portuguese': 'pt-PT',
  'Russian': 'ru-RU',
  'Chinese': 'zh-CN',
  'Japanese': 'ja-JP',
  'Korean': 'ko-KR',
  'Arabic': 'ar-SA',
  'Hindi': 'hi-IN',
  'Bengali': 'bn-IN',
  'Urdu': 'ur-PK',
  'Dutch': 'nl-NL',
  'Turkish': 'tr-TR',
  'Polish': 'pl-PL',
  'Romanian': 'ro-RO',
  'Czech': 'cs-CZ',
  'Slovak': 'sk-SK',
  'Hungarian': 'hu-HU',
  'Swahili': 'sw'
};

// Helper function to get language code
export const getLanguageCode = (language) => {
  return LANGUAGE_CODES[language] || 'en-US';
}; 