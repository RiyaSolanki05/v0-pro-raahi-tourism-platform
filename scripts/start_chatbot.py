#!/usr/bin/env python3
"""
Script to start the Flask chatbot backend server
"""
import os
import sys
import subprocess
from pathlib import Path

def check_requirements():
    """Check if required packages are installed"""
    try:
        import flask
        import flask_cors
        import google.cloud.dialogflow
        import google.oauth2.service_account
        print("✅ All required packages are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing required package: {e}")
        print("📦 Please install requirements: pip install -r requirements.txt")
        return False

def check_credentials():
    """Check if Google Cloud credentials exist"""
    creds_path = Path("credentials/service-account-key.json")
    if creds_path.exists():
        print("✅ Google Cloud credentials found")
        return True
    else:
        print("⚠️ Google Cloud credentials not found at credentials/service-account-key.json")
        print("🔄 The chatbot will run in fallback mode without Dialogflow")
        return False

def start_server():
    """Start the Flask chatbot server"""
    print("🚀 Starting Jharkhand Tourism Chatbot Backend...")
    
    # Set environment variables
    os.environ.setdefault('FLASK_ENV', 'development')
    os.environ.setdefault('FLASK_DEBUG', 'True')
    os.environ.setdefault('FLASK_PORT', '5000')
    
    try:
        # Start the Flask server
        subprocess.run([
            sys.executable, 
            "api/chatbot_service.py"
        ], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to start chatbot server: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n🛑 Chatbot server stopped by user")
        sys.exit(0)

if __name__ == "__main__":
    print("🏔️ ProRaahi Tourism Chatbot Setup")
    print("=" * 40)
    
    # Check requirements
    if not check_requirements():
        sys.exit(1)
    
    # Check credentials (optional)
    check_credentials()
    
    # Start server
    start_server()
