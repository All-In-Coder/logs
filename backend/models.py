from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class DiaryEntry(BaseModel):
    id: Optional[str] = None
    date: str = Field(..., min_length=1, max_length=50)  # Date in YYYY-MM-DD format
    time: str = Field(..., min_length=1, max_length=50)  # Time in HH:MM AM/PM format
    mood: str = Field(..., min_length=1, max_length=20)  # great, good, okay, bad
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1, max_length=2000)
    tags: Optional[List[str]] = []  # List of tags
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
