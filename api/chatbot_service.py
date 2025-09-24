from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import json
import requests
from google.cloud import dialogflow
from google.oauth2 import service_account
import uuid
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration - Load from environment variables
DIALOGFLOW_PROJECT_ID = os.getenv('DIALOGFLOW_PROJECT_ID', 'mineral-droplet-472112-i4')
DIALOGFLOW_SESSION_ID = "default-session"
DIALOGFLOW_LANGUAGE_CODE = "en"  # Default language
GOOGLE_APPLICATION_CREDENTIALS = os.getenv('GOOGLE_APPLICATION_CREDENTIALS', 'credentials/service-account-key.json')

# Initialize Dialogflow client
session_client = None
session_path = None

try:
    if os.path.exists(GOOGLE_APPLICATION_CREDENTIALS):
        # Initialize with service account credentials
        credentials = service_account.Credentials.from_service_account_file(GOOGLE_APPLICATION_CREDENTIALS)
        session_client = dialogflow.SessionsClient(credentials=credentials)
        session_path = session_client.session_path(DIALOGFLOW_PROJECT_ID, DIALOGFLOW_SESSION_ID)
        print("✅ Dialogflow client initialized successfully")
        print(f"📋 Project ID: {DIALOGFLOW_PROJECT_ID}")
    else:
        print("⚠️ Dialogflow credentials not found")
        print("🔄 Running in fallback mode - local intent processing only")
        print(f"📁 Looking for credentials at: {GOOGLE_APPLICATION_CREDENTIALS}")
except Exception as e:
    print(f"❌ Error initializing Dialogflow client: {e}")
    print("🔄 Falling back to local intent processing")
    session_client = None

# Sample tourism data for Jharkhand
JHARKHAND_ATTRACTIONS = {
    'nature': [
        {'name': 'Netarhat', 'description': 'Queen of Chotanagpur, beautiful hill station'},
        {'name': 'Betla National Park', 'description': 'Wildlife sanctuary with tigers and elephants'},
        {'name': 'Hundru Falls', 'description': '98m high waterfall near Ranchi'},
        {'name': 'Dassam Falls', 'description': 'Beautiful waterfall perfect for nature lovers'},
    ],
    'cultural': [
        {'name': 'Jagannath Temple Ranchi', 'description': 'Replica of Puri Jagannath Temple'},
        {'name': 'Rajrappa Temple', 'description': 'Ancient temple dedicated to Goddess Chinnamasta'},
        {'name': 'Tribal Museum Ranchi', 'description': 'Rich tribal heritage and culture'},
        {'name': 'Pahari Mandir', 'description': 'Temple on hilltop with panoramic views'},
    ],
    'adventure': [
        {'name': 'Rock Garden Ranchi', 'description': 'Adventure activities and boating'},
        {'name': 'Tagore Hill', 'description': 'Trekking and scenic views'},
        {'name': 'Kanke Dam', 'description': 'Water sports and picnic spot'},
    ]
}

