from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class DiaryEntryCreate(BaseModel):
    date: str = Field(..., min_length=1, max_length=50)
    time: str = Field(..., min_length=1, max_length=50)
    mood: str = Field(..., min_length=1, max_length=20)
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1, max_length=2000)
    tags: Optional[List[str]] = []

class DiaryEntryUpdate(BaseModel):
    date: Optional[str] = Field(None, min_length=1, max_length=50)
    time: Optional[str] = Field(None, min_length=1, max_length=50)
    mood: Optional[str] = Field(None, min_length=1, max_length=20)
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    content: Optional[str] = Field(None, min_length=1, max_length=2000)
    tags: Optional[List[str]] = None

class DiaryEntryResponse(BaseModel):
    id: str
    date: str
    time: str
    mood: str
    title: str
    content: str
    tags: List[str]
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
