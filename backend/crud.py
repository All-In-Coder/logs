from datetime import datetime
from typing import List, Optional, Dict, Any
from bson import ObjectId
from models import DiaryEntry

def diary_entry_helper(entry) -> Dict[str, Any]:
    """Convert MongoDB document to dict"""
    if entry:
        return {
            "id": str(entry.get("_id", "")),
            "date": entry.get("date", ""),
            "time": entry.get("time", ""),
            "mood": entry.get("mood", ""),
            "title": entry.get("title", ""),
            "content": entry.get("content", ""),
            "tags": entry.get("tags", []),
            "created_at": entry.get("created_at"),
            "updated_at": entry.get("updated_at"),
        }
    return None

def get_diary_entries(db, date: Optional[str] = None, mood: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
    """Get all diary entries, optionally filtered by date or mood"""
    collection = db["diary_entries"]
    
    query = {}
    if date:
        query["date"] = date
    if mood:
        query["mood"] = mood
    
    entries = list(collection.find(query).sort("created_at", -1).skip(skip).limit(limit))
    return [diary_entry_helper(entry) for entry in entries if entry]

def get_diary_entry(db, entry_id: str) -> Optional[Dict[str, Any]]:
    """Get a single diary entry by ID"""
    collection = db["diary_entries"]
    try:
        entry = collection.find_one({"_id": ObjectId(entry_id)})
        return diary_entry_helper(entry)
    except:
        return None

def create_diary_entry(db, entry: dict) -> Dict[str, Any]:
    """Create a new diary entry"""
    collection = db["diary_entries"]
    
    entry["created_at"] = datetime.now()
    entry["updated_at"] = datetime.now()
    
    result = collection.insert_one(entry)
    new_entry = collection.find_one({"_id": result.inserted_id})
    return diary_entry_helper(new_entry)

def update_diary_entry(db, entry_id: str, entry_data: dict) -> Optional[Dict[str, Any]]:
    """Update an existing diary entry"""
    collection = db["diary_entries"]
    
    # Remove None values
    update_data = {k: v for k, v in entry_data.items() if v is not None}
    
    if not update_data:
        return None
    
    update_data["updated_at"] = datetime.now()
    
    try:
        result = collection.update_one(
            {"_id": ObjectId(entry_id)},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            updated_entry = collection.find_one({"_id": ObjectId(entry_id)})
            return diary_entry_helper(updated_entry)
    except:
        return None
    
    return None

def delete_diary_entry(db, entry_id: str) -> bool:
    """Delete a diary entry"""
    collection = db["diary_entries"]
    try:
        result = collection.delete_one({"_id": ObjectId(entry_id)})
        return result.deleted_count > 0
    except:
        return False

def get_entries_by_date_range(db, start_date: str, end_date: str) -> List[Dict[str, Any]]:
    """Get entries within a date range"""
    collection = db["diary_entries"]
    
    query = {
        "date": {
            "$gte": start_date,
            "$lte": end_date
        }
    }
    
    entries = list(collection.find(query).sort("created_at", -1))
    return [diary_entry_helper(entry) for entry in entries if entry]

def get_entries_by_mood(db, mood: str) -> List[Dict[str, Any]]:
    """Get entries filtered by mood"""
    collection = db["diary_entries"]
    
    entries = list(collection.find({"mood": mood}).sort("created_at", -1))
    return [diary_entry_helper(entry) for entry in entries if entry]