# Multilingual response templates
RESPONSES = {
    'en': {
        'greeting': 'Hello! Welcome to Jharkhand Tourism Assistant. How can I help you explore the beautiful state of Jharkhand? 🌿',
        'help': 'I can help you with:\n• Tourist places and attractions\n• Plan customized itineraries\n• Cultural and heritage sites\n• Eco-tourism and wildlife\n• Local information and tips\n\nJust ask me anything about Jharkhand!',
        'default': "I'm here to help you explore Jharkhand! Ask me about tourist places, plan itineraries, or get local information.",
        'cultural': 'Jharkhand is rich in tribal culture and heritage:\n\n🏛️ Cultural Attractions:\n• Jagannath Temple Ranchi - Replica of Puri temple\n• Rajrappa Temple - Ancient Chinnamasta temple\n• Tribal Museum Ranchi - Showcases tribal heritage\n• Pahari Mandir - Hilltop temple with panoramic views\n• Sun Temple Bundu - Ancient sun worship site\n\n🎭 Cultural Experiences:\n• Tribal dance performances\n• Traditional handicraft workshops\n• Local festivals and fairs\n• Authentic tribal cuisine\n\nWould you like to plan a cultural heritage tour?',
        'eco_tourism': 'Jharkhand offers amazing eco-tourism experiences:\n\n🌿 Eco-Tourism Destinations:\n• Betla National Park - Tigers, elephants, wildlife safari\n• Palamau Tiger Reserve - Rich biodiversity\n• Hazaribagh Wildlife Sanctuary - Bird watching paradise\n• Dalma Wildlife Sanctuary - Elephant reserve\n• Koderma Wildlife Sanctuary - Rock formations\n\n🏞️ Natural Attractions:\n• Hundru Falls - 98m spectacular waterfall\n• Dassam Falls - Beautiful cascade\n• Hirni Falls - Hidden gem for nature lovers\n• Netarhat - Queen of Chotanagpur plateau\n\nPerfect for nature photography and wildlife enthusiasts!'
    },
    'hi': {
        'greeting': 'नमस्ते! झारखंड पर्यटन सहायक में आपका स्वागत है। मैं झारखंड राज्य की खोज में आपकी कैसे सहायता कर सकता हूँ? 🌿',
        'help': 'मैं आपकी इन चीजों में सहायता कर सकता हूँ:\n• पर्यटन स्थल और आकर्षण\n• व्यक्तिगत यात्रा योजना\n• सांस्कृतिक और विरासत स्थल\n• पारिस्थितिकी पर्यटन और वन्यजीव\n• स्थानीय जानकारी और सुझाव\n\nझारखंड के बारे में कुछ भी पूछें!',
        'default': 'मैं झारखंड की खोज में आपकी सहायता के लिए यहाँ हूँ! पर्यटन स्थलों, यात्रा योजना या स्थानीय जानकारी के बारे में पूछें।',
        'cultural': 'झारखंड आदिवासी संस्कृति और विरासत से भरपूर है:\n\n🏛️ सांस्कृतिक आकर्षण:\n• जगन्नाथ मंदिर रांची - पुरी मंदिर की प्रतिकृति\n• राजरप्पा मंदिर - प्राचीन छिन्नमस्ता मंदिर\n• आदिवासी संग्रहालय रांची - आदिवासी विरासत\n• पहाड़ी मंदिर - पहाड़ी पर स्थित मंदिर\n\n🎭 सांस्कृतिक अनुभव:\n• आदिवासी नृत्य प्रदर्शन\n• पारंपरिक हस्तशिल्प कार्यशाला\n• स्थानीय त्योहार और मेले\n\nक्या आप सांस्कृतिक यात्रा की योजना बनाना चाहेंगे?',
        'eco_tourism': 'झारखंड में अद्भुत पारिस्थितिकी पर्यटन:\n\n🌿 पारिस्थितिकी स्थल:\n• बेतला राष्ट्रीय उद्यान - बाघ, हाथी, वन्यजीव सफारी\n• पलामू टाइगर रिजर्व - समृद्ध जैव विविधता\n• हजारीबाग वन्यजीव अभयारण्य - पक्षी देखने के लिए\n\n🏞️ प्राकृतिक आकर्षण:\n• हुंडरू फॉल्स - 98 मीटर का शानदार झरना\n• दशम फॉल्स - सुंदर झरना\n• नेतरहाट - छोटानागपुर की रानी'
    },
    'bn': {
        'greeting': 'নমস্কার! ঝাড়খণ্ড পর্যটন সহায়কে আপনাকে স্বাগতম। ঝাড়খণ্ড রাজ্যের অন্বেষণে আমি কীভাবে সাহায্য করতে পারি? 🌿',
        'help': 'আমি এই বিষয়গুলিতে সাহায্য করতে পারি:\n• পর্যটন স্থান ও আকর্ষণ\n• ব্যক্তিগত ভ্রমণ পরিকল্পনা\n• সাংস্কৃতিক ও ঐতিহ্য স্থান\n• পরিবেশ পর্যটন ও বন্যপ্রাণী\n• স্থানীয় তথ্য ও পরামর্শ\n\nঝাড়খণ্ড সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন!',
        'default': 'আমি ঝাড়খণ্ড অন্বেষণে আপনাকে সাহায্য করার জন্য এখানে আছি! পর্যটন স্থান, ভ্রমণ পরিকল্পনা বা স্থানীয় তথ্য সম্পর্কে জিজ্ঞাসা করুন।',
        'cultural': 'ঝাড়খণ্ড উপজাতীয় সংস্কৃতি ও ঐতিহ্যে সমৃদ্ধ:\n\n🏛️ সাংস্কৃতিক আকর্ষণ:\n• জগন্নাথ মন্দির রাঁচি - পুরী মন্দিরের প্রতিরূপ\n• রাজরাপ্পা মন্দির - প্রাচীন ছিন্নমস্তা মন্দির\n• উপজাতীয় জাদুঘর রাঁচি - উপজাতীয় ঐতিহ্য\n\n🎭 সাংস্কৃতিক অভিজ্ঞতা:\n• উপজাতীয় নৃত্য পরিবেশনা\n• ঐতিহ্যবাহী হস্তশিল্প কর্মশালা\n• স্থানীয় উৎসব ও মেলা',
        'eco_tourism': 'ঝাড়খণ্ডে অসাধারণ পরিবেশ পর্যটন:\n\n🌿 পরিবেশ পর্যটন গন্তব্য:\n• বেতলা জাতীয় উদ্যান - বাघ, হাতি, বন্যপ্রাণী সাফারি\n• পালামৌ টাইগার রিজার্ভ - সমৃদ্ধ জীববৈচিত্র্য\n• হাজারিবাগ বন্যপ্রাণী অভয়ারণ্য - পাখি দেখার স্বর্গ\n\n🏞️ প্রাকৃতিক আকর্ষণ:\n• হুন্দ্রু জলপ্রপাত - ৯৮ মিটার দর্শনীয় জলপ্রপাত\n• দশম জলপ্রপাত - সুন্দর জলপ্রপাত'
    }
}

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    """Handle text-based chat messages via Dialogflow"""
    try:
        data = request.json
        user_message = data.get('message', '')
        language = data.get('language', 'en')
        
        # Map language codes for Dialogflow
        language_map = {
            'en': 'en-US',
            'hi': 'hi',
            'bn': 'bn',
            'or': 'or',
            'ur': 'ur'
        }
        
        dialogflow_language = language_map.get(language, 'en-US')
        
        # Use Dialogflow if available, otherwise use fallback
        if session_client is not None:
            print(f"🤖 Processing with Dialogflow: '{user_message}' (Language: {dialogflow_language})")
            response_text = query_dialogflow(user_message, dialogflow_language)
        else:
            print(f"🔄 Processing with fallback: '{user_message}' (Language: {language})")
            response_text = process_intent_fallback(user_message, language)
        
        return jsonify({
            'success': True,
            'response': response_text,
            'language': language,
            'processing_mode': 'dialogflow' if session_client else 'fallback'
        })
    except Exception as e:
        print(f"❌ Chat error: {e}")
        return jsonify({'success': False, 'error': str(e)})

