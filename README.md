# Healthcare Translation Frontend

## Overview
The Healthcare Translation Frontend is a React-based web application designed to facilitate medical translation between multiple languages. It provides a user-friendly interface for healthcare professionals and patients to translate medical terminology and phrases with clinical precision, enhancing communication in multilingual healthcare settings.

## Features
- **Language Selection**: Choose from 22 languages including Spanish, French, German, Bengali, and more
- **Speech-to-Text**: Convert spoken words into text using browser's speech recognition
- **Real-Time Translation**: Instantly translate medical terms with enhanced clinical terminology
- **Text-to-Speech**: Listen to translations with proper pronunciation
- **Responsive Design**: Optimized for all devices from mobile phones to large desktop monitors
- **Manual Text Input**: Alternative text input for environments where speech recognition isn't available
- **Language Support Indicators**: Clear feedback about languages with limited speech synthesis support

## Live Demo
Access the live application at: [https://healthcare-translation-pi.vercel.app/](https://healthcare-translation-pi.vercel.app/)

## Technology Stack
- **React**: Frontend framework
- **CSS**: Custom styling with responsive design
- **Web Speech API**: For speech recognition and synthesis
- **Axios**: For API requests to the backend service

## Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Modern web browser with speech recognition support (Chrome recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shawonNirob/healthcare-translation-frontend.git
   cd healthcare-translation-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the application at `http://localhost:3000`.


## Environment Variables
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API URL | Yes | https://healthcare-translation-backend-production.up.railway.app |

## Deployment

### Deploying to Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel
   ```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `REACT_APP_API_URL` with your backend URL

### Other Deployment Options
- **Netlify**: Connect your GitHub repository or use the Netlify CLI
- **GitHub Pages**: Use `gh-pages` package to deploy from your repository
- **AWS Amplify**: Connect your repository for continuous deployment

## Usage Guide

### Basic Translation
1. Select your input and output languages from the dropdown menus
2. Either:
   - Click the "Speak" button and speak into your microphone
   - Type text in the input field and click "Translate"
3. View the translation in the output box

### Text-to-Speech
1. After translation is complete, click the speaker icon (🔊) next to the text
2. The application will read the text aloud in the appropriate language
3. Note: Some languages have limited speech synthesis support

### Tips for Best Results
- Speak clearly and at a moderate pace for better speech recognition
- Use medical terminology when possible for more accurate translations
- For languages with limited speech support, use the text input method
- Ensure your microphone permissions are enabled in your browser

## Browser Compatibility
- **Chrome**: Full support for all features
- **Edge**: Full support for all features
- **Firefox**: Limited speech recognition support
- **Safari**: Limited speech recognition support
- **Mobile browsers**: Varies by device and browser

## Troubleshooting

### Speech Recognition Issues
- Ensure microphone permissions are granted to the browser
- Check that your browser supports the Web Speech API
- Try using Chrome for best compatibility
- If speech recognition fails, use the text input as an alternative

### Translation Issues
- Verify the backend service is running
- Check your internet connection
- Ensure the API URL is correctly configured

### Display Issues
- Try refreshing the page
- Clear browser cache if styles appear incorrect
- Report any persistent UI issues via GitHub issues

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## Acknowledgements
- OpenAI for powering the translation backend
- Web Speech API for speech recognition and synthesis capabilities
- All contributors who have helped improve this project

---

*For questions or support, please open an issue on the [GitHub repository](https://github.com/shawonNirob/healthcare-translation-frontend).*
