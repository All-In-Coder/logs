from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

from database import get_database
from schemas import DiaryEntryCreate, DiaryEntryUpdate, DiaryEntryResponse
from crud import (
    get_diary_entries, get_diary_entry, create_diary_entry, 
    update_diary_entry, delete_diary_entry, get_entries_by_date_range,
    get_entries_by_mood
)

app = FastAPI(title="Diary Logger API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Diary Logger API", "version": "1.0.0"}

@app.get("/api/entries", response_model=List[DiaryEntryResponse])
def read_entries(
    date: Optional[str] = None, 
    mood: Optional[str] = None,
    skip: int = Query(0, ge=0), 
    limit: int = Query(100, ge=1, le=1000)
):
    """Get diary entries with optional filtering by date and mood"""
    db = get_database()
    entries = get_diary_entries(db, date=date, mood=mood, skip=skip, limit=limit)
    return entries

@app.get("/api/entries/{entry_id}", response_model=DiaryEntryResponse)
def read_entry(entry_id: str):
    """Get a single diary entry by ID"""
    db = get_database()
    entry = get_diary_entry(db, entry_id)
    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry

@app.post("/api/entries", response_model=DiaryEntryResponse, status_code=status.HTTP_201_CREATED)
def create_entry(entry: DiaryEntryCreate):
    """Create a new diary entry"""
    db = get_database()
    entry_dict = entry.dict()
    return create_diary_entry(db, entry_dict)

@app.put("/api/entries/{entry_id}", response_model=DiaryEntryResponse)
def update_entry(entry_id: str, entry: DiaryEntryUpdate):
    """Update an existing diary entry"""
    db = get_database()
    entry_dict = entry.dict(exclude_unset=True)
    updated_entry = update_diary_entry(db, entry_id, entry_dict)
    if updated_entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return updated_entry

@app.delete("/api/entries/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_entry(entry_id: str):
    """Delete a diary entry"""
    db = get_database()
    success = delete_diary_entry(db, entry_id)
    if not success:
        raise HTTPException(status_code=404, detail="Entry not found")
    return None

@app.get("/api/entries/date-range", response_model=List[DiaryEntryResponse])
def get_entries_by_range(
    start_date: str = Query(..., description="Start date in YYYY-MM-DD format"),
    end_date: str = Query(..., description="End date in YYYY-MM-DD format")
):
    """Get entries within a date range"""
    db = get_database()
    entries = get_entries_by_date_range(db, start_date, end_date)
    return entries

@app.get("/api/entries/mood/{mood}", response_model=List[DiaryEntryResponse])
def get_entries_by_mood_filter(mood: str):
    """Get entries filtered by mood"""
    db = get_database()
    entries = get_entries_by_mood(db, mood)
    return entries

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "diary-logger-api"}