def query_dialogflow(message, language_code):
    """Query Dialogflow for intent recognition and response"""
    try:
        # Create session path with unique session ID for each query
        session_id = str(uuid.uuid4())
        current_session_path = session_client.session_path(DIALOGFLOW_PROJECT_ID, session_id)
        
        # Create text input
        text_input = dialogflow.TextInput(text=message, language_code=language_code)
        query_input = dialogflow.QueryInput(text=text_input)
        
        # Send request to Dialogflow
        response = session_client.detect_intent(
            request={"session": current_session_path, "query_input": query_input}
        )
        
        # Log the response for debugging
        print(f"🎯 Dialogflow Intent: {response.query_result.intent.display_name}")
        print(f"📝 Dialogflow Response: {response.query_result.fulfillment_text[:100]}...")
        
        # Check if we got a response from Dialogflow
        if response.query_result.fulfillment_text:
            return response.query_result.fulfillment_text
        else:
            # If no response from Dialogflow, use fallback
            print("⚠️ No response from Dialogflow, using fallback")
            return process_intent_fallback(message, language_code[:2])
        
    except Exception as e:
        print(f"❌ Dialogflow error: {e}")
        # Fallback to local processing
        return process_intent_fallback(message, language_code[:2] if '-' in language_code else language_code)

