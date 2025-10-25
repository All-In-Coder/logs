#!/usr/bin/env python3
"""
Test script to verify MongoDB connection and basic operations
"""

from database import get_database
from crud import create_diary_entry, get_diary_entries, delete_diary_entry
from datetime import datetime

def test_connection():
    """Test MongoDB connection and basic CRUD operations"""
    print("Testing MongoDB connection...")
    
    try:
        db = get_database()
        print("✅ Successfully connected to MongoDB!")
        
        # Test creating an entry
        test_entry = {
            "date": "2024-01-15",
            "time": "10:30 AM",
            "mood": "great",
            "title": "Test Entry",
            "content": "This is a test diary entry to verify the connection works.",
            "tags": ["test", "connection"]
        }
        
        print("\n📝 Creating test entry...")
        created_entry = create_diary_entry(db, test_entry)
        print(f"✅ Entry created with ID: {created_entry['id']}")
        
        # Test retrieving entries
        print("\n📖 Retrieving entries...")
        entries = get_diary_entries(db)
        print(f"✅ Found {len(entries)} entries")
        
        # Test deleting the test entry
        print("\n🗑️ Cleaning up test entry...")
        success = delete_diary_entry(db, created_entry['id'])
        if success:
            print("✅ Test entry deleted successfully")
        else:
            print("❌ Failed to delete test entry")
            
        print("\n🎉 All tests passed! MongoDB connection is working correctly.")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    return True

if __name__ == "__main__":
    test_connection()
