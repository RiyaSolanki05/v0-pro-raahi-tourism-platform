import requests
import json
from typing import Dict, List, Any
import os
from datetime import datetime

class ExternalAPIIntegrator:
    """Handles integration with external APIs for real-time data"""
    
    def __init__(self):
        self.weather_api_key = os.getenv('OPENWEATHER_API_KEY')
        self.maps_api_key = os.getenv('GOOGLE_MAPS_API_KEY')
    
    def get_weather_data(self, location: str) -> Dict[str, Any]:
        """Fetch real-time weather data"""
        try:
            # Using OpenWeatherMap API (free tier)
            url = f"http://api.openweathermap.org/data/2.5/weather"
            params = {
                'q': f"{location},Jharkhand,IN",
                'appid': self.weather_api_key,
                'units': 'metric'
            }
            
            response = requests.get(url, params=params, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return {
                    'location': location,
                    'temperature': f"{data['main']['temp']}°C",
                    'condition': data['weather'][0]['description'].title(),
                    'humidity': f"{data['main']['humidity']}%",
                    'wind_speed': f"{data['wind']['speed']} m/s",
                    'visibility': f"{data.get('visibility', 0)/1000} km"
                }
        except Exception as e:
            print(f"Weather API error: {e}")
        
        # Fallback to mock data
        return {
            'location': location,
            'temperature': '25°C',
            'condition': 'Partly Cloudy',
            'humidity': '65%',
            'wind_speed': '12 km/h',
            'visibility': '10 km'
        }
    
    def get_safety_alerts(self, location: str) -> Dict[str, Any]:
        """Get safety alerts and emergency information"""
        # This would integrate with government APIs or news sources
        # For now, returning structured mock data
        return {
            'location': location,
            'alerts': [
                {
                    'type': 'weather',
                    'severity': 'low',
                    'message': 'Light rain expected in the evening',
                    'issued_at': datetime.now().isoformat()
                }
            ],
            'emergency_contacts': {
                'police': '100',
                'ambulance': '108',
                'fire': '101',
                'tourist_helpline': '1363',
                'disaster_management': '108'
            },
            'nearest_hospitals': [
                {
                    'name': 'Ranchi Institute of Medical Sciences',
                    'distance': '2.5 km',
                    'phone': '+91-651-2451070'
                }
            ]
        }
    
    def get_transportation_data(self, from_location: str, to_location: str, date: str) -> List[Dict]:
        """Fetch real-time transportation data"""
        # This would integrate with IRCTC API, airline APIs, etc.
        # For now, returning enhanced mock data
        return [
            {
                'id': 'train_001',
                'type': 'train',
                'name': 'Rajdhani Express',
                'from': from_location,
                'to': to_location,
                'departure': '06:00',
                'arrival': '18:30',
                'duration': '12h 30m',
                'price': 2450,
                'class': '3AC',
                'availability': 'Available',
                'booking_url': 'https://www.irctc.co.in'
            },
            {
                'id': 'flight_001',
                'type': 'flight',
                'name': 'IndiGo 6E-123',
                'from': from_location,
                'to': to_location,
                'departure': '09:15',
                'arrival': '11:30',
                'duration': '2h 15m',
                'price': 8500,
                'class': 'Economy',
                'availability': 'Available',
                'booking_url': 'https://www.goindigo.in'
            }
        ]
    
    def get_local_events(self, location: str, date_range: str = "30") -> List[Dict]:
        """Get local events and festivals"""
        # This would integrate with event APIs like Eventbrite
        return [
            {
                'id': 'event_001',
                'title': 'Sarhul Festival Celebration',
                'date': '2024-03-15',
                'location': 'Ranchi',
                'category': 'Cultural Festival',
                'description': 'Traditional spring festival celebrated by tribal communities',
                'ticket_price': 0,
                'organizer': 'Jharkhand Tourism Board'
            },
            {
                'id': 'event_002',
                'title': 'Dokra Art Workshop',
                'date': '2024-03-20',
                'location': 'Hazaribagh',
                'category': 'Art & Craft',
                'description': 'Learn traditional metal casting techniques',
                'ticket_price': 1500,
                'organizer': 'Local Artisan Cooperative'
            }
        ]
    
    def get_route_information(self, from_location: str, to_location: str) -> Dict[str, Any]:
        """Get route and navigation information"""
        # This would use Google Maps API or similar
        return {
            'distance': '350 km',
            'estimated_time': '6 hours 30 minutes',
            'route_type': 'fastest',
            'toll_cost': '₹200',
            'fuel_cost': '₹1,200',
            'waypoints': [
                {'name': 'Dhanbad', 'distance': '180 km'},
                {'name': 'Bokaro', 'distance': '280 km'}
            ],
            'road_conditions': 'Good',
            'traffic_status': 'Moderate'
        }

# Initialize the external API integrator
external_api = ExternalAPIIntegrator()