def process_intent_fallback(user_message, language='en'):
    """Fallback intent processing when Dialogflow is not available"""
    user_message_lower = user_message.lower()
    
    # Greeting intent
    if any(word in user_message_lower for word in ['hello', 'hi', 'hey', 'namaste', 'namaskar', 'নমস্কার', 'ନମସ୍କାର', 'السلام']):
        return get_greeting_response(language)
    
    # Tourist places intent
    elif any(word in user_message_lower for word in ['places', 'tourist', 'visit', 'attraction', 'spots', 'पर्यटन', 'স্থান', 'ପର୍ଯ୍ୟଟନ', 'مقامات']):
        return get_tourist_places_response(language)
    
    # Itinerary planning intent
    elif any(word in user_message_lower for word in ['plan', 'itinerary', 'trip', 'tour', 'day', 'योजना', 'পরিকল্পনা', 'ଯୋଜନା', 'منصوبہ']):
        return plan_itinerary(user_message, language)
    
    # Cultural information intent
    elif any(word in user_message_lower for word in ['cultural', 'culture', 'heritage', 'tribal', 'temple', 'सांस्कृतिक', 'সংস্কৃতি', 'ସଂସ୍କୃତି', 'ثقافت']):
        return get_cultural_info(language)
    
    # Eco tourism intent
    elif any(word in user_message_lower for word in ['eco', 'nature', 'wildlife', 'forest', 'falls', 'प्राकृतिक', 'প্রকৃতি', 'ପ୍ରକୃତি', 'قدرتی']):
        return get_eco_tourism_info(language)
    
    # Help intent
    elif any(word in user_message_lower for word in ['help', 'assist', 'support', 'मदद', 'সাহায্য', 'ସାହାଯ୍ୟ', 'مدد']):
        return get_help_response(language)
    
    # Default response
    else:
        return get_default_response(language)

def get_greeting_response(language):
    return RESPONSES.get(language, RESPONSES['en'])['greeting']

def get_help_response(language):
    return RESPONSES.get(language, RESPONSES['en'])['help']

def get_default_response(language):
    return RESPONSES.get(language, RESPONSES['en'])['default']

def get_cultural_info(language):
    return RESPONSES.get(language, RESPONSES['en'])['cultural']

def get_eco_tourism_info(language):
    return RESPONSES.get(language, RESPONSES['en'])['eco_tourism']

