# Day Logger

A modern web application for logging your daily activities with time tracking, built with React (TypeScript) and FastAPI (Python).

## Features

- ⏰ **Time-based logging**: Record activities with start and end times
- 📅 **Date filtering**: View logs for specific dates
- 🌙 **Dark/Light theme**: Toggle between themes with system default support
- 📱 **Responsive design**: Works seamlessly on desktop and mobile devices
- 🎨 **Classic UI**: Clean and intuitive interface
- ✅ **CRUD operations**: Create, view, and delete logs
- 🗃️ **PostgreSQL database**: Robust data storage

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router v6
- Axios for API calls
- CSS with CSS Variables for theming
- Font Awesome icons

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL database
- Pydantic for data validation

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd log
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```
MONGO_USERNAME=example
MONGO_PASSWORD=example
MONGO_CLUSTER=example
MONGO_DBNAME=example
```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Start the Backend

In the `backend` directory with virtual environment activated:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Start the Frontend

In the `frontend` directory:

```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage

1. **View Logs**: Navigate to the home page (`/`) to see all your logged activities
2. **Create Log**: Click "New Log" button or go to `/create` to add a new time-based entry
3. **Filter by Date**: Use the date picker in the header to filter logs
4. **Toggle Theme**: Click the moon/sun icon to switch between light and dark modes
5. **Delete Log**: Click the trash icon on any log card to delete it

## API Endpoints

- `GET /api/logs` - Get all logs (optional `?date=YYYY-MM-DD` parameter)
- `GET /api/logs/{id}` - Get a specific log by ID
- `POST /api/logs` - Create a new log
- `PUT /api/logs/{id}` - Update a log
- `DELETE /api/logs/{id}` - Delete a log

## Project Structure

```
log/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── database.py       # Database configuration
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── crud.py           # CRUD operations
│   ├── requirements.txt  # Python dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/          # API client
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   ├── pages/        # Page components
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Development

### Backend Development

The backend uses FastAPI with auto-reload enabled. The database schema is automatically created when the application starts.

### Frontend Development

The React app uses Create React App with TypeScript. Hot reloading is enabled by default.

## Building for Production

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm run build
```

The built files will be in the `frontend/build` directory.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
