import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEntryById, DiaryEntry } from '../api/api';
import { useTheme } from '../contexts/ThemeContext';
import './Home.css';

const ViewLog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme, toggleTheme } = useTheme();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntry = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await fetchEntryById(id);
          setEntry(data);
        } else {
          setError('No entry ID provided.');
        }
      } catch (err) {
        setError('Failed to load entry.');
        console.error(err);
        
      } finally {
        setLoading(false);
      }
    };
    loadEntry();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="empty-state">{error}</div>;
  if (!entry) return <div className="empty-state">Entry not found.</div>;

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">
            <i className="far fa-book-open"></i> My Diary
          </h1>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <p className="subtitle">View Entry Details</p>
      </header>
      <main className="main-content">
        <div className="create-card" style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2>{entry.title}</h2>
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ marginRight: 16 }}><i className="far fa-calendar"></i> {entry.date}</span>
            <span style={{ marginRight: 16 }}><i className="far fa-clock"></i> {entry.time}</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 20,
                color: 'white',
                fontWeight: 500,
                fontSize: '0.95rem',
                background:
                  entry.mood === 'great' ? '#48bb78' :
                  entry.mood === 'good' ? '#4299e1' :
                  entry.mood === 'okay' ? '#ed8936' :
                  entry.mood === 'bad' ? '#f56565' : '#4299e1',
              }}
            >
              <i className={
                entry.mood === 'great' ? 'fas fa-smile' :
                entry.mood === 'good' ? 'fas fa-meh' :
                entry.mood === 'okay' ? 'fas fa-frown' :
                entry.mood === 'bad' ? 'fas fa-sad-tear' : 'fas fa-meh'
              }></i>
              <span>{entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</span>
            </span>
          </div>
          <div style={{ marginBottom: 24 }}>
            <strong>Content:</strong>
            <p style={{ marginTop: 8, whiteSpace: 'pre-line' }}>{entry.content}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewLog;