def get_tourist_places_response(language='en'):
    """Generate response about tourist places based on language"""
    if language == 'hi':
        return """🌿 झारखंड के प्रमुख पर्यटन स्थल:

प्राकृतिक सुंदरता:
• नेतरहाट - छोटानागपुर की रानी
• हुंडरू फॉल्स - 98 मीटर ऊंचा झरना
• दशम फॉल्स - प्राकृतिक सुंदरता
• बेतला राष्ट्रीय उद्यान - वन्यजीव सफारी

🏛️ सांस्कृतिक स्थल:
• जगन्नाथ मंदिर रांची
• राजरप्पा मंदिर
• आदिवासी संग्रहालय
• पहाड़ी मंदिर

🏔️ रोमांच:
• रॉक गार्डन रांची
• टैगोर हिल - ट्रेकिंग
• कांके डैम - जल क्रीड़ा

किसी विशेष स्थान के बारे में जानना चाहेंगे?"""

    elif language == 'bn':
        return """🌿 ঝাড়খণ্ডের প্রধান পর্যটন স্থান:

প্রাকৃতিক সৌন্দর্য:
• নেতরহাট - ছোটনাগপুরের রানী
• হুন্দ্রু জলপ্রপাত - ৯৮ মিটার উঁচু
• দশম জলপ্রপাত - প্রাকৃতিক সৌন্দর্য
• বেতলা জাতীয় উদ্যান - বন্যপ্রাণী সাফারি

🏛️ সাংস্কৃতিক স্থান:
• জগন্নাথ মন্দির রাঁচি
• রাজরাপ্পা মন্দির
• উপজাতীয় জাদুঘর
• পাহাড়ী মন্দির

🏔️ অ্যাডভেঞ্চার:
• রক গার্ডেন রাঁচি
• ট্যাগোর হিল - ট্রেকিং
• কাঁকে বাঁধ - জল ক্রীড়া

কোন বিশেষ স্থান সম্পর্কে জানতে চান?"""

    else:  # Default English
        return """🌿 Popular Tourist Attractions in Jharkhand:

🌲 Nature & Eco-Tourism:
• Netarhat - Queen of Chotanagpur, beautiful hill station
• Betla National Park - Wildlife sanctuary with tigers and elephants
• Hundru Falls - 98m high spectacular waterfall near Ranchi
• Dassam Falls - Beautiful cascade perfect for nature lovers
• Hirni Falls - Hidden gem in serene surroundings

🏛️ Cultural Heritage Sites:
• Jagannath Temple Ranchi - Replica of famous Puri Jagannath Temple
• Rajrappa Temple - Ancient temple dedicated to Goddess Chinnamasta
• Tribal Museum Ranchi - Showcases rich tribal heritage and culture
• Pahari Mandir - Temple on hilltop with panoramic city views
• Sun Temple Bundu - Ancient architectural marvel

🏔️ Adventure & Activities:
• Rock Garden Ranchi - Adventure activities and boating
• Tagore Hill - Perfect for trekking and scenic photography
• Kanke Dam - Water sports and family picnic spot
• Jonha Falls - Rock climbing and nature walks

Would you like detailed information about any specific attraction or plan a customized itinerary?"""

def plan_itinerary(user_message, language='en'):
    """Generate itinerary based on user input and language"""
    
    # Extract information from user message
    days = extract_days(user_message)
    interests = extract_interests(user_message)
    
    if not days:
        if language == 'hi':
            return "यात्रा योजना बनाने के लिए कृपया बताएं:\n• कितने दिन की यात्रा?\n• आपकी रुचि (प्रकृति/सांस्कृतिक/साहसिक)?\n• बजट रेंज?\n\nउदाहरण: '3 दिन की प्राकृतिक यात्रा की योजना बनाएं'"
        elif language == 'bn':
            return "ভ্রমণ পরিকল্পনা তৈরি করতে দয়া করে বলুন:\n• কতদিনের ভ্রমণ?\n• আপনার আগ্রহ (প্রকৃতি/সাংস্কৃতিক/দুঃসাহসিক)?\n• বাজেট সীমা?\n\nউদাহরণ: '৩ দিনের প্রকৃতি ভ্রমণ পরিকল্পনা করুন'"
        else:
            return "To plan your perfect Jharkhand itinerary, please tell me:\n• Number of days?\n• Your interests (nature/cultural/adventure)?\n• Budget range?\n\nExample: 'Plan a 3 day nature trip'"
    
    # Generate itinerary based on language
    if language == 'hi':
        return generate_hindi_itinerary(days, interests)
    elif language == 'bn':
        return generate_bengali_itinerary(days, interests)
    else:
        return generate_english_itinerary(days, interests)

