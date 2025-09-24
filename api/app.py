from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime, timedelta
import json
from ai_agent import ai_agent
from external_apis import external_api

app = Flask(__name__)
CORS(app)

# Database initialization
def init_db():
    conn = sqlite3.connect('proraahi.db')
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Bookings table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            booking_type TEXT NOT NULL,
            booking_data TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            total_amount REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Guides table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS guides (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            specialties TEXT NOT NULL,
            languages TEXT NOT NULL,
            experience_years INTEGER,
            price_per_day REAL,
            rating REAL DEFAULT 0.0,
            total_reviews INTEGER DEFAULT 0,
            availability_status TEXT DEFAULT 'available',
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Activities table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            location TEXT NOT NULL,
            duration TEXT,
            group_size TEXT,
            price REAL,
            rating REAL DEFAULT 0.0,
            total_reviews INTEGER DEFAULT 0,
            description TEXT,
            highlights TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Chat messages table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            user_message TEXT,
            ai_response TEXT,
            context_data TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Transportation table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transportation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            transport_type TEXT NOT NULL,
            name TEXT NOT NULL,
            from_location TEXT NOT NULL,
            to_location TEXT NOT NULL,
            departure_time TEXT,
            arrival_time TEXT,
            duration TEXT,
            price REAL,
            class_type TEXT,
            availability_status TEXT DEFAULT 'available',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Hotels table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS hotels (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            location TEXT NOT NULL,
            rating REAL DEFAULT 0.0,
            total_reviews INTEGER DEFAULT 0,
            price_per_night REAL,
            amenities TEXT,
            description TEXT,
            image_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# API Routes

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "ProRaahi API is running"})

@app.route('/api/chat', methods=['POST'])
def chat_endpoint():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        session_id = data.get('session_id', 'default')
        
        # Store user message
        conn = sqlite3.connect('proraahi.db')
        cursor = conn.cursor()
        
        # Generate AI response (placeholder - will be replaced with actual AI agent)
        agent_response = ai_agent.process_user_request(user_message)
        ai_response = agent_response.get('response', 'I apologize, but I cannot process your request right now.')
        
        # Store additional context if available
        context_data = {
            'workflow_stage': agent_response.get('workflow_stage'),
            'next_actions': agent_response.get('next_actions', []),
            'search_results': agent_response.get('search_results'),
            'recommendations': agent_response.get('recommendation')
        }
        
        # Store chat interaction with context
        cursor.execute('''
            INSERT INTO chat_messages (session_id, user_message, ai_response, context_data)
            VALUES (?, ?, ?, ?)
        ''', (session_id, user_message, ai_response, json.dumps(context_data)))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            "response": ai_response,
            "session_id": session_id,
            "timestamp": datetime.now().isoformat(),
            "workflow_data": agent_response
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/guides', methods=['GET'])
def get_guides():
    try:
        location = request.args.get('location')
        specialty = request.args.get('specialty')
        
        conn = sqlite3.connect('proraahi.db')
        cursor = conn.cursor()
        
        query = "SELECT * FROM guides WHERE 1=1"
        params = []
        
        if location and location != 'all':
            query += " AND location = ?"
            params.append(location)
            
        if specialty and specialty != 'all':
            query += " AND specialties LIKE ?"
            params.append(f"%{specialty}%")
        
        cursor.execute(query, params)
        guides = cursor.fetchall()
        
        # Convert to list of dictionaries
        guide_list = []
        for guide in guides:
            guide_dict = {
                "id": guide[0],
                "name": guide[1],
                "location": guide[2],
                "specialties": guide[3].split(',') if guide[3] else [],
                "languages": guide[4].split(',') if guide[4] else [],
                "experience_years": guide[5],
                "price_per_day": guide[6],
                "rating": guide[7],
                "total_reviews": guide[8],
                "availability_status": guide[9],
                "description": guide[10]
            }
            guide_list.append(guide_dict)
        
        conn.close()
        return jsonify(guide_list)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/activities', methods=['GET'])
def get_activities():
    try:
        category = request.args.get('category')
        location = request.args.get('location')
        
        conn = sqlite3.connect('proraahi.db')
        cursor = conn.cursor()
        
        query = "SELECT * FROM activities WHERE 1=1"
        params = []
        
        if category and category != 'All categories':
            query += " AND category = ?"
            params.append(category)
            
        if location and location != 'All locations':
            query += " AND location = ?"
            params.append(location)
        
        cursor.execute(query, params)
        activities = cursor.fetchall()
        
        # Convert to list of dictionaries
        activity_list = []
        for activity in activities:
            activity_dict = {
                "id": activity[0],
                "title": activity[1],
                "category": activity[2],
                "location": activity[3],
                "duration": activity[4],
                "group_size": activity[5],
                "price": activity[6],
                "rating": activity[7],
                "total_reviews": activity[8],
                "description": activity[9],
                "highlights": activity[10].split(',') if activity[10] else []
            }
            activity_list.append(activity_dict)
        
        conn.close()
        return jsonify(activity_list)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/transportation/search', methods=['POST'])
