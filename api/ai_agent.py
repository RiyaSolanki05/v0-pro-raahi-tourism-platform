import openai
import json
import requests
from datetime import datetime, timedelta
from typing import Dict, List, Any
import os
from dotenv import load_dotenv

load_dotenv()

class ProRaahiAIAgent:
    def __init__(self):
        self.openai_client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.agent_context = {
            "role": "ProRaahi AI Tourism Agent",
            "capabilities": [
                "Real-time weather and safety information",
                "Transportation booking (trains, flights, buses)",
                "Hotel and accommodation reservations", 
                "Local guide matching and booking",
                "Cultural activity and festival planning",
                "Itinerary creation and optimization",
                "Payment processing coordination"
            ],
            "knowledge_base": {
                "locations": ["Ranchi", "Jamshedpur", "Deoghar", "Hazaribagh", "Netarhat", "Betla"],
                "festivals": ["Sarhul", "Karma", "Tusu Parab", "Poush Parbon"],
                "arts": ["Sohrai painting", "Dokra metal craft", "Paitkar scroll painting"],
                "languages": ["Hindi", "English", "Santhali", "Bengali", "Oraon"]
            }
        }

    def process_user_request(self, user_message: str, session_context: Dict = None) -> Dict[str, Any]:
        """Main entry point for processing user requests"""
        try:
            # Analyze user intent
            intent_analysis = self._analyze_intent(user_message)
            
            # Execute appropriate workflow based on intent
            if intent_analysis["primary_intent"] == "transportation_booking":
                return self._handle_transportation_workflow(user_message, intent_analysis)
            elif intent_analysis["primary_intent"] == "accommodation_booking":
                return self._handle_accommodation_workflow(user_message, intent_analysis)
            elif intent_analysis["primary_intent"] == "guide_booking":
                return self._handle_guide_workflow(user_message, intent_analysis)
            elif intent_analysis["primary_intent"] == "activity_planning":
                return self._handle_activity_workflow(user_message, intent_analysis)
            elif intent_analysis["primary_intent"] == "itinerary_creation":
                return self._handle_itinerary_workflow(user_message, intent_analysis)
            else:
                return self._handle_general_inquiry(user_message, intent_analysis)
                
        except Exception as e:
            return {
                "response": "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
                "error": str(e),
                "requires_human_intervention": True
            }

    def _analyze_intent(self, user_message: str) -> Dict[str, Any]:
        """Analyze user message to determine intent and extract entities"""
        system_prompt = f"""
        You are an intent analysis system for ProRaahi, a Jharkhand tourism platform. 
        Analyze the user message and return a JSON response with:
        
        1. primary_intent: One of [transportation_booking, accommodation_booking, guide_booking, activity_planning, itinerary_creation, general_inquiry]
        2. entities: Extract relevant information like:
           - locations (from/to destinations)
           - dates (travel dates, activity dates)
           - group_size (number of people)
           - preferences (budget, interests, special requirements)
           - specific_requests (train tickets, hotel type, guide specialty, etc.)
        3. confidence: Float between 0-1 indicating confidence in intent classification
        4. next_actions: List of actions the AI agent should take
        
        Context about Jharkhand: {json.dumps(self.agent_context["knowledge_base"])}
        """
        
        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.3,
                response_format={"type": "json_object"}
            )
            
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            # Fallback intent analysis
            return {
                "primary_intent": "general_inquiry",
                "entities": {},
                "confidence": 0.5,
                "next_actions": ["provide_general_assistance"]
            }

    def _handle_transportation_workflow(self, user_message: str, intent_data: Dict) -> Dict[str, Any]:
        """Handle transportation booking workflow"""
        entities = intent_data.get("entities", {})
        
        # Step 1: Gather missing information
        missing_info = []
        if not entities.get("from_location"):
            missing_info.append("departure city")
        if not entities.get("to_location"):
            missing_info.append("destination in Jharkhand")
        if not entities.get("travel_date"):
            missing_info.append("travel date")
        
        if missing_info:
            return {
                "response": f"I'd be happy to help you book transportation to Jharkhand! I need a few more details: {', '.join(missing_info)}. Could you please provide this information?",
                "workflow_stage": "information_gathering",
                "missing_info": missing_info,
                "next_actions": ["collect_transportation_details"]
            }
        
        # Step 2: Search for transportation options
        search_results = self._search_transportation(entities)
        
        # Step 3: Present options with AI recommendations
        recommendation = self._generate_transportation_recommendation(search_results, entities)
        
        return {
            "response": recommendation["message"],
            "workflow_stage": "option_presentation",
            "search_results": search_results,
            "recommendation": recommendation,
            "next_actions": ["await_user_selection", "proceed_to_booking"]
        }

    def _handle_accommodation_workflow(self, user_message: str, intent_data: Dict) -> Dict[str, Any]:
        """Handle accommodation booking workflow"""
        entities = intent_data.get("entities", {})
        
        # Check for required information
        missing_info = []
        if not entities.get("location"):
            missing_info.append("destination city")
        if not entities.get("check_in_date"):
            missing_info.append("check-in date")
        if not entities.get("duration") and not entities.get("check_out_date"):
            missing_info.append("duration of stay")
        
        if missing_info:
            return {
                "response": f"I'll help you find perfect accommodation in Jharkhand! Please provide: {', '.join(missing_info)}.",
                "workflow_stage": "information_gathering",
                "missing_info": missing_info,
                "next_actions": ["collect_accommodation_details"]
            }
        
        # Search and recommend accommodations
        hotel_results = self._search_accommodations(entities)
        recommendation = self._generate_accommodation_recommendation(hotel_results, entities)
        
        return {
            "response": recommendation["message"],
            "workflow_stage": "option_presentation", 
            "search_results": hotel_results,
            "recommendation": recommendation,
            "next_actions": ["await_user_selection", "proceed_to_booking"]
        }

    def _handle_guide_workflow(self, user_message: str, intent_data: Dict) -> Dict[str, Any]:
        """Handle local guide booking workflow"""
        entities = intent_data.get("entities", {})
        
        # Search for suitable guides
        guide_results = self._search_guides(entities)
        
        # Generate personalized recommendations
        system_prompt = f"""
        Based on the user's request and available guides, provide a helpful response that:
        1. Acknowledges their specific interests
        2. Recommends 2-3 most suitable guides with reasons
        3. Mentions unique specialties and cultural insights they offer
        4. Suggests next steps for booking
        
        User request: {user_message}
        Available guides: {json.dumps(guide_results[:3])}
        """
        
        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": "Generate a helpful response about these guides."}
                ],
                temperature=0.7
            )
            
            ai_response = response.choices[0].message.content
        except:
            ai_response = "I found several excellent local guides who can provide authentic Jharkhand experiences. Let me show you the best matches for your interests."
        
        return {
            "response": ai_response,
            "workflow_stage": "guide_recommendation",
            "guide_results": guide_results,
            "next_actions": ["present_guide_profiles", "check_availability"]
        }

    def _handle_activity_workflow(self, user_message: str, intent_data: Dict) -> Dict[str, Any]:
        """Handle activity and experience planning workflow"""
        entities = intent_data.get("entities", {})
        
        # Search for relevant activities
        activity_results = self._search_activities(entities)
        
        # Create personalized activity recommendations
        system_prompt = f"""
        Create an engaging response about Jharkhand activities based on the user's interests.
        Include:
        1. Cultural significance of recommended activities
        2. Best times to participate
        3. What makes each experience unique
        4. Practical details (duration, group size, etc.)
        
        User interests: {entities.get('interests', [])}
        Available activities: {json.dumps(activity_results[:4])}
        """
        
        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.7
            )
            
            ai_response = response.choices[0].message.content
        except:
            ai_response = "I've found some amazing cultural and adventure activities that showcase the best of Jharkhand's heritage and natural beauty."
        
        return {
            "response": ai_response,
            "workflow_stage": "activity_recommendation",
            "activity_results": activity_results,
            "next_actions": ["present_activity_details", "check_availability"]
        }

    def _handle_itinerary_workflow(self, user_message: str, intent_data: Dict) -> Dict[str, Any]:
        """Handle complete itinerary creation workflow"""
        entities = intent_data.get("entities", {})
        
        # Generate comprehensive itinerary
        itinerary = self._create_personalized_itinerary(entities, user_message)
        
        return {
            "response": itinerary["description"],
            "workflow_stage": "itinerary_presentation",
            "itinerary": itinerary,
            "next_actions": ["review_itinerary", "proceed_to_bookings"]
        }

    def _handle_general_inquiry(self, user_message: str, intent_data: Dict) -> Dict[str, Any]:
        """Handle general tourism inquiries"""
        system_prompt = f"""
        You are ProRaahi's AI tourism assistant for Jharkhand. Provide helpful, engaging responses about:
        - Jharkhand's cultural heritage and tribal traditions
        - Best times to visit and seasonal highlights  
        - Festival calendars and cultural events
        - Traditional arts like Sohrai and Dokra
        - Adventure tourism and natural attractions
        - Practical travel advice
        
        Always offer to help with specific bookings or planning.
        Context: {json.dumps(self.agent_context)}
        """
        
        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.7
            )
            
            ai_response = response.choices[0].message.content
        except:
            ai_response = "I'm here to help you discover the incredible cultural richness and natural beauty of Jharkhand! What specific aspect of your journey would you like to explore?"
        
        return {
            "response": ai_response,
            "workflow_stage": "general_assistance",
            "next_actions": ["offer_specific_services"]
        }

    def _search_transportation(self, entities: Dict) -> List[Dict]:
        """Search transportation options via API"""
        try:
            # This would call the actual transportation API
            # For now, returning mock data
            return [
                {
                    "id": 1,
                    "type": "train",
                    "name": "Rajdhani Express",
                    "from": entities.get("from_location", "Delhi"),
                    "to": entities.get("to_location", "Ranchi"),
                    "departure": "06:00",
                    "arrival": "18:30",
                    "duration": "12h 30m",
                    "price": 2450,
                    "class": "3AC"
                }
            ]
        except:
            return []

    def _search_accommodations(self, entities: Dict) -> List[Dict]:
        """Search accommodation options"""
        # Mock implementation - would call actual hotel API
        return [
            {
                "id": 1,
                "name": "Ranchi Heritage Hotel",
                "location": entities.get("location", "Ranchi"),
                "price": 4500,
                "rating": 4.5,
                "amenities": ["WiFi", "Restaurant", "Parking"]
            }
        ]

    def _search_guides(self, entities: Dict) -> List[Dict]:
        """Search for local guides"""
        # Mock implementation - would call guides API
        return [
            {
                "id": 1,
                "name": "Rajesh Kumar",
                "specialties": ["Cultural Heritage", "Tribal History"],
                "location": "Ranchi",
                "price_per_day": 2500,
                "rating": 4.9
            }
        ]

    def _search_activities(self, entities: Dict) -> List[Dict]:
        """Search for activities and experiences"""
        # Mock implementation - would call activities API
        return [
            {
                "id": 1,
                "title": "Sohrai Art Workshop",
                "category": "Art & Culture",
                "location": "Hazaribagh",
                "price": 1500,
                "duration": "4 hours"
            }
        ]

    def _generate_transportation_recommendation(self, results: List[Dict], entities: Dict) -> Dict:
        """Generate AI-powered transportation recommendations"""
        if not results:
            return {
                "message": "I couldn't find direct transportation options for your dates. Let me suggest alternative routes or dates.",
                "alternatives": True
            }
        
        best_option = results[0]  # Simplified selection logic
        
        return {
            "message": f"I recommend the {best_option['name']} departing at {best_option['departure']}. It offers the best balance of comfort and timing for your journey to {best_option['to']}.",
            "recommended_option": best_option,
            "reasoning": "Based on your preferences for comfort and reasonable travel time."
        }

    def _generate_accommodation_recommendation(self, results: List[Dict], entities: Dict) -> Dict:
        """Generate AI-powered accommodation recommendations"""
        if not results:
            return {
                "message": "Let me find alternative accommodation options in nearby areas.",
                "alternatives": True
            }
        
        best_option = results[0]
        
        return {
            "message": f"I highly recommend {best_option['name']} for your stay. It's perfectly located and offers excellent amenities for your Jharkhand experience.",
            "recommended_option": best_option,
            "reasoning": "Selected based on location, amenities, and guest reviews."
        }

    def _create_personalized_itinerary(self, entities: Dict, user_message: str) -> Dict:
        """Create a comprehensive personalized itinerary"""
        duration = entities.get("duration", "5 days")
        interests = entities.get("interests", ["culture", "nature"])
        
        system_prompt = f"""
        Create a detailed {duration} itinerary for Jharkhand focusing on {', '.join(interests)}.
        Include:
        1. Day-by-day activities with timing
        2. Cultural experiences and festivals
        3. Local food recommendations
        4. Transportation between locations
        5. Accommodation suggestions
        6. Budget estimates
        7. Cultural etiquette tips
        
        Make it authentic and immersive, highlighting Jharkhand's unique tribal heritage.
        """
        
        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.7
            )
            
            itinerary_content = response.choices[0].message.content
        except:
            itinerary_content = f"Here's a wonderful {duration} itinerary showcasing Jharkhand's cultural heritage and natural beauty, tailored to your interests in {', '.join(interests)}."
        
        return {
            "description": itinerary_content,
            "duration": duration,
            "interests": interests,
            "estimated_budget": self._calculate_budget_estimate(duration, interests)
        }

    def _calculate_budget_estimate(self, duration: str, interests: List[str]) -> Dict:
        """Calculate estimated budget for the trip"""
        # Simplified budget calculation
        days = int(duration.split()[0]) if duration.split()[0].isdigit() else 5
        
        base_cost_per_day = 3000  # Base cost in INR
        if "luxury" in interests:
            base_cost_per_day *= 2
        elif "budget" in interests:
            base_cost_per_day *= 0.6
        
        return {
            "total_estimated": base_cost_per_day * days,
            "per_day": base_cost_per_day,
            "currency": "INR",
            "includes": ["accommodation", "meals", "activities", "local transport"]
        }

# Initialize the AI agent
ai_agent = ProRaahiAIAgent()