def generate_english_itinerary(days, interests):
    """Generate English itinerary"""
    itinerary = f"🗓️ {days}-Day Jharkhand Itinerary:\n\n"
    
    if days >= 1:
        itinerary += "📅 Day 1: Ranchi Exploration\n"
        itinerary += "• Morning: Visit Hundru Falls (98m waterfall)\n"
        itinerary += "• Afternoon: Rock Garden - boating and adventure activities\n"
        itinerary += "• Evening: Pahari Mandir for panoramic sunset views\n"
        itinerary += "• Night: Stay in Ranchi city\n\n"
    
    if days >= 2:
        itinerary += "📅 Day 2: Cultural Heritage Tour\n"
        itinerary += "• Morning: Jagannath Temple - architectural marvel\n"
        itinerary += "• Afternoon: Tribal Museum - rich cultural heritage\n"
        itinerary += "• Evening: Local market shopping for tribal handicrafts\n"
        itinerary += "• Night: Cultural folk dance performance\n\n"
    
    if days >= 3:
        itinerary += "📅 Day 3: Netarhat Hill Station\n"
        itinerary += "• Early morning: Drive to Netarhat (Queen of Chotanagpur)\n"
        itinerary += "• Morning: Sunrise point experience\n"
        itinerary += "• Afternoon: Nature walks and local tribal village visit\n"
        itinerary += "• Evening: Sunset point with panoramic valley views\n\n"
    
    if days >= 4:
        itinerary += "📅 Day 4: Wildlife Safari\n"
        itinerary += "• Morning: Betla National Park safari\n"
        itinerary += "• Afternoon: Wildlife photography and nature walks\n"
        itinerary += "• Evening: Campfire and traditional dinner\n\n"
    
    if days >= 5:
        itinerary += "📅 Day 5: Adventure & Departure\n"
        itinerary += "• Morning: Dassam Falls - nature photography\n"
        itinerary += "• Afternoon: Tagore Hill trekking\n"
        itinerary += "• Evening: Return journey with memories\n\n"
    
    # Add travel tips
    itinerary += "💡 Travel Tips:\n"
    itinerary += "• Best time: October to March (pleasant weather)\n"
    itinerary += "• Carry comfortable trekking shoes\n"
    itinerary += "• Try local tribal cuisine (Handia, Thekua)\n"
    itinerary += "• Book forest accommodations in advance\n"
    itinerary += "• Respect tribal customs and traditions\n\n"
    
    itinerary += "🎯 Estimated Budget: ₹8,000-15,000 per person\n"
    itinerary += "📞 Need help with bookings or more details? Just ask!"
    
    return itinerary

def generate_hindi_itinerary(days, interests):
    """Generate Hindi itinerary"""
    itinerary = f"🗓️ {days}-दिन झारखंड यात्रा योजना:\n\n"
    
    if days >= 1:
        itinerary += "📅 दिन 1: रांची अन्वेषण\n"
        itinerary += "• सुबह: हुंडरू फॉल्स (98 मीटर झरना) देखें\n"
        itinerary += "• दोपहर: रॉक गार्डन - नौका विहार और रोमांचक गतिविधियां\n"
        itinerary += "• शाम: पहाड़ी मंदिर से सूर्यास्त का नजारा\n"
        itinerary += "• रात: रांची शहर में ठहरें\n\n"
    
    if days >= 2:
        itinerary += "📅 दिन 2: सांस्कृतिक विरासत यात्रा\n"
        itinerary += "• सुबह: जगन्नाथ मंदिर - वास्तुकला का नमूना\n"
        itinerary += "• दोपहर: आदिवासी संग्रहालय - समृद्ध सांस्कृतिक विरासत\n"
        itinerary += "• शाम: स्थानीय बाजार में आदिवासी हस्तशिल्प खरीदारी\n"
        itinerary += "• रात: सांस्कृतिक लोक नृत्य प्रदर्शन\n\n"
    
    if days >= 3:
        itinerary += "📅 दिन 3: नेतरहाट हिल स्टेशन\n"
        itinerary += "• सुबह जल्दी: नेतरहाट की यात्रा (छोटानागपुर की रानी)\n"
        itinerary += "• सुबह: सूर्योदय बिंदु का अनुभव\n"
        itinerary += "• दोपहर: प्रकृति सैर और स्थानीय आदिवासी गांव भ्रमण\n"
        itinerary += "• शाम: सूर्यास्त बिंदु से घाटी का नजारा\n\n"
    
    # Add travel tips in Hindi
    itinerary += "💡 यात्रा सुझाव:\n"
    itinerary += "• सबसे अच्छा समय: अक्टूबर से मार्च (सुहावना मौसम)\n"
    itinerary += "• आरामदायक ट्रेकिंग जूते ले जाएं\n"
    itinerary += "• स्थानीय आदिवासी भोजन का स्वाद लें\n"
    itinerary += "• वन विश्राम गृह पहले से बुक करें\n\n"
    
    itinerary += "🎯 अनुमानित बजट: ₹8,000-15,000 प्रति व्यक्ति\n"
    itinerary += "📞 बुकिंग या अधिक जानकारी चाहिए? बस पूछें!"
    
    return itinerary

