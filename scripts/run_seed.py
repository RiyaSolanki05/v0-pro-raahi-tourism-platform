import sqlite3
import os

def run_seed_script():
    """Execute the SQL seed script to populate the database"""
    try:
        # Connect to database
        conn = sqlite3.connect('proraahi.db')
        cursor = conn.cursor()
        
        # Read and execute seed script
        with open('scripts/seed_database.sql', 'r') as file:
            sql_script = file.read()
            
        # Execute the script
        cursor.executescript(sql_script)
        
        conn.commit()
        conn.close()
        
        print("Database seeded successfully!")
        print("Added sample data for:")
        print("- 4 Local Guides")
        print("- 6 Activities & Experiences") 
        print("- 6 Transportation Options")
        print("- 5 Hotels & Accommodations")
        
    except Exception as e:
        print(f"Error seeding database: {str(e)}")

if __name__ == "__main__":
    run_seed_script()
