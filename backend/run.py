#!/usr/bin/env python3
"""
Startup script for Diary Logger API
"""

import uvicorn
from main import app

if __name__ == "__main__":
    print("🚀 Starting Diary Logger API...")
    print("📖 API Documentation available at: http://localhost:8000/docs")
    print("🔗 API Base URL: http://localhost:8000")
    print("💾 Database: MongoDB Atlas")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
