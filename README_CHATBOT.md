# ProRaahi Advanced Chatbot Integration

This document explains how to set up and run the advanced Dialogflow-powered chatbot for the ProRaahi tourism platform.

## Features

- 🌍 **Multilingual Support**: English, Hindi, Bengali, Odia, Urdu
- 🤖 **Google Dialogflow Integration**: Advanced NLP with fallback processing
- 🎤 **Voice Input/Output**: Speech-to-text and text-to-speech capabilities
- 🏛️ **Tourism-Specific**: Comprehensive Jharkhand tourism knowledge
- 📅 **Itinerary Planning**: Intelligent trip planning with cultural insights
- 🎨 **Warm UI Design**: Matches the touristy aesthetic of the platform

## Setup Instructions

### 1. Install Python Dependencies

\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 2. Google Cloud Setup (Optional but Recommended)

1. The service account credentials are already included in `credentials/service-account-key.json`
2. The Dialogflow project ID is: `mineral-droplet-472112-i4`
3. If you want to use your own Dialogflow project:
   - Create a new Google Cloud project
   - Enable the Dialogflow API
   - Create a service account and download the JSON key
   - Replace the credentials file
   - Update the `DIALOGFLOW_PROJECT_ID` in `.env`

### 3. Environment Configuration

Copy `.env.example` to `.env` and update the values:

\`\`\`bash
cp .env.example .env
\`\`\`

The chatbot will work with the existing configuration, but you can customize:
- `DIALOGFLOW_PROJECT_ID`: Your Dialogflow project ID
- `FLASK_PORT`: Port for the Flask backend (default: 5000)
- `FLASK_DEBUG`: Enable debug mode

### 4. Start the Chatbot Backend

Option A - Using the Python script:
\`\`\`bash
python scripts/start_chatbot.py
\`\`\`

Option B - Direct Flask run:
\`\`\`bash
python api/chatbot_service.py
\`\`\`

### 5. Start the Next.js Frontend

\`\`\`bash
npm run dev
\`\`\`

## How It Works

### Architecture

1. **Next.js Frontend**: React-based chat interface with warm, touristy design
2. **Flask Backend**: Python service handling Dialogflow integration
3. **Dialogflow**: Google's NLP service for intent recognition
4. **Fallback Processing**: Local intent processing when Dialogflow is unavailable

### API Flow

1. User sends message through Next.js chat interface
2. Next.js API route (`/api/chat`) receives the message
3. API route attempts to communicate with Flask backend (`localhost:5000/chat`)
4. Flask backend processes message through Dialogflow or fallback
5. Response is returned with tourism-specific information
6. Frontend displays response with TTS capability

### Multilingual Support

The chatbot supports 5 languages with:
- Language-specific responses
- Cultural context for each language
- Voice input/output in native languages
- Tourism information tailored to language preferences

## Troubleshooting

### Chatbot Not Responding
- Check if Flask backend is running on port 5000
- Verify Python dependencies are installed
- Check console logs for error messages

### Dialogflow Errors
- Verify Google Cloud credentials are valid
- Check if Dialogflow API is enabled
- The system will fallback to local processing if Dialogflow fails

### Voice Features Not Working
- Ensure browser supports Web Speech API
- Check microphone permissions
- Voice features work best in Chrome/Edge browsers

## Customization

### Adding New Intents
1. Add intent patterns to `process_intent_fallback()` function
2. Create response templates in the `RESPONSES` dictionary
3. Add multilingual keywords for intent detection

### Updating Tourism Data
1. Modify `JHARKHAND_ATTRACTIONS` dictionary
2. Update itinerary generation functions
3. Add new response templates for different languages

### Styling Customization
The chat interface uses the warm, touristy color scheme:
- Terracotta orange (`--color-primary`)
- Forest green (`--color-secondary`) 
- Golden yellow (`--color-accent`)
- Warm cream backgrounds

## Production Deployment

For production deployment:
1. Set `FLASK_ENV=production` and `FLASK_DEBUG=False`
2. Use a production WSGI server like Gunicorn
3. Set up proper logging and monitoring
4. Configure HTTPS for voice features
5. Consider using Google Cloud Run for the Flask backend

## Support

If you encounter issues:
1. Check the console logs in both Next.js and Flask
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Test the fallback mode by stopping the Flask backend