def search_transportation():
    try:
        data = request.get_json()
        from_location = data.get('from')
        to_location = data.get('to')
        date = data.get('date')
        
        conn = sqlite3.connect('proraahi.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM transportation 
            WHERE from_location = ? AND to_location = ? AND availability_status = 'available'
        ''', (from_location, to_location))
        
        results = cursor.fetchall()
        
        # Convert to list of dictionaries
        transport_list = []
        for transport in results:
            transport_dict = {
                "id": transport[0],
                "transport_type": transport[1],
                "name": transport[2],
                "from_location": transport[3],
                "to_location": transport[4],
                "departure_time": transport[5],
                "arrival_time": transport[6],
                "duration": transport[7],
                "price": transport[8],
                "class_type": transport[9],
                "availability_status": transport[10]
            }
            transport_list.append(transport_dict)
        
        conn.close()
        return jsonify(transport_list)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/hotels', methods=['GET'])
def get_hotels():
    try:
        location = request.args.get('location')
        
        conn = sqlite3.connect('proraahi.db')
        cursor = conn.cursor()
        
        query = "SELECT * FROM hotels WHERE 1=1"
        params = []
        
        if location and location != 'All locations':
            query += " AND location = ?"
            params.append(location)
        
        cursor.execute(query, params)
        hotels = cursor.fetchall()
        
        # Convert to list of dictionaries
        hotel_list = []
        for hotel in hotels:
            hotel_dict = {
                "id": hotel[0],
                "name": hotel[1],
                "category": hotel[2],
                "location": hotel[3],
                "rating": hotel[4],
                "total_reviews": hotel[5],
                "price_per_night": hotel[6],
                "amenities": hotel[7].split(',') if hotel[7] else [],
                "description": hotel[8],
                "image_url": hotel[9]
            }
            hotel_list.append(hotel_dict)
        
        conn.close()
        return jsonify(hotel_list)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/bookings', methods=['POST'])
def create_booking():
    try:
        data = request.get_json()
        
        # Extract user information
        user_data = data.get('user', {})
        booking_type = data.get('booking_type')
        booking_data = data.get('booking_data', {})
        total_amount = data.get('total_amount', 0)
        
        conn = sqlite3.connect('proraahi.db')
        cursor = conn.cursor()
        
        # Create or get user
        cursor.execute('''
            INSERT OR IGNORE INTO users (name, email, phone)
            VALUES (?, ?, ?)
        ''', (user_data.get('name'), user_data.get('email'), user_data.get('phone')))
        
        cursor.execute('SELECT id FROM users WHERE email = ?', (user_data.get('email'),))
        user_id = cursor.fetchone()[0]
        
        # Create booking
        cursor.execute('''
            INSERT INTO bookings (user_id, booking_type, booking_data, total_amount)
            VALUES (?, ?, ?, ?)
        ''', (user_id, booking_type, json.dumps(booking_data), total_amount))
        
        booking_id = cursor.lastrowid
        
        conn.commit()
        conn.close()
        
        return jsonify({
            "booking_id": booking_id,
            "status": "pending",
            "message": "Booking created successfully"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/weather/<location>', methods=['GET'])
def get_weather(location):
    """Get real-time weather data"""
    try:
        weather_data = external_api.get_weather_data(location)
        return jsonify(weather_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/safety-alerts/<location>', methods=['GET'])
def get_safety_alerts(location):
    """Get safety alerts and emergency information"""
    try:
        safety_data = external_api.get_safety_alerts(location)
        return jsonify(safety_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/events/<location>', methods=['GET'])
def get_local_events(location):
    """Get local events and festivals"""
    try:
        date_range = request.args.get('days', '30')
        events_data = external_api.get_local_events(location, date_range)
        return jsonify(events_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/route-info', methods=['POST'])
def get_route_info():
    """Get route and navigation information"""
    try:
        data = request.get_json()
        from_location = data.get('from')
        to_location = data.get('to')
        
        route_data = external_api.get_route_information(from_location, to_location)
        return jsonify(route_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/agent/workflow', methods=['POST'])
def agent_workflow():
    """Handle complex AI agent workflows"""
    try:
        data = request.get_json()
        workflow_type = data.get('workflow_type')
        user_input = data.get('user_input', '')
        context = data.get('context', {})
        
        # Process through AI agent
        result = ai_agent.process_user_request(user_input, context)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/agent/booking-workflow', methods=['POST'])
def booking_workflow():
    """Handle end-to-end booking workflows"""
    try:
        data = request.get_json()
        booking_request = data.get('booking_request')
        user_preferences = data.get('user_preferences', {})
        
        # AI agent handles the complete booking workflow
        workflow_result = ai_agent._handle_complete_booking_workflow(booking_request, user_preferences)
        
        return jsonify(workflow_result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
