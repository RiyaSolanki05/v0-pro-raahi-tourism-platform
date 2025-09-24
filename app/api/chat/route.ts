import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, language = "en", session_id } = body

    console.log("[v0] Chat API received message:", message, "Language:", language)

    // Try to communicate with the Flask backend first
    try {
      const flaskResponse = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          language,
        }),
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000), // 10 second timeout
      })

      if (flaskResponse.ok) {
        const flaskData = await flaskResponse.json()

        if (flaskData.success) {
          console.log("[v0] Flask backend response:", flaskData.response.substring(0, 100) + "...")

          return NextResponse.json({
            response: flaskData.response,
            session_id: session_id || "default",
            processing_mode: flaskData.processing_mode || "flask",
            language: flaskData.language || language,
          })
        }
      }
    } catch (flaskError) {
      console.log("[v0] Flask backend not available, using fallback:", flaskError.message)
    }

    let response = ""
    const lowerMessage = message.toLowerCase()

    // Multilingual responses
    const responses = {
      en: {
        greeting:
          "Hello! Welcome to Jharkhand Tourism Assistant. How can I help you explore the beautiful state of Jharkhand? 🌿",
        transport:
          "I can help you with transportation in Jharkhand! We have buses, trains, and private cabs available. The main railway stations are Ranchi, Dhanbad, and Jamshedpur. Would you like me to check availability for specific routes?",
        guide:
          "Great! I can connect you with experienced local guides who know Jharkhand's hidden gems. We have cultural guides, adventure guides, and tribal heritage specialists. What type of experience are you looking for?",
        festival:
          "Jharkhand has amazing festivals! Sarhul (spring festival), Karma (harvest festival), and Sohrai (tribal art festival) are the most popular. The best time to visit depends on which cultural experience you want. Would you like details about upcoming festivals?",
        accommodation:
          "I can help you find perfect accommodation! From luxury resorts in Ranchi to eco-lodges near Betla National Park. What's your budget and preferred location?",
        adventure:
          "Adventure awaits in Jharkhand! Betla National Park for wildlife, Netarhat for trekking, and Hundru Falls for scenic beauty. Rock climbing at Ranchi Rock Garden is also popular. What type of adventure interests you?",
        food: "Jharkhand cuisine is delicious! Try Dhuska (rice pancakes), Pitha (rice cakes), and tribal delicacies like Handia (rice beer). I can recommend authentic restaurants and food experiences. Any specific dietary preferences?",
        weather:
          "Jharkhand has a pleasant climate! Best time to visit is October to March (cool and dry). Monsoon (June-September) is great for waterfalls but can be challenging for travel. Summer (April-May) is hot but good for indoor cultural activities.",
        plan: "I'd love to help plan your Jharkhand trip! To create the perfect itinerary, I need to know: How many days do you have? What interests you most - culture, adventure, wildlife, or relaxation? Any specific places you want to visit?",
        default:
          "I'm here to help you explore Jharkhand! I can assist with transportation, accommodation, local guides, cultural experiences, adventure activities, and trip planning. What would you like to know more about?",
      },
      hi: {
        greeting: "नमस्ते! झारखंड पर्यटन सहायक में आपका स्वागत है। मैं झारखंड राज्य की खोज में आपकी कैसे सहायता कर सकता हूँ? 🌿",
        transport:
          "मैं झारखंड में परिवहन के साथ आपकी सहायता कर सकता हूँ! हमारे पास बसें, ट्रेनें और निजी कैब उपलब्ध हैं। मुख्य रेलवे स्टेशन रांची, धनबाद और जमशेदपुर हैं।",
        guide:
          "बहुत बढ़िया! मैं आपको अनुभवी स्थानीय गाइड से जोड़ सकता हूँ जो झारखंड के छुपे हुए रत्नों को जानते हैं। आप किस प्रकार का अनुभव चाहते हैं?",
        festival:
          "झारखंड में अद्भुत त्योहार हैं! सरहुल (वसंत त्योहार), कर्मा (फसल त्योहार), और सोहराई (आदिवासी कला त्योहार) सबसे लोकप्रिय हैं।",
        default:
          "मैं झारखंड की खोज में आपकी सहायता के लिए यहाँ हूँ! परिवहन, आवास, स्थानीय गाइड, सांस्कृतिक अनुभव और यात्रा योजना के बारे में पूछें।",
      },
    }

    const langResponses = responses[language as keyof typeof responses] || responses.en

    // Intent detection with multilingual keywords
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("namaste") ||
      lowerMessage.includes("नमस्ते")
    ) {
      response = langResponses.greeting
    } else if (
      lowerMessage.includes("transport") ||
      lowerMessage.includes("bus") ||
      lowerMessage.includes("train") ||
      lowerMessage.includes("परिवहन")
    ) {
      response = langResponses.transport
    } else if (lowerMessage.includes("guide") || lowerMessage.includes("local") || lowerMessage.includes("गाइड")) {
      response = langResponses.guide
    } else if (
      lowerMessage.includes("festival") ||
      lowerMessage.includes("culture") ||
      lowerMessage.includes("त्योहार")
    ) {
      response = langResponses.festival
    } else if (
      lowerMessage.includes("hotel") ||
      lowerMessage.includes("stay") ||
      lowerMessage.includes("accommodation") ||
      lowerMessage.includes("होटल")
    ) {
      response = langResponses.accommodation
    } else if (
      lowerMessage.includes("adventure") ||
      lowerMessage.includes("trek") ||
      lowerMessage.includes("wildlife") ||
      lowerMessage.includes("साहसिक")
    ) {
      response = langResponses.adventure
    } else if (lowerMessage.includes("food") || lowerMessage.includes("eat") || lowerMessage.includes("खाना")) {
      response = langResponses.food
    } else if (lowerMessage.includes("weather") || lowerMessage.includes("climate") || lowerMessage.includes("मौसम")) {
      response = langResponses.weather
    } else if (lowerMessage.includes("plan") || lowerMessage.includes("itinerary") || lowerMessage.includes("योजना")) {
      response = langResponses.plan
    } else {
      response = langResponses.default
    }

    console.log("[v0] Generated fallback response:", response.substring(0, 100) + "...")

    return NextResponse.json({
      response,
      session_id: session_id || "default",
      processing_mode: "fallback",
      language,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json(
      {
        error: "Failed to process chat message",
        response: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        processing_mode: "error",
      },
      { status: 500 },
    )
  }
}
