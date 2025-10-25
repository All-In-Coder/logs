import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { fetchEntries, deleteEntry, DiaryEntry } from '../api/api';
import LogCard from '../components/LogCard';
import './Home.css';

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, [selectedDate, selectedMood]);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const data = await fetchEntries(
        selectedDate || undefined,
        selectedMood || undefined
      );
      setEntries(data);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry(id);
        await loadEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleMoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMood(e.target.value);
  };

  const clearFilters = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setSelectedMood('');
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">
            <i className="far fa-book-open"></i> My Diary
          </h1>
          <div className="header-actions">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="date-filter"
            />
            <select
              value={selectedMood}
              onChange={handleMoodChange}
              className="mood-filter"
            >
              <option value="">All Moods</option>
              <option value="great">😊 Great</option>
              <option value="good">😐 Good</option>
              <option value="okay">😕 Okay</option>
              <option value="bad">😢 Bad</option>
            </select>
            {(selectedDate || selectedMood) && (
              <button onClick={clearFilters} className="clear-filter-btn">
                Clear Filters
              </button>
            )}
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
        <p className="subtitle">Log your thoughts and experiences anytime</p>
      </header>

      <main className="main-content">
        <div className="actions-bar">
          <Link to="/create" className="create-btn">
            <i className="fas fa-plus"></i> New Entry
          </Link>
          <div className="stats">
            <span>{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="empty-state">
            <i className="far fa-book-open"></i>
            <h3>No entries yet</h3>
            <p>Start logging your thoughts by creating a new entry!</p>
            <Link to="/create" className="create-btn">
              Create Your First Entry
            </Link>
          </div>
        ) : (
          <div className="logs-grid">
            {entries.map((entry) => (
              <LogCard key={entry.id} entry={entry} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