def generate_bengali_itinerary(days, interests):
    """Generate Bengali itinerary"""
    itinerary = f"🗓️ {days}-দিন ঝাড়খণ্ড ভ্রমণ পরিকল্পনা:\n\n"
    
    if days >= 1:
        itinerary += "📅 দিন ১: রাঁচি অন্বেষণ\n"
        itinerary += "• সকাল: হুন্দ্রু জলপ্রপাত (৯৮ মিটার) দেখুন\n"
        itinerary += "• বিকাল: রক গার্ডেন - নৌকা বিহার ও অ্যাডভেঞ্চার\n"
        itinerary += "• সন্ধ্যা: পাহাড়ী মন্দির থেকে সূর্যাস্ত\n"
        itinerary += "• রাত: রাঁচি শহরে থাকুন\n\n"
    
    if days >= 2:
        itinerary += "📅 দিন ২: সাংস্কৃতিক ঐতিহ্য ভ্রমণ\n"
        itinerary += "• সকাল: জগন্নাথ মন্দির - স্থাপত্য নিদর্শন\n"
        itinerary += "• বিকাল: উপজাতীয় জাদুঘর - সমৃদ্ধ সাংস্কৃতিক ঐতিহ্য\n"
        itinerary += "• সন্ধ্যা: স্থানীয় বাজারে উপজাতীয় হস্তশিল্প কেনাকাটা\n"
        itinerary += "• রাত: সাংস্কৃতিক লোকনৃত্য পরিবেশনা\n\n"
    
    if days >= 3:
        itinerary += "📅 দিন ৩: নেতরহাট পাহাড়ী স্টেশন\n"
        itinerary += "• ভোর: নেতরহাট যাত্রা (ছোটনাগপুরের রানী)\n"
        itinerary += "• সকাল: সূর্যোদয় বিন্দুর অভিজ্ঞতা\n"
        itinerary += "• বিকাল: প্রকৃতি হাঁটা ও স্থানীয় উপজাতীয় গ্রাম ভ্রমণ\n"
        itinerary += "• সন্ধ্যা: সূর্যাস্ত বিন্দু থেকে উপত্যকার দৃশ্য\n\n"
    
    # Add travel tips in Bengali
    itinerary += "💡 ভ্রমণ পরামর্শ:\n"
    itinerary += "• সবচেয়ে ভাল সময়: অক্টোবর থেকে মার্চ (মনোরম আবহাওয়া)\n"
    itinerary += "• আরামদায়ক ট্রেকিং জুতা নিয়ে যান\n"
    itinerary += "• স্থানীয় উপজাতীয় খাবারের স্বাদ নিন\n"
    itinerary += "• বন বিশ্রামাগার আগে থেকে বুক করুন\n\n"
    
    itinerary += "🎯 আনুমানিক বাজেট: ₹৮,০০০-১৫,০০০ প্রতি ব্যক্তি\n"
    itinerary += "📞 বুকিং বা আরও তথ্য প্রয়োজন? শুধু জিজ্ঞাসা করুন!"
    
    return itinerary

def extract_days(message):
    """Extract number of days from user message"""
    import re
    # Look for patterns like "3 day", "5 days", "তিন দিন", "3 दिन"
    day_patterns = [
        r'(\d+)\s*(?:day|days)',
        r'(\d+)\s*(?:দিন|দিনের)',
        r'(\d+)\s*(?:दिन|दिनों)',
    ]
    
    for pattern in day_patterns:
        match = re.search(pattern, message.lower())
        if match:
            return int(match.group(1))
    
    # Look for word numbers
    word_to_num = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'ek': 1, 'do': 2, 'teen': 3, 'char': 4, 'panch': 5,
        'এক': 1, 'দুই': 2, 'তিন': 3, 'চার': 4, 'পাঁচ': 5
    }
    
    for word, num in word_to_num.items():
        if word in message.lower():
            return num
    
    return None

def extract_interests(message):
    """Extract interests from user message"""
    interests = []
    message_lower = message.lower()
    
    # Nature keywords in multiple languages
    nature_keywords = ['nature', 'eco', 'wildlife', 'falls', 'forest', 'प्राकृतिक', 'প্রকৃতি', 'वन', 'বন']
    # Cultural keywords
    cultural_keywords = ['cultural', 'culture', 'heritage', 'tribal', 'temple', 'सांस्कृतिक', 'সংস্কৃতি', 'मंदिर', 'মন্দির']
    # Adventure keywords
    adventure_keywords = ['adventure', 'trekking', 'sports', 'साहसिक', 'দুঃসাহসিক', 'ट्रेकिंग', 'ট্রেকিং']
    
    if any(keyword in message_lower for keyword in nature_keywords):
        interests.append('nature')
    if any(keyword in message_lower for keyword in cultural_keywords):
        interests.append('cultural')
    if any(keyword in message_lower for keyword in adventure_keywords):
        interests.append('adventure')
    
    return interests if interests else ['nature']  # Default to nature

# Dialogflow webhook endpoint (for production use)
@app.route('/dialogflow-webhook', methods=['POST'])
def dialogflow_webhook():
    """Handle Dialogflow fulfillment requests"""
    try:
        req = request.get_json()
        
        intent_name = req.get('queryResult', {}).get('intent', {}).get('displayName', '')
        parameters = req.get('queryResult', {}).get('parameters', {})
        query_text = req.get('queryResult', {}).get('queryText', '')
        language_code = req.get('queryResult', {}).get('languageCode', 'en')
        
        print(f"🔗 Webhook called for intent: {intent_name}")
        print(f"📝 Parameters: {parameters}")
        
        # Map language codes
        language = language_code.split('-')[0] if '-' in language_code else language_code
        
        # Handle specific intents
        if intent_name == 'Plan_Itinerary':
            days = parameters.get('days', 3)
            interests = parameters.get('interests', ['nature'])
            
            if isinstance(days, str):
                days = int(days) if days.isdigit() else 3
            
            response_text = plan_itinerary(f"{days} day {' '.join(interests)} trip", language)
            
        elif intent_name == 'Tourist_Places':
            response_text = get_tourist_places_response(language)
            
        elif intent_name == 'Cultural_Info':
            response_text = get_cultural_info(language)
            
        elif intent_name == 'Eco_Tourism':
            response_text = get_eco_tourism_info(language)
            
        elif intent_name == 'Default Welcome Intent':
            response_text = get_greeting_response(language)
            
        else:
            # Fallback processing
            response_text = process_intent_fallback(query_text, language)
        
        return jsonify({
            'fulfillmentText': response_text
        })
        
    except Exception as e:
        print(f"❌ Webhook error: {e}")
        return jsonify({
            'fulfillmentText': 'Sorry, I encountered an error. Please try again.'
        })

if __name__ == '__main__':
    print("🚀 Starting Jharkhand Tourism Chatbot...")
    print(f"🌐 Server will run at: http://localhost:5000")
    print(f"🔧 Debug mode: {os.getenv('FLASK_DEBUG', 'True')}")
    
    app.run(
        debug=os.getenv('FLASK_DEBUG', 'True').lower() == 'true',
        port=int(os.getenv('FLASK_PORT', 5000)),
        host='0.0.0.0'
    )
